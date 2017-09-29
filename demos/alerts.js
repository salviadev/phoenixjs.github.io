/* global $ */
$(function () {
	var layout = {
		"name": "form",
		"$type": "block",
		"$items": [
			
            {
				"$type": "block",
                "$inline": true,
                "$title": {
                   value: "Actions"  
                },
				"$items": [
					{
						"$bind": "$links.confirm"  
					},
					{
						"$bind": "$links.prompt"
					},
					{
						"$bind": "$links.alert"
					}
				]
			}                      
		]
	};
	var schema = {
		"type": "object",
		"properties": {},
		"links": {
			"confirm": { "title": "Confirm" },
			"prompt": { "title": "Prompt" },
            "alert": { "title": "Alert" }
		}


	};
	var data = { firstName: "John", lastName: "Doe" };

	(function om() {
		Phoenix.ui.OpenForm(
			$('#form'), layout, schema, data, {},
			function (action, data) {
				switch (action.property) {
					case "$links.confirm":
                        //if (confirm("Are you sure you want to navigate away from this page?")) {
                        //    // go to new page
                        //}
						Phoenix.utils.confirm('Warning', "Are you sure you want to navigate away from this page?", function(){
                             // go to new page
                        });
						break;
					case "$links.prompt":
                        //var value = prompt("Enter your favorite browser", 'Firefox');
						// value is your favorite browser
                        Phoenix.utils.prompt("Enter your favorite browser", 'Firefox', function(value){
                             // value is your favorite browser
                        });
  
						break;
					case "$links.alert":
                        //alert('Hello word!');
						Phoenix.utils.alert('My custom title', 'Hello word!', function(){
                             // after alert
                        });
  
						break;
				}
			});
	})();

});

     