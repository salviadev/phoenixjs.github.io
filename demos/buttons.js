/* global $ */
$(function () {
    var layout = {
        "name": "form",
        "$type": "block",
        "$items": [

            {
                "$type": "block",
                "$title": {
                    "value": "Themes"
                },
                "$items": [

                    {
                        "$type": "block",
                        "$inline": true,
                        "$items": [
                            { "$bind": "$links.important", "options": { "type": "important", size: "lg" } },
                            { "$bind": "$links.primary", "options": { "type": "primary", size: "lg" } },
                            { "$bind": "$links.info", "options": { "type": "info", size: "lg" } },
                            { "$bind": "$links.danger", "options": { "type": "danger", size: "lg" } },
                            { "$bind": "$links.success", "options": { "type": "success", size: "lg" } },
                            { "$bind": "$links.warning", "options": { "type": "warning", size: "lg" } },
                            { "$bind": "$links.default", "options": { "type": "default", size: "lg" } }

                        ]
                    }
                ]
            },
            {
                "$type": "block",
                "$items": [

                    {
                        "$type": "block",
                        "$inline": true,
                        "$items": [
                            { "$bind": "$links.important", "options": { "type": "important" } },
                            { "$bind": "$links.primary", "options": { "type": "primary" } },
                            { "$bind": "$links.info", "options": { "type": "info" } },
                            { "$bind": "$links.danger", "options": { "type": "danger" } },
                            { "$bind": "$links.success", "options": { "type": "success" } },
                            { "$bind": "$links.warning", "options": { "type": "warning" } },
                            { "$bind": "$links.default", "options": { "type": "default" } }

                        ]
                    }
                ]
            },
            {
                "$title": {
                    "value": "States"
                },

                "$type": "block",
                "$items": [

                    {
                        "$type": "block",
                        "$inline": true,
                        "$items": [
                            { "$bind": "$links.disable" },
                            { "$bind": "$links.hidden" }


                        ]
                    }
                ]
            },
            {
                "$type": "block",
                "$title": {
                    "value": "Icons"
                },
                "$items": [

                    {
                        "$type": "block",
                        "$inline": true,
                        "$items": [
                            { "$bind": "$links.icon", "options": { "type": "important", size: "lg", icon:"forward" } },
                            { "$bind": "$links.icon", "options": { "type": "important", titleIsHidden :true, size: "lg", icon:"forward" } },
                            { "$bind": "$links.icon", "options": { "type": "link", titleIsHidden :true, size: "lg", icon:"forward" } },
                            { "$bind": "$links.icon", "options": { "type": "link", titleIsHidden :true, size: "lg", icon:"forward", style: "myStyle" } }
                            
                        ]
                    }
                ]
            },
            

        ]
    };
    var schema = {
        "type": "object",
        "properties": {

        },
        "links": {
            "important": { "title": "Important" },
            "primary": { "title": "Primary" },
            "info": { "title": "Info" },
            "danger": { "title": "Danger" },
            "success": { "title": "Success" },
            "warning": { "title": "Warning" },
            "default": { "title": "Default" },
            "disable": { "title": "Toggle disabled" },
            "hidden": { "title": "Toggle hidden" },
            "icon": { "title": "Icon" },
            
        }


    };
    var data = { hidden: "", readOnly: "ReadOnly", disabled: "Disabled", edit: "My Edit" };

    (function om() {
        Phoenix.ui.OpenForm(
            $('#form'), layout, schema, data, {},
            function (action, data) {
                switch (action.property) {
                    case "$links.disable":
                        data.$links.important.isDisabled = !data.$links.important.isDisabled;
                        data.$links.primary.isDisabled = !data.$links.primary.isDisabled;
                        data.$links.info.isDisabled = !data.$links.info.isDisabled;
                        data.$links.success.isDisabled = !data.$links.success.isDisabled;
                        data.$links.warning.isDisabled = !data.$links.warning.isDisabled;
                        data.$links.default.isDisabled = !data.$links.default.isDisabled;
                        data.$links.danger.isDisabled = !data.$links.danger.isDisabled;
						break;

                    case "$links.hidden":
                        data.$links.important.isHidden = !data.$links.important.isHidden;
                        data.$links.primary.isHidden = !data.$links.primary.isHidden;
                        data.$links.info.isHidden = !data.$links.info.isHidden;
                        data.$links.success.isHidden = !data.$links.success.isHidden;
                        data.$links.warning.isHidden = !data.$links.warning.isHidden;
                        data.$links.default.isHidden = !data.$links.default.isHidden;
                        data.$links.danger.isHidden = !data.$links.danger.isHidden;
                        break;

                }
            });
    })();

});

