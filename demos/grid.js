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
						"$bind": "Offres",
						"$widget": "basicgrid",
						"options": {
							"selecting": {
								"cell": "true",
								"row": "true"
							},
							"height": "250px",
							"align": "middle",
							"border": true,
							"headerIsHidden": false,
							"scrolling": {
								"horizontal": true,
								"vertical": true	
							},
							"editing": true,
							"columns": [
								{ "$bind": "Type", "options": { "width":  "120", "selectable": true, "editable": true } },
								{ "$bind": "Libelle", "options": { "width": "150", "selectable": true, "editable": true } },
								{ "$bind": "Date", "options": { "width":  "8em", "selectable": true, "editable": true } },
								{ "$bind": "Imported", "options": { "width":  "5em", "selectable": true, "editable": true } },
								{ "$bind": "caracTA.Price", "options": { "width": "10em", "selectable": true, "editable": true, "align": "right" } },
								{ "$bind": "VAT", "options": { "width": "10em", "selectable": true, "align": "right" } },
								{ "$bind": "Selected", "options": { "type": "danger", "width": "6em", "icon": "times" } }
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
			"OAT": { "title": "OAT", "type": "boolean" },
			"SWAP": { "title": "SWAP", "type": "boolean" },
			"Name": { "title": "Nom", "type": "string" },
			"Offres": {
				"type": "array",
				"items": {
					"type": "object",
					"properties": {
						"Type": { "type": "string", title: "Type", "enum": ['oat', 'swap'], "enumNames": ["OAT", "SWAP"], "default": "oat" },
						"caracTA": {
							"type": "object",
							"properties": {
								"Price": {
									"type": "number", title: "Price", format: "money", maximum: 100000
								}
							}

						},
						"Imported": { "type": "boolean", title: "Imported"},
						"Date": { "type": "string", title: "Date", format: "date" },
						"Libelle": { "type": "string", title: "Libelle", maxLength: 20 },
						"VAT": { "type": "number", title: "VAT", "decimals": 2 },
						"Selected": { "type": "boolean", title: "Selected" }
					}

				}
			}

		},
		"states": {
			"Name": { "isMandatory": true }
		},
		"links": {
			"add": { "title": "{{add}}" },
			"editor": { "title": "Open Column Editor" }
		}


	};
	var data = {
		OAT: true, Name: "EEEE",
		Offres: [
			{ Libelle: "Offre BP", Type: "oat", Imported: false, Date: "2001-05-11", VAT: 9999.253, caracTA: { Price: 9999.77 } },
			{ Libelle: "Offre CL", Type: "swap", Imported: true, Date: "2001-05-11", VAT: 33, Selected: true, $states: { Imported: { isReadOnly: true } } , caracTA: { Price: 102.5 } },
			{ Libelle: "Offre CE", Type: "oat", Imported: true, Date: "2001-05-11", VAT: 45.22, caracTA: { $states: { Price: { isReadOnly: true } } } },
			{ Libelle: "Offre BP", Type: "oat", Imported: false, Date: "2001-05-11", VAT: 9999.253, caracTA: { Price: 9999.77 } },
			{ Libelle: "Offre CL", Type: "swap", Imported: true, Date: "2001-05-11", VAT: 33, Selected: true, $states: { Imported: { isReadOnly: true } } , caracTA: { Price: 102.5 } },
			{ Libelle: "Offre CE", Type: "oat", Imported: true, Date: "2001-05-11", VAT: 45.22, caracTA: { $states: { Price: { isReadOnly: true } } } },
			{ Libelle: "Offre BP", Type: "oat", Imported: false, Date: "2001-05-11", VAT: 9999.253, caracTA: { Price: 9999.77 } },
			{ Libelle: "Offre CL", Type: "swap", Imported: true, Date: "2001-05-11", VAT: 33, Selected: true, $states: { Imported: { isReadOnly: true } } , caracTA: { Price: 102.5 } },
			{ Libelle: "Offre CE", Type: "oat", Imported: true, Date: "2001-05-11", VAT: 45.22, caracTA: { $states: { Price: { isReadOnly: true } } } },
			{ Libelle: "Offre BP", Type: "oat", Imported: false, Date: "2001-05-11", VAT: 9999.253, caracTA: { Price: 9999.77 } },
			{ Libelle: "Offre CL", Type: "swap", Imported: true, Date: "2001-05-11", VAT: 33, Selected: true, $states: { Imported: { isReadOnly: true } } , caracTA: { Price: 102.5 } },
			{ Libelle: "Offre CE", Type: "oat", Imported: true, Date: "2001-05-11", VAT: 45.22, caracTA: { $states: { Price: { isReadOnly: true } } } },
			{ Libelle: "Offre BP", Type: "oat", Imported: false, Date: "2001-05-11", VAT: 9999.253, caracTA: { Price: 9999.77 } },
			{ Libelle: "Offre CL", Type: "swap", Imported: true, Date: "2001-05-11", VAT: 33, Selected: true, $states: { Imported: { isReadOnly: true } } , caracTA: { Price: 102.5 } },
			{ Libelle: "Offre CE", Type: "oat", Imported: true, Date: "2001-05-11", VAT: 45.22, caracTA: { $states: { Price: { isReadOnly: true } } } },
			{ Libelle: "Offre BP", Type: "oat", Imported: false, Date: "2001-05-11", VAT: 9999.253, caracTA: { Price: 9999.77 } },
			{ Libelle: "Offre CL", Type: "swap", Imported: true, Date: "2001-05-11", VAT: 33, Selected: true, $states: { Imported: { isReadOnly: true } } , caracTA: { Price: 102.5 } },
			{ Libelle: "Offre CE", Type: "oat", Imported: true, Date: "2001-05-11", VAT: 45.22, caracTA: { $states: { Price: { isReadOnly: true } } } }
			
		]
	};

	(function om() {
		Phoenix.ui.OpenForm(
			$('#form'), layout, schema, data, {},
			function (action, data, formControl) {
				switch (action.property) {
					case "$links.editor":
						formControl.sendMessage("column-list", "Offres", {});
						break;

				}
			});
	})();



});

     