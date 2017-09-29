/* global $ */
$(function () {
	var layout = {
		"name": "form",
		"$type": "block",
		"$items": [
			{
				"$type": "block",
				"$title": {
					value: "Description"
                },
				"$items": [
					{
						"$bind": "birthDate"
					}
				]
			},
			{
				"$type": "block",
                "$title": {
					value: "Inline"
                },
				"$inline": true,
				"$items": [
					{
						"$bind": "birthDate"
					}
				]
			},

            {
				"$type": "block",
                "$title": {
					value: "Column"
                },
				"$items": [
					{
						"$bind": "birthDate",
                        "options": { "columns": true }

					}

				]
			},
			{
				"$type": "row",
				"$items": [
					{
						"$colSize": 3,
						"$items": [
							{
								"$bind": "$$meta-label",
								"options": { "$bind": "birthDate", "columns": true }
							}
						]

					},
					{
						"$colSize": 9,
						"$items": [
							{
								"$bind": "birthDate",
								"options": { "titleIsHidden": true }
							}
						]


					}

				]
			},
            {
				"$type": "block",
                "$inline": true,
                "$title": {
					value: "Actions"
                },
				"$items": [
					{
						"$bind": "$links.link1"
					},
					{
						"$bind": "$links.link2"
					}
				]
			}
		]
	};
	var schema = {
		"type": "object",
		"properties": {
			"birthDate": { "title": "Your birth date", "type": "string", "format": "date" }
		},
		"links": {
			"link1": { "title": "Toggle disabled" },
			"link2": { "title": "Toggle hidden" }

		}


	};
	var data = { amount: 10000, montant: 8890.32, liang: 180002.555, $states: { liang: { symbol: "¥", decimals: 3 } } };

	(function om() {
		let kilo = false;
		Phoenix.ui.OpenForm(
			$('#form'), layout, schema, data, {},
			function (action, data) {
				switch (action.property) {
					case "$links.link1":
						data.$states.birthDate.isDisabled = !data.$states.birthDate.isDisabled;
						break;
					case "$links.link2":
						data.$states.birthDate.isHidden = !data.$states.birthDate.isHidden;
						break;
				}
			});
	})();

});

