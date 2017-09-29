/* global $ */
$(function () {
    var layout1 = {
        "name": "form",
        "$items": [
            {
                "$type": "block",
                "$items": [
                    {
                        "$bind": "filter",
                        $widget: "filter",
                        "options": {
                            multiple: true,
                            "renderModel": "model1" // default
                        }
                    }
                ]
            }
        ],
        "$type": "block"
    };
    var layout2 = {
        "name": "form",
        "$items": [
            {
                "$type": "block",
                "$items": [
                    {
                        "$bind": "filter",
                        $widget: "filter",
                        "options": {
                            multiple: false,
                            "renderModel": "model2",
                            // "showOperateur": false,
                            // "showLabel": false,
                            "listSize": 6
                        }
                    }
                ]
            }
        ],
        "$type": "block"
    };
    var schema = {
        "properties": {
            "filter": {
                "type": "object",
                "title": "Filtre",
                "properties": {
                    "champs": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "code": { "type": "string" },
                                "libelle": { "type": "string" },
                                "type": { "type": "string" },
                                "decimals": { "type": "number" },
                                "enumName": { "type": "string" },
                                "enum": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "code": { "type": "string" },
                                            "libelle": { "type": "string" }
                                        }
                                    }
                                },
                                "lookup": {
                                    "type": "string"
                                }
                            }
                        }
                    },
                    "filters": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "code": { "type": "string" },
                                "op": { "type": "string" },
                                "values": {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                "values2": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "code": {
                                                "type": "string"
                                            },
                                            "lib": {
                                                "type": "string"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "links": {

        }
    };
    var data = {
        filter: {
            champs: [],
            filters: []
        }
    };

    Phoenix.ui.filter.addField(data.filter.champs, "chaine", "Une chaine", "string");
    Phoenix.ui.filter.addField(data.filter.champs, "entier", "Un entier", "integer");
    Phoenix.ui.filter.addField(data.filter.champs, "decimal", "Un decimal", "decimal", 3, null);
    Phoenix.ui.filter.addField(data.filter.champs, "money", "Une monnaie", "money");
    Phoenix.ui.filter.addField(data.filter.champs, "date", "Une date", "date");
    Phoenix.ui.filter.addField(data.filter.champs, "booleen", "Un booleen", "boolean");
    Phoenix.ui.filter.addField(data.filter.champs, "liste", "Une liste", "string", null, [{ code: "a", libelle: "A" }, { code: "b", libelle: "B" }, { code: "c", libelle: "C" }], "listeM");
    var fo = { "title": "Filtre", "buttons": [{ "pattern": "validate" }] };

    var btnFiltreModal = document.querySelector("#filtreModal");
    if (btnFiltreModal)
        btnFiltreModal.addEventListener("click", function (event) {
            Phoenix.ui.OpenModalForm(fo, layout1, schema, data, {}, function (form, action, model, formControl) {
                switch (action.property) {
                    case "validate":
                        if (!model.validate()) return;
                        var data = model.model();
                        var odata = Phoenix.ui.filter.format.toMongoDbFilter(data.filter.champs, data.filter.filters);
                        console.log(JSON.stringify(odata, null, 2));
                        form.close();
                        break;
                }
            });
        });

    Phoenix.ui.OpenForm($('#form1'), layout2, schema, data, {}, function (action, model, formControl) {
        switch (action.property) {
            case "validate":
                if (!model.validate()) return;
                var data = model.model();
                var odata = Phoenix.ui.filter.format.toMongoDbFilter(data.filter.champs, data.filter.filters);
                console.log(JSON.stringify(odata, null, 2));
                break;

        }
    });

});

