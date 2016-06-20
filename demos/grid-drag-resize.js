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
						"$bind": "Pokemon",
						"$widget": "basicgrid",
						"options": {
							"height": "250px",
							"align": "middle",
							"border": true,
							"headerIsHidden": false,
							"scrolling": {
								"vertical": true
							},
							"selecting": {
								"row": true
							},
							"allowFrozenColumns": true,
							"columns": [
								{ "$bind": "$index", "options": { "frozen": true, "width": 50 } },
								{ "$bind": "Name", "options": { "frozen": true, "width": 200 } },
                                { "$bind": "Type", "options": { "frozen": true, "width": 200 } },
                                { "$bind": "DateOfBirth", "options": { "width": 300 } },
								{ "$bind": "PV", "options": { "width": 450 } },
								{ "$bind": "Price", "options": { "width": 800 } },
							]
						}
					}
				]
			}
		]
	};
	var schema =
    {
		"type": "object",
		"properties": {
			"Pokemon": {
				"type": "array",
				"items": {
					"type": "object",
					"properties": {
                        "Name": { "type": "string", "title": "Name (frozen)" },
                        "Type": {
                            "type": "string", "title": "Type (frozen)",
                            "enum": ["fire", "grass", "ground", "water"],
                            "enumNames": ["Fire", "Grass", "Ground", "Water"],
                            "default": "ground"
                        },
                        "DateOfBirth": { "type": "string", "title": "Date of birth", "format": "date" },
                        "PV": { "type": "integer", "title": "PV" },
                        "Price": { "type": "number", "format": "money", "title": "Price" }
					}
				}
			}
		}
	};
	var data = {
		Pokemon: [
            {Name : "Taupiqueur", Type : "ground", DateOfBirth : "2004-12-16", PV : 150, Price : 350},
            {Name : "Reptincel", Type : "fire", DateOfBirth : "1986-12-04", PV : 220, Price : 600},
            {Name : "Locklass", Type : "water", DateOfBirth : "1983-06-06", PV : 300, Price : 1050},
            {Name : "Florizare", Type : "grass", DateOfBirth : "2008-12-01", PV : 330, Price : 1860},
            {Name : "Machoc", Type : "ground", DateOfBirth : "2000-02-14", PV : 80, Price : 250},
            {Name : "Sabelette", Type : "ground", DateOfBirth : "1985-08-27", PV : 120, Price : 360},
            {Name : "Noadkoko", Type : "grass", DateOfBirth : "2001-06-02", PV : 180, Price : 630},
            {Name : "Feunard", Type : "fire", DateOfBirth : "1996-05-13", PV : 280, Price : 1200},
            {Name : "Arcanin", Type : "fire", DateOfBirth : "2003-01-31", PV : 420, Price : 1520},
            {Name : "Hypocéan", Type : "water", DateOfBirth : "2001-09-03", PV : 290, Price : 800},
            {Name : "Pyroli", Type : "fire", DateOfBirth : "2004-05-04", PV : 250, Price : 1000},
        ]
	};

	(function om() {
		Phoenix.ui.OpenForm($('#form'), layout, schema, data, {});
	})();
});

