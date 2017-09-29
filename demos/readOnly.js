/* global $ */
$(function () {
	var layout = {
		"name": "form",
		"$items": [{
			"$type": "block",
			"$items": [
				{ "$items": [{ "$bind": "countryCode", $readOnly: true }] },
				{ "$items": [{ "$bind": "date", $readOnly: true }] },
				{ "$items": [{ "$bind": "currency", $readOnly: true, options: { $expression: "{{date}} is xxx {{currency}}" } }] }
			]
		},
		{
			"$type": "row",
			"$items": [
				{
					"$inline": true,
					"$items": [
						{ $bind: "$links.save", "options": { "right": true } },
						{ $bind: "$links.close", "options": { "right": true } }
					]
				}
			]
		}

		],

		"$type": "block"
	};
	var schema = {
		"links": {
			"save": { "title": "Modify date and currency" },
			"close": { "title": "Close" }
		},
		"properties": {
			"countryCode": {
				"title": "Country",
				"type": "string"
			},
			"date": {
				"title": "Date",
				"type": "string",
				"format": "date"
			},
			"currency": {
				"title": "Currency Field",
				"type": "number",
				"format": "money"
			}

		},
		"states": {
			"Titles": {
				"isMandatory": true
			}

		}
	};
	var data = {};


	(function om() {
		Phoenix.ui.OpenForm(
			$('#form'), layout, schema, data, {},
			function (action, data) {
				switch (action.property) {
					case "countryCode":
						break;
					case "$links.save":
						data.date = "2000-12-12";
						data.currency = 10000.2;
						break;

				}
			});
	})();

});
