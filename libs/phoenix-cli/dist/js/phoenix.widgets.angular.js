var Phoenix;
(function (Phoenix) {
    if (angular) {
        var _utils = Phoenix.utils, _ui = Phoenix.ui;
        var app = angular.module("phoenix.ui");
        app.directive('carousel', [function () {
                return {
                    scope: {
                        slides: '='
                    },
                    restrict: 'E',
                    replace: true,
                    compile: function (tElem, tAttrs) {
                        return {
                            pre: function (scope, element, attrs) {
                                scope.slides = scope.slides || [];
                                scope.component = new _ui.Carousel({});
                                scope.component.props.slides = scope.slides;
                                scope.component.render(element);
                                scope.$on("$destroy", function () {
                                    _utils.log('destroy carousel', 'scope');
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

var Phoenix;
(function (Phoenix) {
    if (angular) {
        var _locale = Phoenix.locale, _ui = Phoenix.ui;
        var app = angular.module("phoenix.ui");
        app.directive('highcharts', [function () {
                return {
                    scope: {
                        config: '=',
                        data: '='
                    },
                    restrict: 'E',
                    replace: true,
                    template: '<div style="width:100%; height: 100%;"></div>',
                    link: function (scope, element, attrs) {
                        scope.$watchGroup(['data', 'config.type', 'config.options'], function () {
                            if (scope.data) {
                                configurationChart.constructeDefaultConfig(scope);
                                configurationChart.constructeChartByType(scope, scope.config.type);
                                configurationChart.constructeData(scope);
                                configurationChart.constructeUserOptions(scope);
                                element.css("height", scope.config.height);
                                scope.chartConfig.chart.renderTo = element.get(0);
                                var chart = new window["Highcharts"].Chart(scope.chartConfig);
                                var _after_1 = function () {
                                    if (chart && chart.options)
                                        chart.reflow();
                                };
                                $(window).on("phoenix-resize", _after_1);
                                scope.$on('$destroy', function () {
                                    if (chart) {
                                        try {
                                            $(window).off("phoenix-resize", _after_1);
                                            chart.destroy();
                                            chart = null;
                                        }
                                        catch (ex) { }
                                        window.setTimeout(function () {
                                            element.remove();
                                        }, 0);
                                    }
                                });
                            }
                        }, true);
                    }
                };
            }]);
        var configurationChart = {
            constructeDefaultConfig: function (scope) {
                _ui.translateHighcharts();
                scope.config.type = scope.config.type || "pie";
                scope.chartConfig = {
                    chart: { type: scope.config.type, plotBackgroundColor: null, plotBorderWidth: 0, plotShadow: false, reflow: true },
                    tooltip: {
                        pointFormat: configurationUtils.addToolTipPointFormat(scope.config, "<b>{point.y:,.2f} " + _locale.number.symbol + "</b>"),
                        headerFormat: configurationUtils.addToolTipHeaderFormat(scope.config, "point.key"),
                        style: { padding: 10, fontWeight: 'bold' }
                    },
                    legend: { itemStyle: { cursor: "default" } },
                    credits: { enabled: false },
                    lang: { decimalPoint: _locale.number.decimal },
                    plotOptions: { series: { allowPointSelect: false } },
                    colors: [],
                    series: [],
                    title: { text: "" }
                };
                scope.chartConfig.plotOptions[scope.config.type] = {
                    allowPointSelect: true,
                    cursor: "pointer",
                    dataLabels: configurationUtils.addLabel(scope.config, "{point.percentage:,.2f}%"),
                    showInLegend: true,
                    events: { legendItemClick: function (event) { return false; } },
                    point: { events: { legendItemClick: function (event) { return false; } } },
                    size: scope.config.size || "50%"
                };
                scope.colors = (scope.config.colors && Array.isArray(scope.config.colors)) ? scope.config.colors : ["#f03558", "#fad32d", "#45cebd", "#f99f46", "#6A5ACD", "#A0522D", "#000000", "#696969"];
                scope.chartConfig.colors = scope.colors;
            },
            constructeChartByType: function (scope, type) {
                switch (type) {
                    case "column":
                        scope.chartConfig.tooltip.headerFormat = configurationUtils.addToolTipHeaderFormat(scope.config, "series.name");
                        scope.chartConfig.plotOptions["column"].dataLabels = configurationUtils.addLabel(scope.config, "{point.y:,.0f} " + _locale.number.symbol);
                        scope.chartConfig.xAxis = {
                            gridLineWidth: 0,
                            minorGridLineWidth: 0,
                            title: {
                                text: null
                            },
                            labels: {
                                enabled: true
                            },
                            minorTickLength: 0,
                            tickLength: 0
                        };
                        scope.chartConfig.yAxis = {
                            min: 0,
                            margin: [0, 0, 0, 0],
                            gridLineWidth: 2,
                            gridLineDashStyle: "Dot",
                            title: {
                                text: null,
                                style: {
                                    display: "none"
                                },
                                margin: [0, 0, 0, 0]
                            }
                        };
                        break;
                    case "columnrange":
                        scope.chartConfig.chart.inverted = true;
                        scope.chartConfig.tooltip = {
                            pointFormat: configurationUtils.addToolTipPointFormat(scope.config, "{point.low:%d/%m/%Y} - {point.high:%d/%m/%Y}"),
                            style: { padding: 10, fontWeight: 'bold' }
                        };
                        scope.chartConfig.exporting = { enabled: false };
                        scope.chartConfig.legend = scope.chartConfig.legend || {};
                        scope.chartConfig.legend.enabled = false;
                        scope.chartConfig.plotOptions.columnrange.dataLabels = configurationUtils.addLabel(scope.config, "point.y:%d/%m/%Y");
                        scope.chartConfig.plotOptions.columnrange.colorByPoint = true;
                        scope.chartConfig.plotOptions.columnrange.borderWidth = 0;
                        scope.chartConfig.xAxis = { gridLineWidth: 2, gridLineDashStyle: "Dot" };
                        scope.chartConfig.yAxis = {
                            title: { text: null },
                            type: "datetime",
                            tickInterval: 31536000000,
                            minorTickInterval: 31536000000,
                            dateTimeLabelFormats: { year: "%Y" },
                            gridLineWidth: 5,
                            gridLineColor: "#eee"
                        };
                        var dateJour = new Date();
                        scope.chartConfig.yAxis.plotLines = [{
                                color: "#747679",
                                width: 2,
                                value: dateJour
                            }];
                        break;
                }
            },
            constructeUserOptions: function (scope) {
                if (scope.config.options)
                    scope.chartConfig = configurationUtils.addOptions(scope.chartConfig, scope.config.options);
            },
            constructeData: function (scope) {
                scope.chartConfig.xAxis = scope.chartConfig.xAxis || {};
                scope.chartConfig.xAxis.categories = [];
                if (scope.data.series)
                    scope.chartConfig.series = scope.data.series;
                else if (scope.data.rows) {
                    scope.chartConfig.data = scope.chartConfig.data || {};
                    scope.chartConfig.data.firstRowAsNames = false;
                    scope.chartConfig.data.rows = scope.data.rows || [];
                    scope.chartConfig.series = [];
                    scope.data.cols.slice(1).forEach(function (e) { scope.chartConfig.series.push({ name: e.label }); });
                }
                else if (scope.data.datapoints) {
                    scope.chartConfig.series = formatterUtils.formateDatapoints(scope.data);
                }
                if ((scope.data.datapoints || scope.data.series) && scope.chartConfig.series > 1)
                    scope.chartConfig.series.forEach(function (e) {
                        scope.chartConfig.xAxis.categories.push(e.name);
                    });
            }
        }, formatterUtils = {
            formateDatapoints: function (data) {
                if (!data.datapoints.length)
                    return series;
                var series = [];
                if (data.datapoints[0].length > 2) {
                    data.datapoints.forEach(function (ed) {
                        var trouver = -1;
                        series.forEach(function (es, i) {
                            if (es.name == ed[0])
                                return trouver = i;
                        });
                        if (trouver > -1)
                            series[trouver].data.push([ed[1], ed[2]]);
                        else
                            series.push({ name: ed[0], data: [[ed[1], ed[2]]] });
                    });
                }
                else {
                    series[0] = { name: "", data: [] };
                    data.datapoints.forEach(function (ed) {
                        series[0].data.push([ed[0], ed[1]]);
                    });
                }
                return series;
            }
        }, configurationUtils = {
            addToolTipHeaderFormat: function (config, name) {
                if (config.tooltip && config.tooltip.headerFormat)
                    return config.tooltip.headerFormat;
                else
                    return '<span style="font-size: 11px;font-weight:normal">{' + name + '}</span><br/>';
            },
            addToolTipPointFormat: function (config, byDefault) {
                if (config.tooltip && config.tooltip.pointFormat)
                    return config.tooltip.pointFormat;
                else
                    return byDefault;
            },
            addLabel: function (config, byDefault) {
                if (!config.label)
                    return { enabled: true, format: byDefault };
                else
                    return {
                        enabled: typeof config.label.visible == "undefined" ? true : config.label.visible,
                        format: config.label.format || byDefault
                    };
            },
            addOptions: function (destination, source) {
                if (angular.isArray(source)) {
                    destination = angular.isArray(destination) ? destination : [];
                    for (var i = 0; i < source.length; i++) {
                        destination[i] = this.addOptions(destination[i] || {}, source[i]);
                    }
                }
                else if (angular.isObject(source)) {
                    for (var property in source) {
                        destination[property] = this.addOptions(destination[property] || {}, source[property]);
                    }
                }
                else {
                    destination = source;
                }
                return destination;
            }
        };
    }
})(Phoenix || (Phoenix = {}));

var Phoenix;
(function (Phoenix) {
    if (angular) {
        var _customData = Phoenix.customData;
        var app = angular.module("phoenix.ui");
        app.controller('uiWidgetPhoenixchartController', ["$scope", function ($scope) {
                $scope.chart = $scope.props.data.chart || {};
                $scope.chart.search = $scope.chart.search || false;
                $scope.props.data.chart.height = $scope.chart.height || $scope.props.$height - ($scope.props.data.chart.search ? 30 : 0);
                var dataset = $scope.chart.dataset || 'dataset';
                $scope.$watch('data.' + dataset, function () {
                    if ($scope.data && $scope.data[dataset]) {
                        if ($scope.data[dataset].cols) {
                            var schema = $scope.data.view && $scope.data.view[dataset] ? $scope.data.view[dataset] : null;
                            $scope.data[dataset].cols.forEach(function (e) {
                                e.label = schema && schema[e.name] && schema[e.name].title ? schema[e.name].title : (e.label || e.name);
                            });
                        }
                        var func = _customData.get("highcharts.transform." + $scope.chart.transformData);
                        if (func)
                            $scope.series = func($scope.data[dataset].documents || $scope.data[dataset], $scope);
                        else
                            $scope.series = $scope.data[dataset];
                    }
                });
                $scope.chart.options = $scope.chart.options || {};
                if ($scope.phone && $scope.chart.axeXInvisible) {
                    $scope.chart.options.xAxis = $scope.chart.options.xAxis || {};
                    $scope.chart.options.xAxis.labels = { enabled: false };
                }
            }]);
        app.directive('widgetPhoenixchart', [function () {
                return {
                    scope: {
                        props: '=',
                        data: '=',
                        module: '=',
                        phone: '='
                    },
                    restrict: 'E',
                    controller: 'uiWidgetPhoenixchartController',
                    template: '<select class="form-control" ng-show="chart.search" ng-model="props.data.chart.type"><option>pie</option><option>column</option></select><highcharts config="props.data.chart" data="series"></highcharts>'
                };
            }]);
    }
})(Phoenix || (Phoenix = {}));

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
                        }, scope.module.layout, scope.module.meta || scope.module.prototype, scope.module.data, scope.module.module);
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
                        }, cfg.name, cfg.meta, cfg.controller, scope.module.module);
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
        app.directive('googlechart', [function () {
                return {
                    scope: {
                        data: '=',
                        config: '='
                    },
                    restrict: 'E',
                    replace: true,
                    link: function (scope, element, attrs) {
                        scope.component = new _ui.GoogleChart({ replaceParent: true });
                        scope.component.props.config = scope.config;
                        scope.component.props.data = scope.data;
                        scope.component.render(element);
                        scope.$on("$destroy", function () {
                            _utils.log('destroy google chart', 'scope');
                            if (scope.component)
                                scope.component.destroy();
                        });
                        scope.$watch('data', function () {
                            scope.component.props.data = scope.data;
                        });
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

var Phoenix;
(function (Phoenix) {
    if (angular) {
        var app = angular.module("phoenix.ui");
        app.directive('widgetHtml', ['$compile', function ($compile) {
                return {
                    scope: {
                        props: '=',
                        data: '='
                    },
                    restrict: 'E',
                    replace: true,
                    link: function (scope, element, attrs) {
                        var el = angular.element('<div ng-include="\'' + scope.props.data.template + '\'" props="props" data="data"></div>');
                        $compile(el)(scope);
                        element.replaceWith(el);
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
        app.directive('widgetImageMenuItem', [function () {
                return {
                    scope: {
                        module: '=',
                        authoring: '='
                    },
                    restrict: 'E',
                    replace: true,
                    compile: function (tElem, tAttrs) {
                        return {
                            pre: function (scope, element, attrs) {
                                scope.component = new _ui.ImageMenuItem({}, $.extend(true, { replaceParent: true, authoring: scope.authoring }, scope.module.props.data.menu));
                                scope.component.module = scope.module;
                                scope.component.render(element);
                                scope.$on("$destroy", function () {
                                    _utils.log('destroy image menu item', 'scope');
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

var Phoenix;
(function (Phoenix) {
    if (angular) {
        var _utils = Phoenix.utils, app = angular.module("phoenix.ui");
        app.directive('widgetJson', [function () {
                return {
                    scope: {
                        props: '=',
                        data: '='
                    },
                    restrict: 'E',
                    replace: true,
                    template: '<code style="display: block; white-space: pre;">Data = {{data | json}}</code>',
                    link: function (scope, element, attrs) {
                        _utils.log('create Json', 'scope');
                        scope.$on("$destroy", function () {
                            _utils.log('destroy Json', 'scope');
                        });
                    }
                };
            }]);
    }
})(Phoenix || (Phoenix = {}));

var Phoenix;
(function (Phoenix) {
    if (angular) {
        var _utils = Phoenix.utils, _render = Phoenix.render, _ui = Phoenix.ui;
        var _onScopeDestroy = function () {
            var s = this;
            _utils.log('destroy listview', 'scope');
            if (s.component)
                s.component.destroy();
        };
        var app = angular.module("phoenix.ui");
        app.controller('uiWidgetListViewController', ["$scope", function ($scope) { }]);
        app.directive('widgetListview', ['$compile', function ($compile) {
                return {
                    scope: {
                        module: '=',
                        props: '=',
                        data: '=',
                        phone: '=',
                        itemclick: "=",
                        beforeRenderItems: "=",
                        afterRenderItems: "="
                    },
                    bindToController: true,
                    restrict: 'E',
                    replace: true,
                    controller: 'uiWidgetListViewController',
                    controllerAs: 'module',
                    link: function (lscope, element, attrs) {
                        var scope = lscope.$new();
                        scope.component = new _ui.ListView(scope.module.props, {
                            replaceParent: true,
                            context: "angular",
                            beforeAdd: function (el, refresh) {
                                _utils.log('compile listview', 'scope');
                                $compile(el)(scope);
                            },
                            clickItem: scope.module.itemclick,
                            beforeRenderItems: scope.module.beforeRenderItems,
                            afterRenderItems: scope.module.afterRenderItems,
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
                        }, scope.module.module);
                        scope.component.render(element);
                        scope.$on("$destroy", _onScopeDestroy.bind(scope));
                    }
                };
            }]);
        var _renderListViewItem = function (html, type, options, index) {
            html.push('<listviewitem-' + type + ' item=component.props.items[' + index + ']></listviewitem-' + type + '>');
        };
        _render.register("angular", "widget.listview.item", _renderListViewItem);
    }
})(Phoenix || (Phoenix = {}));

var Phoenix;
(function (Phoenix) {
    if (angular) {
        var _utils = Phoenix.utils;
        var app = angular.module("phoenix.ui");
        app.directive('listviewitemTest', [function () {
                return {
                    scope: {
                        item: '=',
                        authoring: '='
                    },
                    restrict: 'E',
                    replace: true,
                    template: '<div><h4>{{::item.title}}</h4><p>{{::item.description}}</p></div>',
                    link: function (scope, element, attrs) {
                        scope.$on("$destroy", function () {
                            _utils.log('destroy listviewitemTest', 'scope');
                        });
                    }
                };
            }]);
    }
})(Phoenix || (Phoenix = {}));

var Phoenix;
(function (Phoenix) {
    if (angular) {
        var _customData = Phoenix.customData;
        var app = angular.module("phoenix.ui");
        app.directive('widgetPhoenixMap', [function () {
                return {
                    scope: {
                        props: '=',
                        data: '=',
                        module: '='
                    },
                    restrict: 'E',
                    controller: ["$scope", function ($scope) {
                            $scope.props.data.map.height = $scope.props.data.map.height || $scope.props.$height || 400;
                            $scope.callback = function (data) {
                                if (data)
                                    $scope.module.noData(false);
                                else
                                    $scope.module.noData(true);
                            };
                        }],
                    template: '<map ng-style="{\'height\': props.data.map.height + \'px\'}" config="props.data.map" address="data.dataset.address" callback="callback"></map>'
                };
            }]);
    }
})(Phoenix || (Phoenix = {}));

var Phoenix;
(function (Phoenix) {
    if (angular) {
        var _utils = Phoenix.utils, _ui = Phoenix.ui, _dom = Phoenix.dom;
        var app = angular.module("phoenix.ui");
        app.directive('map', [function () {
                return {
                    scope: {
                        config: '=',
                        address: '=',
                        callback: '='
                    },
                    restrict: 'E',
                    template: '<div class="bs-map" ng-style="{\'height\': config.height + \'px\'}"  ng-hide="nodata"></div>',
                    controller: ["$scope", function ($scope) {
                            $scope.config.height = $scope.config.height || 400;
                        }],
                    link: function (scope, element, attributs) {
                        var container = _dom.query(element.get(0), ".bs-map");
                        scope.map = null;
                        scope.config = scope.config || {};
                        scope.config.type = scope.config.type == "gm" ? scope.config.type : "om";
                        scope.$watch('address', function () {
                            if (!scope.address)
                                return;
                            if (!scope.map) {
                                switch (scope.config.type) {
                                    case "gm":
                                        scope.map = _ui.googleMaps({}, scope.callback);
                                        break;
                                    case "om":
                                        scope.map = _ui.openStreetMap({}, scope.callback);
                                }
                            }
                            if (scope.map) {
                                if (!scope.map.map)
                                    scope.map.initMap(container);
                                scope.map.addMarkerByAddress(scope.address);
                            }
                        }, true);
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
        app.directive('moduleTitle', [function () {
                return {
                    scope: {
                        data: '='
                    },
                    restrict: 'E',
                    replace: true,
                    compile: function (tElem, tAttrs) {
                        return {
                            pre: function (scope, element, attrs) {
                                scope.component = new _ui.ModuleTitle({ replaceParent: true }, scope.data);
                                scope.component.render(element);
                                scope.$on("$destroy", function () {
                                    _utils.log('destroy tabs', 'scope');
                                    if (scope.component)
                                        scope.component.destroy();
                                });
                            }
                        };
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
        app.directive('planningchart', [function () {
                return {
                    scope: {
                        data: '=',
                        config: '=',
                        onLink: '='
                    },
                    restrict: 'E',
                    replace: true,
                    link: function (scope, element, attrs, data) {
                        scope.component = new _ui.PlanningChart(data);
                        scope.component.beforeExecuteLink = scope.onLink;
                        scope.component.render(element);
                        scope.$on("$destroy", function () {
                            _utils.log('destroy planning chart', 'scope');
                            if (scope.component)
                                scope.component.destroy();
                        });
                        scope.$watch('data', function () {
                            scope.component.data = scope.data;
                        });
                    }
                };
            }]);
    }
})(Phoenix || (Phoenix = {}));

var Phoenix;
(function (Phoenix) {
    if (angular) {
        var _utils = Phoenix.utils, _tabs = Phoenix.tabs;
        var app = angular.module("phoenix.ui");
        app.directive('tabs', [function () {
                return {
                    scope: {
                        tabs: '='
                    },
                    restrict: 'E',
                    replace: true,
                    compile: function (tElem, tAttrs) {
                        return {
                            pre: function (scope, element, attrs) {
                                scope.component = new _tabs.Tabs({ replaceParent: true }, scope.tabs);
                                scope.component.render(element);
                                scope.$on("$destroy", function () {
                                    _utils.log('destroy tabs', 'scope');
                                    if (scope.component)
                                        scope.component.destroy();
                                });
                            }
                        };
                    }
                };
            }]);
        app.directive('widgetTabs', [function () {
                return {
                    scope: {
                        module: '='
                    },
                    restrict: 'E',
                    replace: true,
                    compile: function (tElem, tAttrs) {
                        return {
                            pre: function (scope, element, attrs) {
                                scope.component = new _tabs.Tabs({ replaceParent: true }, scope.module.props.data.tabs);
                                scope.component.render(element);
                                scope.$on("$destroy", function () {
                                    _utils.log('destroy tabs', 'scope');
                                    if (scope.component)
                                        scope.component.destroy();
                                });
                            }
                        };
                    }
                };
            }]);
    }
})(Phoenix || (Phoenix = {}));
