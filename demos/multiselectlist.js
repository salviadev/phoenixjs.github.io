/* global $ */
$(function () {
    var layout1 = {
        "name": "form",
        "$items": [
            {
                "$type": "block",
                "$items": [
                    {
                        "$bind": "liste",
                        $widget: "multiselectlist",
                        "options": {
                            itemIcon: "user",
                            //groupIcon: "user",
                            //expandIcon: "folder-close",
                            //collapseIcon: "folder-open",
                            multiSelect: true,
                            showTags: true,
                            //groupLink: true,
                            //itemLink: true
							renderModel: "right"
                        }
                    }
                ]
            }
        ],
        "$type": "block"
    };

    var schema1 = {
        "properties": {
            "liste": {
                "type": "object",
                "properties": {

                }
            }
        }
    };
    var data1 = {
        liste: {
            entree: [
                {
                    name: "groupea",
                    title: "Groupe A",
                    items: [
                        {
                            name: "groupec",
                            title: "Groupe C",
                            items: [
                                {
                                    name: "item9",
                                    title: "Item 9"
                                },
                                {
                                    name: "item10",
                                    title: "Item 10"
                                }
                            ]
                        },
                        {
                            name: "item4",
                            title: "Item 4"
                        },
                        {
                            name: "item5",
                            title: "Item 5"
                        }
                    ]
                },
                {
                    name: "groupeb",
                    title: "Groupe B",
                    items: [
                        {
                            name: "item6",
                            title: "Item 6"
                        },
                        {
                            name: "item7",
                            title: "Item 7"
                        },
                        {
                            name: "item8",
                            title: "Item 8"
                        }
                    ]
                },
                {
                    name: "item1",
                    title: "Item 1"
                },
                {
                    name: "item2",
                    title: "Item 2"
                },
                {
                    name: "item3",
                    title: "Item 3"
                }
            ],
            sortie: []
        }
    };

    Phoenix.ui.OpenForm($('#form1'), layout1, schema1, data1, {}, function (action, model, formControl) {
        switch (action.property) {
            case "validate":
                if (!model.validate()) return;
                var data = model.model();
                var odata = Phoenix.ui.filter.format.toPhenix(data.filter.champs, data.filter.filters);
                alert(odata.toSource());
                break;

        }
    });

});

