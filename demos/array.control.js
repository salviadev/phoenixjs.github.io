/* global $ */
$(function () {
	let item_render = {
		render: function (parent, item, map) {
			item.id = Phoenix.utils.allocID();
			map[item.id] = item.id;
			parent.innerHTML = '<pre id="' + item.id + '">' + JSON.stringify(item, null, 2) + '</pre>';
		},
		click(event, map) {
		}

	}
	Phoenix.customData.register("json_item_render", item_render);

	var layout = {
		"name": "form",
		"$type": "block",
		"$items": [
			{
				"$type": "block",
				"$items": [
					{
						"$bind": "themes",
						"$widget": 'array-control',
						"options": {
							"style": "fin-root-class",
							"item": {
								"style": "fin-item-class",
								"render": "json_item_render"
							},
							"layout": {
								"type": "inline"
							}
						}
					},
					{
						"$bind": "themes",
						"$widget": 'array-control',
						"options": {
							"style": "fin-root-class",
							"item": {
								"style": "fin-item-class",
								"render": "json_item_render"
							},
							"layout": {
								"type": "grid",
								"columns": 2
							}
						}
					},
					{
						"$bind": "themes",
						"$widget": 'array-control',
						"options": {
							"style": "fin-root-class",
							"item": {
								"style": "fin-item-class",
								"render": "json_item_render"
							},
							"layout": {
								"type": "column",
								"columns": 2
							}
						}
					},
					{
						"$bind": "themes",
						"$widget": 'array-control',
						"options": {
							"style": "fin-root-class",
							"item": {
								"style": "fin-item-class",
								"render": "json_item_render"
							},
							"layout": {
								"type": "scroll"
							}
						}
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

		themes: [
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
			},
			{
				"title": "Immobilisations2",
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
			},
			{
				"title": "Immobilisations3",
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
			},
			{
				"title": "Immobilisations4",
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

