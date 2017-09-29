/* global $ */
$(function () {
    var layout = {
        "$type": "block",
        "$items": [
            {
                "$title": {
                    "value": "You choosed {{color}}"
                },
                "$type": "block",
                "$items": []
            },
            {
                "$type": "block",
                "$inline": true,
                "$items": [{ "$bind": "color", "$widget": "grpbtn" }]
            },
            {
				"$type": "accordion",
				"$widget": "tabs",
                "$items": [
					{
						"$type": "accordion-group",
						"opened": true,
						"$name": "grass",
						"$title": {							
							"value": "Color {{color}}"
						},
						"$items": [{"$type": "block", "$items": [] }]
					},
					{
						"$type": "accordion-group",
						"$title": {
							"value": "Detail {{empty}}"
						},
						"$items": [{"$type": "block", "$items": [] }]
					}				
					
				]
            }

        ],
        "form": true
    };

    var schema = {
        "type": "object",
        "properties": {
            "color": {
                "type": "string",
                "title": "Your prefered color ",
                "enum": ["red", "green", "yellow"],
                "enumNames": ["Red", "Green", "Yellow"]
            },
            "empty": {
                "type": "string",
                "title": "Empty "
            }

        }

    };


    var data = { color: 'yellow', empty: '' };

    (function om() {
        Phoenix.ui.OpenForm(
            $('#form'), layout, schema, data, {},
            function (action, data) {
            });
    })();
});


