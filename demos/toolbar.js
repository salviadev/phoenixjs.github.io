/* global $ */
$(function () {
    var layout = {
        "name": "form",
        "$items": [
            {
                "$type": "row",
                "$items": [
                    {
                        "$items": [
                            {
                                "$bind": "toolbar",
                                $widget: "toolbar"
                            }
                        ],
                        "$colSize": 5
                    },
                    {
                        "$items": [
                            {
                                "$bind": "toolbar2",
                                $widget: "toolbar"
                            }
                        ],
                        "$colSize": 7
                    }
                ]
            },
            {
                "$type": "block",
                "$items": [
                    {
                        "$bind": "toolbar",
                        $widget: "toolbar"
                    }
                ]
            },
            {
                "$type": "block",
                "$items": [
                    {
                        "$bind": "toolbar2",
                        $widget: "toolbar"
                    }
                ]
            }
        ],
        "$type": "block"
    };
    var schema = {
        "properties": {
            "toolbar": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "type": {
                            "type": "string"
                        },
                        "name": {
                            "type": "string"
                        },
                        "title": {
                            "type": "string"
                        },
                        "data": {
                            "type": "object",
                            "properties": {

                            }
                        },
                        "options": {
                            "type": "object",
                            "properties": {

                            }
                        }
                    }
                }
            },
            "toolbar2": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "type": {
                            "type": "string"
                        },
                        "name": {
                            "type": "string"
                        },
                        "title": {
                            "type": "string"
                        },
                        "data": {
                            "type": "object",
                            "properties": {

                            }
                        },
                        "options": {
                            "type": "object",
                            "properties": {

                            }
                        }
                    }
                }
            }
        }
    };

    var fields = [
        {
            "code": "string",
            "lib": "String",
            "type": "string",
            "selected": true
        },
        {
            "code": "integer",
            "lib": "Integer",
            "type": "integer"
        },
        {
            "code": "enum",
            "lib": "Enum",
            "type": "string",
            "enum": ["enum1", "enum2", "enum3"],
            "enumNames": ["Enum 1", "Enum 2", "Enum 3"],
            "selected": true
        }
    ];
    var data = {
        toolbar: [
            {
                type: "filterexpress",
                name: "filterexpress",
                data: {
                    fields: fields
                },
                options: {
                    multiple: false
                }
            },
            {
                "type": "default",
                "name": "setting",
                "data": {
                    "icon": "wrench"
                }
            }
            // {
            //     "type": "dropdownchecklist",
            //     "name": "menu",
            //     "data": {
            //         "right": true,
            //         "actions": [
            //             {
            //                 "code": "Grouper",
            //                 "lib": "Grouper les lots",
            //                 "selected": true
            //             },
            //             {
            //                 "code": "Degrouper",
            //                 "lib": "Dégrouper les lots",
            //                 "selected": true
            //             },
            //             {
            //                 "code": "PoserOption",
            //                 "lib": "Poser une option",
            //                 "selected": true
            //             },
            //             {
            //                 "code": "PoserOptionRapide",
            //                 "lib": "Poser une option rapide"
            //             },
            //             {
            //                 "code": "AnnulerOption",
            //                 "lib": "Annuler une option",
            //                 "selected": false
            //             },
            //             {
            //                 "code": "Changer",
            //                 "lib": "Changer de programme"
            //             },
            //             {
            //                 "code": "Saisir",
            //                 "lib": "Saisir une réservation"
            //             }
            //         ]
            //     }
            // }
        ],
        toolbar2: [
            {
                type: "filterexpress",
                name: "filterexpress",
                data: {
                    fields: fields
                },
                options: {
                    multiple: true
                }
            },
            {
                "type": "default",
                "name": "setting",
                "data": {
                    "icon": "wrench"
                }
            }
        ]
    };

    var settingForm = {
        "name": "form",
        "$items": [
            {
                "$type": "block",
                "$items": [
                    {
                        "$bind": "mselect",
                        $widget: "multiselectlist",
                        "options": {
                            multiselectlist: true
                        }
                    }
                ]
            }
        ],
        "$type": "block"
    };
    var settingModel = {
        "properties": {
            "mselect": {
                "type": "object",
                "properties": {
                    "entree": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "title": {
                                    "type": "string"
                                },
                                "name": {
                                    "type": "string"
                                },
                                "items": {
                                    "type": "array"
                                }
                            }
                        }
                    },
                    "sortie": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "title": {
                                    "type": "string"
                                },
                                "name": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                }
            }
        }
    };

    var settingData = {
        mselect: {
            entree: fields.map(function (item) { return { title: item.lib, name: item.code } }),
            sortie: fields.map(function (item) { return { title: item.lib, name: item.code } })
        }
    };

    Phoenix.ui.OpenForm($('#form1'), layout, schema, data, {}, function (action, model, formControl) {
        class SettingController extends Phoenix.ui.FormController {
            onValidate(ac, m, f, modal) {
                var d = m.model().mselect.sortie;
                let lfields = [];
                d.forEach(function (s) {
                    fields.every(function (field) {
                        if (s.name == field.code) {
                            field.selected = true;
                            lfields.push(field);
                            return false;
                        }
                        return true;
                    });
                });
                action.actionParams.control.setValue("filterexpress", lfields);
                settingData.mselect.sortie = lfields.map(function (item) { return { title: item.lib, name: item.code } });
                modal.close();
            }
        };
        Phoenix.customData.register('bs.setting.modal.controller', new SettingController());
        switch (action.property) {
            case "toolbar.$toolbar.filterexpress":
                console.log(action);
                console.log(action.actionParams.toolElement.value.title);
                console.log(action.actionParams.toolElement.value.value);
                break
            case "toolbar2.$toolbar.filterexpress":
                console.log(action);
                console.log(action.actionParams.toolElement.value.title);
                console.log(action.actionParams.toolElement.value.value);
                break
            case "toolbar.$toolbar.setting":
                //action.actionParams.control._toolbar.setOptions("filterexpress", {multiple: true});

                Phoenix.ui.showModalForm({
                    name: settingForm,
                    meta: settingModel,
                    controller: "bs.setting.modal.controller",
                    options: { title: "Options", buttons: [{ pattern: "validate" }] }
                }, settingData);
                break;
            case "toolbar2.$toolbar.setting":
                Phoenix.ui.showModalForm({
                    name: settingForm,
                    meta: settingModel,
                    controller: "bs.setting.modal.controller",
                    options: { title: "Options", buttons: [{ pattern: "validate" }] }
                }, settingData);
                break;

        }
    });
});

