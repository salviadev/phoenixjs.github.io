var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
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
        };
        return tableauSimple;
    }(Phoenix.ui.FormController));
    _customData.register('ergo.tableau-simple.controller', new tableauSimple());
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