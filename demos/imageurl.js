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
						"$bind": "firstName"
					},
					{
						"$bind": "lastName"
					},
					{
						"$bind": "photo", 
						"$widget": "imageurl"
					}
				]
			},
			{
				"$type": "block",
                "$title": {
					"value": "Inline"
                },
				"$inline": true,
				"$items": [
					{
						"$bind": "firstName"
					},
					{
						"$bind": "lastName"
					},
					{
						"$bind": "photo", 
						"$widget": "imageurl"
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
						"$bind": "firstName",
                        "options": { "columns": true }

					},
					{
						"$bind": "lastName",
                        "options": { "columns": true }

					},
					{
						"$bind": "photo", 
						"$widget": "imageurl",
                        "options": { "columns": true }
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
						"$bind": "$links.link3"
					}
				]
			}
		]
	};
	var schema = {
		"type": "object",
		"properties": {
			"firstName": { "title": "First Name", "type": "string" },
			"lastName": { "title": "Last Name", "type": "string" },
            "photo": { "title": "Photo", "type": "string" }
		},
		"states": {
			"firstName": { "isMandatory": true }
		},
		"links": {
			"link1": { "title": "Toggle disabled" },
			"link2": { "title": "Toggle hidden" },
			"link3": { "title": "Toggle photo" }
		}


	};
	var data = { firstName: "John", lastName: "Doe", photo: "./camus.jpg" };

	(function om() {
		Phoenix.ui.OpenForm(
			$('#form'), layout, schema, data, {},
			function (action, data) {
				switch (action.property) {
					case "$links.link1":
						data.$states.photo.isDisabled = !data.$states.photo.isDisabled;
						break;
					case "$links.link2":
						data.$states.photo.isHidden = !data.$states.photo.isHidden;
						break;
					case "$links.link3":
						if (!data.photo) 
							data.photo = './camus.jpg';
						else
							data.photo = '';
						break;
				}
			});
	})();

});

