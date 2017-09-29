/* global $ */
$(function () {
	var layout = {
		"name": "form",
		"$items": [{
			"$type": "block",
			"$inline": true,
			"$items": [
				{ "$bind": "type" },
				{ "$bind": "operator" },
				{ "$bind": "text", "options": {titleIsHidden: true}}
				
			]
		}
		],
		"$type": "block"
	};
	var schema = {
		"properties": {
			"type": {
				"title": "Field Type",
				"type": "string",
				"enum": ["string", "number"],
				"enumNames": ["String", "Number"]
			},
			"text": {
				"type": "string"
			},
			"operator": {
				"title": "Operator",
				"type": "string",
				"enum": ["eq", "neq", "contains", "startWith"],
				"enumNames": ["Equal", "Not Equal", "Contains", "Start With"],
				"filters": {
					"string": ["eq", "neq", "contains", "startWith"],
					"number": ["eq", "neq"]
				}

			}

		}
	};
	var data = {};

	(function om() {
		Phoenix.ui.OpenForm(
			$('#form'), layout, schema, data, {},
			function (action, data) {
				switch (action.property) {
					case "type":
						data.$states.operator.filter = data.type;
						break;
				}
			});
	})();

});

