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
            }

        }

    };


    var data = { color: 'yellow' };

    (function om() {
        Phoenix.ui.OpenForm(
            $('#form'), layout, schema, data, {},
            function (action, data) {
            });
    })();
});


