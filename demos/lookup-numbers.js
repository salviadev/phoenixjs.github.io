/* global $ */
$(function () {
	var layout = {
		"name": "form",
		"$items": [
			{ "$bind": "organisation", "$display": "Titles.organisation", "$lookup": "Organisation", "options": {}}
		],
		"$type": "block"
	};
	var schema = {
		"lookups": {
			"Organisation": {
				"data": {
					"$type": "inline",
					"$value": {"value": [
						{
							"title": "Afghanistan",
							"id": 10
						},
						{
							"title": "Aland Islands",
							"id": 11
						}
					]}
				},
				"primaryKey": "id",
				"mapping": {
					"organisation": "id",
					"Titles.organisation": "title"
				}
			}
		},
		"properties": {
			"organisation": {
				"title": "Organisation",
				"type": "number"
			},
			"Titles": {
				"type": "object",
				"properties": {
					"organisation": {
						"title": "Organisation",
						"type": "string"
					}
				}
				
			}

		},
		"states": {
			"Titles": {
				"isMandatory": true
			}
			
		},
		"name": "address.json"
	};
	var data = {};

	(function om() {
		Phoenix.ui.OpenForm(
			$('#form'), layout, schema, data, {},
			function (action, data) {
			});
	})();

});

     