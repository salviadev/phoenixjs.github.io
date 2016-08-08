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
						"$bind": "documents",
						"$name": "gfsfdd3",
						"$widget": "basicgrid",
						"options": {
							"align": "middle",
							"border": true,
							"editing": false,
							"headerIsHidden": false,
							"columns": [
								{ "$bind": "id", "options": { "width": 100 } },
								{
									"$bind": "lotplace",
									"options": {
										"html": true,
										"width": 50,
										"icons": {
											"true": "map-marker",
											"false": ""
										}
									}
								},
								{ "$bind": "status", "options": { "width": 150, transform: "stock_status" } },
								{ "$bind": "date_status", "options": { "width": 80 } },
								{
									"$bind": "currency",
									"options": {
										"width": 50,
										"icons": {
											"EUR": "euro",
											"GBP": "gbp",
											"USD": "usd"
										}
									}
								}
							]

						}
					}

				]
			},
			{
				"$type": "block",
				"$items": []
			}
		]
	};
	var schema = {
		"type": "object",
		"properties": {
			"documents": {
				"type": "array",
				"items": {
					"type": "object",
					"properties": {
						"id": { "type": "integer", title: "Numéro" },
						"status": { "type": "string", title: "Statut", enum: ["R", "S", "V", "O"], enumNames: ["Réservé", "En Stock", "Vendu", "Options"] },
						"date_status": { "type": "string", title: "Date du statut", format: "date" },
						"currency": { "type": "string", title: "Devise", enum: ["EUR", "GBP", "USD"], enumNames: ["Euro", "Livre sterline", "Dollar"] },
						"lib": { "type": "string", title: "Libelle", maxLength: 50 },
						"lotplace": { "type": "boolean", title: "Lot placé" }
					}

				}
			}

		}


	};
	var data = {
		documents: [
			{ id: 1000, Libelle: "Lot  1000", status: "R", date_status: "2014-03-12", lotplace: true, "currency": "USD" },
			{ id: 1001, Libelle: "Lot  1000", status: "S", date_status: "2014-03-18", lotplace: true, "currency": "GBP" },
			{ id: 1011, Libelle: "Lot  1000", status: "S", date_status: "2014-05-18", lotplace: false, "currency": "EUR" },
			{ id: 1031, Libelle: "Lot  1000", status: "V", date_status: "2014-05-18", lotplace: false, "currency": "EUR" },
			{ id: 1215, Libelle: "Lot  1000", status: "O", date_status: "2014-06-10", lotplace: false, "currency": "GBP" }
		]
	};

	(function om() {
		function showStockStatus(value, displayValue) {
			var html = ['<center class="'], css = ['bs-image-center', 'stock_' + value];
			html.push(css.join(' '));
			html.push('">');
			html.push(displayValue);
			html.push('</center>');
			return html.join('');
		};
		Phoenix.customData.register('ui.html.stock_status', showStockStatus);
		Phoenix.ui.OpenForm(
			$('#form'), layout, schema, data, {},
			function (action, data, formControl) {
			});


	})();

});

