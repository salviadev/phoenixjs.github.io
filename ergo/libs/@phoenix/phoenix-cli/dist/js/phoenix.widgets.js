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
    var ui;
    (function (ui) {
        var _utils = Phoenix.utils, _dom = Phoenix.dom, _locale = Phoenix.locale, _mem = Phoenix.$mem, _link = Phoenix.link, _ui = ui, _customData = Phoenix.customData, _render = Phoenix.render;
        var FormContainer = (function () {
            function FormContainer(options, layout, schema, formData, module, preferences) {
                var that = this;
                options = options || {};
                that.formData = formData || { $create: true };
                that.options = options;
                that.layout = layout;
                that.schema = schema;
                that.module = module;
                that.preferences = preferences;
            }
            FormContainer.prototype.render = function ($parent) {
                var that = this;
                if (!that.$element) {
                    var fo = {
                        replaceParent: that.options.replaceParent,
                        context: that.options.context,
                        beforeAdd: that.options.beforeAdd,
                        beforeRemove: that.options.beforeRemove,
                        beforeSetModel: that.options.beforeSetModel,
                        afterModelCreated: that.options.afterModelCreated,
                        settingsHandler: that.options.onSettings,
                        storageName: that.options.storageName,
                        validators: that.options.validators,
                        module: that.module,
                        preferences: that.preferences
                    };
                    var llocale = that.module && that.module.data && that.module.data.data && that.module.data.data.ds && that.module.data.data.ds.view ?
                        that.module.data.data.ds.view.$view : null;
                    _ui.OpenForm($parent, that.layout, that.schema, that.formData || {}, llocale, that.action, null, fo, function (form) {
                        that.form = form;
                        that.$element = that.form.$element;
                    });
                }
            };
            FormContainer.prototype.destroy = function () {
                var that = this;
                if (that.form) {
                    that.form.destroy();
                    that.form = null;
                }
                that.$element = null;
            };
            return FormContainer;
        }());
        ui.FormContainer = FormContainer;
        ;
        _render.register("javascript", "widget.content.control.form", FormContainer);
        var FormContainerController = (function (_super) {
            __extends(FormContainerController, _super);
            function FormContainerController(options, formName, metaName, controllerName, parentModule, preferences) {
                var _this = this;
                if (!formName)
                    throw 'Form name is empty.';
                if (!metaName)
                    throw 'Meta name (schema) is empty.';
                if (!controllerName)
                    throw 'Controller name is empty.';
                var config = _customData.get(controllerName);
                if (!config)
                    throw _utils.format('Controller not found "{0}". Use customData.register(controllerName, ctrlConfig).', controllerName);
                ui.formController2Options(options, config);
                var d = (config.data ? config.data() : null);
                _this = _super.call(this, options, formName, metaName, d, parentModule, preferences) || this;
                if (config.isFormController) {
                    _this.action = config.modelChanged.bind(config);
                }
                else if (config.onModelChanged) {
                    _this.action = config.onModelChanged.bind(config);
                }
                return _this;
            }
            return FormContainerController;
        }(FormContainer));
        ui.FormContainerController = FormContainerController;
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));

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
    var _p = Phoenix, _utils = _p.utils, _dom = _p.dom, _ui = _p.ui, _customData = _p.customData, _uiutils = _p.uiutils;
    var charts;
    (function (charts) {
        function _createContainer(id, options, authoring, cb) {
            options = _utils.extendObject(false, { titleIsHidden: false, placeHolder: false, columns: false }, options);
            var html = [];
            _uiutils.utils.fieldWrapper(html, options, authoring, function () {
                if (cb)
                    cb(html);
            });
            return _utils.format(html.join(''), id);
        }
        var ChartBase = (function (_super) {
            __extends(ChartBase, _super);
            function ChartBase(fp, options, form) {
                var _this = _super.call(this, fp, options, form) || this;
                _this._state();
                return _this;
            }
            ChartBase.prototype.click = function (event) {
                var that = this;
            };
            ChartBase.prototype._setDisabled = function (element) { };
            ChartBase.prototype._setReadOnly = function (element) { };
            ChartBase.prototype._setMandatory = function (element) { };
            ChartBase.prototype.changed = function (propName, ov, nv, op, params) {
                var that = this;
                if (propName === that.$bind || !that.form.inSync) {
                    that.state.value = that.form.getValue(that.$bind);
                    that._renderChart(false);
                }
                else if (that.form.inSync) {
                    that.form.forceAfterProcessing();
                    that.form.execLater({
                        id: that.id, hnd: function () {
                            that._renderChart(false);
                        }
                    });
                }
            };
            ChartBase.prototype.destroy = function () {
                var that = this;
                if (that._chart) {
                    that._chart.destroy();
                    that._chart = null;
                }
                _super.prototype.destroy.call(this);
            };
            ChartBase.prototype._renderChart = function (inRender) {
                var that = this;
                var model = that.state.value ? that.state.value.model(false) : {};
                var options = that.renderOptions;
                if (options.transform) {
                    var hnd = _customData.get(options.transform);
                    model = hnd(model, that.form.$model);
                }
                if (!model)
                    model = {};
                var series = Array.isArray(model) ? model : [model];
                var config = that.renderOptions.chart || {};
                var parent = that.$element.get(0);
                if (that._chart) {
                    that._chart.destroy();
                    that._chart = null;
                    _dom.empty(parent);
                }
                that._chart = _p.highcharts.createHighChart(parent, config, series);
            };
            ChartBase.prototype.resize = function () {
                var that = this;
                if (that._chart)
                    that._chart.reflow();
            };
            ChartBase.prototype.stateChanged = function (propName, params) {
                var that = this, state = that.form.getState(that.$bind), element = that.$element ? that.$element.get(0) : null;
                if (state.isHidden !== that.state.isHidden) {
                    that.state.isHidden = state.isHidden;
                    that.setHidden(element);
                }
                if (state.isDisabled !== that.state.isDisabled) {
                    that.state.isDisabled = state.isDisabled;
                    that._setDisabled(element);
                }
                if (state.isReadOnly !== that.state.isReadOnly) {
                    that.state.isReadOnly = state.isReadOnly;
                    that._setReadOnly(element);
                }
                if (state.isMandatory !== that.state.isMandatory) {
                    that.state.isMandatory = state.isMandatory;
                    that._setMandatory(element);
                }
            };
            ChartBase.prototype._containerContent = function (html) {
            };
            ChartBase.prototype.render = function ($parent) {
                var that = this;
                var opts = that._initOptions(_uiutils.utils.defaultOptions);
                if (!that.$element) {
                    that.$element = $(_createContainer(that.id, opts, that.options.design, function (html) {
                        that._containerContent(html);
                    }));
                    that._renderChart(true);
                    that.setEvents(opts);
                }
                that.appendElement($parent, opts);
                return that.$element;
            };
            return ChartBase;
        }(Phoenix.ui.AbsField));
        charts.ChartBase = ChartBase;
        _ui.registerControl(ChartBase, 'object', false, 'highchart', null);
    })(charts = Phoenix.charts || (Phoenix.charts = {}));
})(Phoenix || (Phoenix = {}));

var Phoenix;
(function (Phoenix) {
    var highcharts;
    (function (highcharts) {
        var _p = Phoenix, _dom = Phoenix.dom, _ulocale = _p.ulocale, _locale = _p.locale;
        var seriesColors = ["#f03558", "#fad32d", "#45cebd", "#f99f46", "#6A5ACD", "#A0522D", "#000000", "#696969"];
        var configurationUtils = {
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
                        enabled: typeof config.label.visible === undefined ? true : config.label.visible,
                        format: config.label.format || byDefault
                    };
            },
            addOptions: function (destination, source) {
                if (!source)
                    return;
                if (Array.isArray(source)) {
                    destination = Array.isArray(destination) ? destination : [];
                    for (var i = 0; i < source.length; i++)
                        destination[i] = configurationUtils.addOptions(destination[i] || {}, source[i]);
                }
                else if (typeof source === 'object') {
                    Object.keys(source).forEach(function (key) {
                        destination[key] = configurationUtils.addOptions(destination[key] || {}, source[key]);
                    });
                }
                else {
                    destination = source;
                }
                return destination;
            }
        };
        var _formatDatapoints = function (data) {
            var series = [];
            if (!data.datapoints.length)
                return series;
            if (data.datapoints[0].length > 2) {
                data.datapoints.forEach(function (ed) {
                    var si = -1;
                    series.forEach(function (es, i) {
                        if (es.name === ed[0])
                            return si = i;
                    });
                    if (si >= 0)
                        series[si].data.push([ed[1], ed[2]]);
                    else
                        series.push({ name: ed[0], data: [[ed[1], ed[2]]] });
                });
            }
            else {
                series[0] = { name: '', data: [] };
                data.datapoints.forEach(function (ed) {
                    series[0].data.push([ed[0], ed[1]]);
                });
            }
            return series;
        }, _hightChartsOptions = function (config) {
            var decimals = config.decimals;
            if (decimals === undefined)
                decimals = _locale.number.places;
            var symbol = config.symbol;
            if (symbol === undefined)
                symbol = _locale.number.symbol;
            var type = config.type || 'pie';
            var chartConfig = {
                chart: { type: type, plotBackgroundColor: null, plotBorderWidth: 0, plotShadow: false, reflow: true },
                tooltip: {
                    pointFormat: configurationUtils.addToolTipPointFormat(config, '<b>{point.y:,.' + decimals + 'f} ' + symbol + '</b>'),
                    headerFormat: configurationUtils.addToolTipHeaderFormat(config, 'point.key'),
                    style: { padding: 10, fontWeight: 'bold' }
                },
                legend: { itemStyle: { cursor: 'default' } },
                credits: { enabled: false },
                lang: { decimalPoint: _locale.number.decimal },
                plotOptions: { series: { allowPointSelect: false } },
                colors: [],
                series: [],
                title: { text: config.title || '' }
            };
            chartConfig.plotOptions[type] = {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: configurationUtils.addLabel(config, '{point.percentage:,.' + decimals + 'f}%'),
                showInLegend: true,
                events: { legendItemClick: function (event) { return false; } },
                point: { events: { legendItemClick: function (event) { return false; } } }
            };
            chartConfig.colors = config.colors || seriesColors.slice();
            return chartConfig;
        }, _initOptionsByType = function (chartConfig, config) {
            var type = chartConfig.chart.type;
            var symbol = config.symbol;
            if (symbol === undefined)
                symbol = _locale.number.symbol;
            var decimals = config.decimals;
            if (decimals === undefined)
                decimals = _locale.number.places;
            switch (type) {
                case 'column':
                    chartConfig.tooltip.headerFormat = configurationUtils.addToolTipHeaderFormat(config, 'series.name');
                    chartConfig.plotOptions[type].dataLabels = configurationUtils.addLabel(config, '{point.y:,.' + decimals + 'f} ' + symbol);
                    chartConfig.xAxis = {
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
                    chartConfig.yAxis = {
                        min: 0,
                        margin: [0, 0, 0, 0],
                        gridLineWidth: 2,
                        gridLineDashStyle: 'Dot',
                        title: {
                            text: null,
                            style: {
                                display: 'none'
                            },
                            margin: [0, 0, 0, 0]
                        }
                    };
                    break;
                case 'columnrange':
                    chartConfig.chart.inverted = true;
                    chartConfig.tooltip = {
                        pointFormat: configurationUtils.addToolTipPointFormat(config, '{point.low:%d/%m/%Y} - {point.high:%d/%m/%Y}'),
                        style: { padding: 10, fontWeight: 'bold' }
                    };
                    chartConfig.exporting = { enabled: false };
                    chartConfig.legend = chartConfig.legend || {};
                    chartConfig.legend.enabled = false;
                    chartConfig.plotOptions.columnrange.dataLabels = configurationUtils.addLabel(config, 'point.y:%d/%m/%Y');
                    chartConfig.plotOptions.columnrange.colorByPoint = true;
                    chartConfig.plotOptions.columnrange.borderWidth = 0;
                    chartConfig.xAxis = { gridLineWidth: 2, gridLineDashStyle: 'Dot' };
                    chartConfig.yAxis = {
                        title: { text: null },
                        type: 'datetime',
                        tickInterval: 31536000000,
                        minorTickInterval: 31536000000,
                        dateTimeLabelFormats: { year: '%Y' },
                        gridLineWidth: 5,
                        gridLineColor: '#eee'
                    };
                    var dateJour = new Date();
                    chartConfig.yAxis.plotLines = [{
                            color: '#747679',
                            width: 2,
                            value: dateJour
                        }];
                    break;
            }
        }, _customOptions = function (chartConfig, config) {
            chartConfig = configurationUtils.addOptions(chartConfig, config.options);
        }, _createChart = function (element, config, data) {
            var chartConfig = _hightChartsOptions(config);
            _initOptionsByType(chartConfig, config);
            _customOptions(chartConfig, config);
            element.style.height = config.height || '300px';
            chartConfig.chart.renderTo = element;
            chartConfig.series = data;
            var lwindow = window;
            return new lwindow.Highcharts.Chart(chartConfig);
        };
        highcharts.createHighChart = _createChart;
        var tdp = function (lang) {
            var lwindow = window;
            if (lwindow.Highcharts && lwindow.Highcharts.setOptions) {
                lwindow.Highcharts.setOptions({
                    lang: {
                        months: _locale.date.months,
                        weekdays: _locale.date.weekdays,
                        shortMonths: _locale.date.monthsShort,
                        decimalPoint: _locale.number.decimal,
                        thousandsSep: _locale.number.thousand,
                        resetZoom: _locale.charts.resetZoom,
                        resetZoomTitle: _locale.charts.resetZoomTitle,
                        rangeSelectorZoom: _locale.charts.rangeSelectorZoom,
                        rangeSelectorFrom: _locale.charts.rangeSelectorFrom,
                        rangeSelectorTo: _locale.charts.rangeSelectorTo
                    }
                });
            }
        };
        _dom.readyHandlers.push(function () {
            tdp(_ulocale.currentLang);
        });
        _ulocale.register(tdp);
    })(highcharts = Phoenix.highcharts || (Phoenix.highcharts = {}));
})(Phoenix || (Phoenix = {}));
