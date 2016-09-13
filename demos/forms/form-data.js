/* global $ */
$(function () {
	var layout = {
		"name": "form",
		"data": {
			"datasets": {

			},
			"defaultUser": {
				"firstName": "John",
				"lastName": "Doe",
				"info": "",
				"photo": null,

			}

		},
		"$type": "block",
		"$items": [
			{
				"$type": "block",
				"$title": {
					value: "Description"
				},
				"$items": [
					{
						"$bind": "firstName"
					},
					{
						"$bind": "lastName"
					},
					{
						"$bind": "photo"
					}
				]
			},
			{
				"$type": "block",
				"$title": {
					"value": "Actions"
				},
				"$inline": true,
				"$items": [
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
			"info": { "title": "Info", "type": "string" },
			"firstName": { "title": "First Name", "type": "string" },
			"lastName": { "title": "Last Name", "type": "string" },
			"photo": { "title": "Photo", "type": "string", "format": "stream" }
		},
		"states": {
			"firstName": { "isMandatory": true }
		},
		"links": {
			"link2": { "title": "Load default User" }
		}
	};


	var data = {};

	(function om() {
		Phoenix.ui.OpenForm(
			$('#form'), layout, schema, data, {},
			function (action, model, form) {
				switch (action.property) {
					case "$links.link2":
						model.firstName = form.formData.defaultUser.firstName;
						model.lastName = form.formData.defaultUser.lastName;
						model.info = form.formData.defaultUser.info;
						model.photo = form.formData.defaultUser.photo;
						break;
				}
			});
	})();


});

