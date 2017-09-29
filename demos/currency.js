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
						"$bind": "amount"
					},
					{
						"$bind": "montant"
					},
					{
						"$bind": "liang"
					},
					{
						"$bind": "amount",
						"options": { "titleIsHidden": true }
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
						"$bind": "amount"
					},
					{
						"$bind": "montant"
					},
					{
						"$bind": "liang"
					},
					{
						"$bind": "amount",
						"options": { "titleIsHidden": true }
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
						"$bind": "amount",
						"options": { "columns": true }

					},
					{
						"$bind": "montant",
						"options": { "columns": true }

					},
					{
						"$bind": "liang",
						"options": { "columns": true }

					}

				]
			},
			{
				"$type": "row",
				"$style": "bs-block-title-container",
				"$items": [
					{
							"$title": {
								"value": "Title with edit",
							}
					},
					{
						"$colSize": 6,
						"$inline": true,
						"$items": [
							{
								"$bind": "amount",
								"options": { "titleIsHidden": true, right: true }
							}
						]


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
								"options": { "$bind": "amount", "columns": true }
							}
						]

					},
					{
						"$colSize": 9,
						"$items": [
							{
								"$bind": "amount",
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
					},
					{
						"$bind": "$links.linkKilo"
					}
				]
			}
		]
	};
	var schema = {
		"type": "object",
		"properties": {
			"amount": { "title": "Amount", "type": "number", "format": "money", "description": "Amount" },
			"montant": { "title": "Montant", "description": "Amount", "type": "number", "format": "money", "minimum": -50, "exclusiveMinimum": true, "maximum": 1000, "exclusiveMaximum": true },
			"liang": { "title": "量", "type": "number", "format": "money", "description": "Amount" }
		},
		"states": {
			"montant": { "symbol": "€", "decimals": 2 }
		},
		"links": {
			"link1": { "title": "Toggle disabled" },
			"link2": { "title": "Toggle hidden" },
			"linkKilo": { "title": "Toggle Kilo" }
		}
	};
	var data = { amount: 10000, montant: 8890.32, liang: 180002.555, $states: { liang: { symbol: "¥", decimals: 3 } } };

	(function om() {
		let kilo = false;
		Phoenix.locale.number.decimal = ',';
		Phoenix.ui.OpenForm(
			$('#form'), layout, schema, data, {},
			function (action, data) {
				switch (action.property) {
					case "$links.link1":
						data.$states.montant.isDisabled = !data.$states.montant.isDisabled;
						data.$states.amount.isDisabled = !data.$states.amount.isDisabled;
						data.$states.liang.isDisabled = !data.$states.liang.isDisabled;
						break;
					case "$links.link2":
						data.$states.montant.isHidden = !data.$states.montant.isHidden;
						data.$states.amount.isHidden = !data.$states.amount.isHidden;
						data.$states.liang.isHidden = !data.$states.liang.isHidden;
						break;
					case "$links.linkKilo":
						kilo = !kilo;
						if (kilo) {
							data.$states.amount.symbol = 'K$'
							data.$states.montant.symbol = 'K€'
							data.$states.liang.symbol = 'K¥'
							data.$states.amount.decimals = 0
							data.$states.montant.decimals = 0
							data.$states.liang.decimals = 0
							data.amount = Math.round(data.amount / 1000);
							data.montant = Math.round(data.montant / 1000);
							data.liang = Math.round(data.liang / 1000);
						} else {
							data.$states.amount.symbol = '$'
							data.$states.montant.symbol = '€'
							data.$states.liang.symbol = '¥'
							data.$states.amount.decimals = 2
							data.$states.montant.decimals = 2
							data.$states.liang.decimals = 3
							data.amount = data.amount * 1000;
							data.montant = data.montant * 1000
							data.liang = data.liang * 1000
						}
						break;
				}
			});
	})();

});

