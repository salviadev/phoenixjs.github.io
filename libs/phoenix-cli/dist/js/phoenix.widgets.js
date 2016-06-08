var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        var _html = [
            '<div id="{0}" class="carousel bs-carousel">',
            '<ol class="carousel-indicators"></ol>',
            '<div class="carousel-inner"></div>',
            '<a data-slide="prev" data-target="#{0}" class="left carousel-control" style="cursor:pointer;"><span class="glyphicon glyphicon-chevron-left"></span></a>',
            '<a data-slide="next" data-target="#{0}" class="right carousel-control" style="cursor:pointer;"><span class="glyphicon glyphicon-chevron-right"></span></a>',
            '</div>'
        ];
        var _utils = Phoenix.utils, _dom = Phoenix.dom, _device = Phoenix.device, _render = Phoenix.render, _renderImage = function (cont, slide) {
            cont.appendChild($('<h4 class="title">Photo : ' + slide.title + '</h4>').get(0));
            var img = $('<div></div>').get(0);
            img.appendChild($('<img alt="Pas de photo" src="' + slide.url + '" />').get(0));
            cont.appendChild(img);
        };
        var Carousel = (function () {
            function Carousel(options) {
                var that = this;
                that.options = options || {};
                that.props = {};
                that.data = {
                    slides: []
                };
                that.carouselId = _utils.allocID();
                that._defineProps();
            }
            Carousel.prototype._defineProps = function () {
                var self = this, _dp = _utils.defineProperty;
                _dp("slides", self);
            };
            Carousel.prototype._notifyChange = function (propertyName) {
                var that = this;
                switch (propertyName) {
                    case "slides":
                        that._createSlides();
                        break;
                }
            };
            Carousel.prototype._renderSlide = function (cont, slide) {
                if (slide.$type == "image") {
                    return _renderImage(cont, slide);
                }
                cont.appendChild($('<div style="min-height:200px; background-color: red;"><center>Invalid slide definition.</center></div>').get(0));
            };
            Carousel.prototype._createSlides = function () {
                var that = this;
                if (that.$element) {
                    var e = that.$element.get(0);
                    var indicators = _dom.query(e, '.carousel-indicators');
                    var inner = _dom.query(e, '.carousel-inner');
                    $(indicators).empty();
                    $(inner).empty();
                    var fragInd = document.createDocumentFragment(), fragContent = document.createDocumentFragment();
                    var ind = $('<li data-slide-to="1" data-target="#' + that.carouselId + '"></li>').get(0);
                    var contWrapper = $('<div class="item"></div>').get(0);
                    that.data.slides.forEach(function (slide, index) {
                        var ii = ind.cloneNode(true);
                        var cont = contWrapper.cloneNode(true);
                        _dom.attr(ii, "data-slide-to", index);
                        if (!index) {
                            _dom.addClass(ii, "active");
                            _dom.addClass(cont, "active");
                        }
                        fragInd.appendChild(ii);
                        that._renderSlide(cont, slide);
                        fragContent.appendChild(cont);
                    });
                    if (that.data.slides.length) {
                        indicators.appendChild(fragInd);
                        inner.appendChild(fragContent);
                        _dom.removeClass(e, "bs-none");
                    }
                    else
                        _dom.addClass(e, "bs-none");
                    that.$element["carousel"]('pause');
                }
            };
            Carousel.prototype._setEvents = function () {
                var that = this;
                if (that.$element) {
                    if (that.$element["swipe"] && (_device.deviceType != "windows"))
                        that.$element["swipe"]({
                            excludedElements: " button, input, select, textarea, .noSwipe",
                            swipeLeft: function (event) {
                                that.$element["carousel"]('prev');
                            },
                            swipeRight: function (event) {
                                that.$element["carousel"]('next');
                            }
                        });
                }
            };
            Carousel.prototype._removeEvents = function () {
                var that = this;
                if (that.$element) {
                    if (that.$element["swipe"] && (_device.deviceType != "windows"))
                        that.$element["swipe"]("destroy");
                }
            };
            Carousel.prototype.render = function ($parent) {
                var that = this;
                if (!that.$element) {
                    that.$element = $(_utils.format(_html.join(''), that.carouselId));
                    that._createSlides();
                    that._setEvents();
                }
                if ($parent) {
                    if (that.options.replaceParent)
                        $parent.replaceWith(that.$element);
                    else
                        $parent.append(that.$element);
                }
                return that.$element;
            };
            Carousel.prototype.destroy = function () {
                var that = this;
                that._removeEvents();
                that.$element = null;
                that.options = null;
            };
            return Carousel;
        }());
        ui.Carousel = Carousel;
        ;
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));
//# sourceMappingURL=carousel.control.js.map
var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        var _ulocale = Phoenix.ulocale, _locale = Phoenix.locale;
        var tdp = function (lang) {
            if (window["Highcharts"] && window["Highcharts"].setOptions) {
                window["Highcharts"].setOptions({
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
        var _ensureLang = function () {
            var lastLang = "";
            return function () {
                if (_ulocale.currentLang != lastLang) {
                    lastLang = _ulocale.currentLang;
                    tdp(_ulocale.currentLang);
                }
            };
        };
        ui.translateHighcharts = _ensureLang();
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));
//# sourceMappingURL=highcharts.control.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        var _utils = Phoenix.utils, _dom = Phoenix.dom, _locale = Phoenix.locale, _mem = Phoenix.$mem, _link = Phoenix.link, _ui = ui, _customData = Phoenix.customData, _render = Phoenix.render;
        var FormContainer = (function () {
            function FormContainer(options, layout, schema, formData, module) {
                var that = this;
                options = options || {};
                that.formData = formData || {};
                that.options = options;
                that.layout = layout;
                that.schema = schema;
                that.module = module;
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
                        module: that.module
                    };
                    var llocale = that.module && that.module.data && that.module.data.data && that.module.data.data.ds && that.module.data.data.ds.view ?
                        that.module.data.data.ds.view.$view : null;
                    _ui.OpenForm($parent, that.layout, that.schema, that.formData || {}, llocale, that.action, fo, function (form) {
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
            function FormContainerController(options, formName, metaName, controllerName, module) {
                if (!formName)
                    throw 'Form name is empty.';
                if (!metaName)
                    throw 'Meta name (schema) is empty.';
                if (!controllerName)
                    throw 'Controller name is empty.';
                var config = _customData.get(controllerName);
                if (!config)
                    throw _utils.format('Controller not found "{0}". Use customData.register(controllerName, ctrlConfig).', controllerName);
                options.beforeSetModel = config.initObjectState ? config.initObjectState.bind(config) : null;
                options.beforeModelCreated = config.initModel ? config.initModel.bind(config) : null;
                options.onSettings = config.onSettings ? config.onSettings.bind(config) : null;
                options.storageName = config.storageName;
                options.validators = config.validators;
                var d = (config.data ? config.data() : null);
                _super.call(this, options, formName, metaName, d, module);
                if (config.onModelChanged)
                    this.action = config.onModelChanged.bind(config);
            }
            return FormContainerController;
        }(FormContainer));
        ui.FormContainerController = FormContainerController;
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));
//# sourceMappingURL=inlineform.js.map
var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        var _ulocale = Phoenix.ulocale, _utils = Phoenix.utils, _ajax = Phoenix.ajax, _render = Phoenix.render, _html = '<div id="{0}" class="" style="width:{1};height:{2}"></div>', _data2Timeline = function (cdata, options, config) {
            var gdata = new window["google"].visualization.DataTable();
            gdata.addColumn('string', 'Id');
            gdata.addColumn('string', 'Name');
            gdata.addColumn('date', 'Start');
            gdata.addColumn('date', 'End');
            var rows = [];
            for (var i = 1, len = cdata.cols.length; i < len; i++) {
                var cr = new Array(4);
                cr[0] = i + '';
                cr[1] = cdata.cols[i].label;
                var v = cdata.rows[0][i];
                v = (typeof v === "object") ? v.value : v;
                if (v)
                    cr[2] = _ulocale.parseISODate(v);
                else
                    cr[2] = null;
                v = cdata.rows[1][i];
                v = (typeof v === "object") ? v.value : v;
                if (v)
                    cr[3] = _ulocale.parseISODate(v);
                else
                    cr[3] = null;
                rows.push(cr);
            }
            options.timeline = { showRowLabels: false };
            options.colors = config.colors;
            gdata.addRows(rows);
            return gdata;
        }, _data2Pie = function (cdata, options, config) {
            var isCurrency = (config.valueType == "money");
            var data = new window["google"].visualization.DataTable();
            cdata.titles = cdata.titles || {};
            cdata.rows = cdata.rows || [];
            data.addColumn('string', cdata.cols[0].label);
            data.addColumn('number', cdata.titles.seriesTitle || '');
            var rows = [];
            for (var i = 1, len = cdata.cols.length; i < len; i++) {
                var cr = [cdata.cols[i].label, { v: 0.0, f: '' }];
                for (var j = 0, ll = cdata.rows.length; j < ll; j++) {
                    var value = cdata.rows[j][i];
                    if (value)
                        cr[1].v += (typeof value === "object") ? value.value : value;
                }
                cr[1].v = parseFloat(cr[1].v.toFixed(6));
                if (isCurrency)
                    cr[1].f = _ulocale.money(cr[1].v, true);
                rows.push(cr);
            }
            data.addRows(rows);
            if (config.colors) {
                options.slices = {};
                config.colors.forEach(function (color, index) {
                    options.slices[index] = { color: color };
                });
            }
            return data;
        }, _data2AreaOrLine = function (cdata, options, config) {
            var isCurrency = (config.valueType == "money");
            var ldata = new window["google"].google.visualization.DataTable();
            var rows = [];
            cdata.titles = cdata.titles || {};
            cdata.rows = cdata.rows || [];
            for (var i = 0, len = cdata.cols.length; i < len; i++) {
                ldata.addColumn(i ? 'number' : 'string', cdata.cols[i].label);
            }
            for (var j = 0, ll = cdata.rows.length; j < ll; j++) {
                var cr = new Array(cdata.cols.length);
                for (var i = 0, len = cdata.cols.length; i < len; i++) {
                    var value = cdata.rows[j][i];
                    if (i == 0) {
                        cr[i] = (typeof value === "object") ? value.value : value;
                    }
                    else {
                        cr[i] = { v: (typeof value === "object") ? value.value : value };
                        if (isCurrency)
                            cr[i].f = _ulocale.money(cr[i].v, true);
                    }
                }
                rows.push(cr);
            }
            options.colors = config.colors;
            ldata.addRows(rows);
            return ldata;
        };
        var GoogleChart = (function () {
            function GoogleChart(options) {
                var that = this;
                that.options = options || {};
                that.props = {};
                that.data = {};
                that.chartId = _utils.allocID();
                that._defineProps();
            }
            GoogleChart.prototype._defineProps = function () {
                var self = this;
                var _dp = _utils.defineProperty;
                _dp("data", self);
                _dp("config", self);
            };
            GoogleChart.prototype._notifyChange = function (propertyName) {
                var that = this;
                switch (propertyName) {
                    case "data":
                        that.renderChart();
                        break;
                }
            };
            GoogleChart.prototype._onresize = function () {
                var that = this;
                that._internalRenderChart();
            };
            GoogleChart.prototype._setEvents = function () {
                var that = this;
                if (that.$element) {
                    $(window).on('resize.' + that.chartId, function () {
                        if (!that.canResize)
                            return;
                        clearTimeout(that.doResize);
                        that.doResize = setTimeout(that._onresize.bind(that), 100);
                    });
                }
            };
            GoogleChart.prototype._removeEvents = function () {
                var that = this;
                if (that.$element) {
                    $(window).off("resize." + that.chartId);
                }
            };
            GoogleChart.prototype._getConfig = function () {
                var that = this;
                var config = that.data.config || {};
                config.width = (config.width || "100%") + '';
                config.height = (config.height || "400px") + '';
                if (config.height.indexOf("px") < 0 || config.height.indexOf("%") < 0)
                    config.height = config.height + "px";
                return config;
            };
            GoogleChart.prototype._append = function ($parent) {
                var that = this;
                if ($parent) {
                    if (that.options.beforeAdd)
                        that.options.beforeAdd(that.$element);
                    if (that.options.replaceParent)
                        $parent.replaceWith(that.$element);
                    else
                        $parent.append(that.$element);
                }
            };
            GoogleChart.prototype.renderChart = function () {
                var that = this;
                if (!that.$element)
                    return;
                if (that.rto)
                    return;
                that.rto = window.setTimeout(function () {
                    that.rto = null;
                    that._internalRenderChart();
                }, 0);
            };
            GoogleChart.prototype._internalRenderChart = function () {
                var that = this;
                var config = that.data.config || {};
                config.valueType = config.valueType || "money";
                config.colors = config.colors || ["#f03558", "#fad32d", "#45cebd", "#f99f46", "#6A5ACD", "#A0522D", "#000000", "#696969"];
                config.colors = ["#f03558", "#fad32d", "#45cebd", "#f99f46", "#6A5ACD", "#A0522D", "#000000", "#696969"];
                var cdata = that.data.data;
                var ldata, tc, options = {
                    legend: { position: 'top', alignment: 'center', maxLines: 2 },
                    tooltip: { showColorCode: true, text: 'value' },
                    pieHole: 0,
                    vAxis: null, hAxis: null, bars: '',
                };
                that.$element.empty();
                if (!cdata || !cdata.cols || !cdata.cols.length)
                    return;
                if (!cdata.rows || !cdata.rows.length)
                    return;
                switch (config.type) {
                    case "pie":
                        tc = 'PieChart';
                        ldata = _data2Pie(cdata, options, config);
                        break;
                    case "donut":
                        tc = 'PieChart';
                        ldata = _data2Pie(cdata, options, config);
                        options.pieHole = 0.4;
                        break;
                    case "line":
                        tc = 'LineChart';
                        options.hAxis = { title: cdata.cols[0].label || '' };
                        options.vAxis = { title: cdata.titles.valuesTitle || '' };
                        ldata = _data2AreaOrLine(cdata, options, config);
                        break;
                    case "area":
                        tc = 'AreaChart';
                        options.hAxis = { title: cdata.cols[0].label || '' };
                        options.vAxis = { title: cdata.titles.valuesTitle || '' };
                        ldata = _data2AreaOrLine(cdata, options, config);
                        break;
                    case "bar":
                        tc = 'BarChart';
                        options.hAxis = { title: cdata.titles.valuesTitle || '' };
                        options.vAxis = { title: cdata.cols[0].label || '' };
                        options.bars = 'horizontal';
                        ldata = _data2AreaOrLine(cdata, options, config);
                        break;
                    case "column":
                        tc = 'ColumnChart';
                        options.hAxis = { title: cdata.cols[0].label || '' };
                        options.vAxis = { title: cdata.titles.valuesTitle || '' };
                        ldata = _data2AreaOrLine(cdata, options, config);
                        break;
                    case "columnrange":
                        tc = 'Timeline';
                        if (cdata.rows.length != 2)
                            return null;
                        ldata = _data2Timeline(cdata, options, config);
                        break;
                    default:
                        return null;
                }
                var chart = tc == 'Bar' ? new window["google"].charts.Bar(that.$element.get(0)) : new window["google"].visualization[tc](that.$element.get(0));
                chart.draw(ldata, options);
                that.canResize = true;
            };
            GoogleChart.prototype.render = function ($parent) {
                var that = this;
                if (!that.$element) {
                    _ajax.loadScript("jsapi", "https://www.google.com/jsapi", function (err) {
                        if (!err) {
                            var loader = {
                                execute: function (cb) {
                                    window["google"].load('visualization', '1', { packages: ['corechart', 'timeline'], callback: cb });
                                }
                            };
                            _ajax.loadScript("gvisualization", "", function (err) {
                                var cfg = that._getConfig();
                                that.$element = $(_utils.format(_html, that.chartId, cfg.width, cfg.height));
                                that._append($parent);
                                that.renderChart();
                                that._setEvents();
                            }, loader);
                        }
                    }, null);
                }
                else
                    that._append($parent);
            };
            GoogleChart.prototype.destroy = function () {
                var that = this;
                that._removeEvents();
                that.$element = null;
                that.options = null;
            };
            return GoogleChart;
        }());
        ui.GoogleChart = GoogleChart;
        _render.register("javascript", "widget.content.control.googlechart", GoogleChart);
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));
//# sourceMappingURL=charts.control.js.map
var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        var _ulocale = Phoenix.ulocale, _utils = Phoenix.utils, _locale = Phoenix.locale, _ajax = Phoenix.ajax, _dom = Phoenix.dom, _ui = ui, _build = Phoenix.build, _application = Phoenix.application, _render = Phoenix.render, _link = Phoenix.link, _defaultHeader = function () {
            var html = [];
            html.push('<nav class="navbar navbar-inverse navbar-fixed-top">');
            html.push('    <div class="container-fluid no-x-padding">');
            html.push('        <div class="bs-title bs-title-nav-pos header_title"></div>');
            html.push('        <ul class="nav navbar-nav no-x-margin no-y-margin bs-nav-button bs-left-nav header_left_buttons">');
            html.push('        </ul>');
            html.push('        <ul class="nav navbar-nav no-x-margin no-y-margin bs-nav-button bs-right-nav header_right_buttons">');
            html.push('        </ul>');
            html.push('    </div>');
            html.push('</nav>');
            return $(html.join(''));
        }, _expandPattern = function (item) {
            if (item.$pattern === 'logout') {
                item.icon = "lock";
                item.title = _locale.ui.Disconnect;
                item.link = { $logout: true };
                delete item.$pattern;
            }
            return item;
        }, _addButton = function (item, index) {
            var html = [];
            html.push('<li id="{1}">');
            if (item.$type === "logo") {
                html.push('<a tabindex="-1" class="hidden-xs bs-nav-logo ' + item.$className + '" href="#" data-phoenix-href="click://{0}"></a>');
            }
            else {
                var css = ["bs-icon-header"];
                if (item.iconStyle) {
                    _dom.parseStyle(item.iconStyle, css);
                }
                else {
                    css.push("bs-style-icon-lg");
                }
                if (item.title || item.expression) {
                    html.push('<a class="bs-nav-link"');
                    html.push('  href="#" data-phoenix-href="click://{0}"');
                    html.push('>');
                    html.push('<span class="' + css.join(' ') + ' {2}"></span>');
                    html.push('<span class="bs-icon-header-title"><span class="hidden-xs">{3}</span>');
                    if (item.menu)
                        html.push(' <span class="caret"></span>');
                    html.push('</span>');
                    html.push('</a>');
                    if (item.menu && item.menu.items) {
                        html.push('<ul class="dropdown-menu bs-right-menu">');
                        html.push('</ul>');
                    }
                }
                else {
                    html.push('<a class="bs-nav-link " href="#"  data-phoenix-href="click://{0}" ><span class="' + css.join(' ') + ' {2}"></span></a>');
                }
            }
            html.push('</li>');
            item.id = _utils.allocID();
            var ct = item.title;
            if (ct && typeof ct === 'object') {
                ct = ct[_ulocale.currentLang];
            }
            return $(_utils.format(html.join(''), index, item.id, _dom.iconClass(item.$icon), ct || item.expression || ''));
        }, _createMenuItems = function (item, ul) {
            var frag = document.createDocumentFragment();
            var p = $('<li><a href="#"></a><li>').get(0);
            item.menu.items.forEach(function (si, ii) {
                if (si.$pattern) {
                    item.menu.items[ii] = _expandPattern(si);
                    si = item.menu.items[ii];
                }
                var li = p.cloneNode(true);
                var a = li.firstChild;
                _dom.attr(a, 'data-phoenix-href', 'click://' + item.$index + '/' + ii);
                if (si.icon) {
                    var icon = document.createElement('span');
                    icon.className = _dom.iconClass(si.icon);
                    _dom.append(a, icon);
                }
                var ct = si.title;
                if (typeof si.title === 'object') {
                    ct = si.title[_ulocale.currentLang];
                }
                _dom.text(a, ' ' + (ct || 'Error: title not defined'));
                _dom.append(frag, li);
            });
            _dom.append(ul, frag);
        };
        var startSpace = 12;
        var Header = (function () {
            function Header(data, options) {
                this.init(data, options);
            }
            Header.prototype.init = function (data, options) {
                var that = this;
                that.title = "";
                that._ignoreClick = false;
                that.leftButtonsSpace = 0;
                that.rightButtonsSpace = 0;
                that.$element = null;
                that.$buttons = [];
                that.options = options || {};
                that.page = _ui.Page();
                that.title = _application.title || '';
                var config = _application.configuration;
                var headerCfg = config && config.header ? config.header : {};
                that.options.showOnDisconnected = headerCfg.alwaysShow;
                if (headerCfg.logo) {
                    var btn = {
                        $isHidden: false,
                        $type: "logo"
                    };
                    var logoClassName = '';
                    if (typeof headerCfg.logo === "string") {
                        logoClassName = headerCfg.logo;
                    }
                    else {
                        logoClassName = headerCfg.logo.style;
                        btn.link = headerCfg.logo.link;
                    }
                    btn.$className = logoClassName;
                    that.$buttons.push(btn);
                }
                if (headerCfg.buttons && headerCfg.buttons.before) {
                    headerCfg.buttons.before.forEach(function (button) {
                        that.$buttons.push({
                            $icon: button.icon,
                            right: button.right,
                            auth: button.auth,
                            link: button.link,
                            title: button.title
                        });
                    });
                }
                if (that.options.backButton) {
                    that.$buttons.push({
                        $icon: "chevron-left",
                        $isHidden: !that.page.props.$hasBack,
                        $type: "back",
                        link: {
                            $back: true
                        }
                    });
                }
                if (that.options.leftMenuButton) {
                    that.$buttons.push({
                        auth: headerCfg.authLeftMenu,
                        $isHidden: true,
                        $icon: "bars",
                        $type: "menuleft",
                        $parent: that.options.leftMenuPlace
                    });
                }
                if (that.options.disconnectButton) {
                    if (headerCfg.userMenu) {
                        that.$buttons.push({
                            $icon: "user",
                            iconStyle: "$icon-normal",
                            right: true,
                            auth: true,
                            menu: $.extend(true, {}, headerCfg.userMenu),
                            expression: headerCfg.userMenu.expression || "John Doe",
                            $type: "user"
                        });
                    }
                    else {
                        that.$buttons.push({
                            $icon: "power-off",
                            right: true,
                            auth: true,
                            $type: "disconnect",
                            link: {
                                $logout: true
                            }
                        });
                    }
                }
                if (!_build.release) {
                    that.$buttons.push({
                        $icon: "pencil",
                        right: true,
                        auth: true,
                        $type: "authoring",
                        link: {
                            $authoring: true
                        }
                    });
                }
                if (that.options.rightMenuButton) {
                    that.$buttons.push({
                        auth: true,
                        $isHidden: true,
                        $icon: "ellipsis-v",
                        $type: "menuright",
                        $parent: that.options.rightMenuPlace
                    });
                }
                if (that.options.topMenuButton) {
                    that.$buttons.push({
                        auth: true,
                        $isHidden: true,
                        $icon: "chevron-down",
                        $type: "menutop",
                        right: true,
                        $parent: that.options.topMenuPlace
                    });
                }
                if (headerCfg.buttons && headerCfg.buttons.after) {
                    headerCfg.buttons.after.forEach(function (button) {
                        that.$buttons.push({
                            $icon: button.icon,
                            right: button.right,
                            auth: button.auth,
                            link: button.link,
                            title: button.title
                        });
                    });
                }
                that.page.addChild('header', that);
                that.setData(data);
            };
            Header.prototype.setData = function (data) {
                data = data || {};
            };
            Header.prototype.buttonByType = function (value) {
                var that = this;
                for (var i = 0, len = that.$buttons.length; i < len; i++) {
                    var btn = that.$buttons[i];
                    if (btn.$type == value)
                        return btn;
                }
                return null;
            };
            Header.prototype._createButtons = function () {
                var that = this;
                if (!that.$element)
                    return;
                var e = that.$element.get(0);
                var l = _dom.query(e, '.header_left_buttons');
                var r = _dom.query(e, '.header_right_buttons');
                that.$buttons.forEach(function (button, index) {
                    button.$index = index;
                    var $btn = _addButton(button, index);
                    var p = button.right ? r : l;
                    for (var i = 0, len = $btn.length; i < len; i++)
                        _dom.append(p, $btn.get(i));
                });
            };
            Header.prototype._updateButtons = function () {
                var that = this;
                if (!that.$element)
                    return;
                var isConnected = that.page.props.$user && that.page.props.$user.connected;
                var lvdim = startSpace, rvdim = startSpace;
                var e = that.$element.get(0);
                that.$buttons.forEach(function (button) {
                    var btn = _dom.find(e, button.id);
                    if (button.$isHidden || (!isConnected && button.auth))
                        _dom.addClass(btn, "bs-none");
                    else {
                        if (button.$type === "user") {
                            var nt = _utils.execAngularExpression(button.expression, that.page.props.$user.credentials);
                            if (nt != button.title) {
                                button.title = nt;
                                var p = _dom.query(btn, '.bs-icon-header-title');
                                if (p)
                                    _dom.text(p.firstChild, nt);
                            }
                        }
                        _dom.removeClass(btn, "bs-none");
                        if (button.right) {
                            rvdim += _dom.offset(btn).width;
                        }
                        else {
                            lvdim += _dom.offset(btn).width;
                        }
                    }
                });
                if (that.leftButtonsSpace != lvdim || that.rightButtonsSpace != rvdim) {
                    that.leftButtonsSpace = lvdim;
                    that.rightButtonsSpace = rvdim;
                    that._updateTitleSpaceMargins();
                }
            };
            Header.prototype._updateTitleSpaceMargins = function () {
                var that = this;
                if (that.$element) {
                    var e = that.$element.get(0);
                    var tp = _dom.query(e, '.header_title');
                    tp.style.marginLeft = that.leftButtonsSpace + 'px';
                    tp.style.marginRight = that.rightButtonsSpace + 'px';
                }
            };
            Header.prototype.inPopup = function (target) {
                var that = this;
                if (that._ob) {
                    var b = _dom.find(that.$element.get(0), that._ob.id);
                    return _dom.isChildOf(b, target);
                }
                return false;
            };
            Header.prototype.hide = function (target) {
                var that = this;
                if (that._ob) {
                    var b = _dom.find(that.$element.get(0), that._ob.id);
                    Phoenix.dom.removeClass(b.lastChild, "bs-block");
                    that._ob = null;
                }
            };
            Header.prototype._openPopup = function (button) {
                var that = this;
                that.page.setPopup(that);
                that._ob = button;
                var b = _dom.find(that.$element.get(0), button.id);
                _dom.addClass(b.lastChild, "bs-block");
            };
            Header.prototype._executeLink = function (button, si) {
                var that = this;
                if (button.menu) {
                    var b = _dom.find(that.$element.get(0), button.id);
                    if (b && b.lastChild) {
                        if (!b.lastChild.childNodes.length)
                            _createMenuItems(button, b.lastChild);
                    }
                    if (si >= 0) {
                        var b_1 = button.menu.items[si];
                        if (b_1.link) {
                            _link.execLink(b_1.link, _link.context(), null);
                        }
                        that.page.setPopup(null);
                    }
                    else {
                        if (that._ob) {
                            if (that._ob === button) {
                                that.page.setPopup(null);
                                return;
                            }
                            that.page.setPopup(null);
                        }
                        if (b && b.lastChild) {
                            var ul = b.lastChild;
                            ul.style.minWidth = Math.max(_dom.offset(b).width, 160) + 'px';
                        }
                        return that._openPopup(button);
                    }
                }
                if (button.link) {
                    return _link.execLink(button.link, _link.context(), null);
                }
                if (["menuleft", "menuright", "menutop", "menubottom"].indexOf(button.$type) >= 0) {
                    if (button.$parent && that.page) {
                        var c = that.page.childByType("menu-" + button.$type.substring(4));
                        if (c)
                            c.show($(_dom.find(null, button.$parent)));
                    }
                }
            };
            Header.prototype._onresize = function () {
                var that = this;
                if (that.$element) {
                    that._updateButtons();
                }
            };
            Header.prototype._setEvents = function () {
                var that = this;
                var e = that.$element.get(0);
                that.$element.on('mousedown', function (event) {
                    var c = _link.isCustomLink(e, event, true);
                    if (c && c.protocol == "click") {
                        var cs = c.value.substring(('click://').length).split('/');
                        var di = cs.length > 1 ? parseInt(cs[1], 10) : -1;
                        var btn = that.$buttons[parseInt(cs[0], 10)];
                        if (btn) {
                            if (["menuleft", "menuright", "menutop", "menubottom"].indexOf(btn.$type) >= 0) {
                                if (btn.$parent && that.page) {
                                    var child = that.page.childByType("menu-" + btn.$type.substring(4));
                                    if (that.page.popup === child)
                                        that._ignoreClick = true;
                                }
                            }
                        }
                    }
                });
                that.$element.on('click', function (event) {
                    var c = _link.isCustomLink(e, event);
                    if (that._ignoreClick) {
                        that._ignoreClick = false;
                        return;
                    }
                    if (c && c.protocol === "click") {
                        var cs = c.value.substring(('click://').length).split('/');
                        var di = cs.length > 1 ? parseInt(cs[1], 10) : -1;
                        var btn = that.$buttons[parseInt(cs[0], 10)];
                        that._executeLink(btn, di);
                        if (btn && btn.$type === 'logo') {
                            var el = (document.activeElement);
                            if (el)
                                el.blur();
                        }
                    }
                });
                $(window).on('resize.header', function () {
                    clearTimeout(that._doResize);
                    that._doResize = setTimeout(that._onresize.bind(that), 100);
                });
            };
            Header.prototype.onPageChange = function (propName, value) {
                var that = this, btn;
                switch (propName) {
                    case "$title":
                        that.title = value || _application.title || '';
                        that._renderTitle();
                        break;
                    case "$hasBack":
                        if (that.options.backButton) {
                            btn = that.buttonByType("back");
                            if (btn) {
                                if (btn.$isHidden != !value) {
                                    btn.$isHidden = !value;
                                    that._updateButtons();
                                }
                            }
                        }
                        break;
                    case "$user":
                        that._auth();
                        that._updateButtons();
                        break;
                    case "$menuleft":
                        if (that.options.leftMenuButton) {
                            btn = that.buttonByType("menuleft");
                            if (btn && btn.$isHidden == value) {
                                btn.$isHidden = !value;
                                that._updateButtons();
                            }
                        }
                        break;
                    case "$menutop":
                        if (that.options.topMenuButton) {
                            btn = that.buttonByType("menutop");
                            if (btn && btn.$isHidden == value) {
                                btn.$isHidden = !value;
                                that._updateButtons();
                            }
                        }
                        break;
                }
            };
            Header.prototype._removeEvents = function () {
                var that = this;
                that.$element.off('mousedown');
                that.$element.off('click');
                $(window).off("resize.header");
            };
            Header.prototype.renderButtons = function () {
                var that = this;
                that._createButtons();
                that._updateButtons();
                _utils.nextTick(function () {
                });
            };
            Header.prototype._renderTitle = function () {
                var that = this;
                if (that.$element) {
                    var e = that.$element.get(0);
                    var tp = _dom.query(e, '.header_title');
                    _dom.text(tp, that.title || '');
                }
            };
            Header.prototype._auth = function () {
                var that = this;
                if (that.$parent) {
                    var p = that.$parent.get(0);
                    var e = that.$element.get(0);
                    var isConnected = that.page.props.$user && that.page.props.$user.connected;
                    if (isConnected) {
                        _dom.addClass(p, 'bs-body');
                        _dom.removeClass(e, 'bs-none');
                    }
                    else {
                        if (that.options.showOnDisconnected) {
                            _dom.addClass(p, 'bs-body');
                            _dom.removeClass(e, 'bs-none');
                        }
                        else {
                            _dom.removeClass(p, 'bs-body');
                            _dom.addClass(e, 'bs-none');
                        }
                    }
                }
            };
            Header.prototype.render = function ($parent) {
                var that = this;
                if ($parent && !this.$element) {
                    this.$element = _defaultHeader();
                    var config = _application.configuration;
                    var headerCfg = config && config.header ? config.header : {};
                    var e = that.$element.get(0);
                    var tp = _dom.query(e, '.header_title');
                    if (headerCfg.uppercase) {
                        _dom.addClass(tp, 'bs-transform-uppercase');
                    }
                    if (headerCfg.align) {
                        _dom.addClass(tp, 'align-' + headerCfg.align);
                    }
                    that._renderTitle();
                    that.renderButtons();
                    var p = $parent.get(0);
                    if (that.options.replaceParent)
                        p = p.parentNode;
                    that.$parent = $(p);
                    that._auth();
                    if (that.options.replaceParent)
                        $parent.replaceWith(that.$element);
                    else
                        $parent.append(that.$element);
                    that._setEvents();
                    _utils.nextTick(function () {
                        that._onresize();
                    });
                }
            };
            Header.prototype.destroy = function () {
                var that = this;
                _utils.log("Header Destroy", "destroy");
                this.$parent = null;
                if (that.$element) {
                    that._removeEvents();
                    this.$element = null;
                }
                if (that.page) {
                    that.page.removeChild(that);
                    that.page = null;
                }
            };
            return Header;
        }());
        ui.Header = Header;
        ;
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));
//# sourceMappingURL=header.js.map
var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        var _utils = Phoenix.utils, _dom = Phoenix.dom, _locale = Phoenix.locale, _mem = Phoenix.$mem, _link = Phoenix.link, _ui = ui, _customData = Phoenix.customData, _render = Phoenix.render;
        var template = [
            '<div>',
            '   <div class="bs-lv-search bs-none">',
            '        <div>',
            '           <div class="input-group input-group-lg">',
            '               <input type="text" class="form-control bs-lv-search-input" placeholder="{0}">',
            '               <span class="input-group-btn">',
            '                   <button class="bs-button btn btn-default bs-lv-search-btn" type="button"><span class="' + _dom.iconClass('search') + '"></span></button>',
            '               </span>',
            '           </div>',
            '        </div>',
            '   </div>',
            '   {1}',
            '   <center><nav class="bs-lv-pagination">',
            '   </nav></center>',
            '   <center><div class="bs-lv-nodata bs-none">' + _locale.listView.search.Nodata + '</div></center>',
            '</div>'
        ], defaultBody = '<div class="bs-lv-content list-group"></div>', itemTemplate = '<a draggable="false" href="#" class="list-group-item"></a>', itemTemplateBasic = '<div></div>', itemTemplateNoLink = '<div class="list-group-item"></div>';
        var _createRoot = function (searchLib, bodyTemplate) {
            searchLib = searchLib || _locale.listView.search.Search;
            return $(_utils.format(template.join(''), searchLib, bodyTemplate));
        }, _selectItem = function (e, oldIndex, newIndex) {
            if (oldIndex == newIndex)
                return;
            if (oldIndex < 0 && newIndex < 0)
                return;
            var p = _dom.query(e, '.bs-lv-content');
            var len = p.childNodes.length;
            if (oldIndex >= 0 && oldIndex < len)
                _dom.removeClass(p.childNodes[oldIndex], 'active');
            if (newIndex >= 0 && newIndex < len)
                _dom.addClass(p.childNodes[newIndex], 'active');
        }, _createItems = function (e, items, options, itemtype, links, locale) {
            var contentRender = options.customRender ? _customData.get(options.customRender) : null;
            if (!contentRender)
                contentRender = _render.get(options.context, "widget.listview.item");
            var p = _dom.query(e, '.bs-lv-content'), i = options.empty ? null : (options.basic ? $(itemTemplateBasic).get(0) : (options.noLink ? $(itemTemplateNoLink).get(0) : $(itemTemplate).get(0))), len = items ? items.length : 0, frag = document.createDocumentFragment();
            if (i && options.noBorders) {
                _dom.addClass(i, 'no-border');
            }
            if (i && options.inline) {
                _dom.addClass(i, 'no-radius');
                _dom.addClass(i, 'no-y-border');
            }
            var map = {
                $item: null,
                $url: _link.search(null, false),
                $mem: _mem
            };
            for (var j = 0; j < len; j++) {
                var ci = items[j];
                if (i) {
                    var c = i.cloneNode(true);
                    if (links && links.default && !options.basic && !options.noLink && !options.select) {
                        map.$item = ci;
                        c["href"] = _link.hashLink(links.default, map, null);
                    }
                    if (contentRender) {
                        var html = [];
                        contentRender(html, itemtype, options, j, ci, locale);
                        c.appendChild($(html.join('')).get(0));
                    }
                    frag.appendChild(c);
                }
                else {
                    if (contentRender) {
                        var html = [];
                        contentRender(html, itemtype, options, j, ci, locale);
                        var $c = $(html.join(''));
                        for (var ii = 0, ll = $c.length; ii < ll; ii++)
                            frag.appendChild($c.get(ii));
                    }
                }
            }
            $(p).empty();
            p.appendChild(frag);
            return e;
        }, _checkOData = function (data) {
            data.documents = data.documents || [];
            data.count = data.count;
            data.dataCount = data.documents.length;
            data.skip = data.skip || 0;
            data.pageSize = data.pageSize || data.documents.length || 20;
            return data;
        }, _checkOptions = function (options, data) {
            options.search = data.search || false;
            options.inline = data.inline || false;
            options.pagerSize = data.pagerSize || 'lg';
            if (data.select)
                options.select = true;
            if (data.link)
                options.link = data.link;
            options.basic = data.basic || false;
            options.empty = data.empty || false;
            options.noLink = data.noLink || false;
            options.pagination = data.pagination || false;
            options.customRender = data.customRender || '';
            options.customRootRender = data.customRootRender || '';
            return options;
        };
        var ListView = (function () {
            function ListView(ldata, options, module) {
                var that = this;
                var cdata = ldata;
                cdata.data = cdata.data || {};
                options = options || {};
                options.dataset = options.dataset || ldata.data.dataset || "items";
                options.dataType = options.dataType || "odata";
                that.options = _checkOptions(options, ldata.data);
                that['_checkData' + options.dataType](cdata.data, options);
                that.data = cdata.data;
                that.selectedIndex = -2;
                that.props = {};
                that._defineProps();
                that.module = module;
                that.module.onDSChanged = that._afterDatasetChanged.bind(that);
                that.pager = new _ui.Pager({
                    size: that.options.pagerSize,
                    selectPage: that._onselectPage.bind(that)
                });
            }
            ListView.prototype._defineProps = function () {
                var self = this;
                Object.defineProperty(self.props, 'items', {
                    get: function () {
                        return self.data.ds[self.options.dataset].documents;
                    },
                    set: function (value) {
                        self.data.ds[self.options.dataset].documents = value;
                        self._notifyChange('items');
                    },
                    enumerable: true
                });
            };
            ListView.prototype._afterDatasetChanged = function (datasets) {
                var that = this;
                if (datasets.indexOf(that.options.dataset) >= 0) {
                    if (that.options.beforeRemove)
                        that.options.beforeRemove();
                    if (that.options.select) {
                        var ds = that.module.datasets[that.options.dataset];
                        if (ds)
                            that.selectedIndex = ds.selectedIndex;
                    }
                    that._renderItems(true);
                    if (that.$element && that.options.select)
                        _selectItem(that.$element.get(0), -1, that.selectedIndex);
                    that._updateNavigation();
                }
            };
            ListView.prototype._extractContextodata = function () {
                var that = this;
                var data = that.data.ds[that.options.dataset] || {};
                var ctx = {};
                if (data.dataCount)
                    ctx.$dataCount = data.dataCount;
                if (data.count)
                    ctx.$count = data.count;
                if (data.skip)
                    ctx.$skip = data.skip;
                if (data.pageSize)
                    ctx.$top = data.pageSize;
                if (data.searchText)
                    ctx.$searchText = data.searchText;
                return ctx;
            };
            ListView.prototype._navigationState = function () {
                var that = this;
                var res = {
                    currentPage: -1,
                    totalPages: 0
                };
                if (!that.options.pagination)
                    return res;
                if (that.options.dataType == 'odata') {
                    var ctx = that._extractContextodata();
                    ctx.$skip = ctx.$skip || 0;
                    ctx.$count = ctx.$count || 0;
                    ctx.$dataCount = ctx.$dataCount || 0;
                    ctx.$top = ctx.$top || 0;
                    res.totalPages = ctx.$top < 1 ? 1 : Math.ceil(ctx.$count / ctx.$top);
                    res.currentPage = ctx.$top < 1 ? 1 : (Math.ceil(ctx.$skip / ctx.$top) + 1);
                }
                return res;
            };
            ListView.prototype._notifyChange = function (propertyName) { };
            ListView.prototype._checkDataodata = function (data, options) {
                data.ds = data.ds || {};
                data.ds[options.dataset] = data.ds[options.dataset] || {};
                _checkOData(data.ds[options.dataset]);
            };
            ListView.prototype._removeEvents = function () {
                var that = this;
                that.$element.off('click keyup');
            };
            ListView.prototype._doSearch = function () {
                var that = this;
                if (!that.module || !that.$element || !that.options.search)
                    return;
                var e = that.$element.get(0), ii = _dom.query(e, '.bs-lv-search-input');
                if (!ii)
                    return;
                var ctx = that['_extractContext' + that.options.dataType]();
                if (ctx.$searchText != ii.value) {
                    ctx.$skip = 0;
                    ctx.$searchText = ii.value;
                    var nodata = _dom.query(e, '.bs-lv-nodata');
                    if (nodata)
                        _dom.addClass(nodata, "bs-none");
                    that.module.execDataSet(that.options.dataset, ctx, function (isSuccess) {
                        if (isSuccess && nodata && that.props.items && that.props.items.length == 0)
                            _dom.removeClass(nodata, "bs-none");
                    }, null, true);
                }
            };
            ListView.prototype._setEvents = function () {
                var that = this;
                if (that.$element) {
                    that.$element.on('click', function (event) {
                        var target = event.target;
                        var e = this;
                        var p = _dom.query(e, '.bs-lv-content');
                        var s = _dom.query(e, '.bs-lv-search-btn');
                        var l = _link.isCustomLink(e, event);
                        if (l)
                            return _link.execCustomProtocol(l, that.module.ds_context(), {
                                links: that.module.links
                            }, null);
                        while (target != e) {
                            if (target["href"]) {
                                var href = _dom.attr(target, 'href');
                                if (href === '#') {
                                    event.preventDefault();
                                    event.stopPropagation();
                                }
                            }
                            if (target == s) {
                                that._doSearch();
                                break;
                            }
                            if (target.parentNode == p) {
                                var ii = _dom.attr(target, "data-index");
                                if (ii === undefined)
                                    ii = Array.prototype.indexOf.call(p.children, target);
                                if (that.options.select)
                                    that._selectItem(ii);
                                else if (that.options.clickItem)
                                    that._clickItem(event.target, target, ii);
                                break;
                            }
                            target = target.parentNode;
                        }
                    }).on('keyup', function (event) {
                        if (event.keyCode == 13) {
                            that._doSearch();
                        }
                    });
                }
            };
            ListView.prototype._renderItems = function (refresh) {
                var that = this;
                if (!that.$element)
                    return;
                var locale = that.data.ds.view ? that.data.ds.view.$view : null;
                var items = that.data.ds[that.options.dataset].documents;
                if (that.options.beforeRenderItems)
                    that.options.beforeRenderItems(items);
                _createItems(that.$element.get(0), items, that.options, that.data.$type, that.module.links, locale);
                if (that.options.afterRenderItems)
                    that.options.afterRenderItems(items, _dom.query(that.$element.get(0), '.bs-lv-content'));
                if (that.options.beforeAdd)
                    that.options.beforeAdd(that.$element, refresh);
            };
            ListView.prototype._clickItem = function (target, parent, index) {
                var that = this;
                if (that.props.items && (index >= 0) && (index < that.props.items.length)) {
                    if (that.options.clickItem) {
                        that.options.clickItem(target, parent, that.props.items[index], index);
                    }
                }
                that.props.items[that.selectedIndex];
            };
            ListView.prototype._selectItem = function (index) {
                var that = this;
                if (that.selectedIndex != index) {
                    if (that.$element) {
                        _selectItem(that.$element.get(0), that.selectedIndex, index);
                    }
                    that.selectedIndex = index;
                    if (that.module && that.options.dataset) {
                        var ds = that.module.datasets[that.options.dataset];
                        if (ds)
                            ds.selectedIndex = index;
                        that.module.ds_select(that.options.dataset, that.selectedIndex >= 0 ? that.props.items[that.selectedIndex] : null);
                    }
                }
            };
            ListView.prototype._onselectPage = function (page) {
                var that = this;
                switch (page) {
                    case "next":
                        that.next();
                        break;
                    case "prev":
                        that.previous();
                        break;
                    case "first":
                        that.moveToPage(1);
                        break;
                    case "last":
                        that.moveToPage(that.pager.props.totalPages);
                        break;
                    default:
                        that.moveToPage(page);
                        break;
                }
            };
            ListView.prototype.moveToPage = function (page) {
                var that = this;
                var ctx = that['_extractContext' + that.options.dataType]();
                ctx.$skip = (page - 1) * (ctx.$top || 0);
                that.module.execDataSet(that.options.dataset, ctx, null, null, true);
            };
            ListView.prototype.next = function () {
                var that = this;
                var ctx = that['_extractContext' + that.options.dataType]();
                ctx.$skip = (ctx.$skip || 0) + (ctx.$top || 0);
                that.module.execDataSet(that.options.dataset, ctx, null, null, true);
            };
            ListView.prototype.previous = function () {
                var that = this;
                var ctx = that['_extractContext' + that.options.dataType]();
                ctx.$skip = Math.max(0, (ctx.$skip || 0) - (ctx.$top || 0));
                that.module.execDataSet(that.options.dataset, ctx, null, null, true);
            };
            ListView.prototype._updateNavigation = function () {
                var that = this;
                var navState = that._navigationState();
                that.pager.props.totalPages = navState.totalPages;
                that.pager.props.currentPage = navState.currentPage;
            };
            ListView.prototype.render = function ($parent) {
                var that = this;
                if (!that.$element) {
                    var rootRender = that.options.customRootRender ? _customData.get(that.options.customRootRender) : null;
                    that.$element = _createRoot(false, rootRender ? rootRender() : defaultBody);
                    var e = that.$element.get(0);
                    if (that.options.search) {
                        var s = _dom.query(e, '.bs-lv-search');
                        if (s)
                            _dom.removeClass(s, 'bs-none');
                    }
                    var navParent = _dom.query(e, '.bs-lv-pagination');
                    that.pager.render($(navParent));
                    that._setEvents();
                    that.contentRender = _render.get(this.options.context, "widget.content.control.listview." + that.data.$type);
                    if (that.options.select) {
                        var ds = that.module.datasets[that.options.dataset];
                        if (ds)
                            that.selectedIndex = ds.selectedIndex;
                    }
                    that._renderItems(false);
                    if (that.$element && that.options.select)
                        _selectItem(that.$element.get(0), -1, that.selectedIndex);
                    that._updateNavigation();
                }
                if ($parent) {
                    if (that.options.replaceParent)
                        $parent.replaceWith(that.$element);
                    else
                        $parent.append(that.$element);
                }
                return that.$element;
            };
            ListView.prototype.destroy = function () {
                var that = this;
                if (that.pager) {
                    that.pager.destroy();
                    that.pager = null;
                }
                if (that.module) {
                    that.module.onDSChanged = null;
                    that.module = null;
                }
                if (that.contentRender) {
                    that.contentRender.destroy();
                    that.contentRender = null;
                }
                if (that.$element)
                    that._removeEvents();
                that.$element = null;
            };
            return ListView;
        }());
        ui.ListView = ListView;
        ;
        _render.register("javascript", "widget.content.control.listview", ListView);
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));
//# sourceMappingURL=listview.js.map
var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        var Map = (function () {
            function Map(options, callback) {
                var that = this;
                that.options = options || {};
                that.callback = callback || null;
                that.map = null;
                that.markerList = [];
            }
            Map.prototype.newMap = function () {
                return new Map();
            };
            Map.prototype.getLatLng = function (address, callBack) { };
            Map.prototype.initMap = function (parent, options) { };
            Map.prototype.setMapCenter = function (map, lat, lng, options) { };
            Map.prototype.addMarker = function (map, marker, lat, lng, options) { };
            Map.prototype.removeMarker = function (marker) { };
            Map.prototype.addMarkerByAddress = function (adresses) { };
            return Map;
        }());
        ui.Map = Map;
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));
//# sourceMappingURL=basemap-controller.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        var _ui = ui, _bootstrap4 = Phoenix.bootstrap4, google = window["google"];
        var GoogleMaps = (function (_super) {
            __extends(GoogleMaps, _super);
            function GoogleMaps(options, callback) {
                _super.call(this, options, callback);
            }
            GoogleMaps.prototype.getLatLng = function (adresses, callBack) {
                var that = this;
                var geocoder = new google.maps.Geocoder();
                if (!geocoder)
                    return;
                if (!Array.isArray(adresses))
                    adresses = [adresses];
                var num = 0;
                localise(adresses[0], after);
                function after(cordonnee) {
                    if (cordonnee)
                        callBack(cordonnee);
                    else if (num == adresses.length - 1)
                        callBack(null);
                    else {
                        num++;
                        localise(adresses[num], after);
                    }
                }
                function localise(adresse, after) {
                    geocoder.geocode({ address: adresse }, function (results, status) {
                        if (status === google.maps.GeocoderStatus.OK)
                            return after({ latitude: results[0].geometry.location.lat(), longitude: results[0].geometry.location.lng(), libelle: adresse });
                        after(null);
                    });
                }
            };
            GoogleMaps.prototype.initMap = function (parent, options) {
                var that = this;
                if (!parent)
                    return;
                options = options || {};
                options = {
                    zoom: options.zoom || 16,
                    mapTypeId: options.type || google.maps.MapTypeId.TERRAIN,
                    scrollwheel: false
                };
                return that.map = new google.maps.Map(parent, options);
            };
            GoogleMaps.prototype.setMapCenter = function (map, lat, lng, options) {
                if (!map)
                    return;
                var latLng = new google.maps.LatLng(lat, lng);
                map.setCenter(latLng);
            };
            GoogleMaps.prototype.addMarker = function (map, lat, lng, options) {
                var that = this;
                if (!map)
                    return;
                options = options || {};
                var latlng = new google.maps.LatLng(lat, lng);
                var marker = new google.maps.Marker({
                    position: latlng,
                    map: map,
                    title: options.message || null
                });
                if (options.message) {
                    var infowindow = new google.maps.InfoWindow({
                        content: options.message,
                        size: new google.maps.Size(100, 100)
                    });
                    google.maps.event.addListener(marker, "click", function () {
                        infowindow.open(map, marker);
                    });
                }
                if (that.markerList[0])
                    that.markerList[0] = marker;
                else
                    that.markerList.push(marker);
                return marker;
            };
            GoogleMaps.prototype.removeMarker = function (marker) {
                if (marker)
                    marker.setMap(null);
            };
            GoogleMaps.prototype.addMarkerByAddress = function (address) {
                var that = this;
                that.getLatLng(address, function (latLng) {
                    if (!latLng)
                        return that.callback && that.callback(null);
                    if (that.map) {
                        if (that.markerList[0])
                            that.removeMarker(that.markerList[0]);
                        that.setMapCenter(that.map, latLng.latitude, latLng.longitude);
                        that.addMarker(that.map, latLng.latitude, latLng.longitude, { message: "<b>Adresse :</b><br />" + latLng.libelle });
                    }
                    that.callback && that.callback(latLng);
                });
            };
            return GoogleMaps;
        }(ui.Map));
        ui.GoogleMaps = GoogleMaps;
        ui.googleMaps = function (options, callback) {
            google = window["google"];
            return new GoogleMaps(options, callback);
        };
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));
//# sourceMappingURL=googlemap-controller.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        var _ui = ui, _bootstrap4 = Phoenix.bootstrap4, google = window["google"], L = window["L"];
        var OpenStreetMap = (function (_super) {
            __extends(OpenStreetMap, _super);
            function OpenStreetMap(options, callback) {
                _super.call(this, options, callback);
            }
            OpenStreetMap.prototype.getLatLng = function (adresses, callBack) {
                var that = this;
                var geocoder = new google.maps.Geocoder();
                if (!geocoder)
                    return;
                if (!Array.isArray(adresses))
                    adresses = [adresses];
                var num = 0;
                localise(adresses[0], after);
                function after(cordonnee) {
                    if (cordonnee)
                        callBack(cordonnee);
                    else if (num == adresses.length - 1)
                        callBack(null);
                    else {
                        num++;
                        localise(adresses[num], after);
                    }
                }
                function localise(adresse, after) {
                    geocoder.geocode({ address: adresse }, function (results, status) {
                        if (status === google.maps.GeocoderStatus.OK)
                            return after({ latitude: results[0].geometry.location.lat(), longitude: results[0].geometry.location.lng(), libelle: adresse });
                        after(null);
                    });
                }
            };
            OpenStreetMap.prototype.initMap = function (parent, options) {
                var that = this;
                if (!parent)
                    return;
                options = options || {};
                var map = L.map(parent, {
                    center: [0, 0],
                    zoom: options.zoom || 16
                });
                L.tileLayer(options.tile || 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
                    maxZoom: options.maxZoom || 18,
                    attribution: options.attribution || '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
                    id: options.id || 'mapbox.streets'
                }).addTo(map);
                return that.map = map;
            };
            OpenStreetMap.prototype.setMapCenter = function (map, lat, lng, options) {
                if (!map)
                    return;
                var latLng = L.latLng(lat, lng);
                map.setView(latLng);
            };
            OpenStreetMap.prototype.addMarker = function (map, lat, lng, options) {
                var that = this;
                if (!map)
                    return;
                options = options || {};
                var marker = L.marker([lat, lng]).addTo(map);
                if (options.message)
                    marker.bindPopup(options.message);
                if (that.markerList[0])
                    that.markerList[0] = marker;
                else
                    that.markerList.push(marker);
                return marker;
            };
            OpenStreetMap.prototype.removeMarker = function (marker) {
                var that = this;
                if (marker && that.map) {
                    marker.closePopup();
                    that.map.removeLayer(marker);
                }
            };
            OpenStreetMap.prototype.addMarkerByAddress = function (adresses) {
                var that = this;
                that.getLatLng(adresses, function (latLng) {
                    if (!latLng)
                        return that.callback && that.callback(null);
                    if (that.map) {
                        if (that.markerList[0])
                            that.removeMarker(that.markerList[0]);
                        that.setMapCenter(that.map, latLng.latitude, latLng.longitude);
                        that.addMarker(that.map, latLng.latitude, latLng.longitude, { message: "<b>Adresse :</b><br />" + latLng.libelle });
                    }
                    that.callback && that.callback(latLng);
                });
            };
            return OpenStreetMap;
        }(ui.Map));
        ui.OpenStreetMap = OpenStreetMap;
        ui.openStreetMap = function (options, callback) {
            google = window["google"];
            L = window["L"];
            return new OpenStreetMap(options, callback);
        };
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));
//# sourceMappingURL=openstreetmap-controller.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        var _link = Phoenix.link, _ui = ui, _dom = Phoenix.dom;
        var menutop = {
            render: {
                image: function (item) {
                    return ['<div class="bs-menutop-menu-image">',
                        '<a data-phoenix-href="click://' + item.$index + '/default" href="#">',
                        '<div><i class="glyphicon glyphicon-' + item.$links.default.$icon + '" style="font-size:40px;"></i></div>',
                        '<div>' + item.$title + '</div>',
                        '</a>',
                        '</div>'
                    ];
                }
            }
        };
        var Menutop = (function (_super) {
            __extends(Menutop, _super);
            function Menutop(ldata, options) {
                _super.call(this, ldata, options);
                this._render = {
                    renderContent: function () {
                        return $('<div class="bs-top-menu-wrapper"></div>');
                    },
                    renderItems: function () {
                        var that = this;
                        var frag = document.createDocumentFragment(), $element = $('<div class="bs-menutop-menus" ></div>'), ci = $('<div class="bs-menutop-menu"><center></center><div class="bs-menutop-item-selected"></div></div>').get(0);
                        if (that.items) {
                            that.items.forEach(function (item, index) {
                                var ii = ci.cloneNode(true);
                                var tmp = _dom.query(ii, 'center');
                                item.$index = index;
                                if (menutop.render[item.$type])
                                    tmp.appendChild($((menutop.render[item.$type](item)).join('')).get(0));
                                else
                                    tmp.appendChild($('<div class="bs-menutop-menu-not">Invalid menu definition.</div>').get(0));
                                _dom.addClass(ii, "bs-menutop-item-" + index);
                                frag.appendChild(ii);
                            });
                        }
                        $element.get(0).appendChild(frag);
                        that.$element = $('<div style="padding-right:15px;"></div>');
                        var menus = $('<div style="overflow-x:auto; width: 100%;"></div>').get(0);
                        menus.appendChild($element.get(0));
                        that.$element.get(0).appendChild(menus);
                        that.$element.get(0).appendChild($('<div class="bs-menutop-direction"><i class="glyphicon glyphicon-chevron-right"></i></div>').get(0));
                        that._onPageChanged();
                        return that.$element;
                    },
                    copyMenuItemData: function (dst, src) {
                        dst.$links = src.$links;
                        dst.$type = src.$type;
                    },
                    _executeLink: function (item, link) {
                        var olink = item.$links[link];
                        _link.execLink(olink, _link.context(), null);
                    },
                    _onPageChanged: function () {
                        var that = this;
                        if (!that.$element)
                            return;
                        var e = that.$element.get(0);
                        if (that.items) {
                            var prev = _dom.query(e, ".bs-menutop-item-selected-bg");
                            if (prev)
                                _dom.removeClass(prev, "bs-menutop-item-selected-bg");
                            that.items.forEach(function (item, index) {
                                var page = _link.pageName(item.$links.default);
                                if (page == that.page.currentPage()) {
                                    var next = _dom.query(e, '.bs-menutop-item-' + item.$index);
                                    if (next) {
                                        var ii = _dom.query(next, '.bs-menutop-item-selected');
                                        if (ii)
                                            _dom.addClass(ii, "bs-menutop-item-selected-bg");
                                    }
                                    return;
                                }
                            });
                        }
                    },
                    _menuShowed: function () {
                        var that = this;
                        if (!that.$element)
                            return;
                        var e = that.$element.get(0);
                        if (that.items) {
                            that.items.forEach(function (item, index) {
                                var page = _link.pageName(item.$links.default.$page);
                                if (page == that.page.currentPage()) {
                                    var next = _dom.query(e, '.bs-menutop-item-' + item.$index);
                                    if (next)
                                        next.scrollIntoView(true);
                                    return;
                                }
                            });
                        }
                    }
                };
            }
            Menutop.prototype._initOptions = function (options) {
                options = options || {};
                options.autoClose = false;
                options.replaceParent = true;
            };
            return Menutop;
        }(ui.MenuBase));
        ui.Menutop = Menutop;
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));
//# sourceMappingURL=menu-top.js.map
var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        var _wu = Phoenix.WidgetUtils, _utils = Phoenix.utils;
        var ModuleTitle = (function () {
            function ModuleTitle(options, data) {
                var that = this;
                that._options = options || {};
                that._options.id = that._options.id || _utils.allocID();
                that._data = data || {};
            }
            ModuleTitle.prototype.render = function ($parent) {
                var that = this;
                if (!that.$element) {
                    var html = [];
                    _wu.widgetTitle(html, that._options.id, that._data, null, true);
                    that.$element = $(html.join(''));
                }
                if ($parent) {
                    if (that._options.replaceParent)
                        $parent.replaceWith(that.$element);
                    else
                        $parent.append(that.$element);
                }
            };
            ModuleTitle.prototype.destroy = function () {
                var that = this;
                that.$element = null;
                that._options = null;
                that._data = null;
            };
            return ModuleTitle;
        }());
        ui.ModuleTitle = ModuleTitle;
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));
//# sourceMappingURL=module-title.js.map
var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        var _ulocale = Phoenix.ulocale, _utils = Phoenix.utils, _ajax = Phoenix.ajax, _dom = Phoenix.dom, _link = Phoenix.link, _render = Phoenix.render, _html = '<div id="{0}" class="" style="width:{1};height:{2}"></div>';
        var PlanningChart = (function () {
            function PlanningChart(data) {
                var that = this;
                ui.constructXRangeType(Highcharts);
                that._id = _utils.allocID();
                that.data = data;
            }
            Object.defineProperty(PlanningChart.prototype, "data", {
                get: function () {
                    return this._data;
                },
                set: function (value) {
                    var that = this;
                    this._data = value;
                    that._constructConfig();
                    if (that._chart)
                        that._internalReflow(true);
                },
                enumerable: true,
                configurable: true
            });
            PlanningChart.prototype._onResize = function () {
                var that = this;
                that._internalReflow(false);
            };
            PlanningChart.prototype.destroy = function () {
                var that = this;
                if (that.$element) {
                    that.$element.off('click');
                    that.$element = null;
                }
                that._config = null;
                if (that._chart) {
                    that._chart.destroy();
                    that._chart = null;
                    $('#' + that._id).remove();
                    that._id = null;
                }
                if (that._resizeHnd) {
                    $(window).off("phoenix-resize", that._resizeHnd);
                    that._resizeHnd = null;
                }
            };
            PlanningChart.prototype.drawLegend = function (display) {
                var that = this;
                that._chart.series.forEach(function (serie) {
                    var opt = serie.options;
                    opt.dataLabels.enabled = display;
                    serie.update(opt);
                });
            };
            PlanningChart.prototype._internalReflow = function (reconstruct) {
                var that = this;
                if (reconstruct)
                    that.renderChart();
                else
                    that._chart.reflow();
                that._renderLabels();
            };
            PlanningChart.prototype.render = function ($parent) {
                var that = this;
                if (!that._resizeHnd) {
                    that._resizeHnd = function () {
                        that._onResize();
                    };
                    $(window).on("phoenix-resize", that._resizeHnd);
                }
                if (!that.$element) {
                    that.$element = $(_utils.format('<div id="{0}" class=""></div>', that._id));
                    that.$element.on('click', function (event) {
                        var el = event.target;
                        var nv = _dom.text(el);
                        if (nv) {
                            var linkValue = that._getLinkByTitle(nv);
                            if (linkValue && typeof linkValue === 'object') {
                                if (that.cbDelegateExecuteLink)
                                    that.cbDelegateExecuteLink(linkValue);
                                else
                                    _link.execLink(linkValue, {}, null);
                            }
                        }
                    });
                    $parent.append(that.$element);
                }
                that.renderChart();
            };
            PlanningChart.prototype.renderChart = function () {
                var that = this;
                var height = PlanningChart.HEIGHT_FIX_PLANNING
                    + that._data.boxes.length * (that._data.rows.length * PlanningChart.HEIGHT_FIX_ROW + PlanningChart.HEIGHT_FIX_BOX);
                that.$element.css("height", height + "px");
                Highcharts.setParams(PlanningChart.HEIGHT_FIX_BOX, PlanningChart.HEIGHT_FIX_ROW, that._data.rows.length);
                Highcharts.setOptions({
                    lang: {
                        months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
                        shortMonths: ['Jan', 'Fév', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc']
                    }
                });
                that._chart = new Highcharts.Chart(that._config);
                that._renderLabels();
            };
            PlanningChart.prototype._renderLabels = function () {
                var that = this;
                if (that._absoluteLabels) {
                    that._absoluteLabels.forEach(function (label) {
                        label.remove();
                    });
                }
                that._absoluteLabels = [];
                for (var i in that._chart.yAxis[0].ticks) {
                    var tick = that._chart.yAxis[0].ticks[i];
                    if (tick.label) {
                        var posYLabel = tick.label.xy.y + 90;
                        var label = that._config.yAxis.categories[parseInt(i)];
                        tick.label.hide();
                        var $myLabel = $('<div style="position: absolute; top: ' + posYLabel + 'px; left:15px; cursor: pointer;z-index: 0;">' + label + '</div>');
                        var $myLabel2 = $('<div style="position: absolute; top: ' + posYLabel + 'px; left:15px; cursor: pointer;z-index:2;background-color:transparent;color:transparent;">' + label + '</div>');
                        that._absoluteLabels.push($myLabel);
                        that._absoluteLabels.push($myLabel2);
                    }
                }
                that._absoluteLabels.forEach(function (label) {
                    that.$element.append(label);
                });
                var container = that.$element.get(0).firstElementChild;
                container.style.zIndex = 1;
            };
            PlanningChart.prototype._getRowName = function (idRow) {
                var that = this;
                var title = "";
                that._data.rows.forEach(function (row) {
                    if (row.id == idRow)
                        title = row.title;
                });
                return title;
            };
            PlanningChart.prototype._getLinkByTitle = function (title) {
                var that = this;
                var link = "";
                that._data.boxes.forEach(function (box) {
                    if (box.link && box.title == title)
                        link = box.link;
                });
                return link;
            };
            Object.defineProperty(PlanningChart.prototype, "emptyConf", {
                get: function () {
                    var that = this;
                    that._emptyConf =
                        {
                            chart: {
                                ignoreHiddenSeries: false,
                                backgroundColor: null
                            },
                            title: { text: null },
                            legend: {
                                enabled: false
                            },
                            xAxis: {
                                type: 'datetime',
                                dateTimeLabelFormats: {
                                    month: '%b %y'
                                },
                                plotLines: [{
                                        color: PlanningChart.PLOT_LINE_COLOR,
                                        width: 3,
                                        value: new Date(),
                                        zIndex: 4
                                    }],
                                opposite: true,
                                minRange: 1000
                            },
                            yAxis: {
                                title: '',
                                categories: [],
                                labels: {
                                    align: "left",
                                    x: 0,
                                    y: 0,
                                    formatter: function () {
                                        return this.value;
                                    }
                                },
                                showFirstLabel: true,
                                min: 0,
                                max: 0,
                                tickPosition: 'outside'
                            },
                            tooltip: {
                                formatter: function () {
                                    var dateFormat = '%d/%m/%Y';
                                    var tip = '<b>' + this.point.title + '</b>';
                                    if (this.point.x)
                                        tip += '<br/><b>' + Highcharts.dateFormat(dateFormat, new Date(this.point.x));
                                    if (this.point.x2 && this.point.x != this.point.x2)
                                        tip += ' - ' + Highcharts.dateFormat(dateFormat, new Date(this.point.x2));
                                    if (this.point.x)
                                        tip += '</b>';
                                    return tip;
                                },
                                hideDelay: 100,
                                backgroundColor: "white",
                                followPointer: false
                            },
                            plotOptions: {
                                xrange: {
                                    dataLabels: {
                                        enabled: false,
                                        formatter: function () {
                                            return this.point.legend;
                                        },
                                        style: {
                                            fontWeight: "normal",
                                            textShadow: "0 0 1px contrast, 0 0 1px contrast"
                                        }
                                    },
                                    states: {
                                        hover: {
                                            enabled: false
                                        }
                                    }
                                }
                            },
                            scrollbar: {
                                enabled: false
                            },
                            credits: {
                                enabled: false
                            },
                            series: [{
                                    data: [],
                                    visible: false
                                }]
                        };
                    return that._emptyConf;
                },
                enumerable: true,
                configurable: true
            });
            PlanningChart.getMillisHour = function () { return 3600 * 1000; };
            PlanningChart.getMillisDay = function () { return PlanningChart.getMillisHour() * 24; };
            PlanningChart.getMillisMonth = function () { return PlanningChart.getMillisDay() * 30; };
            PlanningChart.getMillisYear = function () { return PlanningChart.getMillisMonth() * 12; };
            PlanningChart.addMillis = function (date, millis) {
                return new Date(date.getTime() + millis);
            };
            PlanningChart.getInterval = function (period) {
                if (period <= PlanningChart.getMillisYear() * 3)
                    return PlanningChart.getMillisMonth();
                else
                    return PlanningChart.getMillisYear();
            };
            PlanningChart.addDays = function (date, days) {
                var dat = new Date(date.valueOf());
                dat.setDate(dat.getDate() + days);
                return dat;
            };
            PlanningChart.prototype.zoom = function (days) {
                var that = this;
                var period;
                period = PlanningChart.getMillisDay() * days;
                var now = new Date();
                var dMin = PlanningChart.addDays(new Date(that._chart.xAxis[0].dataMin), -PlanningChart.ADD_DAYS_SECURE);
                var dMax = PlanningChart.addDays(new Date(that._chart.xAxis[0].dataMax), PlanningChart.ADD_DAYS_SECURE);
                var dataPeriod = dMax.valueOf() - dMin.valueOf();
                var width = 100;
                if (days > 0)
                    width = (dataPeriod / period) * 100;
                if (width < 100)
                    width = 100;
                that.$element.css("width", width + "%");
                var followPointer = true;
                if (days <= 0)
                    followPointer = false;
                that._config.tooltip.followPointer = followPointer;
                var interval = period < 0 ? dataPeriod : period;
                that._chart.xAxis[0].options.tickInterval = PlanningChart.getInterval(interval);
                that._chart.xAxis[0].setExtremes(Date.UTC(dMin.getUTCFullYear(), dMin.getUTCMonth(), dMin.getUTCDay()), Date.UTC(dMax.getUTCFullYear(), dMax.getUTCMonth(), dMax.getUTCDay()));
                that._internalReflow(true);
                var scroll = 0;
                var widthPx = parseInt(that.$element.css("width").replace("px", ""));
                var periodMinDay = now.valueOf() - dMin.valueOf();
                if (periodMinDay > 0) {
                    scroll = (periodMinDay / dataPeriod) * widthPx;
                    var centerScroll = ((period / 2) / dataPeriod) * widthPx;
                    scroll -= centerScroll;
                }
                that.$element.parent().parent().scrollLeft(scroll);
            };
            PlanningChart.prototype._constructConfig = function () {
                var that = this;
                that._config = that.emptyConf;
                that._data.boxes.forEach(function (box) {
                    that._config.yAxis.categories.push(box.title);
                });
                that._config.yAxis.max = that._data.boxes.length - 1;
                that._config.yAxis.labels.y = -(that._data.rows.length * PlanningChart.HEIGHT_FIX_ROW + PlanningChart.HEIGHT_FIX_BOX / 2 - PlanningChart.BOX_TITLE_PX) / 2;
                that._config.yAxis.labels.formatter = function () {
                    var link = that._getLinkByTitle(this.value);
                    var style = "font-size:" + PlanningChart.BOX_TITLE_PX + "px;font-weight:bold;cursor:pointer;";
                    if (typeof link === "string") {
                        return '<p><a href="' + link + '" style="' + style + '">' + this.value + '</a></p>';
                    }
                    else {
                        return '<p style="' + style + '">' + this.value + '</p>';
                    }
                };
                if (!that._config.chart)
                    that._config.chart = { renderTo: that._id };
                else
                    that._config.chart.renderTo = that._id;
                var series = {};
                that._data.boxes.forEach(function (box, idBox) {
                    box.rows.forEach(function (row, rindex) {
                        row.segments.sort(function (a, b) {
                            if (a.dtStart > b.dtStart)
                                return 1;
                            else
                                return -1;
                        });
                        row.segments.forEach(function (segment, rindex) {
                            var offsetXBug = Math.random();
                            var height = segment.height ? segment.height : "default";
                            var color = segment.color;
                            var borderColor = segment.borderColor ? segment.borderColor : PlanningChart.BORDER_COLOR;
                            if (segment.style == "point")
                                borderColor = "black";
                            if (!series[segment.style])
                                series[segment.style] = {};
                            if (!series[segment.style][height])
                                series[segment.style][height] = {};
                            if (!series[segment.style][height][row.id])
                                series[segment.style][height][row.id] = [];
                            if (segment.color2) {
                                color = {
                                    linearGradient: PlanningChart.LINEAR_GRADIENT,
                                    stops: [
                                        [0, segment.color],
                                        [1, segment.color2]
                                    ]
                                };
                            }
                            series[segment.style][height][row.id].push({
                                "title": segment.title,
                                "legend": segment.legend || segment.title,
                                "x": _ulocale.parseISODateAsUTC(segment.dtStart) + offsetXBug,
                                "x2": _ulocale.parseISODateAsUTC((segment.dtEnd ? segment.dtEnd : segment.dtStart)) + offsetXBug,
                                "y": that._data.boxes.length - (idBox + 1),
                                "color": color,
                                "borderColor": borderColor
                            });
                        });
                    });
                });
                for (var serieStyle in series) {
                    for (var height in series[serieStyle]) {
                        for (var z in series[serieStyle][height]) {
                            var borderRadius = 0, pointWidth = height == "small" ? PlanningChart.SERIE_STYLE_SMALL_HEIGHT : PlanningChart.SERIE_STYLE_HEIGHT, borderWidth = PlanningChart.BORDER_WIDTH, zIndex = PlanningChart.Z_INDEX_DEFAULT;
                            if (serieStyle == "default")
                                borderRadius = PlanningChart.BORDER_RADIUS_DEFAULT;
                            if (serieStyle == "point") {
                                borderWidth = 3;
                                borderRadius = PlanningChart.BORDER_RADIUS_DEFAULT;
                                pointWidth = PlanningChart.SERIE_STYLE_SMALL_HEIGHT;
                                zIndex = PlanningChart.Z_INDEX_POINT;
                            }
                            else if (serieStyle == "line")
                                zIndex = PlanningChart.Z_INDEX_LINE;
                            that._config.series.push({
                                "type": 'xrange',
                                "dataType": serieStyle,
                                "stacking": true,
                                "name": that._getRowName(z),
                                "z": z,
                                "data": series[serieStyle][height][z],
                                "borderWidth": borderWidth,
                                "borderRadius": borderRadius,
                                "pointWidth": pointWidth,
                                "zIndex": zIndex
                            });
                        }
                    }
                }
            };
            PlanningChart.HEIGHT_FIX_PLANNING = 100;
            PlanningChart.HEIGHT_FIX_BOX = 30;
            PlanningChart.HEIGHT_FIX_ROW = 30;
            PlanningChart.Z_INDEX_POINT = 30;
            PlanningChart.Z_INDEX_LINE = 20;
            PlanningChart.Z_INDEX_DEFAULT = 10;
            PlanningChart.LINEAR_GRADIENT = {
                x1: 0,
                y1: 0,
                x2: 1.2,
                y2: 0
            };
            PlanningChart.BORDER_COLOR = "white";
            PlanningChart.BORDER_WIDTH = 1;
            PlanningChart.BOX_TITLE_PX = 12;
            PlanningChart.SERIE_STYLE_HEIGHT = 25;
            PlanningChart.SERIE_STYLE_SMALL_HEIGHT = 10;
            PlanningChart.BORDER_RADIUS_DEFAULT = 10;
            PlanningChart.PLOT_LINE_COLOR = "#5E6165";
            PlanningChart.ADD_DAYS_SECURE = 30;
            return PlanningChart;
        }());
        ui.PlanningChart = PlanningChart;
        _render.register("javascript", "widget.content.control.planningchart", PlanningChart);
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));
//# sourceMappingURL=charts.control.js.map
var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        function constructXRangeType(H) {
            if (H.seriesTypes.xrange)
                return;
            var deltaY = 4;
            var HEIGHT_FIX_BOX, HEIGHT_FIX_ROW, NB_ROWS, yBox = -1;
            function groupSeries(points) {
                var res = {};
                points.forEach(function (point) {
                    var key = point.y + '';
                    var ss = res[key] = res[key] || [];
                    point.offsetY = 0;
                    if (point.style != "point" && point.style != "line") {
                        var prec = ss.length ? ss[ss.length - 1] : null;
                        if (prec && prec.x2 > point.x) {
                            point.offsetY = 2;
                        }
                    }
                    ss.push(point);
                });
                return res;
            }
            var defaultPlotOptions = H.getOptions().plotOptions, columnType = H.seriesTypes.column, each = H.each;
            defaultPlotOptions.xrange = H.merge(defaultPlotOptions.column, {});
            H.seriesTypes.xrange = H.extendClass(columnType, {
                type: 'xrange',
                parallelArrays: ['x', 'x2', 'y'],
                requireSorting: false,
                animate: H.seriesTypes.line.prototype.animate,
                getColumnMetrics: function () {
                    var metrics, chart = this.chart;
                    function swapAxes() {
                        each(chart.series, function (s) {
                            var xAxis = s.xAxis;
                            s.xAxis = s.yAxis;
                            s.yAxis = xAxis;
                        });
                    }
                    swapAxes();
                    this.yAxis.closestPointRange = 1;
                    metrics = columnType.prototype.getColumnMetrics.call(this);
                    swapAxes();
                    return metrics;
                },
                translate: function () {
                    columnType.prototype.translate.apply(this, arguments);
                    var series = this, xAxis = series.xAxis, metrics = series.columnMetrics;
                    var byY = groupSeries(series.points);
                    Object.keys(byY).forEach(function (cy) {
                        var cs = byY[cy];
                        var co = 0;
                        H.each(cs, function (point) {
                            var barWidth = xAxis.translate(H.pick(point.x2, point.x + (point.len || 0))) - point.plotX;
                            co = co + point.offsetY;
                            var yBox = point.plotY - (HEIGHT_FIX_BOX / 2 + ((NB_ROWS / 2) * HEIGHT_FIX_ROW)) + HEIGHT_FIX_ROW / 2;
                            point.shapeArgs = {
                                x: point.plotX,
                                y: yBox + parseInt(point.series.options.z + '') * HEIGHT_FIX_ROW + 3 * HEIGHT_FIX_BOX / 4 + metrics.offset + co,
                                width: Math.max(barWidth, metrics.width),
                                height: metrics.width
                            };
                            point.tooltipPos[0] += barWidth / 2;
                            point.tooltipPos[1] -= (metrics.width / 2 - parseInt(point.series.options.z + '') * HEIGHT_FIX_ROW);
                        });
                    });
                }
            });
            H.wrap(H.Axis.prototype, 'getSeriesExtremes', function (proceed) {
                var axis = this, dataMax = Number.MIN_VALUE;
                proceed.call(this);
                if (this.isXAxis) {
                    each(this.series, function (serie) {
                        if (serie.stackKey != "xrange")
                            return;
                        each(serie.x2Data || [], function (val, index) {
                            if (val > dataMax)
                                dataMax = val;
                        });
                    });
                    if (dataMax > Number.MIN_VALUE)
                        axis.dataMax = dataMax;
                }
            });
            H.setParams = function (heightFixBox, heightFixRow, nbRows) {
                HEIGHT_FIX_BOX = heightFixBox;
                HEIGHT_FIX_ROW = heightFixRow;
                NB_ROWS = nbRows;
            };
        }
        ui.constructXRangeType = constructXRangeType;
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));
//# sourceMappingURL=xrange-type.js.map
var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        var _utils = Phoenix.utils, _render = Phoenix.render;
        var Content = (function () {
            function Content(ldata, options) {
                this.data = ldata || {};
                this.options = options || {};
            }
            Content.prototype.render = function ($parent) {
                var that = this;
                if (!that.$element) {
                    that.$element = $('<div></div>');
                }
                if ($parent) {
                    if (that.options.beforeAdd)
                        that.options.beforeAdd(that.$element);
                    if (that.options.replaceParent)
                        $parent.replaceWith(that.$element);
                    else
                        $parent.append(that.$element);
                }
                return that.$element;
            };
            Content.prototype.destroy = function () {
                var that = this;
                that.$element = null;
            };
            return Content;
        }());
        _render.register("javascript", "widget.content.control.test", Content);
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));
//# sourceMappingURL=test.js.map