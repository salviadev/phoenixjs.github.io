var Phoenix;
(function (Phoenix) {
    if (angular) {
        var _utils = Phoenix.utils, _render = Phoenix.render, _ui = Phoenix.ui;
        var _onScopeDestroy = function () {
            var s = this;
            _utils.log('destroy form', 'scope');
            if (s.component)
                s.component.destroy();
        };
        var app = angular.module("phoenix.ui");
        app.controller('uiFormController', ["$scope", function ($scope) { }]);
        app.directive('bsform', [function () {
                return {
                    scope: {
                        module: '=',
                        layout: '=',
                        prototype: '=',
                        meta: '=',
                        data: '=',
                        action: '=',
                        beforeSetModel: '=',
                        init: '=',
                        storage: '=',
                        validators: '=',
                        onsettings: '='
                    },
                    bindToController: true,
                    restrict: 'E',
                    replace: false,
                    controller: 'uiFormController',
                    controllerAs: 'module',
                    link: function (lscope, element, attrs) {
                        var scope = lscope.$new();
                        scope.component = new _ui.FormContainer({
                            replaceParent: true,
                            context: "angular",
                            beforeAdd: function (el, refresh) { },
                            beforeRemove: function (el) {
                                var component = scope.component;
                                var module = scope.module;
                                scope.component = null;
                                scope.module = null;
                                scope.$destroy();
                                var ns = lscope.$new();
                                scope.component = null;
                                ns.component = component;
                                ns.module = module;
                                ns.$on("$destroy", _onScopeDestroy.bind(ns));
                                scope = ns;
                            },
                            beforeSetModel: scope.module.beforeSetModel,
                            afterModelCreated: scope.module.init,
                            onSettings: scope.module.onsettings,
                            storageName: scope.module.storage,
                            validators: scope.module.validators
                        }, scope.module.layout, scope.module.meta || scope.module.prototype, scope.module.data, scope.module.module, false);
                        scope.component.action = scope.module.action;
                        scope.component.render(element);
                        scope.$on("$destroy", _onScopeDestroy.bind(scope));
                    }
                };
            }]);
        var app = angular.module("phoenix.ui");
        app.controller('uiFormCtrlController', ["$scope", function ($scope) { }]);
        app.directive('widgetForm', [function () {
                return {
                    scope: {
                        module: '='
                    },
                    bindToController: true,
                    restrict: 'E',
                    replace: true,
                    controller: 'uiFormCtrlController',
                    controllerAs: 'module',
                    link: function (lscope, element, attrs) {
                        var scope = lscope.$new();
                        var cfg = scope.module.module.data.form;
                        scope.component = new _ui.FormContainerController({
                            replaceParent: true,
                            context: "angular",
                            beforeAdd: function (el, refresh) { },
                            beforeRemove: function (el) {
                                var component = scope.component;
                                var module = scope.module;
                                scope.component = null;
                                scope.module = null;
                                scope.$destroy();
                                var ns = lscope.$new();
                                scope.component = null;
                                ns.component = component;
                                ns.module = module;
                                ns.$on("$destroy", _onScopeDestroy.bind(ns));
                                scope = ns;
                            }
                        }, cfg.name, cfg.meta, cfg.controller, scope.module.module, cfg.preferences);
                        scope.component.render(element);
                        scope.$on("$destroy", _onScopeDestroy.bind(scope));
                    }
                };
            }]);
    }
})(Phoenix || (Phoenix = {}));

var Phoenix;
(function (Phoenix) {
    if (angular) {
        var _utils = Phoenix.utils, _ui = Phoenix.ui;
        var app = angular.module("phoenix.ui");
        app.directive('headerMenu', [function () {
                return {
                    scope: {
                        bodyPlace: '@',
                        backButton: '=',
                        logoutButton: '=',
                        leftMenuButton: '=',
                        leftMenuPlace: '@',
                        topMenuButton: '=',
                        rightMenuButton: '=',
                        topMenuPlace: '@',
                        rightMenuPlace: '@'
                    },
                    restrict: 'E',
                    replace: true,
                    compile: function (tElem, tAttrs) {
                        return {
                            pre: function (scope, element, attrs) {
                                var options = {
                                    bodyId: scope.bodyPlace,
                                    backButton: scope.backButton,
                                    leftMenuButton: scope.leftMenuButton,
                                    rightMenuButton: scope.rightMenuButton,
                                    topMenuButton: scope.topMenuButton,
                                    leftMenuPlace: scope.leftMenuPlace,
                                    rightMenuPlace: scope.rightMenuPlace,
                                    topMenuPlace: scope.topMenuPlace,
                                    disconnectButton: scope.logoutButton,
                                    replaceParent: true
                                };
                                scope.component = new _ui.Header({}, options);
                                scope.component.render(element);
                                scope.$on("$destroy", function () {
                                    _utils.log('destroy header', 'scope');
                                    if (scope.component)
                                        scope.component.destroy();
                                });
                            },
                            post: function (scope, element, attrs) {
                            }
                        };
                    }
                };
            }]);
    }
})(Phoenix || (Phoenix = {}));
