/* global $ */
$(function () {
    var layout = {
        "$type": "block",
        "$items": [
            {
                "$type": "block",
                "$fieldsOptions": {
                    "columns": true
                },
                "$items": [
                    { "$bind": "firstName" },
                    { "$bind": "lastName" },
                    { "$bind": "birthdate" },
                    { "$bind": "fullName" }

                ],
            },
            {
                "$type": "row",
                "$items": [
                    {},
                    {
                        "$inline": true,
                        "$items": [
                            { "$bind": "$links.validate", "options": { "right": true } }
                        ]
                    }

                ]
            }
        ],
        "form": true
    };

    var schema = {
        "type": "object",
        "name": "User",
        "properties": {
            "firstName": {
                "type": "string",
                "title": "First Name"
            },
            "lastName": {
                "type": "string",
                "title": "Last Name"
            },
            "fullName": {
                "type": "string",
                "title": "Full Name"
            },
            "birthdate": {
                "type": "string",
                "title": "Birthdate",
                "format": "date",

            }

        },
        "states": {
            "fullName": {
                "isReadOnly": true
            },
            "birthdate": {
                "isMandatory": true
            }
        },
        "links": {
            "validate": {
                "title": "validate"
            }
        },
        "rules": [
            {
                "name": "RV_001",
                "description": "Calculate full name",
                "expression": "var a = []; o.firstName && a.push(o.firstName); o.lastName && a.push(o.lastName.toUpperCase()); o.fullName = a.join(' ');",
                "triggers": "$events.created, $events.loaded, lastName, firstName",
                "ruleType": "propagation",
                "entities": [{ "entity": "User" }]

            },
            {
                "name": "RV_001",
                "description": "FullName is required.",
                "expression": "o.lastName || o.firstName",
                "triggers": "lastName, firstName",
                "errorMsg": "Full Name is required.",
                "ruleType": "validation",
                "entities": [{ "entity": "User" }]

            },
            {
                "name": "RV_002",
                "description": "Minimal age is 14 years.",
                "condition": "o.birthdate",
                "expression": "var d = ctx.date(o.birthdate), now = new Date();  d.setFullYear(d.getFullYear() + 14); return d.toISOString() <= now.toISOString().substr(0,10); ",
                "triggers": "birthdate",
                "errorMsg": "Minimal age is 14 years.",
                "ruleType": "validation",
                "entities": [{ "entity": "User" }]

            }

        ]

    };


    let data = { firstName: 'John', lastName: 'Smith' };

    (function om() {
        Phoenix.ui.OpenForm(
            $('#form'), layout, schema, data, {},
            function (action, data) {
                if (action.property === "$links.validate")
                    data.validate();
                    
            });
    })();
});


