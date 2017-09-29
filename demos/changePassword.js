/* global $ */
$(function () {
	var layoutPassword = {
		"name": "form",
		"$type": "block",
		"$items": [
			{
				"$bind": "oldPassword"
			},
			{
				"$bind": "password"
			},
			{
				"$bind": "$$password"
			}
		]
	};
	var schemaPassword = {
		"type": "object",
		"properties": {
			"oldPassword": { "title": "Old Password", "type": "string", "format": "password", "capabilities": {noConfirming: true} },
			"password": { "title": "New Password", "type": "string", "format": "password" }
		},
		"states": {
			"oldPassword": { "isMandatory": true },
			"password": { "isMandatory": true }
		}		
		
	};
	

	(function om() {
    	  var fo = { "title": "Change password ...", "buttons": [{ "pattern": "validate" }] };
           Phoenix.ui.OpenModalForm(fo, layoutPassword, schemaPassword, {}, {}, function (form, action, model, formControl) {
				switch (action.property) {
					case "validate":
						if (!model.validate()) return;
						form.close();
						break;

				}
			});
	})();



});

     