/* global $ */
$(function () {
	var layout = {
		"name": "form",
		"$type": "block",
		"$items": [
			{
				"$type": "html",
				"$html": "Grid",
				"$style": "bs-widget-title accession-h1",
				"$items": []
			},
			{
				"$type": "block",
				
				"$items": [
				]
			},
			{
				"$type": "block",
				"$items": [
					{
						"$bind": "Offres",
						"$widget": "basicgrid",
						"$name": "g112",
						"options": {
							"autofocus": true,
							"selecting": {
								"cell": true,
								"row": true,
							},
							"total": {
								"property": "total"
							},
							"height": "250px",
							"align": "middle",
							"border": true,
							"allowColumnResize": true,
							"headerIsHidden": false,
							"scrolling": {
								"horizontal": true,
								"vertical": true
							},
							"editing": true,

							"toolbar": {
								"parentName": "toolbar",
								"items": [
									{
										"type": "select",
										"title": "Programme",
										"value": {
											"default": "OP0001|VEFA",
											"items": [
												{
													"code": "OP0001|VEFA",
													"lib": "Accession VEFA"
												},
												{
													"code": "OP0001|PSLA",
													"lib": "PSLA"
												}
											]
										}
									},
									{
										"type": "filterexpress",
										"name": "filterexpress",
										"fields": [
											"lotNum",
											"lotIdType"
										]
									},
									{
										"type": "select",
										"name": "grilledeprix",
										"title": "Modèle",
										"value": {
											"default": "model1",
											"items": [
												{
													"code": "model1",
													"lib": "standard"
												}
											]
										}
									},
									{
										"type": "default",
										"name": "options",
										"icon": "wrench"
									},
									{
										"type": "dropdownaction",
										"name": "actionsurcolonne",
										"actions": [
											{
												"code": "Ajouter une nouvelle règle de gestion"
											},
											{
												"code": "Afficher la règle de gestion"
											}
										]
									},
									{
										"type": "links",
										"options": {
											"icon": "bars",
											"titleIsHidden": false
										},
										"links": [
											{
												"name": "$new",
												"options":  {
													"icon": "plus-circle",
													"type": "important"
												},
												"important": true
											},
											{
												"name": "$remove",
												"options":  {
													"icon": "trash",
													"titleIsHidden": true,
													"type": "danger"
													
												},
												"important": true
											},
											{
												"name": "move",
											},
											{
												"name": "addstar"
											},
											{
												"name": "changelabels"
											},
											{
												"name": "mute"
											},
											{
												"name": "spam"
											}
										]
									},
									{
										"type": "count"
									}
								]
							},
							"columns": [
								{ "$bind": "Type", "options": { "editing": false, "selecting": false, "width": 120, "frozen": false } },
								{ "$bind": "Libelle", "options": { "width": 200, "frozen": false } },
								{ "$bind": "country", "options": { "width": 80, "$lookup": "OdataCountry", "lookupColumns_test": ['code'] } },
								{ "$bind": "Date", "options": { "width": "8em" } },
								{ "$bind": "Price", "options": { "width": "10em", "align": "right" } },
								{ "$bind": "VAT", "options": { "width": "10em", "align": "right" } },
								{ "$bind": "Imported", "options": { "width": "4em" } },
								{ "$bind": "countryTitle", "options": { "width": 120, "$lookup": "OdataCountry", "editing": false, "selecting": false } }
							]

						}
					}
				]
			},
			{
				"$type": "block",
				"$items": [
				]
			}

		]
	};
	var schema = {
		"type": "object",
		"properties": {
			"OAT": { "title": "OAT", "type": "boolean" },
			"SWAP": { "title": "SWAP", "type": "boolean" },
			"Name": { "title": "Nom", "type": "string" },
			"Offres": {
				"type": "array",
				"items": { "$ref": "#/definitions/Item" },
				"links": {
					"$new": {
						"title": "Compose"
					},
					"$remove": {
						"title": "Remove",
						"select" : {
							"multiselect": false
						}
					},
					"move": {
						"title": "Move",
						"select" : {
							"multiselect": false
						}
					},
					"addstar": {
						"title": "Add Star",
						"select" : {
							"multiselect": true
						}
					},
					"changelabels": {
						"title": "Change Labels",
						"select" : {
							"multiselect": true
						}
					},
					"mute": {
						"title": "Mute",
						"select" : {
							"multiselect": true
						}
					},
					"spam": {
						"title": "Report as spam",
						"select" : {
							"multiselect": true
						}
					}
				}
			},
			"total": {
				"type": "array",
				"items": { "$ref": "#/definitions/Item" }
			}

		},
		"states": {
			"Name": { "isMandatory": true }
		},
		"links": {
			"add": { "title": "{{add}}" },
			"editor": { "title": "Open Column Editor" }
		},
		"definitions": {
			"Item": {
				"name": "Item",
				"type": "object",
				"lookups": {
					"OdataCountry": {
						"data": {
							"$type": "odata",
							"$params": {
								"$entity": "Country",
								"$filter": {
									"$left": "code",
									"$op": "eq",
									"$right": "$context.country",
									"$nulls": 'ignore'
								}
							}

						},
						"schema": {
							"type": "object",
							"name": "Country",
							"properties": {
								"documents": {
									"type": "array",
									"items": {
										"type": "object",
										"properties": {
											"code": {
												"type": "string",
												"title": "Code",
												"capabilities": "searchable,sortable,filtrable"
											},
											"title": {
												"type": "string",
												"title": "Description",
												"capabilities": "searchable,sortable,filtrable"
											}
										}
									}
								}
							}
						},
						"primaryKey": "code",
						"mapping": {
							"country": "code",
							"countryTitle": "title"
						}
					}

				},
				"properties": {
					"Type": { "type": "string", title: "Type", "enum": ['oat', 'swap'], "enumNames": ["OAT", "SWAP"], "default": "oat" },
					"Price": { "type": "number", title: "Price", format: "money", maximum: 100000 },
					"idCountry": { "type": "integre", title: "Id Code" },
					"country": { "type": "string", title: "Country Code" },
					"countryTitle": { "type": "string", title: "Country Title" },
					"Imported": { "type": "boolean", title: "Imported" },
					"Date": { "type": "string", title: "Date", format: "date" },
					"Libelle": { "type": "string", title: "Libelle", maxLength: 50 },
					"VAT": { "type": "number", title: "VAT", "decimals": 2 },
					"Selected": { "type": "boolean", title: "Selected" }
				},
				"states": {
					"Imported": { "isReadOnly": false }
				}

			}
		}

	};



	var data = {
		OAT: true, Name: "EEEE",
		Offres: [
			{ Libelle: "Offre BP", Type: "oat", Imported: false, Date: "2001-05-11", VAT: 9999.253, Selected: false, Price: 9999.77 },
			{ Libelle: "Offre CL", Type: "swap", Imported: true, Date: "2001-05-11", VAT: 33, Selected: true, Price: 102.5 },
			{ Libelle: "Offre CE", Type: "oat", Imported: true, Date: "2001-05-11", VAT: 45.22, Selected: false, Price: 58.22 },
			{ Libelle: "Offre BP", Type: "oat", Imported: false, Date: "2001-05-11", VAT: 9999.253, Selected: false, Price: 9999.77 },
			{ Libelle: "Offre CL", Type: "swap", Imported: true, Date: "2001-05-11", VAT: 33, Selected: true, Price: 102.5 },
			{ Libelle: "Offre CE", Type: "oat", Imported: true, Date: "2001-05-11", VAT: 45.22, Selected: false, Price: 99.22 },
			{ Libelle: "Offre BP", Type: "oat", Imported: false, Date: "2001-05-11", VAT: 9999.253, Selected: false, Price: 9999.77 },
			{ Libelle: "Offre CL", Type: "swap", Imported: true, Date: "2012-05-11", VAT: 33, Selected: true, Price: 102.5 },
			{ Libelle: "Offre CE", Type: "oat", Imported: true, Date: "2001-05-11", VAT: 45.22, Selected: false, Price: 958.77 },
			{ Libelle: "Offre BP", Type: "oat", Imported: false, Date: "2001-05-11", VAT: 9999.253, Selected: false, Price: 9999.77 },
			{ Libelle: "Offre CL", Type: "swap", Imported: true, Date: "2001-05-11", VAT: 33, Selected: true, Price: 102.5 },
			{ Libelle: "Offre CE", Type: "oat", Imported: true, Date: "2001-05-11", VAT: 45.22, Selected: false, Price: 88.88 },
			{ Libelle: "Offre BP", Type: "oat", Imported: false, Date: "2001-05-11", VAT: 9999.253, Selected: false, Price: 9999.77 },
			{ Libelle: "Offre CL", Type: "swap", Imported: true, Date: "2001-05-11", VAT: 33, Selected: true, Price: 102.5 },
			{ Libelle: "Offre CE", Type: "oat", Imported: true, Date: "2001-05-11", VAT: 45.22, Selected: false, Price: 9999.77 },
			{ Libelle: "Offre BP", Type: "oat", Imported: false, Date: "2001-05-11", VAT: 9999.253, Selected: false, Price: 9999.77 },
			{ Libelle: "Offre CL", Type: "swap", Imported: true, Date: "2001-05-11", VAT: 33, Selected: true, Price: 102.5 },
			{ Libelle: "Offre CE", Type: "oat", Imported: true, Date: "2001-05-11", VAT: 45.22, Selected: false, Price: 302.5 }

		],
		total: [
			{ VAT: 9999.253, caracTA: { Price: 9999.77 } }

		]
	};

	(function om() {
		var odataProvider = Phoenix.data.odata;
		odataProvider.registerEntity('Country', countries);

		Phoenix.ui.OpenForm(
			$('#form'), layout, schema, data, {},
			function (action, data, formControl) {
			});
	})();



});

