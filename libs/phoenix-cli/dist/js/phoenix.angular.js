if (angular)
    angular.module("phoenix.ui", []);
//# sourceMappingURL=angular.core.js.map
var Phoenix;
(function (Phoenix) {
    if (angular) {
        var _utils = Phoenix.utils, _application = Phoenix.application, _ui = Phoenix.ui, _ajax = Phoenix.ajax, _link = Phoenix.link, _locale = Phoenix.locale;
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
                var cfg = _application.config(_application.name);
                if (cfg && cfg.pages && cfg.forms) {
                    _ajax.put((scope.isform ? cfg.forms : cfg.pages) + '/' + cd.name, cd).then(function (ldata) {
                    }, function (reason) {
                        alert(extractMessage(reason));
                    });
                }
            };
            scope.component.loadNestedHandler = function (data, after) {
                var cfg = _application.config(_application.name);
                if (cfg && cfg.pages && cfg.forms) {
                    _ajax.post((scope.isform ? cfg.forms : cfg.pages) + '/load/nested', data).then(function (ldata) {
                        if (after)
                            after(ldata);
                    }, function (reason) {
                        alert(extractMessage(reason));
                    });
                }
            };
            scope.component.createHandler = function (name, cd) {
                var cfg = _application.config(_application.name);
                if (cfg && cfg.pages && cfg.forms) {
                    cd.name = name;
                    var callBackSuccess = function (data) {
                        var ctx = _link.context();
                        var cl = { $page: data.name, $authoring: true };
                        _link.execLink(cl, ctx, null);
                    }, callBackError = function (reason) {
                        if (reason == "Conflict") {
                            _utils.prompt(_locale.layouts.design.ConflictedPageName, cd.name, function (decision) {
                                if (!decision)
                                    return;
                                decision = decision.trim();
                                if (!decision)
                                    return;
                                if (decision.indexOf(' ') >= 0) {
                                    alert(_locale.layouts.design.InvalidPageName);
                                    return;
                                }
                                cd.name = decision;
                                _ajax.post((scope.isform ? cfg.forms : cfg.pages) + '/' + cd.name, cd).then(callBackSuccess, callBackError);
                            });
                        }
                        else
                            alert(extractMessage(reason));
                    };
                    _ajax.post((scope.isform ? cfg.forms : cfg.pages) + '/' + cd.name, cd).then(callBackSuccess, callBackError);
                }
            };
            scope.component.openHandler = function (name) {
                var ctx = _link.context(), ll = { $page: name, $authoring: true };
                _link.execLink(ll, ctx, null);
            };
            scope.component.removeHandler = function (name) {
                var cfg = _application.config(_application.name);
                if (cfg && cfg.pages && cfg.forms) {
                    _ajax.remove((scope.isform ? cfg.forms : cfg.pages) + '/' + name).then(function (ldata) {
                        var ctx = _link.context();
                        var ll = { $page: "home" };
                        _link.execLink(ll, ctx, null);
                    }, function (reason) {
                        alert(extractMessage(reason));
                    });
                }
            };
            scope.component.listHandler = function (after) {
                var cfg = _application.config(_application.name);
                if (cfg && cfg.pages && cfg.forms) {
                    _ajax.get((scope.isform ? cfg.forms : cfg.pages)).then(function (ldata) {
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
                            _utils.log('destroy layout', 'scope');
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
                                _utils.log('compile layout', 'scope');
                                $compile(el)(newScope);
                                if (refresh) {
                                    _utils.GlbSerial.execute(function () {
                                        scope.$digest();
                                    });
                                }
                            },
                            beforeRemove: function (el) {
                                _utils.log('remove layout', 'scope');
                                newScope.component = null;
                                newScope.layout = null;
                                newScope.$destroy();
                                newScope = scope.$new();
                            }
                        };
                        if (scope.isform) {
                            _ui.OpenForm(element, scope.layout.model, scope.layout.prototype, {}, scope.layout.locale && scope.layout.locale.$view ? scope.layout.locale.$view : scope.layout.locale, null, options, function (form) {
                                scope.component = form;
                                setComponentHandlers(scope);
                            });
                        }
                        else {
                            scope.component = new _ui.LayoutClass(scope.layout.model || {}, options, {}, scope.layout.prototype, scope.layout.locale && scope.layout.locale.$view ? scope.layout.locale.$view : scope.layout.locale, null);
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
        var _utils = Phoenix.utils, _render = Phoenix.render, _device = Phoenix.device, _ui = Phoenix.ui;
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
                                            _utils.GlbSerial.execute(function () {
                                                scope.$digest();
                                            });
                                        }
                                    },
                                    onDataChanged: function () {
                                        _utils.GlbSerial.execute(function () {
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
        var _ui_1 = Phoenix.ui;
        var app = angular.module("phoenix.ui");
        app.directive('propertyEditor', [function () {
                return {
                    scope: {
                        isform: '='
                    },
                    restrict: 'E',
                    replace: true,
                    link: function (scope, element, attrs) {
                        if (!_ui_1.PropertyEditor)
                            return;
                        scope.component = new _ui_1.PropertyEditor({
                            design: true,
                            form: !!scope.isform,
                            replaceParent: true,
                            context: "angular"
                        });
                        scope.component.render(element);
                        scope.$on("$destroy", function () {
                            if (scope.component)
                                scope.component.destroy();
                        });
                    }
                };
            }]);
    }
})(Phoenix || (Phoenix = {}));
//# sourceMappingURL=angular.authoring-editor.js.map
var Phoenix;
(function (Phoenix) {
    if (angular) {
        var _ui_1 = Phoenix.ui;
        var app = angular.module("phoenix.ui");
        app.directive('authoringToolbar', [function () {
                return {
                    scope: {
                        isform: '='
                    },
                    restrict: 'E',
                    replace: true,
                    link: function (scope, element, attrs) {
                        if (!_ui_1.AuthoringToolBar)
                            return;
                        scope.component = new _ui_1.AuthoringToolBar({
                            design: true,
                            form: !!scope.isform,
                            replaceParent: true,
                            context: "angular"
                        });
                        scope.component.render(element);
                        scope.$on("$destroy", function () {
                            if (scope.component)
                                scope.component.destroy();
                        });
                    }
                };
            }]);
    }
})(Phoenix || (Phoenix = {}));
//# sourceMappingURL=angular.authoring-toolbar.js.map
var Phoenix;
(function (Phoenix) {
    if (angular) {
        var _ui_1 = Phoenix.ui;
        var app = angular.module("phoenix.ui");
        app.controller('uiToolboxController', ["$scope", function ($scope) {
            }]);
        app.directive('authoringToolbox', [function () {
                return {
                    scope: {
                        config: '=',
                        isform: '='
                    },
                    bindToController: true,
                    restrict: 'E',
                    replace: true,
                    controller: 'uiToolboxController',
                    controllerAs: 'item',
                    link: function (scope, element, attrs) {
                        if (!_ui_1.ToolBox)
                            return;
                        scope.component = new _ui_1.ToolBox(scope.item.config, {
                            form: !!scope.isform,
                            design: true,
                            replaceParent: true,
                            context: "angular"
                        });
                        scope.component.render(element);
                        scope.$on("$destroy", function () {
                            if (scope.component)
                                scope.component.destroy();
                        });
                    }
                };
            }]);
    }
})(Phoenix || (Phoenix = {}));
//# sourceMappingURL=angular.authoring-toolbox.js.map