// Constants
var lang = 'fr';
var separateurMilliers = " ";
var separateurDecimal = ".";
var decimals = 2;
var minValue = -10;
var maxValue = 1000000;

$(function() {
	
	// Set init value
	$("#montant").val(getZeroStr());
	$("#select_language_trad").val('fr');
	$("#select_language_money").val('fr');
	$("#nb-decimals").val(decimals);
	$("#min-value").val(minValue);
	$("#max-value").val(maxValue);
	$("#sepa-mille").val(separateurMilliers);
	$("#sepa-decimal").val(separateurDecimal);
	updateLibelleMontant();
	
	$("#select_language_trad").change(function() {
		lang = $(this).val();
		updateLibelleMontant();
	});
	
	$("#select_language_money").change(function() {
		var langMoney = $(this).val();
		var newSepaMille = separateurMilliers;
		var newSepaDecimal = separateurDecimal;
		var newDecimals = decimals;
		switch (langMoney) {
			case 'al': newSepaMille = ' '; newSepaDecimal = ','; newDecimals = 3; break;
			case 'en': newSepaMille = ','; newSepaDecimal = '.'; newDecimals = 2; break;
			case 'ca': newSepaMille = ' '; newSepaDecimal = ','; newDecimals = 3; break;
			case 'da': newSepaMille = ' '; newSepaDecimal = ','; newDecimals = 3; break;
			case 'es': newSepaMille = '.'; newSepaDecimal = ','; newDecimals = 3; break;
			case 'fi': newSepaMille = ' '; newSepaDecimal = ','; newDecimals = 3; break;
			case 'fr': newSepaMille = ' '; newSepaDecimal = ','; newDecimals = 2; break;
			case 'it': newSepaMille = '.'; newSepaDecimal = ','; newDecimals = 3; break;
			case 'no': newSepaMille = '.'; newSepaDecimal = ','; newDecimals = 3; break;
			case 'su': newSepaMille = ' '; newSepaDecimal = ','; newDecimals = 3; break;
			case 'th': newSepaMille = ','; newSepaDecimal = '.'; newDecimals = 2; break;
		}
		
		// Methods apply
		changeSepaMille(newSepaMille);
		changeSepaDecimal(newSepaDecimal);
		changeDecimal(newDecimals);
		
		// Change values
		$("#sepa-mille").val(newSepaMille);
		$("#sepa-decimal").val(newSepaDecimal);
		$("#nb-decimals").val(newDecimals);
	});
	
	$("#nb-decimals").change(function() {
		changeDecimal($(this).val());
	});
	
	$("#min-value").change(function() {
		changeMinValue($(this).val());
	});
	
	$("#max-value").change(function() {
		changeMaxValue($(this).val());
	});
	
	$("#sepa-mille").change(function() {
		changeSepaMille($(this).val());
	});
	
	$("#sepa-decimal").change(function() {
		changeSepaDecimal($(this).val());
	});

	$("#montant").keypress(function(event) {
		
		// Get selection
		var selectionStart = event.target.selectionStart;
		var selectionEnd = event.target.selectionEnd;
		var selection = selectionEnd - selectionStart > 0;
		
		// Get context
		var oldVal = selection ? getValWithoutSelection($(this).val(), selectionStart, selectionEnd): $(this).val();
		// Manage negative numbers
		var negative = isNegative(oldVal);
		var charNegative = '';
		if (negative) {
			oldVal = oldVal.substr(1, oldVal.length - 1);
			charNegative = '-';
			if (selectionStart != -0) { selectionStart--; selectionEnd--; }
		}
		var start = oldVal.substr(0, selectionStart);
		var end = oldVal.substr(selectionStart, oldVal.length);
		
		// Check if keypress is "," or "."
		if (event.key === separateurDecimal || event.key === '.') {
			$(this).selectRange(oldVal.indexOf(separateurDecimal)+1);
			event.preventDefault();
			return;
		}
		
		// Check if keypress is "-"
		if (event.which == 45) {
			if (oldVal.indexOf('-') != 0) {
				if (unformatMontant($(this).val()) != getZeroStr()) {
					var newVal = limit('-' + unformatMontant(oldVal), minValue, maxValue);
					$(this).val(newVal);
					$(this).selectRange(1);
					updateLibelleMontant();
				}
			}
			event.preventDefault();
			return;
		}
		
		// Check if keypress is number
		if (!validateEvent(event)) {
			event.preventDefault();
			return;
		}
		
		// Particular case : 0 added to start
		if (event.which == 96 && selectionStart == 0) {
			event.preventDefault();
			return;
		}
		
		// Process
		var newVal = unformatMontant(start + event.key + end);
		var newValIntervalle = limit(charNegative + newVal, minValue, maxValue);
		$(this).val(newValIntervalle);
		setCaretPos($(this), unformatMontant(start).length+1);
		updateLibelleMontant();
		event.preventDefault();
	});
	
	// + traduction en lettres
	
	$("#montant").on("paste", function(e) {
		
		// Get data pasted
		var data = parseFloat(unformatMontant(e.originalEvent.clipboardData.getData('Text')));
		var negative = data < 0;
		var charNegative = '';
		if (negative) {
			charNegative = '-';
			data = -data;
		}
		if (isNaN(data)) {
			event.preventDefault();
			return;
		}
		data = data.toString();
		
		// Get selection
		var selectionStart = event.target.selectionStart;
		var selectionEnd = event.target.selectionEnd;
		var selection = selectionEnd - selectionStart > 0;
		
		// Get context
		var oldVal = selection ? getValWithoutSelection($(this).val(), selectionStart, selectionEnd): $(this).val();
		var start = oldVal.substr(0, selectionStart);
		var end = oldVal.substr(selectionStart, oldVal.length);
		
		// Process
		var newVal = unformatMontant(start + data + end);
		var newValIntervalle = limit(charNegative + newVal, minValue, maxValue);
		$(this).val(newValIntervalle);
		setCaretPos($(this), unformatMontant(start).length + data.length);
		updateLibelleMontant();
		event.preventDefault();
	});
	
	$("#montant").keydown(function(event) {
		
		// Check if keypress is "delete"
		if (event.which != 8 && event.which != 46) return;
		var offsetCaret = 0;
		if (event.which == 8) var offsetCaret = -1;
		
		// Get selection
		var selectionStart = event.target.selectionStart;
		var selectionEnd = event.target.selectionEnd;
		var selection = selectionEnd - selectionStart > 0;
		
		// Get context
		var oldVal = selection ? getValWithoutSelection($(this).val(), selectionStart, selectionEnd): $(this).val();
		var start = oldVal.substr(0, selectionStart);
		var end = oldVal.substr(selectionStart, oldVal.length);
		
		// Reset selection
		if (selection) {
			resetSelection($(this), oldVal, start);
			event.preventDefault();
			return;
		}
		
		// Particular case : back delete left
		if (event.which == 8 && selectionStart == 0) {
			event.preventDefault();
			return;
		}
		
		// Particular case : delete decimal separator
		if (event.which == 8) {
			if (oldVal[selectionStart + offsetCaret] == separateurDecimal) {
				$(this).selectRange(selectionStart+offsetCaret);
				event.preventDefault();
				return;
			}
		} else {
			if (oldVal[selectionStart + offsetCaret] == separateurDecimal) {
				$(this).selectRange(selectionStart+offsetCaret+1);
				event.preventDefault();
				return;
			}
		}
		
		// Particular case : delete thousand separator
		if (oldVal[selectionStart + offsetCaret] == separateurMilliers) {
			$(this).selectRange(selectionStart+1);
			event.preventDefault();
			return;
		}
		// Other cases
		else {
			// New values
			if (event.which == 46) {
				var newVal = unformatMontant(start + end.substr(1, end.length - 1));
			} else if (event.which == 8) {
				var newVal = unformatMontant(start.substr(0, start.length - 1) + end);
			}
			var formattedNewVal = formatMontant(newVal);
			$(this).val(formattedNewVal);
			// Set caret position
			var charsBefore = unformatMontant(start).length+offsetCaret;
			// Particular cases : near decimal separator
			if (event.which == 8 && newVal.indexOf(".") == 0 && selectionStart == 1) charsBefore = 1;
			if (event.which == 46 && newVal.indexOf(".") == 0 && selectionStart == 0) charsBefore = 1;
			setCaretPos($(this), charsBefore);
		}
		updateLibelleMontant();
		event.preventDefault();
	});
});

// Events
function changeDecimal(value) {
	decimals = value;
	$("#montant").val(formatMontant(unformatMontant($("#montant").val())));
}

function changeMinValue(value) {
	minValue = value;
	var oldVal = $("#montant").val();
	var charNegative = '';
	if (isNegative(oldVal)) {
		charNegative = '-';
		oldVal = oldVal.substr(1, oldVal.length - 1);
	}
	var newValIntervalle = limit(charNegative + unformatMontant(oldVal), minValue, maxValue);
	$("#montant").val(newValIntervalle);
}

function changeMaxValue(value) {
	maxValue = value;
	var oldVal = $("#montant").val();
	var charNegative = '';
	if (isNegative(oldVal)) {
		charNegative = '-';
		oldVal = oldVal.substr(1, oldVal.length - 1);
	}
	var newValIntervalle = limit(charNegative + unformatMontant(oldVal), minValue, maxValue);
	$("#montant").val(newValIntervalle);
}

function changeSepaMille(value) {
	var oldVal = $("#montant").val();
	var newVal = oldVal.replaceAll(separateurMilliers, value);
	$("#montant").val(newVal);
	separateurMilliers = value;
}

function changeSepaDecimal(value) {
	var oldVal = $("#montant").val();
	var newVal = oldVal.replace(separateurDecimal, value);
	$("#montant").val(newVal);
	separateurDecimal = value;
}

// Libs
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
	var result = "";
	for (var i=0; i<target.length; i++) {
		if (target[i] == search) result += replacement;
		else result += target[i];
	}
    return result;
};

$.fn.selectRange = function(start, end) {
    if (end === undefined) {
        end = start;
    }
    return this.each(function() {
        if ('selectionStart' in this) {
            this.selectionStart = start;
            this.selectionEnd = end;
        } else if (this.setSelectionRange) {
            this.setSelectionRange(start, end);
        } else if (this.createTextRange) {
            var range = this.createTextRange();
            range.collapse(true);
            range.moveEnd('character', end);
            range.moveStart('character', start);
            range.select();
        }
    });
};

function getZeroStr() {
	var result = '0.';
	for (var i=0; i<decimals; i++) result += '0';
	return result;
}

function updateLibelleMontant() {
	var montant = $("#montant").val();
	var split = splitFloat(unformatMontant(montant));
	var entPart = parseInt(unformatMontant(split[0])).toString();
	var negative = '';
	if (isNegative(entPart)) {
		negative = '(moins) ';
		entPart = entPart.substr(1, entPart.length - 1);
	}
	var decimalPart = parseInt(unformatMontant(split[1].substr(0, 2))).toString();
	var entWords =  writtenNumber(entPart, { lang: lang });
	var decimalWords =  writtenNumber(decimalPart, { lang: lang });
	var euroWord = (entPart == '0' || entPart == '1') ? ' euro' : ' euros';
	var centsWord = (decimalPart == '0' || decimalPart == '1') ? ' centime' : ' centimes';
	$("#libelle_montant_ent").html(negative + entWords + euroWord);
	$("#libelle_montant_dec").html('et ' + decimalWords + centsWord);
}

function resetSelection(input, val, start) {
	var formattedNewVal = formatMontant(unformatMontant(val));
	$(input).val(formattedNewVal);
	setCaretPos($(input), unformatMontant(start).length);
}

function getValWithoutSelection(val, selectionStart, selectionEnd) {
	var beforeSelection = val.substr(0, selectionStart);
	var afterSelection = val.substr(selectionEnd, val.length - selectionEnd);
	val = beforeSelection + afterSelection;
	return val;
}

function validateEvent(event) {
	if (event.which < 48 || event.which > 57) return false;
	return true;
}

function formatMontant(val) {
	if (!val) val = '0';
	if (val.indexOf('.') == -1) {
		val += '.' + formatDecimalPart("");
	}
	split = splitFloat(val);
	entPart = formatEntPart(split[0]);
	decimalPart = split[1];
	if (decimalPart.length > decimals) {
		decimalPart = decimalPart.substr(0, decimals);
	}
	if (decimalPart.length < decimals) {
		decimalPart = formatDecimalPart(decimalPart);
	}
	return entPart + separateurDecimal + decimalPart;
}

function splitFloat(val) {
	var split = val.split(".");
	if (split[0] == '') split[0] = '0';
	return split;
}

function formatDecimalPart(decimalPart) {
	var addDecimals = decimalPart.length;
	for (var i=0; i<decimals-addDecimals; i++) {
		decimalPart += "0";
	}
	return decimalPart;
}

function unformatMontant(val) {
	//if (val === '0') return '';
	var t1 = val.replaceAll(separateurMilliers, "");
	var t2 = separateurDecimal == '.' ? t1 : t1.replace(separateurDecimal, ".");
	var t3 = t2.replaceAll('-', '');
	return t2;
}

function isNegative(val) {
	return val.indexOf('-') != -1;
}

function limit(val, min, max) {
	var val = parseFloat(val);
	if (val < min) return formatMontant(min.toString());
	if (val > max) return formatMontant(max.toString());
	return formatMontant(val.toString());
}

function formatEntPart(val) {
	for (var i=0; i<val.length-1; i++) {
		var t = val[i];
		if (val[i] != '0') break;
	}
	val = val.substr(i, val.length - i);
	if (val.length <= 3) return val;
	var reverseVal = reverseString(val);
	var result = '';
	for (var i=0; i<reverseVal.length; i++) {
		if (i%3 == 0 && i > 0) result += separateurMilliers;
		result += reverseVal[i];
	}
	return reverseString(result);
}

function reverseString(val) {
	var t = val.split("");
	var t2 = t.reverse();
	var t3 = t2.join("");
	return t3;
}

function setCaretPos (input, charsBefore) {
	val = $(input).val();
	var posCaret = 0;
	if (charsBefore != 0) {
		for (var i=0; i<val.length; i++) {
			if (val[i] != separateurMilliers) charsBefore--;
			if (charsBefore == 0) break;
		}
		posCaret = i+1;
	}
	$(input).selectRange(posCaret);
}