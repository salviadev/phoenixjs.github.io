/* global $ */
$(function () {
	var layout = {
		"name": "form",
		"$type": "block",
		"$items": [
			{
				"$bind": "libelle"
			},
			{
				"$bind": "preteur"
			},
			{
				"$bind": "pict",
				"$widget": "icon"
			},
			{
				"$bind": "pict2",
				"$widget": "image"
			},
			{
				"$bind": "dateFinValidite"
			},
			{
				"$bind": "charte",
				"$widget": "grpbtn"
			},
			{
				"$bind": "gissier",
				"$widget": "grpbtn"
			},
			{
				"$bind": "montant"
			},
			{
				"$bind": "dateDebut"
			},
			{
				"$bind": "commissionsEuros"
			},
			{
				"$bind": "commissionsPourc"
			},
			{
				"$bind": "dureeAns"
			},
			{
				"$bind": "dureeMois"
			}
		]
	};
	var schema = {
		"type": "object",
		"properties": {
			"libelle": { "title": "Libellé", "type": "string" },
			"preteur": { "title": "Preteur", "type": "string"},
			"pict":
			{
				"title": "Pic",
				"type": "string"
			},
			"pict2":
			{
				"title": "Pic2",
				"type": "string"
			},
			"dateFinValidite": { "title": "Date fin de validité", "type": "string", "format": "date"},			
			"charte": { "title": "Charte", "type": "string", "enum": [
				"1",
				"2",
				"3",
				"4",
				"5",
				"6"
			] },
			"gissier": { "title": "Gissier", "type": "string", "enum": [
				"A",
				"B",
				"C",
				"D",
				"E",
				"F"
			] },
			"typeFinancement": { "title": "Type de financement", "type": "string"},
			"montant": { "title": "Montant", "type": "string"},
			"dateDebut": { "title": "Date de début", "type": "string", "format": "date"},
			"commissionsEuros": { "title": "Commissions", "type": "string"},
			"commissionsPourc": { "title": "%", "type": "string"},
			"dureeAns": { "title": "Durée", "type": "string"},
			"dureeMois": { "title": "Mois", "type": "string"}
		},
		"states": {
			"hidden": { "isMandatory": true },
			"readOnly": { "isReadOnly": true },
			"pict" : { "isHidden": true }
		},
		"links": {
			"hidden": { "title": "Toggle Hidden" },
			"disabled": { "title": "Toggle Disabled" },
			"h": { "title": "Hidden" },
			"d": { "title": "Disabled" },
			"r": { "title": "ReadOnly" },
			"m": { "title": "Mandatory" }
		}


	};
	var data = {
		libelle: "Offre LBP #1",
		preteur: "La Banque Postale",
		dateFinValidite: "2015-09-15",
		charte: "1",
		gissier: "A",
		montant: "10 000 000,00 €",
		dateDebut: "2015-10-01",
		commissionsEuros: "10 000,00 €",
		commissionsPourc: "0,1%",
		dureeAns: "15",
		dureeMois: "0",
		pict: "http://www.lyceebazin.net/images/module_image/LogoTwitter.png",
		pict2: "http://www.adgcf.fr/upload/partenaire/0001/130916-060957-sage_large.gif"
	};

	(function om() {
		Phoenix.ui.OpenForm(
			$('#form'), layout, schema, data, {},
			function (action, data) {
				switch (action.property) {
					case "grp":
					    data.$states.edit.isHidden = (data.grp ==="Hidden");
						data.$states.edit.isDisabled = (data.grp ==="Disabled");
						data.$states.edit.isReadOnly = (data.grp ==="ReadOnly");
						data.$states.edit.isMandatory = (data.grp ==="Mandatory");
						break;
					case "$links.hidden":
						data.$states.hidden.isHidden = !data.$states.hidden.isHidden;
						break;
					case "$links.disabled":
						data.$states.disabled.isDisabled = !data.$states.disabled.isDisabled;
						break;
					case "$links.h":
						data.$states.edit.isHidden = !data.$states.edit.isHidden;
						break;
					case "$links.d":
						data.$states.edit.isDisabled = !data.$states.edit.isDisabled;
						break;
					case "$links.r":
						data.$states.edit.isReadOnly = !data.$states.edit.isReadOnly;
						break;
					case "$links.m":
						data.$states.edit.isMandatory = !data.$states.edit.isMandatory;
						break;
				}
			});
	})();

});

     