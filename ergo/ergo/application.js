var Phoenix;
(function (Phoenix) {
    var _application = Phoenix.application;
    var cfg = { "locales": { "login": { "fr": { "titlePage": "Bienvenue dans le portail ERGO", "title": " " } } }, "header": { "alwaysShow": false, "authLeftMenu": false, "uppercase": true, "align": "center" }, "preferences": {}, "homes": { "ergo": "ergo/titles" }, "authentication": { "autoLogon": { "login": "john", "password": "doe", "force": true } }, "portailName": "ergo" };
    _application.init("ergo", "Portail Wiki Ergo", cfg);
})(Phoenix || (Phoenix = {}));

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
