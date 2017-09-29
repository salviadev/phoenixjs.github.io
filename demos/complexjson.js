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
						"$bind": "themes",
						"$widget": 'objectjson'
					}
				]
			}

		]
	};
	var schema = {
		"type": "object",
		"properties": {
			"themes": {
				"type": "array",
				"items": {
					"type": "object",
					"properties": {}
				}
			}
		}
	};
	var data = {

		themes : [
			{
				"title": "Axes Analytiques",
				"modules": [
					{
						"title": "Entité",
						"acquis": false
					},
					{
						"title": "Unité de gestion",
						"acquis": false
					},
					{
						"title": "Opération",
						"acquis": false
					}
				]
			},
			{
				"title": "Axes Analytiques 2",
				"modules": [
					{
						"title": "Entité",
						"acquis": true
					},
					{
						"title": "Unité de gestion",
						"acquis": false
					},
					{
						"title": "Opération",
						"acquis": false
					}
				]
			},
			{
				"title": "Immobilisations",
				"modules": [
					{
						"title": "Immos patrimoniales",
						"acquis": true
					},
					{
						"title": "Immos de structures",
						"acquis": false
					},
					{
						"title": "Immos financières",
						"acquis": false
					},
					{
						"title": "Crédit-bail",
						"acquis": true
					}
				]
			}
		]

	};

	(function om() {
		Phoenix.ui.OpenForm(
			$('#form'), layout, schema, data, {},
			function (action, data) {
			});
	})();

});

