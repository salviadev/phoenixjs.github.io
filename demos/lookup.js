/* global $ */
$(function () {
	var layout = {
		"name": "form",
		"$type": "block",
		"$items": [
			{
				"$type": "block",
				"$title": {
					"value": "All data find by title"
				},
				"$items": [
					{ "$bind": "countryCode", "$display": "Titles.countryTitle", "$lookup": "Country", "options": { "columns": true } }
				]
			},
			{
				"$type": "block",
				"$title": {
					"value": "All data find by code"
				},
				"$items": [
					{ "$bind": "countryCode", "$display": "countryCode", "$lookup": "Country", "options": { "columns": true } }
				]
			},
			{
				"$type": "block",
				"$title": {
					"value": "Paginated data find by title"
				},
				"$items": [
					{
						"$bind": "odataCountryCode",
						"$display": "Titles.odataCountryTitle",
						"$lookup": "OdataCountry",
						"options": {
							"columns": true
						}
					}
				]
			},
			{
				"$type": "block",
				"$title": {
					"value": "Paginated data find by code"
				},
				"$items": [
					{
						"$bind": "odataCountryCode",
						"$display": "odataCountryCode",
						"$lookup": "OdataCountry",
						"options": { "lookupColumns": ['code'], "columns": true }
					}
				]
			}


		]
	};
	let inlineValue = countries;
	var schema = {
		"lookups": {
			"Country": {
				"data": {
					"$type": "inline",
					"$value": inlineValue,
				},
				"primaryKey": "code",
				"mapping": {
					"countryCode": "code",
					"Titles.countryTitle": "title"
				}
			},
			"OdataCountry": {
				"data": {
					"$type": "odata",
					"$params": {
						"$entity": "Country",
						"$filter": {
							$left: "code",
							$op : "eq",
							$right: "$context.fcode",
							$nulls: 'ignore'
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
					"odataCountryCode": "code",
					"Titles.odataCountryTitle": "title"
				}
			}

		},
		"properties": {
			"countryCode": {
				"title": "Country Code",
				"type": "string"
			},
			"odataCountryCode": {
				"title": "Odata Country Code",
				"type": "string"
			},
			"fcode": {
				"title": "Internal fcode",
				"type": "string"
			},
			"date": {
				"title": "Date",
				"type": "string",
				"format": "date"
			},
			"Titles": {
				"type": "object",
				"properties": {
					"countryTitle": {
						"title": "Country Title",
						"type": "string"
					},
					"odataCountryTitle": {
						"title": "Odata Country Title",
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
	var data = { fcode: 'xxx'};

	(function om() {
		var odataProvider = Phoenix.data.odata;
		odataProvider.registerEntity('Country', countries);


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


