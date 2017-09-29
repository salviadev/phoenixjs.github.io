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
						"$bind": "memo", 
                        "options": {
                            "rows": 5
                        }
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
						"$bind": "memo"
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
                        "options": { "columns": true}
  
					},
					{
						"$bind": "memo",
                        "options": { "columns": true}
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
            "memo": { "title": "Options", "type": "string", "format": "json" }
		},
		"states": {
			"firstName": { "isMandatory": true }
		},
		"links": {
			"link1": { "title": "Set Name Hidden" }
		}
	};
	var data = { firstName: "John", lastName: "Doe" };

	(function om() {
		Phoenix.ui.OpenForm(
			$('#form'), layout, schema, data, {},
			function (action, data) {
				switch (action.property) {
					case "$links.link1":
						data.$states.firstName.isDisabled = !data.$states.firstName.isDisabled;
						break;
				}
			});
	})();

});

     