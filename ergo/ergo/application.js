var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Phoenix;
(function (Phoenix) {
    var _application = Phoenix.application;
    var cfg = { "locales": { "login": { "fr": { "titlePage": "Bienvenue dans le portail ERGO", "title": " " } } }, "header": { "alwaysShow": false, "authLeftMenu": false, "uppercase": true, "align": "center" }, "preferences": {}, "homes": { "ergo": "ergo/titles" }, "authentication": { "autoLogon": { "login": "john", "password": "doe", "force": true } }, "portailName": "ergo" };
    _application.init("ergo", "Portail Wiki Ergo", cfg);
})(Phoenix || (Phoenix = {}));
var Ergo;
(function (Ergo) {
    var _p = Phoenix, _customData = _p.customData;
    var GridWithLink = (function (_super) {
        __extends(GridWithLink, _super);
        function GridWithLink() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GridWithLink.prototype.onModelChanged = function (action, model, form) {
            switch (action.property) {
                case 'Offres.$links.detail':
                    var item = action.actionParams;
                    form.navigate('demos/grid-selecting', {
                        canGoBack: true,
                        checkForChanges: false,
                        urlSearch: {
                            code: item.title
                        }
                    });
                    break;
            }
        };
        return GridWithLink;
    }(Phoenix.ui.FormController));
    _customData.register('demos.grid-link.controller', new GridWithLink());
})(Ergo || (Ergo = {}));
var Ergo;
(function (Ergo) {
    var _p = Phoenix, _customData = _p.customData;
    var GridLinesAsCols = (function (_super) {
        __extends(GridLinesAsCols, _super);
        function GridLinesAsCols() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GridLinesAsCols.prototype.onModelChanged = function (action, model, form) {
            switch (action.property) {
                case 'documents.$item.children.$item.children.$item.sizes.$item.value':
                    if (action.params.instance.id === 777) {
                        if (action.params.instance.value === 0) {
                            _p.utils.nextTick(function () {
                                model.applyJsonPachDelta([{
                                        op: 'remove',
                                        path: '/documents/1/children/5/children/6/sizes/777',
                                        value: null
                                    }
                                ]);
                            });
                        }
                        else {
                            if (action.params.instance.value === 88) {
                                _p.utils.nextTick(function () {
                                    model.applyJsonPachDelta([{
                                            op: 'replace',
                                            path: '/documents/1/children/5/children/6/sizes',
                                            value: [
                                                {
                                                    id: 777,
                                                    code: 'population',
                                                    value: 100
                                                }
                                            ]
                                        }
                                    ]);
                                });
                            }
                        }
                    }
                    break;
                case 'documents.1.children.5.children.6.$links.addValue':
                    _p.utils.nextTick(function () {
                        model.applyJsonPachDelta([{
                                op: 'add',
                                path: '/documents/1/children/5/children/6/sizes',
                                value: {
                                    id: 777,
                                    code: 'population',
                                    value: action.actionParams.value
                                }
                            }
                        ]);
                    });
                    break;
            }
        };
        return GridLinesAsCols;
    }(Phoenix.ui.FormController));
    _customData.register('demos.grid-lines-as-cols.controller', new GridLinesAsCols());
})(Ergo || (Ergo = {}));
var Ergo;
(function (Ergo) {
    var _p = Phoenix, _customData = _p.customData;
    var tableauSimple = (function (_super) {
        __extends(tableauSimple, _super);
        function tableauSimple() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        tableauSimple.prototype.onModelChanged = function (action, model, form) {
            switch (action.property) {
                case '$links.set':
                    model.Summary = [
                        {
                            "Name": "Total One",
                            "PV": 5872,
                            "Price": 25368
                        },
                        {
                            "Name": "Total Two",
                            "PV": 700,
                            "Price": 8000
                        }
                    ];
                    break;
                case '$links.upd':
                    model.Summary.get(0).Price = model.Summary.get(0).Price + 20;
                    model.Summary.get(0).PV = model.Summary.get(0).PV + 32;
                    break;
            }
        };
        return tableauSimple;
    }(Phoenix.ui.FormController));
    _customData.register('demos.grid-totals.controller', new tableauSimple());
})(Ergo || (Ergo = {}));
var Ergo;
(function (Ergo) {
    var _p = Phoenix, _customData = _p.customData, _dom = _p.dom, _dsPlugin = _p.DatasetPlugin, _link = _p.link, _data = _p.data;
    var tableauSimple = (function (_super) {
        __extends(tableauSimple, _super);
        function tableauSimple() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        tableauSimple.prototype.beforeSetModel = function (data) {
        };
        tableauSimple.prototype.onModelChanged = function (action, model, form) {
            switch (action.property) {
                case '$links.$beforeEdit':
                    action.actionParams.$states.Type.isReadOnly = true;
                    action.actionParams.$states.Libelle.isReadOnly = true;
                    break;
                case '$links.$afterUpdateChanges':
                    break;
            }
        };
        return tableauSimple;
    }(Phoenix.ui.FormController));
    _customData.register('ergo.detail-inside-tab.controller', new tableauSimple());
})(Ergo || (Ergo = {}));
var Ergo;
(function (Ergo) {
    var _p = Phoenix, _customData = _p.customData, _dom = _p.dom, _dsPlugin = _p.DatasetPlugin, _link = _p.link, _data = _p.data;
    var tableauSimple = (function (_super) {
        __extends(tableauSimple, _super);
        function tableauSimple() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        tableauSimple.prototype.beforeSetModel = function (data) {
        };
        tableauSimple.prototype.onModelChanged = function (action, model, form) {
            switch (action.property) {
                case '$links.back':
                    form.module.executeLink("link://view-tile", {});
                    break;
            }
        };
        return tableauSimple;
    }(Phoenix.ui.FormController));
    _customData.register('ergo.detail-tile.controller', new tableauSimple());
})(Ergo || (Ergo = {}));
var Ergo;
(function (Ergo) {
    var _p = Phoenix, _customData = _p.customData, _dom = _p.dom, _dsPlugin = _p.DatasetPlugin, _link = _p.link, _data = _p.data;
    var tableauSimple = (function (_super) {
        __extends(tableauSimple, _super);
        function tableauSimple() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        tableauSimple.prototype.beforeSetModel = function (data) {
        };
        tableauSimple.prototype.onModelChanged = function (action, data, form) {
            var offres = $.extend(true, {}, data);
            switch (action.property) {
                case "Offres.$item.$links.remove":
                    data.Offres.remove(action.actionParams);
                    break;
                case "$links.setData":
                    data.Offres = $.extend(true, {}, offres).Offres;
                    break;
                case "$links.addLine":
                    data.Offres.clearSelection();
                    data.Offres.push({ $select: true, caracTA: {} });
                    break;
            }
        };
        return tableauSimple;
    }(Phoenix.ui.FormController));
    _customData.register('ergo.master-tab.controller', new tableauSimple());
})(Ergo || (Ergo = {}));
var Ergo;
(function (Ergo) {
    var _p = Phoenix, _customData = _p.customData, _dom = _p.dom, _dsPlugin = _p.DatasetPlugin, _link = _p.link, _data = _p.data;
    var tableauSimple = (function (_super) {
        __extends(tableauSimple, _super);
        function tableauSimple() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        tableauSimple.prototype.beforeSetModel = function (data) {
        };
        tableauSimple.prototype.onModelChanged = function (action, model, form) {
        };
        return tableauSimple;
    }(Phoenix.ui.FormController));
    _customData.register('ergo.tableau-simple.controller', new tableauSimple());
})(Ergo || (Ergo = {}));
var Ergo;
(function (Ergo) {
    var _p = Phoenix, _customData = _p.customData, _dom = _p.dom, _dsPlugin = _p.DatasetPlugin, _link = _p.link, _data = _p.data;
    var tableauSimple = (function (_super) {
        __extends(tableauSimple, _super);
        function tableauSimple() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        tableauSimple.prototype.beforeSetModel = function (data) {
        };
        tableauSimple.prototype.onModelChanged = function (action, model, form) {
            switch (action.property) {
                case '$links.detail':
                    form.module.executeLink("link://detail-tile", {});
                    break;
            }
        };
        return tableauSimple;
    }(Phoenix.ui.FormController));
    _customData.register('ergo.view-tile.controller', new tableauSimple());
})(Ergo || (Ergo = {}));

angular.module('ergo').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('./templates/model.html',
    "<!DOCTYPE html><html><head><meta charset=\"utf-8\"><meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><link rel=\"icon\" type=\"image/png\" href=\"../libs/phoenix-app/dist/img/favicon.png\"><title></title><script type=\"text/javascript\">(function ($p) { \r" +
    "\n" +
    "            $p.build.release = \"<%= deploy.release %>\" === \"true\";  \r" +
    "\n" +
    "            $p.build.authMode = \"<%= deploy.authMode %>\";\r" +
    "\n" +
    "        })(this.Phoenix);</script></head><body><div class=\"bs-content\"><header-menu back-button=\"true\" left-menu-button=\"true\" top-menu-button=\"true\" logout-button=\"true\" left-menu-place=\"menu_left\" top-menu-place=\"menu_top\" body-place=\"bs-page-content\"></header-menu><div id=\"error_box\"></div><div id=\"menu_top\"></div><div id=\"bs-page-content\"><div ng-view autoscroll=\"true\"></div></div></div><div id=\"menu_left\"></div></body></html>"
  );

}]);
