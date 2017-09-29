/* global $ */
$(function () {
	var layout = {
		"name": "form",
		"$type": "block",
		"$items": [
			{
				"$type": "block",
				"$title": {
					value: "Block"
				},
				"$items": [
					{
						"$bind": "firstName"
					},
					{
						"$bind": "checkBlock"
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
						"$bind": "firstName"
					},
					{
						"$bind": "checkBlock"
					},
					{
						"$bind": "firstName"
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
						"$bind": "checkBlock",
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
						"$bind": "$links.link2"
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
			"checkBlock": { "title": "Checkbox", "type": "boolean" }
		},
		"states": {
			"firstName": { "isMandatory": true }
		},
		"links": {
			"link1": { "title": "Set Name Hidden" },
			"link2": { "title": "Add Error" }
		}

	};
	var data = { firstName: "John", lastName: "Doe" };

	(function om() {
		Phoenix.ui.OpenForm(
			$('#form'), layout, schema, data, {},
			function (action, data) {
				switch (action.property) {
					case "$links.link2":
						data.$errors.checkBlock.addError("This is an error.");
						break;
				}
			});
	})();

});

