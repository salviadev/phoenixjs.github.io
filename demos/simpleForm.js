/* global $ */
$(function () {

    var
        schema = {
            "type": "object",
            "properties": {
                "lastName": {
                    "type": "string",
                    "title": "Last Name"
                },
                "firstName": {
                    "type": "string",
                    "title": "First Name"
                }
            }
        },
        data = {
            "firstName": "John",
            "lastName": "Doe"
        },
        layout = {
            "name": "customer",
            "$type": "block",
            "$items": [
                { "$bind": "firstName" },
                { "$bind": "lastName" }
            ]
        };

    (function om() {
        Phoenix.ui.OpenForm(
            $('#form'), layout, schema, data, {},
            function (action, data) { });
    })();

});

