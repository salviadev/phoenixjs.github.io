/* global $ */
$(function () {
	var layout = {
		"name": "form",
		"$type": "block",

		"$items": [
			{
				"$type": "html",
				"$html": "Saisie d'option",
				"$style": "bs-widget-title accession-h1",
				"$items": []
			},
			{
				"$type": "block",
				"$style": "$space-margin-bottom",
				"$items": [
				]

			},
			{
				"$type": "block",
				"$items": [
					{
						"$type": "block",

						"$items": [
							{
								"$bind": "wizard",
								"$widget": "steppers"
							}
						],
						"$style": "$border-shadow $space-padding-top"
					}
				],
				"$sticky": "top"
			},
			{
				"$title": {
					"value": "Installing",
					"$style": "$spo-h2",
					"size": 4
				},
				"$type": "block",
				"$items": [
					{
						"$type": "row",
						"$items": [
							{
								"$type": "block",
								"$inline": true,
								"$items": [
									{
										"$bind": "$links.link2",
										"options": {
											"right": true,
											"type": "default"
										}
									},
									{
										"$bind": "$links.link1",
										"options": {
											"right": true,
											"type": "success"
										}
									}
								]
							}
						]
					},

					{
						"$title": {
							"value": "Download the latest release",
							"$style": "$spo-h3",
							"size": 5
						},
						"$type": "block",
						"$inline": true,
						"$items": [
							{
								"$bind": "amount"
							},
							{
								"$bind": "montant"
							},
							{
								"$bind": "liang"
							},
							{
								"$bind": "amount",
								"options": { "titleIsHidden": true }
							}
						]
					},
					{
						"$title": {
							"value": "Install with npm",
							"$style": "$spo-h3",
							"size": 5
						},
						"$type": "block",
						"$items": [
							{
								"$bind": "amount",
								"options": { "columns": true }

							},
							{
								"$bind": "montant",
								"options": { "columns": true }

							},
							{
								"$bind": "liang",
								"options": { "columns": true }

							}

						]
					}
				]
			},
			{
				"$title": {
					"value": "Contribute",
					"$style": "$spo-h2",
					"size": 4
				},
				"$type": "block",
				"$items": [
					{
						"$type": "block",
						"$items": [
							{
								"$bind": "lots",
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
											"$bind": "currency"
										}
									]

								}
							}

						]
					}
				]
			},




			{
				"$title": {
					"value": "Documentation",
					"$style": "$spo-h2",
					"size": 4
				},
				"$type": "block",
				"$items": [
					{
						"$title": {
							"value": "Running documentation locally",
							"$style": "$spo-h3",
							"size": 5
						},
						"$type": "block",
						"$items": [
							{
								"$bind": "birthDate",
								"options": { "columns": true }

							}
						]
					},
					{
						"$title": {
							"value": "Documentation for previous releases",
							"$style": "$spo-h3",
							"size": 5
						},
						"$type": "block",
						"$items": [
							{
								"$bind": "memo",
								"options": { "columns": true, "rows": 5}
							}
						]
					}

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
			},
			"amount": { "title": "Amount", "type": "number", "format": "money", "description": "Amount" },
			"montant": { "title": "Montant", "description": "Amount", "type": "number", "format": "money", "minimum": -50, "exclusiveMinimum": true, "maximum": 1000, "exclusiveMaximum": true },
			"liang": { "title": "量", "type": "number", "format": "money", "description": "Amount" },
			"lots": {
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
			},
			"birthDate": { "title": "Your birth date", "type": "string", "format": "date" },
			"memo": { "title": "Options", "type": "string", "format": "json" }

		},
		"states": {
			"montant": { "symbol": "€", "decimals": 2 }
		},
		"links": {
			"link1": { "title": "Save the option" },
			"link2": { "title": "Cancel" }

		}


	};
	var data = {
		wizard: "T",
		lots: [
			{ id: 1000, Libelle: "Lot  1000", status: "R", date_status: "2014-03-12", lotplace: true, "currency": "USD" },
			{ id: 1001, Libelle: "Lot  1000", status: "S", date_status: "2014-03-18", lotplace: true, "currency": "GBP" },
			{ id: 1011, Libelle: "Lot  1000", status: "S", date_status: "2014-05-18", lotplace: false, "currency": "EUR" },
			{ id: 1031, Libelle: "Lot  1000", status: "V", date_status: "2014-05-18", lotplace: false, "currency": "EUR" },
			{ id: 1215, Libelle: "Lot  1000", status: "O", date_status: "2014-06-10", lotplace: false, "currency": "GBP" }
		],
		amount: 10000,
		montant: 8890.32,
		liang: 180002.555,
		$states: { liang: { symbol: "¥", decimals: 3 } }



	};

	(function om() {
		Phoenix.ui.OpenForm(
			$('#form'), layout, schema, data, {},
			function (action, data) {
				switch (action.property) {
				}
			});
	})();

});

