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
						"$bind": "radioBlock", "$widget": "radio"
					},
					{
						"$bind": "radioBlock", "$widget": "radio", "options": {"horizontal": true}
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
						"$bind": "radioBlock", "$widget": "radio" , "options": {"horizontal": false}
					},
 					{
						"$bind": "radioBlock", "$widget": "radio" , "options": {"horizontal": true}
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
						"$bind": "radioBlock", "$widget": "radio", 
                        "options": { "columns": true, "horizontal": false}
					},
					{
						"$bind": "radioBlock", "$widget": "radio", 
                        "options": { "columns": true, "horizontal": true, "titleIsHidden": true}
					}
				]
			},                      
            {
				"$type": "block",
                "$inline": true,
                "$title": {
                   "value": "Actions"  
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
			"firstName": { "title": "First Name", "type": "string" },
			"lastName": { "title": "Last Name", "type": "string" },
            "radioBlock": { "title": "Browsers", "type": "string", "enum": ["Firefox", "Chrome", "Opera"] }
		},
		"states": {
			"firstName": { "isMandatory": true }
		},
		"links": {
			"link1": { "title": "Toggle disabled" },
			"link2": { "title": "Toggle hidden" }
		}


	};
	var data = { firstName: "John", lastName: "Doe" };

	(function om() {
		Phoenix.ui.OpenForm(
			$('#form'), layout, schema, data, {},
			function (action, data) {
				switch (action.property) {
					case "$links.link1":
						data.$states.radioBlock.isDisabled = !data.$states.radioBlock.isDisabled;
						break;
					case "$links.link2":
						data.$states.radioBlock.isHidden = !data.$states.radioBlock.isHidden;
						break;
				}
			});
	})();

});

     