if (angular)
    angular.module("phoenix.ui", []);
//# sourceMappingURL=angular.core.js.map
var Phoenix;
(function (Phoenix) {
    if (angular) {
        var _p = Phoenix, _utils_1 = _p.utils, _data_1 = _p.data, _application_1 = _p.application, _build_1 = _p.build, _ui_1 = _p.ui, _ajax_1 = _p.ajax, _link_1 = _p.link, _locale_1 = _p.locale, _serial_1 = _p.serial;
        var app = angular.module("phoenix.ui");
        function extractMessage(reason) {
            if (typeof reason === 'string')
                return reason;
            var msg = reason.message;
            if (msg === 'error' && reason.detail && reason.detail.responseText)
                msg = reason.detail.responseText;
            return msg;
        }
        function setComponentHandlers(scope) {
            scope.component.saveHandler = function (cd) {
                var cfg = _application_1.config(_application_1.name);
                var isCustomizable = _application_1.isCustomizable(scope.isform ? 'forms' : 'pages', cd.name);
                if (cfg) {
                    var rft = isCustomizable ? cfg.dev : cfg.current;
                    if (!rft)
                        return;
                    var sn = scope.isform ? rft.forms : rft.pages;
                    if (!sn)
                        return;
                    _data_1.rest.put(sn + '/' + cd.name, cd).then(function (ldata) {
                    }, function (reason) {
                        alert(extractMessage(reason));
                    });
                }
            };
            scope.component.loadNestedHandler = function (data, after) {
                var cfg = _application_1.config(_application_1.name);
                if (cfg && cfg.current && cfg.current.pages && cfg.current.forms) {
                    _ajax_1.post((scope.isform ? cfg.current.forms : cfg.current.pages) + '/load/nested', data).then(function (ldata) {
                        if (after)
                            after(ldata);
                    }, function (reason) {
                        alert(extractMessage(reason));
                    });
                }
            };
            scope.component.createHandler = function (name, cd) {
                var cfg = _application_1.config(_application_1.name);
                if (cfg && cfg.current && cfg.current.pages && cfg.current.forms) {
                    cd.name = name;
                    var callBackSuccess = function (data) {
                        var ctx = _link_1.context();
                        var cl = { $page: data.name, $authoring: true };
                        _link_1.execLink(cl, ctx, null);
                    }, callBackError = function (reason) {
                        if (reason == "Conflict") {
                            _utils_1.prompt(_locale_1.layouts.design.ConflictedPageName, cd.name, function (decision) {
                                if (!decision)
                                    return;
                                decision = decision.trim();
                                if (!decision)
                                    return;
                                if (decision.indexOf(' ') >= 0) {
                                    alert(_locale_1.layouts.design.InvalidPageName);
                                    return;
                                }
                                cd.name = decision;
                                _ajax_1.post((scope.isform ? cfg.current.forms : cfg.current.pages) + '/' + cd.name, cd).then(callBackSuccess, callBackError);
                            });
                        }
                        else
                            alert(extractMessage(reason));
                    };
                    _ajax_1.post((scope.isform ? cfg.current.forms : cfg.current.pages) + '/' + cd.name, cd).then(callBackSuccess, callBackError);
                }
            };
            scope.component.openHandler = function (name) {
                var ctx = _link_1.context(), ll = { $page: name, $authoring: true };
                _link_1.execLink(ll, ctx, null);
            };
            scope.component.removeHandler = function (name) {
                var cfg = _application_1.config(_application_1.name);
                var isCustomizable = _application_1.isCustomizable(scope.isform ? 'forms' : 'pages', name);
                if (cfg) {
                    var rft = isCustomizable ? cfg.dev : cfg.current;
                    if (!rft)
                        return;
                    var sn = scope.isform ? rft.forms : rft.pages;
                    if (!sn)
                        return;
                    _data_1.rest.remove(sn + '/' + name).then(function (ldata) {
                        if (_build_1.release) {
                            window.location.reload(true);
                        }
                        else {
                            var ctx = _link_1.context();
                            var ll = { $page: "home" };
                            _link_1.execLink(ll, ctx, null);
                        }
                    }, function (reason) {
                        alert(extractMessage(reason));
                    });
                }
            };
            scope.component.listHandler = function (after) {
                var cfg = _application_1.config(_application_1.name);
                if (cfg && cfg.current && cfg.current.pages && cfg.current.forms) {
                    _ajax_1.get((scope.isform ? cfg.current.forms : cfg.current.pages)).then(function (ldata) {
                        after(ldata);
                    }, function (reason) {
                        alert(extractMessage(reason));
                    });
                }
            };
        }
        app.controller('uiLayoutController', ["$scope", function ($scope) {
            }]);
        app.directive('layout', ['$compile', function ($compile) {
                return {
                    scope: {
                        model: '=',
                        isform: '=',
                        authoring: '=',
                        locale: '=',
                        prototype: '=',
                        path: '='
                    },
                    bindToController: true,
                    restrict: 'E',
                    replace: true,
                    controller: 'uiLayoutController',
                    controllerAs: 'layout',
                    link: function (scope, element, attrs) {
                        var newScope = scope.$new();
                        scope.$on("$destroy", function () {
                            _utils_1.log('destroy layout', 'scope');
                            scope.component.destroy();
                            scope.component = null;
                        });
                        scope.isform = scope.layout.isform ? true : false;
                        var options = {
                            design: newScope.layout.authoring,
                            path: newScope.layout.path,
                            replaceParent: true,
                            context: "angular",
                            beforeAdd: function (el, refresh) {
                                _utils_1.log('compile layout', 'scope');
                                $compile(el)(newScope);
                                if (refresh) {
                                    _serial_1.GlbSerial.execute(function () {
                                        scope.$digest();
                                    });
                                }
                            },
                            beforeRemove: function (el) {
                                _utils_1.log('remove layout', 'scope');
                                newScope.component = null;
                                newScope.layout = null;
                                newScope.$destroy();
                                newScope = scope.$new();
                            }
                        };
                        if (scope.isform) {
                            _ui_1.OpenForm(element, scope.layout.model, scope.layout.prototype, {}, scope.layout.locale && scope.layout.locale.$view ? scope.layout.locale.$view : scope.layout.locale, null, options, function (form) {
                                scope.component = form;
                                setComponentHandlers(scope);
                            });
                        }
                        else {
                            scope.component = new _ui_1.LayoutClass(scope.layout.model || {}, options, {}, scope.layout.prototype, scope.layout.locale && scope.layout.locale.$view ? scope.layout.locale.$view : scope.layout.locale, null);
                            setComponentHandlers(scope);
                            scope.component.render(element);
                        }
                    }
                };
            }]);
    }
})(Phoenix || (Phoenix = {}));
//# sourceMappingURL=angular.layout.js.map
var Phoenix;
(function (Phoenix) {
    if (angular) {
        var _utils = Phoenix.utils, _render = Phoenix.render, _device = Phoenix.device, _serial = Phoenix.serial, _ui = Phoenix.ui;
        var app = angular.module("phoenix.ui");
        app.controller('uiWidgetController', ["$scope", function ($scope) {
            }]);
        app.directive('widget', ['$compile', function ($compile) {
                return {
                    scope: {
                        data: '=',
                        layout: '=',
                        authoring: '='
                    },
                    bindToController: true,
                    restrict: 'E',
                    replace: true,
                    controller: 'uiWidgetController',
                    controllerAs: 'item',
                    compile: function (tElem, tAttrs) {
                        return {
                            pre: function (scope, element, attrs) {
                                var model = scope.item.data || {};
                                scope.component = new _ui.Widget(model, {
                                    design: scope.item.authoring,
                                    replaceParent: true,
                                    context: "angular",
                                    beforeAdd: function (el, refresh) {
                                        _utils.log('compile module', 'scope');
                                        $compile(el)(scope);
                                        if (refresh) {
                                            _serial.GlbSerial.execute(function () {
                                                scope.$digest();
                                            });
                                        }
                                    },
                                    onDataChanged: function () {
                                        _serial.GlbSerial.execute(function () {
                                            scope.$digest();
                                        });
                                    }
                                }, scope.item.layout);
                                scope.component.render(element);
                                scope.$on("$destroy", function () {
                                    _utils.log('destroy module', 'scope');
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
        var _renderWiget = function (html, data, parent, model, options) {
            html.push('<widget authoring="' + (options.design ? "true" : "false") + '" layout=component data=layout.model.fields.' + data.$id + '></widget>');
        };
        var _renderWigetContent = function (html, data, options) {
            html.push('<widget-' + data.$type);
            html.push(' authoring="' + (options.design ? "true" : "false") + '"');
            html.push(' phone="' + (_device.phone ? "true" : "false") + '"');
            html.push(' tablet="' + (_device.tablet ? "true" : "false") + '"');
            html.push(' module=component props=component.props links=component.links data=component.props.data.ds></widget-' + data.$type + '>');
        };
        _render.register("angular", "widget.content", _renderWigetContent);
        _render.register("angular", "widget", _renderWiget);
    }
})(Phoenix || (Phoenix = {}));
//# sourceMappingURL=angular.module.js.map
var Phoenix;
(function (Phoenix) {
    if (angular) {
        var _p_1 = Phoenix, _utils_1 = _p_1.utils;
        var app = angular.module("phoenix.ui");
        app.controller('uiAuthoringController', ["$scope", function ($scope) { }]);
        app.directive('authoring', [function () {
                return {
                    scope: {
                        toolbox: '=',
                        isform: '=',
                        model: '=',
                        authoring: '=',
                        locale: '=',
                        prototype: '=',
                        path: '='
                    },
                    bindToController: true,
                    restrict: 'E',
                    replace: true,
                    controller: 'uiAuthoringController',
                    controllerAs: 'item',
                    link: function (scope, element, attrs) {
                        var _authoring = _p_1.authoring;
                        if (!_authoring)
                            return;
                        scope.isform = scope.item.isform ? true : false;
                        scope.component = new _authoring.AuthoringEditor({
                            form: !!scope.isform,
                            design: true,
                            replaceParent: true,
                            context: "angular"
                        }, scope.item.toolbox);
                        scope.component.render(element);
                        scope.$on("$destroy", function () {
                            if (scope.component) {
                                _utils_1.log('destroy authoring', 'scope');
                                scope.component.destroy();
                                scope.component = null;
                            }
                        });
                    }
                };
            }]);
    }
})(Phoenix || (Phoenix = {}));
//# sourceMappingURL=angular.authoring.js.map