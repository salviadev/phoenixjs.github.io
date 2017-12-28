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
    var ui;
    (function (ui) {
        var _utils = Phoenix.utils, _dom = Phoenix.dom, _locale = Phoenix.locale, _mem = Phoenix.$mem, _link = Phoenix.link, _ui = ui, _customData = Phoenix.customData, _render = Phoenix.render;
        var FormContainer = (function () {
            function FormContainer(options, layout, schema, formData, module) {
                var that = this;
                options = options || {};
                that.formData = formData || { $create: true };
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
            function FormContainerController(options, formName, metaName, controllerName, parentModule) {
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
                _this = _super.call(this, options, formName, metaName, d, parentModule) || this;
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
    var ui;
    (function (ui) {
        var _ui = ui;
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
            Map.prototype.addMarkerByLongLat = function (long, lat, libelle) {
                var that = this;
                if (!long || !lat)
                    return that.callback && that.callback(null);
                if (that.map) {
                    if (that.markerList[0])
                        that.removeMarker(that.markerList[0]);
                    that.setMapCenter(that.map, lat, long);
                    var message = "<b>Adresse :</b><br />" + (libelle || "longitude : " + long + ", latitude : " + lat);
                    that.addMarker(that.map, lat, long, { message: message });
                }
                that.callback && that.callback({ longitude: long, latitude: lat, libelle: libelle });
            };
            return Map;
        }());
        var google = window["google"];
        var GoogleMaps = (function (_super) {
            __extends(GoogleMaps, _super);
            function GoogleMaps(options, callback) {
                return _super.call(this, options, callback) || this;
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
        }(Map));
        var googleMaps = function (options, callback) {
            google = window["google"];
            return new GoogleMaps(options, callback);
        };
        var L = window["L"];
        var OpenStreetMap = (function (_super) {
            __extends(OpenStreetMap, _super);
            function OpenStreetMap(options, callback) {
                return _super.call(this, options, callback) || this;
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
                L.tileLayer(options.tile || 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
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
        }(Map));
        var openStreetMap = function (options, callback) {
            google = window["google"];
            L = window["L"];
            return new OpenStreetMap(options, callback);
        };
        ui.createMapService = function (options, callback) {
            options = options || {};
            var type = options.type || "omap";
            delete options.type;
            var map = null;
            switch (type) {
                case "gmap":
                    map = googleMaps(options, callback);
                    break;
                default:
                    map = openStreetMap(options, callback);
                    break;
            }
            return map;
        };
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));

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
