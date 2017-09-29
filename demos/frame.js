/* global $ */
$(function () {
	var layout = {
		"name": "form",
		"$items": [
			{
				"$type": "block",
				"$items": [
					{
						"$bind": "uri",
						"$widget": "iframe",
					}
				]
			}
		],
		"$type": "block"
	};
	var schema = {
		"properties": {
			"uri": { "type": "string" }
		},
		"links": {

		}
	};
	var data = { uri: "http://services.mgdis.fr/referentiel-tiers/ux/#/" };

	Phoenix.ui.OpenForm($('#form'), layout, schema, data, {}, function (action, model, formControl) {
		switch (action.property) {
		}
	});

});

