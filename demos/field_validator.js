// Constants
var separateurMilliers = " ";
var separateurDecimal = ",";
var decimals = 4;
var selectionStart = -1;
var selectionEnd = -1;

$(function() {
	
	// Set init value
	var initValue = "0" + separateurDecimal;
	for (var i=0; i<decimals; i++) initValue += "0";
	$("#montant").val(initValue);

	$("#montant").keypress(function(event) {
		
		var oldVal = getValWithoutSelection($(this).val());
		
		// Check if keypress is "," or "."
		if (event.key === separateurDecimal || event.key === '.') {
			$(this).selectRange(oldVal.indexOf(separateurDecimal)+1);
			event.preventDefault();
			return;
		}
		
		// Check if keypress is number
		if (!validateEvent(event)) {
			event.preventDefault();
			return;
		}
		
		var caretPos = getCaretPosition($(this).get(0));
		var start = oldVal.substr(0, caretPos);
		var end = oldVal.substr(caretPos, oldVal.length);
		
		// Particular case : 0 added to start
		if (event.key == '0' && caretPos == 0) {
			event.preventDefault();
			return;
		}
		
		var newVal = unformatMontant(start + event.key + end);
		$(this).val(formatMontant(newVal));
		setCaretPos($(this), unformatMontant(start).length+1);
		event.preventDefault();
	});
	
	$("#montant").on("paste", function(e) {
		
		var oldVal = getValWithoutSelection($(this).val());
		var data = parseInt(e.originalEvent.clipboardData.getData('Text'));
		
		var caretPos = getCaretPosition($(this).get(0));
		var start = oldVal.substr(0, caretPos);
		var end = oldVal.substr(caretPos, oldVal.length);
		
		var newVal = unformatMontant(start + data + end);
		$(this).val(formatMontant(newVal));
		$(this).selectRange(caretPos+data.length);
		event.preventDefault();
		//event.preventDefault();
	});
	
	$('#montant').click(function(e) {
		var start = e.target.selectionStart;
		var end = e.target.selectionEnd;
		
		if (end - start == 0) {
			selectionStart = -1;
			selectionEnd = -1;
		} else {
			selectionStart = start;
			selectionEnd = end;
		}
	});
	
	$("#montant").keydown(function(event) {
		
		// Check if keypress is "delete"
		if (event.keyCode != 8 && event.keyCode != 46) return;
		var offsetCaret = 0;
		if (event.keyCode == 8) var offsetCaret = -1;
		
		var oldVal = getValWithoutSelection($(this).val());
		var caretPos = getCaretPosition($(this).get(0));
		var start = oldVal.substr(0, caretPos);
		var end = oldVal.substr(caretPos, oldVal.length);
		
		// Particular case : delete decimal separator
		if (event.keyCode == 8) {
			if (oldVal[caretPos + offsetCaret] == separateurDecimal) {
				$(this).selectRange(caretPos+offsetCaret);
				event.preventDefault();
				return;
			} else if (oldVal[caretPos + offsetCaret + 1] == separateurDecimal) {
				$(this).selectRange(caretPos);
				event.preventDefault();
				return;
			}
		} else {
			if ((oldVal[caretPos + offsetCaret] == separateurDecimal) || (oldVal[caretPos + offsetCaret + 1] == separateurDecimal)) {
				$(this).selectRange(caretPos+offsetCaret+1);
				event.preventDefault();
				return;
			}
		}
		
		// Particular case : delete thousand separator
		if (oldVal[caretPos + offsetCaret] == separateurMilliers) {}
		// Other cases
		else {
			// New values
			if (event.keyCode == 46) {
				var newVal = unformatMontant(start + end.substr(1, end.length - 1));
			} else if (event.keyCode == 8) {
				var newVal = unformatMontant(start.substr(0, start.length - 1) + end);
			}
			var formattedNewVal = formatMontant(newVal);
			$(this).val(formattedNewVal);
			// Set caret position
			setCaretPos($(this), unformatMontant(start).length+offsetCaret);
		}
		event.preventDefault();
	});
});

// Libs
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
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

function getValWithoutSelection(val) {
	if (selectionStart != -1) {
		var beforeSelection = val.substr(0, selectionStart);
		var afterSelection = val.substr(selectionEnd, val.length - selectionEnd);
		val = beforeSelection + afterSelection;
	}
	return val;
}

function validateEvent(event) {
	if (event.keyCode < 48 || event.keyCode > 57 ) return false;
	return true;
}

function formatMontant(val) {
	var split = val.split(".");
	var entPart = split[0] == "" ? "0" : split[0];
	var decimalPart = split[1];
	entPart = formatEntPart(entPart);
	if (decimalPart.length > decimals) {
		decimalPart = decimalPart.substr(0, decimals);
	}
	if (decimalPart.length < decimals) {
		for (var i=0; i<decimals-decimalPart.length; i++) {
			decimalPart += "0";
		}
	}
	return entPart + separateurDecimal + decimalPart;
}

function unformatMontant(val) {
	var t1 = val.replaceAll(separateurMilliers, "");
	var t2 = t1.replaceAll(separateurDecimal, ".");
	return t2;
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

function getCaretPosition (oField) {
	// Initialize
	var iCaretPos = 0;
	// IE Support
	if (document.selection) {
		// Set focus on the element
		oField.focus();
		// To get cursor position, get empty selection range
		var oSel = document.selection.createRange();
		// Move selection start to 0 position
		oSel.moveStart('character', -oField.value.length);
		// The caret position is selection length
		iCaretPos = oSel.text.length;
	}
	// Firefox support
	else if (oField.selectionStart || oField.selectionStart == '0')
		iCaretPos = oField.selectionStart;
	// Return results
	return iCaretPos;
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