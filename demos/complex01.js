/* global $ */
$(function () {
	var layout = {
		$items: [
			{
				$type: "block", $inline: true, $items: [
					{ $bind: "$links.filter", options: { type: "primary" } }
				]
			},
			{
				$type: "block", $inline: true, $items: [
					{
						$type: "block", $inline: true, $items: [
							{ $bind: "statut", "$widget": "grpbtn" },
							{ $bind: "dateDeb", options: { titleIsHidden: false, maxWidth: "12em" } },
							{ $bind: "dateFin", options: { titleIsHidden: true, maxWidth: "12em" } }
						]
					},

				]
			}

		],

		type: "block"
	};
	var schema = {
		"links": {
			"filter": { "title": "Créer consultation" }
		},
		"properties": {
			"statut": {
				"title": "Type",
				"type": "string",
				"enum": ["E", "C", "A"],
				"enumNames": ["En cours", "Cloturé", "Tous"],
				"default": "A"
			},
			"dateDeb": {
				"title": "Filtrer les dates",
				"type": "string",
				"format": "date"
			},
			"dateFin": {
				"type": "string",
				"format": "date",
				"default": "@date"
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

				}
			});
	})();

});

