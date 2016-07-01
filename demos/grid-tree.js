/* global $ */
$(function () {
	var schema = {
		"type": "object",
		"properties": {
			"documents": {
				"type": "array",
				"items": { "$ref": "#/definitions/Population" }
			}

		},
		"links": {
            "action": { "title": "Tree test" }
		},
		"definitions": {
			"Population": {
				"name": "Population",
				"type": "object",
				"properties": {
					"Name": { "type": "string", "title": "Name" },
					"Description": { "type": "string", "title": "Description" },
					"Area": { "type": "integer", "title": "Area" },
					"Population": { "type": "integer", "title": "Population" },
					"TimeZone": { "type": "string", "title": "Time Zone" },
					"children": {
						"type": "array",
						"items": { "$ref": "#/definitions/Population" }

					}
				}
			}
		}


	};

	var layout = {
		"name": "form",
		"$type": "block",
		"$items": [
			{
				"$type": "block",
				"$items": [
					{
						"$bind": "documents",
						"$widget": "basicgrid",
						"options": {
							"height": 300,
							"scrolling": {
								"vertical": true
							},
                            "selecting": {
								"row": true,
                                "multiselect": false
							},
                            "toolbar": {
								"items": [
									{
										"type": "multiselect"
									}
								]
							},

							"expandingProperty": "children",
                            "border": true,
							"allowColumnResize": true,
							"columns": [
								{ "$bind": "$expand", "options": { "width": 200, "display": "Name" } },
                                { "$bind": "Description", "options": { "width": 200 } },
                                { "$bind": "Area", "options": { "width": 200 } },
								{ "$bind": "Population", "options": { "width": 200 } },
								{ "$bind": "TimeZone", "options": { "width": 200 } },
							]
						}
					}

				]
			},
			{
				"$type": "block",
				"$items": [{ "$bind": "$links.action" }]
			}
		]
	};

	var data = {
		"documents": [
			{
				"Name": "United States of America",
				"Description": "United States of America",
				"Area": 9826675,
				"Population": 318212000,
				"TimeZone": "UTC -5 to -10",
				"children": [
					{
						"Name": "California",
						"Description": "The Tech State",
						"Area": 423970,
						"Population": 38340000,
						"TimeZone": "Pacific Time",
						"children": [
							{
								"Name": "San Francisco",
								"Description": "The happening city",
								"Area": 231,
								"Population": 837442,
								"TimeZone": "PST"
							},
							{
								"Name": "Los Angeles",
								"Description": "Disco city",
								"Area": 503,
								"Population": 3904657,
								"TimeZone": "PST"
							}
						]
					},
					{
						"Name": "Illinois",
						"Description": "Not so cool",
						"Area": 57914,
						"Population": 12882135,
						"TimeZone": "Central Time Zone",
						"children": [
							{
								"DemographicId": 6,
								"ParentId": 5,
								"Name": "Chicago",
								"Description": "Financial City",
								"Area": 234,
								"Population": 2695598,
								"TimeZone": "CST"
							}
						]
					},
					{
						"Name": "Texas",
						"Description": "Rances, Oil & Gas",
						"Area": 268581,
						"Population": 26448193,
						"TimeZone": "Mountain"
					},
					{
						"Name": "New York",
						"Description": "The largest diverse city",
						"Area": 141300,
						"Population": 19651127,
						"TimeZone": "Eastern Time Zone",
						"children": [
							{
								"Name": "Manhattan",
								"Description": "Time Square is the place",
								"Area": 269.403,
								"Population": 0,
								"TimeZone": "EST",
								"children": [
									{
										"Name": "Manhattan City",
										"Description": "Manhattan island",
										"Area": 33.77,
										"Population": 0,
										"TimeZone": "EST"
									},
									{
										"Name": "Time Square",
										"Description": "Time Square for new year",
										"Area": 269.4,
										"Population": 0,
										"TimeZone": "EST"
									}
								]
							},
							{
								"Name": "Niagra water fall",
								"Description": "Close to Canada",
								"Area": 65.7,
								"Population": 0,
								"TimeZone": "EST"
							},
							{
								"Name": "Long Island",
								"Description": "Harbour to Atlantic",
								"Area": 362.9,
								"Population": 0,
								"TimeZone": "EST"
							}
						]
					},
					{
						"DemographicId": 51,
						"ParentId": 1,
						"Name": "All_Other",
						"Description": "All_Other demographics",
						"Area": 0,
						"Population": 0,
						"TimeZone": 0
					}
				]
			},
			{
				"Name": "France", "Description": "France", "Area": 675000, "Population": 67314000, "TimeZone": "UTC+1",
				"children": [
					{
						"Name": "Île-de-France", "Description": "Île-de-France", "Area": 12011, "Population": 11959807, "TimeZone": "UTC+1"
					}
				]
			},
			{
				"Name": "Germany", "Description": "Germany", "Area": 357168, "Population": 81770900, "TimeZone": "UTC+1"
			},
			{
				"Name": "Italy", "Description": "Italian Republic", "Area": 301338, "Population": 60674003, "TimeZone": "UTC+1"
			},
			{
				"Name": "Poland", "Description": "Republic of Poland", "Area": 312679, "Population": 38483957, "TimeZone": "UTC+1"
			},
			{
				"Name": "Spain", "Description": "Kingdom of Spain", "Area": 505990, "Population": 46423064, "TimeZone": "UTC+1"
			},
			{
				"Name": "Portugal", "Description": "Portuguese Republic", "Area": 92391, "Population": 81770900, "TimeZone": "UTC+0"
			},
			{
				"Name": "Great Britain", "Description": "United Kingdom", "Area": 209331, "Population": 5969056, "TimeZone": "UTC0"
			},
			{
				"Name": "India",
				"Description": "Hydrabad tech city",
				"Area": 9826675,
				"Population": 318212000,
				"TimeZone": "IST"
			},
			{
				"Name": "Bangladesh",
				"Description": "Country of love",
				"Area": 9826675,
				"Population": 318212000,
				"TimeZone": "BST"
			}


		]
	};

	(function om() {
		Phoenix.ui.OpenForm(
			$('#form'), layout, schema, data, {},
			function (action, data, formControl) {
				//console.log(action);
				if (action.property === "$links.action") {
					let pachoc = data.pokemons.get(4)
					let litten = pachoc.mutants.get(1);

					window.setTimeout(function () {
						litten.mutants.get(0).PV = 500;
					}, 0)

				}

			});
	})();



});

