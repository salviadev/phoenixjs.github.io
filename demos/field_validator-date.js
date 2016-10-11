// Constants
var separateur1 = "/";
var separateur2 = " ";

$(function() {
	$("#date").val(defaultValue());
	
	$(".date").datepicker({
		language: 'fr',
		format: 'dd/mm/yyyy',
		startDate: new Date().formatDDMMYYYY(),
		autoclose: true
	});
	
	$(".date").datepicker().on('changeDate', function (ev) {
		$("#date").val(new Date(ev.date).formatDDMMYYYY());
	});
	
	$("#date").change(function() {
		var value = $(this).val();
		var sep = "/";
		if (value.indexOf(separateur1) == -1 && value.indexOf(separateur2) == -1) { $(this).val(defaultValue()); return; }
		if (value.indexOf(separateur1) == -1) sep = separateur2;
		var vals = value.split(sep);
		if (vals.length != 3) { $(this).val(defaultValue()); return; }
		for (var i=0; i<3; i++) vals[i] = parseInt(vals[i], 10);
		if (vals[2] < 100) vals[2] += 2000;
		if (!validDate(vals)) { $(this).val(defaultValue()); return; }
		var date = new Date(vals[2], vals[1] - 1, vals[0]);
		$(this).val(date.formatDDMMYYYY());
	});
	
	$("#date").click(function() {
		$(this).select();
	});
});

function defaultValue() {
	return "01/01/1900";
}

function validDate(bits) {
	var d = bits[0];
	var m = bits[1];
	var y = bits[2];
	var date = new Date(y, m - 1, d);
	return (date.getFullYear() == y && date.getMonth() + 1 == m && date.getDate() == d);
}

Date.prototype.isValid = function () {
	return this.getTime() === this.getTime();
}

Date.prototype.formatDDMMYYYY = function () {
	return [pad(this.getDate()), pad(this.getMonth()+1), this.getFullYear()].join('/');
}

function pad(s) { return (s < 10) ? '0' + s : s; }