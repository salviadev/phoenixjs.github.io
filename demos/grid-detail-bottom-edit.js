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
							"align": "middle",
							"border": true,
							"width": "50em",
							"headerIsHidden": false,
							"scrolling": {
								"horizontal": true
							},
							"selecting": {
								"row": true
							},
							"columns": [
								{ "$bind": "Type", "options": { "width": "100%", "$link": { "$page": "edit-user", "$module": "admin", "$search": [{ "left": "id", "right": "$item.Type" }] } } },
								{ "$bind": "caracTA.Price", "options": { "width": "12em", "align": "right" } },
								{ "$bind": "$links.remove", "options": { "width": "4em", "button": false, "icon": "remove" } },
							]

						}
					}
				]
			},
			{
				"$type": "block",
				"$fieldsOptions": {
					"columns": true,
					"labelCol": 1
				},
				"$items": [
					{ $bind: "Offres.$selected.Type", "$widget": "grpbtn" },
					{ $bind: "Offres.$selected.Libelle" },
					{ $bind: "Offres.$selected.email" },
					{ $bind: "Offres.$selected.caracTA.Price" },

				]
			},
			{
				"$type": "block",
				"$inline": true,
				"$items": [
					{ $bind: "$links.setData", options: { right: true } },
					{ $bind: "$links.addLine", options: { right: true } },
					{ $bind: "$links.select1stLine", options: { right: true } }
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
                "description": "This is a table",
				"items": {
					"type": "object",
                    "primaryKey": "Type,Date",
					"properties": {
						"Type": { "type": "string", title: "Type", "enum": ['oat', 'swap'], enumNames: ['OAT', 'SWAP'], "default": "oat" },
						"caracTA": {
							"type": "object",
							"properties": {
								"Price": {
									"type": "number", "title": "Price", "format": "money"
								}
							}

						},
						"Date": { "type": "string", title: "Date", format: "date" },
						"Libelle": { "type": "string", title: "Libelle" },
						"VAT": { "type": "number", title: "VAT", "decimals": 2 },
						"email": { "type": "string", title: "Email", format: 'email'},
						"Selected": { "type": "boolean", title: "Selected" }
					},
					"links": {
						"remove": {}
					},
                    "states": {
                        "Libelle": { "isMandatory": true },
                        "Type": { "isMandatory": true },
                        "Date": { "isMandatory": true }
                    }

				}
			}

		},
		"states": {
			"Name": { "isMandatory": true }
		},
		"links": {
			"setData": { title: "Reload" },
			"addLine": { title: "Add" },
			"select1stLine": { title: "Select 1st line" }
		}


	};
	var data = {
		OAT: true, 
		Name: "EEEE",
		Offres: [
			{ Libelle: "Offre BP", Type: "oat", Date: "2001-05-11", VAT: 400.253, caracTA: { Price: 300.77, $states: { Price: { decimals: 0 } } } },
			{ $select: true, Libelle: "Offre CL", Type: "swap", Date: "2001-05-11", VAT: 33, Selected: true, caracTA: { Price: 102.5, $states: { Price: { isHidden: true, decimals: 2 } } } },
			{ Libelle: "Offre CE", Type: "oat", Date: "2016-05-11", VAT: 45.22, $states: {Type: {isDisabled: true}}, caracTA: { Price: 525.55, $states: { Price: { isReadOnly: true, decimals: 3 } } } }
		]
	};
	var offres = $.extend(true, {}, data);

	(function om() {
		Phoenix.ui.OpenForm(
			$('#form'), layout, schema, data, {},
			function (action, data, formControl) {
				console.log(action);
				switch (action.property) {
					case "Offres.$item.$links.remove":
						data.Offres.remove(action.actionParams);
						break;
					case "$links.setData":
						data.Offres = $.extend(true, {}, offres).Offres;
						break;
					case "$links.addLine":
						data.Offres.clearSelection();
						data.Offres.push({$select: true, caracTA:{}});
						break;
				}
			});
	})();



});

