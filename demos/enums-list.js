/* global $ */
$(function () {
    var layout = {
        "name": "form",
        "$items": [
            {
                "$type": "block",
                "$items": [
                    { "$items": [{ "$bind": "usedBrowsers", $widget: "enums-list" }] }
                ]
            },
            {
                "$type": "block",
                "$inline": true,
                "$items": [
                    { "$bind": "$links.tEnabled" },
                    { "$bind": "$links.tHidden" },
                    { "$bind": "$links.tFilter" },
                    { "$bind": "$links.tSet" },
					{ "$bind": "$links.tErrors" }
					
                ]
            }
        ],
        "$type": "block"
    };
    var schema = {
        "properties": {
            "usedBrowsers": {
                "title": "Browsers",
                "type": "array",
                "description": "List of browsers",
                "items": {
                    "type": "string",
                    "enums": {
                        "Browsers": {
                            "type": "default",
                            "enum": ["moz", "chrome", "safari", "ie", "opera"],
                            "enumNames": ["Firefox", "Google Chrome", "Safari", "Internet Explorer", "Opera"],
                            "filters": {
                                "android": ["moz", "chrome", "opera"]
                            }
                        } 
                    },
                    "$enumref": "Browsers"
                }
            }
        },
        "links": {
            "tEnabled": { "title": "Toggle Enabled" },
            "tHidden": { "title": "Toggle Hidden" },
            "tSet": { "title": "Set Browsers = Safari, Opera" },
            "tFilter": { "title": "Toggle Filter" },
			"tErrors": { "title": "Add Error" }
        }
    };
    var data = { usedBrowsers: ["safari", "moz"], $states: {usedBrowsers: {filter: 'android'} }  };

    (function om() {
        Phoenix.ui.OpenForm(
            $('#form'), layout, schema, data, {},
            function (action, data) {
                switch (action.property) {
                    case "$links.tHidden":
                        data.$states.usedBrowsers.isHidden = !data.$states.usedBrowsers.isHidden;
                        break;
                    case "$links.tEnabled":
                        data.$states.usedBrowsers.isDisabled = !data.$states.usedBrowsers.isDisabled;
                        break;
                    case "$links.tSet":
                        data.usedBrowsers = ["opera", "safari"];
                        break;
                    case "$links.tErrors":
                        ata.$errors.usedBrowsers.addError("This is an error.");
                        break;
                    case "$links.tFilter":
                        if (data.$states.usedBrowsers.filter)
                            data.$states.usedBrowsers.filter = '';
                        else
                            data.$states.usedBrowsers.filter = 'android';
                        break;
                }
            });
    })();

});

     