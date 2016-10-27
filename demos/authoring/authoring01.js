
/* global Phoenix */
$(function () {
	var schema = {
		"type": "object",
		"properties": {
			"Name": { "type": "string", "title": "Name" },
			"Type": {
				"type": "string", "title": "Type",
				"enum": ["fire", "grass", "ground", "water"],
				"enumNames": ["Fire", "Grass", "Ground", "Water"],
				"default": "ground"
			},
			"DateOfBirth": { "type": "string", "title": "Date of birth", "format": "date" },
			"PV": { "type": "integer", "title": "PV" },
			"Price": { "type": "number", "format": "money", "title": "Price" }
		},
		"links": {
			"save": { "title": "Save" }
		}


	};
	var layout = {
		"$type": "block",
		"$items": [
			{
				"$type": "accordion",
				"$widget": "tabs",
				"$items": [
					{
						"opened": true,
						"$type": "accordion-group",
						"$items": [{"$type": "block", "$items": [{ "$bind": "PV" }] }]
					},
					{
						"$type": "accordion-group",
						"$items": [{"$type": "block", "$items": [{ "$bind": "Price" }] }]
					}
				]
			},
			{
				"$items": [
					{
						"$type": "block",
						"$items": [{ "$bind": "Name" }]
					},
					{
						"$type": "row",
						"$items": [
							{
								"$items": [{ "$bind": "Type" }, { "$bind": "DateOfBirth" }],
								"$colSize": 6
							},
							{
								"$items": [{ "$bind": "PV" }, { "$bind": "Price" }],
								"$colSize": 6
							}
						]
					}
				],
				"$type": "block"
			},
			{
				"$type": "row",
				"$items": [
					{
						"$items": [],
						"$colSize": 6
					},
					{
						"$items": [{ "$bind": "$links.save", "options": { "right": true, "type": "success" } }],
						"$colSize": 6,
						"$inline": true,
						"$fieldsOptions": {
							"columns": false
						}
					}
				]
			}
		],
		"form": true
	};

	var tbData = {
		"$type": "groups",
		"$items": [
			{
				"$type": "group", "$typeItems": "layouts", "$items": [
					{ "$type": "item", "$title": "Block", "data": { "$type": "layout", "data": { "$type": "block" } } },
					{ "$type": "item", "$title": "Row", "data": { "$type": "layout", "data": { "$type": "row", "$items": [{}, {}] } } },
					{ "$type": "item", "$title": "Accordion", "data": { "$type": "layout", "data": { "$type": "accordion", "$widget": "tabs", "$items": [{ "opened": true }, {}] } } }
				]
			},
			{ "$type": "group", "$typeItems": "fields", "$items": [] }

		]
	};

	var pe = new Phoenix.authoring.AuthoringEditor({ design: true, form: true }, tbData);
	pe.render($('#auth'));

	Phoenix.ui.OpenForm($('#content'), layout, schema, { Name: 'Taupiqueur', Type: 'ground', DateOfBirth: '2001-01-12', PV: 120, Price: 15000 }, {}, function () { }, { design: true }, function (form) {
		form.saveHandler = function (cd) {
			console.log(JSON.stringify(cd, null, 2));
		};

	});	

});

