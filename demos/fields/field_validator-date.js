// Constants
var separators = [' ', '/', '-'];
var format = 'dd/mm/yyyy';
var formatFunction = formatDDMMYYYY;
var language = 'fr';
var splitDay = 0;
var splitMonth = 1;
var splitYear = 2;
var currentDate = new Date();

$(function() {
	$("#date").val(defaultValue());
	
	$("#date").click(function() {
		$(this).select();
	});
	
	$(".date").datepicker({
		language: language,
		format: format,
		startDate: formatFunction(new Date()),
		autoclose: true
	});
	
	$("#select-date-format").change(function() {
		var value = $(this).val();
		switch (value) {
			case "dmy":
				format = 'dd/mm/yyyy';
				language = 'fr';
				formatFunction = formatDDMMYYYY;
				splitDay = 0; splitMonth = 1; splitYear = 2;
			break;
			case "mdy":
				format = 'mm/dd/yyyy';
				language = 'en';
				formatFunction = formatMMDDYYYY;
				splitDay = 1; splitMonth = 0; splitYear = 2;
			break;
			case "ymd":
				format = 'yyyy/mm/dd';
				language = 'en';
				formatFunction = formatYYYYMMDD;
				splitDay = 2; splitMonth = 1; splitYear = 0;
			break;
		}
		$(".date").datepicker({
			language: language,
			format: format,
			startDate: formatFunction(new Date()),
			autoclose: true
		});
		
		$("#date").val(formatFunction(currentDate));
	});
	
	$(".date").datepicker().on('changeDate', function (ev) {
		currentDate = new Date(ev.date);
		$("#date").val(formatFunction(currentDate));
	});
	
	$("#date").change(function() {
		var value = $(this).val();
		
		// Get separator
		for (var i=0; i<separators.length; i++) {
			var sep = separators[i];
			if (value.indexOf(sep) != -1) break;
		}
		
		// Get vals
		var vals = value.split(sep);
		if (vals.length != 3) { $(this).val(defaultValue()); return; }
		for (var i=0; i<3; i++) vals[i] = parseInt(vals[i], 10);
		
		// Format year
		if (vals[splitYear] < 100) vals[splitYear] += 2000;
		if (!validDate(vals)) { $(this).val(defaultValue()); return; }
		currentDate = new Date(vals[splitYear], vals[splitMonth] - 1, vals[splitDay]);
		$(this).val(formatFunction(currentDate));
	});
});

function defaultValue() {
	var d = '1';
	var m = '0';
	var y = '1900';
	currentDate = new Date(y, m, d);
	return formatFunction(currentDate);
}

function validDate(bits) {
	var d = bits[splitDay];
	var m = bits[splitMonth];
	var y = bits[splitYear];
	var date = new Date(y, m - 1, d);
	return (date.getFullYear() == y && date.getMonth() + 1 == m && date.getDate() == d);
}

Date.prototype.isValid = function () {
	return this.getTime() === this.getTime();
}

function formatDDMMYYYY (date) {
	return [pad(date.getDate()), pad(date.getMonth()+1), date.getFullYear()].join('/');
}

function formatMMDDYYYY (date) {
	return [pad(date.getMonth()+1), pad(date.getDate()), date.getFullYear()].join('/');
}

function formatYYYYMMDD (date) {
	return [date.getFullYear(), pad(date.getMonth()+1), pad(date.getDate())].join('/');
}

function pad(s) { return (s < 10) ? '0' + s : s; }