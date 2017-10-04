/* global $ */
$(function () {
	var layout = {
		"name": "form",
		"$type": "block",

		"$items": [
			{
				"$type": "html",
				"$html": "Buttons",
				"$style": "bs-widget-title accession-h1",
				"$items": []
			},
			{
				"$title": {
					"value": "Buttons choix binaires",
					"$style": "$spo-h2",
					"size": 4
				},
				"$type": "block",
				"$items": [
					{
						"$type": "block",
						"$inline": true,
						"$items": [
							{
								"$bind": "mode", "$widget": "grpbtn", "options": {"binary": true, titleIsHidden: true}
							},
							{
								"$bind": "unit", "$widget": "grpbtn", "options": {"binary": true, titleIsHidden: true}
							},
							{
								"$bind": "modecomplex", "$widget": "grpbtn", "options": {"binary": true, titleIsHidden: true}
							}
						]
					}
				]
			},
			{
				"$title": {
					"value": "Buttons activation coix affichage",
					"$style": "$spo-h2",
					"size": 4
				},
				"$type": "block",
				"$items": [
					{
						"$type": "block",
						"$inline": true,
						"$items": [
							{
								"$bind": "lzero", "$widget": "toggle"
							},
							{
								"$bind": "yesno", "$widget": "grpbtn", "options": {"binary": true, titleIsHidden: true}
							},
							{
								"$bind": "ctype", "$widget": "grpbtn", "options": {"binary": false, titleIsHidden: true}
							}
						]
					}
				]
			},
			{
				"$title": {
					"value": "Buttons choix metier avec fort impact",
					"$style": "$spo-h2",
					"size": 4
				},
				"$type": "block",
				"$items": [
					{
						"$type": "block",
						"$inline": true,
						"$items": [
							{
								"$bind": "$links.link1",
								"options": { "type": "important"}
							},
							{
								"$bind": "$links.link2",
								"options": { "type": "success"}
							},
							{
								"$bind": "$links.link3",
								"options": { "type": "primary", "icon":"plus-circle" }
							},							,
							{
								"$bind": "$links.link4",
								"options": { "type": "primary", "icon":"plus-circle"}
							}
						]
					}
				]
			},
			{
				"$title": {
					"value": "Buttons Bootstrap",
					"$style": "$spo-h2",
					"size": 4
				},
				"$type": "block",
				"$items": [
					{
						"$type": "block",
						"$inline": true,
						"$items": [
							{
								"$bind": "$links.link5",
								"options": { "type": "important"}
							},
							{
								"$bind": "$links.link6",
								"options": { "type": "primary"}
							},
							{
								"$bind": "$links.link7",
								"options": { "type": "secondary" }
							},							,
							{
								"$bind": "$links.link8",
								"options": { "type": "success"}
							},
							{
								"$bind": "$links.link12",
								"options": { "type": "info"}
							},
							{
								"$bind": "$links.link9",
								"options": { "type": "danger"}
							},
							{
								"$bind": "$links.link10",
								"options": { "type": "warning"}
							},
							{
								"$bind": "$links.link11",
								"options": { "type": "link"}
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
			"mode": {
				"ux": true,
				"type": "string",
				"enum": [
					"TTC",
					"HT"
				],
				"enumNames": [
					"TTC",
					"HT"
				],
			},
			"modecomplex": {
				"ux": true,
				"type": "string",
				"enum": [
					"HT",
					"TTC",
					"F"
				],
				"enumNames": [
					"HT",
					"TTC",
					"Fiscalisé"
				],
			},
			"unit": {
				"type": "string",
				"enum": [
					"K€",
					"€"
				],
				"enumNames": [
					"K €",
					"€"
				],
			},
			"lzero": {
				"type": "boolean",
				"title": "Ligne à zéro"
			},
			"yesno": {
				"type": "string",
				"enum": [
					"Y",
					"N"
				],
				"enumNames": [
					"Oui",
					"Non"
				],
			},
			"ctype": {
				"type": "string",
				"enum": [
					"N",
					"T",
					"D",
					"M"
				],
				"enumNames": [
					"Non",
					"Type",
					"Date de création",
					"Date de dernierère modification"
				],
			}
		},
		"links": {
			"link1": { "title": "Consolider" },
			"link2": { "title": "Appliquer" },
			"link3": { "title": "Option" },
			"link4": { "title": "Un montant" },
			"link5": { "title": "Important" },
			"link6": { "title": "Primary" },
			"link7": { "title": "Secondary" },
			"link8": { "title": "Success" },
			"link12": { "title": "Info" },
			"link9": { "title": "Danger" },
			"link10": { "title": "Warning" },
			"link11": { "title": "Link" }
		}
	};
	var data = {
		mode: "TTC",
		modecomplex: "HT",
		unit: "K€",
		yesno: "N",
		ctype: "T",
		lzero: false



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

