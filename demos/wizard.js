/* global $ */
$(function () {
	var layout = {
		"name": "form",
		"$type": "block",
		"$items": [
			{
				"$type": "block",
				"$items": [
					{
						"$bind": "wizard",
						"$widget": "steppers"
					}
				]
			},
			{
				"$type": "block",
				"$inline": true,
				"$items": [
				]
			}
		]
	};
	var schema = {
		"type": "object",
		"properties": {
			"wizard": {
				"ux": true,
				"emitChanging": true,
				"title": "",
				"type": "string",
				"enum": [
					"T",
					"L",
					"P",
					"D",
					"C",
					"R"
				],
				"enumNames": [
					"Tiers",
					"Lots",
					"Prix",
					"Dates",
					"Commentaire",
					"Récapitulatif"
				]
			}

		},
		"links": {
			"link1": { "title": "Toggle disabled" },
			"link2": { "title": "Toggle hidden" }

		}


	};
	var data = { wizard: "T" };

	(function om() {
		Phoenix.ui.OpenForm(
			$('#form'), layout, schema, data, {},
			function (action, data) {
				switch (action.property) {
				}
			});
	})();

});

