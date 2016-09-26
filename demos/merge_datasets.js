/* global $ */
$(function () {
	var layout = {
		"name": "form",
		"datasets": {
			"main": {
				"$main": true,
				"$type": "basic",
				"$output": {
					"ds1": "$context.ds1",
					"ds2": "$context.ds2"
				}
			},
			"ds1": {
				"$type": "basic",
				"$data": [
					{
						"code": "nom",
						"libellé": "DUPONT"
					},
					{
						"code": "prenom",
						"libelle": "Jean"
					},
					{
						"code": "age",
						"libelle": "24"
					}
				],
				"$output": '$data'
			},
			"ds2": {
				"$type": "basic",
				"$data": {
					"app": "Phénix"
				},
				"$output": '$data'
			}
		},
		"$type": "block",
		"$items": [
			{
				"$type": "block",
				"$items": [
					{
						"$bind": "ds1",
						"$widget": "basicgrid",
						"options": {
							"scrolling": {
								"horizontal": false,
								"vertical": false
							},
							"allowFrozenColumns": false,
							"allowColumnResize": false,
							"allowColumnMove": true,
							"editing": false,
							"height": "auto",
							"width": "auto",
							"sorting": false,
							"border": false,
							"selecting": {
								"cell": false,
								"row": false,
								"multiselect": false
							},
							"pager": {
								"boundaryLinks": true
							},
							"headerIsHidden": false,
							"align": "middle",
							"columns": [
								{
									"$bind": "code"
								},
								{
									"$bind": "libelle"
								}
							]
						}
					},
					{
						"$bind": "ds2.app"
					}
				]
			}
		]
	}

	var schema = {
		"type": "object",
		"properties": {
			"ds1": {
				"type": "array",
				"items": {
					"type": "object",
					"properties": {
						"code": {
							"type": "string",
							"title": "Code"
						},
						"libelle": {
							"type": "string",
							"title": "Libellé"
						}
					}
				}
			},
			"ds2": {
				"type": "object",
				"properties": {
					"app": {
						"type": "string",
						"title": "Nom de l'application"
					}
				}
			}
		}
	};

	var data = null;

	(function om() {
		Phoenix.ui.OpenForm(
			$('#form'), layout, schema, data, {},
			function (action, data) {
				switch (action.property) {
					case "value": break;
				}
			});
	})();
});

