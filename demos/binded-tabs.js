/* global $ */
$(function () {
    var layout = {
        "$type": "block",
        "$items": [
            {
                "$type": "block",
                "$items": []
            },
            {
                "$type": "accordion",
                "$widget": "none",
                "$bindPages": "activeTab",
                "$items": [
                    {
                        "opened": true,
                        "$name": "One",
                        "$title": {
                            "value": "Fire"
                        },
                        "$type": "accordion-group",
                        "$items": [
                            {
                                "$type": "html",
                                "$html": "<h2>One</h2><p>This is tab One</p>"
                            }
                        ]
                    },
                    {
                        "$type": "accordion-group",
                        "$name": "two",
                        "$title": {
                            "value": "Two"
                        },
                        "$items": [
                            {
                                "$type": "html",
                                "$html": "<h2>Two</h2><p>This is tab Two</p>"
                            }
                        ]
                    },
                    {
                        "$type": "accordion-group",
                        "$name": "three",
                        "$title": {
                            "value": "Three"
                        },
                        "$items": [
                            {
                                "$type": "html",
                                "$html": "<h2>Two</h2><p>This is tab Three</p>"
                            }
                        ]
                    }
                ]
            },
             {
                "$type": "block",
                "$inline": true,
                "$items": [{ $bind: "activeTab", $widget: "grpbtn"}]
            },

        ],
        "form": true
    };

    var schema = {
        "type": "object",
        "properties": {
            "activeTab": {
                "type": "string",
                "title": "Change Active Tab",
                "enum": ["one", "two", "three"],
                "enumNames": ["One", "Two", "Three"]
            }

        }

    };


    var data = { activeTab: 'one' };

    (function om() {
        Phoenix.ui.OpenForm(
            $('#form'), layout, schema, data, {},
            function (action, data) {
                if (action.operation === 'execute') {
                    this.scrollTo(action.property.substr('$links.'.length));
                }
            });
    })();
});

