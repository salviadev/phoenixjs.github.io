/* global $ */
$(function () {

    var layout = {
        "name": "form",
        "$type": "block",
        "$items": [
            {
                "$type": "block",
                "$items": [
                    {
                        "$type": "block",
                        "$title": { "value": "Always visible" },
                        "$items": [
                            {
                                "$bind": "options"
                            }
                        ]
                    },
                    {
                        "$type": "block",
                        "$title": { "value": "Block 1: Togglable and  Hidden on show" },
                        "$bindState": "state1",
                        "$items": [
                            {
                                "$bind": "options"
                            }
                        ]
                    },
                    {
                        "$type": "html",
                        "$bindState": "content",
                        "$html": "<div><h2>Content</h2>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</div>",
                        "$items": [

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
                            {
                                "$bind": "$links.toggleLayoutState1"
                            },
                            {
                                "$bind": "$links.toggleContentVisible"
                            },
                            {
                                "$bind": "$links.addFormErrors"
                            }
                        ]
                    }
                ]
            }
        ]
    };
    var schema = {
        "type": "object",
        "properties": {
            "state1": {
                "type": "string"
            },
            "content": {
                "type": "string"
            },
            "options": {
                "type": "string",
                "format": "text"
            }

        },
        "states": {
            "state1": { "isHidden": true },
            "content": { "isHidden": false }
        },
        "links": {
            "addFormErrors": { "title": "Add form error" },
            "toggleLayoutState1": { "title": "Toggle visible Block 1" },
            "toggleContentVisible": { "title": "Toggle Content visibility" }
        }


    };
   

    var data = { state1: "", state2: "" };

    (function om() {
        Phoenix.ui.OpenForm(
            $('#form'), layout, schema, data, {},
            function (action, data) {
                switch (action.property) {
                    case "$links.toggleLayoutState1":
                        data.$states.state1.isHidden = !data.$states.state1.isHidden;
                        break;
                    case "$links.toggleContentVisible":
                        data.$states.content.isHidden = !data.$states.content.isHidden;
                        break;
                    case "$links.addFormErrors":
                        data.$errors.$.addErrors([{ message: "Data saved!.", severity: "success" }, { message: "This is an error" }]);
                        break;

                }
            });
    })();
});

     