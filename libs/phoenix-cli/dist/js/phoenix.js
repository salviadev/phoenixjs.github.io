var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../../typings/index.d.ts" />
var Phoenix;
(function (Phoenix) {
    Phoenix.bootstrap4 = false;
    var external;
    (function (external) {
        external.hashHandler = null;
        external.logoutHandler = null;
        external.forbiddenHandler = null;
        external.changePasswordHandler = null;
        external.checkLoggedInHandler = null;
        external.historyChangedHandler = null;
    })(external = Phoenix.external || (Phoenix.external = {}));
    var history;
    (function (history) {
        var _value = [], _removeLast = function () {
            _value.pop();
            if (external.historyChangedHandler)
                external.historyChangedHandler();
        }, _add = function (hash, reset) {
            if (reset) {
                _value = [hash];
                if (external.historyChangedHandler)
                    external.historyChangedHandler();
                return;
            }
            var len = _value.length;
            var last = len ? _value[len - 1] : "";
            if (last != hash) {
                var prev = (len >= 2) ? _value[len - 2] : "";
                if (hash == prev)
                    _value.pop();
                else
                    _value.push(hash);
                if (external.historyChangedHandler)
                    external.historyChangedHandler();
            }
        }, _hasBack = function () {
            return _value.length > 1;
        }, _replaceHash;
        /* replaceHash */
        if ('replaceState' in window.history) {
            _replaceHash = function (newhash) {
                if (('' + newhash).charAt(0) !== '#')
                    newhash = '#' + newhash;
                if (window.location.hash != newhash) {
                    _removeLast();
                    window.history.replaceState('', '', newhash);
                }
            };
        }
        else {
            var hash = window.location.hash;
            _replaceHash = function (newhash) {
                if (('' + newhash).charAt(0) !== '#')
                    newhash = '#' + newhash;
                if (location.hash !== newhash) {
                    _removeLast();
                    if (location.hash !== hash)
                        window.history.back();
                    window.location.hash = newhash;
                }
            };
        }
        history.removeLast = _removeLast;
        history.add = _add;
        history.hasBack = _hasBack;
        history.value = _value;
        history.replaceHash = _replaceHash;
    })(history = Phoenix.history || (Phoenix.history = {}));
    var customData;
    (function (customData) {
        var _userData = {}, _registerData = function (namespace, value) {
            var a = namespace.split(".");
            var cp = _userData;
            for (var i = 0, len = a.length - 1; i < len; i++) {
                var p = a[i];
                cp[p] = cp[p] || {};
                cp = cp[p];
            }
            cp[a[a.length - 1]] = value;
        }, _getRegisteredData = function (namespace) {
            var a = namespace.split(".");
            var cp = _userData, cd = null;
            for (var i = 0, len = a.length; i < len; i++) {
                cd = cp[a[i]];
                if (!cd)
                    return cd;
                cp = cd;
            }
            return cd;
        };
        customData.register = _registerData;
        customData.get = _getRegisteredData;
    })(customData = Phoenix.customData || (Phoenix.customData = {}));
    var render;
    (function (render) {
        var _renders = {}, _registerRender = function (context, name, handler) {
            _renders[context] = _renders[context] || {};
            _renders[context][name] = handler;
        }, _getRender = function (context, name) {
            if (!_renders[context])
                return null;
            return _renders[context][name];
        };
        render.register = _registerRender;
        render.get = _getRender;
    })(render = Phoenix.render || (Phoenix.render = {}));
    var utils;
    (function (utils) {
        var _getPromise = function () {
            return window['Promise'] || (window['ES6Promise'] ? window['ES6Promise'].Promise : null);
        }, _p8 = function (s) {
            var p = (Math.random().toString(16) + "000000000").substr(2, 8);
            return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
        }, _uuid = function () {
            return _p8(false) + _p8(true) + _p8(true) + _p8(false);
        }, _allocID = function () {
            return "I" + _p8(false) + _p8(false) + _p8(false) + _p8(false);
        }, _format = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            return args[0].replace(/{(\d+)}/g, function (match, num) {
                num = parseInt(num, 10);
                return args[num + 1];
            });
        }, _formatByName = function (value, params) {
            return value.replace(/{(.*)}/g, function (match, val) {
                return params[val] || '';
            });
        }, _merge = function (src, dst) {
            for (var p in src) {
                dst[p] = src[p];
            }
        }, _logModules = {
            scope: false,
            destroy: false,
            menu: false,
            proxydata: false
        }, _copy = function (src) {
            var res = {};
            for (var p in src)
                res[p] = src[p];
            return res;
        }, _equals = function (src, dst) {
            if (!src && dst || !dst && src)
                return false;
            if (src === dst)
                return true;
            if (!src && !dst)
                return false;
            if (Array.isArray(src)) {
                if (src.length != dst.length) {
                    return false;
                }
                for (var j = 0, ll = src.length; j < ll; j++) {
                    if (!_equals(src[j], dst[j]))
                        return false;
                }
            }
            else if (typeof src === 'object') {
                if (typeof src !== typeof dst)
                    return false;
                var srcp = Object.keys(src);
                var dstp = Object.keys(dst);
                if (srcp.length !== dstp.length)
                    return false;
                for (var i = 0, len = srcp.length; i < len; i++) {
                    if (!_equals(src[srcp[i]], dst[srcp[i]]))
                        return false;
                }
                return true;
            }
            return false;
        }, _logModule = function (moduleName, value) {
            if (value !== undefined)
                _logModules[moduleName] = value;
            return _logModules[moduleName];
        }, _log = function (value, moduleName) {
            if (!_logModules)
                return;
            if (_logModules[moduleName])
                console.log(value);
        }, entityMap = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': '&quot;',
            "'": '&#39;',
            "/": '&#x2F;'
        }, _escapeHtml = function (value) {
            return (value || '').replace(/[&<>"'\/]/g, function (s) {
                return entityMap[s];
            });
        }, _getPath = function () {
            var scripts = document.getElementsByTagName('script');
            for (var i = scripts.length - 1; i >= 0; --i) {
                var s = scripts[i].src.split('?')[0];
                var a = s.split('/'), l = a.length, li = a[l - 1].toLowerCase();
                if (li == "phoenix.js" || li == "phoenix.min.js" || (li == 'core.js' && a[l - 2] == 'core')) {
                    var j = l - 1;
                    if (li == 'core.js')
                        j--;
                    return a.slice(0, j).join('/');
                }
            }
            throw "Invalid script Name";
        }, _extractData = function (path, value) {
            if (path.indexOf(".") >= 0) {
                var c = value;
                path.split(".").forEach(function (pn) {
                    if (c)
                        c = c[pn];
                });
                return (c || '') + '';
            }
            else
                return value[path] === undefined ? path : value[path];
            ;
        }, _hasexp = function (expression) {
            return (expression || '').indexOf('{{') >= 0;
        }, _parseexp = function (expression, context) {
            return expression.replace(/{{([^{]*)}}/g, function (match, p) {
                return _extractData(p, context);
            });
        }, _extractAngularValues = function (expression, map) {
            return expression.replace(/{{([^{]*)}}/g, function (match, p) {
                map.push({ name: p });
                return '';
            });
        }, _execFilter = function (filter, value) {
            switch (filter) {
                case 'uppercase':
                    return value.toUpperCase();
                case 'lowercase':
                    return value.toLowerCase();
                case 'firstChar':
                    return value && value.length ? value[0] : '';
            }
            return value;
        }, _execAngularExpression = function (expression, context) {
            return expression.replace(/{{([^{]*)}}/g, function (match, p) {
                var ss = p.split('|');
                var prop = (ss[0] || '').trim();
                var val = _extractData(prop, context);
                for (var i = 1, ll = ss.length; i < ll; i++) {
                    val = _execFilter((ss[i] || '').trim(), val);
                }
                return val;
            });
        }, _dp = function (propertyName, target) {
            var obj = target || this;
            Object.defineProperty(obj.props, propertyName, {
                get: function () {
                    return obj.data[propertyName];
                },
                set: function (value) {
                    if (value != obj.data[propertyName]) {
                        obj.data[propertyName] = value;
                        obj._notifyChange(propertyName);
                    }
                },
                enumerable: true
            });
        }, _applyMixins = function (derivedCtor, baseCtors) {
            baseCtors.forEach(function (baseCtor) {
                Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
                    derivedCtor.prototype[name] = baseCtor.prototype[name];
                });
            });
        }, _focusDelay = function () {
            return function (fn) {
                setTimeout(function () {
                    fn();
                }, 200);
            };
        }, _getNextTick = function () {
            var nextTickFn;
            if (window.setImmediate) {
                nextTickFn = function nextTickSetImmediate(fn) {
                    setImmediate(function () {
                        fn();
                    });
                };
            }
            else {
                nextTickFn = function nextTickSetTimeout(fn) {
                    setTimeout(function () {
                        fn();
                    }, 0);
                };
            }
            return nextTickFn;
        }, _extend = function (dst, opts) {
            dst = dst || {};
            if (Object && Object["assign"]) {
                return Object["assign"](dst, opts);
            }
            else {
                Object.keys(opts).forEach(function (pn) {
                    dst[pn] = opts[pn];
                });
            }
            return dst;
        }, _getDataAsPromise = function (ldata) {
            var nt = _getNextTick();
            var _promise = _getPromise();
            return new _promise(function (resolve, reject) {
                nt(function () {
                    resolve(ldata);
                });
            });
        };
        utils.Promise = _getPromise();
        utils.allocUuid = _uuid;
        utils.allocID = _allocID;
        utils.format = _format;
        utils.merge = _merge;
        utils.formatNames = _formatByName;
        utils.extend = _extend;
        utils.logModule = _logModule;
        utils.log = _log;
        utils.equals = _equals;
        utils.copy = _copy;
        utils.escapeHtml = _escapeHtml;
        utils.phoenixPath = _getPath;
        utils.parseExpression = _parseexp;
        utils.hasExpression = _hasexp;
        utils.parseVariable = _extractData;
        utils.defineProperty = _dp;
        utils.applyMixins = _applyMixins;
        utils.nextTick = _getNextTick();
        utils.focusDelay = _focusDelay();
        utils.dataAsPromise = _getDataAsPromise;
        utils.extractAngularVars = _extractAngularValues;
        utils.execAngularExpression = _execAngularExpression;
        utils.confirm = function (title, message, success) {
            if (window.confirm(message))
                success();
        };
        utils.alert = function (title, message, success) {
            window.alert(message);
        };
        utils.prompt = function (title, defaultValue, success) {
            var value = window.prompt(title, defaultValue);
            success(value);
        };
    })(utils = Phoenix.utils || (Phoenix.utils = {}));
    Phoenix.build = { version: "0.1.0.0", release: false };
    var authentication;
    (function (authentication) {
        var _memdbStorage = {}, _memorydb = {
            setItem: function (name, value) {
                _memdbStorage[name] = value;
            },
            getItem: function (name) {
                return _memdbStorage[name];
            }
        }, _afterLogout = [], _db = function () {
            var db = null;
            try {
                db = (Phoenix.build.release ? window.sessionStorage : window.localStorage);
            }
            catch (ex) {
                db = null;
            }
            if (!db)
                db = _memorydb;
            return db;
        }, _save = function (credentials, onlyCredentials) {
            if (!onlyCredentials)
                credentials.basic = "Basic " + window.btoa((credentials.login || '') + ':' + (credentials.password || ''));
            _db().setItem("authentication", JSON.stringify(credentials));
        }, _load = function () {
            try {
                return JSON.parse(_db().getItem("authentication"));
            }
            catch (ex) {
                return null;
            }
        }, _registerAfterLogout = function (hnd) {
            _afterLogout.push(hnd);
        }, _clear = function () {
            _db().setItem("authentication", 'null');
            _afterLogout.forEach(function (hnd) {
                hnd();
            });
        };
        authentication.db = _db;
        authentication.save = _save;
        authentication.load = _load;
        authentication.clear = _clear;
        authentication.registerAfterLogout = _registerAfterLogout;
    })(authentication = Phoenix.authentication || (Phoenix.authentication = {}));
    ;
    var drag;
    (function (drag) {
        var _dragData, _setDragData = function (data) {
            _dragData = data;
        }, _getDragData = function () {
            return _dragData;
        };
        drag.setData = _setDragData;
        drag.getData = _getDragData;
    })(drag = Phoenix.drag || (Phoenix.drag = {}));
    var ipc;
    (function (ipc) {
        var _eventListeners = {}, _emitEvent = function (eventName, data) {
            var evname = 'on' + eventName;
            var l = _eventListeners[evname];
            if (l)
                l.forEach(function (item) {
                    var hnd = item.listener ? item.handler.bind(item.listener) : item.handler;
                    hnd(data);
                });
        }, _regListener = function (eventName, handler, listener) {
            _eventListeners[eventName] = _eventListeners[eventName] || [];
            var l = _eventListeners[eventName];
            l.push({
                listener: listener,
                handler: handler
            });
        }, _unregListener = function (listener, eventName) {
            function _rmvlistener(res) {
                if (res) {
                    var i = res.length;
                    while (i--) {
                        var o = res[i];
                        if (o.listener == listener)
                            res.splice(i, 1);
                    }
                }
            }
            if (eventName) {
                _rmvlistener(_eventListeners[eventName]);
            }
            else {
                Object.keys(_eventListeners).forEach(function (evn) {
                    _rmvlistener(_eventListeners[evn]);
                });
            }
        };
        ipc.emit = _emitEvent;
        ipc.listen = _regListener;
        ipc.unlisten = _unregListener;
    })(ipc = Phoenix.ipc || (Phoenix.ipc = {}));
    Phoenix.locale = {};
    var ulocale;
    (function (ulocale) {
        var _afterTranslate = [], _register = function (hnd) { _afterTranslate.push(hnd); }, _translate = function (ll, lang) {
            $.extend(true, Phoenix.locale, ll);
            _afterTranslate.forEach(function (hnd) { hnd(lang); });
        }, _tt = function (v, context) {
            context = context || {};
            if (v && v.substring(0, 2) == '{{') {
                return v.replace(/{{(.*)}}/g, function (match, path) {
                    var segments = path.split('.');
                    var c = context;
                    for (var i = 0, len = segments.length; i < len; i++) {
                        if (!c)
                            break;
                        c = c[segments[i]];
                    }
                    if (c === undefined)
                        return '[' + path + ']';
                    else
                        return c;
                });
            }
            return v;
        };
        ulocale.register = _register;
        ulocale.translate = _translate;
        ulocale.tt = _tt;
    })(ulocale = Phoenix.ulocale || (Phoenix.ulocale = {}));
    var application;
    (function (application) {
        var _cfgdata = {}, _setconfig = function (config, value) {
            _cfgdata[config] = value;
            return value;
        }, _getconfig = function (config) {
            return _cfgdata[config];
        };
        application.core = "phoenix";
        application.name = "";
        application.support = "";
        application.homeName = "home";
        application.title = "";
        application.licences = {};
        application.configuration = null;
        function config(appName, cfg) {
            appName = appName || application.name;
            if (cfg == undefined)
                return _getconfig("application_" + appName);
            else
                return _setconfig("application_" + appName, cfg);
        }
        application.config = config;
        ;
        function init(appName, appTitle, config) {
            application.name = appName;
            application.title = appTitle;
            if (config && config.homes && config.homes[appName])
                application.homeName = config.homes[appName];
            application.configuration = config;
            if (angular) {
                var am = config ? config.angularModules || [] : [];
                if (!Array.isArray(am) && (typeof am === 'object'))
                    am = am[appName] || [];
                application.angularApplication = angular.module(appName, am);
            }
        }
        application.init = init;
        ;
        function portailName() {
            return application.configuration && application.configuration.portailName ? application.configuration.portailName : 'portail';
        }
        application.portailName = portailName;
        function isPortail() {
            return application.name === portailName();
        }
        application.isPortail = isPortail;
    })(application = Phoenix.application || (Phoenix.application = {}));
    Phoenix.device = {
        phone: false,
        tablet: false,
        deviceType: ""
    };
    var _load$Mem = function () {
        try {
            if (window.sessionStorage) {
                return JSON.parse(window.sessionStorage.getItem("$mem")) || {};
            }
        }
        catch (ex) {
            return {};
        }
    };
    var _save$Mem = function (value) {
        value = value || {};
        try {
            if (window.sessionStorage) {
                window.sessionStorage.setItem("$mem", JSON.stringify(value));
            }
        }
        catch (ex) {
        }
    };
    Phoenix.$mem = _load$Mem();
    function save$mem() {
        _save$Mem(Phoenix.$mem);
    }
    Phoenix.save$mem = save$mem;
    var dom;
    (function (dom) {
        var _mapIcon = {
            "times-circle": "remove-sign",
            "times-circle-o": "remove-circle",
            "times": "remove",
            "chevron-left": "chevron-left",
            "chevron-right": "chevron-right",
            "backward": "backward",
            "forward": "forward",
            "file-o": 'file',
            'floppy': 'floppy-save',
            "power-off": "off",
            "user": "user",
            "pencil": "pencil",
            "trash": "trash",
            "check-square-o": "check",
            "square-o": "unchecked",
            "plus-circle": "plus-sign",
            "search": "search",
            "chevron-down": "menu-down",
            "ellipsis-v": "option-vertical",
            "bars": "menu-hamburger",
            "plus": "plus",
            "thumb-tack": "pushpin",
            "calendar": "calendar",
            "exclamation-circle": "exclamation-sign",
            "cloud": "cloud",
            "caret-up": "triangle-top",
            "caret-down": "triangle-bottom",
            "cog": "cog",
            "lock": "lock",
            "question-circle": "question-sign",
            "info-circle": "info-sign"
        };
        var _parseStyle = function (style, css) {
            if (style) {
                var a = style.split(" ");
                a.forEach(function (e, index) {
                    e = e.trim();
                    if (e && (e.charAt(0) === "$"))
                        e = 'bs-style-' + e.substring(1);
                    css.push(e);
                });
            }
        }, _select = function (input) {
            if (!input)
                return;
            input.select();
        }, _addRmvClasses = function (v, add, cn) {
            var c = (v || '').split(' ');
            var i = c.indexOf(cn);
            if (add) {
                if (i < 0)
                    c.push(cn);
            }
            else {
                if (i >= 0)
                    c.splice(i, 1);
            }
            return c.join(' ');
        }, _iconClass = function (iconName, noPrefix) {
            if (noPrefix === void 0) { noPrefix = false; }
            var icon = _mapIcon[iconName] ? _mapIcon[iconName] : iconName;
            if (noPrefix)
                return (Phoenix.bootstrap4 ? "fa-" : "glyphicon-") + icon;
            else
                return (Phoenix.bootstrap4 ? "fa fa-" : "glyphicon glyphicon-") + icon;
        }, _iconPrefix = function () { return (Phoenix.bootstrap4 ? "fa" : "glyphicon"); }, _createIcon = function (iconName) {
            var icon = document.createElement("span");
            icon.className = _iconClass(iconName, false);
            return icon;
        }, _queryAll = function (parent, selector) {
            if (parent)
                return parent.querySelectorAll(selector);
            return document.querySelectorAll(selector);
        }, _find = function (parent, id) {
            if (parent) {
                if (parent.id == id)
                    return parent;
                return parent.querySelector('#' + id);
            }
            return document.getElementById(id);
        }, _query = function (parent, selector) {
            if (parent) {
                return parent.querySelector(selector);
            }
            return null;
        }, _addClass = function (element, className) {
            if (element.classList)
                element.classList.add(className);
            else
                element.className = _addRmvClasses(element.className, true, className);
        }, _removeClass = function removeClass(element, className) {
            if (element.classList)
                element.classList.remove(className);
            else
                element.className = _addRmvClasses(element.className, false, className);
        }, _hasClass = function (element, className) {
            if (element.classList)
                return element.classList.contains(className);
            else
                return (element.className || '').split(' ').indexOf(className) >= 0;
        }, _remove = function (element) {
            element.parentNode.removeChild(element);
        }, _detach = function (element) {
            element.parentNode.removeChild(element);
            return element;
        }, _empty = function (element) {
            for (var i = element.childNodes.length - 1; i >= 0; i--)
                element.removeChild(element.childNodes[i]);
        }, _append = function (parent, element) {
            parent.appendChild(element);
        }, _before = function (child, element) {
            child.parentNode.insertBefore(element, child);
        }, _elemByAttribute = function (el, root, attr) {
            var t = el;
            while (t) {
                if (!t.getAttribute)
                    return null;
                var val = t.getAttribute(attr);
                if (val)
                    return t;
                t = (t == root) ? null : t.parentNode;
            }
            return null;
        }, _setBodyTheme = function (value) {
            var fc = document.body.firstElementChild;
            if (!fc || !_hasClass(fc, "bs-content"))
                fc = document.body;
            var old = fc.className || '';
            var nc = value ? ('bs-body-theme-' + value) : '';
            var classes = old.split(' ');
            var changed = false;
            var i = classes.length;
            while (i--) {
                var c = classes[i];
                if (c.indexOf('bs-body-theme-') == 0) {
                    if (c == nc)
                        return false;
                    changed = true;
                    classes.splice(i, 1);
                }
            }
            if (nc) {
                changed = true;
                classes.push(nc);
            }
            if (changed)
                fc.className = classes.join(' ');
        }, _after = function (child, element) {
            var p = child.parentNode;
            child = child.nextSibling;
            if (child)
                p.insertBefore(element, child);
            else
                p.appendChild(element);
        }, _getWindow = function (elem) {
            return (elem != null && elem === elem.window) ? elem : elem.nodeType === 9 && elem.defaultView;
        }, _offset = function (element) {
            var rect;
            if (element.nodeType != 3) {
                rect = element.getBoundingClientRect();
                // Make sure element is not hidden (display: none)
                if (rect.width || rect.height) {
                    var doc = element.ownerDocument;
                    var win = _getWindow(doc);
                    var docElem = doc.documentElement;
                    return {
                        top: rect.top + win.pageYOffset - docElem.clientTop,
                        left: rect.left + win.pageXOffset - docElem.clientLeft,
                        width: rect.width,
                        height: rect.height,
                        bottom: 0,
                        right: 0
                    };
                }
            }
            return rect || { top: 0, left: 0, width: 0, height: 0, bottom: 0, right: 0 };
        }, _parentByTag = function (root, element, tag) {
            tag = tag.toUpperCase();
            while (element) {
                if (element.tagName === tag)
                    return element;
                element = element.parentNode;
                if (element == root)
                    break;
            }
            return null;
        }, _parentByCssClass = function (root, element, className) {
            while (element) {
                if (_hasClass(element, className))
                    return element;
                element = element.parentNode;
                if (element == root)
                    break;
            }
            return null;
        }, _indexOf = function (parent, child) {
            for (var i = 0, len = parent.childNodes.length; i < len; i++) {
                if (parent.childNodes[i] == child)
                    return i;
            }
            return -1;
        }, _isChildOf = function (parent, child) {
            while (child) {
                if (child === parent)
                    return true;
                child = child.parentNode;
            }
            return false;
        }, _attr = function (element, attr, value) {
            if (value === void 0) { value = undefined; }
            if (value === undefined) {
                return element.getAttribute(attr);
            }
            else {
                element.setAttribute(attr, value);
            }
        }, _text = function (node, text) {
            if (text === undefined)
                return node.textContent;
            if (node.childNodes.length) {
                var found = false;
                for (var i = 0, len = node.childNodes.length; i < len; i++) {
                    var n = node.childNodes[i];
                    if (n.nodeType == 3) {
                        n.nodeValue = text;
                        found = true;
                        break;
                    }
                }
                if (!found)
                    _append(node, document.createTextNode(text));
            }
            else {
                node.textContent = text;
            }
        }, _scrollbarWidth = function () {
            var calculated = false;
            var cw = 0;
            return function () {
                if (calculated)
                    return cw;
                var b, a = document.createElement("div");
                a.style.cssText = "overflow:scroll; overflow-x:hidden; zoom:1; clear:both";
                a.innerHTML = "&nbsp;";
                document.body.appendChild(a);
                b = a.offsetWidth - a.scrollWidth;
                document.body.removeChild(a);
                calculated = true;
                cw = b;
                return b;
            };
        }, _cover = null, _coverRefCount = 0, _inProcessing = function () {
            return _cover != null;
        }, _processing = function (value) {
            if (value) {
                _coverRefCount++;
                if (!_cover) {
                    _coverRefCount = 1;
                    _cover = $('<div class="bs-cover"></div>').get(0);
                    _cover.style.height = ($(document).height() - 1) + 'px';
                    _append(document.body, _cover);
                }
            }
            else {
                _coverRefCount--;
                if (_coverRefCount <= 0)
                    _coverRefCount = 0;
                if (_cover) {
                    if (_coverRefCount === 0) {
                        _remove(_cover);
                        _cover = null;
                    }
                }
            }
        }, _emitResize = function () {
            $(window).trigger('global-phoenix-resize');
        }, _resizeTimeOut = null, _setResizeHnd = function () {
            $(window).on('resize.phoenix', function () {
                if (_resizeTimeOut)
                    clearTimeout(_resizeTimeOut);
                _resizeTimeOut = setTimeout(_emitResize, 50);
            });
        };
        dom.readyHandlers = [_setResizeHnd];
        dom.keys = {
            VK_TAB: 9, VK_UP: 38, VK_DOWN: 40, VK_INSERT: 45, VK_DELETE: 46, VK_LEFT: 37, VK_RIGHT: 39,
            VK_ENTER: 13, VK_ESCAPE: 27, VK_F1: 112, VK_HOME: 36, VK_END: 35, VK_PGUP: 33, VK_PGDOWN: 34,
            VK_SPACE: 32, VK_F2: 113, VK_F3: 114, VK_F4: 115, VK_BACKSPACE: 8, VK_F10: 121
        };
        dom.queryAll = _queryAll;
        dom.find = _find;
        dom.query = _query;
        dom.addClass = _addClass;
        dom.removeClass = _removeClass;
        dom.hasClass = _hasClass;
        dom.icon = _createIcon;
        dom.iconClass = _iconClass;
        dom.iconPrefix = _iconPrefix;
        dom.bodyTheme = _setBodyTheme;
        dom.offset = _offset;
        dom.before = _before;
        dom.after = _after;
        dom.parentByTag = _parentByTag;
        dom.parentByClass = _parentByCssClass;
        dom.indexOf = _indexOf;
        dom.append = _append;
        dom.select = _select;
        dom.empty = _empty;
        dom.remove = _remove;
        dom.detach = _detach;
        dom.attr = _attr;
        dom.text = _text;
        dom.findByAttribute = _elemByAttribute;
        dom.isChildOf = _isChildOf;
        dom.parseStyle = _parseStyle;
        dom.ignoreKeys = [0, dom.keys.VK_UP, dom.keys.VK_DOWN, dom.keys.VK_HOME, dom.keys.VK_END, dom.keys.VK_PGUP, dom.keys.VK_PGDOWN, dom.keys.VK_ENTER, dom.keys.VK_ESCAPE,
            dom.keys.VK_DELETE, dom.keys.VK_BACKSPACE, dom.keys.VK_INSERT];
        dom.processing = _processing;
        dom.inProcessing = _inProcessing;
        dom.scrollbar = _scrollbarWidth();
    })(dom = Phoenix.dom || (Phoenix.dom = {}));
    var link;
    (function (link) {
        var _obj2Search = function (value) {
            if (!value)
                return '';
            var a = [];
            Object.keys(value).forEach(function (name) {
                if (value[name] === null)
                    return;
                a.push(name + '=' + encodeURIComponent(value[name] || ''));
            });
            if (a.length > 0)
                return '?' + a.join('&');
            return '';
        }, _parseUrl = function (value) {
            var search = {};
            var path = value;
            var i = value.indexOf('?');
            if (i >= 0) {
                var s = value.substring(i + 1);
                path = value.substring(0, i);
                if (s) {
                    var a = s.split('&');
                    a.forEach(function (v) {
                        if (v) {
                            var h = v.split('=');
                            search[h[0]] = decodeURIComponent(h[1]);
                        }
                    });
                }
            }
            return {
                path: path,
                search: search
            };
        }, _urlSearch = function (value, replace) {
            if (value == null) {
                return _parseUrl(window.location.href).search;
            }
            else {
                var searchString = _obj2Search(value);
                if (!window.location.hash) {
                    if (window.location.search != searchString)
                        window.location.search = searchString;
                }
                else {
                    var ch = window.location.hash;
                    var ii = ch.indexOf('?');
                    if (ii > 0) {
                        ch = ch.substring(0, ii);
                        ch = ch + searchString;
                    }
                    if (replace) {
                        history.replaceHash(ch);
                    }
                    else {
                        if (window.location.hash != ch) {
                            if (window.history) {
                                try {
                                    window.history.replaceState(undefined, undefined, ch);
                                }
                                catch (ex) {
                                    window.location.hash = ch;
                                }
                            }
                        }
                    }
                }
            }
        }, _extractPage = function (cfg) {
            var page = cfg.$page;
            if (Phoenix.device.phone && cfg.$pageMobile)
                page = cfg.$pageMobile;
            else if (Phoenix.device.tablet && cfg.$pageTablet)
                page = cfg.$pageTablet;
            return page;
        }, _context = function () {
            var usr = null;
            try {
                usr = JSON.parse(authentication.db().getItem("authentication"));
            }
            catch (e) {
            }
            return {
                $url: _urlSearch(null, false),
                $mem: Phoenix.$mem,
                $user: {
                    name: usr ? usr.name || usr.nom || usr.login : "",
                    firstName: usr ? usr.firstName || usr.prenom || usr.login : "",
                    lastName: usr ? usr.lastName || usr.nom || "" : ""
                },
                $item: null
            };
        }, _hashLink = function (cfg, data, params) {
            if (cfg.$page) {
                var page = _extractPage(cfg);
                var res = '#/' + page;
                var a = [];
                if (data && cfg.$search && cfg.$search.length) {
                    var dd = _context();
                    Object.keys(data).forEach(function (pn) {
                        dd[pn] = data[pn];
                    });
                    cfg.$search.forEach(function (v) {
                        if (v && v.left)
                            a.push(v.left + '=' + encodeURIComponent(utils.parseVariable(v.right, dd)));
                    });
                }
                if (params) {
                    Object.keys(params).forEach(function (pn) {
                        a.push(pn + '=' + encodeURIComponent(params[pn]));
                    });
                }
                if (a.length)
                    res = res + "?" + a.join("&");
                return res;
            }
            return '#';
        }, _customProtocols = {}, _isCustomLink = function (href) {
            var i = href.indexOf('://');
            if (i > 0) {
                var p = _customProtocols[href.substring(0, i)];
                if (p)
                    return p.protocol;
            }
            return null;
        }, _execCustomLink = function (clink, context, config, params) {
            var p = _customProtocols[clink.protocol];
            if (p && p.handler)
                p.handler(clink.value, context, config, params);
        }, _registerCustomLink = function (protocol, handler) {
            _customProtocols[protocol] = {
                protocol: protocol,
                handler: handler
            };
        }, _getLink = function (e, event, dontStopPropagation) {
            var target = event.target;
            while (target && target != e) {
                var href = dom.attr(target, 'data-phoenix-href') || dom.attr(target, 'href');
                if (href) {
                    if (href === '#') {
                        if (!dontStopPropagation) {
                            event.preventDefault();
                            event.stopPropagation();
                        }
                        break;
                    }
                    var customLink = _isCustomLink(href);
                    if (customLink) {
                        if (!dontStopPropagation) {
                            event.preventDefault();
                            event.stopPropagation();
                        }
                        return {
                            protocol: customLink,
                            value: href
                        };
                    }
                }
                target = target.parentNode;
            }
            return null;
        }, _navigateToModule = function (newhash, newModule, oldModule, replace) {
            var lpath = location.pathname;
            var lhref;
            var segments = lpath.split('/');
            var addAfter = '';
            if (segments[segments.length - 1].indexOf('.html') > 0)
                addAfter = segments.pop();
            var ls = segments.pop();
            if (!addAfter && ls == '')
                segments.pop();
            segments.push(newModule);
            if (addAfter)
                segments.push(addAfter);
            lhref = segments.join('/');
            if (!newhash || ('' + newhash).charAt(0) !== '#')
                newhash = '#' + newhash;
            lhref += newhash;
            if (replace)
                location.replace(lhref);
            else
                location.href = lhref;
        }, _setHash = function (newhash, replace) {
            if (!newhash || ('' + newhash).charAt(0) !== '#')
                newhash = '#' + newhash;
            if (window.location.hash == newhash)
                return;
            if (external.hashHandler) {
                external.hashHandler(newhash, replace);
            }
            else {
                history.removeLast();
                if (replace && 'replaceState' in window.history) {
                    window.history.replaceState(undefined, undefined, newhash);
                }
                else {
                    location.hash = newhash;
                }
            }
        }, _doFormAuthoring = function (params) {
            if (!params.name)
                return;
            if (!params.schema)
                return;
            var ch = '/authoring/forms/' + params.name;
            var search = [];
            if (params.schema !== params.name)
                search.push('prototype=' + encodeURIComponent(params.schema));
            if (params.locale)
                search.push('locale=' + encodeURIComponent(params.locale));
            if (params.path)
                search.push('path=' + encodeURIComponent(params.path));
            var ii = window.location.href.lastIndexOf('?');
            if (ii > 0)
                search.push(window.location.href.substr(ii + 1));
            if (search.length)
                ch = ch + '?' + search.join('&');
            window.location.hash = '#' + ch;
        }, _doAuthoring = function (pageName, force) {
            var auth = '/authoring';
            var authform = '/authoring/forms/';
            var ch = window.location.hash;
            if (ch.charAt(0) == '#')
                ch = ch.substring(1);
            if (!force && ch.indexOf(auth) === 0) {
                if (ch.indexOf(authform) === 0)
                    window.history.back();
                else
                    window.location.hash = '#' + ch.substring(auth.length);
            }
            else {
                window.location.hash = '#' + auth + (pageName ? ('/' + pageName) : ch);
            }
        }, _execLink = function (clink, context, params) {
            var _application = application;
            var modules = _application.configuration && _application.configuration.application ?
                _application.configuration.application.modules : null;
            if (clink.$page) {
                var module = clink.$module ? clink.$module : _application.name;
                if (modules && modules[module] && _application.licences) {
                    var mlicence = _application.licences[modules[module]];
                    if (mlicence && !mlicence.hasLicence) {
                        if (external.forbiddenHandler)
                            return external.forbiddenHandler();
                    }
                }
                var hash = _hashLink(clink, context, params);
                if (clink.$module) {
                    if (clink.$module != _application.name) {
                        return _navigateToModule(hash, clink.$module, _application.name, clink.$replace);
                    }
                }
                _setHash(hash, clink.$replace);
                if (clink.$authoring)
                    _doAuthoring();
            }
            else if (clink.$logout) {
                if (external.logoutHandler)
                    external.logoutHandler();
            }
            else if (clink.$formAuthoring) {
                _doFormAuthoring(clink);
            }
            else if (clink.$authoring) {
                _doAuthoring();
            }
            else if (clink.$back) {
                window.history.back();
            }
            else if (clink.href) {
                var a = document.createElement("a");
                a.href = clink.href;
                if (clink.target)
                    a.target = clink.target;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
        };
        link.search = _urlSearch;
        link.object2search = _obj2Search;
        link.parseUrl = _parseUrl;
        link.hashLink = _hashLink;
        link.pageName = _extractPage;
        link.isCustomLink = _getLink;
        link.registerCustomProtocol = _registerCustomLink;
        link.execCustomProtocol = _execCustomLink;
        link.isCustomProtocol = _isCustomLink;
        link.doAuthoring = _doAuthoring;
        link.doFormAuthoring = _doFormAuthoring;
        link.setHash = _setHash;
        link.execLink = _execLink;
        link.context = _context;
    })(link = Phoenix.link || (Phoenix.link = {}));
    ;
    function sessionPreferences(name, value) {
        var p = null;
        try {
            p = JSON.parse(window.sessionStorage.getItem("preferences"));
        }
        catch (ex) { }
        if (value === undefined) {
            return p ? p[name] : undefined;
        }
        else {
            p = p || {};
            p[name] = value;
            try {
                window.sessionStorage.setItem("preferences", JSON.stringify(p));
            }
            catch (ex) { }
        }
    }
    Phoenix.sessionPreferences = sessionPreferences;
    ;
    function preferences(name, value) {
        var p = null;
        try {
            p = JSON.parse(window.localStorage.getItem("preferences"));
        }
        catch (ex) { }
        if (value === undefined) {
            return p ? p[name] : undefined;
        }
        else {
            p = p || {};
            p[name] = value;
            try {
                window.localStorage.setItem("preferences", JSON.stringify(p));
            }
            catch (ex) { }
        }
    }
    Phoenix.preferences = preferences;
    (function _polyfill() {
        var arrayProto = Array.prototype;
        if (!arrayProto.find) {
            arrayProto.find = function (predicate, thisArg) {
                if (this === null) {
                    throw new TypeError('Array.prototype.find called on null or undefined');
                }
                if (typeof predicate !== 'function') {
                    throw new TypeError('predicate must be a function');
                }
                var list = Object(this);
                var length = list.length >>> 0;
                var thisArg = arguments[1];
                var value;
                for (var i = 0; i < length; i++) {
                    value = list[i];
                    if (predicate.call(thisArg, value, i, list)) {
                        return value;
                    }
                }
                return undefined;
            };
        }
        if (!arrayProto.findIndex) {
            arrayProto.findIndex = function (predicate, thisArg) {
                if (this === null) {
                    throw new TypeError('Array.prototype.find called on null or undefined');
                }
                if (typeof predicate !== 'function') {
                    throw new TypeError('predicate must be a function');
                }
                var list = Object(this);
                var length = list.length >>> 0;
                var thisArg = arguments[1];
                var value;
                for (var i = 0; i < length; i++) {
                    value = list[i];
                    if (predicate.call(thisArg, value, i, list)) {
                        return i;
                    }
                }
                return -1;
            };
        }
    })();
    $(document).ready(function () {
        if (dom.readyHandlers.length) {
            dom.readyHandlers.forEach(function (hnd) {
                hnd();
            });
        }
    });
})(Phoenix || (Phoenix = {}));
/// <reference path="../../../typings/index.d.ts" />
var Phoenix;
(function (Phoenix) {
    var utils;
    (function (utils) {
        var Serial = (function () {
            function Serial() {
                this._eventList = [];
            }
            Serial.prototype.execute = function (proc) {
                this._eventList.push(proc);
                this._execute();
            };
            Serial.prototype._execute = function () {
                var that = this;
                if (that._inExec)
                    return;
                that._inExec = true;
                try {
                    while (true) {
                        if (!that._eventList.length)
                            break;
                        var p = that._eventList.shift();
                        try {
                            p();
                        }
                        catch (e) {
                        }
                    }
                }
                finally {
                    that._inExec = false;
                }
            };
            return Serial;
        }());
        utils.Serial = Serial;
        var BusEvent = (function () {
            function BusEvent(delay, promise, resolve, errorhandler, ondispose) {
                var that = this;
                that.ondispose = ondispose;
                that.promise = promise;
                that.resolve = resolve;
                that.errorhandler = errorhandler;
                that.dataHandler = that.ondata.bind(that);
                if (delay)
                    that.timer = window.setTimeout(that._execute.bind(that), delay);
                else
                    that._execute();
            }
            BusEvent.prototype.ondata = function (data) {
                var that = this;
                var resolver = that.resolve;
                that.destroy();
                if (resolver)
                    resolver(data);
            };
            BusEvent.prototype.onerror = function (error) {
                var that = this;
                var errorhandler = that.errorhandler;
                that.destroy();
                if (errorhandler)
                    errorhandler(error);
            };
            BusEvent.prototype._execute = function () {
                var that = this;
                if (that.promise && that.promise.then)
                    that.promise.then(that.dataHandler, that.onerror.bind(that));
                else
                    that.dataHandler(that.promise);
            };
            BusEvent.prototype._cleaTimeout = function () {
                var that = this;
                if (that.timer) {
                    window.clearTimeout(that.timer);
                    that.timer = 0;
                }
            };
            BusEvent.prototype.destroy = function () {
                var that = this;
                that.resolve = null;
                that.errorhandler = null;
                that._cleaTimeout();
                that.promise = null;
                var od = that.ondispose;
                that.ondispose = null;
                if (od)
                    od(that);
            };
            return BusEvent;
        }());
        var SingleEventBus = (function () {
            function SingleEventBus(delay) {
                this.defaultDelay = 0;
                var that = this;
                that.defaultDelay = delay;
                that._error = that._errorHandler.bind(that);
                that._dispose = that._onEventDisposed.bind(that);
            }
            SingleEventBus.prototype._errorHandler = function (error) {
                var that = this;
                if (that.onError)
                    that.onError(error);
            };
            SingleEventBus.prototype.clear = function () {
                var that = this;
                if (that.currentEvent) {
                    that.currentEvent.destroy();
                    that.currentEvent = null;
                }
            };
            SingleEventBus.prototype._onEventDisposed = function (event) {
                var that = this;
                that.currentEvent = null;
            };
            SingleEventBus.prototype.push = function (promise, onsuccess, nodelay) {
                var that = this;
                that.clear();
                var delay = nodelay ? 0 : that.defaultDelay;
                that.currentEvent = new BusEvent(delay, promise, onsuccess, that._error, that._dispose);
            };
            SingleEventBus.prototype.destroy = function () {
                var that = this;
                that.clear();
            };
            return SingleEventBus;
        }());
        utils.SingleEventBus = SingleEventBus;
        utils.GlbSerial = new Serial();
    })(utils = Phoenix.utils || (Phoenix.utils = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../../../typings/index.d.ts" />
/// <reference path="./core.ts" />
var Phoenix;
(function (Phoenix) {
    var ajax;
    (function (ajax) {
        var _utils = Phoenix.utils, _application = Phoenix.application, _customData = _customData, _locale = Phoenix.locale;
        var _ajaxInterceptors = {}, _intercept = function (status) {
            var ii = _ajaxInterceptors["s" + status];
            if (ii && !ii.disabled) {
                ii.handlers.forEach(function (v) {
                    v();
                });
                return true;
            }
            return false;
        }, _addAjaxInterceptor = function (status, handler) {
            var p = "s" + status;
            var a = _ajaxInterceptors[p] || {
                disabled: false,
                handlers: []
            };
            a.handlers.push(handler);
            _ajaxInterceptors[p] = a;
        }, _activateInterceptor = function (status, value) {
            var a = _ajaxInterceptors["s" + status];
            if (a)
                a.disabled = !value;
        }, _isFunction = function (obj) {
            return obj && typeof obj === "function";
        }, _parseError = function (jqXHR) {
            var res = null;
            if (jqXHR.responseText) {
                res = { responseText: jqXHR.responseText };
            }
            if (jqXHR.responseJSON) {
                res = res || {};
                if (typeof jqXHR.responseJSON === 'object') {
                    res.json = jqXHR.responseJSON;
                }
                else {
                    try {
                        res.json = JSON.parse(jqXHR.responseJSON);
                    }
                    catch (e) {
                    }
                }
            }
            return res;
        }, _parseAjaxException = function (ex) {
            var res = { message: '', list: [] };
            if (ex && typeof ex !== 'object')
                ex = { message: ex };
            ex = ex || {};
            res.status = ex.status;
            ex.message = ex.message || _locale.errors.unknownError;
            var cmessage;
            if (ex.detail) {
                if (ex.detail.json && ex.detail.json.error) {
                    var ce = ex.detail.json.error, me = void 0;
                    if (ce.details !== undefined)
                        me = ce;
                    cmessage = ce.message;
                    if (ce.innererror && ce.innererror.message) {
                        if (ce.innererror.type === "Json") {
                            me = JSON.parse(ce.innererror.message);
                        }
                    }
                    if (me) {
                        res.message = me.message;
                        if (me.details) {
                            me.details.forEach(function (det) {
                                res.list.push({ message: det.message, target: det.target });
                            });
                        }
                        return res;
                    }
                }
                else if (ex.detail.json && ex.detail.json.exceptionMessage) {
                    cmessage = ex.detail.json.exceptionMessage;
                }
                else
                    cmessage = ex.detail.responseText;
            }
            res.message = cmessage || ex.message;
            return res;
        }, _get = function (lurl, options, ondata) {
            if (!ondata && _isFunction(options)) {
                ondata = options;
                options = null;
            }
            var opts = {
                type: 'GET',
                url: lurl,
                dataType: "json",
                accept: 'application/json'
            };
            var errors = null;
            if (options) {
                errors = options.$errors;
                delete options.$errors;
                Object.keys(opts).forEach(function (pn) {
                    options[pn] = opts[pn];
                });
                opts = options;
            }
            var _promise = Phoenix.utils.Promise;
            return new _promise(function (resolve, reject) {
                $.ajax(opts).done(function (data, textStatus, jqXHR) {
                    if (ondata)
                        data = ondata(data);
                    resolve(data);
                }).fail(function (jqXHR, textStatus, errorThrown) {
                    if (options && options.ignore && options.ignore['' + jqXHR.status])
                        return resolve({});
                    if (errors && errors[jqXHR.status + '']) {
                        var errCode = jqXHR.status + '';
                        if (typeof errors[errCode] === 'string') {
                            var hnd = _customData.get(errors[errCode]);
                            if (hnd)
                                resolve(hnd());
                        }
                        else
                            return resolve(errors[errCode]);
                    }
                    if (_intercept(jqXHR.status)) {
                        return resolve({});
                    }
                    if (jqXHR.status >= 500 && _locale && _locale.errors) {
                        textStatus = _locale.errors.error500;
                        errorThrown = null;
                    }
                    var detail = _parseError(jqXHR);
                    if (detail)
                        errorThrown = null;
                    if (errorThrown) {
                        if (typeof errorThrown === 'string') {
                            errorThrown = { message: errorThrown };
                        }
                    }
                    errorThrown = errorThrown || {
                        message: textStatus,
                        detail: detail
                    };
                    errorThrown.status = jqXHR.status;
                    reject(errorThrown);
                });
            });
        }, _sendVerb = function (method, lurl, data, options) {
            var _promise = Phoenix.utils.Promise;
            var opts = {
                type: method,
                contentType: 'application/json',
                accept: 'application/json',
                url: lurl,
                data: null
            };
            if (options && options.headers) {
                opts.headers = options.headers;
            }
            if (data)
                opts.data = JSON.stringify(data);
            return new _promise(function (resolve, reject) {
                $.ajax(opts).done(function (data, textStatus, jqXHR) {
                    resolve(data);
                }).fail(function (jqXHR, textStatus, errorThrown) {
                    if (options && options.ignore && options.ignore["" + jqXHR.status])
                        return resolve({});
                    if (_intercept(jqXHR.status)) {
                        return resolve({});
                    }
                    if (jqXHR.status >= 500 && _locale && _locale.errors) {
                        textStatus = _locale.errors.error500;
                        errorThrown = null;
                    }
                    var detail = _parseError(jqXHR);
                    if (detail)
                        errorThrown = null;
                    if (errorThrown) {
                        if (typeof errorThrown === 'string') {
                            errorThrown = { message: errorThrown };
                        }
                    }
                    errorThrown = errorThrown || {
                        message: textStatus,
                        detail: detail
                    };
                    errorThrown.status = jqXHR.status;
                    reject(errorThrown);
                });
            });
        }, _put = function (lurl, data, options) {
            return _sendVerb('PUT', lurl, data, options);
        }, _patch = function (lurl, data, options) {
            return _sendVerb('PATCH', lurl, data, options);
        }, _post = function (lurl, data, options) {
            return _sendVerb('POST', lurl, data, options);
        }, _delete = function (lurl, options) {
            return _sendVerb('DELETE', lurl, null, options);
        }, _dynscripts = {}, _getOptions = function () {
            var cfg = Phoenix.application.config(_application.name);
            var opts = { headers: null };
            if (cfg && cfg.odata && cfg.odata.headers)
                opts.headers = cfg.odata.headers;
            opts.headers = opts.headers || {};
            opts.headers.Accept = "application/json";
            if (cfg && cfg.odata && cfg.odata.authentication) {
                var ui = Phoenix.authentication.load();
                if (ui) {
                    switch (cfg.odata.authentication) {
                        case 'basic':
                            opts.headers.Authorization = ui.basic;
                            break;
                        case 'header-session':
                            opts.headers.Authorization = 'Bearer ' + ui.token;
                            break;
                    }
                }
                else {
                    delete opts.headers.Authorization;
                }
            }
            return opts;
        }, _loadScript = function (name, lurl, after, loader) {
            var status = _dynscripts[name];
            if (!status) {
                _dynscripts[name] = { loading: true };
                if (loader) {
                    loader.execute(function (err) {
                        if (err)
                            _dynscripts[name] = { error: err };
                        else
                            _dynscripts[name] = { loaded: true };
                        after(err);
                    });
                }
                else {
                    $.ajax({
                        url: lurl,
                        dataType: "script",
                        cache: true
                    }).done(function (data, textStatus, jqXHR) {
                        _dynscripts[name] = { loaded: true };
                        after(null);
                    }).fail(function (jqXHR, textStatus, errorThrown) {
                        var err = errorThrown || { message: textStatus };
                        _dynscripts[name] = { error: err };
                        after(err);
                    });
                }
            }
            else {
                if (status.loaded) {
                    return after(null);
                }
                else if (status.error) {
                    return after(status.error, null);
                }
                else {
                    //status.loading == true
                    window.setTimeout(function () {
                        _loadScript(name, lurl, after, loader);
                    }, 20);
                }
            }
        }, _getScript = function (lurl) {
            var _promise = Phoenix.utils.Promise;
            return new _promise(function (resolve, reject) {
                $.ajax({
                    url: lurl,
                    dataType: "script",
                    cache: true
                }).done(function (data, textStatus, jqXHR) {
                    resolve(true);
                }).fail(function (jqXHR, textStatus, errorThrown) {
                    reject(errorThrown || {
                        message: textStatus
                    });
                });
            });
        }, _postAndDownload = function (lurl, postData) {
            var _promise = Phoenix.utils.Promise;
            var opts = _getOptions();
            var config = _application.config(_application.name) || {};
            var base = config.rest ? config.rest.base || '' : '';
            if (lurl && lurl.charAt(0) === '/')
                base = '';
            if (base)
                lurl = base + '/' + lurl;
            return new _promise(function (resolve, reject) {
                var _onerror = function (xhr) {
                    var textStatus = xhr.statusText;
                    if (_intercept(xhr.status))
                        return resolve({});
                    if (xhr.status >= 500 && _locale && _locale.errors)
                        textStatus = _locale.errors.error500;
                    var detail = null; // _parseError(xhr);
                    reject({
                        message: textStatus,
                        detail: detail
                    });
                };
                var xhr = new XMLHttpRequest();
                xhr.open('POST', lurl, true);
                xhr.responseType = 'arraybuffer';
                xhr.onload = function () {
                    if (this.status === 200 || this.status === 201) {
                        var filename = "";
                        var disposition = xhr.getResponseHeader('Content-Disposition');
                        if (disposition && disposition.indexOf('attachment') !== -1) {
                            var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                            var matches = filenameRegex.exec(disposition);
                            if (matches != null && matches[1])
                                filename = matches[1].replace(/['"]/g, '');
                        }
                        var type = xhr.getResponseHeader('Content-Type');
                        try {
                            var blob = new Blob([this.response], { type: type });
                        }
                        catch (ex) {
                            return reject(ex);
                        }
                        if (typeof window.navigator.msSaveBlob !== 'undefined') {
                            window.navigator.msSaveBlob(blob, filename);
                            resolve({});
                        }
                        else {
                            var URL = window["URL"] || window["webkitURL"];
                            var downloadUrl = URL.createObjectURL(blob);
                            if (filename) {
                                // use HTML5 a[download] attribute to specify filename
                                var a = document.createElement("a");
                                // safari doesn't support this yet
                                if (typeof a["download"] === 'undefined') {
                                    window.location = downloadUrl;
                                }
                                else {
                                    a.href = downloadUrl;
                                    a["download"] = filename;
                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
                                }
                            }
                            else {
                                window.location = downloadUrl;
                            }
                            setTimeout(function () {
                                URL.revokeObjectURL(downloadUrl);
                                resolve({});
                            }, 100);
                        }
                    }
                    else {
                        _onerror(this);
                    }
                };
                xhr.onerror = function () {
                    _onerror(xhr);
                };
                xhr.setRequestHeader('Content-type', 'application/json');
                if (opts && opts.headers) {
                    Object.keys(opts.headers).forEach(function (hn) {
                        xhr.setRequestHeader(hn, opts.headers[hn]);
                    });
                }
                xhr.send(JSON.stringify(postData));
            });
        };
        ajax.extractAjaxErrors = _parseAjaxException;
        ajax.get = _get;
        ajax.getScript = _getScript;
        ajax.getDefaultAjaxOptions = _getOptions;
        ajax.put = _put;
        ajax.patch = _patch;
        ajax.post = _post;
        ajax.remove = _delete;
        ajax.postAndDownload = _postAndDownload;
        ajax.loadScript = _loadScript;
        ajax.interceptError = _addAjaxInterceptor;
        ajax.activateInterceptError = _activateInterceptor;
    })(ajax = Phoenix.ajax || (Phoenix.ajax = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../core.ts" />
var Phoenix;
(function (Phoenix) {
    var en = {
        "layouts": {
            "design": {
                "Save": "Save",
                "New": "New page",
                "Open": { "title": "Open page", "open": "Open", "close": "Close" },
                "PageName": "Page Name",
                "InvalidPageName": "Invalid page name",
                "ConflictedPageName": "A page of that name exists, do you want to give another name ?",
                "Delete": "Delete page",
                "ConfirmDelete": "Are you sure you want to delete this page ?",
                "Preview": "Preview",
                "AuthoringMode": "Authoring",
                "layouts": "Blocks",
                "widgets": "Widgets",
                "fields": "Fields",
                "actions": "Actions"
            },
            "NoData": 'No data'
        },
        "schema": {
            "required": "{0} is required.",
            "minNumber": "{0} must be at least {1}",
            "maxNumber": "{0} cannot exceed {1}",
            "minNumberExclusive": "{0} must be greater than {1}",
            "maxNumberExclusive": "{0} must be less than {1}",
            "uniqueColumn": "The column '{0}' must be unique.",
            "uniqueColumns": "Duplicate value for columns '{0}' found.",
            "passwordMismatch": "Password mismatch.",
            "invalidEmail": "Invalid Email Address",
            "minLength": "{0} must be at least {1} characters"
        },
        "ui": {
            "Close": "Close",
            "Ok": "Ok",
            "Yes": "Yes",
            "No": "No",
            "Warning": "Warning",
            "Info": "Information",
            "Disconnect": "Disconnect",
            "Confirm": "Confirm",
            "Validate": "Validate",
            "password": {
                "oldPassword": "Old Password",
                "newPassword": "New Password",
                "change": "Change password"
            },
            "ApplyDetailChanges": "Apply",
            "Selected": "Sel."
        },
        "errors": {
            "Title": "Oops! An unknown error has occurred.",
            "SendMail": "Send",
            "MailSubject": "Error in JS client",
            "ErrorTitle": "Error:",
            "ErrorUser": "User:",
            "ErrorDate": "Date and time:",
            "Browser": "Browser:",
            "ErrorURI": "Address:",
            "Stack": "Call stack:",
            "Context": "Context:",
            "error500": "Internal server error",
            "unknownError": "An unknown error has occurred.",
            "notAuthorized": "Forbidden"
        },
        "listView": {
            "search": {
                "Search": "Search",
                "Nodata": "Aucun résultat trouvé ..."
            }
        },
        "pagination": {
            "Next": "»",
            "Previous": "«",
            "First": "First",
            "Last": "Last"
        },
        "number": {
            "decimal": ".",
            "thousand": " ",
            "places": 2,
            "symbol": "$",
            "format": "%s %v"
        },
        "charts": {
            "numericSymbols": ["k", "M", "G", "T", "P", "E"],
            "resetZoom": "Reset zoom",
            "resetZoomTitle": "Reset zoom level 1:1",
            "rangeSelectorZoom": "Zoom",
            "rangeSelectorFrom": "From",
            "rangeSelectorTo": "To"
        },
        "date": {
            "weekdaysShort": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            "weekdaysMin": ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            "weekdays": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "monthsShort": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            "months": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            "dateShort": "mm/dd/yyyy",
            "dateLong": "d mmmm, yyyy",
            "monthYear": "mmmm yyyy",
            "daySep": "-",
            "weekStart": 0,
            "today": "Today",
            "clear": "Clear"
        }
    };
    Phoenix.ulocale.translate(en, "en");
})(Phoenix || (Phoenix = {}));
/// <reference path="./core.ts" />
/// <reference path="./ajax.ts" />
var Phoenix;
(function (Phoenix) {
    var ulocale;
    (function (ulocale) {
        var _locale = Phoenix.locale, _ajax = Phoenix.ajax, _supportedLanguages = ["en", "fr"], _checkPrecision = function (val, base) {
            val = Math.round(Math.abs(val));
            return isNaN(val) ? base : val;
        }, _toFixed = function (value, precision) {
            precision = _checkPrecision(precision, 2);
            var power = Math.pow(10, precision);
            return (Math.round(value * power) / power).toFixed(precision);
        }, _formatNumber = function (number, precision, thousand, decimal) {
            if (number === null)
                return "";
            var usePrecision = _checkPrecision(precision, 0), negative = number < 0 ? "-" : "", base = parseInt(_toFixed(Math.abs(number || 0), usePrecision), 10) + "", mod = base.length > 3 ? base.length % 3 : 0;
            return negative + (mod ? base.substr(0, mod) + thousand : "") + base.substr(mod).replace(/(\d{3})(?=\d)/g, "$1" + thousand) +
                (usePrecision ? decimal + _toFixed(Math.abs(number), usePrecision).split('.')[1] : "");
        }, _formatMoney = function (number, precision, thousand, decimal, symbol, format) {
            if (number === null)
                return "";
            format = format || "%v %s";
            return format.replace('%s', symbol).replace('%v', _formatNumber(number, precision, thousand, decimal));
        }, _parseDateISO8601 = function (value) {
            if (value instanceof Date)
                return value;
            if (!value)
                return null;
            var d = Date.parse(value);
            if (isNaN(d))
                return null;
            return new Date(d);
        }, _parseISODateAsUTC = function (value) {
            if (!value)
                return 0;
            return Date.UTC(parseInt(value.substr(0, 4), 10), parseInt(value.substr(5, 2), 10) - 1, parseInt(value.substr(8, 2), 10), 0, 0, 0);
        }, 
        /**
        * @param {string} val
        * @param {number || null} len
        */
        _pad = function (val, len) {
            var sval = val + '';
            while (sval.length < len)
                sval = "0" + val;
            return sval;
        }, _formatDate = function (value, format) {
            var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g, md = value.getDate(), day = value.getDay(), month = value.getMonth(), year = value.getFullYear(), flags = {
                d: md,
                dd: _pad(md, 2),
                ddd: _locale.date.weekdaysShort[day],
                dddd: _locale.date.weekdays[day],
                m: month + 1,
                mm: _pad(month + 1, 2),
                mmm: _locale.date.monthsShort[month],
                mmmm: _locale.date.months[month],
                yy: (year + '').slice(2),
                yyyy: year
            };
            return format.replace(token, function ($0) {
                return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
            });
        }, 
        /**
        * Date to ISO8601
        * @param {Date} value
        */
        _date2ISO = function (value) {
            var yy = value.getFullYear(), mm = value.getMonth() + 1, dd = value.getDate();
            return _pad(yy, 4) + '-' + _pad(mm, 2) + '-' + _pad(dd, 2);
        }, _shortDate2ISO = function (value) {
            var f = _locale.date.dateShort.split('/');
            if (f.length != 3)
                return '';
            var v = value.split(_locale.date.daySep);
            var d = [0, 0, 0];
            f.forEach(function (ff, index) {
                var ii = 0;
                if (ff.charAt(0) === 'm')
                    ii = 1;
                else if (ff.charAt(0) === 'y')
                    ii = 2;
                d[ii] = parseInt(v[index], 10);
                if (ii == 2 && d[ii] < 100 && v[index].length < 3) {
                    d[ii] += Math.round(new Date().getFullYear() / 100) * 100;
                }
            });
            var sv = _pad(d[2], 4) + '-' + _pad(d[1], 2) + '-' + _pad(d[0], 2);
            var res = Date.parse(sv);
            if (isNaN(res))
                return '';
            return sv;
        }, _shortDate = function (date) {
            if (!date)
                return "";
            var d = _parseDateISO8601(date);
            if (!d)
                return "";
            var format = _locale.date.dateShort;
            if (_locale.date.daySep != '/')
                format = format.replace(/\//g, _locale.date.daySep);
            return _formatDate(d, format);
        }, _longDate = function (date) {
            if (!date)
                return "";
            var d = _parseDateISO8601(date);
            if (!d)
                return "";
            var format = _locale.date.dateLong;
            if (_locale.date.daySep != '/')
                format = format.replace(/\//g, _locale.date.daySep);
            return _formatDate(d, format);
        }, _monthYear = function (date) {
            if (!date)
                return "";
            var d = _parseDateISO8601(date);
            if (!d)
                return "";
            var format = _locale.date.monthYear;
            if (_locale.date.daySep != '/')
                format = format.replace(/\//g, _locale.date.daySep);
            return _formatDate(d, format);
        }, _truncMoney = function (value) {
            return parseFloat(value.toFixed(_locale.number.decimal));
        }, _money = function (value, useSymbol) {
            value = value || 0;
            if (useSymbol)
                return _formatMoney(value, _locale.number.places, _locale.number.thousand, _locale.number.decimal, _locale.number.symbol, _locale.number.format);
            else
                return _formatNumber(value, _locale.number.places, _locale.number.thousand, _locale.number.decimal);
        }, _decimal = function (value, decimals, symbol) {
            if (value === null)
                return "";
            value = value || 0;
            var format = symbol ? "%v %s" : "%v";
            return _formatMoney(value, decimals, _locale.number.thousand, _locale.number.decimal, symbol, format);
        }, _formatObject = function (desc, value) {
            if (!desc || !value)
                return value;
            var props = [];
            Object.keys(desc).forEach(function (pn) {
                var d = desc[pn];
                if (d.type == "date" || d.type == "money" || d.type == "decimal" || d.type == "number") {
                    props.push({
                        name: pn,
                        type: d.type,
                        symbol: d.symbol,
                        longdate: d.longdate,
                        decimals: d.decimals,
                        useSymbol: d.useSymbol === undefined ? true : d.useSymbol
                    });
                }
            });
            if (!props.length)
                return value;
            var o = Array.isArray(value) ? value : [value];
            o.forEach(function (co) {
                props.forEach(function (f) {
                    switch (f.type) {
                        case "date":
                            co[f.name] = _shortDate(co[f.name]);
                            break;
                        case "money":
                            co[f.name] = _money(co[f.name], f.useSymbol);
                            break;
                        case "integer":
                            co[f.name] = _decimal(co[f.name], 0, f.symbol);
                            break;
                        case "decimal":
                        case "number":
                            co[f.name] = _decimal(co[f.name], f.decimals, f.symbol);
                            break;
                    }
                });
            });
            return value;
        }, _ISODatePart = function (isoDate) {
            var s = isoDate || '';
            var ii = s.indexOf("T");
            if (ii > 0)
                s = s.substr(0, ii);
            return s;
        }, _string2Float = function (value) {
            var val = value.replace(new RegExp(Phoenix.locale.number.thousand, 'g'), '');
            if (Phoenix.locale.number.decimal != ".")
                val = val.replace(new RegExp(Phoenix.locale.number.decimal, 'g'), '.');
            var res = parseFloat(val);
            if (isNaN(res))
                res = 0.0;
            return res;
        };
        ulocale.currentLang = 'en';
        ulocale.defCountry = "US";
        ulocale.lang = 'fr'; //(navigator.language || navigator.userLanguage || currentLang).split('-')[0];
        ulocale.country = 'FR';
        ulocale.money = _money;
        ulocale.truncMoney = _truncMoney;
        ulocale.decimal = _decimal;
        ulocale.format = _formatObject;
        ulocale.parseISODate = _parseDateISO8601;
        ulocale.parseISODateAsUTC = _parseISODateAsUTC;
        ulocale.isoDatePart = _ISODatePart;
        ulocale.shortDate = _shortDate;
        ulocale.longDate = _longDate;
        ulocale.monthYear = _monthYear;
        ulocale.localeDate2ISO = _shortDate2ISO;
        ulocale.date2ISO = _date2ISO;
        ulocale.string2Float = _string2Float;
        ulocale.localeTitle = function (title) {
            if (typeof title === "object")
                return title[ulocale.currentLang];
            return title;
        };
        function loadLocale(newLang) {
            var pp = Phoenix.utils.phoenixPath();
            if (newLang != ulocale.currentLang) {
                _ajax.getScript(pp + '/locale/phoenix_' + ulocale.lang + '.min.js').then(function () {
                    ulocale.currentLang = newLang;
                }).catch(function (ex) {
                });
            }
        }
        ulocale.loadLocale = loadLocale;
        ;
        if (_supportedLanguages.indexOf(ulocale.lang) < 0)
            ulocale.lang = ulocale.currentLang;
        loadLocale(ulocale.lang);
    })(ulocale = Phoenix.ulocale || (Phoenix.ulocale = {}));
    var angularjs;
    (function (angularjs) {
        var _registerLocaleFilters = function (app) {
            if (app && app.filter) {
                app.filter('money', [function () {
                        return function (input, useSymbol) {
                            var value = input === null ? null : (input ? parseFloat(input) : 0.0);
                            return ulocale.money(value, useSymbol);
                        };
                    }]);
                app.filter('decimal', [function () {
                        return function (input, decimals, symbol) {
                            var value = input === null ? null : (input ? parseFloat(input) : 0.0);
                            return ulocale.decimal(value, decimals || 0, symbol);
                        };
                    }]);
                app.filter('shortdate', [function () {
                        return function (input) {
                            return ulocale.shortDate(input);
                        };
                    }]);
                app.filter('longdate', [function () {
                        return function (input) {
                            return ulocale.longDate(input);
                        };
                    }]);
                app.filter('monthyear', [function () {
                        return function (input) {
                            return ulocale.monthYear(input);
                        };
                    }]);
            }
        };
        angularjs.registerFilters = _registerLocaleFilters;
    })(angularjs = Phoenix.angularjs || (Phoenix.angularjs = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="./core.ts" />
var Phoenix;
(function (Phoenix) {
    var _link = Phoenix.link;
    var _mem = Phoenix.$mem;
    var _utils = Phoenix.utils;
    _link.registerCustomProtocol("page", function (value, context, config, params) {
        if (!context.$url)
            context.$url = _link.search(null, false);
        if (!context.$mem)
            context.$mem = _mem;
        var i = value.indexOf("://");
        if (i <= 0)
            return;
        var s = value.substring(i + 3), l = _link.parseUrl(s), a = l.path.split('/'), replace;
        if (l.search.$replace) {
            replace = true;
            delete l.search.$replace;
        }
        var cfg = {
            $page: a[0],
            $search: [],
            $replace: replace,
            $menu: null
        };
        if (a.length > 1)
            cfg.$menu = a[1];
        Object.keys(l.search).forEach(function (pn) {
            cfg.$search.push({
                left: pn,
                right: l.search[pn]
            });
        });
        _link.execLink(cfg, context, null);
    });
    _link.registerCustomProtocol("link", function (value, context, config, params) {
        var ln = value.substring(('link://').length);
        var ii = ln.indexOf('/');
        if (ii <= 0)
            ii = ln.indexOf('?');
        if (ii > 0) {
            var u = _link.parseUrl(ln.substring(ii));
            ln = ln.substring(0, ii);
            if (u.search) {
                if (params)
                    _utils.extend(params, u.search);
                else
                    params = u.search;
            }
        }
        if (config.links && config.links[ln]) {
            _link.execLink(config.links[ln], context, params);
        }
    });
    _link.registerCustomProtocol("click", null);
})(Phoenix || (Phoenix = {}));
/// <reference path="../core/core.ts" />
/// <reference path="../core/ajax.ts" />
/// <reference path="../core/locale.ts" />
var Phoenix;
(function (Phoenix) {
    var data;
    (function (data) {
        var _application = Phoenix.application;
        var _menuProvider = {
            get: function (menu, localization, appName) {
                if (localization && Phoenix.ulocale.lang) {
                    menu = menu + '_' + Phoenix.ulocale.lang;
                }
                var config = _application.config(appName);
                if (!config)
                    throw "Application configuration not found.";
                return Phoenix.ajax.get(config.menus + '/' + menu + '.json', { cache: true }, null);
            }
        };
        data.menu = _menuProvider;
    })(data = Phoenix.data || (Phoenix.data = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../core/core.ts" />
/// <reference path="../core/ajax.ts" />
/// <reference path="../core/locale.ts" />
var Phoenix;
(function (Phoenix) {
    var data;
    (function (data_1) {
        var _application = Phoenix.application;
        var _widgetSchema = {
            get: function (schema, localization, appName) {
                if (localization && Phoenix.ulocale.lang) {
                    schema = schema + '_' + Phoenix.ulocale.lang;
                }
                var config = _application.config(appName);
                if (!config)
                    throw "Application configuration not found.";
                return Phoenix.ajax.get(config.locales + '/' + schema + '.json', { cache: true }, function (data) {
                    if (data)
                        data.$name = schema;
                    if (data.$view)
                        data.$view.$name = schema;
                    return data;
                });
            }
        };
        data_1.schema = _widgetSchema;
    })(data = Phoenix.data || (Phoenix.data = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../core/core.ts" />
/// <reference path="../core/ajax.ts" />
var Phoenix;
(function (Phoenix) {
    var data;
    (function (data) {
        var _application = Phoenix.application, _ajax = Phoenix.ajax, _utils = Phoenix.utils, _execPath = function (path, ldata) {
            if (!path)
                return null;
            if (path == ".")
                return ldata;
            var a = path.split('.'), cd = ldata;
            for (var i = 0, len = a.length; i < len; i++) {
                if (!cd)
                    return null;
                cd = cd[a[i]];
            }
            return cd;
        }, _addTenantId = function (lurl) {
            return lurl;
        }, _rest = {
            getRessources: function (params, ondata) {
                var _after = function (cd) {
                    if (ondata)
                        cd = ondata(cd);
                    return cd;
                };
                var lurl = params.$url;
                var config = _application.config(_application.name) || {};
                var base = config.rest ? config.rest.base || '' : '';
                if (lurl && lurl.charAt(0) === '/')
                    base = '';
                if (base)
                    lurl = base + '/' + lurl;
                if (config.rest && config.rest.$context) {
                    lurl = _utils.formatNames(lurl, { $context: config.rest.$context });
                }
                else {
                    lurl = lurl.replace('{context}/', '');
                }
                var opts = _ajax.getDefaultAjaxOptions();
                var query = params.$query;
                var listprop = params.$list;
                lurl = lurl + Phoenix.link.object2search(query);
                lurl = _addTenantId(lurl);
                switch (params.$method) {
                    case "POST":
                        return _ajax.post(lurl, params.$data, opts);
                    case "PUT":
                        return _ajax.put(lurl, params.$data, opts);
                    case "PATCH":
                        return _ajax.patch(lurl, params.$data, opts);
                    case "DELETE":
                        return _ajax.remove(lurl, opts);
                    default:
                        return _ajax.get(lurl, opts, function (ldata) {
                            return _after(ldata);
                        });
                }
            }
        };
        data.rest = _rest;
    })(data = Phoenix.data || (Phoenix.data = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../core/core.ts" />
/// <reference path="../core/ajax.ts" />
var Phoenix;
(function (Phoenix) {
    var data;
    (function (data) {
        var _application = Phoenix.application, _local = {
            getRessources: function (params, ondata) {
                var _after = function (cd) {
                    if (ondata)
                        cd = ondata(cd);
                    return cd;
                };
                var config = _application.config(_application.name);
                if (!config)
                    throw "Application configuration not found.";
                var lurl = config.localData + '/' + params.$url;
                var query = params.$query;
                lurl = lurl + Phoenix.link.object2search(query);
                return Phoenix.ajax.get(lurl, {}, function (ldata) {
                    return _after(ldata);
                });
            }
        };
        data.local = _local;
    })(data = Phoenix.data || (Phoenix.data = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../core/core.ts" />
/// <reference path="../core/ajax.ts" />
/// <reference path="../core/locale.ts" />
var Phoenix;
(function (Phoenix) {
    var data;
    (function (data_2) {
        var _application = Phoenix.application, _utils = Phoenix.utils, _ajax = Phoenix.ajax, _odatacache = {}, _addTenantId = function (lurl) {
            return lurl;
        }, _odata = {
            v4: true,
            transport: {
                doPost: _ajax.post,
                doPut: _ajax.put,
                doDelete: _ajax.remove,
                doGet: function (lurl, options, ondata, params) {
                    return _ajax.get(lurl, options, ondata);
                },
                doPatch: _ajax.patch
            },
            afterLogout: function () {
                //clear cache
                _odatacache = {};
            },
            urlResEntity: function (params, checkId) {
                var config = _application.config(_application.name) || {};
                var base = config.odata ? config.odata.base || '/data' : '/data';
                base = _utils.formatNames(base, { $module: params.$module });
                if (!params.$entity)
                    throw "Invalid odata entity.";
                if (checkId && !params.$entityId)
                    throw "Invalid odata entity id.";
                var lurl = base + '/' + params.$entity;
                if (params.$entityId)
                    lurl = lurl + '(' + params.$entityId + ')';
                if (params.$propertyName)
                    lurl = lurl + '/' + params.$propertyName;
                return lurl;
            },
            doDelete: function (params, etag) {
                var lurl = _odata.urlResEntity(params, true);
                var opts = _ajax.getDefaultAjaxOptions();
                if (etag) {
                    opts.headers["If-Match"] = etag;
                }
                opts.ignore = { "410": true };
                lurl = _addTenantId(lurl);
                return _odata.transport.doDelete(lurl, opts);
            },
            doPost: function (params, data) {
                var opts = _ajax.getDefaultAjaxOptions();
                var lurl = _odata.urlResEntity(params, false);
                lurl = _addTenantId(lurl);
                return _odata.transport.doPost(lurl, data, opts);
            },
            doPut: function (params, data, etag, returnRepresentation) {
                var lurl = _odata.urlResEntity(params, true);
                var opts = _ajax.getDefaultAjaxOptions();
                opts.headers = opts.headers || {};
                if (etag) {
                    opts.headers["If-Match"] = etag;
                }
                if (returnRepresentation)
                    opts.headers['Prefer'] = 'return=representation';
                lurl = _addTenantId(lurl);
                return _odata.transport.doPut(lurl, data, opts);
            },
            doPatch: function (params, data, etag, returnRepresentation) {
                var lurl = _odata.urlResEntity(params, true);
                var opts = _ajax.getDefaultAjaxOptions();
                opts.headers = opts.headers || {};
                if (etag) {
                    opts.headers["If-Match"] = etag;
                }
                if (returnRepresentation)
                    opts.headers['Prefer'] = 'return=representation';
                lurl = _addTenantId(lurl);
                return _odata.transport.doPatch(lurl, data, opts);
            },
            getRessources: function (params, ondata, errors) {
                var _after = function (cd) {
                    if (ondata)
                        cd = ondata(cd);
                    return cd;
                };
                var hasEntityId = false;
                var cache = params.$cache;
                delete params.$cache;
                var config = _application.config(_application.name) || {};
                if (config.odata && config.odata.v4 != undefined) {
                    _odata.v4 = config.odata.v4;
                }
                var base = config.odata ? config.odata.base || '/data' : '/data';
                base = _utils.formatNames(base, { $module: params.$module });
                delete params.$module;
                var entity = params.$entity;
                if (params.$entityId) {
                    entity = entity + '(' + params.$entityId + ')';
                    delete params.$entityId;
                    hasEntityId = true;
                }
                if (params.$propertyName) {
                    entity = entity + '/' + params.$propertyName;
                    delete params.$propertyName;
                }
                var lurl = entity;
                delete params.$entity;
                if (!hasEntityId) {
                    if (_odata.v4) {
                        if (params.$top && !params.nocount)
                            params.$count = true;
                        delete params.nocount;
                    }
                    else {
                        params.$inlinecount = 'allpages';
                    }
                }
                var hasAggregation = false;
                if (params.$aggregation) {
                    if (params.$aggregation == "$count") {
                        lurl = lurl + "/" + params.$aggregation;
                        delete params.$aggregation;
                        hasAggregation = true;
                    }
                }
                var opts = _ajax.getDefaultAjaxOptions();
                opts.$errors = errors;
                lurl = base + '/' + lurl + Phoenix.link.object2search(params);
                if (cache && _odatacache[entity] && _odatacache[entity].uri == lurl) {
                    return new _utils.Promise(function (resolve, reject) {
                        var cd = _after((hasAggregation || hasEntityId) ? _odatacache[entity].data : $.extend(true, {}, _odatacache[entity].data));
                        resolve(cd);
                    });
                }
                lurl = _addTenantId(lurl);
                return data_2.odata.transport.doGet(lurl, opts, function (ldata) {
                    var cd = {};
                    if (_odata.v4 && ldata)
                        delete ldata['@odata.context'];
                    if (!hasAggregation && !hasEntityId) {
                        cd.documents = _odata.v4 ? ldata.value : ldata.d.results;
                        cd.dataCount = cd.documents ? cd.documents.length : 0;
                        cd.documents.forEach(function (v) {
                            delete v.__metadata;
                        });
                        if (cd) {
                            cd.pageSize = params.$top;
                            cd.skip = params.$skip || 0;
                            cd.count = _odata.v4 ? ldata["@odata.count"] : ldata.d.__count;
                            cd.nodata = cd.dataCount == 0;
                        }
                    }
                    else {
                        cd = ldata;
                    }
                    if (cache) {
                        _odatacache[entity] = {
                            uri: lurl,
                            data: hasAggregation ? cd : $.extend(true, {}, cd)
                        };
                    }
                    return _after(cd);
                }, { entity: entity, params: params });
            }
        };
        data_2.odata = _odata;
        Phoenix.authentication.registerAfterLogout(_odata.afterLogout);
    })(data = Phoenix.data || (Phoenix.data = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../core/core.ts" />
/// <reference path="./schema-provider.ts" />
/// <reference path="./rest-provider.ts" />
/// <reference path="./local-provider.ts" />
/// <reference path="./menu-provider.ts" />
/// <reference path="./odata-provider.ts" />
var Phoenix;
(function (Phoenix) {
    var data;
    (function (data) {
        var _link = Phoenix.link, _utils = Phoenix.utils, _customData = Phoenix.customData, _application = Phoenix.application, _execTransform = function (cfg, ldata) {
            if (cfg.$transform) {
                var func = _customData.get("datasets.transform." + cfg.$transform);
                if (func)
                    ldata = func(ldata);
            }
            return ldata;
        }, _execBeforeTransform = function (transform, params) {
            if (!transform)
                return params;
            var func = _customData.get("datasets.transform." + transform);
            if (func)
                return func($.extend(true, {}, params));
            return params;
        }, _registerDataProvider = function () {
            var _dataProvider = {};
            return {
                register: function (name, provider) {
                    _dataProvider[name] = provider;
                },
                get: function (name) {
                    return _dataProvider[name];
                    ;
                }
            };
        }, _rdp = _registerDataProvider(), _checkDataSetConfig = function (cfg) {
            cfg = cfg || {};
            cfg.$type = cfg.$type || "basic";
            cfg.$triggers = cfg.$triggers || ["$load"];
            return cfg;
        }, _checkValue = function (value, ct, addQuote, output) {
            if (value == null && ct) {
                switch (ct) {
                    case "number":
                        value = undefined;
                        break;
                    case "integer":
                        value = undefined;
                        break;
                    case "boolean":
                        value = undefined;
                        break;
                    case "string":
                        value = '';
                        break;
                    default:
                        value = null;
                        break;
                }
            }
            if (Array.isArray(value)) {
                if (output)
                    return value;
                else
                    return JSON.stringify(value);
            }
            if (addQuote && ct) {
                if (ct == 'string' || ct == 'date' || ct == 'datetime') {
                    if (value == null)
                        return null;
                    else {
                        if (ct == 'date' || ct == 'datetime') {
                        }
                        else
                            value = "'" + value.replace(/'/g, "''") + "'";
                    }
                }
            }
            return value;
        }, _getArrayIndexValue = function (value, s) {
            var i = s.indexOf('[');
            if (i < 0)
                return null;
            value = (i == 0) ? value : value[s.substr(0, i)];
            if (!value)
                return null;
            var sindex = s.substr(i + 1, s.length - i - 2);
            if (sindex == '*' || sindex == '')
                return value;
            var index = parseInt(sindex, 10);
            if (index < value.length)
                return value[index];
            else
                return null;
        }, _getValue = function (value, context, addQuote, output) {
            var cv = value;
            var ctx = ['$url', '$context', '$data', '$item', "$mem", "$local"];
            var vt = typeof cv, ct;
            if (vt === 'object' && cv) {
                ct = value.type;
                cv = value.value;
                vt = typeof cv;
            }
            if (vt === 'string' && cv && cv.charAt(0) == '$') {
                var segments = cv.split('.');
                var i = 0, sv = null;
                while (i < segments.length) {
                    var s = segments[i];
                    if (i == 0) {
                        var s1 = s, sarray;
                        var k = s.indexOf('[');
                        if (k > 0) {
                            sarray = s.substr(k);
                            s1 = s.substr(0, k);
                        }
                        var j = ctx.indexOf(s1);
                        if (j >= 0) {
                            sv = context[ctx[j]];
                            if (sarray)
                                segments.splice(i + 1, 0, sarray);
                        }
                        else
                            return _checkValue(cv, ct, addQuote, output);
                    }
                    else {
                        if (!sv)
                            break;
                        if (s.charAt(s.length - 1) == ']')
                            sv = _getArrayIndexValue(sv, s);
                        else {
                            if (Array.isArray(sv)) {
                                sv = sv.map(function (svi) { return svi[s]; });
                            }
                            else
                                sv = sv[s];
                        }
                    }
                    i++;
                }
                return _checkValue(sv, ct, addQuote, output);
            }
            return _checkValue(cv, ct, addQuote, output);
        }, _equals = function (o1, o2, props) {
            var i = props.length;
            while (i--) {
                if (o1[props[i]] != o2[props[i]])
                    return false;
            }
            return true;
        }, _outputData = function (def, context) {
            if (!def)
                return null;
            if (typeof def == "string") {
                return _getValue(def, context, false, true);
            }
            var res = {};
            Object.keys(def).forEach(function (name) {
                res[name] = _getValue(def[name], context, false, true);
            });
            return res;
        }, _defaultData = function (def, lurl, context, localContext) {
            return _outputData(def, {
                $url: lurl,
                $context: context,
                $data: null,
                $mem: Phoenix.$mem,
                $local: localContext
            });
        }, _internalExecTree = function (tree, lurl, context, localContext, addQuote) {
            if (tree && typeof tree === 'object' && tree.$op) {
                var rtree = {
                    $op: tree.$op,
                    $nulls: tree.$nulls,
                    $left: null,
                    $right: null
                };
                if (tree.$left != null) {
                    if (typeof tree.$left === 'object' && tree.$left.$op) {
                        rtree.$left = _internalExecTree(tree.$left, lurl, context, localContext, addQuote);
                    }
                    else {
                        rtree.$left = _getValue(tree.$left, {
                            $url: lurl,
                            $context: context,
                            $data: null,
                            $mem: Phoenix.$mem,
                            $local: localContext
                        }, false, false);
                    }
                }
                if (tree.$right != null) {
                    if (typeof tree.$right === 'object' && tree.$right.$op) {
                        rtree.$right = _internalExecTree(tree.$right, lurl, context, localContext, addQuote);
                    }
                    else {
                        rtree.$right = _getValue(tree.$right, {
                            $url: lurl,
                            $context: context,
                            $data: null,
                            $mem: Phoenix.$mem,
                            $local: localContext
                        }, addQuote, false);
                    }
                }
                return rtree;
            }
            else {
                return _getValue(tree, {
                    $url: lurl,
                    $context: context,
                    $data: null,
                    $mem: Phoenix.$mem,
                    $local: localContext
                }, addQuote, false);
            }
        }, _execTree = function (tree, lurl, context, localContext) {
            if (tree && typeof tree === 'string') {
                tree = _getValue(tree, {
                    $url: lurl,
                    $context: context,
                    $data: null,
                    $mem: Phoenix.$mem,
                    $local: localContext
                }, false, false);
            }
            return _internalExecTree(tree, lurl, context, localContext, true);
        }, _memoryTree = function (tree, lurl, context, localContext) {
            return _internalExecTree(tree, lurl, context, localContext, false);
        }, _acceptFilter = function (tree, item) {
            if (tree.$op === "eq") {
                return item[tree.$left] == tree.$right;
            }
            return false;
        }, _tree2filter = function (tree) {
            if (tree && typeof tree == 'object' && tree.$op) {
                var left = _tree2filter(tree.$left);
                var right = _tree2filter(tree.$right);
                //unary operators
                if (tree.$op === "not") {
                    return { value: 'not (' + right.value + ')', op: tree.$op };
                }
                else if (tree.$op === "in") {
                    var values = right.value.split(';');
                    var res_1 = [];
                    values.forEach(function (value) {
                        res_1.push(left.value + ' eq ' + value);
                    });
                    return { value: '(' + res_1.join(' or ') + ')', op: "in" };
                }
                else if (tree.$op === "$func")
                    return { value: left.value + '(' + right.value + ')', op: tree.$op };
                else {
                    if (tree.$nulls === "ignore" && (left.value == null || right.value == null)) {
                        if (tree.$op === "and" || tree.$op === "or") {
                            if (right.value == null)
                                return { value: left.value, op: left.op };
                            else
                                return { value: right.value, op: right.op };
                        }
                        else
                            return { value: null, op: null };
                    }
                    else {
                        var lv = left.value;
                        var rv = right.value;
                        if (tree.$op === "and") {
                            if (left.op === "or")
                                lv = '(' + lv + ')';
                            if (right.op === "or")
                                rv = '(' + rv + ')';
                        }
                        return { value: lv + ' ' + tree.$op + ' ' + rv, op: tree.$op };
                    }
                }
            }
            else
                return { value: tree, op: null };
        }, _parseTree = function (tree, lurl, context, localContext) {
            var rtree = _execTree(tree, lurl, context, localContext);
            return _tree2filter(rtree).value;
        }, _parseRestParams = function (params, lurl, context, localContext) {
            var res = { $url: null, $list: null, $query: null, $method: "GET" };
            res.$method = (params.$method || 'GET').toUpperCase();
            res.$url = params.$url;
            res.$list = params.$list;
            if (params.$query) {
                res.$query = {};
                Object.keys(params.$query).forEach(function (name) {
                    res.$query[name] = _getValue(params.$query[name], {
                        $url: lurl,
                        $context: context,
                        $data: null,
                        $mem: Phoenix.$mem,
                        $local: localContext
                    }, false, false);
                });
            }
            if (params.$method != "GET" && params.$method != "DELETE") {
                if (params.$data)
                    res.$data = _getValue(params.$data, {
                        $url: lurl,
                        $context: context,
                        $data: null,
                        $mem: Phoenix.$mem,
                        $local: localContext
                    }, false, false);
                else
                    res.$data = context || {};
            }
            return res;
        }, _parseEntityId = function (entityId, ctx) {
            if (!entityId)
                return '';
            var v = typeof entityId;
            if (v == 'object') {
                if (entityId.value && entityId.type)
                    return _getValue(entityId, ctx, false, false);
                else {
                    var l = [], hasNulls = false;
                    Object.keys(entityId).forEach(function (name) {
                        if (hasNulls)
                            return;
                        var cv = entityId[name];
                        var p = _parseEntityId(cv, ctx);
                        if (!p)
                            hasNulls = true;
                        l.push(p);
                    });
                    if (hasNulls)
                        return '';
                    return l.join(', ');
                }
            }
            else
                return _getValue(entityId, ctx, false, false);
        }, _isEntityIdNull = function (v) {
            return (v === undefined || v === null || v === '');
        }, _parseODataParams = function (params, lurl, context, localContext) {
            if (!params)
                return null;
            var res = {};
            var ctx = {
                $url: lurl,
                $context: context,
                $data: null,
                $mem: Phoenix.$mem,
                $local: localContext,
            };
            Object.keys(params).forEach(function (name) {
                if (name === '$search')
                    return;
                else if (name === '$entity')
                    res.$entity = _getValue(params.$entity, ctx, false, false);
                else if (name === '$entityId') {
                    var hasKeyNull_1 = false;
                    var v = typeof params.$entityId;
                    if (v === 'object') {
                        if (params.$entityId.value && params.$entityId.type) {
                            var v_1 = _getValue(params.$entityId, ctx, false, false);
                            hasKeyNull_1 = _isEntityIdNull(v_1);
                            res[name] = v_1;
                        }
                        else {
                            var l_1 = [];
                            Object.keys(params.$entityId).forEach(function (element) {
                                var v = _getValue(params.$entityId[element], ctx, false, false);
                                if (!hasKeyNull_1)
                                    hasKeyNull_1 = _isEntityIdNull(v);
                                l_1.push(element + '=' + v);
                            });
                            res[name] = l_1.join(', ');
                        }
                    }
                    else {
                        var v_2 = _getValue(params[name], ctx, false, false);
                        hasKeyNull_1 = _isEntityIdNull(v_2);
                        res[name] = v_2;
                    }
                    if (hasKeyNull_1) {
                        res.$entityIdNull = true;
                    }
                }
                else if (name == "$aggregation" && params.$aggregation)
                    res.$aggregation = params.$aggregation;
                else if (name == "$groupby" && params.$groupby)
                    res.$groupby = params.$groupby;
                else if (name == "$filter" && params.$filter) {
                    res.$filter = _parseTree(params.$filter, lurl, context, localContext);
                    if (!res.$filter)
                        delete res.$filter;
                }
                else {
                    if (params[name])
                        res[name] = _getValue(params[name], ctx, false, false);
                }
            });
            if (params.$search && context && context.$searchText) {
                var v = _checkValue(context.$searchText, 'string', true, false), filter;
                var search = Array.isArray(params.$search) ? params.$search : [params.$search];
                if (search.length == 1) {
                    filter = Phoenix.utils.format('contains({0},{1})', params.$search.field, v);
                }
                else {
                    var af = ['('];
                    var len = search.length;
                    for (var i = 0; i < len; i++) {
                        af.push(Phoenix.utils.format('contains({0},{1})', search[i].field, v));
                        if (i < (len - 1))
                            af.push(' or ');
                    }
                    af.push(')');
                    filter = af.join('');
                }
                if (res.$filter)
                    res.$filter = res.$filter + ' and ' + filter;
                else
                    res.$filter = filter;
            }
            return res;
        }, _extractValue = function (value) {
            value = value || '';
            var ctx = _link.context();
            return _getValue(value, ctx, false, false);
        }, _execBasic = function (config, lurl, context, callerObject) {
            var local = callerObject && callerObject.getLocalContext ? callerObject.getLocalContext() : null;
            var cd, ldata = _defaultData(config.$data, lurl, context, local);
            if (config.$params && config.$params.dataProvider) {
                var hnd = Phoenix.customData.get(config.$params.dataProvider);
                if (hnd)
                    context = hnd(context, callerObject);
            }
            if (config.$output) {
                ldata = _defaultData(config.$data, lurl, context, local);
                cd = _outputData(config.$output, {
                    $url: lurl,
                    $context: context,
                    $data: ldata,
                    $mem: Phoenix.$mem,
                    $local: local
                });
            }
            else
                cd = context;
            cd = _execTransform(config, cd);
            return new Phoenix.utils.Promise(function (resolve, reject) {
                resolve(cd);
            });
        }, _execWSchema = function (config, lurl, context, callerObject) {
            var name = config.$params.name;
            return data.schema.get(name, config.$params.localization, undefined);
        }, _execMenu = function (config, lurl, context, callerObject) {
            var name = config.$params.name;
            return data.menu.get(name, config.$params.localization, undefined);
        }, _execOData = function (config, lurl, context, callerObject) {
            var method = config.$method || 'GET';
            var local = callerObject && callerObject.getLocalContext ? callerObject.getLocalContext() : null;
            var tp = _execBeforeTransform(config.$beforeExecute, config.$params);
            var params = _parseODataParams(tp, lurl, context, local);
            if (method) {
                method = _getValue(method, context, false, false);
                method = method.toUpperCase();
            }
            if (params.$entityIdNull) {
                delete params.$entityIdNull;
                if (method === 'GET' && config.$create) {
                    var rdata = $.extend(true, {}, config.$create);
                    rdata.$create = true;
                    return _utils.Promise.resolve(rdata);
                }
            }
            if (method) {
                switch (method) {
                    case "DELETE":
                        return data.odata.doDelete(params, context.etag ? context.etag : null);
                    case "POST":
                        return data.odata.doPost(params, context);
                    case "PUT":
                        var etagput = context["@odata.etag"];
                        delete context["@odata.etag"];
                        var irput = context["@odata.return"] != null;
                        delete context["@odata.return"];
                        return data.odata.doPut(params, context, etagput, irput);
                    case "PATCH":
                        var etagpatch = context["@odata.etag"];
                        delete context["@odata.etag"];
                        var irpatch = context["@odata.return"] != null;
                        delete context["@odata.return"];
                        return data.odata.doPatch(params, context, etagpatch, irpatch);
                }
            }
            var defData = _defaultData(config.$data, lurl, context, local);
            var multipleDocs = true;
            if (params.$aggregation)
                multipleDocs = false;
            var cfg = _application.config(_application.name) || {};
            if (config.$cache === undefined) {
                if (cfg.odata && cfg.odata.cache !== undefined) {
                    cfg.odata.cache = cfg.odata.cache;
                }
                else {
                    cfg.odata = cfg.odata || {};
                    cfg.odata.cache = true;
                }
            }
            if (context) {
                if (context.hasOwnProperty('$skip') && context.$skip)
                    params.$skip = context.$skip;
                if (context.hasOwnProperty('$top') && context.$top)
                    params.$top = context.$top;
            }
            return data.odata.getRessources(params, function (ldata) {
                if (multipleDocs && (!ldata || !ldata.documents || !ldata.documents.length) && defData) {
                    ldata.documents = ldata.documents || [];
                    ldata.documents.push(defData);
                }
                if (context) {
                    if (context.hasOwnProperty('$searchText')) {
                        ldata.searchText = context.$searchText;
                    }
                }
                var cd = ldata;
                if (config.$output)
                    cd = _outputData(config.$output, {
                        $url: lurl,
                        $context: context,
                        $data: ldata,
                        $mem: Phoenix.$mem,
                        $local: local
                    });
                cd = _execTransform(config, cd);
                return cd;
            }, config.$errors);
        }, _execLocal = function (config, lurl, context, callerObject) {
            var local = callerObject && callerObject.getLocalContext ? callerObject.getLocalContext() : null;
            var params = _parseRestParams(config.$params, lurl, context, local);
            return data.local.getRessources(params, function (ldata) {
                var cd = ldata;
                if (config.$output)
                    cd = _outputData(config.$output, {
                        $url: lurl,
                        $context: context,
                        $data: ldata,
                        $mem: Phoenix.$mem,
                        $local: local
                    });
                cd = _execTransform(config, cd);
                return cd;
            });
        }, _execRest = function (config, lurl, context, callerObject) {
            var local = callerObject && callerObject.getLocalContext ? callerObject.getLocalContext() : null;
            var tp = _execBeforeTransform(config.$beforeExecute, config.$params);
            var params = _parseRestParams(tp, lurl, context, local);
            return data.rest.getRessources(params, function (ldata) {
                var cd = ldata;
                if (config.$output)
                    cd = _outputData(config.$output, {
                        $url: lurl,
                        $context: context,
                        $data: ldata,
                        $mem: Phoenix.$mem,
                        $local: local
                    });
                cd = _execTransform(config, cd);
                return cd;
            });
        }, _emitList = function (config) {
            var res = [];
            if (config.$emit) {
                if (config.$emit.$loaded || config.$emit.$changed) {
                    if (config.$emit.$loaded)
                        res.push(config.$emit.$loaded.$name);
                    if (config.$emit.$changed)
                        res.push(config.$emit.$changed.$name);
                }
                else
                    res.push(config.$emit);
            }
            return res;
        };
        data.execData = function (config, context, callerObject) {
            var lurl = _link.search(null, false);
            if (!config)
                return null;
            switch (config.$type) {
                case "basic":
                    return _execBasic(config, lurl, context, callerObject);
                case "odata":
                    return _execOData(config, lurl, context, callerObject);
                case "rest":
                    return _execRest(config, lurl, context, callerObject);
                case "local":
                    return _execLocal(config, lurl, context, callerObject);
                default:
                    var provider = _rdp.get(config.$type);
                    if (provider)
                        return provider(config, lurl, context, callerObject);
                    break;
            }
            return null;
        };
        var DataSet = (function () {
            function DataSet(config) {
                var that = this;
                that.config = _checkDataSetConfig(config);
                if (config.$default)
                    that.defaultDataset = true;
                if (that.config.$autoselect)
                    that.autoselect = true;
                that._emitters = _emitList(that.config);
                that.selectedIndex = -1;
            }
            DataSet.prototype.execute = function (context, callerObject) {
                var that = this;
                var lurl = _link.search(null, false);
                switch (that.config.$type) {
                    case "basic":
                        return _execBasic(that.config, lurl, context, callerObject);
                    case "odata":
                        return _execOData(that.config, lurl, context, callerObject);
                    case "rest":
                        return _execRest(that.config, lurl, context, callerObject);
                    case "local":
                        return _execLocal(that.config, lurl, context, callerObject);
                    case "menu":
                        return _execMenu(that.config, lurl, context, callerObject);
                    case "widget-schema":
                        return _execWSchema(that.config, lurl, context, callerObject);
                    default:
                        var provider = _rdp.get(that.config.$type);
                        if (provider)
                            return provider(that.config, lurl, context, callerObject);
                        break;
                }
                throw "Invalid dataset type";
            };
            DataSet.prototype.enumTriggers = function (addLoad, cb) {
                var that = this;
                if (that.config.$triggers) {
                    that.config.$triggers.forEach(function (tn) {
                        if (addLoad || tn != "$load") {
                            cb(tn);
                        }
                    });
                }
            };
            DataSet.prototype.enumEmitters = function (cb) {
                var that = this;
                that._emitters.forEach(cb);
            };
            DataSet.prototype.hasCustomEvents = function () {
                var that = this;
                if (that.config.$triggers) {
                    var t = that.config.$triggers;
                    if (t.length > 1)
                        return true;
                    return (t[0] != "$load");
                }
                return false;
            };
            DataSet.prototype.canExecute = function (event, context) {
                var that = this;
                if (that.config.$condition) {
                    var val = _getValue(that.config.$condition, context, false, true);
                    if (!val || val === "false")
                        return false;
                }
                return that.config.$triggers.indexOf(event) >= 0;
            };
            DataSet.prototype.data2Output = function (def, context) {
                return _outputData(def, context);
            };
            DataSet.prototype.destroy = function () {
                Phoenix.utils.log("Destroy Dataset", "destroy");
            };
            DataSet.prototype._findSelectedOData = function (ldata) {
                var that = this;
                if (ldata.documents) {
                    var index = -1;
                    var found = null;
                    if (that.config.$autoselect && typeof that.config.$autoselect == 'object') {
                        var context = {
                            $url: _link.search(null, false),
                            $mem: Phoenix.$mem
                        };
                        var memData = _outputData(that.config.$autoselect, context);
                        var props = Object.keys(memData);
                        for (var i = 0, len = ldata.documents.length; i < len; i++) {
                            var d = ldata.documents[i];
                            if (_equals(d, memData, props)) {
                                found = d;
                                index = i;
                                break;
                            }
                        }
                    }
                    return found ? {
                        item: found,
                        index: index
                    } : (ldata.documents.length ? {
                        item: ldata.documents[0],
                        index: 0
                    } : {
                        item: null,
                        index: -1
                    });
                }
                return {
                    item: null,
                    index: -1
                };
            };
            DataSet.prototype._findSelected = function (ldata) {
                var that = this;
                switch (that.config.$type) {
                    case "odata":
                    case "rest":
                        return that._findSelectedOData(ldata);
                    default:
                        {
                            return {
                                item: ldata,
                                index: 0
                            };
                        }
                }
            };
            DataSet.prototype.doAutoSelect = function (d, select) {
                var that = this;
                that.selectedIndex = -1;
                if (!that.config.$autoselect)
                    return;
                if (!d || d.nodata)
                    return select(null);
                var s = that._findSelected(d);
                that.selectedIndex = s.index;
                select(s.item);
            };
            return DataSet;
        }());
        data.DataSet = DataSet;
        data.registerDataProvider = _rdp.register;
        data.compileFilterTree = _memoryTree;
        data.acceptFilter = _acceptFilter;
        data.extractValue = _extractValue;
        data.test = { output: _outputData };
    })(data = Phoenix.data || (Phoenix.data = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../core/core.ts" />
var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        var _dom = Phoenix.dom, _locale = Phoenix.locale, 
        // Create page object used in template
        _makePage = function (ii, text, icon, isActive, isDisabled) {
            return {
                number: ii,
                text: text,
                icon: icon,
                active: isActive,
                disabled: isDisabled
            };
        }, _getPages = function (currentPage, totalPages, options) {
            var pages = [];
            // Default page limits
            var startPage = 1, endPage = totalPages;
            var isMaxSized = (options.maxSize && options.maxSize < totalPages);
            // recompute if maxSize
            if (isMaxSized) {
                if (options.rotate) {
                    // Current page is displayed in the middle of the visible ones
                    startPage = Math.max(currentPage - Math.floor(options.maxSize / 2), 1);
                    endPage = startPage + options.maxSize - 1;
                    // Adjust if limit is exceeded
                    if (endPage > totalPages) {
                        endPage = totalPages;
                        startPage = endPage - options.maxSize + 1;
                    }
                }
                else {
                    // Visible pages are paginated with maxSize
                    startPage = ((Math.ceil(currentPage / options.maxSize) - 1) * options.maxSize) + 1;
                    // Adjust last page if limit is exceeded
                    endPage = Math.min(startPage + options.maxSize - 1, totalPages);
                }
            }
            // Add page number links
            for (var ii = startPage; ii <= endPage; ii++) {
                var page = _makePage(ii, ii, null, ii === currentPage, false);
                pages.push(page);
            }
            // Add links to move between page sets
            if (isMaxSized && !options.rotate) {
                if (startPage > 1) {
                    var previousPageSet = _makePage(startPage - 1, '...', null, false, false);
                    pages.unshift(previousPageSet);
                }
                if (endPage < totalPages) {
                    var nextPageSet = _makePage(endPage + 1, '...', null, false, false);
                    pages.push(nextPageSet);
                }
            }
            var p;
            //Add Previous
            if (options.directionLinks) {
                p = _makePage('prev', null, 'chevron-left', false, currentPage == 1);
                pages.unshift(p);
            }
            //Add First
            if (options.boundaryLinks) {
                p = _makePage('first', null, 'backward', false, currentPage == 1);
                pages.unshift(p);
            }
            //Add Next
            if (options.directionLinks) {
                p = _makePage('next', null, 'chevron-right', false, currentPage == totalPages);
                pages.push(p);
            }
            //Add last
            if (options.boundaryLinks) {
                p = _makePage('last', null, 'forward', false, currentPage == totalPages);
                pages.push(p);
            }
            return pages;
        };
        var Pager = (function () {
            function Pager(options) {
                var that = this, defOptions = {
                    boundaryLinks: false,
                    directionLinks: true,
                    rotate: true,
                    maxSize: 4,
                    size: "lg"
                };
                that._options = $.extend(defOptions, options || {});
                that.pages = [];
                that._updating = false;
                that.visible = false;
                that.props = {};
                that.data = {
                    currentPage: -1,
                    totalPages: 0
                };
                that._defineProps();
            }
            Pager.prototype._defineProps = function () {
                var that = this, _dp = Phoenix.utils.defineProperty;
                _dp("currentPage", that);
                _dp("totalPages", that);
            };
            Pager.prototype._notifyChange = function (propertyName) {
                var that = this;
                switch (propertyName) {
                    case "currentPage":
                        that._changed = true;
                        that._updatePages();
                        break;
                    case "totalPages":
                        that._changed = true;
                        if (that.data.currentPage >= 0)
                            that._updatePages();
                        break;
                }
            };
            Pager.prototype._renderPager = function () {
                var that = this;
                var e = that.$element.get(0);
                if (that.visible) {
                    var frag = document.createDocumentFragment();
                    var p = $('<li><a href></a><li>').get(0);
                    var span = document.createElement("span");
                    that.pages.forEach(function (page) {
                        var ii = p.cloneNode(true);
                        if (page.icon) {
                            var sp = span.cloneNode(true);
                            _dom.attr(sp, "class", _dom.iconClass(page.icon));
                            _dom.attr(sp, "page", page.number);
                            _dom.append(ii.firstChild, sp);
                        }
                        if (page.text)
                            _dom.text(ii.firstChild, page.text);
                        _dom.attr(ii, "page", page.number);
                        _dom.attr(ii.firstChild, "page", page.number);
                        if (page.disabled)
                            _dom.addClass(ii, 'disabled');
                        if (page.active)
                            _dom.addClass(ii, 'active');
                        frag.appendChild(ii);
                    });
                    that.$element.empty();
                    e.appendChild(frag);
                    _dom.removeClass(e, 'bs-none');
                }
                else
                    _dom.addClass(e, 'bs-none');
            };
            Pager.prototype._updatePages = function () {
                var that = this;
                if (that._updating)
                    return;
                that.pages = _getPages(that.data.currentPage, that.data.totalPages, that._options);
                that.visible = that.data.currentPage > 0 && that.data.totalPages > 1;
                var t = 5;
                if (!that._options.boundaryLinks)
                    t = t - 2;
                if (!that._options.directionLinks)
                    t = t - 2;
                that.visible = that.pages.length > t;
                if (that.$element) {
                    that._renderPager();
                }
            };
            Pager.prototype._setEvents = function () {
                var that = this;
                if (that.$element) {
                    that.$element.on('click', function (event) {
                        var target = event.target;
                        var page = _dom.attr(target, "page");
                        if (page) {
                            event.preventDefault();
                            event.stopPropagation();
                            if (_dom.hasClass(target, 'disabled') || _dom.hasClass(target.parentNode, 'disabled'))
                                return;
                            if (that._options.selectPage) {
                                var pn = parseInt(page, 10);
                                that._options.selectPage(isNaN(pn) ? page : pn);
                            }
                        }
                    });
                }
            };
            Pager.prototype._removeEvents = function () {
                var that = this;
                if (that.$element)
                    that.$element.off('click');
            };
            Pager.prototype.updating = function (value) {
                var that = this;
                that._updating = value;
                if (value) {
                    that._changed = false;
                }
                else {
                    if (that._changed) {
                        that._changed = false;
                        that._updatePages();
                    }
                }
            };
            Pager.prototype.render = function ($parent) {
                var that = this;
                if (!that.$element) {
                    that.$element = $('<ul class="pagination' + (that._options.size != 'default' ? (' pagination-' + that._options.size) : '') + '"></ul>');
                    that._renderPager();
                    that._setEvents();
                }
                if ($parent) {
                    if (that._options.replaceParent)
                        $parent.replaceWith(that.$element);
                    else
                        $parent.append(that.$element);
                }
            };
            Pager.prototype.destroy = function () {
                var that = this;
                that._removeEvents();
                that.$element = null;
                that._options = null;
            };
            return Pager;
        }());
        ui.Pager = Pager;
        ;
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../core/core.ts" />
var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        var _error = [
            '<div role="alert" class="bs-error alert alert-danger alert-dismissible fade in">',
            '<button aria-label="{0}" data-dismiss="alert" class="close" type="button"><span aria-hidden="true">×</span></button>',
            '<h4 >{1}</h4>',
            '<p>{2}</p>',
            '<p>',
            '<a class="bs-button btn btn-default" href="{4}" role="button">{3}</a>',
            '</p>',
            '</div>'
        ];
        var _loading = [
            '<div class="bs-loader"></div>'
        ];
        var _cp = null, _history = Phoenix.history, _utils = Phoenix.utils, _external = Phoenix.external, _dom = Phoenix.dom, _link = Phoenix.link, _locale = Phoenix.locale, _application = Phoenix.application, _datasetsInfo = function (datasets) {
            var cfg = {
                emit: false,
                listen: true,
                triggers: [],
                emitters: []
            };
            Object.keys(datasets).forEach(function (dsn) {
                if (dsn == "view")
                    return;
                var ds = datasets[dsn];
                if (ds.config.$emit) {
                    ds.enumEmitters(function (event) {
                        cfg.emit = true;
                        cfg.emitters.push(event);
                    });
                }
                ds.enumTriggers(false, function (tn) {
                    cfg.listen = true;
                    if (cfg.triggers.indexOf(tn) < 0)
                        cfg.triggers.push(tn);
                });
            });
            return cfg;
        };
        var PageControl = (function () {
            function PageControl() {
                var that = this;
                that.childs = [];
                that.data = {
                    $title: '',
                    $menuleft: false,
                    $menutop: false,
                    $menuright: false,
                    $menubottom: false,
                    $hasBack: _history.hasBack(),
                    $user: {}
                };
                that.errors = [];
                that.props = {};
                that.popup = null;
                that._defineProps();
                that._setEvents();
                _external.historyChangedHandler = that._historyChanged.bind(that);
            }
            PageControl.prototype._defineProps = function () {
                var self = this, _dp = _utils.defineProperty;
                _dp("$title", self);
                _dp("$menuleft", self);
                _dp("$menutop", self);
                _dp("$menuright", self);
                _dp("$menubottom", self);
                _dp("$hasBack", self);
                _dp("$user", self);
            };
            PageControl.prototype.currentPage = function () {
                var that = this;
                var l = that.childByType("layout");
                if (l)
                    return l.data.name || "";
                return "";
            };
            PageControl.prototype.emittersFor = function (events) {
                var that = this, res = [], len = events.length;
                if (that.dataListeners) {
                    that.dataListeners.forEach(function (module) {
                        if (!module.listener.disabled && module.emit) {
                            var emitEvent = false;
                            for (var i = 0; i < len; i++) {
                                if (module.emitters.indexOf(events[i]) >= 0) {
                                    emitEvent = true;
                                }
                            }
                            if (emitEvent) {
                                res.push(module.listener);
                            }
                        }
                    });
                }
                return res;
            };
            PageControl.prototype._historyChanged = function () {
                this.props.$hasBack = _history.hasBack();
            };
            PageControl.prototype._notifyChange = function (propertyName) {
                var that = this;
                that._notifyChildren(propertyName, that.data[propertyName]);
            };
            PageControl.prototype._notifyChildOnAdd = function (child) {
                var that = this;
                if (child && child.onPageChange) {
                    Object.keys(that.props).forEach(function (pn) {
                        child.onPageChange(pn, that.props[pn]);
                    });
                }
            };
            PageControl.prototype._notifyChildren = function (propName, value) {
                var that = this;
                that.childs.forEach(function (cd) {
                    var c = cd.child;
                    if (c && c.onPageChange)
                        c.onPageChange(propName, value);
                });
            };
            PageControl.prototype.registerDataListener = function (value, parent) {
                var that = this;
                that.dataListeners = that.dataListeners || [];
                if (!value.datasets)
                    return;
                var config = _datasetsInfo(value.datasets);
                if (config.emit || config.listen) {
                    that.dataListeners.push({
                        listener: value,
                        parent: parent,
                        triggers: config.triggers,
                        listen: config.listen,
                        emitters: config.emitters,
                        emit: config.emit
                    });
                }
            };
            PageControl.prototype.removeDataListener = function (listener) {
                var that = this;
                if (!that.dataListeners)
                    return;
                var i = that.dataListeners.length;
                while (i--) {
                    var ci = that.dataListeners[i];
                    if (ci.listener == listener) {
                        that.dataListeners.splice(i, 1);
                    }
                }
            };
            PageControl.prototype.removeParentDataListener = function (parent) {
                var that = this;
                if (!that.dataListeners)
                    return;
                var i = that.dataListeners.length;
                while (i--) {
                    var ci = that.dataListeners[i];
                    if (ci.parent == parent) {
                        that.dataListeners.splice(i, 1);
                    }
                }
            };
            PageControl.prototype.emitDataEvent = function (event, value, filter) {
                var that = this;
                if (that.dataListeners) {
                    that.dataListeners.forEach(function (mod) {
                        if (filter && filter.indexOf(mod.listen) < 0)
                            return;
                        if (mod.listen && (mod.triggers.indexOf(event) >= 0) &&
                            mod.listener && mod.listener.dataEvent) {
                            if (mod.listener.ds_storeLastEvent)
                                mod.listener.ds_storeLastEvent(event, value);
                            if (!mod.listener.disabled) {
                                mod.listener.dataEvent(event, value);
                            }
                        }
                    });
                }
            };
            PageControl.prototype.childByType = function (ct) {
                var that = this;
                for (var i = 0, len = that.childs.length; i < len; i++) {
                    var c = that.childs[i];
                    if (c.type == ct)
                        return c.child;
                }
                return null;
            };
            PageControl.prototype.addChild = function (type, child) {
                var that = this;
                that.childs.push({
                    child: child,
                    type: type
                });
                that._notifyChildOnAdd(child);
            };
            PageControl.prototype.removeChild = function (child) {
                var that = this;
                var i = that.childs.length;
                while (i--) {
                    var ci = that.childs[i];
                    if (ci.child == child) {
                        that.childs.splice(i, 1);
                        break;
                    }
                }
            };
            PageControl.prototype.destroy = function () {
                var that = this;
                _external.historyChangedHandler = null;
                that._hideErrors(true);
                that._hideLoading();
                if (that.childs) {
                    var i = that.childs.length;
                    while (i--) {
                        var ci = that.childs[i];
                        that.removeDataListener(ci.child);
                    }
                    that.childs = null;
                }
                that.dataListeners = null;
                that._removeEvents();
            };
            PageControl.prototype._setEvents = function () {
                var that = this;
                $(document).on("mousedown touchstart", function (event) {
                    that._closePopup(event);
                });
                window.onerror = function (message, filename, lineno, colno, error) {
                    if (!error && filename) {
                        error = { filename: filename, lineno: lineno || 0, colno: colno || 0 };
                    }
                    if (!that.$error) {
                        that.lastError = {
                            message: message,
                            stack: error ? error.stack : null,
                            stackError: error && error.stack ? null : error
                        };
                        that._showErrors();
                    }
                };
            };
            PageControl.prototype._hideErrors = function (remove) {
                var that = this;
                if (that.$error) {
                    that.$error.off('closed.bs.alert');
                    if (remove)
                        that.$error.remove();
                    that.$error = null;
                }
            };
            PageControl.prototype._showErrors = function () {
                var that = this;
                var errorParent = _dom.find(null, "error_box");
                if (!errorParent)
                    return;
                if (!that.$error) {
                    var mailUrl = ["mailto:"];
                    mailUrl.push(_application.support);
                    mailUrl.push("?subject=" + encodeURIComponent(_application.title));
                    mailUrl.push("&body=");
                    var ctx = _link.context();
                    var d = new Date();
                    mailUrl.push(encodeURIComponent(_locale.errors.ErrorTitle + ' '));
                    mailUrl.push(encodeURIComponent(that.lastError.message));
                    mailUrl.push(encodeURIComponent('\n\n' + _locale.errors.ErrorUser + ' '));
                    mailUrl.push(encodeURIComponent(ctx.$user.name));
                    mailUrl.push(encodeURIComponent('\n\n' + _locale.errors.ErrorDate + ' '));
                    mailUrl.push(encodeURIComponent(d.toLocaleString()));
                    mailUrl.push(encodeURIComponent('\n\n' + _locale.errors.Browser + ' '));
                    mailUrl.push(encodeURIComponent(navigator.userAgent));
                    mailUrl.push(encodeURIComponent('\n\n' + _locale.errors.ErrorURI + ' '));
                    mailUrl.push(encodeURIComponent(window.location.href));
                    if (that.lastError.stack || that.lastError.stackError) {
                        mailUrl.push(encodeURIComponent('\n\n' + _locale.errors.Stack + '\n'));
                        if (that.lastError.stack)
                            mailUrl.push(encodeURIComponent(that.lastError.stack));
                        else
                            mailUrl.push(encodeURIComponent(JSON.stringify(that.lastError.stackError)));
                    }
                    mailUrl.push(encodeURIComponent('\n\n' + _locale.errors.Context + ' '));
                    mailUrl.push(encodeURIComponent(JSON.stringify(ctx)));
                    that.$error = $(_utils.format(_error.join(''), _locale.ui.Close, _locale.errors.Title, that.lastError.message, _locale.errors.SendMail, mailUrl.join('')));
                    that.$error.on('closed.bs.alert', function () {
                        that._hideErrors(false);
                    });
                    errorParent.appendChild(that.$error.get(0));
                }
            };
            PageControl.prototype._hideLoading = function () {
                var that = this;
                if (that.$loading) {
                    that.$loading.remove();
                    that.$loading = null;
                }
            };
            PageControl.prototype._showLoading = function () {
                var that = this;
                var errorParent = document.body;
                if (!errorParent)
                    return;
                if (!that.$loading) {
                    that.$loading = $(_loading.join(''));
                    errorParent.appendChild(that.$loading.get(0));
                }
            };
            PageControl.prototype.loading = function (show) {
                var that = this;
                if (show)
                    that._showLoading();
                else
                    that._hideLoading();
            };
            PageControl.prototype._removeEvents = function () {
                $(document).off("mousedown touchstart");
            };
            PageControl.prototype._closePopup = function (event) {
                var that = this;
                if (that.popup) {
                    if (!event || (that.popup.inPopup && !that.popup.inPopup(event.originalEvent ? event.originalEvent.target : event.target))) {
                        if (that.popup.hide)
                            that.popup.hide(event ? (event.originalEvent ? event.originalEvent.target : event.target) : null);
                        that.popup = null;
                    }
                }
            };
            PageControl.prototype.setPopup = function (popup) {
                var that = this;
                that._closePopup(null);
                that.popup = popup;
            };
            return PageControl;
        }());
        ui.PageControl = PageControl;
        function Page() {
            if (!_cp)
                _cp = new PageControl();
            return _cp;
        }
        ui.Page = Page;
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../core/core.ts" />
var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        var _utils = Phoenix.utils, _ulocale = Phoenix.ulocale, _locale = Phoenix.locale, _dom = Phoenix.dom;
        var _patternButton = function (options) {
            if (options.pattern == "close") {
                var closeOpt = { "close": true, "type": "default", name: "close", "title": _locale.ui.Close };
                return $.extend({}, closeOpt, options);
            }
            else if (options.pattern == "validate") {
                var validateOpt = { "close": false, "type": "success", name: "validate", "title": _locale.ui.Validate };
                return $.extend({}, validateOpt, options);
            }
            return options;
        };
        var _renderButton = function (options, html, locale) {
            //options name, type, icon, title, cancel
            options = _patternButton(options);
            html.push('<button data-action="' + options.name + '" type="button"');
            html.push(' class="bs-btn-inline pull-right bs-button btn btn-' + options.type || 'default');
            html.push('"');
            if (options.close)
                html.push(' data-dismiss="modal"');
            html.push('>');
            if (options.icon) {
                html.push('<span class="' + _dom.iconClass(options.icon) + '"></span>');
                if (options.title)
                    html.push('&nbsp;');
            }
            html.push(_ulocale.tt(options.title || '', locale));
            html.push('</button>');
        };
        var _createModal = function (options, locale) {
            var html = [
                '<div class="modal fade" data-backdrop = "static"  id="{0}" tabindex="-1" role="dialog" aria-labelledby="{0}_label">',
                '	<div class="modal-dialog' + (options.size ? (' modal-' + options.size) : '') + '" role="document">',
                '		<div class="modal-content">',
                '		<div class="modal-header">',
                '			<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
                '			<h4 class="modal-title" id="{0}_label">{1}</h4>',
                '		</div>',
                '		<div class="modal-body" id="{0}_body">',
                '		</div>',
                '		<div class="modal-footer"  id="{0}_footer">'
            ];
            if (options.buttons)
                options.buttons.forEach(function (btn) {
                    _renderButton(btn, html, locale);
                });
            html.push('		</div>');
            html.push('		</div>');
            html.push('	</div>');
            html.push('</div>');
            return _utils.format(html.join(''), options.id, _ulocale.tt(options.title, locale));
        };
        var Modal = (function () {
            function Modal(options, locale) {
                this.options = options || {};
                ;
                this.$id = _utils.allocID();
                this.$locale = locale;
            }
            Modal.prototype._removeEvents = function () {
                var that = this;
                that.$element.off('click');
                that.$element.off('hidden.bs.modal');
            };
            Modal.prototype._execAction = function (name) {
                var that = this;
                if (that._clickHnd) {
                    that._clickHnd(name);
                }
            };
            Modal.prototype._addEvents = function () {
                var that = this;
                that.$element.on('hide.bs.modal', function (e) {
                    if (that._inProcessing) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                });
                that.$element.on('hidden.bs.modal', function (e) {
                    that._clear();
                });
                that.$element.on('click', function (e) {
                    if (!that.$element)
                        return;
                    var t = e.target, root = that.$element.get(0);
                    while (t) {
                        var action = t.getAttribute('data-action');
                        if (action) {
                            return _utils.focusDelay(function () {
                                return that._execAction(action);
                            });
                        }
                        t = (t == root) ? null : t.parentNode;
                    }
                });
            };
            Modal.prototype._clear = function () {
                var that = this;
                if (that.$element) {
                    that._removeEvents();
                    if (that.render)
                        that.render.destroy();
                    that.$element.remove();
                    that.$element = null;
                }
                that.render = null;
            };
            Modal.prototype.processing = function (value) {
                var that = this;
                that._inProcessing = value;
                _dom.processing(value);
                if (that.render && that.render.processing)
                    that.render.processing(value);
            };
            Modal.prototype.on = function (hnd) {
                this._clickHnd = hnd;
            };
            Modal.prototype.close = function () {
                var that = this;
                if (that.$element)
                    that.$element.modal('hide');
            };
            Modal.prototype.open = function () {
                var that = this;
                var opts = { id: that.$id, title: that.options.title || '', buttons: that.options.buttons || [], size: 0 };
                if (that.options.size)
                    opts.size = that.options.size;
                if (!that.$element) {
                    that.$element = $(_createModal(opts, that.$locale));
                    if (that.render)
                        that.render.render($(_dom.find(that.$element.get(0), that.$id + '_body')));
                    _dom.append(document.body, that.$element.get(0));
                    that.$element.modal({});
                    that._addEvents();
                }
            };
            Modal.prototype.destroy = function () {
                var that = this;
                that._clear();
            };
            return Modal;
        }());
        ui.Modal = Modal;
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../core/core.ts" />
/// <reference path="../data/datasets.ts" />
//TODO: config.$resources || config.$schema --> config.$resources
var Phoenix;
(function (Phoenix) {
    var DatasetPlugin;
    (function (DatasetPlugin) {
        var _data = Phoenix.data, _link = Phoenix.link, _mem = Phoenix.$mem, _utils = Phoenix.utils, _updateMem = function (that, ds, value, prop) {
            if (ds.config.$emit[prop].$updateMem) {
                var patchMem = ds.data2Output(ds.config.$emit[prop].$updateMem, {
                    $item: value
                });
                _mem = $.extend(_mem, patchMem);
            }
            if (ds.config.$emit[prop].$updateLocal) {
                var local = that.getLocalContextHandler ? that.getLocalContextHandler() : null;
                if (local) {
                    var patchLocal = ds.data2Output(ds.config.$emit[prop].$updateLocal, {
                        $item: value
                    });
                    local = $.extend(local, patchLocal);
                }
            }
        }, _ds_exec = function (thisObject, event, context, dst, after, datasets, notify, contextByDs) {
            var _ctxByName = function (name) {
                return contextByDs ? (context ? context[name] : null) : context;
            };
            var that = thisObject;
            var list = [], names = [], res = dst || {}, isLoad = event == "$load", indexDefault = -1;
            var _pushDataset = function (dsName, dsnames, ctx) {
                if (!that || !that.datasets)
                    return;
                var ds = that.datasets[dsName];
                if (ds) {
                    list.push(ds.execute(ctx, that));
                    names.push(dsName);
                    if (ds.defaultDataset)
                        indexDefault = dsnames.length - 1;
                }
            };
            if (datasets) {
                if (datasets && Array.isArray(datasets)) {
                    datasets.forEach(function (dataset) {
                        if (typeof dataset === "object") {
                            if (dataset.name) {
                                list.push(_data.execData(dataset, _ctxByName(dataset.name), that));
                                names.push(dataset.name);
                            }
                        }
                        else
                            _pushDataset(dataset, names, _ctxByName(dataset));
                    });
                }
                else {
                    _pushDataset(datasets, names, _ctxByName(datasets));
                }
            }
            else if (that && that.datasets) {
                Object.keys(that.datasets).forEach(function (dataset) {
                    var ds = that.datasets[dataset];
                    var lurl = _link.search(null, false);
                    var ctx = that.ds_context();
                    if (ds && ds.canExecute(event, ctx))
                        _pushDataset(dataset, names, _ctxByName(dataset));
                });
            }
            if (list.length) {
                if (that && that.loadingHandler)
                    that.loadingHandler(true);
                _utils.Promise.all(list).then(function (resdata) {
                    var menus = [];
                    names.forEach(function (name, index) {
                        var d = resdata[index];
                        if (index == indexDefault) {
                            if (that && that.noDataHandler)
                                that.noDataHandler(!d || d.nodata, null, true);
                        }
                        res[name] = d;
                        if (that) {
                            var ds = that.datasets && that.datasets[name];
                            if (isLoad && ds && ds.$menu && that.updateMenuHandler) {
                                var a = name.split('_');
                                menus.push({ name: a[a.length - 1], data: d });
                            }
                            if (ds) {
                                that.ds_loaded(name, d);
                                if (ds.autoselect) {
                                    return ds.doAutoSelect(d, function (item) {
                                        that.ds_select(name, item);
                                    });
                                }
                            }
                        }
                    });
                    if (that && that.loadingHandler)
                        that.loadingHandler(false);
                    menus.forEach(function (menu) {
                        that.updateMenuHandler(menu.name, menu.data);
                    });
                    after(true);
                    if (that && that.watchersHandler)
                        that.watchersHandler(names);
                    if (!isLoad && notify && that && that.dataChangedHandler)
                        that.dataChangedHandler(names);
                }).catch(function (ex) {
                    if (that && that.loadingHandler)
                        that.loadingHandler(false);
                    if (that && that.errorHandler)
                        that.errorHandler(ex);
                    after(false, ex);
                    if (!isLoad && notify && that && that.dataChangedHandler)
                        that.dataChangedHandler(names);
                });
            }
            else
                after(true);
        };
        var DatasetMethods = (function () {
            function DatasetMethods() {
            }
            DatasetMethods.prototype.ds_init = function (config) {
                var that = this;
                var register = false;
                that.props = that.props || {};
                that.props.data = that.props.data || {};
                that.props.data.ds = {};
                if (config.datasets || config.$resources || config.$schema || config.$menus) {
                    if (that.datasets)
                        that.ds_destroy();
                    var resName = config.$resources || config.$schema;
                    if (resName) {
                        that.props.data.ds.view = null;
                        that.datasets = that.datasets || {};
                        that.datasets.view = new _data.DataSet({
                            $type: "widget-schema",
                            $params: {
                                name: resName,
                                localization: config.$localization
                            }
                        });
                        that.datasets.view.$schema = true;
                    }
                    if (config.$menus) {
                        Object.keys(config.$menus).forEach(function (menuName) {
                            var dn = '$menu_' + menuName;
                            that.props.data.ds[dn] = null;
                            that.datasets = that.datasets || {};
                            that.datasets[dn] = new _data.DataSet({
                                $type: "menu",
                                $params: {
                                    name: config.$menus[menuName] + '-' + menuName
                                }
                            });
                            that.datasets[dn].$menu = true;
                        });
                    }
                    if (config.datasets) {
                        Object.keys(config.datasets).forEach(function (dataset) {
                            that.props.data.ds[dataset] = null;
                            that.datasets = that.datasets || {};
                            var cds = new _data.DataSet(config.datasets[dataset]);
                            that.datasets[dataset] = cds;
                            if (!register) {
                                register = cds.hasCustomEvents() || cds.config.$emit;
                            }
                        });
                    }
                }
                return register;
            };
            DatasetMethods.prototype.ds_storeLastEvent = function (event, value) {
                var that = this;
                that._lastEvent = { event: event, value: value };
            };
            DatasetMethods.prototype.ds_LastEvent = function () {
                var that = this;
                if (that._lastEvent) {
                    var res = that._lastEvent;
                    that._lastEvent = null;
                    return res;
                }
                return null;
            };
            DatasetMethods.prototype.ds_destroy = function () {
                _utils.log("Destroy Dataset Part", "destroy");
                var that = this;
                that._lastEvent = null;
                if (that.datasets) {
                    Object.keys(that.datasets).forEach(function (dataset) {
                        var ds = that.datasets[dataset];
                        ds.destroy();
                    });
                    that.datasets = null;
                }
            };
            DatasetMethods.prototype.ds_context = function () {
                var that = this;
                var map = {
                    $url: _link.search(null, false),
                    $mem: _mem,
                    $local: that.getLocalContextHandler ? that.getLocalContextHandler() : null,
                };
                var datasets = that.props.data.ds;
                if (datasets) {
                    Object.keys(datasets).forEach(function (pn) {
                        map[pn] = datasets[pn];
                    });
                }
                return map;
            };
            DatasetMethods.prototype.ds_reemit = function (listeners, after) {
                var that = this;
                if (that.datasets) {
                    var names = Object.keys(that.datasets);
                    names.forEach(function (name) {
                        var d = that.props.data.ds[name];
                        var ds = that.datasets[name];
                        if (ds.defaultDataset) {
                            if (that.noDataHandler)
                                that.noDataHandler(!d || d.nodata, null, true);
                        }
                        that.ds_loaded(name, d);
                        if (ds.autoselect) {
                            ds.doAutoSelect(d, function (item) {
                                that.ds_select(name, item);
                            });
                        }
                    });
                }
                return after();
            };
            DatasetMethods.prototype.ds_select = function (datasetName, value) {
                var that = this;
                if (that.datasets && that.datasets[datasetName]) {
                    var ds = that.datasets[datasetName];
                    if (ds.config.$emit && that.emitHandler) {
                        if (ds.config.$emit.$changed) {
                            _updateMem(that, ds, value, '$changed');
                        }
                        that.emitHandler(ds.config.$emit.$changed ? ds.config.$emit.$changed.$name : ds.config.$emit, value);
                    }
                }
            };
            DatasetMethods.prototype.ds_loaded = function (datasetName, value) {
                var that = this;
                if (that.datasets && that.datasets[datasetName]) {
                    var ds = that.datasets[datasetName];
                    if (ds.config.$emit && ds.config.$emit.$loaded) {
                        _updateMem(that, ds, value, '$loaded');
                        that.emitHandler(ds.config.$emit.$loaded.$name, value);
                    }
                }
            };
            DatasetMethods.prototype.ds_exec = function (event, context, dst, after, datasets, notify) {
                _ds_exec(this, event, context, dst, after, datasets, notify);
            };
            return DatasetMethods;
        }());
        DatasetPlugin.DatasetMethods = DatasetMethods;
        DatasetPlugin.executeDatasets = function (datasets, context, result, handlers, after, contextByDs) {
            var thisObj = {
                loadingHandler: handlers && handlers.loading ? handlers.loading : null,
                errorHandler: handlers && handlers.error ? handlers.error : null
            };
            _ds_exec(thisObj, '', context, result, after, datasets, false, contextByDs);
        };
    })(DatasetPlugin = Phoenix.DatasetPlugin || (Phoenix.DatasetPlugin = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../core/core.ts" />
/// <reference path="../core/locale.ts" />
var Phoenix;
(function (Phoenix) {
    var WidgetUtils;
    (function (WidgetUtils) {
        //Widget data
        // {$config: {$title, $titleIsHidden, $border, $style, $height, data}}
        var _dom = Phoenix.dom, _utils = Phoenix.utils, _locale = Phoenix.locale, _ulocale = Phoenix.ulocale, _widgetClass = function (cfg, options, selected) {
            var css = ["bs-island bs-widget"];
            _dom.parseStyle(cfg.$style, css);
            if (cfg.$border)
                css.push("border");
            if (options.design)
                css.push("design");
            if (selected)
                css.push("selected");
            return css.join(' ');
        }, _heightText = function (height) {
            if (!height)
                return "";
            var h = ((height + '').indexOf('%') > 0) ? height : (parseInt(height, 10) + 'px');
            return 'height:' + h + ';';
        }, _beforeWidget = function (html, data, options, llocale) {
            html.push('<div class="');
            html.push(_widgetClass(data.$config, options, data.$selected));
            html.push('"');
            if (options.design)
                html.push(' draggable="true"');
            html.push(' data-render="' + data.$id + '"');
            html.push(' id="' + data.$id + '"');
            html.push('>');
            _addTitle(html, data.$id, data.$config, llocale, false);
            html.push('<div class="bs-widget-content bs-widget-content-id"');
            var ht = _heightText(data.$config.$height);
            if (ht)
                html.push(' style="' + ht + '"');
            html.push('>');
        }, _addTitle = function (html, id, data, llocale, forceShowTitle) {
            html.push('<div class="bs-widget-title' + (forceShowTitle ? ' bs-widget-content-inv-x' : '') + (data.$titleIsHidden && !forceShowTitle ? ' bs-none' : '') + '" id="' + id + '_title">');
            var title = _ulocale.localeTitle(data.$title) || '';
            if (llocale)
                title = _ulocale.tt(data.$title || '', llocale);
            html.push(_utils.escapeHtml(title + ' '));
            if (data.icons && data.icons.length && data.links) {
                data.icons.forEach(function (icon) {
                    var l = data.links[icon.link];
                    if (l && l.$icon) {
                        html.push('<a class="bs-widget-title-icon" data-phoenix-href="link://' + icon.link + '">');
                        html.push('<span class="' + _dom.iconClass(l.$icon) + '"></span>');
                        html.push('</a>');
                    }
                });
            }
            html.push('</div>');
        }, _afterWidget = function (html, options) {
            html.push('</div></div>');
        }, _renderWiget = function (html, data, parent, model, options, llocale) {
            _beforeWidget(html, data, options, llocale);
            _afterWidget(html, options);
        }, _toHtml = function (data, options, parent, model, llocale) {
            var html = [];
            _renderWiget(html, data, parent, model, options, llocale);
            return html.join('');
        }, _loader = function () {
            return $('<div class="bs-loader"></div>');
        }, _error = function () {
            return $('<div class="alert alert-danger" role="alert"><span class="' + _dom.iconClass('exclamation-circle') + '" aria-hidden="true"></span><span></span></div>');
        }, _settings = function () {
            return $('<span class="bs-module-settings ' + _dom.iconClass('cog') + '" ></span>');
        }, _warning = function () {
            return $('<div class="alert alert-warning" role="alert"></div>');
        }, _noData = function (message, icon) {
            var html = [];
            var addIcon = icon !== false;
            icon = (icon && icon !== true) || 'cloud';
            html.push('<div class="bs-widget-content nodata">');
            html.push('<div class="bs-no-data-inside">');
            if (addIcon)
                html.push('<center class="nodata-image"><i class="' + _dom.iconClass(icon) + ' nodata-icon"></i></center>');
            html.push('<center><h4 class="nodata-text">');
            html.push(message ? message : _locale.layouts.NoData);
            html.push('</h4></center>');
            html.push('</div>');
            html.push('</div>');
            return $(html.join(''));
        };
        WidgetUtils.toHtml = _toHtml;
        WidgetUtils.cssClass = _widgetClass;
        WidgetUtils.heightText = _heightText;
        WidgetUtils.loader = _loader;
        WidgetUtils.error = _error;
        WidgetUtils.widgetTitle = _addTitle;
        WidgetUtils.settings = _settings;
        WidgetUtils.warning = _warning;
        WidgetUtils.noData = _noData;
    })(WidgetUtils = Phoenix.WidgetUtils || (Phoenix.WidgetUtils = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../core/core.ts" />
/// <reference path="./module.ts" />
/// <reference path="./datasets-plugin.ts" />
var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        var _dom = Phoenix.dom, _utils = Phoenix.utils, _locale = Phoenix.locale, _wutils = Phoenix.WidgetUtils, _link = Phoenix.link, _render = Phoenix.render;
        var Widget = (function () {
            function Widget(ldata, options, layout) {
                var that = this;
                that.item = ldata || {};
                if (!that.item.$id)
                    that.item.$id = _utils.allocID();
                ldata.$config = ldata.$config || {};
                ldata.$config.data = ldata.$config.data || {};
                that.data = ldata.$config;
                that.props = {};
                that.item.$render = that.props;
                that.props.data = ldata.$config.data;
                that.options = options || {};
                that.contentRender = null;
                that.links = ldata.$config.links;
                that._defineProps();
                that.layout = layout;
                that.$local = {};
                //datasets
                that.loadingHandler = this.loading.bind(that);
                that.noDataHandler = this.noData.bind(that);
                that.errorHandler = this.error.bind(that);
                that.emitHandler = this.emit.bind(that);
                that.getLocalContextHandler = this.getLocalContext.bind(that);
                that.dataChangedHandler = this.dataChanged.bind(that);
                that.updateMenuHandler = null;
                that._watchers = {};
                if (that.props.data.localContext) {
                    $.extend(that.$local, that.props.data.localContext);
                }
                if (that.ds_init(that.data))
                    that._listen();
            }
            //implements DatasetMethods
            Widget.prototype.ds_init = function (config) { return false; };
            Widget.prototype.ds_storeLastEvent = function (event, value) { };
            Widget.prototype.ds_LastEvent = function () { return null; };
            Widget.prototype.ds_destroy = function () { };
            Widget.prototype.ds_context = function () { return null; };
            Widget.prototype.ds_reemit = function (listeners, after) { return null; };
            Widget.prototype.ds_select = function (datasetName, value) { };
            Widget.prototype.ds_loaded = function (datasetName, value) { };
            Widget.prototype.ds_exec = function (event, context, dst, after, datasets, notify) { };
            Widget.prototype._defineProps = function () {
                var self = this, _dp = _utils.defineProperty;
                _dp("$title", self);
                _dp("$border", self);
                _dp("$height", self);
                _dp("$titleIsHidden", self);
                _dp("$settings", self);
            };
            Widget.prototype._notifyChange = function (propertyName) {
                var self = this;
                switch (propertyName) {
                    case "$title":
                        self._updateTitle();
                        break;
                    case "$border":
                    case "$titleIsHidden":
                        self._updateCssClass();
                        break;
                    case "$height":
                        self._updateHeight();
                        break;
                }
            };
            Widget.prototype._listen = function () {
                var that = this;
                if (that.layout) {
                    that.layout.registerDataListener(that);
                }
            };
            Widget.prototype._unlisten = function () {
                var that = this;
                if (that.layout) {
                    that.layout.removeDataListener(that);
                }
            };
            Widget.prototype.on = function (event, hnd) {
                var that = this;
                that.handlers = that.handlers || {};
                that.handlers[event] = hnd;
            };
            Widget.prototype._exec = function (event) {
                var that = this;
                that.handlers && that.handlers[event] && that.handlers[event]();
            };
            Widget.prototype._setEvents = function () {
                var that = this;
                var e = that.$element.get(0);
                that.$element.on('click', function (event) {
                    if (that.$settings && event.target === that.$settings.get(0)) {
                        that._exec('settings');
                    }
                    var c = _link.isCustomLink(e, event);
                    if (c)
                        _link.execCustomProtocol(c, that.ds_context(), {
                            links: that.links
                        }, null);
                });
            };
            Widget.prototype.executeLink = function (href, params) {
                var that = this;
                var c = _link.isCustomProtocol(href);
                if (c)
                    _link.execCustomProtocol({ protocol: c, value: href }, that.ds_context(), {
                        links: that.links
                    }, params);
            };
            Widget.prototype._removeEvents = function () {
                var that = this;
                that.$element.off('click');
            };
            //Called by execdataset
            Widget.prototype.dataChanged = function (datasetNames) {
                var that = this;
                if (that.onDSChanged)
                    that.onDSChanged(datasetNames);
                if (that.contentRender && that.contentRender.dataChanged)
                    that.contentRender.dataChanged();
                else if (that.options.onDataChanged)
                    that.options.onDataChanged();
            };
            Widget.prototype.execDataSet = function (datasets, context, callBack, res, notify) {
                var that = this;
                res = res || that.props.data.ds;
                that.ds_exec(null, context, res, callBack || function () { }, datasets, notify);
            };
            Widget.prototype._loadData = function (after) {
                var that = this;
                if (!that.datasets) {
                    return after(false);
                }
                that.ds_exec("$load", null, that.props.data.ds, after, null, true);
            };
            Widget.prototype._updateTitle = function () {
                var that = this;
                if (that.$element) {
                    var t = _dom.find(that.$element.get(0), that.item.$id + "_title");
                    if (t)
                        _dom.text(t, this.data.$title || '');
                }
            };
            Widget.prototype._cleanErrors = function (endLoading) {
                var that = this;
                if (that.$loader) {
                    that.$loader.remove();
                    that.$loader = null;
                }
                if (!endLoading) {
                    if (that.$settings) {
                        _dom.addClass(that.$settings.get(0), 'bs-none');
                    }
                    if (that.$noData) {
                        that.$noData.remove();
                        that.$noData = null;
                    }
                    if (that.$error) {
                        that.$error.remove();
                        that.$error = null;
                    }
                    if (that.$warning) {
                        that.$warning.remove();
                        that.$warning = null;
                    }
                }
            };
            Widget.prototype.loading = function (show) {
                var that = this;
                that._cleanErrors(!show);
                var e = that.$element ? that.$element.get(0) : null;
                if (e) {
                    if (show) {
                        _dom.addClass(e, "loading");
                        if (!that.$loader) {
                            that.$loader = _wutils.loader();
                            that.$element.append(that.$loader);
                        }
                    }
                    else {
                        _dom.removeClass(e, "loading");
                    }
                }
                if (!show) {
                    that.settings();
                }
            };
            Widget.prototype._linksState = function (show) {
                var that = this;
                if (that.$element) {
                    var e = that.$element.get(0);
                    var t = _dom.find(e, that.item.$id + "_title");
                    if (t) {
                        var matches = _dom.queryAll(t, '.bs-widget-title-icon');
                        [].forEach.call(matches, function (item) {
                            if (show)
                                _dom.removeClass(item, "bs-none");
                            else
                                _dom.addClass(item, "bs-none");
                        });
                    }
                }
            };
            Widget.prototype.noData = function (value, message, icon) {
                var that = this;
                if (!message && that.props.data.$noDataMessage)
                    message = that.props.data.$noDataMessage;
                this._cleanErrors(false);
                if (that.$element) {
                    var e = that.$element.get(0);
                    var cont = _dom.query(e, '.bs-widget-content-id');
                    if (cont) {
                        if (value)
                            _dom.addClass(cont, "bs-none");
                        else
                            _dom.removeClass(cont, "bs-none");
                        that._linksState(!value);
                    }
                    if (value) {
                        that.$noData = _wutils.noData(message, icon);
                        var hasHeight = that._updateHeight(that.$noData);
                        if (hasHeight) {
                            var inside = _dom.query(that.$noData.get(0), '.bs-no-data-inside');
                            _dom.addClass(inside, 'centred');
                        }
                        var t = _dom.find(e, that.item.$id + "_title");
                        if (t)
                            _dom.after(t, that.$noData.get(0));
                    }
                }
            };
            Widget.prototype.getLocalContext = function () {
                return this.$local;
            };
            Widget.prototype.settings = function () {
                var that = this;
                var show = (that.data.$settings && !that.$error && !that.$warning && !that.$noData);
                if (that.$settings) {
                    if (show)
                        _dom.removeClass(that.$settings.get(0), 'bs-none');
                    else
                        _dom.addClass(that.$settings.get(0), 'bs-none');
                    return;
                }
                if (!show)
                    return;
                that.$settings = _wutils.settings();
                var t = _dom.find(that.$element.get(0), that.item.$id + "_title");
                if (t)
                    _dom.after(t, that.$settings.get(0));
            };
            Widget.prototype.error = function (ex) {
                var message = ex;
                if (ex && ex.message) {
                    message = ex.message;
                }
                var that = this;
                this._cleanErrors(false);
                var e = that.$element ? that.$element.get(0) : null;
                if (e) {
                    that.$error = _wutils.error();
                    var ee = that.$error.get(0);
                    _dom.text(ee.lastChild, " " + message);
                    var t = _dom.find(e, that.item.$id + "_title");
                    if (t)
                        _dom.after(t, ee);
                }
            };
            Widget.prototype.warning = function (message) {
                var that = this;
                this._cleanErrors(false);
                var e = that.$element ? that.$element.get(0) : null;
                if (e) {
                    that.$warning = _wutils.warning();
                    var ee = that.$warning.get(0);
                    _dom.text(ee, message);
                    var t = _dom.find(e, that.item.$id + "_title");
                    if (t)
                        _dom.after(t, ee);
                }
            };
            Widget.prototype._updateHeight = function ($e) {
                var that = this;
                $e = $e || that.$element;
                var e = $e ? $e.get(0) : null;
                if (e)
                    e.style.cssText = _wutils.heightText(that.props.$height);
                return (that.props.$height ? true : false);
            };
            Widget.prototype._updateCssClass = function () {
                var that = this;
                var e = that.$element ? that.$element.get(0) : null;
                if (e)
                    e.className = _wutils.cssClass(that.data, that.options);
            };
            Widget.prototype._internalRenderContent = function ($content, append, async) {
                var that = this, Cr = _render.get(that.options.context, "widget.content.control." + that.data.$type);
                if (!that.$element)
                    return;
                if (Cr) {
                    that.contentRender = new Cr(that.props, {
                        context: that.options.context,
                        replaceParent: false,
                    }, this);
                }
                else {
                    var htmlRender = _render.get(that.options.context, "widget.content");
                    if (htmlRender) {
                        var html = [];
                        htmlRender(html, that.data, that.options);
                        $content.append($(html.join('')));
                    }
                }
                if (that.options.beforeAdd)
                    that.options.beforeAdd($content, async);
                if (that.contentRender)
                    that.contentRender.render($content);
                if (append)
                    that.$element.append($content);
            };
            Widget.prototype.watchersHandler = function (names) {
                var that = this;
                if (names)
                    names.forEach(function (name) {
                        var wbyds = that._watchers[name];
                        if (wbyds) {
                            wbyds.forEach(function (watcher) {
                                watcher(that.props.data.ds[that.props.data.ds[name]]);
                            });
                        }
                        console.log(name + ' data changed');
                    });
            };
            Widget.prototype.render = function ($parent) {
                var that = this;
                that.$loader = null;
                that.$error = null;
                if (!that.$element) {
                    that.layout.controls[that.item.$id] = this;
                    that.$element = $(_wutils.toHtml(that.item, that.options, null, null, null));
                    that._setEvents();
                    var e = that.$element.get(0);
                    var cont = _dom.query(e, '.bs-widget-content-id');
                    that._loadData(function (async) {
                        that._internalRenderContent($(cont), false, async);
                        that.settings();
                    });
                    if ($parent) {
                        if (that.options.replaceParent)
                            $parent.replaceWith(that.$element);
                        else
                            $parent.append(that.$element);
                    }
                }
            };
            /* Start datasets methods*/
            Widget.prototype.emit = function (eventName, value, filter) {
                var that = this;
                if (that.layout) {
                    that.layout.emitDataEvent(eventName, value, filter);
                }
            };
            /* End datasets methods*/
            Widget.prototype.dataEvent = function (eventName, value) {
                var that = this;
                that.ds_exec(eventName, value, that.props.data.ds, function () { }, null, true);
            };
            Widget.prototype.destroy = function () {
                _utils.log("Destroy Module", "destroy");
                var that = this;
                if (that.contentRender) {
                    that.contentRender.destroy();
                    that.contentRender = null;
                }
                that._unlisten();
                that.ds_destroy();
                that._cleanErrors(false);
                that.item.$render = null;
                if (that.$settings)
                    that.$settings = null;
                if (that.$element) {
                    that._removeEvents();
                    that.$element = null;
                }
                that.layout = null;
                that.ondatasets = null;
            };
            Widget.prototype.watch = function (dsName, cb) {
                var that = this;
                if (that._watchers) {
                    var wbyds = that._watchers[dsName] = that._watchers[dsName] || [];
                    wbyds.push(cb);
                    if (that.props && that.props.data.ds) {
                        Phoenix.utils.nextTick(function () {
                            cb(that.props.data.ds[dsName]);
                        });
                    }
                }
            };
            Widget.prototype.unwatch = function (dsName, cb) {
                var that = this;
                if (that._watchers) {
                    var wbyds = that._watchers[dsName];
                    if (wbyds) {
                        var ii = wbyds.indexOf(cb);
                        if (ii >= 0)
                            wbyds.splice(ii, 1);
                    }
                }
            };
            return Widget;
        }());
        ui.Widget = Widget;
        _utils.applyMixins(Widget, [Phoenix.DatasetPlugin.DatasetMethods]);
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../core/core.ts" />
/// <reference path="./datasets-plugin.ts" />
/// <reference path="./page.control.ts" />
var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        var _utils = Phoenix.utils, _ulocale = Phoenix.ulocale, _link = Phoenix.link, _mem = Phoenix.$mem, _dom = Phoenix.dom;
        var MenuBase = (function () {
            function MenuBase(data, options) {
                this._initOptions(options);
                this.init(data, options);
            }
            //implements DatasetMethods
            MenuBase.prototype.ds_init = function (config) { return false; };
            MenuBase.prototype.ds_storeLastEvent = function (event, value) { };
            MenuBase.prototype.ds_LastEvent = function () { return null; };
            MenuBase.prototype.ds_destroy = function () { };
            MenuBase.prototype.ds_context = function () { return null; };
            MenuBase.prototype.ds_reemit = function (listeners, after) { return null; };
            MenuBase.prototype.ds_select = function (datasetName, value) { };
            MenuBase.prototype.ds_loaded = function (datasetName, value) { };
            MenuBase.prototype.ds_exec = function (event, context, dst, after, datasets, notify) { };
            MenuBase.prototype._initOptions = function (options) { };
            /* Start datasets methods*/
            MenuBase.prototype.emit = function (eventName, value, filter) {
                this.emitDataEvent(eventName, value, filter);
            };
            /* End datasets methods*/
            MenuBase.prototype.init = function (data, options) {
                _utils.log("Create Menu", "menu");
                var that = this;
                //datasets
                that.loadingHandler = this.loading.bind(that);
                that.noDataHandler = null;
                that.errorHandler = null;
                that.emitHandler = this.emit.bind(that);
                that.getLocalContextHandler = null;
                that.dataChangedHandler = null;
                that.updateMenuHandler = null;
                that.$element = null;
                that.$items = null;
                that.options = options || {};
                that.options.typeMenu = that.options.type || "left";
                that.data = {
                    name: "none"
                };
                that.page = ui.Page();
                that.page.addChild('menu-' + that.options.typeMenu, that);
                that.setMenu(data);
            };
            MenuBase.prototype.loading = function (show) {
                this.page.loading(show);
            };
            MenuBase.prototype.registerDataListener = function (value) {
                var that = this;
                if (that.page)
                    that.page.registerDataListener(value, that);
            };
            MenuBase.prototype.removeDataListener = function (listener) {
                var that = this;
                if (that.page) {
                    that.page.removeDataListener(listener);
                }
            };
            MenuBase.prototype.emitDataEvent = function (event, value, filter) {
                var that = this;
                if (that.page)
                    that.page.emitDataEvent(event, value, filter);
            };
            MenuBase.prototype.onPageChange = function (propName, value) {
                var that = this;
                if (propName == "$user" && that.items) {
                    if (that.options.auth && !that.options.autoClose) {
                        var show = that.page.props.$user && that.page.props.$user.connected;
                        if (show) {
                            var pp = _dom.find(null, that.options.parentId);
                            if (pp) {
                                that.show($(pp));
                            }
                            else {
                                that._showContent();
                            }
                        }
                        else if (that.$content && !show) {
                            that._hideContent();
                        }
                    }
                }
            };
            MenuBase.prototype.setMenu = function (data) {
                _utils.log("Set Menu", "menu");
                var that = this, hasMenu = data != null;
                data = data || {
                    name: "none"
                };
                if (!data.$groups) {
                    data.$groups = [{
                            $items: data.$items
                        }];
                    delete data.$items;
                }
                if (this.data.name !== data.name) {
                    _utils.log("Menu create && execute datasets", "menu");
                    that.data = data;
                    that.items = null;
                    that._recreateDatasets();
                    that.ds_exec("$load", null, that.props.data.ds, function () {
                        var doShow = !that.options.autoClose && that.options.parentId && hasMenu;
                        if (doShow && that.options.auth) {
                            doShow = that.page.props.$user && that.page.props.$user.connected;
                        }
                        that._prepareItems();
                        if (that.$content) {
                            that._removeContent();
                            if (hasMenu) {
                                if (doShow) {
                                    var parent = _dom.find(null, that.options.parentId);
                                    if (parent) {
                                        that.render();
                                        that.show($(parent));
                                    }
                                }
                                else
                                    that.render();
                            }
                            else
                                that._hideContent();
                        }
                        else {
                            if (doShow) {
                                var pp = _dom.find(null, that.options.parentId);
                                if (pp) {
                                    that.show($(pp));
                                }
                            }
                        }
                        that.page.props["$menu" + that.options.typeMenu] = hasMenu && that.options.autoClose;
                    }, null, true);
                }
                else {
                    _utils.log("Menu reexecute datasets", "menu");
                    that.ds_reemit(null, function () {
                        that._onPageChanged();
                        that.page.props["$menu" + that.options.typeMenu] = hasMenu && that.options.autoClose;
                    });
                }
            };
            MenuBase.prototype._onPageChanged = function () { };
            MenuBase.prototype._doCloseClick = function () { };
            MenuBase.prototype._menuShowed = function () { };
            MenuBase.prototype._executeLink = function (item, link) { };
            MenuBase.prototype._setEvents = function () {
                var that = this;
                var e = that.$content.get(0);
                that.$content.on('click', function (event) {
                    var c = _link.isCustomLink(e, event);
                    if (c && c.protocol == "click") {
                        var cs = c.value.substring(('click://').length);
                        if (cs == "close") {
                            if (that._doCloseClick)
                                return that._doCloseClick();
                        }
                        else {
                            var ii = cs.split('/');
                            that._executeLink(that.items[parseInt(ii[0], 10)], ii.length > 1 ? ii[1] : null);
                        }
                    }
                    if (that.options.autoClose) {
                        that.hide();
                    }
                });
            };
            MenuBase.prototype.renderItems = function ($content) {
                return null;
            };
            MenuBase.prototype._removeEvents = function () {
                var that = this;
                that.$content.off('click');
            };
            MenuBase.prototype._loadData = function (after) {
                var that = this;
                if (!that.datasets) {
                    return after(false);
                }
                that.ds_exec("$load", null, that.props.data.ds, after, null, true);
            };
            MenuBase.prototype._expandItem = function (item, url, mem, itemtitle, link, index) {
                var ii = { $title: '', $item: item, $index: index, $link: link };
                ii.$title = _utils.parseVariable(itemtitle, {
                    $item: item,
                    $url: url,
                    $mem: mem
                });
                return ii;
            };
            MenuBase.prototype._expandDatasetItems = function (dataset, itemtitle, link) {
                var that = this;
                var data = that.props.data.ds[dataset];
                if (data) {
                    var items = [];
                    var url = _link.search(null, false);
                    var mem = _mem;
                    if (data.documents) {
                        if (data.documents.length) {
                            data.documents.forEach(function (item, index) {
                                items.push(that._expandItem(item, url, mem, itemtitle, link, index));
                            });
                        }
                        else
                            return null;
                    }
                    else {
                        items.push(that._expandItem(data, url, mem, itemtitle, link, -1));
                    }
                    return items;
                }
                return null;
            };
            MenuBase.prototype.copyMenuItemData = function (dst, src) { };
            MenuBase.prototype._prepareItems = function () {
                var that = this;
                that.items = [];
                if (that.data.$groups) {
                    var first = true;
                    that.data.$groups.forEach(function (group) {
                        var items = null;
                        if (group.$dataset) {
                            if (!group.$link) {
                                throw "Invalid link definition. (no link)";
                            }
                            if (!group.$itemtitle) {
                                throw "Invalid link definition. (no itemtitle)";
                            }
                            items = that._expandDatasetItems(group.$dataset, group.$itemtitle, group.$link);
                        }
                        else
                            items = group.$items;
                        if (items && items.length) {
                            if (!first || group.$title || group.$dataset) {
                                var d = {
                                    divider: true,
                                    $title: null,
                                    dataset: '',
                                    isHidden: false
                                };
                                if (group.$title)
                                    d.$title = group.$title;
                                if (group.dataset) {
                                    d.dataset = group.$dataset;
                                    if (first)
                                        d.isHidden = true;
                                }
                                that.items.push(d);
                                first = false;
                            }
                        }
                        if (items) {
                            var ds = group.$dataset ? that.datasets[group.$dataset] : null;
                            items.forEach(function (item, index) {
                                var mitem = {
                                    $title: item.$title ? _utils.parseExpression(item.$title, _link.context()) : null,
                                    $dataset: null,
                                    dataset: null,
                                    $index: 0,
                                    $item: null,
                                    $link: null,
                                    $level: item.$level,
                                    selected: false
                                };
                                if (group.dataset) {
                                    mitem.dataset = group.$dataset;
                                }
                                if (item.$link)
                                    mitem.$link = item.$link;
                                if (ds && ds.autoselect)
                                    mitem.selected = ds.selectedIndex == index;
                                that.copyMenuItemData(mitem, item);
                                if (ds) {
                                    mitem.$dataset = group.$dataset;
                                    mitem.$index = item.$index;
                                    mitem.$item = item.$item;
                                }
                                that.items.push(mitem);
                                first = false;
                            });
                        }
                    });
                }
            };
            MenuBase.prototype._removeContent = function () {
                if (this.$element) {
                    this.$element.remove();
                    this.$element = null;
                }
            };
            MenuBase.prototype.renderContent = function () {
                return $('<aside></aside>');
            };
            MenuBase.prototype.show = function ($parent) {
                var that = this;
                if (that.$content) {
                    that._showContent();
                }
                else {
                    that.render($parent);
                    that._showContent();
                }
                if (that.options.autoClose) {
                    that.page.setPopup(that);
                }
            };
            MenuBase.prototype.hide = function (autoCloseChanged) {
                var that = this;
                if (!that.$content)
                    return;
                that._hideContent(autoCloseChanged);
            };
            MenuBase.prototype._hideContent = function (autoCloseChanged) {
                var that = this;
                var c = that.$content.get(0);
                _dom.addClass(c, "bs-none");
            };
            MenuBase.prototype._showContent = function () {
                var that = this;
                var c = that.$content.get(0);
                _dom.removeClass(c, "bs-none");
                that._menuShowed();
            };
            MenuBase.prototype.render = function ($parent) {
                var that = this;
                var $content = that.$content;
                //
                if (!$content) {
                    $content = that.renderContent();
                }
                if (!that.$element) {
                    that.$element = that.renderItems($content);
                    $content.append(this.$element);
                }
                if ($parent && !that.$content) {
                    that.$content = $content;
                    if (that.options.replaceParent) {
                        var p = $parent.get(0);
                        if (p && p.id) {
                            var c = that.$content.get(0);
                            if (c)
                                c.id = p.id;
                        }
                        $parent.replaceWith(that.$content);
                    }
                    else
                        $parent.append(that.$content);
                    that._setEvents();
                }
            };
            MenuBase.prototype._recreateDatasets = function () {
                var that = this;
                that.ds_destroy();
                that.removeDataListener(that);
                if (that.ds_init(that.data)) {
                    that.registerDataListener(that);
                }
            };
            MenuBase.prototype.destroy = function () {
                var that = this;
                _utils.log("Destroy Menu", "destroy");
                that.ds_destroy();
                that.removeDataListener(that);
                if (that.$content) {
                    that._removeEvents();
                    this.$content = null;
                }
                this.$element = null;
                if (that.page) {
                    that.page.removeChild(that);
                    that.page = null;
                }
            };
            MenuBase.prototype.inPopup = function (element) {
                var that = this;
                if (!that.options.autoClose)
                    return true;
                if (!element)
                    return true;
                if (that.$content) {
                    var p = that.$content.get(0);
                    var e = element;
                    while (e) {
                        if (e == p)
                            return true;
                        e = e.parentNode;
                    }
                }
                return false;
            };
            return MenuBase;
        }());
        ui.MenuBase = MenuBase;
        _utils.applyMixins(MenuBase, [Phoenix.DatasetPlugin.DatasetMethods]);
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../core/core.ts" />
/// <reference path="./datasets-plugin.ts" />
/// <reference path="./menu-base.ts" />
var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        var _link = Phoenix.link, _preferences = Phoenix.preferences, _application = Phoenix.application, _device = Phoenix.device, _utils = Phoenix.utils, _dom = Phoenix.dom;
        var Menu = (function (_super) {
            __extends(Menu, _super);
            function Menu(ldata, options) {
                _super.call(this, ldata, options);
            }
            Menu.prototype._initOptions = function (options) {
                var headerConfig = _application.configuration.header || {};
                options = options || {};
                options.replaceParent = true;
                options.canStayInPage = (_device.phone || _device.tablet ? false : true);
                options.autoClose = options.canStayInPage ? _preferences("menu_" + options.type + "_autoClose") : true;
                if (options.autoClose === undefined)
                    options.autoClose = true;
                options.auth = headerConfig.authLeftMenu;
            };
            Menu.prototype._hideContent = function (autoCloseChanged) {
                var that = this;
                var c = that.$content.get(0);
                if (that.options.bodyId) {
                    var body = _dom.find(null, that.options.bodyId);
                    if (body)
                        _dom.removeClass(body, "bs-pc-body-" + that.options.typeMenu);
                }
                _dom.removeClass(c, "bs-menu-opened");
                _dom.addClass(c, "bs-menu-closed");
                if (that.options.bodyId && (!that.options.autoClose || (autoCloseChanged && that.options.autoClose))) {
                    _utils.nextTick(function () {
                        $(window).trigger('phoenix-resize');
                        $(window).trigger('gobal-phoenix-resize');
                    });
                }
            };
            Menu.prototype._showContent = function () {
                var that = this;
                var c = that.$content.get(0);
                var doresize = false;
                if (that.options.bodyId && !that.options.autoClose) {
                    doresize = true;
                    var body = _dom.find(null, that.options.bodyId);
                    if (body)
                        _dom.addClass(body, "bs-pc-body-" + that.options.typeMenu);
                }
                _dom.removeClass(c, "bs-menu-closed");
                _dom.addClass(c, "bs-menu-opened");
                if (that.options.canStayInPage) {
                    _dom.addClass(c, "large");
                }
                else {
                    _dom.addClass(c, "phone");
                }
                if (doresize)
                    _utils.nextTick(function () {
                        $(window).trigger('phoenix-resize');
                        $(window).trigger('gobal-phoenix-resize');
                    });
            };
            Menu.prototype._switchAutoClose = function () {
                var that = this;
                var nv = !!!_preferences("menu_" + that.options.type + "_autoClose");
                _preferences("menu_" + that.options.type + "_autoClose", nv);
                that.options.autoClose = nv;
                return that._updateCloseButton(that.$content);
            };
            Menu.prototype._doCloseClick = function () {
                var that = this;
                if (!that.options.canStayInPage) {
                    that.hide();
                    return;
                }
                if (that._switchAutoClose()) {
                    that.hide(true);
                }
                else {
                    that._showContent();
                }
                that.page.props["$menu" + that.options.typeMenu] = that.options.autoClose;
            };
            Menu.prototype.copyMenuItemData = function (dst, src) {
                dst.$icon = src.$icon;
            };
            Menu.prototype._updateCloseButton = function ($content) {
                var that = this;
                var doclose = false;
                var c = $content.get(0);
                var btn = _dom.query(c, '.bs-menu-button');
                var btnIcon = _dom.query(c, '.bs-icon');
                if (that.options.canStayInPage) {
                    _dom.removeClass(btnIcon, _dom.iconClass('times', true));
                    if (that.options.autoClose) {
                        _dom.removeClass(btnIcon, _dom.iconClass('times-circle-o', true));
                        _dom.addClass(btnIcon, 'small');
                        _dom.addClass(btnIcon, _dom.iconClass('thumb-tack', true));
                        doclose = true;
                    }
                    else {
                        _dom.removeClass(btnIcon, _dom.iconClass('thumb-tack', true));
                        _dom.removeClass(btnIcon, 'small');
                        _dom.addClass(btnIcon, _dom.iconClass('times-circle-o', true));
                    }
                    _dom.removeClass(btn, "bs-none");
                }
                else {
                    _dom.removeClass(btnIcon, _dom.iconClass('thumb-tack', true));
                    _dom.removeClass(btnIcon, _dom.iconClass('times-circle-o', true));
                    _dom.addClass(btnIcon, _dom.iconClass('times', true));
                    _dom.removeClass(btn, "bs-none");
                }
                return doclose;
            };
            Menu.prototype.renderContent = function () {
                var that = this;
                var opts = that.options;
                var $content = $('<div class="bs-menu-wrap bs-menu-animate bs-menu-closed bs-menu-' + opts.typeMenu
                    + '-wrap"><div class="bs-menu-button bs-none bs-menu-' + opts.typeMenu +
                    '-close"><a class="bs-xclose" href="#" data-phoenix-href="click://close"><span class="bs-icon ' +
                    _dom.iconPrefix() + '"></span></a></div></div>');
                that._updateCloseButton($content);
                return $content;
            };
            Menu.prototype._changeSelected = function (item) {
                var that = this;
                if (that.$element) {
                    var e = that.$element.get(0).childNodes[item.$childIndex];
                    if (item.selected)
                        _dom.addClass(e, "active");
                    else
                        _dom.removeClass(e, "active");
                }
            };
            Menu.prototype._selectDatasetItem = function (dataset, item) {
                var that = this;
                that.items.forEach(function (ii) {
                    if (ii.$dataset === dataset) {
                        if (ii == item) {
                            if (!ii.selected) {
                                ii.selected = true;
                                that._changeSelected(ii);
                            }
                        }
                        else if (ii.selected) {
                            ii.selected = false;
                            that._changeSelected(ii);
                        }
                    }
                });
            };
            Menu.prototype._canClick = function (item) {
                return item.$link;
            };
            Menu.prototype.render = function ($parent) {
                _super.prototype.render.call(this, $parent);
                this._onPageChanged();
            };
            Menu.prototype.renderItems = function () {
                var that = this;
                var $element = $('<ul class="bs-item-list"></ul>');
                var e = $element.get(0);
                var ci = $('<li><a class="link"><span class="title"></span></a></li>').get(0);
                var cp = $('<li class="parent"><span class="title"></span></li>').get(0);
                var ch = $('<li class="divider"></li>').get(0);
                if (that.items) {
                    var cn = 0;
                    var len = that.items.length;
                    that.items.forEach(function (item, index) {
                        if (item.isHidden)
                            return;
                        var tmp;
                        if (item.divider) {
                            tmp = ch.cloneNode(true);
                            if (item.$title)
                                _dom.text(tmp, item.$title);
                            else
                                _dom.addClass(tmp, "empty");
                        }
                        else {
                            var isParent = false;
                            if (index < len - 1) {
                                var nc = that.items[index + 1];
                                isParent = ((nc.$level || 0) > (item.$level || 0));
                            }
                            var isLink = !!item.$link;
                            tmp = isLink ? ci.cloneNode(true) : cp.cloneNode(true);
                            if (item.$level) {
                                _dom.addClass(tmp, "level");
                                _dom.addClass(tmp, "level-" + item.$level);
                            }
                            else if (isParent) {
                                _dom.addClass(tmp, "level");
                            }
                            var aa = tmp.firstChild;
                            var ii = isLink ? aa.firstChild : aa;
                            if (item.$title) {
                                var ct = (item.$icon ? ' ' + item.$title : item.$title);
                                _dom.text(ii, ct);
                            }
                            if (item.selected) {
                                _dom.addClass(tmp, "active");
                            }
                            if (isLink) {
                                _dom.attr(aa, "data-phoenix-href", "click://" + index);
                                if (!that._canClick(item)) {
                                    _dom.removeClass(aa, "link");
                                }
                            }
                            if (item.$icon) {
                                var icon = _dom.icon(item.$icon);
                                aa.insertBefore(icon, aa.firstChild);
                            }
                        }
                        e.appendChild(tmp);
                        item.$childIndex = cn;
                        cn++;
                    });
                }
                return $element;
            };
            Menu.prototype._executeLink = function (item, link) {
                var that = this;
                var ctx = _link.context(), ds;
                if (item.$dataset) {
                    ds = that.datasets[item.$dataset];
                    ctx.$item = item.$item;
                }
                if (ds && item.$link && item.$link.$datasetSelect) {
                    if (ds.selectedIndex != item.$index) {
                        ds.selectedIndex = item.$index;
                        that.ds_select(item.$dataset, item.$item);
                        that._selectDatasetItem(item.$dataset, item);
                    }
                }
                else if (item.$link)
                    return _link.execLink(item.$link, ctx, null);
            };
            Menu.prototype._onPageChanged = function () {
                var that = this;
                if (!that.$element)
                    return;
                if (that.items) {
                    var cp = that.page.currentPage();
                    that.items.forEach(function (item, index) {
                        if (item.$link && item.$link.$page) {
                            var page = _link.pageName(item.$link);
                            var selected = page == cp;
                            if (selected && item.$link.$module)
                                selected = item.$link.$module === _application.name;
                            if (item.selected != selected) {
                                item.selected = selected;
                                that._changeSelected(item);
                            }
                        }
                    });
                }
            };
            return Menu;
        }(ui.MenuBase));
        ui.Menu = Menu;
        ;
        ui.Menuleft = Menu;
        ui.Menuright = Menu;
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../core/core.ts" />
/// <reference path="../core/locale.ts" />
/// <reference path="./page.control.ts" />
var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        var _dom = Phoenix.dom, _link = Phoenix.link, _utils = Phoenix.utils, _application = Phoenix.application, _ulocale = Phoenix.ulocale, _locale = Phoenix.locale;
        var Tabs = (function () {
            function Tabs(options, tabs) {
                var that = this, defOptions = {
                    justified: false,
                    pills: false
                };
                that._page = ui.Page();
                that._options = $.extend(defOptions, options || {});
                that._tabs = tabs || [];
            }
            Tabs.prototype._renderTabs = function () {
                var that = this;
                var e = that.$element.get(0);
                var ul = e.firstChild;
                var frag = document.createDocumentFragment();
                var p = $('<li><a href="#"></a><li>').get(0);
                var cp = that._page.currentPage();
                that._tabs.forEach(function (tab, index) {
                    var ii = p.cloneNode(true);
                    var aa = ii.firstChild;
                    _dom.text(aa, _ulocale.localeTitle(tab.$title));
                    var isDisabled = false;
                    if (tab.enabled !== undefined) {
                        if (typeof tab.enabled == "string") {
                            var sval = _utils.execAngularExpression(tab.enabled, _link.context());
                            if (!sval || sval === "undefined" || sval === "false")
                                isDisabled = true;
                        }
                        else {
                            isDisabled = !tab.enabled;
                        }
                    }
                    if (isDisabled) {
                        _dom.addClass(ii, 'disabled');
                    }
                    else
                        _dom.attr(aa, "data-phoenix-href", "click://" + index);
                    if (tab.$page) {
                        var page = _link.pageName(tab);
                        var selected = page == cp;
                        if (selected && tab.$module)
                            selected = tab.$module === _application.name;
                        if (selected)
                            tab.active = true;
                        else
                            tab.active = false;
                    }
                    if (tab.active)
                        _dom.addClass(ii, 'active');
                    frag.appendChild(ii);
                });
                _dom.empty(ul);
                _dom.append(ul, frag);
            };
            Tabs.prototype._setEvents = function () {
                var that = this;
                if (that.$element) {
                    var e = that.$element.get(0);
                    that.$element.on('click', function (event) {
                        var c = _link.isCustomLink(e, event);
                        if (c && c.protocol == "click") {
                            var cs = c.value.substring(('click://').length);
                            var ii = cs.split('/');
                            var ctx = _link.context();
                            var ctab = that._tabs[parseInt(ii[0], 0)];
                            if (ctab && ctab.$page && !ctab.disabled) {
                                _link.execLink(ctab, ctx, null);
                            }
                        }
                    });
                }
            };
            Tabs.prototype._removeEvents = function () {
                var that = this;
                if (that.$element)
                    that.$element.off('click');
            };
            Tabs.prototype.render = function ($parent) {
                var that = this;
                if (!that.$element) {
                    that.$element = $('<div class="bs-widget-content-inv bs-tabs"><ul class="nav nav-tabs"><ul></div>');
                    that._renderTabs();
                    that._setEvents();
                }
                if ($parent) {
                    if (that._options.replaceParent)
                        $parent.replaceWith(that.$element);
                    else
                        $parent.append(that.$element);
                }
            };
            Tabs.prototype.destroy = function () {
                var that = this;
                that._removeEvents();
                that.$element = null;
                that._options = null;
                that._page = null;
            };
            return Tabs;
        }());
        ui.Tabs = Tabs;
        ;
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../core/core.ts" />
var Phoenix;
(function (Phoenix) {
    var LayoutUtils;
    (function (LayoutUtils) {
        var _dom = Phoenix.dom, _utils = Phoenix.utils, _locale = Phoenix.locale.layouts, _ulocale = Phoenix.ulocale, _render = Phoenix.render, _markEmptyRowAsBlock = function (layout) {
            if (!layout.$items.length) {
                layout.$type = "block";
                layout.$origin = "row";
            }
        }, _checkLayout = function (layout, parent, map, namedMap) {
            if (!layout.$id)
                layout.$id = _utils.allocID();
            if (parent)
                layout.$parentId = parent.$id;
            layout.$idDesign = layout.$id;
            layout.$idDrag = layout.$id;
            layout.$type = layout.$type || "block";
            layout.$items = layout.$items || [];
            if (!_onlyFields(layout)) {
                delete layout.$inline;
                delete layout.$fieldsOptions;
            }
            if (map)
                map[layout.$id] = layout;
            if (namedMap && layout.$name)
                map[layout.$name] = layout;
            if (layout.$type === "html" && !layout.$html) {
                layout.$html = _locale.Html;
            }
            switch (layout.$type) {
                case "row":
                    _markEmptyRowAsBlock(layout);
                    break;
            }
            if (layout.$origin && layout.$origin === layout.$type)
                delete layout.$origin;
        }, _layoutIsVisible = function (layout) {
            if (layout.$type === "accordion-group") {
                return layout.opened;
            }
            return true;
        }, _checkField = function (field, parent, map, namedMap) {
            if (!field.$id)
                field.$id = _utils.allocID();
            if (parent)
                field.$parentId = parent.$id;
            field.$idDrag = field.$id;
            if (map)
                map[field.$id] = field;
            if (namedMap && field.$name)
                map[field.$name] = field;
        }, _checkRowChilds = function (layout) {
            _markEmptyRowAsBlock(layout);
            var setCol = false;
            layout.$items.forEach(function (item) {
                item.$type = "column";
                if (!item.$colSize)
                    setCol = true;
            });
            if (setCol) {
                var value = Math.max(1, Math.floor(12 / layout.$items.length));
                var li = layout.$items.length - 1;
                var all = 0;
                layout.$items.forEach(function (item, index) {
                    if (index === li) {
                        value = 12 - all;
                    }
                    item.$colSize = value;
                    all += value;
                });
            }
        }, _checkAccordionChilds = function (layout) {
            if (!layout.$items.length) {
                layout.$items.push({
                    $type: "accordion-group"
                });
            }
            layout.$items.forEach(function (item, index) {
                item.$type = "accordion-group";
                item.$title = item.$title || {};
                item.$title.value = item.$title.value || "No title";
            });
        }, _canAddLayouts = function (layout) {
            if ((layout.$type === "accordion") || (layout.$type === "html"))
                return false;
            if (layout.$items.length > 0) {
                var l = layout.$items[0];
                if (!l.$items)
                    return false;
            }
            return true;
        }, 
        /*_hasBorder = function(layout) {
        },*/
        _needParentPadding = function (layout) {
            return (layout.$type === "accordion" && !layout.$format);
        }, _noPadding = function (layout) {
            var res = true;
            if (!layout.$items.length)
                return res;
            layout.$items.forEach(function (item) {
                if (res)
                    res = !_needParentPadding(item);
            });
            return res;
        }, _canAddFields = function (layout) {
            if (layout.$type && !layout.$items)
                layout.$items = [];
            if ((layout.$type === "row") || (layout.$type === "accordion") || (layout.$type === "html"))
                return false;
            if (layout.$items.length > 0) {
                var l = layout.$items[0];
                if (l.$type || l.$items)
                    return false;
            }
            return true;
        }, _addStdThemes = function (layout, css, options) {
            _dom.parseStyle(layout.$style, css);
            if (!options.design && layout.$isHidden) {
                css.push('bs-none');
            }
        }, _onlyFields = function (layout) {
            return !layout.$items || !layout.$items.length || layout.$items[0].$bind;
        }, _css = function (layout, parent, options) {
            var css = [], canAddLayouts, addpaddingclass;
            switch (layout.$type) {
                case "block":
                    addpaddingclass = true;
                    if (options.design && layout.selected) {
                        css.push("selected");
                    }
                    canAddLayouts = _canAddLayouts(layout);
                    if (canAddLayouts) {
                        if (options.design || _noPadding(layout)) {
                            addpaddingclass = false;
                            if (parent)
                                css.push("no-x-padding");
                        }
                        if (options.design) {
                            css.push("drop-layouts-zone");
                            if (layout.$origin === "row") {
                                css.push("row-color");
                            }
                        }
                    }
                    if (_canAddFields(layout)) {
                        if (layout.$inline && (options.design || !layout.$html))
                            css.push("form-inline bs-inline-container");
                        if (options.design) {
                            css.push("drop-fields-zone");
                            if (!canAddLayouts) {
                                addpaddingclass = false;
                                if (parent)
                                    css.push("no-x-padding");
                            }
                        }
                    }
                    if (addpaddingclass) {
                        css.push("field-container");
                    }
                    if (!parent) {
                        css.push("bs-root-container");
                        if (!layout.form)
                            css.push("page");
                    }
                    if (options.design) {
                        css.push("design");
                        if (layout.selected)
                            css.push("selected");
                    }
                    _addStdThemes(layout, css, options);
                    break;
                case "accordion":
                    if (options.step === 1) {
                        css.push("panel-group");
                        if (options.design) {
                            css.push("design");
                            if (layout.selected)
                                css.push("selected");
                        }
                        _addStdThemes(layout, css, options);
                    }
                    break;
                case "row":
                    if (options.step === 1) {
                        css.push("container-fluid");
                        if (options.design) {
                            css.push("design");
                            css.push("no-x-padding");
                            if (layout.selected)
                                css.push("selected");
                        }
                        _addStdThemes(layout, css, options);
                    }
                    else if (options.step === 2) {
                        css.push("row");
                        if (options.design) {
                            css.push("design-table");
                            css.push("row-color");
                            canAddLayouts = _canAddLayouts(layout);
                            if (canAddLayouts)
                                css.push("drop-layouts-zone");
                        }
                    }
                    break;
                case "accordion-group":
                    if (options.step === 1) {
                        css.push("panel panel-default");
                        if (options.design) {
                            css.push("design");
                            if (layout.selected)
                                css.push("selected");
                        }
                    }
                    else if (options.step === 2) {
                        css.push("panel-collapse collapse");
                        if (layout.opened)
                            css.push("in");
                    }
                    else if (options.step === 3) {
                        css.push("panel-body");
                        canAddLayouts = _canAddLayouts(layout);
                        if (canAddLayouts) {
                            if (options.design || _noPadding(layout)) {
                                css.push("no-x-padding");
                                css.push("no-y-padding");
                            }
                            if (options.design)
                                css.push("drop-layouts-zone");
                        }
                        if (_canAddFields(layout)) {
                            if (layout.$inline && (options.design || !layout.$html))
                                css.push("form-inline bs-inline-container");
                            if (options.design) {
                                css.push("drop-fields-zone");
                                if (!canAddLayouts)
                                    css.push("no-x-padding");
                            }
                        }
                        _addStdThemes(layout, css, options);
                    }
                    break;
                case "column":
                    if (options.step === 1) {
                        if (options.design)
                            css.push("col-design col-xs-" + layout.$colSize);
                        else {
                            if (layout.$customColSize)
                                css.push(layout.$customColSize);
                            else
                                css.push("col-" + (layout.$colType || "sm") + "-" + layout.$colSize);
                        }
                        css.push("no-x-padding");
                    }
                    else if (options.step === 2) {
                        addpaddingclass = true;
                        css.push("container-fluid");
                        canAddLayouts = _canAddLayouts(layout);
                        if (canAddLayouts) {
                            if (options.design || _noPadding(layout)) {
                                addpaddingclass = false;
                                css.push("no-x-padding");
                            }
                            if (options.design && !layout.$auto)
                                css.push("drop-layouts-zone");
                        }
                        if (_canAddFields(layout)) {
                            if (layout.$inline && (options.design || !layout.$html))
                                css.push("form-inline bs-inline-container");
                            if (options.design) {
                                css.push("drop-fields-zone");
                                if (!canAddLayouts) {
                                    css.push("no-x-padding");
                                    addpaddingclass = false;
                                }
                            }
                        }
                        if (addpaddingclass) {
                            css.push("field-container");
                        }
                        if (options.design) {
                            css.push("design col");
                            if (layout.$auto)
                                css.push("auto");
                            if (layout.selected)
                                css.push("selected");
                        }
                        _addStdThemes(layout, css, options);
                    }
                    break;
                case "html":
                    if (options.design) {
                        css.push("design");
                        if (layout.selected)
                            css.push("selected");
                    }
                    _addStdThemes(layout, css, options);
                    break;
            }
            return css;
        }, _setLayoutCss = function (e, layout, parent, options) {
            var css = _css(layout, parent, options), t;
            e.className = css.join(' ');
            if (layout.$type === "accordion-group" && options.step === 1) {
                t = _dom.find(e, layout.$id + "_title");
                if (t)
                    _dom.text(t, (layout.$title && layout.$title.value) ? layout.$title.value : "");
            }
            else if (layout.$type === "html" && options.step === 1) {
                e.innerHTML = layout.$html || '';
            }
        }, _addLayoutCss = function (html, layout, parent, options) {
            var css = _css(layout, parent, options);
            if (css.length) {
                html.push(' class="');
                html.push(css.join(' '));
                html.push('"');
            }
        }, _addId = function (html, layout, prefix) {
            html.push(' id="');
            html.push(prefix ? (prefix + "_" + layout.$id) : layout.$id);
            html.push('"');
        }, _addDataStep = function (html, step, design) {
            if (design) {
                html.push(' data-level="');
                html.push(step);
                html.push('"');
            }
        }, _addLayoutId = function (html, step, layout, design, force) {
            if (force || design) {
                html.push(' data-layout="');
                html.push(layout.$id);
                html.push('"');
                layout.$idSelect = null;
            }
            if (force || (design && step > 1)) {
                var id = layout['$idStep' + step];
                if (id) {
                    html.push(' id="');
                    html.push(id);
                    html.push('"');
                }
            }
        }, _addTitle = function (html, layout, llocale, isForm) {
            if (isForm && layout.$title) {
                var size = layout.$title.size || 4;
                html.push('<h' + size);
                var css = ['bs-block-title'];
                if (layout.$title.$style)
                    _dom.parseStyle(layout.$title.$style, css);
                html.push(' data-ignore="true" class="' + css.join(' ') + '">');
                if (layout.$title.value)
                    html.push(_utils.escapeHtml(_ulocale.tt(layout.$title.value, llocale)));
                html.push('</h' + size + '>');
            }
        }, _blockBefore = function (html, layout, parent, model, llocale, design, isForm, refBlock) {
            html.push('<div');
            if (design)
                html.push(' draggable="true"');
            _addLayoutCss(html, layout, parent, {
                design: design,
                step: 1
            });
            _addLayoutId(html, 1, layout, design);
            _addId(html, layout);
            _addDataStep(html, 1, design);
            html.push('>');
            _addTitle(html, layout, llocale, isForm);
        }, _blockAfter = function (html, layout, parent, model, llocale, design) {
            html.push('</div>');
        }, _addLinkSublayout = function (html, layout, parent, model, llocale, design) {
            html.push(_utils.format('<div id="{0}_settings" class="bs-cursor-p bs-layout-detail" data-layout-detail="true"><span class="' + _dom.iconClass('cog') + '"></span></div>', layout.$id));
        }, _htmlBefore = function (html, layout, parent, model, llocale, design, refBlock) {
            html.push('<div');
            if (design)
                html.push(' draggable="true"');
            _addLayoutCss(html, layout, parent, {
                design: design,
                step: 1
            });
            _addLayoutId(html, 1, layout, design);
            _addId(html, layout);
            _addDataStep(html, 1, design);
            html.push('>');
            if (layout.$html)
                html.push(layout.$html);
        }, _htmlAfter = function (html, layout, model, llocale, design) {
            html.push('</div>');
        }, _accordionBefore = function (html, layout, parent, model, llocale, design, isForm, refBlock) {
            html.push('<div role="tablist" aria-multiselectable="true"');
            if (design)
                html.push(' draggable="true"');
            _addLayoutCss(html, layout, parent, {
                design: design,
                step: 1
            });
            _addLayoutId(html, 1, layout, design);
            _addId(html, layout);
            _addDataStep(html, 1, design);
            html.push('>');
            _checkAccordionChilds(layout);
        }, _accordionAfter = function (html, layout, parent, model, llocale, design) {
            html.push('</div>');
        }, _accordionGroupBefore = function (html, layout, parent, model, llocale, design, isForm, refBlock) {
            html.push('<div');
            _addLayoutCss(html, layout, parent, {
                design: design,
                step: 1
            });
            _addId(html, layout);
            layout.$idStep2 = layout.$id + "_s2";
            layout.$idStep3 = layout.$id + "_s3";
            layout.$idDesign = layout.$idStep3;
            html.push('>');
            html.push('<div class="panel-heading" role="tab"');
            _addId(html, layout, "heading");
            html.push('>');
            html.push('<h4 class="panel-title bs-pointer collapsed" data-toggle="collapse" data-parent="#' + parent.$id + '"');
            if (layout.opened)
                html.push(' aria-expanded="true"');
            else
                html.push(' aria-expanded="false"');
            html.push(' data-target="#' + layout.$idStep2 + '" aria-controls="' + layout.$idStep2 + '"');
            html.push(' id="' + layout.$id + '_title">');
            html.push(_utils.escapeHtml(layout.$title ? layout.$title.value : ''));
            html.push('</h4>');
            html.push('</div>');
            html.push('<div role="tabpanel" aria-labelledby="heading_' + layout.$id + '"');
            _addLayoutCss(html, layout, parent, {
                design: design,
                step: 2
            });
            _addLayoutId(html, 2, layout, design, true);
            _addDataStep(html, 2, design);
            html.push('>');
            html.push('<div');
            _addLayoutCss(html, layout, parent, {
                design: design,
                step: 3
            });
            _addLayoutId(html, 3, layout, design, true);
            html.push('>');
        }, _accordionGroupAfter = function (html, layout, parent, model, llocale, design) {
            html.push('</div></div></div>');
        }, _rowBefore = function (html, layout, parent, model, llocale, design, isForm, refBlock) {
            html.push('<div');
            if (design)
                html.push(' draggable="true"');
            _addLayoutCss(html, layout, parent, {
                design: design,
                step: 1
            });
            _addId(html, layout);
            _addLayoutId(html, 1, layout, design);
            _addDataStep(html, 1, design);
            html.push('>');
            layout.$idStep2 = layout.$id + "_s2";
            layout.$idDesign = layout.$idStep2;
            html.push('<div');
            _addLayoutCss(html, layout, parent, {
                design: design,
                step: 2
            });
            _addLayoutId(html, 2, layout, design);
            _addDataStep(html, 2, design);
            html.push('>');
            _checkRowChilds(layout);
        }, _rowAfter = function (html, layout, parent, model, llocale, design) {
            html.push('</div></div>');
        }, _columnBefore = function (html, layout, parent, model, llocale, design, isForm, refBlock) {
            html.push('<div');
            _addLayoutCss(html, layout, parent, {
                design: design,
                step: 1
            });
            _addLayoutId(html, 1, layout, design);
            _addId(html, layout);
            _addDataStep(html, 1, design);
            html.push('>');
            html.push('<div');
            _addLayoutCss(html, layout, parent, {
                design: design,
                step: 2
            });
            if (design)
                html.push(' draggable="true"');
            layout.$idDesign = layout.$id + "_design";
            layout.$idDrag = layout.$id;
            layout.$idStep2 = layout.$idDesign;
            _addLayoutId(html, 2, layout, design);
            _addDataStep(html, 2, design);
            layout.$idSelect = layout.$idDesign;
            html.push('>');
            _addTitle(html, layout, llocale, isForm);
        }, _columnAfter = function (html, layout, parent, model, llocale, design) {
            html.push('</div></div>');
        }, _enumElements = function (layout, parent, onElement, root, param) {
            if (layout) {
                if (root && !layout.$type && !layout.$items) {
                    onElement(layout, parent, false, true, param);
                    return;
                }
                onElement(layout, parent, true, true, param);
                if (param && param.stop) {
                }
                else {
                    if (_canAddFields(layout)) {
                        if (layout.$items)
                            layout.$items.forEach(function (item) {
                                onElement(item, layout, false, true, param);
                            });
                    }
                    else {
                        if (layout.$items)
                            layout.$items.forEach(function (item) {
                                _enumElements(item, layout, onElement, false, param);
                            });
                    }
                }
                onElement(layout, parent, true, false, param);
            }
        }, _nullHtmlFieldRender = function (html, item, layout, model, options) {
            html.push('<div class="bs-island' + (options.design ? ' design' : '') + (item.$config ? ' bs-widget' : ' bs-field') + (item.selected ? ' selected"' : '"'));
            if (options.design)
                html.push(' draggable="true"');
            html.push(' data-render="' + item.$id + '"');
            html.push(' id="' + item.$id + '"');
            html.push('></div>');
        }, _nullWidgetRender = function (html, item, layout, model, options) {
            html.push('<div id="' + item.$id + '"></div>');
        }, _renderLayout = function (layout, model, html, llocale, options) {
            var wHtmlFieldRender = _render.get(options.context, "widget") || _nullWidgetRender;
            var fHtmlFieldRender = _render.get(options.context, "field") || _nullHtmlFieldRender;
            var isForm = layout.form;
            var p = {
                html: html
            };
            _enumElements(layout, null, function (item, parent, isLayout, before, param) {
                if (isLayout) {
                    var rb = _blockBefore;
                    var ra = _blockAfter;
                    switch (item.$type) {
                        case "row":
                            rb = _rowBefore;
                            ra = _rowAfter;
                            break;
                        case "column":
                            rb = _columnBefore;
                            ra = _columnAfter;
                            break;
                        case "accordion":
                            rb = _accordionBefore;
                            ra = _accordionAfter;
                            break;
                        case "accordion-group":
                            rb = _accordionGroupBefore;
                            ra = _accordionGroupAfter;
                            break;
                        case "html":
                            rb = _htmlBefore;
                            ra = _htmlAfter;
                            break;
                    }
                    if (before) {
                        if (item.$ref && options.design) {
                            param.stop = true;
                        }
                        rb(param.html, item, parent, model, llocale, options.design, isForm, param.stop);
                        if (param.stop)
                            _addLinkSublayout(param.html, item, parent, model, llocale, options.design);
                        if (!_layoutIsVisible(item)) {
                            item.oldHtml = param.html;
                            param.html = [];
                        }
                    }
                    else {
                        if (!_layoutIsVisible(item)) {
                            item.$content = param.html;
                            param.html = item.oldHtml;
                            delete item.oldHtml;
                        }
                        if (!options.design && item.$html && item.$items && item.$items.length && _canAddFields(item)) {
                            param.html.push(_utils.format(item.$html.replace(/id="/g, 'id="{0}_'), item.$id));
                        }
                        ra(param.html, item, parent, model, llocale, options.design);
                        if (item.$ref && options.design) {
                            param.stop = false;
                        }
                    }
                }
                else {
                    if (item.$config)
                        wHtmlFieldRender(param.html, item, parent, model, options);
                    else
                        fHtmlFieldRender(param.html, item, parent, model, options);
                }
            }, true, p);
        }, _canSelectLayout = function (layout, level) {
            if (layout.$auto)
                return false;
            if (layout.$type === "column" && level === 1)
                return false;
            return true;
        }, _check = function (layout, parentLayout, map, mapFields, namedMap, namedFieldMap) {
            _enumElements(layout, parentLayout, function (item, parent, isLayout, before) {
                if (before) {
                    if (isLayout)
                        _checkLayout(item, parent, map, namedMap);
                    else {
                        _checkField(item, parent, mapFields, namedFieldMap);
                    }
                }
            }, true);
        }, _clearMeta = function (layout, clearIds) {
            _enumElements(layout, null, function (item, parent, isLayout, before) {
                if (before) {
                    if (isLayout) {
                        if (clearIds)
                            delete item.$id;
                        delete item.$render;
                        delete item.$idDesign;
                        delete item.$idDrag;
                        delete item.$idSelect;
                        delete item.$parentId;
                        delete item.$idStep2;
                        delete item.$idStep3;
                        delete item.selected;
                        if (item.$type === 'column')
                            delete item.$type;
                        else if (layout.$type === "html") {
                            if (layout.$html === _locale.Html)
                                delete layout.$html;
                        }
                    }
                    else {
                        delete item.$render;
                        if (clearIds)
                            delete item.$id;
                        delete item.$parentId;
                        delete item.$idDrag;
                        delete item.selected;
                        if (item.$config) {
                            if (item.$config.data) {
                                delete item.$config.data.ds;
                                if (!Object.keys(item.$config.data).length)
                                    delete item.$config.data;
                            }
                            if (item.$config.$titleIsHidden || item.$config.$dontSaveTitle) {
                                delete item.$config.$title;
                            }
                        }
                    }
                }
            }, true);
        }, _clearMaps = function (layout, map, mapFields, namedMap, namedMapFields) {
            _enumElements(layout, null, function (item, parent, isLayout, before) {
                if (before) {
                    if (isLayout) {
                        delete map[item.$id];
                        delete namedMap[item.$id];
                    }
                    else {
                        delete mapFields[item.$id];
                        delete namedMapFields[item.$id];
                    }
                }
            }, true);
        }, _afterRemoveChild = function (layout, map, mapFields, namedMap, namedMapFields) {
            if (layout.$type === "row") {
                layout.$items.forEach(function (item) {
                    item.$type = "column";
                    delete item.$colSize;
                });
                _checkRowChilds(layout);
                layout.$items.forEach(function (item) {
                    _check(item, layout, map, mapFields, namedMap, namedMapFields);
                });
            }
            else if (layout.$type === "accordion") {
                _checkAccordionChilds(layout);
                layout.$items.forEach(function (item) {
                    _check(item, layout, map, mapFields, namedMap, namedMapFields);
                });
            }
        }, _toHtml = function (layout, model, llocale, options) {
            var html = [];
            _renderLayout(layout, model, html, llocale, options);
            return html.join('');
        };
        LayoutUtils.check = _check;
        LayoutUtils.layoutVisible = _layoutIsVisible;
        LayoutUtils.clearMeta = _clearMeta;
        LayoutUtils.clearMaps = _clearMaps;
        LayoutUtils.afterRemoveChild = _afterRemoveChild;
        LayoutUtils.canSelect = _canSelectLayout;
        LayoutUtils.updateCssClass = _setLayoutCss;
        LayoutUtils.toHtml = _toHtml;
    })(LayoutUtils = Phoenix.LayoutUtils || (Phoenix.LayoutUtils = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../core/core.ts" />
/// <reference path="./module.ts" />
/// <reference path="./datasets-plugin.ts" />
/// <reference path="./page.control.ts" />
/// <reference path="./layout.ts" />
/// <reference path="./menu.ts" />
var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        var _dom = Phoenix.dom, _utils = Phoenix.utils, _locale = Phoenix.locale, _wutils = Phoenix.WidgetUtils, _link = Phoenix.link, _render = Phoenix.render, _ipc = Phoenix.ipc, _layoutUtils = Phoenix.LayoutUtils, _findSelected = function (maps) {
            var j = maps.length;
            while (j--) {
                var map = maps[j];
                var ids = Object.keys(map);
                var i = ids.length;
                while (i--) {
                    var o = map[ids[i]];
                    if (o.selected) {
                        return o;
                    }
                }
            }
            return null;
        };
        var BaseLayout = (function () {
            function BaseLayout(ldata, options, fdata, schema, locale) {
                this.$locale = null;
                this._init(ldata, options);
            }
            BaseLayout.prototype._afterCreate = function () {
            };
            BaseLayout.prototype._init = function (ldata, options) {
                //Layout
                var that = this;
                that.$element = null;
                that.$content = null;
                that.options = options || {};
                that.options.context = that.options.context || "javascript";
                that.map = {};
                that.mapFields = {};
                that.namedMap = {};
                that.namedMapFields = {};
                ldata = ldata || {};
                _layoutUtils.check(ldata, null, that.map, that.mapFields, that.namedMap, that.namedMapFields);
                that.data = ldata;
                that.data.form = that.options.form;
                ldata.map = that.map;
                ldata.fields = that.mapFields;
                that.children = {}; //Is used only in javascript mode to cleanup children
                that.controls = {}; // list of instanced modules or controls   
                that.expressionTitle = false;
                var isForm = that.options.form;
                if (!isForm) {
                    that.page = ui.Page();
                    that.page.setPopup(null);
                    that.page.addChild("layout", that);
                    if (!that.options.design) {
                        that.expressionTitle = _utils.hasExpression(ldata.$title);
                        that.page.props.$title = ldata.$title ? _utils.parseExpression(ldata.$title, _link.context()) : null;
                    }
                }
                that._setDesignListeners();
                that.pageLayoutInit();
            };
            BaseLayout.prototype.pageLayoutInit = function () { };
            BaseLayout.prototype.getSchema = function (path) { return null; };
            BaseLayout.prototype.getLookupForSchema = function (path, lookupName) { return null; };
            BaseLayout.prototype._setDesignListeners = function () { };
            BaseLayout.prototype._removeEvents = function () {
                var that = this;
                that._removeBaseEvents();
            };
            BaseLayout.prototype._addEvents = function () {
                var that = this;
                that._addBaseEvents();
            };
            BaseLayout.prototype._removeBaseEvents = function () {
                var that = this;
                that._removeAccordionEvents();
            };
            BaseLayout.prototype._addBaseEvents = function () {
                var that = this;
                that._setAccordionEvents();
            };
            BaseLayout.prototype._onSelectedChanged = function (element, data, notify) { };
            BaseLayout.prototype._showSelected = function ($element, layout) { };
            BaseLayout.prototype._setAccordionEvents = function () {
                var that = this;
                that.$element.on('show.bs.collapse hide.bs.collapse', function (event) {
                    var ee = event.target;
                    if (!ee || !ee.hasAttribute('data-layout'))
                        return;
                    var id = ee.getAttribute('data-layout');
                    var l = that.getLayoutById(id);
                    if (l) {
                        var nv = event.type == "show";
                        if (l.opened == nv)
                            return;
                        if (nv) {
                            var parentLayout = that.getLayoutById(l.$parentId);
                            if (parentLayout) {
                                for (var i = 0, len = parentLayout.$items.length; i < len; i++) {
                                    var ci = parentLayout.$items[i];
                                    if (ci.opened) {
                                        ci.opened = false;
                                        that._activateLayout(ci, false);
                                        break;
                                    }
                                }
                            }
                            l.opened = nv;
                            if (l.$content)
                                that._renderLayoutContent(l);
                            else
                                that._activateLayout(l, true);
                        }
                        else {
                            that._activateLayout(l, false);
                        }
                    }
                });
            };
            BaseLayout.prototype._doDatasetEventAfterEnabled = function (child) { };
            BaseLayout.prototype._activateLayout = function (layout, value) {
                var that = this, children;
                if (value) {
                    children = that._getVisibleChildren(layout);
                    children.forEach(function (child) {
                        child.disabled = false;
                        that._doDatasetEventAfterEnabled(child);
                    });
                }
                else {
                    // disable all childrens
                    children = that._getChildrenOf(layout);
                    children.forEach(function (child) {
                        child.disabled = true;
                    });
                }
            };
            BaseLayout.prototype._removeAccordionEvents = function () {
                var that = this;
                that.$element.off('show.bs.collapse hide.bs.collapse');
            };
            BaseLayout.prototype.toString = function (layout) {
                return null;
            };
            /* Start datasets methods */
            BaseLayout.prototype.emit = function (eventName, value, filter) {
                this.emitDataEvent(eventName, value, filter);
            };
            /* End datasets methods */
            BaseLayout.prototype.openErrors = function () {
                var that = this;
                if (that.$element) {
                    var eerr = _dom.find(that.$element.get(0), that.data.$id + '_error');
                    if (eerr && eerr.firstChild) {
                        _dom.removeClass(eerr.firstChild, 'bs-none');
                    }
                }
            };
            BaseLayout.prototype._renderLayout = function (layout) {
                var that = this;
                var $e = $(_layoutUtils.toHtml(layout, null, that.$locale, {
                    design: that.options.design,
                    context: that.options.context
                }));
                that.afterRender($e);
                that._renderChildren($e);
                that.afterRenderChildren($e);
                return $e;
            };
            BaseLayout.prototype.afterRenderChildren = function ($e) {
            };
            BaseLayout.prototype.isChildOf = function (child, layout) {
                var that = this;
                var cl = that.map[child];
                while (cl) {
                    if (cl == layout)
                        return true;
                    ;
                    cl = that.map[cl.$parentId];
                }
                return false;
            };
            BaseLayout.prototype._isChildVisibleOf = function (child, layout) {
                var that = this;
                var cl = that.map[child];
                while (cl) {
                    if (!_layoutUtils.layoutVisible(cl))
                        return false;
                    if (cl == layout)
                        return true;
                    cl = that.map[cl.$parentId];
                }
                return false;
            };
            BaseLayout.prototype._getVisibleChildren = function (layout) {
                var that = this;
                var res = [];
                Object.keys(that.controls).forEach(function (cn) {
                    var c = that.controls[cn];
                    if (that.controls[cn].item)
                        if (that._isChildVisibleOf(that.controls[cn].item.$parentId, layout))
                            res.push(c);
                });
                return res;
            };
            BaseLayout.prototype._getChildrenOf = function (layout) {
                var that = this;
                var res = [];
                Object.keys(that.controls).forEach(function (cn) {
                    var c = that.controls[cn];
                    if (that.controls[cn].item)
                        if (that.isChildOf(that.controls[cn].item.$parentId, layout))
                            res.push(c);
                });
                return res;
            };
            BaseLayout.prototype._getEventListFor = function (list) {
                //var that = this;
                var res = [];
                list.forEach(function (ci) {
                    if (ci.datasets) {
                        Object.keys(ci.datasets).forEach(function (dsn) {
                            var ds = ci.datasets[dsn];
                            if (ds.enumTriggers) {
                                ds.enumTriggers(false, function (tn) {
                                    if (res.indexOf(tn) < 0)
                                        res.push(tn);
                                });
                            }
                        });
                    }
                });
                return res;
            };
            BaseLayout.prototype._refreshDataSets = function (children) { };
            BaseLayout.prototype._renderLayoutContent = function (layout) {
                var that = this;
                var cc = _dom.find(that.$element.get(0), layout.$idDesign);
                if (!cc)
                    return;
                var $p = $(cc);
                var $e = $(layout.$content.join(''));
                var parent = cc.parentNode, cb = cc.nextSibling;
                $p.detach();
                $p.append($e);
                delete layout.$content;
                if (that.options.beforeAdd)
                    that.options.beforeAdd($p, true);
                parent.insertBefore(cc, cb);
                that._renderChildren($p);
                var vc = that._getVisibleChildren(layout);
                that._refreshDataSets(vc);
            };
            BaseLayout.prototype._isVisible = function (id) {
                var that = this;
                while (true) {
                    if (!id)
                        return true;
                    var layout = that.map[id];
                    if (!layout)
                        return true;
                    if (!_layoutUtils.layoutVisible(layout))
                        return false;
                    id = layout.$parentId;
                }
            };
            BaseLayout.prototype._renderChildren = function ($e) {
                var that = this;
                var res = [];
                var e = $e.get(0);
                var wc = _render.get(that.options.context, 'widget.control');
                var fc = _render.get(that.options.context, 'field.control');
                if (wc || fc) {
                    // only on javascript mode
                    Object.keys(that.mapFields).forEach(function (fn) {
                        if (that.children[fn])
                            return;
                        var fd = that.mapFields[fn];
                        if (!that._isVisible(fd.$parentId))
                            return;
                        var _constructor = fd.$config ? wc : fc;
                        var isField = _constructor == fc;
                        if (isField) {
                            var isMeta = (fd.$bind || '').indexOf('$$') === 0;
                            var schema = that.getSchema(fd.$bind), lookup = void 0;
                            if (!schema && !isMeta)
                                console.log('Schema not found for field "' + fd.$bind + '".');
                            if (fd && fd.$lookup) {
                                lookup = that.getLookupForSchema(fd.$bind, fd.$lookup);
                            }
                            _constructor = _constructor ? _constructor(fd, schema, lookup) : null;
                        }
                        if (_constructor) {
                            var p, opt = { context: that.options.context, design: that.options.design, replaceParent: true, readOnly: fd.$readOnly };
                            if (isField) {
                                p = new _constructor(fd, opt, that);
                            }
                            else
                                p = new _constructor(fd, opt, that);
                            var hparent = void 0;
                            if (that.options.design || !fd.$htmlParent) {
                                hparent = _dom.find(e, fd.$id);
                            }
                            else {
                                hparent = _dom.find(e, fd.$parentId + "_" + fd.$htmlParent);
                                if (hparent) {
                                    opt.replaceParent = false;
                                    var op = _dom.find(e, fd.$id);
                                    if (op)
                                        _dom.remove(op);
                                }
                                else
                                    hparent = _dom.find(e, fd.$id);
                            }
                            p.render($(hparent));
                            that.children[fn] = p;
                            that.controls[fn] = p;
                            if (p.resize) {
                                that.resizeList = that.resizeList || [];
                                that.resizeList.push(p);
                            }
                            res.push(p);
                        }
                    });
                }
                return res;
            };
            BaseLayout.prototype._clearChildren = function () {
                var that = this;
                var children = that.children;
                that.children = {};
                that.controls = {};
                that.resizeList = null;
                Object.keys(children).forEach(function (v) {
                    var c = children[v];
                    c.destroy();
                });
            };
            BaseLayout.prototype._refreshSelected = function () {
                var that = this;
                if (that.options.design) {
                    var o = _findSelected([that.map, that.mapFields]);
                    that._onSelectedChanged(that.$element.get(0), o, true);
                }
            };
            BaseLayout.prototype.registerDataListener = function (value) {
                var that = this;
                if (that.page)
                    that.page.registerDataListener(value, that);
            };
            BaseLayout.prototype.removeDataListener = function (listener) {
                var that = this;
                if (that.page) {
                    if (listener == that)
                        that.page.removeParentDataListener(that);
                    else
                        that.page.removeDataListener(listener);
                }
            };
            BaseLayout.prototype.emitDataEvent = function (event, value, filter) {
                var that = this;
                if (that.page)
                    that.page.emitDataEvent(event, value, filter);
            };
            BaseLayout.prototype.afterRender = function ($e) { };
            BaseLayout.prototype._internalRender = function ($parent, refresh) {
                var that = this;
                if (!that.$element) {
                    that.$element = that._renderLayout(that.data);
                    if (that.options.beforeAdd)
                        that.options.beforeAdd(that.$element, refresh);
                    that.$content.append(that.$element);
                    that._addEvents();
                    that._refreshSelected();
                    if ($parent) {
                        if (!that.options.form)
                            _dom.bodyTheme(that.data.$theme);
                        if (that.options.replaceParent)
                            $parent.replaceWith(that.$content);
                        else
                            $parent.append(that.$content);
                        that.afterAddedInDom();
                    }
                }
                return that.$content;
            };
            BaseLayout.prototype.afterAddedInDom = function () { };
            BaseLayout.prototype._callInternalRender = function ($parent, refresh) {
                var that = this;
                that._internalRender($parent, refresh);
            };
            BaseLayout.prototype.render = function ($parent) {
                var that = this, refresh;
                if (that.$content) {
                    if (that.$element) {
                        refresh = true;
                        that._clearChildren();
                        that._removeEvents();
                        if (that.options.beforeRemove)
                            that.options.beforeRemove(that.$element);
                        that.$element.remove();
                        that.$element = null;
                    }
                }
                else
                    that.$content = $('<div></div>');
                that._callInternalRender($parent, refresh);
                return that.$content;
            };
            BaseLayout.prototype._destroyDataSets = function () { };
            BaseLayout.prototype.destroy = function () {
                var that = this;
                _utils.log("Destroy Layout", "destroy");
                that._destroyDataSets();
                _ipc.unlisten(that);
                that.removeDataListener(that);
                that._clearChildren();
                if (that.page) {
                    that.page.removeChild(that);
                    that.page = null;
                }
                if (that.$element) {
                    that._removeEvents();
                    that.$element = null;
                }
                that.map = null;
                that.mapFields = null;
                that.namedMap = null;
                that.namedMapFields = null;
                _layoutUtils.clearMeta(that.data, false);
            };
            BaseLayout.prototype.check = function (layout, parent) {
                var that = this;
                var restoreMap = false;
                if (!layout) {
                    that.map = {};
                    that.mapFields = {};
                    that.namedMap = {};
                    that.namedMapFields = {};
                    parent = null;
                    layout = that.data;
                    restoreMap = true;
                }
                _layoutUtils.check(layout, parent, that.map, that.mapFields, that.namedMap, that.namedMapFields);
                if (restoreMap) {
                    layout.fields = that.mapFields;
                    layout.map = that.map;
                }
            };
            BaseLayout.prototype._afterStructureChanged = function (layout) {
                var that = this;
                that.render();
            };
            BaseLayout.prototype._afterPropsChanged = function (item) {
                var that = this;
                if (!this.$element)
                    return;
                var element = this.$element.get(0);
                if (!element)
                    return;
                var l1 = _dom.find(element, item.$id);
                var l2 = (item.$id != item.$idStep2) ? _dom.find(element, item.$idStep2) : null;
                var l3 = (item.$idStep3) ? _dom.find(element, item.idStep3) : null;
                if (l1)
                    _layoutUtils.updateCssClass(l1, item, that.getLayoutById(item.$parentId), {
                        design: that.options.design,
                        step: 1
                    });
                if (l2)
                    _layoutUtils.updateCssClass(l2, item, that.getLayoutById(item.$parentId), {
                        design: that.options.design,
                        step: 2
                    });
                if (l3)
                    _layoutUtils.updateCssClass(l3, item, that.getLayoutById(item.$parentId), {
                        design: that.options.design,
                        step: 3
                    });
                if (item.selected)
                    that._refreshSelected();
            };
            BaseLayout.prototype.removeChild = function (id) {
                var that = this;
                if (!id || !that.options.design)
                    return;
                var d = that.map[id] || that.mapFields[id];
                if (!d)
                    return;
                var p = that.map[d.$parentId];
                if (!p)
                    return;
                if (p.$auto) {
                    d = p;
                    p = that.map[d.$parentId];
                    if (!p)
                        return;
                }
                var i = p.$items.indexOf(d);
                p.$items.splice(i, 1);
                _layoutUtils.clearMaps(d, this.map, this.mapFields, that.namedMap, that.namedMapFields);
                _layoutUtils.afterRemoveChild(p, that.map, that.mapFields, that.namedMap, that.namedMapFields);
                that._afterStructureChanged(p);
            };
            BaseLayout.prototype.setDesignMode = function (value) {
                var that = this;
                if (that.options.design != value) {
                    that.options.design = value;
                    that.render();
                }
            };
            BaseLayout.prototype.getLayoutById = function (id) {
                if (!id)
                    return null;
                var that = this;
                return that.map[id];
            };
            BaseLayout.prototype.getFieldById = function (id) {
                if (!id)
                    return null;
                var that = this;
                return that.mapFields[id];
            };
            BaseLayout.prototype.select = function (id) {
                var that = this;
                var $e = that.$element;
                if (!that.options.design)
                    return;
                var o = _findSelected([that.map, that.mapFields]);
                if (o) {
                    o.selected = false;
                    that._showSelected($e, o);
                    that._onSelectedChanged($e.get(0), o, false);
                    if (o.$id == id) {
                        that._onSelectedChanged($e.get(0), null, true);
                        return;
                    }
                }
                if (!id)
                    return;
                var d = (that.map[id] ? that.map[id] : that.mapFields[id]);
                if (d) {
                    d.selected = true;
                    that._showSelected($e, d);
                    that._onSelectedChanged($e.get(0), d, true);
                }
            };
            BaseLayout.prototype.updateField = function (id, data) {
                var that = this;
                var dst = that.mapFields[id];
                if (!dst)
                    return;
                if (dst.$render && dst.$config) {
                    Object.keys(data.$config).forEach(function (pn) {
                        if (pn === "form" || pn === "data" || pn === "datasets")
                            return;
                        if (dst.$render[pn] != data.$config[pn]) {
                            dst.$render[pn] = data.$config[pn];
                        }
                    });
                    if (dst.$config.hasOwnProperty('form') || data.$config.hasOwnProperty('form'))
                        dst.$config.form = data.$config.form;
                    dst.$config.datasets = data.$config.datasets;
                    dst.$config.data = data.$config.data;
                    that._afterStructureChanged(null);
                }
                else {
                    if (_utils.equals(dst, data)) {
                        return;
                    }
                    var nkeys_1 = Object.keys(data);
                    var okeys = Object.keys(dst);
                    nkeys_1.forEach(function (pn) {
                        dst[pn] = data[pn];
                    });
                    nkeys_1.push('$id');
                    nkeys_1.push('$parentId');
                    nkeys_1.push('$idDrag');
                    okeys.forEach(function (pn) {
                        if (nkeys_1.indexOf(pn) < 0) {
                            delete dst[pn];
                        }
                    });
                    var control = that.children[id];
                    if (control) {
                        delete that.controls[id];
                        delete that.children[id];
                        control.destroy();
                    }
                    that._afterStructureChanged(null);
                }
            };
            BaseLayout.prototype._cleanIds = function (item) {
                item.$idDesign = null;
                item.$idDrag = null;
                item.$idSelect = null;
                item.$idStep2 = null;
                item.$idStep3 = null;
            };
            //convert blocks to columns
            BaseLayout.prototype._blockToCols = function (layout) {
                var that = this;
                if (layout.$items)
                    layout.$items.forEach(function (item, index) {
                        var tt = item.$origin || item.$type;
                        if (tt === "block" || tt === "column") {
                            item.$type = "column";
                            that._cleanIds(layout);
                        }
                        else {
                            var ni = { $items: [item], $auto: true, $type: "column", $colSize: item.$colSize, $customColSize: item.$customColSize };
                        }
                    });
            };
            BaseLayout.prototype._changeType = function (layout, newtype) {
                var that = this;
                var parent = that.map[layout.$parentId];
                var pp = parent && parent.$auto ? that.map[parent.$parentId] : null;
                var ot = layout.$origin || layout.$type;
                switch (ot) {
                    case "block":
                        if (newtype === "row") {
                            layout.$type = newtype;
                            that._blockToCols(layout);
                            that._cleanIds(layout);
                            that.check(layout, parent);
                        }
                        break;
                    case "column":
                        if (newtype === "row") {
                            var ni = { $items: layout.$items, $type: newtype, selected: false };
                            layout.$auto = true;
                            layout.$type = "column";
                            layout.$items = [ni];
                            if (layout.selected) {
                                layout.selected = false;
                                ni.selected = true;
                            }
                            that._blockToCols(ni);
                            that._cleanIds(layout);
                            that.check(layout, parent);
                        }
                        break;
                    case "row":
                        if (newtype === "block") {
                            if (pp) {
                                var ii = pp.$items.indexOf(parent);
                                pp.$items[ii] = layout;
                                layout.$type = parent.$type;
                                layout.$parentId = pp.$id;
                                if (parent.$type == "column") {
                                    layout.$colSize = parent.$colSize;
                                    layout.$customColSize = parent.$customColSize;
                                }
                                parent = pp;
                            }
                            else
                                layout.$type = newtype;
                            if (layout.$origin)
                                delete layout.$origin;
                            if (layout.$items) {
                                layout.$items.forEach(function (item, index) {
                                    if (item.$type) {
                                        if (item.$auto) {
                                            var ni = item.$items[0];
                                            ni.$colSize = item.$colSize;
                                            ni.$customColSize = item.$customColSize;
                                            ni.$parentId = layout;
                                            layout.$items[index] = ni;
                                            that._cleanIds(item);
                                        }
                                        else {
                                            item.$type = "block";
                                            that._cleanIds(item);
                                        }
                                    }
                                });
                            }
                            that._cleanIds(layout);
                            that.check(layout, parent);
                        }
                        break;
                    case "accordion":
                        break;
                }
            };
            BaseLayout.prototype.updateIsHidden = function (layout, isHidden) {
                var that = this;
                if (layout.$isHidden !== isHidden) {
                    layout.$isHidden = isHidden;
                    that._afterPropsChanged(layout);
                }
            };
            BaseLayout.prototype.updateLayout = function (id, data) {
                var that = this;
                var dst = that.map[id];
                var structChanged = false;
                var propsChanged = false;
                var reloadChildrens = false;
                if (dst) {
                    delete data.onlyFields;
                    if (data.$type) {
                        var ov = dst.$origin || dst.$type;
                        if (data.$type !== ov) {
                            that._changeType(dst, data.$type);
                            delete data.$type;
                            structChanged = true;
                        }
                    }
                    if (data.parent) {
                        var pdst = that.map[dst.$parentId];
                        that._disableRules = true;
                        Object.keys(data.parent).forEach(function (pn) {
                            if (data.parent[pn] !== pdst[pn]) {
                                pdst[pn] = data.parent[pn];
                                structChanged = true;
                            }
                        });
                        that._disableRules = false;
                        delete data.parent;
                    }
                    delete data.selected;
                    that._disableRules = true;
                    if (dst.$title && !data.$title) {
                        delete dst.$title;
                        structChanged = true;
                    }
                    else if (!dst.$title && data.$title) {
                        delete dst.$title;
                        dst.$title = data.$title;
                        delete data.$title;
                        structChanged = true;
                    }
                    else if (dst.$title && data.$title) {
                        Object.keys(data.$title).forEach(function (pn) {
                            if (data.$title[pn] != dst.$title[pn]) {
                                dst.$title[pn] = data.$title[pn];
                                structChanged = true;
                            }
                        });
                        delete data.$title;
                    }
                    if ((dst.$inline || false) !== (data.$inline || false)) {
                        dst.$inline = data.$inline;
                        propsChanged = true;
                        if (dst.$items.length)
                            structChanged = true;
                        delete data.$inline;
                    }
                    if (!_utils.equals(dst.$fieldsOptions, data.$fieldOptions)) {
                        dst.$fieldsOption = data.$fieldOptions;
                        propsChanged = true;
                        if (dst.$items.length)
                            structChanged = true;
                    }
                    delete data.$fieldOptions;
                    if ((dst.$refProperty || '') !== (data.$refProperty || '')) {
                        dst.$refProperty = data.$refProperty;
                        structChanged = true;
                    }
                    if ((dst.$ref || '') !== (data.$ref || '')) {
                        dst.$ref = data.$ref;
                        if (dst.$ref) {
                            delete dst.name;
                            delete dst.form;
                            delete dst.$fieldsOption;
                            reloadChildrens = true;
                        }
                        else {
                            delete dst.$refProperty;
                            delete dst.name;
                            delete dst.form;
                        }
                        dst.$items = [];
                        structChanged = true;
                    }
                    delete data.$ref;
                    delete data.$refProperty;
                    Object.keys(data).forEach(function (pn) {
                        if (data[pn] !== dst[pn]) {
                            dst[pn] = data[pn];
                            propsChanged = true;
                        }
                    });
                    that._disableRules = false;
                    if (structChanged) {
                        console.log('reloadChildrens');
                        if (reloadChildrens) {
                            return _ipc.emit('LoadNestedLayouts', {
                                data: dst,
                                after: function (ldata) {
                                    _utils.merge(ldata, dst);
                                    var parent = that.map[dst.$parentId];
                                    that._cleanIds(dst);
                                    that.check(dst, parent);
                                    that._afterStructureChanged(dst);
                                }
                            });
                        }
                        that._afterStructureChanged(dst);
                    }
                    else if (propsChanged)
                        that._afterPropsChanged(dst);
                    else
                        that._refreshSelected();
                }
            };
            return BaseLayout;
        }());
        ui.BaseLayout = BaseLayout;
        ;
        var PageLayout = (function (_super) {
            __extends(PageLayout, _super);
            function PageLayout() {
                _super.apply(this, arguments);
            }
            //implements DatasetMethods
            PageLayout.prototype.ds_init = function (config) { return false; };
            PageLayout.prototype.ds_storeLastEvent = function (event, value) { };
            PageLayout.prototype.ds_LastEvent = function () { return null; };
            PageLayout.prototype.ds_destroy = function () { };
            PageLayout.prototype.ds_context = function () { return null; };
            PageLayout.prototype.ds_reemit = function (listeners, after) { return null; };
            PageLayout.prototype.ds_select = function (datasetName, value) { };
            PageLayout.prototype.ds_loaded = function (datasetName, value) { };
            PageLayout.prototype.ds_exec = function (event, context, dst, after, datasets, notify) { };
            PageLayout.prototype.pageLayoutInit = function () {
                var that = this;
                //datasets
                that.loadingHandler = null;
                that.noDataHandler = null;
                that.errorHandler = null;
                that.emitHandler = null;
                that.getLocalContextHandler = null;
                that.dataChangedHandler = null;
                that.updateMenuHandler = this.updateMenu.bind(that);
                that._removeMenus();
                if (that.ds_init && that.ds_init(that.data)) {
                    that.registerDataListener(that);
                }
            };
            PageLayout.prototype._doDatasetEventAfterEnabled = function (child) {
                var that = this;
                if (child.ds_LastEvent && child.dataEvent) {
                    var le = child.ds_LastEvent();
                    if (le)
                        child.dataEvent(le.event, le.value);
                }
            };
            PageLayout.prototype._refreshDataSets = function (children) {
                //list --> list of new visible "datasets listeners"
                var that = this;
                if (!that.page)
                    return;
                var events = that._getEventListFor(children);
                if (events.length) {
                    var emitters = that.page.emittersFor(events);
                    //reemit events
                    emitters.forEach(function (emitter) {
                        if (emitter.ds_reemit) {
                            emitter.ds_reemit(children, function () {
                            });
                        }
                    });
                }
            };
            PageLayout.prototype._callInternalRender = function ($parent, refresh) {
                var that = this;
                if (that.datasets && that.ds_exec) {
                    that.ds_exec("$load", null, that.props.data.ds, function (dse, ex) {
                        if (ex)
                            throw ex.message;
                        that._internalRender($parent, refresh);
                    }, null, true);
                }
                else
                    that._internalRender($parent, refresh);
            };
            PageLayout.prototype._destroyDataSets = function () {
                var that = this;
                if (that.ds_destroy)
                    that.ds_destroy();
            };
            PageLayout.prototype._removeMenus = function () {
                var that = this;
                var menusTypes = ["left", "right", "top", "bottom"];
                //var menus = [];
                menusTypes.forEach(function (mn) {
                    if (!that.data.$menus || !that.data.$menus[mn]) {
                        var c = that.page.childByType("menu-" + mn);
                        if (c)
                            c.setMenu(null);
                    }
                });
            };
            PageLayout.prototype.updateMenu = function (mn, data) {
                var that = this;
                _utils.log("From Layout Update Menu : " + (data ? data.name : 'null'), "menu");
                var c = that.page.childByType("menu-" + mn);
                if (c) {
                    c.setMenu(data);
                    return;
                }
                var MenuConstructor = null;
                if (mn == "right")
                    MenuConstructor = ui.Menuright;
                else if (mn == "left")
                    MenuConstructor = ui.Menuleft;
                if (MenuConstructor) {
                    var options = {
                        type: mn,
                        bodyId: null,
                        parentId: null
                    };
                    var header = that.page.childByType("header");
                    if (header) {
                        if (header.options.bodyId)
                            options.bodyId = header.options.bodyId;
                        if (header.options[options.type + "MenuPlace"])
                            options.parentId = header.options[options.type + "MenuPlace"];
                    }
                    c = new MenuConstructor(data, options);
                }
            };
            return PageLayout;
        }(BaseLayout));
        ui.PageLayout = PageLayout;
        _utils.applyMixins(PageLayout, [Phoenix.DatasetPlugin.DatasetMethods]);
        var Layout = (function (_super) {
            __extends(Layout, _super);
            function Layout(ldata, options, fdata, schema, locale) {
                _super.call(this, ldata, options, fdata, schema, locale);
            }
            return Layout;
        }(PageLayout));
        ui.Layout = Layout;
        ui.LayoutClass = Layout;
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../../core/locale.ts" />
/// <reference path="../../core/core.ts" />
/// <reference path="../../core/ajax.ts" />
/// <reference path="../../data/datasets.ts" />
/// <reference path="../datasets-plugin.ts" />
var Phoenix;
(function (Phoenix) {
    var Observable;
    (function (Observable) {
        var _ulocale = Phoenix.ulocale, _application = Phoenix.application, _ajax = Phoenix.ajax, _dom = Phoenix.dom, _link = Phoenix.link, _data = Phoenix.data, _utils = Phoenix.utils, _ulocale = Phoenix.ulocale, _locale = Phoenix.locale, _customData = Phoenix.customData, _localeSchema = Phoenix.locale.schema, _dsPlugin = Phoenix.DatasetPlugin, _registerEnumManager = function () {
            var _enumsManager = {};
            return {
                register: function (name, manager) {
                    _enumsManager[name] = manager;
                },
                get: function (name) {
                    return _enumsManager[name];
                    ;
                }
            };
        }, _registerValidator = function () {
            var _validators = {};
            return {
                register: function (name, handler) {
                    _validators[name] = handler;
                },
                get: function (name) {
                    return _validators[name];
                    ;
                }
            };
        }, _parseCapabilities = function (schema) {
            if (!schema.features) {
                schema.features = {};
                if (schema.capabilities)
                    schema.capabilities.split(",").forEach(function (capability) {
                        schema.features[capability] = true;
                    });
            }
        }, _rv = _registerValidator(), _em = _registerEnumManager();
        function _enumCompositions(schema, path, isArray, value, cb, opts) {
            if (!cb(path, schema, value, isArray))
                return;
            Object.keys(schema.properties).forEach(function (name) {
                var prop = schema.properties[name];
                if (!prop.$reference) {
                    if (prop.type === "object") {
                        var cp = path ? path + '.' + name : name;
                        _enumCompositions(prop, cp, false, value ? value[name] : null, cb, opts);
                    }
                    else if (prop.type === "array" && prop.items.type === 'object') {
                        var cp = path ? path + '.' + name : name;
                        _enumCompositions(prop.items, cp, true, value ? value[name] : null, cb, opts);
                    }
                }
            });
        }
        var _sutils = {
            _getDefault: function (value) {
                if (value == "@date")
                    return _ulocale.date2ISO(new Date());
                return value;
            },
            checkLookup: function (lookup) {
                if (!lookup)
                    return null;
                lookup = $.extend({}, lookup);
                if (!lookup.data || lookup.data.$type != 'odata') {
                    lookup.pagination = false;
                    lookup.cache = true;
                }
                if (lookup.pagination !== false)
                    lookup.pagination = true;
                if (lookup.pagination)
                    lookup.cache = false;
                return lookup;
            },
            schema2Authoring: function (schema, locale) {
                var res = [];
                _enumCompositions(schema, '', false, null, function (prefix, cs, value, array) {
                    if (array)
                        return false;
                    Object.keys(cs.properties).forEach(function (name) {
                        var ps = cs.properties[name];
                        if (!_sutils.inModel(ps))
                            return;
                        //if (_sutils.isCompositionRef(ps) || _sutils.isCompositionList(ps)) return;
                        if (_sutils.isCompositionRef(ps))
                            return;
                        var cp = prefix ? prefix + '.' + name : name;
                        var v = { $type: "field", $bind: cp, $title: _ulocale.tt(ps.title, locale) || cp, $widget: ps.$widget, options: ps.$widgetOptions };
                        res.push(v);
                    });
                    if (cs.links)
                        Object.keys(cs.links).forEach(function (name) {
                            var ps = cs.links[name];
                            var cp = '$links.' + name;
                            cp = prefix ? prefix + '.' + cp : cp;
                            var v = { $type: "action", $bind: cp, $title: _ulocale.tt(ps.title, locale) || cp, $widget: ps.widget, options: ps.$widgetOptions };
                            res.push(v);
                        });
                    return true;
                });
                return res;
            },
            filtrableFields: function (schema, locale) {
                var res = [];
                _enumCompositions(schema, '', false, null, function (prefix, cs, value, array) {
                    if (array)
                        return false;
                    Object.keys(cs.properties).forEach(function (name) {
                        var ps = cs.properties[name];
                        if (!_sutils.inModel(ps))
                            return;
                        if (_sutils.isCompositionRef(ps) || _sutils.isCompositionList(ps, true))
                            return;
                        var cp = prefix ? prefix + '.' + name : name;
                        if (_sutils.canFilter(ps)) {
                            var v = { name: cp, schema: _utils.copy(ps) };
                            v.schema.title = _ulocale.tt(v.schema.title || '', locale);
                            res.push(v);
                        }
                    });
                    return true;
                });
                return res;
            },
            allData: function (lookup) {
                return !lookup.pagination;
            },
            pkFields: function (pk) {
                return pk.split(',').map(function (v) { return v.trim(); });
            },
            entityId: function (pkValue) {
                if (typeof pkValue === 'object') {
                    var res = [];
                    return Object.keys(pkValue).map(function (pn) {
                        var v = pkValue[pn];
                        if (typeof v === 'string') {
                            return pn + '=\'' + v + '\'';
                        }
                        else {
                            return pn + '=' + v;
                        }
                    }).join(',');
                }
                else if (typeof pkValue === 'string') {
                    return '\'' + pkValue + '\'';
                }
                else {
                    return pkValue + '';
                }
            },
            extractPkValue: function (item, map) {
                if (map.length == 1)
                    return item[map[0]];
                var o = {};
                map.forEach(function (p) { o[p] = item[p]; });
                return o;
            },
            odataId: function (keys, item) {
                if (keys.length == 1) {
                    return item[keys[0]];
                }
                else {
                    var a_1 = [];
                    keys.forEach(function (key) {
                        a_1.push(key + '=' + encodeURIComponent(item[key] + ''));
                    });
                    return a_1.join('');
                }
            },
            pk2Id: function (pk, keys) {
                if (keys.length === 1)
                    return pk;
                return JSON.stringify(pk);
            },
            id2Pk: function (id, keys) {
                if (keys.length === 1)
                    return id;
                return JSON.parse(id);
            },
            equals: function (primaryItem, item, keys) {
                if (keys.length === 1)
                    return primaryItem === item[keys[0]];
                for (var i = 0, len = keys.length; i < len; i++) {
                    var p = keys[i];
                    if (primaryItem[p] !== item[p])
                        return false;
                }
                return true;
            },
            extractBase: function (path) {
                var segments = path.split('.');
                segments.pop();
                if (segments.length)
                    return segments.join('.') + '.';
                else
                    return '';
            },
            parentPath: function (path) {
                var segments = path.split('.');
                segments.pop();
                if (segments.length)
                    return segments.join('.');
                else
                    return '';
            },
            findByPk: function (primaryItem, keys, list) {
                if (list && primaryItem) {
                    for (var i = 0, len = list.length; i < len; i++) {
                        var ii = list[i];
                        if (_sutils.equals(primaryItem, ii, keys))
                            return ii;
                    }
                }
                return null;
            },
            supportPagination: function (lookup) {
                //TODO
                return false;
            },
            executeLookup: function (lookup, data, ondata) {
                var promise = _data.execData(lookup.data, data, null);
                if (ondata) {
                    if (promise)
                        promise.then(ondata);
                    else
                        ondata(null);
                }
                else
                    return promise;
            },
            remoteSearch: function (localSearch, lookup) {
                return lookup.mapping ? lookup.mapping[localSearch] : localSearch;
            },
            lastSegment: function (bind, display) {
                var segments = bind.split('.');
                var ls = segments.pop();
                if (display && display != bind) {
                    ls = display.substring(segments.join('.').length);
                }
                return ls;
            },
            findFirst: function (value, searchField, ldata) {
                if (!value || !ldata)
                    return null;
                var sv = value.toLocaleLowerCase();
                var vlen = sv.length;
                for (var i = 0, len = ldata.length; i < len; i++) {
                    var val = ldata[i][searchField] || '';
                    if (val.toLowerCase().substr(0, vlen) === sv) {
                        return { item: ldata[i], index: i };
                    }
                }
                return null;
            },
            _states: ['$states', '$links'],
            isMetaProp: function (pn) {
                return (pn.substr(0, 2) === "$$");
            },
            removeMeta: function (object) {
                if (Array.isArray(object))
                    return;
                Object.keys(object).forEach(function (pn) {
                    if (_sutils.isMetaProp(pn))
                        delete object[pn];
                });
            },
            removeStates: function (object) {
                if (Array.isArray(object)) {
                    object.forEach(function (item) {
                        if (item && typeof item == 'object')
                            _sutils.removeStates(item);
                    });
                }
                else {
                    _sutils._states.forEach(function (state) { delete object[state]; });
                    delete object.$errors;
                    Object.keys(object).forEach(function (pn) {
                        var v = object[pn];
                        if (v && typeof v == 'object')
                            _sutils.removeStates(v);
                    });
                }
            },
            isMeta: function (bind) {
                var len = '$$meta-'.length;
                if (bind.substr(0, '$$meta-'.length) === '$$meta-') {
                    return { widget: bind.substr(len) };
                }
                else
                    return null;
            },
            getLookup: function (path, lookupName, schema) {
                var segments = path.split('.');
                segments.pop();
                var cs = schema;
                for (var i = 0, len = segments.length; i < len; i++) {
                    if (!cs)
                        break;
                    var s = segments[i];
                    if ((cs.type == "array") && (_sutils.arrayProps.indexOf(s) >= 0)) {
                        cs = cs.items;
                    }
                    else {
                        cs = cs.properties ? cs.properties[s] : null;
                    }
                }
                if (cs && cs.lookups)
                    return _sutils.checkLookup(cs.lookups[lookupName]);
                return null;
            },
            getSchema: function (path, schema, expandArray) {
                if (!path)
                    return schema;
                var segments = path.split('.');
                var cs = schema, link = false;
                for (var i = 0, len = segments.length; i < len; i++) {
                    if (!cs)
                        break;
                    var s = segments[i];
                    if ((cs.type == "array") && (_sutils.arrayProps.indexOf(s) >= 0)) {
                        // $item, $new 
                        cs = cs.items;
                    }
                    else {
                        if (s === "$links") {
                            cs = cs.links;
                            link = true;
                        }
                        else {
                            if (link) {
                                link = false;
                                cs = cs[s];
                            }
                            else {
                                cs = cs.properties ? cs.properties[s] : null;
                                if (!cs && i === (len - 1)) {
                                    if (s === '$index') {
                                        return { type: 'integer', title: "#" };
                                    }
                                    else if (s === '$selected') {
                                        return { type: 'boolean', title: _locale.ui.Selected };
                                    }
                                }
                            }
                        }
                    }
                }
                if (expandArray && cs && cs.type === 'array' && cs.items)
                    cs = cs.items;
                return cs;
            },
            states: ['isHidden', 'isDisabled', 'isReadOnly', 'isMandatory'],
            statesAndErrors: ['isHidden', 'isDisabled', 'isReadOnly', 'isMandatory', 'errors', 'filter'],
            linksStates: ['isHidden', 'isDisabled'],
            isLink: function (path) {
                return (path.split('.').indexOf('$links') >= 0);
            },
            _isMoney: function (schema) {
                return _sutils.isNumber(schema) && schema.format == "money";
            },
            _extractEnums: function (schema, enums) {
                var _addEnum = function (enumref, parentSchema) {
                    parentSchema = parentSchema || schema;
                    if (parentSchema.enums && parentSchema.enums[enumref]) {
                        var ec = parentSchema.enums[enumref].type || "default";
                        enums[ec] = enums[ec] || {};
                        enums[ec][enumref] = parentSchema.enums[enumref];
                    }
                    else {
                        //$enumref = "Satut.codif"
                        var et = enumref.split('.');
                        if (et.length === 2) {
                            enums[et[1]] = enums[et[1]] || {};
                            enums[et[1]][et[0]] = { type: et[1] };
                        }
                    }
                };
                if (schema.lookups)
                    Object.keys(schema.lookups).forEach(function (pn) {
                        var ll = schema.lookups[pn];
                        if (ll.data.$type == "enum" && ll.data.$enumref) {
                            _addEnum(ll.data.$enumref);
                        }
                    });
                Object.keys(schema.properties).forEach(function (pn) {
                    var cs = schema.properties[pn];
                    if (!_sutils.inModel(cs))
                        return;
                    if (_sutils.isCompositionRef(cs)) {
                        _sutils._extractEnums(cs, enums);
                    }
                    else if (_sutils.isCompositionList(cs, true)) {
                        _sutils._extractEnums(cs.items, enums);
                    }
                    else {
                        var ps = schema;
                        if (_sutils.isSimpleList(cs)) {
                            cs = cs.items;
                            ps = cs;
                        }
                        if (cs.$enumref) {
                            _addEnum(cs.$enumref, ps);
                        }
                    }
                });
            },
            _fillEnums: function (schema, enums) {
                if (schema.lookups)
                    Object.keys(schema.lookups).forEach(function (pn) {
                        var ll = schema.lookups[pn];
                        if (ll.data.$type == "enum" && ll.data.$enumref) {
                            var ear = ll.data.$enumref.split('.');
                            var el = ear.length === 2 ? enums[ear[1]] : (enums[schema.enums[ll.data.$enumref].type || "default"]);
                            var en = ear.length === 2 ? ear[0] : ll.data.$enumref;
                            if (el) {
                                ll.data.$value = [];
                                var enumValues_1 = el[en];
                                enumValues_1.enum.forEach(function (ec, index) {
                                    var item = { code: ec, title: enumValues_1.enumNames[index] };
                                    if (enumValues_1.fields)
                                        _utils.extend(item, enumValues_1.fields[index]);
                                    ll.data.$value.push(item);
                                });
                            }
                        }
                    });
                Object.keys(schema.properties).forEach(function (pn) {
                    var cs = schema.properties[pn];
                    if (!_sutils.inModel(cs))
                        return;
                    if (_sutils.isCompositionRef(cs)) {
                        _sutils._fillEnums(cs, enums);
                    }
                    else if (_sutils.isCompositionList(cs, true)) {
                        _sutils._fillEnums(cs.items, enums);
                    }
                    else {
                        var parentSchema = schema;
                        if (_sutils.isSimpleList(cs)) {
                            cs = cs.items;
                            parentSchema = cs;
                        }
                        if (cs.$enumref) {
                            var ear = cs.$enumref.split('.');
                            if ((parentSchema.enums && parentSchema.enums[cs.$enumref]) || ear.length === 2) {
                                var el = ear.length === 2 ? enums[ear[1]] : enums[parentSchema.enums[cs.$enumref].type || "default"];
                                var en = ear.length === 2 ? ear[0] : cs.$enumref;
                                if (el) {
                                    var enumValues = el[en];
                                    if (enumValues) {
                                        cs.enum = enumValues.enum;
                                        cs.enumNames = enumValues.enumNames;
                                        cs.filters = enumValues.filters;
                                    }
                                }
                            }
                        }
                    }
                });
            },
            loadEnums: function (schema) {
                var allEnums = {}, hasEnums = false;
                _sutils._extractEnums(schema, allEnums);
                var res = Object.keys(allEnums).map(function (enumType) {
                    var cem = _em.get(enumType);
                    if (!cem)
                        throw "Invalid enum type: " + enumType;
                    return cem.promise(allEnums[enumType], enumType);
                });
                if (!res.length)
                    return null;
                return res;
            },
            arrayProps: ['$item', '$new'],
            init: function (schema, context, value) {
                var a = value || {};
                a.$states = a.$states || {};
                Object.keys(schema.properties).forEach(function (pn) {
                    var cs = schema.properties[pn];
                    if (!_sutils.inModel(cs))
                        return;
                    var isMeta = _sutils.isMetaProp(pn);
                    var state = schema.states ? schema.states[pn] : null;
                    var ns = a.$states[pn] = (a.$states[pn] || {});
                    if (!isMeta) {
                        if (state) {
                            Object.keys(state).forEach(function (sn) {
                                if (ns[sn] === undefined) {
                                    ns[sn] = state[sn];
                                }
                            });
                        }
                    }
                    if (_sutils.isCompositionRef(cs)) {
                        // recursive	
                        if (ns.isMandatory) {
                            a[pn] = _sutils.init(cs, context, a[pn] || {});
                        }
                    }
                    else if (_sutils.isCompositionList(cs) || _sutils.isSimpleList(cs)) {
                        a[pn] = a[pn] || [];
                    }
                    else if (_sutils.isList(cs)) {
                        a[pn] = a[pn] || [];
                    }
                    else {
                        if (a[pn] === undefined) {
                            if (cs.default !== undefined)
                                a[pn] = _sutils._getDefault(cs.default);
                            else if (cs.enum)
                                a[pn] = cs.enum[0];
                            else {
                                switch (cs.type) {
                                    case "number":
                                    case "integer":
                                        a[pn] = 0;
                                        break;
                                }
                            }
                        }
                    }
                });
                return a;
            },
            //
            isCompositionRef: function (prop) {
                return prop.type === "object" && !prop.$reference;
            },
            isRef: function (prop) {
                return prop.type === "object" && prop.$reference;
            },
            isList: function (prop) {
                return prop.type === "array" && prop.$reference;
            },
            isCompositionList: function (prop, followRefs) {
                var r = prop.type === "array" && prop.items && (prop.items.type === "object" || prop.items.type === "array") && (!prop.$reference || (followRefs && prop.$reference));
                return r;
            },
            isSimpleList: function (prop) {
                var r = prop.type === "array" && prop.items && (prop.items.type !== "object" || prop.items.type === "array") && !prop.$reference;
                return r;
            },
            inModel: function (prop) {
                if (_sutils.isRef(prop))
                    return false;
                return true;
            },
            formatNumber: function (schema, value) {
                if (schema.format == "money")
                    return _ulocale.money(value, false);
                return _ulocale.decimal(value, schema.decimals || 0, null);
            },
            _title: function (title, locale) {
                if (locale)
                    return _ulocale.tt(title, locale);
                return title;
            },
            canSort: function (schema) {
                if (schema) {
                    _parseCapabilities(schema);
                    return schema.features.sortable;
                }
                return false;
            },
            canFilter: function (schema) {
                if (schema) {
                    _parseCapabilities(schema);
                    return schema.features.filtrable;
                }
                return false;
            },
            checkNumber: function (value, schema, locale, errors) {
                var res = true;
                if (schema.exclusiveMinimum) {
                    if (schema.minimum != undefined && value <= schema.minimum) {
                        errors.push({ message: _utils.format(_localeSchema.minNumberExclusive, _sutils._title(schema.title, locale), _sutils.formatNumber(schema, schema.minimum)) });
                        res = false;
                    }
                }
                else {
                    if (schema.minimum != undefined && value < schema.minimum) {
                        errors.push({ message: _utils.format(_localeSchema.minNumber, _sutils._title(schema.title, locale), _sutils.formatNumber(schema, schema.minimum)) });
                        res = false;
                    }
                }
                if (schema.exclusiveMaximum) {
                    if (schema.maximum != undefined && value >= schema.maximum) {
                        errors.push({ message: _utils.format(_localeSchema.maxNumberExclusive, _sutils._title(schema.title, locale), _sutils.formatNumber(schema, schema.maximum)) });
                        res = false;
                    }
                }
                else {
                    if (schema.maximum != undefined && value > schema.maximum) {
                        errors.push({ message: _utils.format(_localeSchema.maxNumber, _sutils._title(schema.title, locale), _sutils.formatNumber(schema, schema.maximum)) });
                        res = false;
                    }
                }
                return res;
            },
            _validateEmail: function (email, error) {
                var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                return re.test(email);
            },
            _validateJson: function (value, error) {
                try {
                    JSON.parse(value);
                }
                catch (ex) {
                    error.ex = ex;
                    return false;
                }
                return true;
            },
            checkString: function (value, state, schema, locale, errors) {
                var res = true;
                var v = (value || '');
                if (schema.minLength && v.length < schema.minLength) {
                    errors.push({ message: _utils.format(_localeSchema.minLength, _sutils._title(schema.title, locale), schema.minLength) });
                    res = false;
                }
                if (state.isMandatory) {
                    if (v === '') {
                        errors.push({ message: _utils.format(_localeSchema.required, _sutils._title(schema.title, locale)) });
                        res = false;
                    }
                }
                if (schema.format) {
                    if (schema.format === "email") {
                        if (value && !_sutils._validateEmail(value, {})) {
                            errors.push({ message: _localeSchema.invalidEmail });
                            res = false;
                        }
                    }
                    else if (schema.format === "json") {
                        var error = {};
                        if (value && !_sutils._validateJson(value, error)) {
                            errors.push({ message: error.ex.message });
                            res = false;
                        }
                    }
                }
                return res;
            },
            validatePassword: function (orig, value, schema, state, locale, errors) {
                var res = true;
                if (state.isHidden || state.isDisabled)
                    return res;
                if (orig !== value) {
                    errors.push({ message: _localeSchema.passwordMismatch });
                    res = false;
                }
                return res;
            },
            validateSchema: function (value, schema, state, locale, errors) {
                var res = true;
                if (state) {
                    if (state.isHidden || state.isDisabled)
                        return res;
                }
                switch (schema.type) {
                    case "number":
                    case "integer":
                        res = _sutils.checkNumber(value, schema, locale, errors);
                        break;
                    case "string":
                        res = _sutils.checkString(value, state, schema, locale, errors);
                        break;
                }
                return res;
            },
            loadEnumsPromise: function (schema) {
                var enums = _sutils.loadEnums(schema);
                if (!enums) {
                    return new _utils.Promise(function (resolve, reject) {
                        resolve(schema);
                    });
                }
                return _utils.Promise.all(enums).then(function (values) {
                    var allEnums = {};
                    values.forEach(function (ev) {
                        allEnums[ev.type] = ev.enums;
                    });
                    _sutils._fillEnums(schema, allEnums);
                    return schema;
                });
            },
            loadSchemaRefs: function (schema, ldata, layout, after) {
                if (!schema)
                    return after();
                var enums = _sutils.loadEnums(schema);
                var promises = enums ? enums : [];
                var enumsCount = enums ? enums.length : 0;
                var mainData = _dutils.loadMainData(layout);
                if (mainData)
                    promises.push(mainData);
                var dataCount = mainData ? enumsCount + 1 : 0;
                if (!promises.length)
                    return after(ldata);
                _dom.processing(true);
                _utils.Promise.all(promises).then(function (values) {
                    _dom.processing(false);
                    var allEnums = {};
                    values.forEach(function (ev, index) {
                        if (index < enumsCount) {
                            allEnums[ev.type] = ev.enums;
                        }
                        else if (index < dataCount) {
                            $.extend(true, ldata, ev);
                        }
                    });
                    if (enumsCount) {
                        _sutils._fillEnums(schema, allEnums);
                    }
                    after(ldata);
                }).catch(function (ex) {
                    _dom.processing(false);
                    throw ex;
                });
            },
            stateProps: function (schema) {
                if (schema.enum && schema.filters) {
                    return ['filter'];
                }
                else if (schema.items && schema.items.enum && schema.items.filters) {
                    return ['filter'];
                }
                return null;
            },
            isPassword: function (schema) {
                return schema.type === "string" && schema.format === "password";
            },
            isDate: function (schema) {
                return schema.type === "string" && schema.format === "date";
            },
            isBoolean: function (schema) {
                return schema.type === "boolean";
            },
            isNumber: function (schema) {
                return (schema.type === "number" || schema.type === "integer");
            },
            isText: function (schema) {
                return schema.type === "string" && (schema.format === "json" || schema.format === "memo");
            },
            isMoney: function (schema) {
                return _sutils.isNumber(schema) && schema.format == "money";
            },
            text2Value: function (textValue, schema) {
                if (_sutils.isNumber(schema)) {
                    var dec = _sutils.isMoney(schema) ? _locale.number.places : schema.decimals;
                    var float = _ulocale.string2Float(textValue);
                    float = parseFloat(float.toFixed(dec));
                    return float;
                }
                return textValue;
            },
            value2Text: function (value, schema) {
                var that = this;
                if (_sutils.isNumber(schema)) {
                    if (_sutils.isMoney(schema))
                        return _ulocale.money(parseFloat(value || '0'), false);
                    else {
                        return _ulocale.decimal(value, schema.decimals, null);
                    }
                }
                else
                    return value || '';
            },
            registerValidator: _rv.register,
            getValidator: _rv.get,
            registerEnumManager: _em.register,
            getEnumManager: _em.get
        };
        var _dutils = {
            extractDatasets: function (config) {
                if (config.datasets) {
                    var datasets = Object.keys(config.datasets);
                    if (datasets.length) {
                        return datasets.map(function (dsName) {
                            var dc = $.extend({}, config.datasets[dsName], true);
                            dc.name = dsName;
                            return dc;
                        });
                    }
                }
                return null;
            },
            isQuery: function (ds) {
                return (ds.$type === "odata" && (!ds.$method || ds.$method.toUpperCase() === "GET") && !ds.$params.hasOwnProperty('$entityId'));
            },
            isCreateOrUpdate: function (ds) {
                return ds.$type === "odata" && ds.$params.hasOwnProperty('$entityId');
            },
            extractMainDataSource: function (config) {
                var main = null;
                if (config.datasets) {
                    var datasets = Object.keys(config.datasets);
                    if (datasets.length) {
                        datasets.forEach(function (dsName) {
                            if (config.datasets[dsName].$main)
                                main = $.extend({}, config.datasets[dsName], true);
                        });
                        if (!main)
                            main = $.extend({}, config.datasets[datasets[0]], true);
                    }
                }
                return main;
            },
            datasetsAsPromise: function (ds, transform) {
                return new _utils.Promise(function (resolve, reject) {
                    var result = {};
                    _dom.processing(true);
                    var main = null;
                    ds.forEach(function (ce) {
                        if (ce.$main)
                            main = ce;
                    });
                    if (!main)
                        main = ds[0];
                    if (_dutils.isCreateOrUpdate(main)) {
                        main.$create = main.$create || {};
                    }
                    _dsPlugin.executeDatasets(ds, {}, result, {}, function (sended, ex) {
                        _dom.processing(false);
                        if (!ex) {
                            if (transform) {
                                var hnd = _customData.get(transform);
                                if (hnd)
                                    hnd(result);
                            }
                            resolve(result[main.name]);
                        }
                        else {
                            reject(ex);
                        }
                    });
                });
            },
            datasetAsPromise: function (ds, ldata) {
                return new _utils.Promise(function (resolve, reject) {
                    var result = {};
                    ds.name = ds.name || 'data';
                    _dom.processing(true);
                    _dsPlugin.executeDatasets([ds], ldata || {}, result, {}, function (sended, ex) {
                        _dom.processing(false);
                        if (!ex) {
                            resolve(result[ds.name]);
                        }
                        else {
                            reject(ex);
                        }
                    });
                });
            },
            loadMainData: function (config) {
                var ds = _dutils.extractDatasets(config);
                if (ds && ds.length) {
                    return _dutils.datasetsAsPromise(ds, config.transform);
                }
                return _utils.Promise.resolve(null);
            },
            dsConfig: function (datasets, prop, isQuery) {
                var dsName = prop.$reference;
                if (datasets && dsName) {
                    var keys = Object.keys(datasets);
                    if (keys.length === 1) {
                        var ds = datasets[keys[0]];
                        ;
                        ds.$main = true;
                        return ds;
                    }
                    if (typeof dsName === 'string') {
                        return datasets[dsName];
                    }
                }
                return null;
            },
        };
        var _defEnumManager = {
            _enums: {},
            promise: function (enums, enumType) {
                var res = {};
                Object.keys(enums).forEach(function (enumName) {
                    var ce = enums[enumName];
                    if (!_defEnumManager._enums[enumName]) {
                        _defEnumManager._enums[enumName] = {
                            enum: ce.enum,
                            enumNames: ce.enumNames,
                            filters: ce.filters
                        };
                    }
                    res[enumName] = _defEnumManager._enums[enumName];
                });
                return new _utils.Promise(function (resolve, reject) {
                    resolve({ type: enumType, enums: res });
                });
            }
        };
        _sutils.registerEnumManager("default", _defEnumManager);
        Observable.SchemaUtils = _sutils;
        Observable.DataUtils = _dutils;
    })(Observable = Phoenix.Observable || (Phoenix.Observable = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../../core/core.ts" />
/// <reference path="./schema.data.ts" />
var Phoenix;
(function (Phoenix) {
    var Observable;
    (function (Observable) {
        var _sutils = Observable.SchemaUtils;
        var BaseState = (function () {
            function BaseState(parent, prop, value) {
            }
            BaseState.prototype.destroy = function () {
                var that = this;
                if (that._state)
                    that._state = null;
                that.parent = null;
            };
            BaseState.prototype.state = function () {
                return this._state;
            };
            BaseState.prototype._init = function (parent, prop, value, list) {
                var that = this;
                list = list || [];
                that._state = value || {};
                that.name = prop;
                that.parent = parent;
                list.forEach(function (propertyName) {
                    if (that._state[propertyName] === undefined)
                        that._state[propertyName] = false;
                    Object.defineProperty(that, propertyName, {
                        get: function () {
                            return this._state[propertyName] || false;
                        },
                        set: function (value) {
                            var self = this;
                            var oldValue = self._state[propertyName] || false;
                            if (oldValue !== value) {
                                self._state[propertyName] = value;
                                if (propertyName === "filter") {
                                    if (self.parent) {
                                        var v = self.parent.getValue(that.name);
                                        var cs = self.parent.getSchema(that.name);
                                        if (cs && cs.enum && cs.filters) {
                                            var enums = value ? cs.filters[value] : cs.enum;
                                            if (enums) {
                                                var ii = enums.indexOf(v);
                                                if (ii < 0)
                                                    self.parent.setValue(that.name, enums.length ? enums[0] : null);
                                            }
                                        }
                                    }
                                }
                                if (self.parent && self.parent.notifyStateChanged)
                                    self.parent.notifyStateChanged(that.name + '.' + propertyName, {});
                            }
                        },
                        enumerable: true
                    });
                });
            };
            return BaseState;
        }());
        Observable.BaseState = BaseState;
        ;
        var DataStates = (function (_super) {
            __extends(DataStates, _super);
            function DataStates(parent, prop, value) {
                _super.call(this, parent, prop, value);
                var ss = parent.getSchema('').properties[prop];
                var l = _sutils.states;
                if (ss) {
                    var props = _sutils.stateProps(ss);
                    if (props && props.length) {
                        l = props.concat(l);
                    }
                }
                this._init(parent, prop, value, l);
            }
            return DataStates;
        }(BaseState));
        Observable.DataStates = DataStates;
        var LinkStates = (function (_super) {
            __extends(LinkStates, _super);
            function LinkStates(parent, prop, value) {
                _super.call(this, parent, prop, value);
                this._init(parent, "$links." + prop, value, _sutils.linksStates);
            }
            return LinkStates;
        }(BaseState));
        Observable.LinkStates = LinkStates;
    })(Observable = Phoenix.Observable || (Phoenix.Observable = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../../core/core.ts" />
/// <reference path="./schema.data.ts" />
var Phoenix;
(function (Phoenix) {
    var Observable;
    (function (Observable) {
        var _errorsUtils = {
            errorChanged: function (oldErrors, newErrors) {
                if (!newErrors || !newErrors.length) {
                    if (oldErrors.length)
                        return true;
                }
                else {
                    if (oldErrors.length != newErrors.length) {
                        return true;
                    }
                    else {
                        var changed = false;
                        for (var i = 0, len = oldErrors.length; i < len; i++) {
                            var oe = oldErrors[i];
                            var ne = newErrors[i];
                            if (oe.code && ne.code) {
                                if (oe.code !== ne.code) {
                                    changed = true;
                                    break;
                                }
                            }
                            else if (!oe.code || !ne.code) {
                                changed = true;
                                break;
                            }
                            else {
                                if (oe.message !== ne.message) {
                                    changed = true;
                                    break;
                                }
                            }
                        }
                        return changed;
                    }
                }
            }
        };
        var Errors = (function () {
            function Errors(parent, prop, value, nostore) {
                this._init(parent, prop, value, nostore);
            }
            Errors.prototype.destroy = function () {
                var that = this;
                if (that._errors)
                    that._errors = null;
                that.parent = null;
            };
            Errors.prototype.errors = function () {
                return this._errors;
            };
            Errors.prototype.clear = function (notify) {
                var that = this;
                if (that._errors.length) {
                    that._errors.length = 0;
                    if (notify)
                        that.notify();
                    return true;
                }
                return false;
            };
            Errors.prototype.hasErrors = function () {
                var that = this;
                return that._errors && that._errors.length ? true : false;
            };
            Errors.prototype.addErrors = function (errors, add) {
                var that = this;
                if (that.nostore) {
                    if (that.parent && that.parent.addErrors)
                        that.parent.addErrors(errors, add);
                }
                else if (add || _errorsUtils.errorChanged(that._errors, errors)) {
                    that._errors = errors || [];
                    that.notify();
                }
            };
            Errors.prototype.addError = function (message, add) {
                var that = this;
                that.addErrors([{ severity: "error", message: message }], add);
            };
            Errors.prototype.addSuccess = function (message, add) {
                var that = this;
                that.addErrors([{ severity: "success", message: message, timeout: 2 }], add);
            };
            Errors.prototype.addWarning = function (message, add) {
                var that = this;
                that.addErrors([{ severity: "warning", message: message, timeout: 2 }], add);
            };
            Errors.prototype.notify = function () {
                var that = this;
                if (that.parent && that.parent.notifyStateChanged)
                    that.parent.notifyStateChanged(that.name + '.errors', {});
            };
            Errors.prototype._init = function (parent, prop, value, nostore) {
                var that = this;
                that._errors = value || [];
                that.name = prop;
                that.parent = parent;
                that.nostore = nostore;
            };
            return Errors;
        }());
        Observable.Errors = Errors;
        Observable.errorsUtils = _errorsUtils;
    })(Observable = Phoenix.Observable || (Phoenix.Observable = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../../core/core.ts" />
/// <reference path="./schema.data.ts" />
/// <reference path="../datasets-plugin.ts" />
var Phoenix;
(function (Phoenix) {
    var Observable;
    (function (Observable) {
        var _utils = Phoenix.utils, _dom = Phoenix.dom, _sutils = Observable.SchemaUtils, _dutils = Observable.DataUtils, _dsPlugin = Phoenix.DatasetPlugin;
        var QueryableDataSource = (function () {
            function QueryableDataSource(dsConfig, model) {
                if (dsConfig.$type !== 'odata')
                    throw new Error('Only odata sources are supported.');
                var that = this;
                that._config = dsConfig || {};
                that._origFilter = that._config.$params.$filter;
                that._pageSize = 0;
                that._model = model;
                that._currentPage = 1;
                if (that.isQuery()) {
                    that._pageSize = that._config.$params.$top || 0;
                    that._orderby = that._config.$params.$orderby || '';
                }
                else {
                    throw "Invalid Queryable DataSource";
                }
            }
            QueryableDataSource.prototype.initPagination = function (pageSize, currentpage, totalCount) {
                var that = this;
                that._pageSize = pageSize;
                that._totalCount = totalCount;
                that._currentPage = currentpage;
            };
            QueryableDataSource.prototype.initFromData = function (ldata) {
                var that = this;
                if (that.isQuery()) {
                    that._pageSize = ldata.pageSize;
                    that._currentPage = that._pageSize ? (Math.ceil(ldata.skip / that._pageSize) + 1) : 0;
                    that._totalCount = ldata.count;
                    that._skip = ldata.skip;
                }
            };
            Object.defineProperty(QueryableDataSource.prototype, "filter", {
                get: function () {
                    var that = this;
                    return that._filter;
                },
                set: function (value) {
                    var that = this;
                    that._filter = value;
                    if (that._filter && that._filter.value) {
                        if (that._origFilter)
                            that._config.$params.$filter = { $left: that._origFilter, $op: "AND", $right: that._filter.value };
                        else
                            that._config.$params.$filter = that._filter.value;
                    }
                    else {
                        if (that._origFilter)
                            that._config.$params.$filter = that._origFilter;
                        else
                            that._config.$params.$filter = null;
                    }
                    that.refresh(true);
                },
                enumerable: true,
                configurable: true
            });
            QueryableDataSource.prototype.pageSize = function () {
                var that = this;
                return that.isQuery() ? that._pageSize : 0;
            };
            QueryableDataSource.prototype.orderBy = function (value) {
                var that = this;
                if (value === undefined)
                    return that._orderby;
                if (value !== that._orderby) {
                    that._orderby = value;
                    that.refresh(true);
                }
                return that._orderby;
            };
            QueryableDataSource.prototype.refresh = function (resetPagination) {
                var that = this;
                if (that.isQuery()) {
                    if (resetPagination)
                        that._currentPage = 0;
                    that._open().then(function () {
                        that._model.notifyPaginationChanged();
                        that._model.notifySortingChanged();
                    });
                }
            };
            QueryableDataSource.prototype.currentPage = function (page) {
                var that = this;
                if (page != undefined) {
                    if (that.isQuery()) {
                        var np = Math.min(page, that.totalPages());
                        if (that._currentPage != np) {
                            that._currentPage = np;
                            that._open().then(function () {
                                that._model.notifyPaginationChanged();
                            });
                        }
                    }
                    return page;
                }
                else
                    return that.isQuery() ? that._currentPage : 0;
            };
            QueryableDataSource.prototype.totalPages = function () {
                var that = this;
                return that.isQuery() ? (that._pageSize ? Math.ceil(that._totalCount / that._pageSize) : 1) : 0;
            };
            QueryableDataSource.prototype.totalCount = function () {
                var that = this;
                return that.isQuery() ? that._totalCount : 0;
            };
            QueryableDataSource.prototype.destroy = function () {
                var that = this;
                that._config = null;
                that._model = null;
            };
            QueryableDataSource.prototype.isQuery = function () {
                return _dutils.isQuery(this._config);
            };
            QueryableDataSource.prototype.open = function () {
                return this._open();
            };
            QueryableDataSource.prototype.remove = function (key, etag) {
                var that = this;
                var isQuery = that.isQuery();
                if (!isQuery)
                    return null;
                return new _utils.Promise(function (resolve, reject) {
                    var dsCfg = {
                        name: "data",
                        $type: that._config.$type,
                        $method: "DELETE",
                        $params: {
                            $module: that._config.$params.$module,
                            $entity: that._config.$params.$entity,
                            $entityId: key
                        }
                    };
                    var result = {};
                    _dom.processing(true);
                    _dsPlugin.executeDatasets([dsCfg], { etag: etag }, result, {}, function (sended, ex) {
                        _dom.processing(false);
                        if (!ex) {
                            resolve(null);
                        }
                        else {
                            if (that._model) {
                                that._model.addAjaxException(ex);
                                reject(null);
                            }
                            else
                                reject(ex);
                        }
                    });
                });
            };
            QueryableDataSource.prototype._open = function () {
                var that = this;
                that._config.name = "data";
                return new _utils.Promise(function (resolve, reject) {
                    _dom.processing(true);
                    var isQuery = that.isQuery();
                    var result = {};
                    if (isQuery) {
                        // update orderby
                        if (that._orderby) {
                            if (that._config.$params.$orderby !== that._orderby)
                                that._config.$params.$orderby = that._orderby;
                        }
                        // update pagination
                        if (that._pageSize > 0) {
                            that._config.$params.$top = that._pageSize;
                            that._config.$params.$skip = Math.max(0, that._currentPage - 1) * that._pageSize;
                            if (that._config.$params.$skip == 0)
                                delete that._config.$params.$skip;
                        }
                        else {
                            delete that._config.$params.$top;
                            delete that._config.$params.$skip;
                        }
                    }
                    _dsPlugin.executeDatasets([that._config], {}, result, {}, function (sended, ex) {
                        _dom.processing(false);
                        if (!ex) {
                            var ldata_1 = result.data;
                            that.initFromData(ldata_1);
                            if (isQuery) {
                                if (that._skip && that._skip >= that._totalCount) {
                                    that._currentPage = 0;
                                    return that._open().then(function (rdata) {
                                        resolve(ldata_1);
                                    });
                                }
                            }
                            if (that._model) {
                                that.isQuery() ? that._model.setModel(ldata_1.documents) : that._model.setModel(ldata_1);
                            }
                            resolve(ldata_1);
                        }
                        else {
                            if (that._model) {
                                that._model.addAjaxException(ex);
                                reject(null);
                            }
                            else
                                reject(ex);
                        }
                    });
                });
            };
            QueryableDataSource.prototype.save = function () {
                var that = this;
                if (that.isQuery())
                    return;
                if (!that._model.validate())
                    return;
            };
            return QueryableDataSource;
        }());
        Observable.QueryableDataSource = QueryableDataSource;
    })(Observable = Phoenix.Observable || (Phoenix.Observable = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../../core/core.ts" />
/// <reference path="../../core/ajax.ts" />
/// <reference path="./schema.data.ts" />
/// <reference path="./state.data.ts" />
/// <reference path="./errors.data.ts" />
/// <reference path="./queryable.ts" />
var Phoenix;
(function (Phoenix) {
    var Observable;
    (function (Observable) {
        var _observable = Observable, _su = _observable.SchemaUtils, _du = _observable.DataUtils, _utils = Phoenix.utils, _ajax = Phoenix.ajax, _locale = Phoenix.locale, _ulocale = Phoenix.ulocale, _localeSchema = Phoenix.locale.schema, _createProp = function (obj, propertyName) {
            if (!_su.inModel(obj._schema.properties[propertyName]))
                return;
            Object.defineProperty(obj, propertyName, {
                get: function () {
                    var that = this;
                    var c = that._children[propertyName];
                    if (c) {
                        if (c.isNull)
                            return null;
                        if (c.isUndefined)
                            return undefined;
                        return c;
                    }
                    return that._model[propertyName];
                },
                set: function (value) {
                    var that = this;
                    var oldValue = that._model[propertyName];
                    if (oldValue !== value) {
                        if (that._beforeChange(propertyName, oldValue, value)) {
                            that._model[propertyName] = value;
                            var schema = that._schema.properties[propertyName];
                            if (_su.isCompositionRef(schema)) {
                                that._setRefChild(propertyName, oldValue, value, {});
                                that._notifyChanged(propertyName, oldValue, value, "propchange", {}, true);
                                that.notifyStateChanged(propertyName, {});
                            }
                            else if (_su.isCompositionList(schema)) {
                                that._setListChild(propertyName, oldValue, value, "propchange", {});
                                that._notifyChanged(propertyName, oldValue, value, "propchange", {}, true);
                                that.notifyStateChanged(propertyName, {});
                            }
                            else if (_su.isSimpleList(schema)) {
                                that._setSimpleListChild(propertyName, oldValue, value, "propchange", {});
                                that._notifyChanged(propertyName, oldValue, value, "propchange", {}, true);
                                that.notifyStateChanged(propertyName, {});
                            }
                            else if (_su.isList(schema)) {
                            }
                            else {
                                that._notifyChanged(propertyName, oldValue, value, "propchange", {}, true);
                            }
                        }
                    }
                },
                enumerable: true
            });
        }, _createStateProp = function (obj, name, defvalue) {
            var ss = obj._schema.properties[name];
            if (!_su.inModel(ss))
                return;
            obj.$states[name] = new _observable.DataStates(obj, name, defvalue);
        }, _createErrorProp = function (obj, name, defvalue) {
            var schema = obj._schema.properties[name];
            if (!_su.inModel(schema))
                return;
            obj.$errors[name] = new _observable.Errors(obj, name, defvalue, _su.isCompositionRef(schema));
        }, _createStateLinks = function (obj, name, defvalue) {
            obj.$links[name] = new _observable.LinkStates(obj, name, defvalue);
        }, _dutils = {
            setValue: function (path, value, model, params) {
                model.setValue(path, value, params);
            },
            getValue: function (path, model, params) {
                return model.getValue(path, params);
            },
            getState: function (path, model, params) {
                return model.getState(path, params);
            },
            _resolveSegment: function (segment, path, value, params, val, isSet) {
                if (segment === '$item') {
                    if (params) {
                        var p = params[path];
                        if (p && p.$index != undefined) {
                            if (isSet)
                                value[p.$index] = val;
                            return value[p.$index];
                        }
                    }
                }
                else if (segment === '$new') {
                    if (isSet)
                        value[segment] = val;
                    return value[segment];
                }
                else {
                    if (value && value[segment] && typeof value[segment] === 'function') {
                        if (isSet)
                            return value[segment](val);
                        return value[segment]();
                    }
                    else {
                        if (isSet)
                            value[segment] = val;
                        return value[segment];
                    }
                }
                return undefined;
            }
        };
        var DataListCore = (function () {
            function DataListCore(schema, parent, path, value, arrayParent, locale) {
                var that = this;
                that._model = [];
                that._items = [];
                that._path = path;
                that._parent = parent;
                that._locale = locale;
                that._arrayParent = arrayParent;
                that._schema = schema;
                that.frozen = false;
                that._setModel(value, false);
                that._createCustomProps();
            }
            DataListCore.prototype.notifyChangedProperty = function (propName) {
                var that = this;
                that._parent._notifyChanged(that._path, undefined, undefined, propName, {}, false);
            };
            DataListCore.prototype.addAjaxException = function (ex) {
                var that = this;
                return that._parent.addAjaxException(ex);
            };
            DataListCore.prototype.notifyPaginationChanged = function () { };
            DataListCore.prototype.notifyCountChanged = function () {
                this.notifyChangedProperty("count");
            };
            DataListCore.prototype.notifySortingChanged = function () { };
            DataListCore.prototype.isQueryable = function () {
                return this._queryable || false;
            };
            DataListCore.prototype.addErrors = function (errors) {
                var that = this;
                var err = that._parent.$errors[that._path];
                if (err)
                    err.addErrors(errors);
                else
                    that._parent.addErrors(errors);
            };
            DataListCore.prototype.addError = function (message) {
                var that = this;
                var errors = [{ severity: "error", message: message }];
                that.addErrors(errors);
            };
            DataListCore.prototype._createCustomProps = function () {
                var that = this;
                Object.defineProperty(that, 'length', {
                    get: function () {
                        return this._items.length;
                    },
                    enumerable: true
                });
            };
            DataListCore.prototype._destroyItems = function () {
                var that = this;
                if (that._items) {
                    that._model = [];
                    that._items = [];
                }
            };
            DataListCore.prototype.$orderby = function (value) {
                return "";
            };
            DataListCore.prototype.totalPages = function () {
                return 1;
            };
            DataListCore.prototype.totalCount = function () {
                return this._items.length;
            };
            DataListCore.prototype.destroy = function () {
                var that = this;
                that._parent = null;
                that._arrayParent = null;
                that._destroyItems();
                that._model = null;
                that._schema = null;
            };
            DataListCore.prototype._fillItems = function () {
                var that = this;
                that._model.forEach(function (item, index) {
                    that._items.push(item);
                });
            };
            DataListCore.prototype._setModel = function (value, frozen) {
                var that = this;
                that.isNull = value === null;
                that.isUndefined = value === undefined;
                value = value || [];
                var ofv = that.frozen;
                if (frozen)
                    that.frozen = true;
                // remove && destroy items 
                that._destroyItems();
                that._model = value;
                that._fillItems();
                that.frozen = ofv;
            };
            DataListCore.prototype.setModel = function (value) {
                var that = this;
                that._setModel(value, true);
                that._parent._notifyChanged(that._path, undefined, undefined, "set", {}, false);
                that.notifyCountChanged();
                that._parent.notifyStateChanged(that._path, {}); ///????
            };
            DataListCore.prototype.updateParams = function (item, prop, value) {
                var that = this;
                var ii = that._items.indexOf(item);
                prop = (prop ? ('$item.' + prop) : '$item');
                var path = [];
                item._getFullPath(path);
                value[path.join('.')] = { $index: ii, $value: item };
                return prop;
            };
            DataListCore.prototype.indexOf = function (value) {
                return this._items.indexOf(value);
            };
            DataListCore.prototype.find = function (prop) {
                var keys = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    keys[_i - 1] = arguments[_i];
                }
                var props = prop.split(','), ll = props.length;
                for (var i = 0, len = this._items.length; i < len; i++) {
                    var found = true;
                    var item = this._items[i];
                    for (var j = 0; j < ll; j++) {
                        if (keys[j] !== item[props[j]]) {
                            found = false;
                            break;
                        }
                    }
                    if (found)
                        return item;
                }
                return null;
            };
            DataListCore.prototype.forEach = function (cb) { return this._items.forEach(cb); };
            DataListCore.prototype.get = function (index) { return this._items[index]; };
            return DataListCore;
        }());
        Observable.DataListCore = DataListCore;
        var DataListBase = (function (_super) {
            __extends(DataListBase, _super);
            function DataListBase() {
                _super.apply(this, arguments);
            }
            DataListBase.prototype._fillItems = function () {
                var that = this;
                that._model.forEach(function (item, index) {
                    that._items.push(new Data(that._schema.items, that._parent, that._path, item, that, false, that._locale, null));
                });
            };
            DataListBase.prototype._destroyItems = function () {
                var that = this;
                if (that._items) {
                    that._items.forEach(function (item) { item.destroy(); });
                    that._model = [];
                    that._items = [];
                }
            };
            DataListBase.prototype.findById = function (id) {
                var that = this;
                for (var i = 0, len = that._items.length; i < len; i++) {
                    var item = that._items[i];
                    if (item.$id === id)
                        return item;
                }
                return null;
            };
            DataListBase.prototype.indexOf = function (value) {
                var that = this;
                if (typeof value !== 'object')
                    value = that.findById(value);
                return value ? that._items.indexOf(value) : null;
            };
            return DataListBase;
        }(DataListCore));
        Observable.DataListBase = DataListBase;
        var QueryList = (function (_super) {
            __extends(QueryList, _super);
            function QueryList(parentSchema, schema, parent, path, value, pageSize, pageNumber, totalCount, arrayParent, locale) {
                _super.call(this, schema, parent, path, value, arrayParent, locale);
                var that = this;
                var root = that._parent.getRootModel();
                var cfg = _du.dsConfig(root.datasets, schema, true);
                if (!cfg) {
                    throw 'Invalid config! You must define a dataset in form for the property: "' + path + '".';
                }
                that._main = cfg.$main;
                that._queryable = true;
                that._query = new Observable.QueryableDataSource(cfg, that);
                that._query.initPagination(pageSize, pageNumber, totalCount);
                if (that._main) {
                    if (root) {
                        root.onRefresh = function (options) {
                            var resetPagination = (options && options.resetPagination);
                            that.$refresh(resetPagination);
                        };
                    }
                }
            }
            Object.defineProperty(QueryList.prototype, "filter", {
                get: function () {
                    return this._query.filter;
                },
                set: function (value) {
                    this._query.filter = value;
                    this.notifyChangedProperty('filter');
                },
                enumerable: true,
                configurable: true
            });
            QueryList.prototype.totalPages = function () {
                return this._query.totalPages();
            };
            QueryList.prototype.totalCount = function () {
                return this._query.totalCount();
            };
            QueryList.prototype.$refresh = function (resetPagination) {
                this._query.refresh(resetPagination);
            };
            QueryList.prototype.$orderby = function (value) {
                return this._query.orderBy(value);
            };
            QueryList.prototype.notifyPaginationChanged = function () {
                this.notifyChangedProperty("pagination");
            };
            QueryList.prototype.notifyFilterChanged = function () {
                this.notifyChangedProperty("filter");
            };
            QueryList.prototype.notifySortingChanged = function () {
                this.notifyChangedProperty("sorting");
            };
            QueryList.prototype.currentPage = function (page) {
                if (page != undefined) {
                    return this._query.currentPage(page);
                }
                else
                    return this._query.currentPage();
            };
            QueryList.prototype._removeItem = function (key, etag) {
                var that = this;
                if (that._query) {
                    var p = that._query.remove(key, etag);
                    if (p.then)
                        p.then(function () {
                            that.$refresh((that._items.length > 1) ? false : true);
                        });
                }
            };
            QueryList.prototype.remove = function (item) {
                var that = this;
                var om = item.model(true);
                var etag = om ? om['@odata.etag'] : null;
                if (that._schema.items && that._schema.items.primaryKey) {
                    var pk_1 = _su.odataId(_su.pkFields(that._schema.items.primaryKey), item);
                    if (that._schema.items.links && that._schema.items.links.$remove && that._schema.items.links.$remove.confirm) {
                        var msg = that._schema.items.links.$remove.confirm;
                        if (that._locale)
                            msg = _ulocale.tt(msg || '', that._locale);
                        _utils.confirm(null, msg, function () {
                            that._removeItem(pk_1, etag);
                        });
                    }
                    else
                        that._removeItem(pk_1, etag);
                }
            };
            QueryList.prototype.destroy = function () {
                var that = this;
                if (that._query) {
                    that._query.destroy();
                    that._query = null;
                }
                if (that._main) {
                    var root = that._parent.getRootModel();
                    if (root)
                        root.onRefresh = null;
                }
                _super.prototype.destroy.call(this);
            };
            return QueryList;
        }(DataListBase));
        Observable.QueryList = QueryList;
        var SimpleTypeList = (function (_super) {
            __extends(SimpleTypeList, _super);
            function SimpleTypeList() {
                _super.apply(this, arguments);
            }
            SimpleTypeList.prototype.push = function (item) {
                var that = this;
                that._model.push(item);
                that._items.push(item);
                that._parent._notifyChanged(that._path, undefined, item, "add", { $index: that._items.length - 1, $value: item, $id: item }, false);
                that.notifyCountChanged();
            };
            SimpleTypeList.prototype.remove = function (item) {
                var that = this;
                var ii = that._items.indexOf(item);
                if (ii >= 0) {
                    that._items.splice(ii, 1);
                    that._model.splice(ii, 1);
                    that._parent._notifyChanged(that._path, undefined, item, "remove", { $index: ii, $value: item, $id: item }, false);
                    that.notifyCountChanged();
                }
            };
            return SimpleTypeList;
        }(DataListCore));
        Observable.SimpleTypeList = SimpleTypeList;
        var DataList = (function (_super) {
            __extends(DataList, _super);
            function DataList(schema, parent, path, value, arrayParent, locale) {
                _super.call(this, schema, parent, path, value, arrayParent, locale);
                var that = this;
                that._createNewItem(true);
            }
            DataList.prototype._createNewItem = function (define) {
                var that = this;
                var o = _su.init(that._schema.items, null);
                if (define) {
                    Object.defineProperty(that, '$new', {
                        get: function () {
                            return this._new;
                        },
                        set: function (value) {
                            this._new._setModel(value, true);
                            this._new._notifyChanged('', undefined, value, "propchange", {});
                            this._new.notifyStateChanged('', {});
                        },
                        enumerable: true
                    });
                }
                that._new = new Data(that._schema.items, that._parent, that._path + '.$new', o, null, true, that._locale, null);
                that._new._notifyChanged('', undefined, o, "propchange", {}, false);
                that._new.notifyStateChanged('', {});
            };
            DataList.prototype.updateItem = function (old, newItem) {
                var that = this;
                // validate
                if (!newItem.validate())
                    return false;
                // clear errors 
                newItem.$errors.$.addErrors([], false);
                // validate primary key
                var newModel = newItem._getModel(true);
                if (that._schema.items.primaryKey) {
                    var keys = _su.pkFields(that._schema.items.primaryKey);
                    var pkNewValue = _su.extractPkValue(newModel, keys);
                    var pkOldValue = _su.extractPkValue(old._getModel(true), keys);
                    var p = _su.findByPk(pkNewValue, keys, that._items);
                    if (p && p !== old) {
                        // Primary key violation
                        var msg = keys.length > 1 ? _localeSchema.uniqueColumns : _localeSchema.uniqueColumn;
                        newItem.$errors.$.addErrors([{ code: "duplicate_value", message: _utils.format(msg, keys.join(', ')) }], false);
                        return false;
                    }
                }
                // update Old object
                return true;
            };
            DataList.prototype.addNew = function () {
                var that = this;
                if (!this._new.validate())
                    return;
                var model = this._new._getModel();
                if (that._schema.items.primaryKey) {
                    var keys = _su.pkFields(that._schema.items.primaryKey);
                    var pkValue = _su.extractPkValue(model, keys);
                    var p = _su.findByPk(pkValue, keys, that._items);
                    // Primary key violation
                    this._parent.$errors[that._path].addErrors([], false);
                    if (p) {
                        var msg = keys.length > 1 ? _localeSchema.uniqueColumns : _localeSchema.uniqueColumn;
                        this._parent.$errors[that._path].addErrors([{ code: "duplicate_value", message: _utils.format(msg, keys.join(', ')) }], false);
                        return;
                    }
                }
                else {
                    this._parent.$errors[that._path].addErrors([], false);
                }
                that._destroyNew();
                that.push(model);
                that._createNewItem(false);
            };
            DataList.prototype._destroyNew = function () {
                var that = this;
                if (that._new) {
                    that._new.destroy();
                    that._new = null;
                }
            };
            DataList.prototype.destroy = function () {
                var that = this;
                that._destroyNew();
                _super.prototype.destroy.call(this);
            };
            DataList.prototype.find = function (prop) {
                var keys = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    keys[_i - 1] = arguments[_i];
                }
                var props = prop.split(','), ll = props.length;
                for (var i = 0, len = this._items.length; i < len; i++) {
                    var found = true;
                    var item = this._items[i];
                    for (var j = 0; j < ll; j++) {
                        if (keys[j] !== item[props[j]]) {
                            found = false;
                            break;
                        }
                    }
                    if (found)
                        return item;
                }
                return null;
            };
            DataList.prototype.push = function (item) {
                var that = this;
                var ofv = that.frozen;
                that.frozen = true;
                that._model.push(item);
                var ii = new Data(that._schema.items, that._parent, that._path, item, that, false, that._locale, null);
                that._items.push(ii);
                that.frozen = ofv;
                ii._notifyChanged('', undefined, item, "add", { $index: that._items.length - 1, $id: ii.$id }, false);
                ii.notifyStateChanged('', {});
            };
            DataList.prototype.remove = function (item) {
                var that = this;
                var removed = null;
                var ofv = that.frozen, notify;
                that.frozen = true;
                var ii = that._items.indexOf(item);
                var id = item.$id;
                if (ii >= 0) {
                    removed = item.model();
                    notify = true;
                    that._items.splice(ii, 1);
                    that._model.splice(ii, 1);
                    item.destroy();
                }
                that.frozen = ofv;
                if (notify) {
                    var path = (that._path ? that._path + '.' : '') + '$item';
                    that._parent._notifyChanged(path, undefined, undefined, "remove", { $index: ii, $value: removed, $id: id }, false);
                    that._parent.notifyStateChanged(path, {}); ///????
                }
            };
            return DataList;
        }(DataListBase));
        Observable.DataList = DataList;
        var Data = (function () {
            function Data(schema, parent, path, value, arrayParent, frozen, locale, datasets, transform) {
                var that = this;
                that.$id = _utils.allocID();
                that.$create = false;
                that._selected = false;
                that._model = {};
                that.datasets = datasets;
                that.transform = transform;
                that.$states = {};
                that.$errors = {};
                that.$links = {};
                that._path = path;
                that._locale = locale;
                that._parent = parent;
                that._schema = schema;
                if (!that._parent) {
                    that._validators = [{ name: 'schema', active: true }];
                }
                that._arrayParent = arrayParent;
                that._children = {};
                that._initFromSchema(schema);
                if (!that._parent || frozen)
                    that.frozen = true;
                if (value && value.$create) {
                    delete value.$create;
                    that.$create = true;
                }
                that._setModel(value, false);
                that.frozen = false;
                if (!that._parent) {
                    that._notifyChanged('*', undefined, value, "propchange", {}, false);
                    that.notifyStateChanged('*', {});
                }
            }
            Data.prototype.setModel = function (value) {
                var that = this;
                that._destroyObject(that, '_children');
                that._children = {};
                that.frozen = true;
                that._setModel(value, false);
                that.frozen = false;
                if (!that._parent) {
                    that._notifyChanged('*', undefined, value, "propchange", {}, false);
                    that.notifyStateChanged('*', {});
                }
            };
            Data.prototype.update = function (value) {
                var that = this;
                if (!value)
                    return;
                var props = Object.keys(that._schema.properties);
                props.forEach(function (name) {
                    var ss = that._schema.properties[name];
                    if (!_su.inModel(ss))
                        return;
                    if (_su.isCompositionRef(ss)) {
                        var ref = that[name];
                    }
                    else if (_su.isCompositionList(ss)) {
                        that[name] = value[name];
                    }
                    else if (_su.isSimpleList(ss)) {
                    }
                    else {
                        that[name] = value[name];
                    }
                });
            };
            Data.prototype.$refresh = function (options) {
                var that = this;
                if (!that._parent) {
                    if (that.onRefresh)
                        that.onRefresh(options);
                    else {
                        var ds = _du.extractMainDataSource(that);
                        if (ds) {
                            var method = Phoenix.data.extractValue(ds.$method);
                            if (method.toUpperCase() === "GET") {
                                _du.datasetAsPromise(ds).then(function (data) {
                                    that.update(data);
                                }).catch(function (ex) {
                                    that.addAjaxException(ex);
                                });
                            }
                        }
                    }
                }
            };
            Data.prototype._validate = function (validators) {
                var that = this;
                if (!validators || !validators.length)
                    return true;
                var props = Object.keys(that._schema.properties);
                var error = false;
                //for each property validate
                props.forEach(function (name) {
                    var ss = that._schema.properties[name];
                    if (!_su.inModel(ss))
                        return;
                    var state = that.$states[ss.$stateProperty || name];
                    if (state.isHidden || state.isDisabled)
                        return;
                    if (_su.isCompositionRef(ss)) {
                        var ref = that[name];
                        if (ref) {
                            if (!ref._validate(validators))
                                error = true;
                        }
                        else {
                            if (state.isMandatory) {
                                that.$errors[name].addErrors([{ message: _utils.format(_localeSchema.required, _su._title(ss.title, Phoenix.locale)) }], false);
                                error = true;
                            }
                        }
                    }
                    else {
                        if (!that._execValidators(validators, name, "validate", {}, { base: that, state: state, schema: ss, value: that[name] })) {
                            error = true;
                        }
                    }
                });
                if (!that._parent) {
                    // validate root element
                    if (!that._execValidators(validators, '', "validate", {}, { base: that, state: null, schema: that._schema, value: null })) {
                        error = true;
                    }
                }
                return !error;
            };
            Data.prototype.validate = function () {
                var that = this;
                var root = that.getRootModel();
                return that._validate(root._validators);
            };
            Object.defineProperty(Data.prototype, "$selected", {
                get: function () {
                    return this._selected;
                },
                set: function (value) {
                    var that = this;
                    if (this._selected !== value) {
                        that._selected = value;
                        that._notifyChanged('$selected', !that._selected, value, "propchange", {}, true);
                    }
                },
                enumerable: true,
                configurable: true
            });
            Data.prototype.$index = function (value) {
                var that = this;
                if (that._arrayParent) {
                    return Math.max(that._arrayParent.indexOf(that), 0) + 1;
                }
                return 0;
            };
            Data.prototype.$save = function () {
                var that = this;
                var root = that.getRootModel();
                if (root !== that)
                    return _utils.Promise.reject(null);
                if (!that.validate())
                    return _utils.Promise.reject(null);
                var ds = _du.extractMainDataSource(that);
                if (ds && _du.isCreateOrUpdate(ds)) {
                    var mData_1 = that.model(false);
                    if (that.$create) {
                        ds.$method = 'POST';
                        delete ds.$params.$entityId;
                    }
                    else {
                        ds.$method = 'PUT';
                        if (!that._schema.primaryKey) {
                            that.addError("Primary key is missing. Check schema.");
                            return;
                        }
                        var keys = _su.pkFields(that._schema.primaryKey);
                        var pkValue = _su.extractPkValue(mData_1, keys);
                        ds.$entityId = _su.entityId(pkValue);
                    }
                    return new _utils.Promise(function (resolve, reject) {
                        _du.datasetAsPromise(ds, mData_1).then(function (data) {
                            resolve();
                        }).catch(function (ex) {
                            that.addAjaxException(ex);
                            reject(null);
                        });
                    });
                }
                else
                    return _utils.Promise.reject(null);
            };
            Data.prototype.getRootModel = function () {
                var p = this;
                while (p._parent) {
                    p = p._parent;
                }
                return p;
            };
            //validators
            Data.prototype.addValidator = function (name, value) {
                var root = this.getRootModel();
                root._validators.push({ name: name, active: value });
            };
            Data.prototype.activateValidator = function (name, value) {
                var that = this;
                var model = that.getRootModel();
                for (var i = 0, len = model._validators.length; i < len; i++) {
                    var v = model._validators[i];
                    if (v.name === name) {
                        v.active = value;
                        break;
                    }
                }
            };
            Data.prototype.hasValidators = function () {
                var that = this;
                var model = that.getRootModel();
                if (model._validators.length) {
                    if (model._validators.length == 1)
                        return model._validators[0].active;
                    else {
                        for (var i = 0, len = model._validators.length; i < len; i++) {
                            if (model._validators[i].active)
                                return true;
                        }
                    }
                }
                return false;
            };
            Data.prototype.getParentOf = function (bind, params) {
                return this.getValue(Observable.SchemaUtils.parentPath(bind), params);
            };
            Data.prototype.setValue = function (path, value, params) {
                var that = this;
                var v = that, segments = path.split('.'), cpath = [], propertyName = segments.pop();
                for (var i = 0, len = segments.length; i < len; i++) {
                    if (!v)
                        break;
                    var s = segments[i];
                    cpath.push(s);
                    if (s.charAt(0) == "$")
                        v = _dutils._resolveSegment(s, cpath.join('.'), v, params);
                    else
                        v = v[s];
                }
                if (v) {
                    if (propertyName.charAt(0) == "$" && !_su.isMetaProp(propertyName)) {
                        cpath.push(propertyName);
                        _dutils._resolveSegment(propertyName, cpath.join('.'), v, params, value, true);
                    }
                    else
                        v[propertyName] = value;
                }
            };
            Data.prototype._getModel = function (original) {
                var that = this;
                if (original) {
                    return that._model;
                }
                var model = $.extend(true, {}, that._model);
                _su.removeStates(model);
                _su.removeMeta(model);
                return model;
            };
            Data.prototype.model = function (original) {
                return this._getModel(original);
            };
            Data.prototype.getRelativeValue = function (path) {
                return this.getValue(path, {});
            };
            Data.prototype.getRelativeState = function (path) {
                return this.getState(path, {});
            };
            Data.prototype.getValue = function (path, params) {
                var that = this;
                if (path == '')
                    return that;
                var v = that, segments = path.split('.'), propertyName = segments.pop(), cpath = [];
                for (var i = 0, len = segments.length; i < len; i++) {
                    if (!v)
                        break;
                    var s = segments[i];
                    cpath.push(s);
                    if (s.charAt(0) == "$")
                        v = _dutils._resolveSegment(s, cpath.join('.'), v, params);
                    else
                        v = v[s];
                }
                if (v) {
                    if (propertyName && propertyName.charAt(0) == "$" && !_su.isMetaProp(propertyName)) {
                        cpath.push(propertyName);
                        return _dutils._resolveSegment(propertyName, cpath.join('.'), v, params);
                    }
                    return propertyName ? v[propertyName] : v;
                }
                return undefined;
            };
            Data.prototype._getFullPath = function (path, root) {
                var that = this;
                if (that === root)
                    return path;
                if (that._parent) {
                    that._parent._getFullPath(path, null);
                }
                if (that._path)
                    path.push(that._path);
                if (that._arrayParent) {
                    path.push('$item');
                }
            };
            Data.prototype.getSchema = function (path) {
                var that = this;
                return _su.getSchema(path, that._schema);
            };
            //TODO states for $index
            Data.prototype.getState = function (path, params) {
                var that = this;
                var segments = path.split('.'), propertyName = segments.pop(), opropertyName = propertyName, cs = that, ps, res = {}, cpath = [], islink = false;
                var len = segments.length - 1;
                var isMeta = _su.isMetaProp(propertyName);
                if (isMeta) {
                    var ms = _su.getSchema(path, that._schema);
                    if (ms && ms.$stateProperty)
                        propertyName = ms.$stateProperty;
                }
                for (var i = 0; i <= len; i++) {
                    var s = segments[i];
                    cpath.push(s);
                    if (_su.arrayProps.indexOf(s) >= 0) {
                        //xxxxxxx
                        //TODO : params for $item
                        cs = cs[s];
                    }
                    else if (i == len && s == "$links") {
                        islink = true;
                        break;
                    }
                    else {
                        ps = cs.$states[s] ? cs.$states[s].state() : null;
                        cs = cs[s];
                    }
                    if (!cs || cs.isNull || cs.isUndefined) {
                        res.isDisabled = true;
                    }
                    if (ps && ps.isHidden)
                        res.isHidden = true;
                    if (ps && ps.isDisabled)
                        res.isDisabled = true;
                    if (ps && ps.isReadOnly)
                        res.isReadOnly = true;
                    if (!cs)
                        break;
                }
                var state = {};
                if (cs) {
                    var pp = '$states';
                    if (islink)
                        pp = '$links';
                    var oo = cs[pp] ? cs[pp][propertyName] : null;
                    if (oo) {
                        state = oo.state();
                        if (!islink && cs.$errors) {
                            state.errors = cs.$errors[opropertyName].errors();
                        }
                    }
                }
                return $.extend({}, state, res);
            };
            Data.prototype._setModel = function (value, frozen) {
                var that = this;
                var ofv = that.frozen;
                if (frozen)
                    that.frozen = true;
                that.isNull = value === null;
                that.isUndefined = value === undefined;
                value = value || {};
                value.$states = value.$states || {};
                value.$links = value.$links || {};
                value.$errors = value.$errors || {};
                var props = Object.keys(that._schema.properties);
                //for each property set value && state
                props.forEach(function (name) {
                    var si = that._schema.properties[name];
                    if (!_su.inModel(si))
                        return;
                    var isMeta = _su.isMetaProp(name);
                    var val = value[name];
                    if (!val && (_su.isCompositionList(si) || _su.isList(si))) {
                        val = [];
                        value[name] = val;
                    }
                    if (_su.isList(si))
                        that._setQueryListChild(name, val, value.pageSize, value.pageSize ? (Math.round(value.skip / value.pageSize) + 1) : 0, value.count);
                    else
                        that[name] = val;
                    if (!isMeta) {
                        if (value.$states && value.$states[name]) {
                            var ss_1 = value.$states[name];
                            Object.keys(ss_1).forEach(function (sn) { that.$states[name][sn] = ss_1[sn]; });
                        }
                        value.$states[name] = that.$states[name].state();
                    }
                    if (value.$errors && value.$errors[name]) {
                        var errors = value.$errors[name];
                        var ne_1 = [];
                        errors.forEach(function (err) { ne_1.push(err); });
                        that.$errors[name].addErrors(ne_1);
                    }
                    value.$errors[name] = that.$errors[name].errors();
                });
                //for each link set state
                if (value.$links) {
                    props = Object.keys(that._schema.links || {});
                    props.forEach(function (name) {
                        var ss = value.$links[name];
                        var dst = that.$links[name];
                        if (ss) {
                            Object.keys(ss).forEach(function (sn) { dst[sn] = ss[sn]; });
                        }
                        value.$links[name] = that.$links[name].state();
                    });
                }
                that._model = value;
                that.frozen = ofv;
            };
            Data.prototype._setRefChild = function (propertyName, oldvalue, value) {
                var that = this;
                var ofv = that.frozen;
                that.frozen = true;
                if (!that._children[propertyName])
                    that._children[propertyName] = new Data(that._schema.properties[propertyName], that, propertyName, value, null, false, that._locale, null);
                else
                    that._children[propertyName]._setModel(value, false);
                that.frozen = ofv;
            };
            Data.prototype._setListChild = function (propertyName, oldvalue, value) {
                var that = this;
                var ofv = that.frozen;
                that.frozen = true;
                if (!that._children[propertyName])
                    that._children[propertyName] = new DataList(that._schema.properties[propertyName], that, propertyName, value, null, that._locale);
                else
                    that._children[propertyName]._setModel(value, false);
                that.frozen = ofv;
            };
            Data.prototype._setSimpleListChild = function (propertyName, oldvalue, value) {
                var that = this;
                var ofv = that.frozen;
                that.frozen = true;
                if (!that._children[propertyName])
                    that._children[propertyName] = new SimpleTypeList(that._schema.properties[propertyName], that, propertyName, value, null, that._locale);
                else
                    that._children[propertyName]._setModel(value, false);
                that.frozen = ofv;
            };
            Data.prototype._setQueryListChild = function (propertyName, value, pageSize, page, totalCount) {
                var that = this;
                var ofv = that.frozen;
                that.frozen = true;
                if (that._children[propertyName])
                    that._children[propertyName].destroy();
                that._children[propertyName] = new QueryList(that._schema, that._schema.properties[propertyName], that, propertyName, value, pageSize, page, totalCount, null, that._locale);
                that.frozen = ofv;
                that._notifyChanged(propertyName, null, value, "propchange", {}, true);
                that.notifyStateChanged(propertyName, {});
            };
            Data.prototype._initFromSchema = function (schema) {
                var that = this;
                if (!that._model)
                    return;
                var states = (schema.states ? $.extend(true, {}, schema.states) : null), links = (schema.links ? $.extend(true, {}, schema.links) : null), errors = (schema.errors ? $.extend(true, {}, schema.errors) : null);
                var npAdded = false;
                //create hidden props
                var props = Object.keys(schema.properties);
                props.forEach(function (pn) {
                    if (_su.isMetaProp(pn))
                        return;
                    var cs = schema.properties[pn];
                    if (cs.format === "password") {
                        if (!cs.capabilities || !cs.capabilities.noConfirming) {
                            var np = "$$" + pn;
                            cs.$meta = np;
                            var ps = schema.properties[np];
                            if (!ps) {
                                ps = $.extend(true, {}, cs);
                                ps.title = Phoenix.locale.ui.Confirm;
                                // for this field use $stateProperty to get    
                                ps.$stateProperty = pn;
                                schema.properties[np] = ps;
                                npAdded = true;
                            }
                        }
                    }
                });
                if (npAdded)
                    props = Object.keys(schema.properties);
                props.forEach(function (name) {
                    _createProp(that, name);
                    if (!_su.isMetaProp(name))
                        _createStateProp(that, name, states ? states[name] : null);
                    _createErrorProp(that, name, errors ? errors[name] : null);
                });
                if (schema.links) {
                    Object.keys(schema.links).forEach(function (name) { _createStateLinks(that, name, links ? links[name] : null); });
                }
                // root error
                if (!that._parent) {
                    that.$errors.$ = new _observable.Errors(that, '$', [], false);
                }
            };
            Data.prototype.getParentModel = function (path) {
                var segments = path.split('.');
                segments.pop();
                return _dutils.getValue(segments.join('.'), this);
            };
            Data.prototype.addAjaxException = function (ex) {
                var that = this;
                if (that._parent) {
                    return that._parent.addAjaxException(ex);
                }
                var error = _ajax.extractAjaxErrors(ex);
                var errors = [];
                var firstGlbError = null;
                if (error.message) {
                    firstGlbError = { message: error.message, details: [] };
                    errors.push(firstGlbError);
                }
                if (error.list && error.list.length) {
                    error.list.forEach(function (ed) {
                        var addGlb = true;
                        if (ed.target) {
                            var m = that.getParentModel(ed.target);
                            if (m) {
                                var pn = _su.lastSegment(ed.target, null);
                                if (m.hasOwnProperty(pn)) {
                                    addGlb = false;
                                    m.$errors[pn].addError(ed.message);
                                }
                            }
                        }
                        if (addGlb) {
                            if (firstGlbError)
                                firstGlbError.details.push({ message: ed.message });
                            else
                                errors.push({ message: ed.message });
                        }
                    });
                }
                that.$errors.$.addErrors(errors);
            };
            Data.prototype.addError = function (message) {
                var that = this;
                var errors = [{ severity: "error", message: message }];
                that.addErrors(errors);
            };
            Data.prototype.addErrors = function (errors) {
                var that = this;
                if (that._arrayParent) {
                }
                else {
                    if (that._parent)
                        that._parent.addErrors(errors);
                    else {
                        if (that.$errors.$)
                            that.$errors.$.addErrors(errors);
                    }
                }
            };
            Data.prototype._beforeChange = function (propertyName, oldValue, value) {
                return true;
            };
            Data.prototype.notifyStateChanged = function (stateName, params) {
                var that = this;
                if (that.frozen || (that._arrayParent && that._arrayParent.frozen))
                    return;
                if (that._arrayParent)
                    stateName = that._arrayParent.updateParams(that, stateName, params);
                if (that._parent)
                    that._parent.notifyStateChanged(stateName ? (that._path + '.' + stateName) : that._path, params);
                else {
                    _utils.logModule('proxydata') && _utils.log("State changed: " + that._extractPropName(stateName || '', params), "proxydata");
                    if (that.onstatechanged)
                        that.onstatechanged(stateName, params);
                }
            };
            Data.prototype._extractPropName = function (pn, params) {
                Object.keys(params).sort().reverse().forEach(function (name) {
                    var p = params[name];
                    if (p && p.$index !== undefined) {
                        pn = pn.replace(name, name + '[' + p.$index + ']');
                    }
                });
                return pn;
            };
            Data.prototype._execValidators = function (validators, propertyName, event, params, ldata) {
                var that = this;
                var error = false;
                if (propertyName) {
                    if (!ldata) {
                        var value = that.getValue(propertyName, params);
                        if (value == undefined)
                            return !error;
                    }
                }
                else if (event != 'validate')
                    return !error;
                var first = true;
                validators.forEach(function (validator) {
                    if (validator.active) {
                        if (!validator.hnd)
                            validator.hnd = _su.getValidator(validator.name);
                        if (validator.hnd) {
                            if (ldata)
                                ldata.add = !first;
                            if (!validator.hnd(event, that, { name: propertyName, params: params, locale: that._locale }, ldata)) {
                                error = true;
                            }
                            first = false;
                        }
                    }
                });
                return !error;
            };
            Data.prototype._notifyChanged = function (propertyName, oldValue, value, op, params, validate) {
                var that = this;
                if (that.frozen || (that._arrayParent && that._arrayParent.frozen))
                    return;
                if (that._arrayParent) {
                    if (op === 'propchange' && propertyName) {
                        var item = that._arrayParent.findById(that.$id);
                        if (item == that) {
                            that._parent._notifyChanged(that._path, oldValue, value, "upd", { $id: item.$id, property: propertyName }, validate);
                        }
                    }
                    propertyName = that._arrayParent.updateParams(that, propertyName, params);
                }
                if (that._parent) {
                    that._parent._notifyChanged(propertyName ? (that._path + '.' + propertyName) : that._path, oldValue, value, op, params, validate);
                }
                else {
                    _utils.logModule('proxydata') && _utils.log("Changed: " + that._extractPropName(propertyName || '', params) + ', operation = ' + op, "proxydata");
                    if (that.onchange)
                        that.onchange(propertyName, oldValue, value, op, params);
                    if (validate && that._validators && that.hasValidators()) {
                        that._execValidators(that._validators, propertyName, 'propchanged', params);
                    }
                }
            };
            Data.prototype._destroyObject = function (obj, pn) {
                var o = obj[pn];
                if (o) {
                    Object.keys(o).forEach(function (name) {
                        o[name].destroy();
                        delete o[name];
                    });
                }
            };
            Data.prototype.destroy = function () {
                var that = this;
                that._parent = null;
                that._destroyObject(that, '_children');
                that._destroyObject(that, '$states');
                that._destroyObject(that, '$links');
                that._destroyObject(that, '$errors');
                that._arrayParent = null;
                that._model = null;
                that._schema = null;
                that.onRefresh = null;
                that.onchange = null;
                that.onstatechanged = null;
            };
            return Data;
        }());
        Observable.Data = Data;
        Observable.ObservableUtils = _dutils;
    })(Observable = Phoenix.Observable || (Phoenix.Observable = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../../core/locale.ts" />
/// <reference path="../../core/core.ts" />
/// <reference path="../../data/datasets.ts" />
/// <reference path="./proxy.data.ts" />
/// <reference path="./schema.data.ts" />
var Phoenix;
(function (Phoenix) {
    var _ulocale = Phoenix.ulocale, _application = Phoenix.application, _ajax = Phoenix.ajax;
    var Observable;
    (function (Observable) {
        var _data = Phoenix.data, _utils = Phoenix.utils, _su = Observable.SchemaUtils;
        var _schemaValidator = function (event, model, params, data) {
            var res = true;
            var isValidate = event === "validate";
            if (event === "propchanged" || isValidate) {
                if (!params.name)
                    return res;
                var pn = _su.lastSegment(params.name, null);
                if (_su.arrayProps.indexOf(pn) >= 0)
                    return res;
                var value = data ? data.value : model.getValue(params.name, params.params);
                var state = data ? data.state : model.getState(params.name, params.params);
                var schema = data ? data.schema : model.getSchema(params.name);
                if (state && (state.isHidden || state.isDisabled))
                    return res;
                var llocale = params.locale;
                var errors = [];
                var base = data ? data.base : model.getParentOf(params.name, params.params);
                if (!_su.validateSchema(value, schema, state, llocale, errors))
                    res = false;
                if (isValidate) {
                    // check password
                    if (_su.isMetaProp(pn) && schema && schema.format === "password") {
                        var orig = model.getValue(_su.extractBase(params.name) + schema.$stateProperty, params.params);
                        schema = model.getValue(_su.extractBase(params.name) + schema.$stateProperty, params.params);
                        if (!_su.validatePassword(orig, value, schema, state, llocale, errors))
                            res = false;
                    }
                }
                var add = false;
                if (event === "validate" && data) {
                    add = data.add;
                }
                base.$errors[pn].addErrors(errors, add);
            }
            return res;
        };
        _su.registerValidator('schema', _schemaValidator);
    })(Observable = Phoenix.Observable || (Phoenix.Observable = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../../core/core.ts" />
var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        var _ui = ui, _utils = Phoenix.utils;
        var FormManager = (function () {
            function FormManager() {
                this._forms = {};
                this._inAction = false;
            }
            FormManager.prototype.setInAction = function (value) {
                this._inAction = value;
            };
            FormManager.prototype.isInAction = function () {
                return this._inAction;
            };
            FormManager.prototype.add = function (form) {
                if (form && form.data && form.data.name)
                    this._forms[form.data.name] = form;
            };
            FormManager.prototype.remove = function (form) {
                if (form && form.data && form.data.name)
                    this._forms[form.data.name] = null;
            };
            FormManager.prototype.formByName = function (form) {
                return this._forms[form];
            };
            return FormManager;
        }());
        ui.FormManager = FormManager;
        var fm = function () {
            var _cfm;
            return function () {
                if (!_cfm)
                    _cfm = new FormManager();
                return _cfm;
            };
        };
        ui.formManager = fm();
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../../../../typings/index.d.ts" />
/// <reference path="../../core/core.ts" />
/// <reference path="../../ui/layout.control.ts" />
/// <reference path="./schema.data.ts" />
/// <reference path="./proxy.data.ts" />
/// <reference path="./formmanager.ts" />
var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        var _ui = ui, _utils = Phoenix.utils, _build = Phoenix.build, _link = Phoenix.link, _dom = Phoenix.dom, _preferences = Phoenix.preferences, _sutils = Phoenix.Observable.SchemaUtils, _outils = Phoenix.Observable.ObservableUtils, _ulocale = Phoenix.ulocale;
        var Form = (function (_super) {
            __extends(Form, _super);
            function Form(layoutData, options, ldata, schema, locale) {
                options = options || {};
                options.form = true;
                _super.call(this, layoutData, options, ldata, schema, locale);
                var that = this;
                if (options.module) {
                    that.module = options.module;
                    delete options.module;
                }
                that.formManager = _ui.formManager();
                that.formManager.add(that);
                that.$schema = schema || {};
                if (options.path) {
                    that.$schema = _sutils.getSchema(options.path, that.$schema, true);
                }
                that.$locale = locale;
                if (options && options.storageName)
                    that._settingsName = options.storageName;
                that.setData(ldata);
                that.$model.onchange = that._modelChanged.bind(that);
                that.$model.onstatechanged = that._stateChanged.bind(that);
                that.$bind = {};
                Object.keys(that.map).forEach(function (layoutId) {
                    var l = that.map[layoutId];
                    if (l.$bindState) {
                        that.$bind[l.$bindState] = that.$bind[l.$bindState] || [];
                        that.$bind[l.$bindState].push(layoutId);
                    }
                });
                Object.keys(that.$bind).forEach(function (propName) {
                    var state = that.$model.getState(propName, {});
                    if (state && state.isHidden) {
                        var l = that.$bind[propName];
                        l.forEach(function (layoutId) {
                            that.map[layoutId].$isHidden = true;
                        });
                    }
                    that.registerListenerFor(propName, that, "layout-state");
                });
                that.registerListenerFor('$', that);
                that.loadPrefs();
                if (options && options.validators)
                    options.validators.forEach(function (validatorName) {
                        that.$model.addValidator(validatorName, true);
                    });
                if (!that.options.design && that.options.externalSchema && that.options.externalLayout && !_build.release) {
                    that.options.authoringIndicator = true;
                    that.options.verticalSpacing = true;
                }
                that._afterCreate();
            }
            Form.prototype._isInDelayedAction = function () {
                if (this.formManager)
                    return this.formManager.isInAction();
                else
                    return this._internalDelayedAction;
            };
            Form.prototype._setInDelayedAction = function (value) {
                if (this.formManager)
                    this.formManager.setInAction(value);
                else
                    this._internalDelayedAction = value;
            };
            Form.prototype.setData = function (ldata) {
                var that = this;
                that.$data = _sutils.init(that.$schema, null, ldata || {});
                if (that.options.beforeSetModel) {
                    that.options.beforeSetModel(that.$data, that);
                }
                if (!that.$model) {
                    that.$model = new Phoenix.Observable.Data(that.$schema, null, '', that.$data, null, false, that.$locale, that.data.datasets, that.data.transformData);
                }
                else {
                    that.$model.setModel(that.$data);
                }
                if (that.options.afterModelCreated) {
                    that.options.afterModelCreated(that.$model, that);
                }
            };
            Form.prototype.processing = function (value) {
                var that = this;
                that._inProcessing = value;
            };
            Form.prototype._findControlByField = function (name) {
                var that = this;
                var list = [];
                Object.keys(that.controls).forEach(function (cn) {
                    var c = that.controls[cn];
                    if (c && c.$bind === name) {
                        list.push(c);
                    }
                });
                return list.length ? list : null;
            };
            Form.prototype.loadPrefs = function () {
                var that = this;
                if (that._settingsName)
                    that._settings = _preferences(that._settingsName);
            };
            Form.prototype.getFieldSettings = function (field) {
                var that = this;
                if (that._settings)
                    return that._settings[field];
                return null;
            };
            Form.prototype.setFieldSettings = function (field, settings) {
                var that = this;
                that._settings = that._settings || {};
                that._settings[field] = settings;
            };
            Form.prototype.savePrefs = function () {
                var that = this;
                if (that._settingsName) {
                    that._settings = that._settings || {};
                    _preferences(that._settingsName, that._settings);
                }
            };
            Form.prototype.sendMessage = function (message, field, params) {
                var that = this;
                var res;
                var ctrls = that._findControlByField(field);
                if (ctrls && ctrls.length) {
                    ctrls.forEach(function (ctrl) {
                        if (ctrl.sendMessage)
                            res = ctrl.sendMessage(message, params);
                    });
                }
                return res;
            };
            Form.prototype.afterSettings = function (field, widget, sdata) {
                var that = this;
                if (that.options.settingsHandler)
                    return that.options.settingsHandler('after', field, widget, sdata);
                return sdata;
            };
            Form.prototype.beforeSettings = function (field, widget) {
                var that = this;
                if (that.options.settingsHandler)
                    return that.options.settingsHandler('before', field, widget);
                return null;
            };
            Form.prototype._createError = function () {
                var that = this;
                var css = ['bs-form-error'];
                if (that.options.verticalSpacing)
                    css.push('bs-form-vertical-space');
                else if (that.options.closeButtonHandler || that.options.authoringIndicator)
                    css.push('bs-form-settings-space');
                return $('<div id="' + that.data.$id + '_error" class="' + css.join(' ') + '"><div>').get(0);
            };
            Form.prototype._createErrorItem = function (error, show) {
                var that = this;
                var style = (error.severity == 'success' ? 'success' : ((error.severity == 'warning') ? 'warning' : 'danger'));
                var c = show ? '' : 'bs-none ';
                var html = ['<div data-error="true" class="' + c + ' alert alert-' + style + ' alert-dismissible fade in">'];
                html.push('<button type="button" data-error-close="true" class="close" aria-label="Close"><span data-error-close="true" aria-hidden="true">&times;</span></button>');
                html.push(_utils.escapeHtml(error.message));
                if (error.details && error.details.length) {
                    error.details.forEach(function (err) {
                        if (err.message)
                            html.push('<p class="bs-error-detail-item">' + _utils.escapeHtml(err.message) + '</p>');
                    });
                }
                html.push('</div>');
                return $(html.join('')).get(0);
            };
            Form.prototype.clearErrors = function () {
                var that = this;
                if (that.$element) {
                    var eerr = _dom.find(that.$element.get(0), that.data.$id + '_error');
                    if (eerr) {
                        _dom.empty(eerr);
                    }
                }
            };
            Form.prototype.showErrorItem = function (error, clear) {
                var that = this;
                if (that.$element) {
                    var eerr = _dom.find(that.$element.get(0), that.data.$id + '_error');
                    if (eerr) {
                        if (clear) {
                            _dom.empty(eerr);
                        }
                        _dom.append(eerr, that._createErrorItem(error, clear));
                    }
                }
            };
            Form.prototype.afterRenderChildren = function ($e) {
                //setup tooltip
                $e.find('[data-phoenix-tooltip]')["tooltip"]({
                    html: true,
                    container: 'body',
                    template: '<div class="tooltip bs-tooltip-help" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
                });
            };
            Form.prototype.afterRender = function ($e) {
                var that = this;
                var e = $e.get(0);
                var fc = e.firstChild ? e.firstChild : e;
                if (that.options.form && !that.options.design) {
                    _dom.before(fc, that._createError());
                }
                var fdetail = function (icon, type, color, delta) {
                    var html = ['<div ' + type + '="true" class="bs-cursor-p bs-form-settings' + (color ? ' ' + color : '') + (delta ? ' ' + ' space-' + delta : '') + '" id="' + that.data.$id + '_settings">'];
                    html.push('<span ' + type + '="true" class="' + _dom.iconClass(icon) + '"></span>');
                    html.push('</div>');
                    return html.join('');
                };
                var cd = 0;
                if (that.options.closeButtonHandler) {
                    _dom.append(e, $(fdetail('times-circle-o', 'data-form-detail-close', 'red', cd)).get(0));
                    cd++;
                }
                if (that.options.authoringIndicator) {
                    _dom.append(e, $(fdetail('cog', 'data-form-settings', null, cd)).get(0));
                    cd++;
                }
            };
            Form.prototype.stateChanged = function (propName, params) {
                var that = this;
                if (params.targetId === "layout-state") {
                    if (propName === "isHidden" && params.property) {
                        var state_1 = that.$model.getState(params.property, {});
                        var l = that.$bind[params.property];
                        if (l)
                            l.forEach(function (layoutId) {
                                var layout = that.map[layoutId];
                                if (layout)
                                    that.updateIsHidden(layout, state_1.isHidden);
                            });
                    }
                }
                else if (that.$model.$errors && that.$model.$errors.$) {
                    var err = that.$model.$errors.$;
                    if (!err.hasErrors()) {
                        that.clearErrors();
                    }
                    else {
                        var le = err.errors();
                        for (var i = 0, len = le.length; i < len; i++) {
                            var ce = le[i];
                            that.showErrorItem(ce, i == 0);
                        }
                    }
                    err.clear(false);
                }
            };
            Form.prototype.getSchema = function (path) {
                return _sutils.getSchema(path, this.$schema);
            };
            Form.prototype.getLookupForSchema = function (path, lookupName) {
                return _sutils.getLookup(path, lookupName, this.$schema);
            };
            Form.prototype.registerListenerFor = function (field, target, id) {
                var that = this;
                var p = field;
                that._listenerChanged = true;
                that._listeners = that._listeners || {};
                that._listeners[p] = that._listeners[p] || [];
                that._listeners[p].push({ target: target, id: id || '' });
            };
            Form.prototype.unRegisterListenerFor = function (field, target) {
                var that = this;
                var p = field;
                if (that._listeners && that._listeners[p]) {
                    var i = that._listeners[p].findIndex(function (item) {
                        return item.target === target;
                    });
                    if (i >= 0) {
                        that._listeners[p].splice(i, 1);
                        that._listenerChanged = true;
                    }
                }
            };
            Form.prototype.setValue = function (path, value) {
                _outils.setValue(path, value, this.$model);
            };
            Form.prototype.getValue = function (path) {
                return _outils.getValue(path, this.$model);
            };
            Form.prototype.getParentModel = function (path) {
                var segments = path.split('.');
                segments.pop();
                return _outils.getValue(segments.join('.'), this.$model);
            };
            Form.prototype.getState = function (path) {
                var that = this;
                var res = _outils.getState(path, this.$model);
                if (that.options.design) {
                    res.isHidden = false;
                    res.isDisabled = false;
                }
                return res;
            };
            Form.prototype._enumListener = function (name, cb) {
                var that = this;
                that._listeners[name].forEach(function (target) {
                    cb(target);
                });
            };
            Form.prototype._rebuildListeners = function () {
                var that = this;
                if (that._listenerChanged) {
                    that._listenersByName = Object.keys(that._listeners);
                    that._listenerChanged = false;
                }
            };
            Form.prototype._match = function (p, cb) {
                var that = this;
                var match = p.join('.'), match2 = match + '.';
                if (that._listenersByName) {
                    that._listenersByName.forEach(function (name) {
                        if (name == match) {
                            cb(name, true, false, false);
                        }
                        else if (name === '*' || (name.indexOf(match2) == 0)) {
                            cb(name, false, true, false);
                        }
                    });
                }
            };
            Form.prototype.execAction = function (propName, actionParams, params) {
                this._modelChanged(propName, null, null, 'execute', params, actionParams);
            };
            Form.prototype._modelChanged = function (propName, ov, nv, op, params, actionParams) {
                var that = this;
                var p = propName.split('.');
                that._rebuildListeners();
                //update controls
                params = params || {};
                if (op !== "execute") {
                    that._match(p, function (name, exact, parent, child) {
                        params.propName = name;
                        if (exact) {
                            that._enumListener(name, function (item) {
                                if (item.target.changed) {
                                    params.targetId = item.id;
                                    item.target.changed(propName, ov, nv, op, params);
                                }
                            });
                        }
                        else if (parent) {
                            that._enumListener(name, function (item) {
                                if (item.target.changed) {
                                    params.targetId = item.id;
                                    item.target.changed(propName, ov, (op === 'propchange' ? that.getValue(name) : ov), op, params);
                                }
                            });
                        }
                    });
                }
                that.afterchanged(propName, op, params, actionParams);
                //update controls
            };
            Form.prototype.afterchanged = function (propName, op, params, actionParams) {
                var that = this;
                if (that.onaction) {
                    if (that.inAction)
                        return;
                    that.inAction = true;
                    try {
                        that.onaction({ property: propName, operation: op, params: params, actionParams: actionParams }, that.$model, that);
                    }
                    finally {
                        that.inAction = false;
                    }
                }
            };
            Form.prototype.on = function (cb) {
                this.onaction = cb;
            };
            Form.prototype._stateChanged = function (propName) {
                var that = this;
                var p = propName.split('.'), stateName, propertyName;
                if (_sutils.statesAndErrors.indexOf(p[p.length - 1]) >= 0) {
                    stateName = p.pop();
                    propertyName = p.join('.');
                }
                that._rebuildListeners();
                that._match(p, function (name, exact, parent, child) {
                    if (exact) {
                        that._enumListener(name, function (item) {
                            if (item.target.stateChanged)
                                item.target.stateChanged(stateName, { targetId: item.id, property: propertyName });
                        });
                    }
                    else if (parent) {
                        that._enumListener(name, function (item) {
                            if (item.target.stateChanged)
                                item.target.stateChanged(null, { targetId: item.id, property: propertyName });
                        });
                    }
                });
            };
            Form.prototype.destroy = function () {
                var that = this;
                that.$data = null;
                that.$schema = null;
                that.$bind = null;
                that.module = null;
                that._listeners = {};
                that._listenersByName = [];
                if (that.$model) {
                    that.$model.onchange = null;
                    that.$model.onstatechanged = null;
                    that.$model.destroy();
                    that.$model = null;
                }
                if (that.formManager) {
                    that.formManager.remove(that);
                    that.formManager = null;
                }
                _super.prototype.destroy.call(this);
            };
            Form.prototype._idComponent = function (el) {
                var that = this;
                if (!that.$element)
                    return;
                var t = el, root = that.$element.get(0), id;
                while (t) {
                    if (!t.getAttribute)
                        return null;
                    id = t.getAttribute('data-render');
                    if (id)
                        break;
                    t = (t == root) ? null : t.parentNode;
                }
                return id ? id : null;
            };
            Form.prototype._event2FieldByElement = function (el) {
                var that = this;
                var id = that._idComponent(el);
                if (!id)
                    return null;
                return that.controls[id];
            };
            Form.prototype._event2Field = function (event) {
                var that = this;
                return that._event2FieldByElement(event.target);
            };
            Form.prototype._removeBaseEvents = function () {
                var that = this;
                that.$element.off('focusin');
                that.$element.off('focusout');
                that.$element.off('click');
                that.$element.off('keydown');
                that.$element.off('keypress');
                that.$element.off('mousedown');
                $(window).off('global-phoenix-resize');
                _super.prototype._removeBaseEvents.call(this);
            };
            Form.prototype._freeze = function (e) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            };
            Form.prototype._addBaseEvents = function () {
                var that = this;
                that.$element.on('focusin', function (event) {
                    if (that._inProcessing)
                        return that._freeze(event);
                    var control = that._event2Field(event);
                    if (control && control.focusIn) {
                        if (control.focused)
                            return;
                        control.focused = true;
                        control.focusIn(event);
                    }
                });
                that.$element.on('focusout', function (event) {
                    if (that._inProcessing)
                        return that._freeze(event);
                    var control = that._event2Field(event);
                    if (control && control.focusOut) {
                        var ne = { target: event.target };
                        if (control.focusTimer) {
                            window.clearTimeout(control.focusTimer);
                            control.focusTimer = 0;
                        }
                        that._setInDelayedAction(true);
                        control.focusTimer = _utils.focusDelay(function () {
                            that._setInDelayedAction(false);
                            if (control.destroyed)
                                return;
                            control.focusTimer = 0;
                            var ae = window.document.activeElement;
                            if (ae) {
                                var c = that._event2FieldByElement(ae);
                                if (c !== control) {
                                    control.focusOut(ne);
                                    control.focused = false;
                                }
                            }
                            else {
                                control.focusOut(ne);
                                control.focused = false;
                            }
                        });
                    }
                });
                that.$element.on('click', function (event) {
                    if (that._inProcessing)
                        return that._freeze(event);
                    var control = that._event2Field(event);
                    if (control && control.click) {
                        if (control.stopProppagation)
                            control.stopProppagation(event);
                        if (control.focusClick)
                            return;
                        if (!that._isInDelayedAction() || control.focused && control.targetInControl(event.target)) {
                            return control.click(event);
                        }
                        that._setInDelayedAction(true);
                        control.focusClick = _utils.focusDelay(function () {
                            that._setInDelayedAction(false);
                            if (control.destroyed)
                                return;
                            control.focusClick = 0;
                            control.click(event);
                            return;
                        });
                    }
                    else if (!control) {
                        var target = event.target;
                        if (target) {
                            var close_1 = target.getAttribute('data-error-close');
                            if (close_1) {
                                var elem = _dom.findByAttribute(event.target, that.$element.get(0), "data-error");
                                if (elem)
                                    _dom.remove(elem);
                                that.openErrors();
                                return that._freeze(event);
                            }
                            else if (target.getAttribute('data-form-detail-close')) {
                                if (that.options.closeButtonHandler) {
                                    that.options.closeButtonHandler();
                                }
                                return that._freeze(event);
                            }
                            else if (target.getAttribute('data-form-settings')) {
                                if (that.options.authoringIndicator) {
                                    _link.execLink({ $formAuthoring: true, path: that.options.path, name: that.options.externalLayout, schema: that.options.externalSchema, locale: that.options.externalLocale }, {}, null);
                                }
                                return that._freeze(event);
                            }
                        }
                    }
                });
                that.$element.on('keypress', function (event) {
                    if (that._inProcessing)
                        return that._freeze(event);
                    var control = that._event2Field(event);
                    if (control && control.keypress)
                        control.keypress(event);
                });
                that.$element.on('keydown', function (event) {
                    if (that._inProcessing)
                        return that._freeze(event);
                    var control = that._event2Field(event);
                    if (control && control.keydown)
                        control.keydown(event);
                });
                that.$element.on('keyup', function (event) {
                    if (that._inProcessing)
                        return that._freeze(event);
                    var control = that._event2Field(event);
                    if (control && control.keyup)
                        control.keyup(event);
                });
                that.$element.on('mousedown', function (event) {
                    if (that._inProcessing)
                        return that._freeze(event);
                    var control = that._event2Field(event);
                    if (control && control.mousedown)
                        return control.mousedown(event);
                    return true;
                });
                $(window).on('global-phoenix-resize', function (event) {
                    if (that.resizeList)
                        that.resizeList.forEach(function (c) { c.resize(); });
                    return true;
                });
                _super.prototype._addBaseEvents.call(this);
            };
            Form.prototype.afterAddedInDom = function () {
                var that = this;
                that.resizeList.forEach(function (c) { c.resize(); });
                _super.prototype.afterAddedInDom.call(this);
            };
            return Form;
        }(ui.BaseLayout));
        ui.Form = Form;
        ;
        ui.FormClass = Form;
        function removeForm(form) {
            if (form) {
                var e = null;
                if (form.$element) {
                    e = form.$element.get(0);
                }
                form.destroy();
                if (e)
                    _dom.remove(e);
            }
        }
        ui.removeForm = removeForm;
        ui.OpenForm = null;
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../../../../typings/index.d.ts" />
/// <reference path="../../core/core.ts" />
/// <reference path="../../core/ajax.ts" />
/// <reference path="../modal.control.ts" />
/// <reference path="./form.control.ts" />
/// <reference path="./schema.data.ts" />
var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        var _ajax = Phoenix.ajax, _utils = Phoenix.utils, _application = Phoenix.application, _su = Phoenix.Observable.SchemaUtils;
        var ModalForm = (function (_super) {
            __extends(ModalForm, _super);
            function ModalForm(formOptions, layout, schema, data, locale) {
                _super.call(this, formOptions, locale);
                var that = this;
                var opts = formOptions.opts ? formOptions.opts : {};
                if (formOptions.validators) {
                    opts.validators = formOptions.validators;
                    delete formOptions.validators;
                }
                that.render = new ui.Form(layout, opts, data, schema, locale);
                that.render.$locale = locale;
            }
            ModalForm.prototype.on = function (hnd) {
                var that = this;
                var newHnd = function (action, data, form) {
                    return hnd(that, action, data, form);
                };
                this._clickHnd = function (name) {
                    that.render.afterchanged(name, "modal-action", {});
                };
                that.render.on(newHnd);
            };
            return ModalForm;
        }(ui.Modal));
        ui.ModalForm = ModalForm;
        var _openForm = function (formOptions, params, handler) {
            _su.loadSchemaRefs(params.schema, params.data, params.layout, function (ldata) {
                var f = new ModalForm(formOptions, params.layout, params.schema, ldata, params.locale);
                f.open();
                if (handler)
                    f.on(handler);
            });
        };
        var _OpenModalForm = function (formOptions, layout, schema, fdata, locale, handler) {
            var ci = 0, li = -1, si = -1, promises = [], params = { locale: locale }, dataIndex = -1;
            var config = _application.config(_application.name);
            var opts = {};
            formOptions = formOptions || {};
            formOptions.opts = opts;
            if (locale && locale.$name)
                opts.externalLocale = locale.$name;
            if (!fdata || !fdata.then)
                params.data = $.extend(true, {}, fdata);
            else {
                promises.push(fdata);
                dataIndex = 0;
                ci++;
            }
            if (typeof layout === 'object') {
                params.layout = $.extend(true, {}, layout);
            }
            else {
                li = ci;
                ci++;
                opts.externalLayout = layout;
                promises.push(_ajax.get(config.forms + '/' + layout + '.json'));
            }
            if (typeof schema === 'object') {
                params.schema = $.extend(true, {}, schema);
            }
            else {
                si = ci;
                ci++;
                opts.externalSchema = schema;
                promises.push(_ajax.get(config.prototypes + '/' + schema + '.json'));
            }
            if (promises.length) {
                _utils.Promise.all(promises).then(function (values) {
                    if (li >= 0)
                        params.layout = values[li];
                    if (si >= 0)
                        params.schema = values[si];
                    if (dataIndex >= 0)
                        params.data = values[dataIndex];
                    _openForm(formOptions, params, handler);
                });
            }
            else
                _openForm(formOptions, params, handler);
        };
        var _openInlineForm = function ($parent, params, handler, opts) {
            var render = new ui.Form(params.layout, opts || { design: false }, params.data, params.schema, params.locale);
            render.$locale = params.locale;
            render.render($parent);
            if (handler)
                render.on(handler);
            return render;
        };
        var _loadSubLayouts = function ($parent, params, handler, formOpts, after) {
            params.layout;
        };
        var _afterLoadSchema = function ($parent, params, handler, formOpts, after) {
            _su.loadSchemaRefs(params.schema, params.data, params.layout, function (ldata) {
                params.data = ldata;
                var form = _openInlineForm($parent, params, handler, formOpts);
                if (after)
                    after(form);
            });
        };
        var _OpenFormExp = function ($parent, layout, schema, fdata, locale, handler, formOpts, after) {
            var ci = 0, li = -1, si = -1, promises = [], params = { locale: locale }, dataIndex = -1;
            formOpts = formOpts || {};
            if (locale && locale.$name)
                formOpts.externalLocale = locale.$name;
            if (!fdata || !fdata.then)
                params.data = $.extend(true, {}, fdata);
            else {
                promises.push(fdata);
                dataIndex = 0;
                ci++;
            }
            var config = _application.config(_application.name);
            if (typeof layout === 'object') {
                params.layout = $.extend(true, {}, layout);
            }
            else {
                li = ci;
                ci++;
                formOpts.externalLayout = layout;
                promises.push(_ajax.get(config.forms + '/' + layout + '.json'));
            }
            if (typeof schema === 'object') {
                params.schema = $.extend(true, {}, schema);
            }
            else {
                si = ci;
                ci++;
                formOpts.externalSchema = schema;
                promises.push(_ajax.get(config.prototypes + '/' + schema + '.json'));
            }
            if (promises.length) {
                _utils.Promise.all(promises).then(function (values) {
                    if (li >= 0)
                        params.layout = values[li];
                    if (si >= 0)
                        params.schema = values[si];
                    if (dataIndex >= 0) {
                        params.data = values[dataIndex];
                    }
                    _afterLoadSchema($parent, params, handler, formOpts, after);
                }).catch(function (ex) {
                    console.log(ex);
                    throw ex;
                });
            }
            else {
                _afterLoadSchema($parent, params, handler, formOpts, after);
            }
        };
        function _camelize(propName) {
            var s = propName.charAt(0).toUpperCase() + propName.slice(1);
            return 'on' + s.replace(/(?:^|[-_\.])(\w)/g, function (_, c) {
                return c ? c.toUpperCase() : '';
            });
        }
        var FormController = (function () {
            function FormController() {
            }
            FormController.prototype.data = function () { return null; };
            FormController.prototype.initObjectState = function (model) { };
            FormController.prototype.onModelChanged = function (action, model, form) {
                var that = this;
                if (action.operation === 'propchange') {
                    var c = _camelize(action.property);
                    if (that[c])
                        return that[c](action, model, form);
                    ;
                }
            };
            return FormController;
        }());
        ui.FormController = FormController;
        ui.OpenModalForm = _OpenModalForm;
        ui.OpenForm = _OpenFormExp;
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../../../../../typings/index.d.ts" />
/// <reference path="../../../core/core.ts" />
/// <reference path="../../../ui/layout.control.ts" />
/// <reference path="../schema.data.ts" />
/// <reference path="../form.control.ts" />
var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        var _render = Phoenix.render, _ui = ui, _dom = Phoenix.dom, _device = Phoenix.device, _observable = Phoenix.Observable, _bootstrap4 = Phoenix.bootstrap4, _ulocale = Phoenix.ulocale, _locale = Phoenix.locale, _customData = Phoenix.customData, _sutils = _observable.SchemaUtils, _registerControl = function (factory, type, isEnum, widget, options) {
            isEnum = isEnum || false;
            widget = widget || '';
            if (isEnum)
                type = '*';
            options = options || {};
            var lookup = options.lookup || false;
            if (options.readOnly)
                _customData.register('ui-controls-readonly-' + widget, factory);
            else
                _customData.register('ui-controls-' + type + '-' + isEnum + '-' + lookup + '-' + widget, factory);
        }, _getRegisterdControl = function (type, isEnum, widget, options) {
            isEnum = isEnum || false;
            if (isEnum)
                type = '*';
            widget = widget || '';
            var lookup = options && options.lookup ? true : false;
            var readOnly = options && options.readOnly ? true : false;
            if (readOnly)
                return _customData.get('ui-controls-readonly-' + widget);
            else
                return _customData.get('ui-controls-' + type + '-' + isEnum + '-' + lookup + '-' + widget);
        }, _dateNative = function () {
            var res = false, called = false;
            return function () {
                if (called)
                    return res;
                called = true;
                if (_device.phone || _device.tablet) {
                    var elem = document.createElement('input');
                    elem.setAttribute('type', 'date');
                    res = (elem.type === 'date');
                    return res;
                }
                else
                    return false;
            };
        }, _numberNative = function () {
            var res = false, called = false;
            return function () {
                if (called)
                    return res;
                called = true;
                if (_device.phone || _device.tablet) {
                    var elem = document.createElement('input');
                    elem.setAttribute('type', 'number');
                    res = (elem.type === 'number');
                    return res;
                }
                else
                    return false;
            };
        }, _afutils = {
            useDatePicker: function () { return !_afutils.nativeDate() && $.fn.datepicker != null; },
            nativeDate: _dateNative(),
            nativeNumber: _numberNative(),
            addErrorDiv: function (html) {
                html.push('<div class="small text-danger bs-none" id="{0}_errors"></div>');
            },
            keyPressPassword: function (event) {
                var code = event.which;
                if (code === _dom.keys.VK_SPACE) {
                    event.preventDefault();
                    return false;
                }
                return true;
            },
            keyPressCode: function (event) {
                var code = event.which;
                if (code === _dom.keys.VK_SPACE) {
                    event.preventDefault();
                    return false;
                }
                return true;
            },
            keyPressNumber: function (event) {
                var validChars = "-0123456789,." + _locale.number.decimal;
                var code = event.which;
                if (!event.metaKey && _dom.ignoreKeys.indexOf(code) < 0) {
                    var char = String.fromCharCode(code);
                    if (validChars.indexOf(char) < 0) {
                        event.preventDefault();
                        return false;
                    }
                }
                return true;
            },
            getRegisterdControl: _getRegisterdControl,
            addContainerId: function (html, authoring) {
                if (authoring)
                    html.push(' draggable="true"');
                html.push(' data-render="{0}"');
                html.push(' id="{0}"');
            },
            containerBaseClass: function (groupClass, authoring, options) {
                var css = [groupClass, options.groupFieldClass || "bs-field-group", "bs-island"];
                if (options.inline)
                    css.push(options.inlineFieldClass || "bs-field-inline");
                if (authoring)
                    css.push(' design');
                return css.join(' ');
            },
            fieldWrapper: function (html, options, authoring, after, customizer) {
                if (options.inline)
                    options.columns = false;
                var groupClass = customizer && customizer.formGroup ? customizer.formGroup : "form-group";
                var css = [_afutils.containerBaseClass(groupClass, authoring, options)];
                var tag = customizer && customizer.tag ? customizer.tag : "div";
                html.push('<' + tag + ' class="');
                if (options.size && !_bootstrap4)
                    css.push('form-group-' + options.size);
                if (options.columns) {
                    if (!_bootstrap4)
                        css.push('form-horizontal');
                    css.push('row');
                }
                if (options.styles)
                    css.push(options.styles);
                if (options.right)
                    css.push(' pull-right');
                html.push(css.join(' '));
                html.push('"');
                _afutils.addContainerId(html, authoring);
                html.push('>');
                after();
                html.push('</' + tag + '>');
            },
            fillSelect: function (enums, input, schema) {
                if (input) {
                    var enumNames = schema.enumNames || schema.enum;
                    var oenums = schema.enum;
                    _dom.empty(input);
                    var frag = document.createDocumentFragment();
                    enums.forEach(function (en) {
                        var i = oenums.indexOf(en);
                        var et = enumNames[i] || (en + '');
                        var o = document.createElement('option');
                        _dom.attr(o, "value", en);
                        o.textContent = et;
                        _dom.append(frag, o);
                    });
                    _dom.append(input, frag);
                }
            },
            datePickerSetValue: function ($element, value) {
                $element['datepicker']('update', _ulocale.parseISODate(value || '') || '');
            },
            datePickerInitialize: function ($element, opts, onHide) {
                _dom.addClass($element.get(0), 'date');
                var o = $.extend({ language: _ulocale.currentLang, autoclose: true }, opts || {});
                $element['datepicker'](o);
                if (onHide)
                    $element['datepicker']().on('hide', onHide);
            },
            datePickerDestroy: function ($element) {
                $element['datepicker']('destroy');
            },
            text2value: function (textValue, schema) {
                var that = this;
                if (_sutils.isDate(schema)) {
                    if (_ui.Utils.nativeDate())
                        return textValue;
                    else
                        return _ulocale.localeDate2ISO(textValue);
                }
                else if (_sutils.isNumber(schema)) {
                    return _sutils.text2Value(textValue + '', schema);
                }
                return textValue;
            },
            defaultOptions: { titleIsHidden: false, placeHolder: false, labelCol: 3 },
            displayValue: function (value, schema, locale, options) {
                var res;
                options = options || {};
                if (value === undefined)
                    value = '';
                if (schema.enum) {
                    var si = schema.enum.indexOf(value);
                    if (si >= 0)
                        res = { value: (schema.enumNames ? _ulocale.tt(schema.enumNames[si], locale) : value), html: false };
                    else
                        res = { value: '', html: false };
                }
                else {
                    switch (schema.type) {
                        case "string":
                            if (schema.format) {
                                switch (schema.format) {
                                    case "date":
                                        res = { value: _ulocale.shortDate(value || ''), html: false };
                                        break;
                                }
                            }
                            if (!res)
                                res = { value: value, html: false };
                            break;
                        case "number":
                            if (schema.format == 'money') {
                                res = { value: _ulocale.money(value || 0, options.useSymbol), html: false };
                            }
                            else {
                                res = { value: _ulocale.decimal(value || 0, schema.decimals || 0, (options.useSymbol ? schema.symbol : '')), html: false };
                            }
                            break;
                        case "integer":
                            res = { value: _ulocale.decimal(value || 0, 0, ''), html: false };
                            break;
                        case "boolean":
                            if (options.html) {
                                var html = [];
                                if ((options.avanced && options.avanced.editable) || options.editable || options.check) {
                                    var ces = '';
                                    var curs = 'bs-cursor-d ';
                                    if (options.editable) {
                                        ces = ' bs-bool-edit';
                                        curs = 'bs-cursor-p ';
                                    }
                                    var cc = options.tableOptions && options.tableOptions.small ? ' small-table' : '';
                                    html.push('<center class="bs-bool-center' + cc + '"><span data-clickable="true" class="' + curs + _dom.iconClass(value ? 'check-square-o' : 'square-o') + ces + '"></span></center>');
                                    res = { value: html.join(''), html: true };
                                }
                                else {
                                    res = { value: value ? _locale.ui.Yes : _locale.ui.No, html: false };
                                }
                            }
                            else
                                res = { value: value ? _locale.ui.Yes : _locale.ui.No, html: false };
                            break;
                    }
                }
                if (!res)
                    res = { value: value, html: false };
                if (options.html && options.avanced && options.avanced.$link) {
                    var chtml = ['<a class="bs-cursor-p" data-phoenix-href="link://$link">'];
                    chtml.push(res.value);
                    chtml.push('</a>');
                    res.value = chtml.join('');
                    res.html = true;
                }
                return res;
            },
            addTooltip: function (html, description, options) {
                html.push('<span id="{0}_tooltip" data-toggle="tooltip" data-phoenix-tooltip="true" data-placement="auto" title="' + description + '" class="' + _dom.iconClass("question-circle") + ' bs-tooltip-icon');
                if (options && options.inline)
                    html.push(' bs-tooltip-icon-inline');
                html.push('"></span>');
            }
        };
        var AbsField = (function () {
            function AbsField(fp, options, form) {
                var that = this;
                that.config = fp;
                that.form = form;
                that.parent = that.form.getLayoutById(fp.$parentId);
                that.$bind = fp.$bind;
                that.$display = that.config.$display || that.$bind;
                if (fp.$lookup) {
                    that.useDisplay = (that.$display !== that.$bind);
                    that.$lookup = that.form.getLookupForSchema(that.$bind, fp.$lookup);
                }
                var isMeta = _sutils.isMeta(that.$bind);
                if (isMeta)
                    that.$bind = that.getCustomBind();
                if (that.$bind) {
                    form.registerListenerFor(that.$bind, that);
                }
                if (that.useDisplay) {
                    form.registerListenerFor(that.$display, that);
                }
                that._defineProps();
                that.options = options || {};
                that.fieldOptions = fp.options || {};
                that.renderOptions = that.fieldOptions;
                that.$schema = that.$bind ? form.getSchema(that.$bind) : {};
                that.id = fp.$id;
            }
            AbsField.prototype.targetInControl = function (target) {
                var that = this;
                if (that.$element) {
                    var e = that.$element.get(0);
                    return _dom.isChildOf(e, target);
                }
                return false;
            };
            AbsField.prototype.getCustomBind = function () {
                return '';
            };
            AbsField.prototype.setHidden = function (element) {
                if (this.state.isHidden)
                    _dom.addClass(element, "bs-none");
                else
                    _dom.removeClass(element, "bs-none");
            };
            AbsField.prototype._state = function () {
                var that = this;
                that.state = that.state || {};
                var state = that.form.getState(that.$bind);
                that.state.value = that.form.getValue(that.$bind);
                Object.keys(state).forEach(function (pn) { that.state[pn] = state[pn]; });
            };
            AbsField.prototype._defineProps = function () { };
            AbsField.prototype.render = function ($parent) { };
            AbsField.prototype.appendElement = function ($parent, options) {
                var that = this;
                if ($parent) {
                    if (that.options.replaceParent)
                        $parent.replaceWith(that.$element);
                    else
                        $parent.append(that.$element);
                }
            };
            AbsField.prototype.setEvents = function (opts) {
            };
            AbsField.prototype.removeEvents = function () { };
            AbsField.prototype.customOptions = function (opts) {
            };
            AbsField.prototype._initOptions = function (defOpts) {
                var that = this;
                var popts = {};
                // init default options from parent layout ($fieldsOptions)
                if (that.parent && that.parent.$fieldsOptions) {
                    if (that.parent.$fieldsOptions.columns) {
                        if (popts.columns === undefined) {
                            popts.columns = that.parent.$fieldsOptions.columns;
                        }
                        if (popts.labelCol === undefined && that.parent.$fieldsOptions.labelCol) {
                            popts.labelCol = that.parent.$fieldsOptions.labelCol;
                        }
                    }
                    if (that.parent.$fieldsOptions.titleIsHidden) {
                        if (popts.titleIsHidden === undefined)
                            popts.titleIsHidden = true;
                    }
                }
                var opts = $.extend({}, defOpts, popts, that.fieldOptions);
                if (that.parent.$inline)
                    opts.inline = true;
                that.customOptions(opts);
                that.renderOptions = opts;
                return opts;
            };
            AbsField.prototype.destroy = function () {
                var that = this;
                that.destroyed = true;
                that.$schema = null;
                that.parent = null;
                if (!that.$element) {
                    that.removeEvents();
                    that.$element = null;
                }
                if (that.$bind)
                    that.form.unRegisterListenerFor(that.$bind, that);
                if (that.useDisplay)
                    that.form.unRegisterListenerFor(that.$display, that);
            };
            AbsField.prototype.showErrors = function (element, errors) {
                var that = this;
                var hasErrors = errors && errors.length;
                var e = _dom.find(element, that.id + '_errors');
                if (e) {
                    if (hasErrors) {
                        _dom.text(e, errors[0].message);
                        _dom.removeClass(e, 'bs-none');
                    }
                    else {
                        _dom.addClass(e, 'bs-none');
                    }
                }
            };
            return AbsField;
        }());
        ui.AbsField = AbsField;
        ;
        if (_afutils.useDatePicker) {
            var tdp = function (lang) {
                $.fn.datepicker.dates[lang] = {
                    days: _locale.date.weekdays,
                    daysShort: _locale.date.weekdaysShort,
                    daysMin: _locale.date.weekdaysMin,
                    months: _locale.date.months,
                    monthsShort: _locale.date.monthsShort,
                    today: _locale.date.today,
                    clear: _locale.date.clear,
                    format: _locale.date.dateShort.replace(/\//g, _locale.date.daySep),
                    titleFormat: 'MM yyyy',
                    weekStart: _locale.date.weekStart
                };
            };
            tdp(_ulocale.currentLang);
            _ulocale.register(tdp);
        }
        ui.Utils = _afutils;
        ui.registerControl = _registerControl;
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../../../../../typings/index.d.ts" />
/// <reference path="../../../core/core.ts" />
/// <reference path="./absfield.control.ts" />
var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        var _ui = ui, _utils = Phoenix.utils, _dom = Phoenix.dom, _ulocale = Phoenix.ulocale, _bootstrap4 = Phoenix.bootstrap4;
        function _createAlert(id, options, authoring) {
            options = $.extend({ columns: false }, options);
            options.columns = false;
            var html = [];
            _ui.Utils.fieldWrapper(html, options, authoring, function () {
                html.push('<div id="{0}_alert" class="alert alert-' + (options.type || 'danger') + '" role="alert">');
                html.push('</div>');
            });
            return _utils.format(html.join(''), id);
        }
        ;
        var Alert = (function (_super) {
            __extends(Alert, _super);
            function Alert(fp, options, form) {
                _super.call(this, fp, options, form);
                this._state();
            }
            Alert.prototype._setDisabled = function (input, element) {
                var that = this;
                /* not supported */
            };
            Alert.prototype._setReadOnly = function (input, element) {
                /* nothing todo */
            };
            Alert.prototype._setMandatory = function (input, element) {
                /* not supported */
            };
            Alert.prototype._label = function () {
                var that = this;
                return that.$element ? _dom.find(that.$element.get(0), that.id + '_alert') : null;
            };
            Alert.prototype._state2UI = function () {
                var that = this, label = that._label(), element = that.$element ? that.$element.get(0) : null;
                if (label) {
                    _dom.text(label, that.state.value || '');
                    that._setDisabled(label, element);
                    that._setReadOnly(label, element);
                    that.setHidden(element);
                    that._setMandatory(label, element);
                }
            };
            Alert.prototype.changed = function (propName, ov, nv, op) {
                var that = this, label = that._label();
                if (that.state.value != nv) {
                    that.state.value = nv;
                    if (label)
                        _dom.text(label, that.state.value || '');
                }
            };
            Alert.prototype.stateChanged = function (propName, params) {
                var that = this, state = that.form.getState(that.$bind), label = that._label(), element = that.$element ? that.$element.get(0) : null;
                if (state.isHidden !== that.state.isHidden) {
                    that.state.isHidden = state.isHidden;
                    if (label)
                        that.setHidden(element);
                }
                if (state.isDisabled != that.state.isDisabled) {
                    that.state.isDisabled = state.isDisabled;
                    if (label)
                        that._setDisabled(label, element);
                }
                if (state.isReadOnly != that.state.isReadOnly) {
                    that.state.isReadOnly = state.isReadOnly;
                    if (label)
                        that._setReadOnly(label, element);
                }
                if (state.isMandatory != that.state.isMandatory) {
                    that.state.isMandatory = state.isMandatory;
                    if (label)
                        that._setMandatory(label, element);
                }
            };
            Alert.prototype.render = function ($parent) {
                var that = this;
                var opts = that._initOptions(_ui.Utils.defaultOptions);
                if (!that.$element) {
                    that.$element = $(_createAlert(that.id, opts, that.options.design));
                    that._state2UI();
                }
                that.appendElement($parent, opts);
                return that.$element;
            };
            return Alert;
        }(ui.AbsField));
        ui.Alert = Alert;
        _ui.registerControl(Alert, "string", false, 'alert', null);
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../../../../../typings/index.d.ts" />
/// <reference path="../../../core/core.ts" />
/// <reference path="./absfield.control.ts" />
/// <reference path="../schema.data.ts" />
/// <reference path="../../../core/locale.ts" />
var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        var _ui = ui, _utils = Phoenix.utils, _dom = Phoenix.dom, _ui = ui, _ulocale = Phoenix.ulocale, _su = Phoenix.Observable.SchemaUtils;
        var _addDesign = function (id, options, authoring, html) {
            if (authoring)
                html.push(' draggable="true"');
            html.push(' data-render="{0}"');
        }, _addSortIndicator = function (th, asc) {
            var lc = _dom.icon(asc ? "caret-up" : "caret-down");
            _dom.addClass(lc, "bs-basictable-sort");
            _dom.attr(lc, "sort", "true");
            _dom.append(th, lc);
        }, _rmvSortIndicator = function (th) {
            if (th.lastElementChild) {
                if (_dom.attr(th.lastElementChild, "sort") === "true") {
                    _dom.remove(th.lastElementChild);
                }
            }
        }, _updSorting = function (options, pc, colMap, orderby) {
            if (!options.sorting)
                return;
            if (pc && pc.childElementCount) {
                var aorderby = (orderby || '').split(" ");
                if (!aorderby.length)
                    aorderby = [''];
                for (var i = 0, len = pc.children.length - 1; i < len; i++) {
                    var e = pc.children[i];
                    var cid = _dom.attr(e, "colId");
                    if (aorderby[0] === cid) {
                        _rmvSortIndicator(e);
                        _addSortIndicator(e, aorderby.length == 1);
                    }
                    else
                        _rmvSortIndicator(e);
                }
            }
        }, _ensureWidth = function (value) {
            if (typeof value === "number")
                return value + 'px';
            return value;
        }, _createDetail = function (id, childBefore) {
            var res = document.createElement('tr');
            res.className = "bs-table-row-detail";
            res.id = id + '_detail';
            var td = document.createElement('td');
            td.colSpan = childBefore.childNodes.length;
            _dom.append(res, td);
            return res;
        }, _createColsWidth = function (columns, options, isFrozen) {
            var frag = document.createDocumentFragment();
            columns.forEach(function (col) {
                var cc = document.createElement('col');
                if (col.options.width)
                    cc.style.width = _ensureWidth(col.options.width);
                if (col.options.minWidth)
                    cc.style.minWidth = _ensureWidth(col.options.minWidth);
                _dom.append(frag, cc);
            });
            return frag;
        }, _createCols = function (id, columns, options, authoring, locale, orderby, isFrozen) {
            var frag = document.createDocumentFragment();
            var aorderby = (orderby || '').split(' ');
            columns.forEach(function (col, colIndex) {
                var css;
                var th = document.createElement('th');
                _dom.attr(th, "colId", col.$bind);
                if (!options._useColGrp) {
                    if (col.options.width)
                        th.style.width = _ensureWidth(col.options.width);
                    if (col.options.minWidth)
                        th.style.minWidth = _ensureWidth(col.options.minWidth);
                }
                if (css)
                    th.className = css.join(' ');
                if (!col.isLink)
                    _dom.append(th, document.createTextNode(_ulocale.tt(col.title || String.fromCharCode(160), locale)));
                if (options.sorting && _su.canSort(col.schema)) {
                    css = css || [];
                    css.push('bs-cursor-p');
                    if (aorderby && aorderby.length && aorderby[0] === col.$bind) {
                        _addSortIndicator(th, orderby.length === 1);
                    }
                }
                if (css)
                    th.className = css.join(' ');
                _dom.append(frag, th);
            });
            return frag;
        }, _createGridRows = function (id, rows, values, columns, options, authoring, locale) {
            var frag = document.createDocumentFragment();
            rows && rows.forEach(function (row, rowIndex) {
                _dom.append(frag, _createGridRow(id, rowIndex, row, values, columns, options, authoring, locale));
            });
            return frag;
        }, 
        /*
        *  row: {name: fieldName, schema: {}}
        */
        _createGridRow = function (id, index, row, values, columns, options, authoring, locale) {
            var tr = document.createElement('tr');
            if (options.align === "middle")
                _dom.addClass(tr, "bs-va-middle");
            columns.forEach(function (col, colIndex) {
                var td = document.createElement('td');
                if (colIndex == 0) {
                    _dom.append(td, document.createTextNode(row.schema.title || String.fromCharCode(160)));
                }
                else {
                    _dom.attr(td, "rowId", col.id);
                    _dom.attr(td, "colId", row.name);
                    td["rowIndex"] = index;
                    td["colIndex"] = colIndex - 1;
                    var item = values.get(colIndex - 1);
                    var v = _ui.Utils.displayValue(item.getRelativeValue(row.name), row.schema, locale, { html: true, useSymbol: true, editable: row.canEdit, check: row.check, avanced: null, tableOptions: options });
                    if (v.html) {
                        var $c = $(v.value);
                        _dom.append(td, $c.get(0));
                    }
                    else
                        _dom.append(td, document.createTextNode(v.value));
                }
                _dom.append(tr, td);
            });
            return tr;
        }, _createRow = function (id, index, row, columns, options, authoring, locale, isOdd, isFrozen) {
            var tr = document.createElement('tr');
            tr.id = row.$id + (isFrozen ? '_frozen' : '');
            tr.className = "bs-table-row";
            if (options.align === "middle")
                _dom.addClass(tr, "bs-va-middle");
            if (!options._useStripedCss) {
                var isOdd_1 = index % 2 === 1;
                if (!isOdd_1)
                    _dom.addClass(tr, "even");
            }
            columns.forEach(function (col, colIndex) {
                var td = document.createElement('td');
                if (index === 0 && options.headerIsHidden && !options._useColGrp) {
                    if (col.options.width)
                        td.style.width = _ensureWidth(col.options.width);
                    if (col.options.minWidth)
                        td.style.minWidth = _ensureWidth(col.options.minWidth);
                }
                var css = [];
                if (col.schema && _su.isNumber(col.schema))
                    css.push("nowrap");
                if (col.options.align) {
                    if (col.options.align == "center")
                        css.push('align-center');
                    else if (col.options.align == "right")
                        css.push('align-end');
                }
                if (css.length)
                    td.className = css.join(' ');
                _dom.attr(td, "colId", col.$bind);
                var state = row.getRelativeState(col.$bind);
                if (state.isHidden) {
                }
                else {
                    if (col.isLink) {
                        var btn = void 0, span = void 0;
                        if (col.options.button) {
                            var _space = "";
                            btn = document.createElement('button');
                            btn.type = "button";
                            if (state.isDisabled)
                                btn.disabled = true;
                            var sizeCss = col.options.size === 'normal' ? '' : ' btn-' + (options.size || 'sm');
                            btn.className = 'bs-button btn btn-' + (col.options.type || 'link') + sizeCss + (state.isDisabled ? ' disabled' : '');
                            if (col.options.icon) {
                                span = document.createElement('span');
                                span.className = _dom.iconClass(col.options.icon);
                                _dom.append(btn, span);
                                _space = ' ';
                            }
                            if (col.schema.title) {
                                var tn = document.createTextNode(_space + col.schema.title);
                                _dom.append(btn, tn);
                            }
                        }
                        else if (col.options.icon) {
                            btn = document.createElement('center');
                            if (state.isDisabled) {
                                _dom.addClass(btn, 'bs-disabled');
                            }
                            span = document.createElement('span');
                            var cssb = ['text-' + (col.options.type || 'default')];
                            cssb.push("bs-basictable-btn");
                            cssb.push(_dom.iconClass(col.options.icon));
                            span.className = cssb.join(' ');
                            _dom.append(btn, span);
                        }
                        else {
                        }
                        if (btn) {
                            btn["$link"] = col.$bind;
                            _dom.append(td, btn);
                        }
                    }
                    else {
                        var p = td;
                        var co = col.options || {};
                        var editable = co.editable && !state.isDisabled && !state.isReadOnly;
                        var v = _ui.Utils.displayValue(row.getRelativeValue(col.$bind), col.schema, locale, { html: true, useSymbol: false, selectable: co.selectable, editable: editable, check: co.check, avanced: co, tableOptions: options });
                        if (v.html) {
                            var $c = $(v.value);
                            _dom.append(p, $c.get(0));
                        }
                        else
                            _dom.append(p, document.createTextNode(v.value));
                    }
                }
                _dom.append(tr, td);
            });
            return tr;
        }, _createRows = function (id, rows, columns, options, authoring, locale, isFrozen) {
            var frag = document.createDocumentFragment();
            rows && rows.forEach(function (row, rowIndex) {
                var isOdd = rowIndex % 2 === 1;
                _dom.append(frag, _createRow(id, rowIndex, row, columns, options, authoring, locale, isOdd, isFrozen));
            });
            return frag;
        }, _onlyBoolsEditables = function (columns) {
            var res = true;
            for (var i = 0, len = columns.length; i < len; i++) {
                var col = columns[i];
                if (col.options.editable) {
                    if (!_su.isBoolean(col.schema)) {
                        res = false;
                        break;
                    }
                }
            }
            return res;
        }, _canUseColGroups = function (options, columns) {
            var that = this;
            var res = true;
            // all columns have width defined (but not minWidth)
            for (var i = 0, len = columns.length; i < len; i++) {
                var col = columns[i];
                if (!col.options.width || col.options.minWidth) {
                    res = false;
                    break;
                }
            }
            res = res && options.width !== "auto";
            if (!res) {
                var vscrolling = options.scrolling && options.scrolling.vertical;
                if (vscrolling) {
                    throw "To support scrolling vertical, all columns must have explicit widths but not explicit minWidth.";
                }
                if (options.editing) {
                    if (!_onlyBoolsEditables(columns))
                        throw "To support inline editing, all columns must have explicit widths but not explicit minWidth.";
                }
            }
            return res;
        }, _cssTable = function (options, isHeader, isFrozen) {
            var css = ["table"];
            if (isHeader) {
                css.push("table-header");
            }
            if (!isHeader && options._useStripedCss) {
                css.push("table-striped");
            }
            if (options._useColGrp) {
                css.push("bs-fixed");
            }
            //adde
            if (!isHeader && (options.editing || options.nowrap)) {
                css.push('nowrap');
            }
            else if (!isHeader && options.allowFrozenColumns) {
                css.push('nowrap');
            }
            //remove 
            //if ((options.selecting && options.selecting.cell) ||  {
            //    css.push('nowrap');
            //}
            //add :
            //if (options.editing || options.nowrap) {
            //    css.push('nowrap');
            //}
            css.push('bs-theme');
            if (options.border)
                css.push('table-bordered');
            if (options.small)
                css.push('bs-style-small-table');
            return css;
        }, _styleTable = function (options, isHeader, isFrozen) {
            var style = [];
            if (isFrozen)
                return style;
            if (options.width && options.width !== "auto") {
                style.push("min-width: " + _ensureWidth(options.width));
            }
            return style;
        }, _createTable = function (html, options, isHeader, isFrozen) {
            var vscrolling = options.scrolling && options.scrolling.vertical;
            var css = _cssTable(options, isHeader, isFrozen);
            html.push('<table');
            if (css.length)
                html.push(' class="' + css.join(' ') + '"');
            html.push(' id="{0}_table');
            if (isFrozen)
                html.push('_frozen');
            if (isHeader)
                html.push('_header');
            html.push('"');
            var style = _styleTable(options, isHeader, isFrozen);
            if (style.length)
                html.push(' style="' + style.join(';') + '"');
            html.push('>');
            //if (options.description) {
            //    html.push("<caption>");
            //    _ui.Utils.addTooltip(html, options.description, options);
            //    html.push("</caption>");
            //}
            if (options._useColGrp)
                html.push('<colgroup id="{0}_colgrp' + (isFrozen ? '_frozen' : '') + (isHeader ? '_header' : '') + '"></colgroup>');
            if (!options.headerIsHidden) {
                if (isHeader) {
                    html.push('<thead><tr id="{0}' + (isFrozen ? '_frozen' : '') + '_cols"></tr></thead>');
                }
                else if (!vscrolling) {
                    html.push('<thead><tr id="{0}' + +'_cols"></tr></thead>');
                }
            }
            if (!isHeader) {
                html.push('<tbody id="{0}');
                if (isFrozen)
                    html.push('_frozen');
                html.push('_rows"></tbody>');
            }
            html.push('</table>');
        }, _columnsWidth = function (cols) {
            var res = 0;
            cols.forEach(function (col) {
                res += parseInt(col.options.width + '', 10);
            });
            return res;
        }, _createGridContainer = function (id, options, authoring, title, locale, columns, frozenColumns) {
            title = title || '';
            options._useColGrp = _canUseColGroups(options, columns);
            options._useStripedCss = !!!(options.rows && options.rows.detail);
            options = $.extend({ right: false, icon: null, type: 'default', width: "auto", height: "auto", size: null, scrolling: { horizontal: false } }, options);
            //create div container 
            if (options.title !== undefined)
                title = options.title;
            var html = [], css = ["bs-field-group bs-island"];
            html.push('<div id="{0}" ');
            html.push(' class="');
            if (authoring)
                css.push("design");
            html.push(css.join(" "));
            html.push('"');
            _addDesign(id, options, authoring, html);
            html.push('>');
            //create header div
            html.push('<div id="{0}_header"></div>');
            css = ["bs-basictable-group"];
            var hscrolling = options.scrolling && options.scrolling.horizontal;
            var vscrolling = options.scrolling && options.scrolling.vertical;
            if (vscrolling || options.allowFrozenColumns)
                css.push('border');
            if (hscrolling && !vscrolling)
                css.push("bs-scroll-x");
            html.push('<div id="{0}_focus" class="');
            html.push(css.join(' '));
            html.push('"');
            if (options.selecting && (options.selecting.cell || options.selecting.row)) {
                html.push(' tabindex="0" ');
            }
            html.push('>');
            if (options.allowFrozenColumns) {
                html.push('<div class="bs-table-cols">');
                var fw = _columnsWidth(frozenColumns);
                html.push('<div class="bs-table-frozen-cols" style="width:' + fw + 'px;">');
                if (vscrolling && !options.headerIsHidden) {
                    // parent of frozen header table
                    html.push('<div id="{0}_table_frozen_header" class="bs-table-header">');
                    // frozen header table 
                    _createTable(html, options, true, true);
                    html.push('</div>'); //bs-table-header
                }
                // parent of frozen table content
                css = ["bs-table-content-scroll frozen"];
                html.push('<div  class="' + css.join(' ') + '">');
                css = ["bs-table-content frozen"];
                html.push('<div id="{0}_frozen_scroll" class="' + css.join(' ') + '"');
                if (vscrolling) {
                    var style = [];
                    if (options.height && options.height !== "auto") {
                        style.push("height: " + parseInt(options.height + '', 10) + 'px');
                    }
                    else {
                        throw "To support scrolling vertical, the grid must have an explicit height.";
                    }
                    if (style.length)
                        html.push(' style="' + style.join(';') + '"');
                }
                html.push('>');
                html.push('<div  class="' + css.join(' ') + '">');
                _createTable(html, options, false, true);
                html.push('</div>');
                html.push('</div>');
                html.push('</div>');
                html.push('</div>'); // bs-table-frozen-cols
                html.push('<div class="bs-table-cols-sep"></div>');
                html.push('<div class="bs-table-free-cols">');
            }
            if (vscrolling && !options.headerIsHidden) {
                html.push('<div id="{0}_table_header" class="bs-table-header" style="padding-right:');
                html.push(_dom.scrollbar());
                html.push('px;">');
                html.push('<div id="{0}_table_header_content" class="bs-table-header-content">');
                _createTable(html, options, true, false);
                html.push('</div></div>');
            }
            //create div table container
            if (vscrolling) {
                html.push('<div  class="bs-table-content-scroll">');
            }
            css = ["bs-table-content"];
            if (vscrolling)
                css.push("vscroll");
            html.push('<div id="{0}_master_scroll" class="' + css.join(' ') + '"');
            if (vscrolling) {
                var style = [];
                if (options.height && options.height !== "auto") {
                    style.push("height: " + parseInt(options.height + '', 10) + 'px');
                }
                else {
                    throw "To support scrolling vertical, the grid must have an explicit height.";
                }
                if (style.length)
                    html.push(' style="' + style.join(';') + '"');
            }
            html.push('>');
            // create table
            _createTable(html, options, false, false);
            html.push('</div>');
            if (vscrolling)
                html.push('</div>'); //bs-table-content-scroll
            if (options.allowFrozenColumns) {
                html.push('</div>'); //bs-table-free-cols
                html.push('</div>'); //bs-table-cols
            }
            html.push('</div>');
            html.push('<center id="{0}_pagination"></center>');
            _ui.Utils.addErrorDiv(html);
            html.push('</div>');
            return _utils.format(html.join(''), id);
        }, _updateInplaceSelect = function (inplace, svalue, value, state, parent, cell, col, opts) {
            var enums = state.filter ? col.schema.filters[state.filter] || [] : col.schema.enum;
            var ii = enums.indexOf(value);
            if (ii < 0) {
                _utils.nextTick(function () {
                    cell.item.setValue(col.$bind, enums[0]);
                });
                inplace.input.selectedIndex = 0;
            }
            else {
                inplace.input.selectedIndex = ii;
            }
        }, _updateInplaceEdit = function (inplace, svalue, value, state, parent, cell, col, opts) {
            if (col.schema.enum) {
                return _updateInplaceSelect(inplace, svalue, value, state, parent, cell, col, opts);
            }
            svalue = svalue || '';
            if (_su.isNumber(col.schema)) {
                inplace.input.value = opts.nativeNumber ? value : svalue;
                return;
            }
            if (_su.isDate(col.schema)) {
                inplace.input.value = opts.nativeDate ? value : svalue;
                return;
            }
            inplace.input.value = svalue;
        }, _createSelectInplaceEdit = function (svalue, value, state, parent, cell, col, opts) {
            var input = document.createElement("select");
            input.type = "text";
            var css = ['bs-inplace-edit bs-edit-border bs-inplace-edit-size'];
            input.className = css.join(' ');
            var enums = state.filter ? col.schema.filters[state.filter] || [] : col.schema.enum;
            var ii = enums.indexOf(value);
            _ui.Utils.fillSelect(enums, input, col.schema);
            _dom.empty(parent);
            _dom.addClass(parent, 'focused');
            _dom.append(parent, input);
            if (ii < 0) {
                _utils.nextTick(function () {
                    cell.item.setValue(col.$bind, enums[0]);
                });
                input.selectedIndex = 0;
            }
            else {
                input.selectedIndex = ii;
            }
            return { input: input, parent: input, td: parent, isInputElement: true, canSelect: false, schema: col.schema };
        }, _createInplaceLookup = function (svalue, value, state, parent, cell, col, opts) {
            var pp = document.createElement("div");
            pp.className = 'bs-inplace-parent bs-edit-border ';
            var cp = pp;
            if (opts.after) {
                cp = document.createElement("div");
                cp.className = 'bs-input-group';
                pp.appendChild(cp);
            }
            var isDatePicker = _su.isDate(col.schema) && _ui.Utils.useDatePicker();
            var input = document.createElement("input");
            input.type = opts.type || 'text';
            var css = ['bs-inplace-edit bs-inplace-edit-size'];
            if (opts.after)
                css.push('bs-input-group-main');
            input.className = css.join(' ');
            _dom.append(cp, input);
            if (opts.after) {
                var addon = document.createElement("span");
                addon.tabIndex = -1;
                addon.className = 'bs-input-group-addon bs-cursor-d add-on';
                var icon = document.createElement("span");
                icon.className = _dom.iconClass(opts.after.icon);
                _dom.append(addon, icon);
                _dom.append(cp, addon);
            }
            _dom.empty(parent);
            _dom.addClass(parent, 'focused');
            _dom.append(parent, pp);
            if (_su.isDate(col.schema)) {
                if (isDatePicker) {
                    _ui.Utils.datePickerInitialize($(pp), { showOnFocus: false }, function (e) { });
                    _ui.Utils.datePickerSetValue($(pp), value);
                }
                else
                    input.value = _ulocale.isoDatePart(value || '');
            }
            return { input: input, parent: pp, td: parent, isInputElement: true, canSelect: true, schema: col.schema };
        }, _updateEvenOdd = function (pr) {
            if (pr.childNodes.length) {
                var isOdd = false;
                for (var i = 0, len = pr.childNodes.length; i < len; i++) {
                    var e = pr.childNodes[i];
                    if (_dom.hasClass(e, "bs-table-row")) {
                        if (isOdd)
                            _dom.removeClass(e, "even");
                        else
                            _dom.addClass(e, "even");
                        isOdd = !isOdd;
                    }
                }
            }
        }, _createInplaceEdit = function (svalue, value, state, parent, cell, col, opts) {
            if (col.schema.enum) {
                return _createSelectInplaceEdit(svalue, value, state, parent, cell, col, opts);
            }
            else if (_su.isBoolean(col.schema)) {
                return { input: null, parent: null, td: parent, isInputElement: false, canSelect: false, schema: col.schema };
            }
            else if (opts.after || opts.before) {
                return _createInplaceLookup(svalue, value, state, parent, cell, col, opts);
            }
            var input = document.createElement("input");
            input.type = opts.type || 'text';
            var css = ['bs-inplace-edit bs-edit-border bs-inplace-edit-size'];
            if (col.options.align) {
                if (col.options.align === 'center')
                    css.push('align-center');
                else if (col.options.align === 'right')
                    css.push('align-end');
            }
            if (input.type === 'text' && col.schema.maxLength) {
                input.maxLength = col.schema.maxLength;
            }
            input.className = css.join(' ');
            _dom.empty(parent);
            _dom.addClass(parent, 'focused');
            _dom.append(parent, input);
            if (_su.isDate(col.schema)) {
                if (opts.nativeDate)
                    input.value = _ulocale.isoDatePart(value || '');
                else
                    input.value = _ulocale.shortDate(value || '');
            }
            else if (_su.isNumber(col.schema)) {
                if (opts.nativeNumber)
                    input.value = value || 0;
                else
                    input.value = svalue;
            }
            else
                input.value = svalue;
            return { input: input, parent: input, td: parent, isInputElement: true, canSelect: true, schema: col.schema };
        };
        var _gridUtil = {
            createCols: _createCols,
            createColGroup: _createColsWidth,
            updSorting: _updSorting,
            gridContainer: _createGridContainer,
            createRows: _createRows,
            createRow: _createRow,
            createGridRows: _createGridRows,
            createInplaceEdit: _createInplaceEdit,
            updateInplaceEdit: _updateInplaceEdit,
            createDetail: _createDetail,
            updateEvenOdd: _updateEvenOdd,
            ensureWidth: _ensureWidth
        };
        ui.GridUtil = _gridUtil;
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../../../../../typings/index.d.ts" />
/// <reference path="../../../core/core.ts" />
/// <reference path="../../../core/locale.ts" />
/// <reference path="./absfield.control.ts" />
/// <reference path="../errors.data.ts" />
/// <reference path="../../pager.control.ts" />
/// <reference path="./basicgrid.ts" />
var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        var _ui = ui, _utils = Phoenix.utils, _dom = Phoenix.dom, _ui = ui, _ulocale = Phoenix.ulocale, _gu = _ui.GridUtil, _eu = Phoenix.Observable.errorsUtils, _link = Phoenix.link, _locale = Phoenix.locale, _sutils = Phoenix.Observable.SchemaUtils;
        var withModifier = function ($event, key) {
            if (key === _dom.keys.VK_TAB && $event.shiftKey)
                return false;
            return $event.altKey || $event.ctrlKey || $event.metaKey || $event.shiftKey;
        }, checkPixels = function (val) {
            val = (val || '') + '';
            val = val.trim();
            var p = parseInt(val, 10);
            if ((p + '') === val || (p + 'px') === val || (p + ' px') === val)
                return true;
            return false;
        };
        ui.glbGridFilter = null;
        var BasicGrid = (function (_super) {
            __extends(BasicGrid, _super);
            function BasicGrid(fp, options, form) {
                _super.call(this, fp, options, form);
                var that = this;
                form.registerListenerFor(that.$bind + ".$item", that);
                that._state();
                that._mapCols = {};
                that._initCols(fp.options || {});
                that._details = [];
            }
            BasicGrid.prototype._inplaceEditValue2Model = function (value, item, col) {
                var that = this;
                var nv = _sutils.text2Value(value, col.schema);
                var ov = item.getValue(col.$bind);
                if (nv !== ov) {
                    item.setValue(col.$bind, nv);
                    return true;
                }
                return false;
            };
            BasicGrid.prototype._inplaceEditAcceptKeys = function (key) {
                var that = this;
                if (that.inplace.schema.enum) {
                    if (key === _dom.keys.VK_UP || key === _dom.keys.VK_DOWN)
                        return false;
                }
                else if (_sutils.isDate(that.inplace.schema) && _ui.Utils.useDatePicker()) {
                    if (key === _dom.keys.VK_UP || key === _dom.keys.VK_DOWN || key === _dom.keys.VK_LEFT || key === _dom.keys.VK_RIGHT)
                        return false;
                }
                return true;
            };
            BasicGrid.prototype._inplaceEditAddEvents = function () {
                var that = this;
                if (that.inplace.schema.enum) {
                    $(that.inplace.input).on('change', function (event) {
                        var td = that.inplace.td;
                        var cell = that._td2value(td);
                        var iv = that._inplaceEditGetValue(cell);
                        if (!that._inplaceEditValue2Model(iv, cell.item, cell.col))
                            that._modifyCell(cell.item, cell.col.$bind, td);
                    });
                }
            };
            BasicGrid.prototype._inplaceEditRemoveEvents = function () {
                var that = this;
                if (that.inplace.schema.enum) {
                    $(that.inplace.input).off('change');
                }
                else if (_sutils.isDate(that.inplace.schema)) {
                    if (_ui.Utils.useDatePicker()) {
                        ui.Utils.datePickerDestroy($(that.inplace.parent));
                    }
                }
            };
            BasicGrid.prototype._inplaceEditGetValue = function (cell) {
                var that = this;
                if (that.inplace.schema.enum) {
                    if (!cell.item)
                        return null;
                    var si = that.inplace.input.selectedIndex;
                    var state = cell.item.getState(cell.col.$bind);
                    return state.filter ? that.inplace.schema.filters[state.filter][si] : that.inplace.schema.enum[si];
                }
                return _ui.Utils.text2value(that.inplace.input.value, that.inplace.schema);
            };
            BasicGrid.prototype._inpaceEditShow = function (td, isFocusIn) {
                var that = this;
                var cell = that._td2value(td);
                var value = cell.item.getValue(cell.col.$bind);
                var state = cell.item.getState(cell.col.$bind);
                var s = _sutils.value2Text(value, cell.col.schema);
                td.tabIndex = -1;
                var opts = { nativeNumber: false, nativeDate: false, type: 'text', after: null };
                if (_sutils.isDate(cell.col.schema)) {
                    opts.nativeDate = _ui.Utils.nativeDate();
                    if (opts.nativeDate) {
                        opts.type = 'date';
                    }
                    else {
                        if (_ui.Utils.useDatePicker())
                            opts.after = { icon: 'calendar' };
                    }
                }
                else if (_sutils.isNumber(cell.col.schema)) {
                    opts.nativeNumber = _ui.Utils.nativeNumber();
                    if (opts.nativeNumber)
                        opts.type = 'number';
                }
                that.inplace = _gu.createInplaceEdit(s, value, state, td, cell, cell.col, opts);
                that._inplaceEditAddEvents();
                if (that.inplace.isInputElement) {
                    that.inplace.input.tabIndex = 0;
                    that.inplace.input.focus();
                    if (that.inplace.canSelect)
                        _dom.select(that.inplace.input);
                }
                else {
                    // focus on td ?
                    td.tabIndex = 0;
                    td.focus();
                }
            };
            BasicGrid.prototype._inplaceEditRemove = function (isFocusOut, isDestroy) {
                var that = this;
                if (that.inplace && !isDestroy) {
                    var td = that.inplace.td;
                    if (isFocusOut) {
                        td.tabIndex = 0;
                    }
                    var cell = that._td2value(td);
                    that._inplaceEditRemoveEvents();
                    if (that.inplace.parent)
                        _dom.remove(that.inplace.parent);
                    _dom.removeClass(td, 'focused');
                    var updValue = that.inplace.input ? true : false;
                    if (updValue) {
                        var s = that._inplaceEditGetValue(cell);
                        that.inplace = null;
                        if (!cell.item)
                            return;
                        if (!that._inplaceEditValue2Model(s + '', cell.item, cell.col))
                            that._modifyCell(cell.item, cell.col.$bind, td);
                    }
                }
                that.inplace = null;
            };
            BasicGrid.prototype._inplaceEditModel2Control = function (item, field, td) {
                var that = this;
                var cell = that._td2value(td);
                var iv = that._inplaceEditGetValue(cell);
                var value = item.getValue(cell.col.$bind);
                var state = item.getState(cell.col.$bind);
                var s = _sutils.value2Text(value, cell.col.schema);
                var opts = { nativeNumber: _ui.Utils.nativeNumber(), nativeDate: _ui.Utils.nativeDate() };
                _gu.updateInplaceEdit(that.inplace, s, value, state, td, cell, cell.col, opts);
            };
            BasicGrid.prototype.removeEvents = function () {
                var that = this;
                if (that.scrollableMaster) {
                    $(that.scrollableMaster).off('scroll');
                }
                if (that.scrollableFrozenContent)
                    $(that.scrollableFrozenContent).off('scroll');
                that.scrollableMaster = null;
                that.scrollableHeaderOfMaster = null;
            };
            BasicGrid.prototype.setEvents = function (opts) {
                var that = this;
                var vscroll = opts.scrolling && opts.scrolling.vertical;
                if (vscroll) {
                    var e = that.$element.get(0);
                    that.scrollableMaster = _dom.find(e, that.id + '_master_scroll');
                    that.scrollableHeaderOfMaster = _dom.find(e, that.id + '_table_header_content');
                    var hasFrozenColumns = opts.allowFrozenColumns && that.frozenColumns && that.frozenColumns.length;
                    that.scrollableFrozenContent = hasFrozenColumns ? _dom.find(e, that.id + '_frozen_scroll') : null;
                    if (that.scrollableMaster && that.scrollableHeaderOfMaster)
                        $(that.scrollableMaster).on('scroll', that.syncHeaderAndFrozenScroll.bind(that));
                    if (that.scrollableFrozenContent)
                        $(that.scrollableFrozenContent).on('scroll', that.syncMasterScroll.bind(that));
                }
            };
            BasicGrid.prototype.destroy = function () {
                var that = this;
                that._destroyDetails();
                if (that.columns) {
                    that.columns.forEach(function (col) {
                        col.schema = null;
                    });
                    that.columns = null;
                }
                if (that.frozenColumns) {
                    that.frozenColumns.forEach(function (col) {
                        col.schema = null;
                    });
                    that.frozenColumns = null;
                }
                that.form.unRegisterListenerFor(that.$bind + ".$item", that);
                that._inplaceEditRemove(false, true);
                if (that._pager) {
                    that._pager.destroy();
                    that._pager = null;
                }
                that._details = null;
                that._mapCols = null;
                _super.prototype.destroy.call(this);
            };
            BasicGrid.prototype._moveToPage = function (page) {
                var that = this;
                that.state.value.currentPage(page);
            };
            BasicGrid.prototype._onselectPage = function (page) {
                var that = this;
                switch (page) {
                    case "next":
                        that._moveToPage(Math.min(that._pager.props.totalPages, that._pager.props.currentPage + 1));
                        break;
                    case "prev":
                        that._moveToPage(Math.max(0, that._pager.props.currentPage - 1));
                        break;
                    case "first":
                        that._moveToPage(1);
                        break;
                    case "last":
                        that._moveToPage(that._pager.props.totalPages);
                        break;
                    default:
                        that._moveToPage(page);
                        break;
                }
            };
            BasicGrid.prototype._onSelectToolElement = function (toolElement) {
                var that = this;
                var toolName = toolElement.name || toolElement.id;
                if (toolElement.name === 'filter' && ui.glbGridFilter) {
                    return ui.glbGridFilter(that.filtrableColumns(), that.state.value, that.form.$locale);
                }
                that.form.execAction(that.$bind + ".$toolbar." + toolName, toolElement);
            };
            BasicGrid.prototype._state = function () {
                _super.prototype._state.call(this);
                var that = this;
                if (that.state.value.isQueryable()) {
                    // create pager
                    var options = $.extend({ size: "default", selectPage: that._onselectPage.bind(that) }, that.renderOptions.pager || {});
                    that._pager = new _ui.Pager(options);
                    var p = that._pager;
                    p.props.totalPages = that.state.value.totalPages();
                    p.props.currentPage = that.state.value.currentPage();
                }
                var toolElements = [];
                if (that.renderOptions.toolbar && that.renderOptions.toolbar.items) {
                    var toolbarOptions = $.extend(true, {}, that.renderOptions.toolbar);
                    toolbarOptions.items.forEach(function (te) {
                        if (te.type === "count")
                            te = $.extend({ "name": "count", "right": true, "value": that.state.value.totalCount() }, te);
                        if (te.type === "filter")
                            te = $.extend({ "name": "filter", "value": that.state.value.filter || "", icon: "filter" }, te);
                        toolElements.push(te);
                    });
                }
                if (toolElements.length) {
                    var options = $.extend({ selectToolElement: that._onSelectToolElement.bind(that) });
                    that._toolBar = new _ui.ToolBar(toolElements, options);
                }
            };
            BasicGrid.prototype._destroyDetails = function () {
                //Destroy all inline "forms" 
                var that = this;
                if (!that._details)
                    return;
                var fm = _ui.formManager();
                that._details.forEach(function (detail) {
                    var f = fm.formByName(detail);
                    if (f)
                        f.destroy();
                });
                that._details = [];
            };
            BasicGrid.prototype._destroyDetailById = function (id) {
                var that = this;
                var ii = that._details.indexOf(id);
                if (ii >= 0)
                    that._details.splice(ii, 1);
                var f = _ui.formManager().formByName(id);
                if (f)
                    f.destroy();
            };
            BasicGrid.prototype._initCols = function (options) {
                var that = this;
                if (!options.columns || !options.columns.length) {
                    options.columns = [{ $bind: '$index' }];
                }
                that.columns = [];
                that.frozenColumns = [];
                options.columns.forEach(function (col) {
                    var c = $.extend({}, col);
                    c.options = c.options || {};
                    if (!c.schema)
                        c.schema = _sutils.getSchema(col.$bind, that.$schema.items);
                    if (!c.schema) {
                        console.log('Field (bind) not found : ' + col.$bind);
                        return;
                    }
                    c.title = _ulocale.tt(c.options.title || c.schema.title, that.form.$locale);
                    ;
                    if (_sutils.isLink(col.$bind)) {
                        c.isLink = true;
                    }
                    if (c.options.frozen && options.allowFrozenColumns) {
                        if (!c.options.width) {
                            console.log('Invalid frozen column "' + c.$bind + '": no explicit width');
                            return;
                        }
                        if (!checkPixels(c.options.width)) {
                            c.options.width = 50;
                        }
                        that.frozenColumns.push(c);
                        that._mapCols[col.$bind] = { column: c, index: that.frozenColumns.length - 1 };
                        return;
                    }
                    that.columns.push(c);
                    that._mapCols[col.$bind] = { column: c, index: that.columns.length - 1 };
                });
            };
            BasicGrid.prototype._colByField = function (field) {
                var ff = this._mapCols[field];
                return ff ? ff.column : null;
            };
            BasicGrid.prototype.changed = function (propName, ov, nv, op, params) {
                var that = this;
                var updOddEven = false, doResize = false;
                switch (op) {
                    case "count":
                        if (propName === params.propName) {
                            var t = that._toolBar;
                            if (t && t.setValue)
                                t.setValue("count", that.state.value.totalCount());
                        }
                        break;
                    case "filter":
                        if (propName === params.propName) {
                            var t = that._toolBar;
                            if (t && t.setValue)
                                t.setValue("filter", that.state.value.filter.title);
                        }
                        break;
                    case "pagination":
                        if (propName === params.propName) {
                            var p = that._pager;
                            if (p) {
                                p.props.totalPages = that.state.value.totalPages();
                                p.props.currentPage = that.state.value.currentPage();
                            }
                        }
                        break;
                    case "sorting":
                        if (propName === params.propName) {
                            that._updateSorting();
                        }
                        break;
                    case "set":
                    case "propchange":
                        if (propName === params.propName) {
                            that._renderRows();
                            doResize = true;
                        }
                        break;
                    case "add":
                        that._createRow(params.$id);
                        doResize = true;
                        updOddEven = true;
                        break;
                    case "remove":
                        that._removeRow(params.$id);
                        updOddEven = true;
                        break;
                    case "upd":
                        if (propName === params.propName) {
                            var item = params && params.$id ? that.state.value.findById(params.$id) : null;
                            if (item) {
                                that._modifyCell(item, params.property);
                            }
                        }
                        break;
                }
                if (updOddEven)
                    that._updOddEven();
                if (doResize)
                    that.resize();
            };
            BasicGrid.prototype._modifyTD = function (item, field, td) {
                var that = this;
                var col = that._colByField(field);
                var state = item.getState(field);
                var co = col.options || {};
                var editable = co.editable && !state.isDisabled && !state.isReadOnly;
                var v = _ui.Utils.displayValue(item.getValue(field), col.schema, that.form.$locale, { html: true, useSymbol: false, editable: editable, selectable: co.selectable, check: co.check, avanced: co, tableOptions: that.config.options });
                _dom.empty(td);
                if (v.html) {
                    var $c = $(v.value);
                    _dom.append(td, $c.get(0));
                }
                else
                    _dom.append(td, document.createTextNode(v.value));
            };
            BasicGrid.prototype._findTR = function (id, col) {
                var that = this, opts = that.renderOptions;
                var cid = id + (col.options.frozen && opts.allowFrozenColumns ? '_frozen' : '');
                return _dom.find(that.$element.get(0), cid);
            };
            BasicGrid.prototype._id2rowId = function (id) {
                var ii = id.indexOf('_frozen');
                if (ii > 0)
                    id = id.substring(0, ii);
                return id;
            };
            BasicGrid.prototype._findtBody = function (col) {
                var that = this, opts = that.renderOptions;
                var cid = that.id + (col.options.frozen && opts.allowFrozenColumns ? '_frozen_rows' : '_rows');
                return _dom.find(that.$element.get(0), cid);
            };
            BasicGrid.prototype._modifyCell = function (item, field, td) {
                var that = this;
                if (!that.$element)
                    return;
                if (td) {
                    if (that.inplace && that.inplace.input && that.inplace.td === td) {
                        that._inplaceEditModel2Control(item, field, td);
                        return;
                    }
                    return that._modifyTD(item, field, td);
                }
                var col = that._colByField(field);
                if (!col)
                    return;
                var tr = that._findTR(item.$id, col);
                if (!tr)
                    return;
                //TODO: optimize
                for (var i = 0, len = tr.childNodes.length; i < len; i++) {
                    var ctd = tr.childNodes[i];
                    var cid = _dom.attr(ctd, 'colid');
                    if (cid === field) {
                        if (that.inplace && that.inplace.input && that.inplace.td === ctd) {
                            that._inplaceEditModel2Control(item, field, ctd);
                            return;
                        }
                        that._modifyTD(item, field, ctd);
                    }
                }
            };
            BasicGrid.prototype._rootElement = function () {
                return this.$element.get(0);
            };
            BasicGrid.prototype._gridParentFocus = function () {
                var that = this;
                return _dom.find(that.$element.get(0), that.id + '_focus');
            };
            BasicGrid.prototype._setErrors = function (grid, element) {
                var that = this;
                var errors = that.state.errors;
                that.showErrors(element, errors);
            };
            BasicGrid.prototype._setTableFocus = function (value) {
                var that = this;
                var table = _dom.find(that.$element.get(0), that.id + '_table');
                if (table) {
                    if (value)
                        _dom.addClass(table, 'focused');
                    else
                        _dom.removeClass(table, 'focused');
                }
                table = _dom.find(that.$element.get(0), that.id + '_table_frozen');
                if (table) {
                    if (value)
                        _dom.addClass(table, 'focused');
                    else
                        _dom.removeClass(table, 'focused');
                }
            };
            BasicGrid.prototype.focusIn = function ($event) {
                var that = this;
                if (that.$element) {
                    that._setTableFocus(true);
                    if (that.selectedCell) {
                        var c = that._cell(that.selectedCell, true);
                        var canEdit = that.canEdit(that.selectedCell);
                        if (canEdit && !that.inplace) {
                            that._inpaceEditShow(c.td, true);
                        }
                    }
                    else {
                        that._inplaceEditRemove(false, false);
                    }
                }
            };
            BasicGrid.prototype.focusOut = function ($event) {
                var that = this;
                if (that.$element) {
                    that._setTableFocus(false);
                    that._inplaceEditRemove(true, false);
                }
            };
            BasicGrid.prototype._doTab = function (forward) {
                var that = this;
                if (forward)
                    return that._moveDownSelectedCell(1);
                else
                    return that._moveUpSelectedCell(1);
            };
            BasicGrid.prototype.keypress = function (event) {
                var that = this;
                if (that.selectedCell) {
                    if (that.inplace && _dom.isChildOf(that.inplace.td, event.target)) {
                        var cell = that._td2value(that.inplace.td);
                        if (_sutils.isNumber(that.inplace.schema)) {
                            if (_ui.Utils.keyPressNumber(event) === false)
                                return false;
                        }
                        else if (_sutils.isBoolean(that.inplace.schema)) {
                            if (String.fromCharCode(event.which) === ' ') {
                                if (that.fieldOptions.editing) {
                                    var state = cell.item.getRelativeState(cell.col.$bind);
                                    if (!state.isDisabled && !state.isReadOnly) {
                                        var ov = cell.item.getValue(cell.col.$bind);
                                        cell.item.setValue(cell.col.$bind, !ov);
                                    }
                                }
                            }
                            event.preventDefault();
                        }
                    }
                }
            };
            BasicGrid.prototype.keydown = function ($event) {
                var that = this, key = $event.which || $event.keyCode;
                var preventDefault = false;
                if (withModifier($event, key))
                    return;
                if (that.inplace && _dom.isChildOf(that.inplace.td, $event.target)) {
                    if (!that._inplaceEditAcceptKeys(key))
                        return;
                }
                if (that.fieldOptions.selecting && that.fieldOptions.selecting.cell) {
                    switch (key) {
                        case _dom.keys.VK_TAB:
                            preventDefault = that._doTab(!$event.shiftKey);
                            break;
                        case _dom.keys.VK_UP:
                            preventDefault = that._moveUpSelectedCell(1);
                            break;
                        case _dom.keys.VK_DOWN:
                            preventDefault = that._moveDownSelectedCell(1);
                            break;
                    }
                }
                preventDefault && $event.preventDefault() && $event.stopPropagation();
            };
            BasicGrid.prototype._tr2rowId = function (tr, col) {
                var id = tr.id;
                if (col && col.options.frozen) {
                    var ii = id.indexOf('_frozen');
                    if (ii > 0) {
                        id = id.substring(0, ii);
                    }
                }
                return id;
            };
            BasicGrid.prototype._td2cell = function (td) {
                var that = this;
                var tr = td.parentNode;
                var pr = tr.parentNode;
                var c = that._colByField(_dom.attr(td, 'colid'));
                if (!c)
                    return null;
                var rid = that._tr2rowId(tr, c);
                var item = that.state.value.findById(rid);
                if (item && c)
                    return { row: rid, col: _dom.attr(td, 'colid') };
                return null;
            };
            BasicGrid.prototype._td2value = function (td) {
                var that = this;
                var tr = td.parentNode;
                var pr = tr.parentNode;
                var c = that._colByField(_dom.attr(td, 'colid'));
                var rid = that._tr2rowId(tr, c);
                var item = that.state.value.findById(rid);
                return { item: item, col: c };
            };
            BasicGrid.prototype.mousedown = function (event) {
                var that = this;
                var td = _dom.parentByTag(that.$element.get(0), event.target, 'td');
                if (td) {
                    var cell = that._td2cell(td);
                    if (cell) {
                        if (that._selectCell(cell, event, true)) {
                            event.preventDefault();
                        }
                    }
                }
                return true;
            };
            BasicGrid.prototype.click = function (event) {
                var that = this;
                var td = _dom.parentByTag(that.$element.get(0), event.target, 'td');
                if (td) {
                    var cell = that._td2cell(td);
                    if (cell) {
                        //that._selectCell(cell, event, false);
                        var item = that.state.value.findById(cell.row);
                        var c = that._colByField(cell.col);
                        if (item) {
                            var linkName = event && event.target && event.target.$link || event.target.parentNode.$link;
                            if (linkName) {
                                var lk = item.getRelativeState(c.$bind);
                                if (lk.isDisabled || lk.isHidden)
                                    return;
                                if (c.schema.$widgetAction) {
                                    if (that[c.schema.$widgetAction])
                                        that[c.schema.$widgetAction](item);
                                }
                                else
                                    that.form.execAction(that.$bind + '.$item.' + linkName, item);
                            }
                            else if (c) {
                                if (c.options.$link) {
                                    var a = _dom.findByAttribute(event.target, td, 'data-phoenix-href');
                                    if (a) {
                                        var state = item.getRelativeState(c.$bind);
                                        if (!state.isDisabled)
                                            _link.execLink(c.options.$link, { $item: item }, null);
                                    }
                                }
                                if (that.fieldOptions.editing && c.options.editable && _sutils.isBoolean(c.schema)) {
                                    if (_dom.attr(event.target, 'data-clickable')) {
                                        var state = item.getRelativeState(c.$bind);
                                        if (!state.isDisabled && !state.isReadOnly) {
                                            var ov = item.getValue(c.$bind);
                                            item.setValue(c.$bind, !ov);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else {
                    var th = _dom.parentByTag(that.$element.get(0), event.target, 'th');
                    if (th) {
                        var cid = _dom.attr(th, 'colid');
                        if (cid) {
                            var col = that._colByField(cid);
                            if (col && _sutils.canSort(col.schema)) {
                                var no = col.$bind;
                                var oldob = that.state.value.$orderby();
                                if (oldob === col.$bind) {
                                    no = col.$bind + " desc";
                                }
                                that.state.value.$orderby(no);
                            }
                        }
                    }
                }
            };
            BasicGrid.prototype._setDisabled = function (button, element) {
                var that = this;
                button.disabled = that.state.isDisabled;
            };
            BasicGrid.prototype._showSelected = function (cell, value, editable, mousedown) {
                var that = this;
                if (!cell)
                    return null;
                var coord = that._cell(cell, false);
                if (coord.td) {
                    if (value) {
                        _dom.addClass(coord.td, "bs-cell-selected");
                        that._inplaceEditRemove(false, false);
                        if (editable && (that.focused || mousedown)) {
                            that._inpaceEditShow(coord.td, false);
                        }
                        else {
                            coord.td.tabIndex = 0;
                            coord.td.focus();
                        }
                    }
                    else {
                        _dom.removeClass(coord.td, "bs-cell-selected");
                        coord.td.tabIndex = -1;
                    }
                }
            };
            BasicGrid.prototype.canSelect = function (cell) {
                var that = this;
                var old = that.selectedCell;
                if (old && old.col === cell.col && old.row === cell.row)
                    return false;
                if (!that.fieldOptions.selecting || !that.fieldOptions.selecting.cell)
                    return false;
                var c = that._colByField(cell.col);
                return c && c.options.selectable;
            };
            BasicGrid.prototype.canEdit = function (cell) {
                var that = this;
                if (!that.fieldOptions.editing || !that.fieldOptions.selecting || !that.fieldOptions.selecting.cell)
                    return false;
                var c = that._colByField(cell.col);
                var editable = c && c.options.editable;
                if (editable) {
                    var item = that.state.value.findById(cell.row);
                    var st = item.getState(c.$bind);
                    return !st.isReadOnly && !st.isDisabled;
                }
                return editable;
            };
            BasicGrid.prototype.clearSelected = function () {
                var that = this;
                var old = that.selectedCell;
                that.selectedCell = null;
                if (old) {
                    that._showSelected(old, false, true, false);
                }
                that._gridParentFocus().tabIndex = 0;
            };
            BasicGrid.prototype._selectCell = function (cell, target, mousedown) {
                var that = this;
                if (!that.canSelect(cell))
                    return false;
                var old = that.selectedCell;
                var canEdit = that.canEdit(cell);
                that._showSelected(cell, true, canEdit, mousedown);
                that.selectedCell = cell;
                if (old) {
                    that._showSelected(old, false, true, mousedown);
                }
                else {
                    that._gridParentFocus().tabIndex = -1;
                }
                return true;
            };
            BasicGrid.prototype._selectFirstCell = function () {
                var that = this;
                var opts = that.renderOptions;
                if (!opts.selecting || !opts.selecting.cell)
                    return false;
                var pr = _dom.find(that.$element.get(0), that.id + '_rows');
                if (!pr.childNodes.length)
                    return false;
                var cell = null;
                var allCols = that.frozenColumns.concat(that.columns);
                for (var i = 0, len = allCols.length; i < len; i++) {
                    var c = allCols[i];
                    if (c.options.selectable) {
                        if (opts.allowFrozenColumns && c.options.frozen)
                            pr = _dom.find(that.$element.get(0), that.id + '_frozen_rows');
                        var tr = pr.firstChild;
                        var rid = that._tr2rowId(tr, c);
                        cell = { col: c.$bind, row: rid };
                        break;
                    }
                }
                if (cell) {
                    return that._selectCell(cell, null, false);
                }
                return false;
            };
            BasicGrid.prototype._cell = function (cell, addIndex) {
                var that = this;
                var col = that._mapCols[cell.col];
                var cIndex = col.index;
                var tr = that._findTR(cell.row, col.column);
                var td = tr.childNodes[cIndex];
                var res = { td: td, tr: tr, rIndex: -1, cIndex: -1 };
                if (addIndex) {
                    res.rIndex = _dom.indexOf(tr.parentNode, tr);
                    res.cIndex = cIndex;
                }
                return res;
            };
            BasicGrid.prototype._moveUpSelectedCell = function (count) {
                var that = this;
                if (!that.selectedCell)
                    return that._selectFirstCell();
                var col = that._colByField(that.selectedCell.col);
                var pos = that._cell(that.selectedCell, true);
                var nri = Math.max(pos.rIndex - count, 0);
                if (nri != pos.rIndex) {
                    var pr = that._findtBody(col);
                    var tr = pr.childNodes[nri];
                    return that._selectCell({ row: that._id2rowId(tr.id), col: that.selectedCell.col }, null, false);
                }
                return false;
            };
            BasicGrid.prototype.resize = function () {
                var that = this;
                that._resize();
            };
            BasicGrid.prototype._updateFrozenColumnsHeight = function () {
                var that = this;
                var opts = that.renderOptions;
                if (that.scrollableFrozenContent) {
                    if (!opts.height || opts.height === "auto")
                        return;
                    var hasHScroll = that.scrollableMaster.scrollWidth > that.scrollableMaster.clientWidth;
                    var ns = void 0;
                    if (hasHScroll)
                        ns = (parseInt(opts.height + '', 10) - _dom.scrollbar()) + 'px';
                    else
                        ns = parseInt(opts.height + '', 10) + 'px';
                    if (that.scrollableFrozenContent.style.height !== ns) {
                        that.scrollableFrozenContent.style.height = ns;
                        that._vscroll();
                    }
                }
            };
            BasicGrid.prototype._resize = function () {
                var that = this;
                var opts = that.renderOptions;
                var vscroll = opts.scrolling && opts.scrolling.vertical;
                if (!vscroll)
                    return;
                var hasFrozenColumns = opts.allowFrozenColumns && that.frozenColumns && that.frozenColumns.length;
                if (!hasFrozenColumns)
                    return;
                var sh = _dom.scrollbar();
                if (!sh)
                    return;
                that._updateFrozenColumnsHeight();
            };
            BasicGrid.prototype.syncHeaderAndFrozenScroll = function (e) {
                var that = this;
                if (!that._scroller || that._scroller === 'master') {
                    that._scroller = 'master';
                    that._hscroll();
                    that._vscroll();
                    that._removeScroller();
                }
            };
            BasicGrid.prototype.syncMasterScroll = function (e) {
                var that = this;
                if (!that._scroller || that._scroller === 'frozen') {
                    that._scroller = 'frozen';
                    that._vsmcroll();
                    that._removeScroller();
                }
            };
            BasicGrid.prototype._removeScroller = function () {
                var that = this;
                if (that._rsTimer)
                    window.clearTimeout(that._rsTimer);
                that._rsTimer = window.setTimeout(function () {
                    that._scroller = null;
                    that._rsTimer = null;
                }, 50);
            };
            BasicGrid.prototype._vscroll = function () {
                var that = this;
                if (that.scrollableFrozenContent) {
                    var contentScrollTop = that.scrollableMaster.scrollTop, fcScrollTop = that.scrollableFrozenContent.scrollTop;
                    if (contentScrollTop !== fcScrollTop) {
                        that.scrollableFrozenContent.scrollTop = contentScrollTop;
                    }
                }
            };
            BasicGrid.prototype._vsmcroll = function () {
                var that = this;
                var contentScrollTop = that.scrollableMaster.scrollTop, fcScrollTop = that.scrollableFrozenContent.scrollTop;
                if (contentScrollTop !== fcScrollTop) {
                    that.scrollableMaster.scrollTop = fcScrollTop;
                }
            };
            BasicGrid.prototype._hscroll = function () {
                var that = this, contentScrollLeft = that.scrollableMaster.scrollLeft, headerScrollLeft = that.scrollableHeaderOfMaster.scrollLeft;
                if (contentScrollLeft !== headerScrollLeft) {
                    that.scrollableHeaderOfMaster.scrollLeft = contentScrollLeft;
                }
            };
            BasicGrid.prototype._moveDownSelectedCell = function (count) {
                var that = this;
                if (!that.selectedCell)
                    return that._selectFirstCell();
                var pos = that._cell(that.selectedCell, true);
                var col = that._colByField(that.selectedCell.col);
                var pr = that._findtBody(col);
                var nri = Math.min(pos.rIndex + count, pr.childNodes.length - 1);
                if (nri != pos.rIndex) {
                    var tr = pr.childNodes[nri];
                    return that._selectCell({ row: that._id2rowId(tr.id), col: that.selectedCell.col }, null, false);
                }
                return false;
            };
            BasicGrid.prototype._moveLeftSelectedCell = function () {
                var that = this;
                if (!that.selectedCell)
                    return that._selectFirstCell();
            };
            BasicGrid.prototype._moveRightSelectedCell = function () {
                var that = this;
                if (!that.selectedCell)
                    return that._selectFirstCell();
            };
            BasicGrid.prototype._state2UI = function () {
                var that = this;
                var grid = that._rootElement();
                var element = that.$element ? that.$element.get(0) : null;
                if (grid) {
                    that._setDisabled(grid, element);
                    that.setHidden(element);
                    that._setErrors(grid, element);
                    that._selectFirstCell();
                    if (that._toolBar) {
                        var $tt = $(_dom.find(element, that.id + '_header'));
                        that._toolBar.render($tt);
                    }
                    if (that._pager) {
                        var $pp = $(_dom.find(element, that.id + '_pagination'));
                        that._pager.render($pp);
                    }
                }
            };
            BasicGrid.prototype.stateChanged = function (propName, params) {
                var that = this;
                var state = that.form.getState(that.$bind);
                var grid = that._rootElement();
                var element = that.$element ? that.$element.get(0) : null;
                if (!propName || (propName === 'isHidden')) {
                    if (state.isHidden !== that.state.isHidden) {
                        that.state.isHidden = state.isHidden;
                        if (grid)
                            that.setHidden(element);
                    }
                }
                if (!propName || (propName === 'isDisabled')) {
                    if (state.isDisabled != that.state.isDisabled) {
                        that.state.isDisabled = state.isDisabled;
                        if (grid)
                            that._setDisabled(grid, element);
                    }
                }
                if (!propName || (propName === 'errors')) {
                    if (_eu.errorChanged(that.state.errors, state.errors)) {
                        that.state.errors = state.errors;
                        that._setErrors(grid, element);
                    }
                }
            };
            BasicGrid.prototype.stopProppagation = function (event) {
                var that = this;
                var target = event.target;
                var e = that.$element.get(0);
                while (target) {
                    if (target == e)
                        return;
                    if (target.href) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    target = target.parentNode;
                }
            };
            BasicGrid.prototype._renderRows = function () {
                var that = this;
                if (that.$element) {
                    var pr = void 0, rows = void 0;
                    that._inplaceEditRemove(false, false);
                    that._destroyDetails();
                    if (that.frozenColumns && that.frozenColumns.length) {
                        pr = _dom.find(that.$element.get(0), that.id + '_frozen_rows');
                        if (pr) {
                            rows = _gu.createRows(that.id, that.state.value, that.frozenColumns, that.renderOptions, that.options.design, that.form.$locale, true);
                            _dom.empty(pr);
                            _dom.append(pr, rows);
                        }
                    }
                    pr = _dom.find(that.$element.get(0), that.id + '_rows');
                    rows = _gu.createRows(that.id, that.state.value, that.columns, that.renderOptions, that.options.design, that.form.$locale, false);
                    _dom.empty(pr);
                    _dom.append(pr, rows);
                }
            };
            BasicGrid.prototype.editDetail = function (item) {
                //not compatible with rozenColumns
                var that = this, id = item.$id;
                if (that.$element) {
                    var options = that.renderOptions;
                    if (options.allowFrozenColumns && that.frozenColumns && options.frozenColumns.length)
                        return;
                    var pr = _dom.find(that.$element.get(0), that.id + '_rows');
                    var tdetail = _dom.find(pr, id + '_detail');
                    if (tdetail)
                        return;
                    var p = _dom.find(pr, id);
                    if (p) {
                        tdetail = _gu.createDetail(id, p);
                        // prepare layout
                        var rowsOpts = that.renderOptions.rows;
                        if (!rowsOpts || !rowsOpts.detail || !rowsOpts.detail.layout) {
                            throw new Error('Grid options missing: "options.rows.detail.layout".');
                        }
                        var layout = rowsOpts.detail.layout;
                        if (typeof layout === 'string' && that.renderOptions.layouts && that.renderOptions.layouts[layout])
                            layout = that.renderOptions.layouts[layout];
                        if (typeof layout === "object") {
                            layout = $.extend(true, {}, layout);
                            if (layout.name)
                                layout._name = layout.name;
                            layout.name = id;
                        }
                        // prepare schema
                        var ss = item.getSchema();
                        if (typeof ss === "object") {
                            ss.links = ss.links || {};
                            ss.links.$updateChanges = ss.links.$updateChanges || { title: _locale.ui.ApplyDetailChanges };
                        }
                        var fo = {};
                        if (rowsOpts.detail.spacing)
                            fo.verticalSpacing = true;
                        fo.closeButtonHandler = function () {
                            that.closeDetail(id);
                        };
                        if (layout._name) {
                            fo.externalLayout = layout._name;
                            fo.externalSchema = that.form.options.externalSchema;
                            fo.externalLocale = that.form.options.externalLocale;
                        }
                        fo.path = that.$bind;
                        that._details.push(id);
                        _ui.OpenForm($(tdetail.firstChild), layout, that.form.$schema, item.model(), that.form.$locale, function (action, model, form) {
                            switch (action.property) {
                                case "$links.$updateChanges":
                                    if (!that.state.value.updateItem(item, model))
                                        return;
                                    item.update(model.model());
                                    that.closeDetail(id);
                            }
                        }, fo);
                        _dom.after(p, tdetail);
                    }
                }
            };
            BasicGrid.prototype.closeDetail = function (id) {
                //not compatible with rozenColumns
                var that = this;
                that._destroyDetailById(id);
                if (that.$element) {
                    var tdetail = _dom.find(that.$element.get(0), id + '_detail');
                    if (tdetail)
                        _dom.remove(tdetail);
                }
            };
            BasicGrid.prototype._removeRow = function (id) {
                var that = this;
                that._destroyDetailById(id);
                if (that.$element) {
                    var toRemoveList = [];
                    var toRemove_1 = _dom.find(that.$element.get(0), id);
                    if (toRemove_1)
                        toRemoveList.push({ element: toRemove_1, columns: that.columns });
                    if (that.renderOptions.frozenColumns.length)
                        toRemove_1 = _dom.find(that.$element.get(0), id + '_frozen');
                    if (toRemove_1)
                        toRemoveList.push({ element: toRemove_1, columns: that.frozenColumns });
                    toRemoveList.forEach(function (re) {
                        var pr = toRemove_1.parentNode;
                        // remove detail
                        var tdetail = _dom.find(pr, id + '_detail');
                        if (tdetail)
                            _dom.remove(tdetail);
                        if (pr.firstChild === toRemove_1 && that.renderOptions.headerIsHidden && !that.renderOptions._useColGrp && pr.childNodes.length > 1) {
                            //no header &&  not useColGrp ==> update cols width on first row
                            var tr = pr.childNodes[1];
                            re.columns.forEach(function (col, index) {
                                var td = tr.childNodes[index];
                                if (col.options.width)
                                    td.style.width = _gu.ensureWidth(col.options.width);
                                if (col.options.minWidth)
                                    td.style.minWidth = _gu.ensureWidth(col.options.minWidth);
                            });
                        }
                        _dom.remove(re.element);
                    });
                }
            };
            BasicGrid.prototype._updOddEven = function () {
                var that = this;
                if (!that.renderOptions._useStripedCss) {
                    if (that.$element) {
                        var pr = _dom.find(that.$element.get(0), that.id + '_rows');
                        _gu.updateEvenOdd(pr);
                        pr = _dom.find(that.$element.get(0), that.id + '_frozen_rows');
                        if (pr)
                            _gu.updateEvenOdd(pr);
                    }
                }
            };
            BasicGrid.prototype._createRow = function (id) {
                var that = this;
                if (that.$element) {
                    var item = that.state.value.findById(id);
                    var index = that.state.value.indexOf(item);
                    var pr = void 0, nr = void 0;
                    if (that.frozenColumns && that.frozenColumns.length) {
                        pr = _dom.find(that.$element.get(0), that.id + '_frozen_rows');
                        nr = _gu.createRow(that.id, index, item, that.frozenColumns, that.renderOptions, that.options.design, that.form.$locale, pr.childNodes.length % 2 === 1, true);
                        _dom.append(pr, nr);
                    }
                    pr = _dom.find(that.$element.get(0), that.id + '_rows');
                    nr = _gu.createRow(that.id, index, item, that.columns, that.renderOptions, that.options.design, that.form.$locale, pr.childNodes.length % 2 === 1, false);
                    _dom.append(pr, nr);
                }
            };
            BasicGrid.prototype.filtrableColumns = function () {
                var that = this;
                var schema = that.$schema;
                if (schema && schema.type === "array" && schema.items && schema.items.type === "object") {
                    return _sutils.filtrableFields(schema.items, that.form.$locale);
                }
                return [];
            };
            BasicGrid.prototype._updateSorting = function () {
                var that = this;
                var opts = that.renderOptions;
                if (opts && opts.sorting && !opts.headerIsHidden) {
                    var pc = _dom.find(that.$element.get(0), that.id + '_cols');
                    if (pc)
                        _gu.updSorting(opts, pc, that._colByField, that.state.value.$orderby());
                    pc = _dom.find(that.$element.get(0), that.id + '_frozen_cols');
                    if (pc)
                        _gu.updSorting(opts, pc, that._colByField, that.state.value.$orderby());
                }
            };
            BasicGrid.prototype.render = function ($parent) {
                var that = this;
                var opts = that._initOptions(_ui.Utils.defaultOptions);
                if (!that.$element) {
                    if (that.$schema.description)
                        opts.description = _ulocale.tt(that.$schema.description, that.form.$locale);
                    that.$element = $(_gu.gridContainer(that.id, opts, that.options.design, that.$schema.title, that.form.$locale, that.columns, that.frozenColumns));
                    if (opts._useColGrp) {
                        // create free columns
                        var vscroll = opts.scrolling && opts.scrolling.vertical;
                        var cg = vscroll && !opts.headerIsHidden ? _dom.find(that.$element.get(0), that.id + '_colgrp_header') : null;
                        if (cg) {
                            _dom.append(cg, _gu.createColGroup(that.columns, opts, false));
                        }
                        cg = _dom.find(that.$element.get(0), that.id + '_colgrp');
                        _dom.append(cg, _gu.createColGroup(that.columns, opts, false));
                        // create frozen columns
                        if (that.frozenColumns && that.frozenColumns.length && opts.allowFrozenColumns) {
                            var cg_1 = vscroll && !opts.headerIsHidden ? _dom.find(that.$element.get(0), that.id + '_colgrp_frozen_header') : null;
                            if (cg_1) {
                                _dom.append(cg_1, _gu.createColGroup(that.frozenColumns, opts, true));
                            }
                            cg_1 = _dom.find(that.$element.get(0), that.id + '_colgrp_frozen');
                            if (cg_1)
                                _dom.append(cg_1, _gu.createColGroup(that.frozenColumns, opts, true));
                        }
                    }
                    if (!opts.headerIsHidden) {
                        var pc = _dom.find(that.$element.get(0), that.id + '_cols');
                        _dom.append(pc, _gu.createCols(that.id, that.columns, opts, that.options.design, that.form.$locale, that.state.value.$orderby(), false));
                        if (that.frozenColumns && that.frozenColumns.length && opts.allowFrozenColumns) {
                            pc = _dom.find(that.$element.get(0), that.id + '_frozen_cols');
                            if (pc)
                                _dom.append(pc, _gu.createCols(that.id, that.frozenColumns, opts, that.options.design, that.form.$locale, that.state.value.$orderby(), true));
                        }
                    }
                    that._renderRows();
                    that._state2UI();
                    that.setEvents(opts);
                }
                that.appendElement($parent, opts);
                return that.$element;
            };
            return BasicGrid;
        }(ui.AbsField));
        ui.BasicGrid = BasicGrid;
        _ui.registerControl(BasicGrid, 'array', false, '', null);
        _ui.registerControl(BasicGrid, 'array', false, 'basicgrid', null);
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../../../../../typings/index.d.ts" />
/// <reference path="../../../core/core.ts" />
/// <reference path="./absfield.control.ts" />
var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        var _ui = ui, _utils = Phoenix.utils, _dom = Phoenix.dom, _ulocale = Phoenix.ulocale;
        function _createCheckBox(id, options, authoring, title) {
            title = title || '';
            options = $.extend({ titleIsHidden: false, placeHolder: false, columns: false }, options);
            var html = [];
            _ui.Utils.fieldWrapper(html, options, authoring, function () {
                if (options.columns) {
                    html.push('<div class="no-x-padding col-sm-offset-' + options.labelCol + ' col-sm-' + (12 - options.labelCol) + '">');
                    html.push('<div class="checkbox">');
                }
                var block = false;
                if (!options.inline && !options.columns) {
                    block = true;
                    html.push('<div class="checkbox">');
                }
                html.push('<label id="{0}_check" class="' + (options.inline ? 'checkbox-inline' : (block ? 'control-label' : 'checkbox')) + '">');
                html.push('<input type="checkbox" id="{0}_input">');
                if (!options.inline)
                    html.push('&nbsp;');
                html.push(_utils.escapeHtml(title || ''));
                html.push('</label>');
                if (!options.inline && !options.columns) {
                    html.push('</div>');
                }
                if (options.columns) {
                    html.push('</div>');
                    html.push('</div>');
                }
            });
            return _utils.format(html.join(''), id);
        }
        ;
        var Check = (function (_super) {
            __extends(Check, _super);
            function Check(fp, options, form) {
                _super.call(this, fp, options, form);
                this._state();
            }
            Check.prototype._input = function () {
                var that = this, e = that.$element.get(0);
                return _dom.find(e, that.id + '_input');
            };
            Check.prototype._check = function () {
                var that = this, e = that.$element.get(0);
                return _dom.find(e, that.id + '_check');
            };
            Check.prototype.click = function (event) {
                var that = this, input = that._input(), value = input.checked || false;
                if (event.target != input)
                    return;
                if (that.state.value != value) {
                    that.state.value = value;
                    that.form.setValue(that.$bind, value);
                }
            };
            Check.prototype._setDisabled = function (input, element) {
                var that = this, check = that._check();
                if (that.state.isDisabled || that.state.isReadOnly)
                    _dom.addClass(check, "disabled");
                else
                    _dom.removeClass(check, "disabled");
                input.disabled = that.state.isDisabled;
            };
            Check.prototype._setReadOnly = function (input, element) {
                this._setDisabled(input, element);
            };
            Check.prototype._setMandatory = function (input, element) { };
            Check.prototype._state2UI = function () {
                var that = this, input = that._input(), element = that.$element ? that.$element.get(0) : null;
                if (input) {
                    input.checked = that.state.value || false;
                    that._setDisabled(input, element);
                    that._setReadOnly(input, element);
                    that.setHidden(element);
                }
            };
            Check.prototype.changed = function (propName, ov, nv, op) {
                var that = this, input = that._input();
                if (that.state.value != nv) {
                    that.state.value = nv;
                    input.checked = that.state.value || false;
                }
            };
            Check.prototype.stateChanged = function (propName, params) {
                var that = this, state = that.form.getState(that.$bind), input = that._input(), element = that.$element ? that.$element.get(0) : null;
                if (state.isHidden !== that.state.isHidden) {
                    that.state.isHidden = state.isHidden;
                    if (input)
                        that.setHidden(element);
                }
                if (state.isDisabled != that.state.isDisabled) {
                    that.state.isDisabled = state.isDisabled;
                    if (input)
                        that._setDisabled(input, element);
                }
                if (state.isReadOnly != that.state.isReadOnly) {
                    that.state.isReadOnly = state.isReadOnly;
                    if (input)
                        that._setReadOnly(input, element);
                }
                if (state.isMandatory != that.state.isMandatory) {
                    that.state.isMandatory = state.isMandatory;
                    if (input)
                        that._setMandatory(input, element);
                }
            };
            Check.prototype.render = function ($parent) {
                var that = this;
                var opts = that._initOptions(_ui.Utils.defaultOptions);
                if (!that.$element) {
                    that.$element = $(_createCheckBox(that.id, opts, that.options.design, _ulocale.tt(that.$schema.title, that.form.$locale)));
                    that._state2UI();
                }
                that.appendElement($parent, opts);
                return that.$element;
            };
            return Check;
        }(ui.AbsField));
        ui.Check = Check;
        _ui.registerControl(Check, "boolean", false, '', null);
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../../../../../typings/index.d.ts" />
/// <reference path="../../../core/core.ts" />
/// <reference path="../../../core/locale.ts" />
/// <reference path="./absfield.control.ts" />
/// <reference path="../errors.data.ts" />
/// <reference path="./basicgrid.ts" />
/// <reference path="../modalform.control.ts" />
var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        var _ui = ui, _utils = Phoenix.utils, _dom = Phoenix.dom, _ui = ui, _ulocale = Phoenix.ulocale, _eu = Phoenix.Observable.errorsUtils, _gu = ui.GridUtil, _sutils = Phoenix.Observable.SchemaUtils;
        var ColumnGrid = (function (_super) {
            __extends(ColumnGrid, _super);
            function ColumnGrid(fp, options, form) {
                _super.call(this, fp, options, form);
                var that = this;
                var opts = that.fieldOptions;
                that._initAllColumns();
                form.registerListenerFor(that.$bind + ".$item", that);
                that._state();
                var fields = opts.columns.header.fields || [];
                opts.columns.header.fields = that.form.afterSettings(that.$bind, "columngrid", { columns: fields }).columns;
                var ctrSettings = that.form.getFieldSettings(that.$bind);
                if (ctrSettings) {
                    that._settings = that.form.afterSettings(that.$bind, "columngrid", ctrSettings);
                }
                that._initRows();
            }
            ColumnGrid.prototype.destroy = function () {
                var that = this;
                that.form.unRegisterListenerFor(that.$bind + ".$item", that);
            };
            ColumnGrid.prototype._initSchemaRows = function (rows) {
                var that = this;
                that.rows = [];
                rows.forEach(function (r, index) {
                    that.rows[index] = { name: r.name, canEdit: r.canEdit, check: r.check, schema: _sutils.getSchema(r.name, that.$schema.items) || {} };
                });
            };
            ColumnGrid.prototype._colByName = function (rn) {
                var that = this;
                for (var i = 0, len = that.rows.length; i < len; i++) {
                    var r = that.rows[i];
                    if (r.name === rn)
                        return r;
                }
                return null;
            };
            ColumnGrid.prototype.setSettings = function (settings) {
                var that = this;
                that._rrender();
            };
            ColumnGrid.prototype._initRows = function () {
                var that = this;
                if (that.rows)
                    return;
                var opts = that.fieldOptions;
                if (!opts.columns)
                    opts.columns = {};
                if (!opts.columns.header)
                    opts.columns.header = {};
                if (!opts.columns.row)
                    opts.columns.row = {};
                var fields = opts.columns.header.fields || [];
                if (that._settings && that._settings.columns && that._settings.columns.length)
                    fields = that._settings.columns;
                that._initSchemaRows(fields);
            };
            // Create columns
            ColumnGrid.prototype._initCols = function (options) {
                var that = this;
                if (!options.columns)
                    options.columns = {};
                if (!options.columns.header)
                    options.columns.header = {};
                if (!options.columns.row)
                    options.columns.row = {};
                var header = $.extend({}, options.columns.header);
                var row = options.columns.row;
                header.options = header.options || {};
                row.options = row.options || {};
                var headerBind = row.$bind, headerSchema;
                if (!row.$bind) {
                    headerBind = "$index";
                    headerSchema = { type: "integer" };
                }
                else {
                    headerSchema = _sutils.getSchema(row.$bind, that.$schema.items);
                }
                var columns = [];
                columns.push(header);
                if (that.state.value) {
                    that.state.value.forEach(function (item) {
                        var title = _ui.Utils.displayValue(item.getRelativeValue(headerBind), headerSchema, that.form.$locale, { html: false }).value;
                        var r = $.extend({}, row);
                        r.title = title || '';
                        r.id = item.$id;
                        columns.push(r);
                    });
                }
                return columns;
            };
            ColumnGrid.prototype._modifyRow = function (value, schema, rowIndex, colIndex, opts) {
                var that = this;
                var pr = _dom.find(that.$element.get(0), that.id + '_rows');
                var tr = pr.childNodes[rowIndex];
                var td = tr.childNodes[colIndex];
                var v = _ui.Utils.displayValue(value, schema, that.form.$locale, { html: true, useSymbol: false, editable: opts.editable, check: opts.check, tableOptions: that.config.options });
                _dom.empty(td);
                if (v.html) {
                    var $c = $(v.value);
                    _dom.append(td, $c.get(0));
                }
                else
                    _dom.append(td, document.createTextNode(v.value));
            };
            ColumnGrid.prototype.changed = function (propName, ov, nv, op, params) {
                var that = this;
                if (op == "upd") {
                    var item_1 = params && params.$id ? that.state.value.findById(params.$id) : null;
                    if (item_1) {
                        that.rows.forEach(function (row, index) {
                            if (row.name === params.property) {
                                that._modifyRow(item_1.getValue(row.name), row.schema, index, that.state.value.indexOf(item_1) + 1, { editable: row.canEdit, check: row.check });
                            }
                        });
                    }
                }
            };
            ColumnGrid.prototype._grid = function () {
                return this.$element.get(0);
            };
            ColumnGrid.prototype._setErrors = function (grid, element) {
                var that = this;
                var errors = that.state.errors;
                that.showErrors(element, errors);
            };
            ColumnGrid.prototype.click = function (event) {
                var that = this;
                var td = _dom.parentByTag(that.$element.get(0), event.target, 'td');
                if (td) {
                    var cn = _dom.attr(td, "colId");
                    if (cn) {
                        var col = that._colByName(cn);
                        if (col && col.canEdit && _sutils.isBoolean(col.schema)) {
                            if (_dom.attr(event.target, 'data-clickable')) {
                                var rid = _dom.attr(td, "rowId");
                                var item = rid ? that.state.value.findById(rid) : null;
                                if (item) {
                                    var ov = item.getValue(col.name);
                                    item.setValue(col.name, !ov);
                                }
                            }
                        }
                    }
                }
            };
            ColumnGrid.prototype._setDisabled = function (button, element) { };
            ColumnGrid.prototype._state2UI = function () {
                var that = this;
                var grid = that._grid();
                var element = that.$element ? that.$element.get(0) : null;
                if (grid) {
                    that._setDisabled(grid, element);
                    that.setHidden(element);
                    that._setErrors(grid, element);
                }
            };
            ColumnGrid.prototype.stateChanged = function (propName, params) {
                var that = this;
                var state = that.form.getState(that.$bind);
                var grid = that._grid();
                var element = that.$element ? that.$element.get(0) : null;
                if (!propName || (propName === 'isHidden')) {
                    if (state.isHidden !== that.state.isHidden) {
                        that.state.isHidden = state.isHidden;
                        if (grid)
                            that.setHidden(element);
                    }
                }
                if (!propName || (propName === 'isDisabled')) {
                    if (state.isDisabled != that.state.isDisabled) {
                        that.state.isDisabled = state.isDisabled;
                        if (grid)
                            that._setDisabled(grid, element);
                    }
                }
                if (!propName || (propName === 'errors')) {
                    if (_eu.errorChanged(that.state.errors, state.errors)) {
                        that.state.errors = state.errors;
                        that._setErrors(grid, element);
                    }
                }
            };
            ColumnGrid.prototype._renderRows = function () {
                var that = this;
                if (that.$element) {
                    var pr = _dom.find(that.$element.get(0), that.id + '_rows');
                    _dom.empty(pr);
                    _dom.append(pr, _gu.createGridRows(that.id, that.rows, that.state.value, that.columns, that.renderOptions, that.options.design, that.form.$locale));
                }
            };
            ColumnGrid.prototype._draw = function (opts) {
                var that = this;
                that.columns = that._initCols(that.fieldOptions);
                if (opts._useColGrp) {
                    var colgrp = _dom.find(that.$element.get(0), that.id + '_colgrp');
                    _dom.empty(colgrp);
                    _dom.append(colgrp, _gu.createColGroup(that.columns, opts, false));
                }
                if (!opts.headerIsHidden) {
                    var pc = _dom.find(that.$element.get(0), that.id + '_cols');
                    _dom.empty(pc);
                    _dom.append(pc, _gu.createCols(that.id, that.columns, opts, that.options.design, that.form.$locale, '', false));
                }
                that._renderRows();
                that._state2UI();
            };
            ColumnGrid.prototype._rrender = function () {
                var that = this;
                if (that.$element) {
                    that._draw(that.renderOptions);
                }
            };
            ColumnGrid.prototype.render = function ($parent) {
                var that = this;
                var opts = that._initOptions(_ui.Utils.defaultOptions);
                if (!that.$element) {
                    that.columns = that._initCols(that.fieldOptions);
                    that.$element = $(_gu.gridContainer(that.id, opts, that.options.design, that.$schema.title, that.form.$locale, that.columns, null));
                    that._draw(opts);
                    that.appendElement($parent, opts);
                    return that.$element;
                }
            };
            ColumnGrid.prototype._createRow = function (index) {
                var that = this;
                if (that.$element) {
                    var pr = _dom.find(that.$element.get(0), that.id + '_rows');
                    var nr = _gu.createRow(that.id, index, that.state.value.get(index), that.columns, that.renderOptions, that.options.design, that.form.$locale, index % 2 === 1, false);
                    if (pr.childNodes.length >= index)
                        _dom.append(pr, nr);
                    else
                        _dom.before(pr.childNodes[index], nr);
                }
            };
            ColumnGrid.prototype._initAllColumns = function () {
                var that = this;
                var opts = that.fieldOptions;
                that._allColumns = [];
                that._allColumnsNames = [];
                if (!opts.columns)
                    opts.columns = {};
                if (!opts.columns.header)
                    opts.columns.header = {};
                var selectedColumns = [];
                var allColumns = opts.columns.header.allFields;
                allColumns.forEach(function (col) {
                    that._allColumns.push($.extend({}, col));
                    that._allColumnsNames.push(col.name);
                });
            };
            ColumnGrid.prototype._selectedColumns = function () {
                var that = this;
                var selectedColumns = [];
                var res = [];
                that.rows.forEach(function (col) {
                    selectedColumns.push(col.name);
                });
                that._allColumns.forEach(function (col) {
                    var schema = _sutils.getSchema(col.name, that.$schema.items);
                    if (selectedColumns.indexOf(col.name) >= 0) {
                        res.push({ name: col.name, title: schema.title });
                    }
                });
                return res;
            };
            ColumnGrid.prototype._initDataSettings = function () {
                var that = this;
                var layout = {
                    $type: "block",
                    $items: [
                        { $type: "block", $items: [] },
                        {
                            $type: "block",
                            $items: [
                                {
                                    $bind: "columns",
                                    $widget: "basicgrid",
                                    options: {
                                        border: true,
                                        align: "middle",
                                        editing: true,
                                        small: true,
                                        headerIsHidden: true,
                                        columns: [
                                            { $bind: "selected", options: { "minWidth": "4em", editable: true, check: true } },
                                            { $bind: "caption", options: { "width": "100%" } }
                                        ]
                                    }
                                }
                            ]
                        },
                        { $type: "block", $items: [] }
                    ]
                };
                var schema = {
                    properties: {
                        columns: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    selected: { type: "boolean" },
                                    name: { type: "string" },
                                    caption: { type: "string" }
                                }
                            }
                        }
                    }
                };
                var data = { "columns": [] };
                var selectedColumns = [];
                that.rows.forEach(function (col) {
                    selectedColumns.push(col.name);
                });
                that._allColumns.forEach(function (col) {
                    var schema = _sutils.getSchema(col.name, that.$schema.items);
                    data.columns.push({ name: col.name, caption: schema.title, selected: selectedColumns.indexOf(col.name) >= 0 });
                });
                return { schema: schema, data: data, layout: layout };
            };
            ColumnGrid.prototype.sendMessage = function (message, params) {
                var that = this;
                switch (message) {
                    case "column-list":
                        that.openColumns(params);
                        break;
                    case "selected-cols":
                        return that._selectedColumns();
                }
            };
            ColumnGrid.prototype.stopProppagation = function (event) {
                var that = this;
                event.preventDefault();
                event.stopPropagation();
            };
            ColumnGrid.prototype.openColumns = function (params) {
                var that = this;
                var opts = that._initDataSettings();
                var fo = { "title": params.title || "Columns ...", "buttons": [{ "type": "success", "title": params.okTitle || "OK", "name": "ok" }] };
                _ui.OpenModalForm(fo, opts.layout, opts.schema, opts.data, {}, function (form, action, model, formControl) {
                    if (action.operation === "modal-action") {
                        switch (action.property) {
                            case "ok":
                                var m = model.model(true);
                                var cd_1 = { columns: [] };
                                m.columns.forEach(function (col) {
                                    if (col.selected) {
                                        var ii = that._allColumnsNames.indexOf(col.name);
                                        if (ii >= 0) {
                                            cd_1.columns.push($.extend({}, that._allColumns[ii]));
                                        }
                                    }
                                });
                                that._settings = cd_1;
                                that.form.setFieldSettings(that.$bind, that._settings);
                                that.form.savePrefs();
                                that._settings = that.form.afterSettings(that.$bind, "columngrid", cd_1);
                                that.rows = null;
                                that._initRows();
                                form.close();
                                that._rrender();
                                break;
                        }
                    }
                });
            };
            return ColumnGrid;
        }(ui.AbsField));
        ui.ColumnGrid = ColumnGrid;
        ;
        _ui.registerControl(ColumnGrid, "array", false, "columngrid", null);
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../../../../../typings/index.d.ts" />
/// <reference path="../../../core/core.ts" />
/// <reference path="../../../core/locale.ts" />
/// <reference path="../../page.control.ts" />
/// <reference path="../schema.data.ts" />
var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        var _ui = ui, _sutils = Phoenix.Observable.SchemaUtils, _utils = Phoenix.utils, _dom = Phoenix.dom, _locale = Phoenix.locale, _ulocale = Phoenix.ulocale, _ui = ui, _device = Phoenix.device, _bootstrap4 = Phoenix.bootstrap4;
        var DropItems = (function () {
            function DropItems($parent, $input, options) {
                this.opened = false;
                var that = this;
                that.page = _ui.Page();
                that.opened = false;
                that.currentList = null;
                that.$parent = $parent;
                that._checkOptions(options);
                that.options = options;
                that.$input = $input;
                that.keys = _sutils.pkFields(that.options.primaryKey);
            }
            DropItems.prototype.click = function (event) {
                var that = this;
                var li = _dom.parentByTag(that.$element.get(0), event.target, 'li');
                if (li) {
                    var pk = li["pk"];
                    if (pk) {
                        var map = that._map();
                        var sel = that._selectByPk(pk, map);
                        if (sel)
                            that._doSelect(sel, true);
                    }
                }
            };
            DropItems.prototype.inMenu = function (target) {
                var that = this;
                if (target && that.$element) {
                    return _dom.isChildOf(that.$element.get(0), target);
                }
                return false;
            };
            DropItems._itemHeight = function () {
                if (!this.itemHeight) {
                    var p = $('<ul class="dropdown-menu bs-block" tabindex="0" style="visibility:hidden;"><li tabindex="-1"><a tabindex="-1" href="#">A</a></li></ul>').get(0);
                    document.body.appendChild(p);
                    var li = p.firstChild;
                    ;
                    this.itemHeight = li.offsetHeight;
                    this.deltaHeight = p.offsetHeight - this.itemHeight;
                    document.body.removeChild(p);
                }
                return this.itemHeight;
            };
            DropItems.prototype._checkOptions = function (options) {
                var that = this;
                if (!options.primaryKey)
                    throw new Error("Invalid options no primaryKey.");
                if (!options.search)
                    throw new Error("Invalid options search field.");
                options.display = options.display || options.search;
                options.maxItems = options.maxItems || 8;
            };
            DropItems.prototype._renderContent = function () {
                var that = this;
                if (!that.$element) {
                    that.$element = $('<ul class="dropdown-menu"></ul>');
                    that.$parent.get(0).appendChild(that.$element.get(0));
                }
            };
            DropItems.prototype._renderElements = function () {
                var that = this;
                if (!that.$element)
                    that._renderContent();
                if (that.currentList) {
                    var frag = document.createDocumentFragment();
                    var e = that.$element.get(0);
                    that.currentList.forEach(function (item) {
                        var dId = _sutils.pk2Id(_sutils.extractPkValue(item, that.keys), that.keys);
                        var li = $('<li tabindex="-1"><a tabindex="-1" href="#">' + _utils.escapeHtml(item[that.options.display]) + '</a></li>').get(0);
                        li["pk"] = dId;
                        _dom.append(frag, li);
                    });
                    _dom.empty(e);
                    _dom.append(e, frag);
                }
            };
            DropItems.prototype._afterHide = function (doFocus) {
                var that = this;
                that.opened = false;
                if (that.page)
                    that.page.setPopup(null);
                if (that.$input)
                    that.$input.get(0).focus();
            };
            DropItems.prototype.hide = function (target) {
                var that = this;
                if (!that.opened)
                    return;
                if (that.$element) {
                    var e = that.$element.get(0);
                    _dom.removeClass(e, "bs-block");
                    that.opened = false;
                    if (that.page)
                        that.page.setPopup(null);
                }
            };
            DropItems.prototype._selectByListIndex = function (map, li) {
                for (var i = 0, len = map.length; i < len; i++) {
                    var m = map[i];
                    if (m.listIndex === li)
                        return m;
                }
                return null;
            };
            DropItems.prototype._emptyHtmlList = function () {
                var that = this;
                if (that.$element) {
                    _dom.empty(that.$element.get(0));
                }
            };
            DropItems.prototype._show = function (selectedIndex) {
                var that = this;
                if (that.$element) {
                    var e = that.$element.get(0);
                    if (e.childNodes.length) {
                        var cs = -1;
                        var map = that._map();
                        var sel = that._findSeleted(map);
                        if (sel)
                            cs = sel.listIndex;
                        var parentWidth = that.$parent.get(0).offsetWidth;
                        e.style.minWidth = parentWidth + 'px';
                        e.style.maxHeight = (that.options.maxItems * DropItems._itemHeight() + DropItems.deltaHeight) + 'px';
                        e.style.overflowY = "auto";
                        _dom.addClass(e, "bs-block");
                        if (cs != selectedIndex) {
                            if (sel) {
                                var c = e.childNodes[sel.index];
                                _dom.removeClass(c, "active");
                                sel.selected = false;
                            }
                            if (selectedIndex >= 0) {
                                sel = that._selectByListIndex(map, selectedIndex);
                                var ns = e.childNodes[sel.index];
                                _dom.addClass(ns, "active");
                                sel.selected = true;
                                if (!that._isInView(ns, e))
                                    ns.scrollIntoView(true);
                            }
                            else {
                                e.scrollTop = 0;
                            }
                        }
                        if (that.page && that.page.popup != that)
                            that.page.setPopup(that);
                        _dom.addClass(e, "bs-block");
                        that.opened = true;
                    }
                    else {
                        _dom.removeClass(e, "bs-block");
                        that._afterHide(true);
                    }
                }
            };
            DropItems.prototype.triggerBlurred = function (event) {
                var that = this;
                that.hide(null);
            };
            DropItems.prototype.show = function (ldata, selectedIndex, ignoreNegativeSSelectedIndex) {
                var that = this;
                if (!ldata || !ldata.value || !ldata.value.length) {
                    that.currentList = null;
                    that.hide(null);
                    that._emptyHtmlList();
                    return;
                }
                else {
                    if (that.currentList == ldata.value) {
                        that._show(selectedIndex);
                    }
                    else {
                        that.currentList = ldata.value;
                        that._renderElements();
                        that._show(selectedIndex);
                    }
                }
            };
            DropItems.prototype._map = function () {
                var that = this, map = [], selectedFound = false;
                var e = that.$element.get(0);
                var li = 0;
                for (var i = 0, len = e.childNodes.length; i < len; i++) {
                    var c = e.childNodes[i];
                    if (c["pk"]) {
                        var sel = selectedFound ? false : _dom.hasClass(c, "active");
                        if (sel)
                            selectedFound = true;
                        map.push({ id: c["pk"], index: i, selected: sel, listIndex: li });
                        li++;
                    }
                }
                return map;
            };
            DropItems.prototype._selectByPk = function (id, map) {
                var that = this, res = null;
                var e = that.$element.get(0);
                map = map || that._map();
                for (var i = 0, len = map.length; i < len; i++) {
                    var m = map[i];
                    if (m.id === id) {
                        res = m;
                        if (m.selected)
                            break;
                        _dom.addClass(e.childNodes[m.index], "active");
                        m.selected = true;
                    }
                    else if (m.selected) {
                        _dom.removeClass(e.childNodes[m.index], "active");
                        m.selected = false;
                        if (res)
                            break;
                    }
                }
                return res;
            };
            DropItems.prototype._findSeleted = function (map) {
                var that = this;
                map = map || that._map();
                for (var i = 0, len = map.length; i < len; i++) {
                    var m = map[i];
                    if (m.selected)
                        return m;
                }
                return null;
            };
            DropItems.prototype._isInView = function (e, parent) {
                var that = this;
                var et = e.offsetTop, eh = e.offsetHeight;
                var st = parent.scrollTop, viewHeight = that.options.maxItems * DropItems._itemHeight();
                return et >= st && (st + viewHeight) >= (et + eh);
            };
            DropItems.prototype.move = function (value) {
                var that = this;
                if (that.$element && that.opened) {
                    var map = that._map(), e = that.$element.get(0);
                    var s = that._findSeleted(map);
                    var forward = value > 0, ii = void 0;
                    if (forward) {
                        if (s) {
                            ii = (value === 1000) ? (map.length - 1) : (map.indexOf(s) + value);
                            if (ii >= map.length) {
                                ii = map.length - 1;
                                if (map[ii].selected)
                                    return;
                            }
                        }
                        else
                            ii = 0;
                        if (ii < map.length) {
                            if (s) {
                                _dom.removeClass(e.childNodes[s.index], "active");
                                s.selected = false;
                            }
                            var ns = e.childNodes[map[ii].index];
                            _dom.addClass(ns, "active");
                            map[ii].selected = true;
                            if (ii == (map.length - 1)) {
                                e.scrollTop = ns.offsetTop + DropItems._itemHeight() + 1;
                            }
                            else {
                                if (!that._isInView(ns, e))
                                    ns.scrollIntoView(false);
                            }
                            that._doSelect(map[ii], false);
                        }
                    }
                    else {
                        if (s) {
                            ii = (value === -1000) ? 0 : (map.indexOf(s) + value);
                            if (ii < 0) {
                                ii = 0;
                                if (map[ii].selected)
                                    return;
                            }
                        }
                        else
                            ii = map.length - 1;
                        if (ii >= 0) {
                            if (s) {
                                _dom.removeClass(e.childNodes[s.index], "active");
                                s.selected = false;
                            }
                            var ns = e.childNodes[map[ii].index];
                            _dom.addClass(ns, "active");
                            map[ii].selected = true;
                            if (ii == 0)
                                e.scrollTop = 0;
                            else {
                                if (!that._isInView(ns, e))
                                    ns.scrollIntoView(true);
                            }
                            that._doSelect(map[ii], false);
                        }
                    }
                }
            };
            DropItems.prototype.select = function () {
                var that = this;
                if (that.$element && that.opened) {
                    var s = that._findSeleted();
                    if (s)
                        that._doSelect(s, true);
                }
            };
            DropItems.prototype._doSelect = function (selected, close) {
                var that = this;
                if (close) {
                    if (that.options.onselect) {
                        that.options.onselect(_sutils.findByPk(_sutils.id2Pk(selected.id, that.keys), that.keys, that.currentList));
                    }
                    that.hide(null);
                }
            };
            DropItems.prototype.inPopup = function (target) {
                var that = this;
                if (that.$element) {
                    var e = that.$element.get(0).parentNode;
                    return _dom.isChildOf(e, target);
                }
                return false;
            };
            DropItems.prototype.destroy = function () {
                var that = this;
                that.options = null;
                that.currentList = null;
                that.$input = null;
                that.$parent = null;
                that.$element = null;
            };
            DropItems.itemHeight = 0;
            DropItems.deltaHeight = 0;
            return DropItems;
        }());
        ui.DropItems = DropItems;
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../../../../../typings/index.d.ts" />
/// <reference path="../../../core/core.ts" />
/// <reference path="../../../core/locale.ts" />
/// <reference path="./absfield.control.ts" />
/// <reference path="../schema.data.ts" />
/// <reference path="../errors.data.ts" />
var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        var _ui = ui, _utils = Phoenix.utils, _dom = Phoenix.dom, _locale = Phoenix.locale, _su = Phoenix.Observable.SchemaUtils, _ulocale = Phoenix.ulocale, _ui = ui, _eu = Phoenix.Observable.errorsUtils, _bootstrap4 = Phoenix.bootstrap4;
        var _createInput = function (html, options, title, tagName) {
            tagName = tagName || 'input';
            var isTextArea = tagName === "textarea";
            if (isTextArea) {
                if (options.before || options.after) {
                    delete options.before;
                    delete options.after;
                }
            }
            if (options.before || options.after) {
                html.push('<div class="input-group"');
                var style = [];
                if (options.$format == "money" || options.$format == "date") {
                    if (options.maxWidth === undefined)
                        options.maxWidth = '16em';
                }
                if (options.minWidth)
                    style.push('min-width: ' + options.minWidth + ';');
                if (options.maxWidth)
                    style.push('max-width: ' + options.maxWidth + ';');
                if (style.length)
                    html.push('  style="' + style.join("") + '"');
                html.push('>');
            }
            if (options.before) {
                html.push('<span class="bs-grp-btn input-group-addon">');
                if (options.before.icon)
                    html.push('<span class="' + _dom.iconClass(options.before.icon) + '"></span>');
                else
                    html.push(options.before.value);
                html.push('</span>');
            }
            var inputCss = ['form-control'];
            if (options.size && _bootstrap4)
                inputCss.push(' form-control-' + options.size);
            if (options.inputClass)
                inputCss.push(options.inputClass);
            html.push('<' + tagName + ' autocomplete="off" type="' + (options.type || 'text') + '" class="' + inputCss.join(' '));
            html.push('" id="{0}_input"');
            if (isTextArea) {
                html.push(' rows="' + options.rows || 3 + '"');
            }
            if (!options.before && !options.after) {
                var style = [];
                if (options.maxWidth)
                    style.push('max-width: ' + options.maxWidth + ';');
                if (options.minWidth)
                    style.push('min-width: ' + options.minWidth + ';');
                if (style.length)
                    html.push('  style="' + style.join("") + '"');
            }
            if (options.maxLength)
                html.push('  maxLength="' + options.maxLength + '"');
            if (options.placeHolder) {
                var phv = options.placeHolder === true ? title : options.placeHolder;
                html.push('  placeholder="' + phv + '"');
            }
            html.push('>');
            if (options.after) {
                html.push('<span tabindex="-1" class="bs-grp-btn input-group-addon');
                if (options.after.icon)
                    html.push(' bs-icon-input');
                html.push('">');
                if (options.after.icon) {
                    html.push('<span class="' + _dom.iconClass(options.after.icon) + '"></span>');
                }
                else
                    html.push(options.after.value);
                html.push('</span>');
            }
            if (options.before || options.after)
                html.push('</div>');
            if (isTextArea) {
                html.push('</' + tagName + '>');
            }
            _ui.Utils.addErrorDiv(html);
        }, _createEditInput = function (id, options, authoring, title, tagName) {
            title = title || '';
            options = $.extend({ titleIsHidden: false, placeHolder: false, columns: false, labelCol: 3 }, options);
            var html = [];
            if (options.titleIsHidden) {
                options.columns = false;
            }
            _ui.Utils.fieldWrapper(html, options, authoring, function () {
                if (!options.titleIsHidden) {
                    html.push('<label for="{0}_input" id="{0}_label"');
                    var css = [];
                    if (options.columns) {
                        if (_bootstrap4) {
                            css.push('form-control-label');
                        }
                        else {
                            css.push('checkbox-inline bs-cursor-d');
                        }
                        css.push('bs-lib-col col-sm-' + options.labelCol);
                    }
                    if (options.inline) {
                        css.push('checkbox-inline bs-cursor-d no-x-padding');
                    }
                    if (css.length)
                        html.push(' class="' + css.join(' ') + '"');
                    html.push('>');
                    html.push(_utils.escapeHtml(title || '') + (options.inline ? '&nbsp;' : ''));
                    if (options.description)
                        _ui.Utils.addTooltip(html, options.description, options);
                    html.push('</label>');
                }
                if (options.columns)
                    html.push('<div class="no-x-padding col-sm-' + (12 - options.labelCol) + '" id="{0}_colparent">');
                _createInput(html, options, title, tagName);
                if (options.columns)
                    html.push('</div>');
                if (options.titleIsHidden && options.description)
                    _ui.Utils.addTooltip(html, options.description, options);
            });
            return _utils.format(html.join(''), id);
        };
        var BaseEdit = (function (_super) {
            __extends(BaseEdit, _super);
            function BaseEdit(fp, options, form) {
                _super.call(this, fp, options, form);
                this._state();
            }
            BaseEdit.prototype._input = function () {
                var that = this, e = that.$element.get(0);
                return _dom.find(e, that.id + '_input');
            };
            BaseEdit.prototype._colParent = function () {
                var that = this, e = that.$element.get(0);
                if (that.renderOptions.columns)
                    return _dom.find(e, that.id + '_colparent');
                else
                    return null;
            };
            BaseEdit.prototype._value2Text = function () {
                var that = this;
                var input = that._input();
                if (that._isDate()) {
                    if (_ui.Utils.useDatePicker())
                        return _ulocale.parseISODate(that.state.value || '') || '';
                    else {
                        if (_ui.Utils.nativeDate()) {
                            return that.state.value || '';
                        }
                        else
                            return _ulocale.shortDate(that.state.value || '');
                    }
                }
                else
                    return that.state.value || '';
            };
            BaseEdit.prototype._isPassword = function () {
                return _su.isPassword(this.$schema);
            };
            BaseEdit.prototype._isDate = function () {
                return _su.isDate(this.$schema);
            };
            BaseEdit.prototype._isMemo = function () {
                return _su.isText(this.$schema);
            };
            BaseEdit.prototype._isNumber = function () {
                return _su.isNumber(this.$schema);
            };
            BaseEdit.prototype._isMoney = function () {
                return _su.isMoney(this.$schema);
            };
            BaseEdit.prototype._setDisabled = function (input, element) {
                input.disabled = this.state.isDisabled;
            };
            BaseEdit.prototype._setReadOnly = function (input, element) {
                input.readOnly = this.state.isReadOnly;
            };
            BaseEdit.prototype._setErrors = function (input, element) {
                var that = this;
                var errors = that.state.errors;
                if (errors && errors.length)
                    _dom.addClass(element, "has-error");
                else
                    _dom.removeClass(element, "has-error");
                that.showErrors(element, errors);
            };
            BaseEdit.prototype._setMandatory = function (input, element) {
                var that = this, v = this.state.isMandatory;
                input.required = v;
                if (v)
                    _dom.addClass(input, "bs-mandatory");
                else
                    _dom.removeClass(input, "bs-mandatory");
                if (that.renderOptions.placeHolder) {
                    input.placeholder = that.renderOptions.title + (v ? ' *' : '');
                }
                if (!that.renderOptions.titleIsHidden) {
                    var label = _dom.find(element, that.id + '_label');
                    if (label) {
                        _dom.text(label, (that.renderOptions.title || '') + (v ? ' *' : '') + (that.renderOptions.inline ? String.fromCharCode(160) : ''));
                    }
                }
            };
            BaseEdit.prototype._state2UI = function () {
                var that = this;
                var input = that._input();
                var element = that.$element ? that.$element.get(0) : null;
                if (input) {
                    that._value2Input(input);
                    that._setDisabled(input, element);
                    that._setReadOnly(input, element);
                    that.setHidden(element);
                    that._setMandatory(input, element);
                    that._setErrors(input, element);
                }
            };
            BaseEdit.prototype._value2Input = function (input) {
                var that = this;
                if (that._isDate()) {
                    if (_ui.Utils.useDatePicker())
                        _ui.Utils.datePickerSetValue(that.$element, that.state.value);
                    else {
                        if (_ui.Utils.nativeDate()) {
                            input.value = _ulocale.isoDatePart(that.state.value || '');
                        }
                        else
                            input.value = _ulocale.shortDate(that.state.value || '');
                    }
                }
                else if (that._isNumber()) {
                    if (_ui.Utils.nativeNumber())
                        input.value = that.state.value || 0;
                    else
                        input.value = that._value2Text();
                }
                else
                    input.value = that._value2Text();
            };
            BaseEdit.prototype.changed = function (propName, ov, nv, op) {
                var that = this;
                if (that.useDisplay && propName === that.$bind)
                    return;
                var input = that._input();
                nv = that.form.getValue(that.$display);
                if (that.state.value != nv) {
                    that.state.value = nv;
                    that._value2Input(input);
                }
                else {
                    var av = input.value;
                    var cv = that._value2Text();
                    if (av != cv)
                        that._value2Input(input);
                }
            };
            BaseEdit.prototype.stateChanged = function (propName, params) {
                var that = this;
                if (that.useDisplay && propName === that.$display)
                    return;
                var state = that.form.getState(that.$bind);
                var input = that._input();
                var element = that.$element ? that.$element.get(0) : null;
                if (!propName || (propName === 'isHidden')) {
                    if (state.isHidden !== that.state.isHidden) {
                        that.state.isHidden = state.isHidden;
                        if (input)
                            that.setHidden(element);
                    }
                }
                if (!propName || (propName === 'isDisabled')) {
                    if (state.isDisabled != that.state.isDisabled) {
                        that.state.isDisabled = state.isDisabled;
                        if (input)
                            that._setDisabled(input, element);
                    }
                }
                if (!propName || (propName === 'isReadOnly')) {
                    if (state.isReadOnly != that.state.isReadOnly) {
                        that.state.isReadOnly = state.isReadOnly;
                        if (input)
                            that._setReadOnly(input, element);
                    }
                }
                if (!propName || (propName === 'isMandatory')) {
                    if (state.isMandatory != that.state.isMandatory) {
                        that.state.isMandatory = state.isMandatory;
                        if (input)
                            that._setMandatory(input, element);
                    }
                }
                if (!propName || (propName === 'errors')) {
                    if (_eu.errorChanged(that.state.errors, state.errors)) {
                        that.state.errors = state.errors;
                        that._setErrors(input, element);
                    }
                }
            };
            BaseEdit.prototype.destroy = function () {
                _super.prototype.destroy.call(this);
            };
            return BaseEdit;
        }(ui.AbsField));
        ui.BaseEdit = BaseEdit;
        var Edit = (function (_super) {
            __extends(Edit, _super);
            function Edit(fp, options, form) {
                _super.call(this, fp, options, form);
            }
            Edit.prototype.beforeAppend = function () { };
            Edit.prototype.mousedown = function (event) {
                var that = this;
                that._doSelect = false;
                if (!that.$element)
                    return;
                if (that.state.isDisabled)
                    return;
                var ae = window.document.activeElement;
                if (ae !== event.target) {
                    var input = that._input();
                    if (input === event.target) {
                        that._doSelect = true;
                    }
                }
                return true;
            };
            Edit.prototype.stopProppagation = function (event) {
                var that = this;
                if (that._doSelect) {
                    var input = that._input();
                    _dom.select(input);
                }
            };
            Edit.prototype.click = function (event) { };
            Edit.prototype.internalRender = function ($parent) {
                var that = this;
                var opts = that._initOptions(_ui.Utils.defaultOptions);
                if (!that.$element) {
                    opts.title = _ulocale.tt(that.$schema.title, that.form.$locale);
                    if (opts.placeHolder && opts.placeHolder != true)
                        opts.title = _ulocale.tt(opts.placeHolder, that.form.$locale);
                    opts.maxLength = that.$schema.maxLength;
                    if (that.$schema.description)
                        opts.description = _ulocale.tt(that.$schema.description, that.form.$locale);
                    that.$element = $(_createEditInput(that.id, opts, that.options.design, opts.title, opts.tagName));
                    that.beforeAppend();
                    that.setEvents(opts);
                    that._state2UI();
                }
                that.appendElement($parent, opts);
            };
            Edit.prototype.render = function ($parent) {
                var that = this;
                that.internalRender($parent);
            };
            Edit.prototype._text2value = function (textValue) {
                var that = this;
                return _ui.Utils.text2value(textValue, that.$schema);
            };
            Edit.prototype._value2Text = function () {
                var that = this;
                if (that._isNumber()) {
                    return _su.value2Text(that.state.value, that.$schema);
                }
                else
                    return _super.prototype._value2Text.call(this);
            };
            Edit.prototype.customOptions = function (options) {
                var that = this;
                if (that._isDate()) {
                    that.customOptionsDate(options);
                }
                else if (that._isNumber()) {
                    if (that._isMoney())
                        that.customOptionsNumber(options, _locale.number.symbol);
                    else
                        that.customOptionsNumber(options, that.$schema.symbol);
                }
                else if (that._isPassword()) {
                    that.customOptionsPassword(options);
                }
                else if (that._isMemo()) {
                    that.customOptionsMemo(options);
                }
            };
            Edit.prototype.customOptionsMemo = function (options) {
                options.tagName = 'textarea';
            };
            Edit.prototype.customOptionsPassword = function (options) {
                options.type = 'password';
            };
            Edit.prototype.customOptionsDate = function (options) {
                var that = this;
                options.$format = 'date';
                if (!_ui.Utils.nativeDate()) {
                    options.after = { icon: 'calendar' };
                    options.date = true;
                }
                else {
                    options.type = 'date';
                }
            };
            Edit.prototype.customOptionsNumber = function (options, symbol) {
                var that = this;
                options.inputClass = "bs-edit-number";
                if (symbol)
                    options.after = { value: symbol };
                options.$format = that.$schema.format;
                if (_ui.Utils.nativeNumber()) {
                    options.type = 'number';
                }
            };
            Edit.prototype._removeEventsDate = function () {
                var that = this;
                if (that._isDate()) {
                    that._setEventsDate();
                }
            };
            Edit.prototype._setEventsDate = function () {
                var that = this;
                if (_ui.Utils.useDatePicker()) {
                    _ui.Utils.datePickerInitialize(that.$element, { showOnFocus: true }, function (e) {
                        that.focusOut(null);
                    });
                }
            };
            Edit.prototype.setEvents = function (opts) {
                var that = this;
                if (that._isDate()) {
                    that._setEventsDate();
                }
            };
            Edit.prototype.removeEvents = function () {
                var that = this;
                if (that._isDate()) {
                    that._removeEventsDate();
                }
            };
            Edit.prototype.checkValue = function (value, after) {
                after(value);
            };
            Edit.prototype.keypress = function (event) {
                var that = this;
                if (that._isNumber()) {
                    if (_ui.Utils.keyPressNumber(event) === false)
                        return false;
                }
                else if (that._isPassword()) {
                    if (_ui.Utils.keyPressPassword(event) === false)
                        return false;
                }
            };
            Edit.prototype.equals = function (nv) {
                var that = this;
                var res = (that.state.value === nv);
                if (!res && that.state.value === undefined) {
                    if (that.$schema.type === "string") {
                        if (nv === '')
                            return true;
                    }
                }
                return res;
            };
            Edit.prototype.focusOut = function (event) {
                var that = this, input = that._input();
                var nv = that._text2value(input.value);
                if (!that.equals(nv)) {
                    that.checkValue(nv, function (cv) {
                        if (that.state.value !== cv) {
                            if (cv === '' && that.$schema.type === "string")
                                cv = undefined;
                            that.state.value = cv;
                            that.form.setValue(that.$display, that.state.value);
                        }
                        else
                            that._value2Input(input);
                    });
                }
                else if (that._isNumber()) {
                    that._value2Input(input);
                }
            };
            Edit.prototype.destroy = function () {
                _super.prototype.destroy.call(this);
            };
            return Edit;
        }(BaseEdit));
        ui.Edit = Edit;
        _ui.registerControl(Edit, "string", false, '', null);
        _ui.registerControl(Edit, "number", false, '', null);
        _ui.registerControl(Edit, "integer", false, '', null);
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../../../../../typings/index.d.ts" />
/// <reference path="../../../core/core.ts" />
/// <reference path="../../../core/locale.ts" />
/// <reference path="./absfield.control.ts" />
/// <reference path="../schema.data.ts" />
/// <reference path="../errors.data.ts" />
var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        var _ui = ui, _utils = Phoenix.utils, _dom = Phoenix.dom, _locale = Phoenix.locale, _su = Phoenix.Observable.SchemaUtils, _ulocale = Phoenix.ulocale, _ui = ui, _eu = Phoenix.Observable.errorsUtils, _bootstrap4 = Phoenix.bootstrap4;
        var _createEnumsInput = function (id, options, authoring, title) {
            title = title || '';
            options = $.extend({ titleIsHidden: false, placeHolder: false, columns: false, labelCol: 3 }, options);
            var html = [];
            if (options.titleIsHidden) {
                options.columns = false;
            }
            options.placeHolder = false;
            _ui.Utils.fieldWrapper(html, options, authoring, function () {
                if (!options.titleIsHidden) {
                    html.push('<label for="{0}_input" id="{0}_label"');
                    var css = [];
                    if (options.columns) {
                        if (_bootstrap4) {
                            css.push('form-control-label');
                        }
                        else {
                            css.push('checkbox-inline bs-cursor-d');
                        }
                        css.push('bs-lib-col col-sm-' + options.labelCol);
                    }
                    if (options.inline) {
                        css.push('no-x-padding checkbox-inline bs-cursor-d');
                    }
                    if (css.length)
                        html.push(' class="' + css.join(' ') + '"');
                    html.push('>');
                    html.push(_utils.escapeHtml(title || '') + (options.inline ? '&nbsp;' : ''));
                    if (options.description)
                        _ui.Utils.addTooltip(html, options.description, options);
                    html.push('</label>');
                }
                if (options.columns)
                    html.push('<div class="no-x-padding col-sm-' + (12 - options.labelCol) + '">');
                html.push('<div class="bs-enum-list-wrap" id="{0}_input">');
                html.push('</div>');
                _ui.Utils.addErrorDiv(html);
                if (options.columns)
                    html.push('</div>');
            });
            return _utils.format(html.join(''), id);
        }, _createEnums = function (values, disabled, enums, enumsNames) {
            enumsNames = enumsNames || enums;
            var f = document.createDocumentFragment();
            var e = $('<div tabindex="0" class="bs-enum-list-row"><div class="bs-enum-list-check"><a><center><span class="' + _dom.iconClass('square-o') + '"></span></center></a></div><div class="bs-enum-list-title"></div></div>').get(0);
            enums.forEach(function (en, index) {
                var ii = e.cloneNode(true);
                if (disabled) {
                    _dom.attr(ii, "tabindex", "-1");
                    _dom.removeClass(ii, "bs-pointer");
                    _dom.addClass(ii, "bs-cursor-disabled");
                }
                else {
                    _dom.attr(ii, "tabindex", "0");
                    _dom.addClass(ii, "bs-pointer");
                    _dom.removeClass(ii, "bs-cursor-disabled");
                }
                var check = ii.firstChild.firstChild.firstChild.firstChild;
                check.className = (values && values.indexOf(en) >= 0) ? _dom.iconClass("check-square-o") : _dom.iconClass("square-o");
                var tparent = ii.lastChild;
                _dom.append(tparent, document.createTextNode(enumsNames[index])),
                    _dom.append(f, ii);
            });
            return f;
        };
        var EnumList = (function (_super) {
            __extends(EnumList, _super);
            function EnumList(fp, options, form) {
                _super.call(this, fp, options, form);
                this._state();
            }
            EnumList.prototype._setDisabled = function (input, element) {
                var that = this;
                for (var i = 0, len = input.childNodes.length; i < len; i++) {
                    var ii = input.childNodes[i];
                    if (that.state.isDisabled) {
                        _dom.attr(ii, "tabindex", "-1");
                        _dom.removeClass(ii, "bs-pointer");
                        _dom.addClass(ii, "bs-cursor-disabled");
                    }
                    else {
                        _dom.attr(ii, "tabindex", "0");
                        _dom.addClass(ii, "bs-pointer");
                        _dom.removeClass(ii, "bs-cursor-disabled");
                    }
                }
            };
            EnumList.prototype._setReadOnly = function (input, element) {
            };
            EnumList.prototype._setErrors = function (input, element) {
                var that = this;
                var errors = that.state.errors;
                that.showErrors(element, errors);
            };
            EnumList.prototype._setMandatory = function (input, element) {
            };
            EnumList.prototype._input = function () {
                var that = this, e = that.$element.get(0);
                return _dom.find(e, that.id + '_input');
            };
            EnumList.prototype._state2UI = function (isCreate) {
                var that = this;
                var input = that._input();
                var element = that.$element ? that.$element.get(0) : null;
                if (input) {
                    if (!isCreate) {
                        that._setDisabled(input, element);
                    }
                    if (!isCreate) {
                        that._setFilter();
                    }
                    that._setReadOnly(input, element);
                    that.setHidden(element);
                    that._setMandatory(input, element);
                    that._setErrors(input, element);
                }
            };
            EnumList.prototype.mousedown = function (event) {
                var that = this;
                if (!that.$element)
                    return;
                if (that.state.isDisabled || that.state.isReadOnly)
                    return;
                var ae = window.document.activeElement;
                var row = _dom.parentByClass(that.$element.get(0), event.target, "bs-enum-list-row");
                if (!row)
                    return;
                if (ae !== row) {
                    row.focus();
                }
                return true;
            };
            EnumList.prototype._getEnumsNames = function () {
                var that = this;
                if (!that.$schema.items.enumNames)
                    return null;
                if (that.state.filter) {
                    var enums = that.$schema.items.filters[that.state.filter];
                    var res_2 = [];
                    enums.forEach(function (en) {
                        res_2.push(that.$schema.items.enumNames[that.$schema.items.enum.indexOf(en)]);
                    });
                    return res_2;
                }
                else
                    return that.$schema.items.enumNames;
            };
            EnumList.prototype._getEnums = function () {
                var that = this;
                return that.state.filter ? that.$schema.items.filters[that.state.filter] : that.$schema.items.enum;
            };
            EnumList.prototype._toggleEnumByIndex = function (index) {
                var that = this;
                var enums = that._getEnums();
                if (index >= 0 && index < enums.length) {
                    var en = enums[index];
                    var ii = that.state.value.indexOf(en);
                    if (ii >= 0) {
                        that.state.value.remove(en);
                    }
                    else {
                        that.state.value.push(en);
                    }
                }
            };
            EnumList.prototype.keypress = function (event) {
                var that = this;
                if (event.which == 32) {
                    var row = _dom.parentByClass(that.$element.get(0), event.target, "bs-enum-list-row");
                    if (!row)
                        return;
                    that._toggleEnumByIndex(_dom.indexOf(row.parentNode, row));
                }
            };
            EnumList.prototype.click = function (event) {
                var that = this;
                if (!that.$element)
                    return;
                if (that.state.isDisabled || that.state.isReadOnly)
                    return;
                var row = _dom.parentByClass(that.$element.get(0), event.target, "bs-enum-list-row");
                if (!row)
                    return;
                that._toggleEnumByIndex(_dom.indexOf(row.parentNode, row));
            };
            EnumList.prototype.changed = function (propName, ov, nv, op, params) {
                var that = this;
                if (!that.$element)
                    return;
                var ii = that._input(), ie = -1;
                var enums = that._getEnums();
                var enumsNames = that._getEnumsNames();
                switch (op) {
                    case "add":
                        ie = enums.indexOf(params.$id);
                        if (ie >= 0) {
                            that._setItemValue(ii.childNodes[ie], true);
                        }
                        break;
                    case "remove":
                        ie = enums.indexOf(params.$id);
                        if (ie >= 0) {
                            that._setItemValue(ii.childNodes[ie], false);
                        }
                        break;
                    case "propchange":
                        _dom.empty(ii);
                        var ff = _createEnums(that.state.value, that.state.isDisabled, enums, enumsNames);
                        _dom.empty(ii);
                        _dom.append(ii, ff);
                        break;
                }
            };
            EnumList.prototype._setFilter = function () {
                var that = this;
                var nf = that.state.filter;
                var enums = that._getEnums();
                var nv = [];
                that.state.value.forEach(function (en) {
                    if (enums.indexOf(en) >= 0)
                        nv.push(en);
                });
                that.form.setValue(that.$bind, nv);
            };
            EnumList.prototype.stateChanged = function (propName, params) {
                var that = this;
                var state = that.form.getState(that.$bind);
                var element = that.$element ? that.$element.get(0) : null;
                var input = element ? that._input() : null;
                if (!propName || (propName === 'isHidden')) {
                    if (state.isHidden !== that.state.isHidden) {
                        that.state.isHidden = state.isHidden;
                        if (element)
                            that.setHidden(element);
                    }
                }
                if (!propName || (propName === 'isDisabled')) {
                    if (state.isDisabled != that.state.isDisabled) {
                        that.state.isDisabled = state.isDisabled;
                        if (element)
                            that._setDisabled(input, element);
                    }
                }
                if (!propName || (propName === 'isReadOnly')) {
                    if (state.isReadOnly != that.state.isReadOnly) {
                        that.state.isReadOnly = state.isReadOnly;
                    }
                }
                if (!propName || (propName === 'filter')) {
                    if (state.filter != that.state.filter) {
                        that.state.filter = state.filter;
                        if (element)
                            that._setFilter();
                    }
                }
                if (!propName || (propName === 'isMandatory')) {
                    if (state.isMandatory != that.state.isMandatory) {
                        that.state.isMandatory = state.isMandatory;
                    }
                }
                if (!propName || (propName === 'errors')) {
                    if (_eu.errorChanged(that.state.errors, state.errors)) {
                        that.state.errors = state.errors;
                        that._setErrors(null, element);
                    }
                }
            };
            EnumList.prototype.render = function ($parent) {
                var that = this;
                var opts = that._initOptions(_ui.Utils.defaultOptions);
                if (!that.$element) {
                    if (that.$schema.description)
                        opts.description = _ulocale.tt(that.$schema.description, that.form.$locale);
                    that.$element = $(_createEnumsInput(that.id, opts, that.options.design, _ulocale.tt(that.$schema.title, that.form.$locale)));
                    var ff = _createEnums(that.state.value, that.state.isDisabled, that._getEnums(), that._getEnumsNames());
                    var ii = that._input();
                    _dom.append(ii, ff);
                    that._state2UI(true);
                }
                that.appendElement($parent, opts);
                return that.$element;
            };
            EnumList.prototype._setItemValue = function (item, value) {
                var check = item.firstChild.firstChild.firstChild.firstChild;
                check.className = value ? _dom.iconClass("check-square-o") : _dom.iconClass("square-o");
            };
            EnumList.prototype.destroy = function () {
                _super.prototype.destroy.call(this);
            };
            return EnumList;
        }(ui.AbsField));
        ui.EnumList = EnumList;
        _ui.registerControl(EnumList, "array", false, 'enums-list', null);
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../../../../../typings/index.d.ts" />
/// <reference path="../../../core/core.ts" />
/// <reference path="./absfield.control.ts" />
var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        var _ui = ui, _utils = Phoenix.utils, _dom = Phoenix.dom, _ulocale = Phoenix.ulocale, _bootstrap4 = Phoenix.bootstrap4;
        var Group = (function (_super) {
            __extends(Group, _super);
            function Group(fp, options, form) {
                _super.call(this, fp, options, form);
                this._state();
            }
            Group.prototype._item = function (ii) {
                var that = this, e = that.$element.get(0);
                return _dom.find(e, that.id + '_item_' + ii);
            };
            Group.prototype.click = function (event) {
                var that = this, target = event.target;
                if (that.state.isReadOnly)
                    return;
                if (target && target.id) {
                    var prefix = that.id + "_item_";
                    if (target.id.indexOf(prefix) === 0) {
                        var index = parseInt(target.id.substring(prefix.length), 10);
                        var value = that.$schema.enum[index];
                        if (value != that.state.value) {
                            that.form.setValue(that.$bind, value);
                        }
                    }
                }
            };
            Group.prototype._setDisabled = function (element) {
                if (!element)
                    return;
                var that = this;
                that._enumItems(function (btn, value) {
                    btn.disabled = (that.state.isDisabled || that.state.isReadOnly);
                });
            };
            Group.prototype._enumItems = function (cb) {
                var that = this;
                that.$schema.enum.forEach(function (val, index) {
                    var item = that._item(index);
                    cb(item, val);
                });
            };
            Group.prototype._setMandatory = function (element) { };
            Group.prototype._state2UI = function (cb) {
                var that = this, element = that.$element ? that.$element.get(0) : null;
                if (!element)
                    return;
                var ii = that.$schema.enum.indexOf(that.state.value);
                if (ii >= 0) {
                    var item = that._item(ii);
                    if (item)
                        cb(item);
                }
                that._setDisabled(element);
                that.setHidden(element);
            };
            Group.prototype._getDefaultItem = function () {
                var that = this, element = that.$element ? that.$element.get(0) : null;
                if (!element)
                    return;
                var ii = that.$schema.enum.indexOf(that.state.value);
                if (ii >= 0) {
                    return that._item(ii);
                }
                else
                    return;
            };
            Group.prototype.stateChanged = function (propName, params) {
                var that = this, state = that.form.getState(that.$bind), element = that.$element ? that.$element.get(0) : null;
                if (state.isHidden !== that.state.isHidden) {
                    that.state.isHidden = state.isHidden;
                    that.setHidden(element);
                }
                if (state.isDisabled != that.state.isDisabled) {
                    that.state.isDisabled = state.isDisabled;
                    that._setDisabled(element);
                }
                if (state.isReadOnly != that.state.isReadOnly) {
                    that.state.isReadOnly = state.isReadOnly;
                    that._setDisabled(element);
                }
                if (state.isMandatory != that.state.isMandatory) {
                    that.state.isMandatory = state.isMandatory;
                    that._setMandatory(element);
                }
            };
            return Group;
        }(ui.AbsField));
        ui.Group = Group;
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../../../../../typings/index.d.ts" />
/// <reference path="../../../core/core.ts" />
/// <reference path="./group.control.ts" />
var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        var _ui = ui, _utils = Phoenix.utils, _dom = Phoenix.dom, _ulocale = Phoenix.ulocale, _bootstrap4 = Phoenix.bootstrap4;
        var _createGroupBtns = function (id, options, authoring, title, enums, enumsNames) {
            title = title || '';
            options = $.extend({ titleIsHidden: false, placeHolder: false, columns: false }, options);
            var html = [];
            _ui.Utils.fieldWrapper(html, options, authoring, function () {
                //add label: 
                if (!options.titleIsHidden) {
                    html.push('<label for="{0}_input" id="{0}_label"');
                    var cssLabel = [];
                    if (options.columns) {
                        if (_bootstrap4) {
                            cssLabel.push('form-control-label');
                        }
                        else {
                            cssLabel.push('checkbox-inline bs-cursor-d');
                        }
                        cssLabel.push('bs-lib-col col-sm-' + options.labelCol);
                    }
                    if (options.inline) {
                        cssLabel.push('checkbox-inline bs-cursor-d no-x-padding');
                    }
                    if (cssLabel.length)
                        html.push(' class="' + cssLabel.join(' ') + '"');
                    html.push('>');
                    html.push(_utils.escapeHtml(title || '') + (options.inline ? '&nbsp;' : ''));
                    html.push('</label>');
                }
                if (options.columns)
                    html.push('<div class="no-x-padding col-sm-' + (12 - options.labelCol) + '">');
                var css = ["btn-group"];
                html.push('<div class="' + css.join(' ') + '">');
                enums.forEach(function (enumName, index) {
                    html.push('<button tabindex="-1" type="button" id="{0}_item_' + index + '" class="btn btn-default"');
                    if (options.width) {
                        html.push(' style="width:' + options.width + '"');
                    }
                    html.push('>');
                    html.push(_utils.escapeHtml(enumsNames[index] || ''));
                    html.push('</button>');
                });
                html.push('</div>');
            });
            if (options.columns)
                html.push('</div>');
            return _utils.format(html.join(''), id);
        };
        var BtnGroup = (function (_super) {
            __extends(BtnGroup, _super);
            function BtnGroup(fp, options, form) {
                _super.call(this, fp, options, form);
                this._state();
            }
            BtnGroup.prototype._state2UI = function () {
                _super.prototype._state2UI.call(this, function (item) {
                    _dom.addClass(item, "btn-primary");
                    _dom.removeClass(item, "btn-default");
                    item.tabIndex = 0;
                });
            };
            BtnGroup.prototype.changed = function (propName, ov, nv, op) {
                var that = this;
                if (that.state.value != nv) {
                    that.state.value = nv;
                    _super.prototype._enumItems.call(this, function (btn, value) {
                        if (that.state.value === value) {
                            btn.tabIndex = 0;
                            if (that.focused)
                                btn.focus();
                            _dom.addClass(btn, "btn-primary");
                            _dom.removeClass(btn, "btn-default");
                        }
                        else {
                            _dom.addClass(btn, "btn-default");
                            _dom.removeClass(btn, "btn-primary");
                            btn.tabIndex = -1;
                        }
                    });
                }
            };
            BtnGroup.prototype.keydown = function ($event) {
                var that = this;
                var preventDefault = false;
                if (that.state.isReadOnly)
                    return;
                if ($event.altKey || $event.ctrlKey || $event.metaKey || $event.shiftKey)
                    return;
                var kc = $event.which || $event.keyCode;
                switch (kc) {
                    case _dom.keys.VK_LEFT:
                        //left
                        var cci = that.$schema.enum.indexOf(that.state.value);
                        if (cci > 0) {
                            var nv = that.$schema.enum[cci - 1];
                            that.form.setValue(that.$bind, nv);
                        }
                        break;
                    case _dom.keys.VK_RIGHT:
                        //right
                        var ci = that.$schema.enum.indexOf(that.state.value);
                        if (ci >= 0 && (ci < that.$schema.enum.length - 1)) {
                            var nv = that.$schema.enum[ci + 1];
                            that.form.setValue(that.$bind, nv);
                        }
                        break;
                    default:
                        break;
                }
                preventDefault && $event.preventDefault() && $event.stopPropagation();
            };
            BtnGroup.prototype.render = function ($parent) {
                var that = this;
                var opts = that._initOptions(_ui.Utils.defaultOptions);
                if (!that.$element) {
                    var enumNames = that.$schema.enumNames || that.$schema.enum;
                    enumNames = enumNames.map(function (v) { return _ulocale.tt(v, that.form.$locale); });
                    that.$element = $(_createGroupBtns(that.id, opts, that.options.design, _ulocale.tt(that.$schema.title, that.form.$locale), that.$schema.enum, enumNames));
                    that._state2UI();
                }
                that.appendElement($parent, opts);
                return that.$element;
            };
            return BtnGroup;
        }(ui.Group));
        ui.BtnGroup = BtnGroup;
        _ui.registerControl(BtnGroup, "*", true, "grpbtn", null);
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../../../../../typings/index.d.ts" />
/// <reference path="../../../core/core.ts" />
/// <reference path="../../../core/locale.ts" />
/// <reference path="./absfield.control.ts" />
var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        var _ui = ui, _utils = Phoenix.utils, _dom = Phoenix.dom, _locale = Phoenix.locale, _ulocale = Phoenix.ulocale, _ui = ui, _device = Phoenix.device, _bootstrap4 = Phoenix.bootstrap4;
        var _createPicture = function (id, options, authoring, title, src, widget) {
            var html = [];
            title = title || '';
            src = src || '';
            _ui.Utils.fieldWrapper(html, options, authoring, function () {
                html.push('<img id="{0}_img" src="" class="img-responsive');
                if (widget == "icon")
                    html.push(' bs-img-icon');
                html.push('" alt="');
                html.push(_utils.escapeHtml(title || ''));
                html.push('"');
            });
            return _utils.format(html.join(''), id);
        };
        var Picture = (function (_super) {
            __extends(Picture, _super);
            function Picture(fp, options, form) {
                _super.call(this, fp, options, form);
                this._state();
            }
            Picture.prototype._state2UI = function () {
                var that = this, img = that._img(), element = that.$element ? that.$element.get(0) : null;
                if (img) {
                    img.src = that.state.value || '';
                    that.setHidden(element);
                }
            };
            Picture.prototype._img = function () {
                var that = this;
                var e = that.$element.get(0);
                var truc = _dom.find(e, that.id + '_img');
                return truc;
            };
            Picture.prototype.render = function ($parent) {
                var that = this;
                var opts = that._initOptions(_ui.Utils.defaultOptions);
                if (!that.$element) {
                    opts.title = _ulocale.tt(that.$schema.title, that.form.$locale);
                    that.$element = $(_createPicture(that.id, opts, that.options.design, opts.title, that.state.value, that.config.$widget));
                    that._state2UI();
                }
                that.appendElement($parent, opts);
                return that.$element;
            };
            return Picture;
        }(ui.AbsField));
        ui.Picture = Picture;
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../../../core/core.ts" />
/// <reference path="../../../core/locale.ts" />
/// <reference path="./pictures.control.ts" />
var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        var _ui = ui;
        var Icon = (function (_super) {
            __extends(Icon, _super);
            function Icon(fp, options, form) {
                _super.call(this, fp, options, form);
            }
            return Icon;
        }(ui.Picture));
        ui.Icon = Icon;
        _ui.registerControl(Icon, "string", false, "icon", null);
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../../../core/core.ts" />
/// <reference path="./pictures.control.ts" />
var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        var _ui = ui;
        var Image = (function (_super) {
            __extends(Image, _super);
            function Image(fp, options, form) {
                _super.call(this, fp, options, form);
            }
            return Image;
        }(ui.Picture));
        ui.Image = Image;
        _ui.registerControl(Image, "string", false, "image", null);
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../../../../../typings/index.d.ts" />
/// <reference path="../../../core/core.ts" />
/// <reference path="./absfield.control.ts" />
var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        var _ui = ui, _utils = Phoenix.utils, _dom = Phoenix.dom, _ulocale = Phoenix.ulocale, _bootstrap4 = Phoenix.bootstrap4;
        function _createLabel(id, options, authoring, title) {
            title = title || '';
            options = $.extend({ columns: false }, options);
            var simulateCols = options.columns;
            options.columns = false;
            if (simulateCols) {
                options.styles = "no-x-padding";
            }
            var html = [];
            var customizer = { formGroup: "form-group" };
            if (simulateCols && !_bootstrap4)
                customizer.formGroup += " form-horizontal";
            _ui.Utils.fieldWrapper(html, options, authoring, function () {
                html.push('<label id="{0}_label"');
                var css = [];
                if (simulateCols) {
                    if (_bootstrap4)
                        css.push('form-control-label');
                    else
                        css.push('checkbox-inline bs-cursor-d');
                    css.push('col-sm-12 bs-lib-col');
                }
                if (options.inline) {
                    css.push('checkbox-inline bs-cursor-d no-x-padding');
                }
                if (css.length)
                    html.push(' class="' + css.join(' ') + '"');
                html.push('>');
                html.push(_utils.escapeHtml(title || '') + (options.inline ? '&nbsp;' : ''));
                if (options.description)
                    _ui.Utils.addTooltip(html, options.description, options);
                html.push('</label>');
            }, customizer);
            return _utils.format(html.join(''), id);
        }
        ;
        var Label = (function (_super) {
            __extends(Label, _super);
            function Label(fp, options, form) {
                _super.call(this, fp, options, form);
                this._state();
            }
            Label.prototype.getCustomBind = function () {
                var that = this;
                if (that.config && that.config.options && that.config.options.$bind)
                    return that.config.options.$bind;
                return _super.prototype.getCustomBind.call(this);
            };
            Label.prototype._setDisabled = function (input, element) {
                var that = this;
                // TODO
            };
            Label.prototype._setReadOnly = function (input, element) {
                /* nothing todo */
            };
            Label.prototype._setMandatory = function (input, element) {
                var that = this, v = this.state.isMandatory;
                var label = that._label();
                if (label) {
                    _dom.text(label, that.renderOptions.title + (v ? ' *' : '') + (that.renderOptions.inline ? String.fromCharCode(160) : ''));
                }
            };
            Label.prototype._label = function () {
                var that = this;
                return that.$element ? _dom.find(that.$element.get(0), that.id + '_label') : null;
            };
            Label.prototype._state2UI = function () {
                var that = this, label = that._label(), element = that.$element ? that.$element.get(0) : null;
                if (label) {
                    that._setDisabled(label, element);
                    that._setReadOnly(label, element);
                    that.setHidden(element);
                    that._setMandatory(label, element);
                }
            };
            Label.prototype.stateChanged = function (propName, params) {
                var that = this, state = that.form.getState(that.$bind), label = that._label(), element = that.$element ? that.$element.get(0) : null;
                if (state.isHidden !== that.state.isHidden) {
                    that.state.isHidden = state.isHidden;
                    if (label)
                        that.setHidden(element);
                }
                if (state.isDisabled != that.state.isDisabled) {
                    that.state.isDisabled = state.isDisabled;
                    if (label)
                        that._setDisabled(label, element);
                }
                if (state.isReadOnly != that.state.isReadOnly) {
                    that.state.isReadOnly = state.isReadOnly;
                    if (label)
                        that._setReadOnly(label, element);
                }
                if (state.isMandatory != that.state.isMandatory) {
                    that.state.isMandatory = state.isMandatory;
                    if (label)
                        that._setMandatory(label, element);
                }
            };
            Label.prototype._title = function () {
                var that = this;
                if (that.$schema && that.$schema.title)
                    return that.$schema.title;
                return (that.config && that.config.options && that.config.options.title) ? that.config.options.title : '';
            };
            Label.prototype.render = function ($parent) {
                var that = this;
                var opts = that._initOptions(_ui.Utils.defaultOptions);
                if (!that.$element) {
                    opts.title = _ulocale.tt(that._title(), that.form.$locale);
                    if (that.$schema.description)
                        opts.description = _ulocale.tt(that.$schema.description, that.form.$locale);
                    that.$element = $(_createLabel(that.id, opts, that.options.design, opts.title));
                    that._state2UI();
                }
                that.appendElement($parent, opts);
                return that.$element;
            };
            return Label;
        }(ui.AbsField));
        ui.Label = Label;
        _ui.registerControl(Label, "meta", false, 'label', null);
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../../../../../typings/index.d.ts" />
/// <reference path="../../../core/core.ts" />
/// <reference path="./absfield.control.ts" />
/// <reference path="../form.control.ts" />
var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        var _utils = Phoenix.utils, _ui = ui, _dom = Phoenix.dom, _ulocale = Phoenix.ulocale;
        function _addDesign(id, options, authoring, html) {
            if (authoring)
                html.push(' draggable="true"');
            html.push(' data-render="{0}"');
        }
        function _createButton(id, options, authoring, title) {
            title = title || '';
            options = $.extend({ right: false, icon: null, type: 'default', size: null }, options);
            if (options.title !== undefined)
                title = options.title;
            var html = [];
            if (!options.inline) {
                html.push('<div class="bs-field-group"');
                _ui.Utils.addContainerId(html, authoring);
                html.push('>');
            }
            html.push('<button type="button"');
            html.push(' class="bs-button btn btn-' + options.type);
            if (options.size)
                html.push(' btn-' + options.size);
            if (!options.inline) {
                html.push(' btn-block');
            }
            else {
                html.push(' bs-btn-inline');
                if (options.right)
                    html.push(' pull-right');
            }
            html.push(' bs-island');
            if (authoring)
                html.push(' design');
            html.push('"');
            if (options.inline) {
                _ui.Utils.addContainerId(html, authoring);
            }
            html.push('>');
            if (options.icon) {
                html.push('<span class="' + _dom.iconClass(options.icon) + '"></span>');
                if (title)
                    html.push('&nbsp;');
            }
            html.push(title || '');
            html.push('</button>');
            if (!options.inline) {
                html.push('</div>');
            }
            return _utils.format(html.join(''), id);
        }
        ;
        var Link = (function (_super) {
            __extends(Link, _super);
            function Link(fp, options, form) {
                _super.call(this, fp, options, form);
                this._state();
            }
            Link.prototype._button = function () {
                var that = this;
                return that.renderOptions.inline ? that.$element.get(0) : that.$element.get(0).firstChild;
            };
            Link.prototype.click = function (event) {
                var that = this;
                that.form.execAction(that.$bind);
            };
            Link.prototype._setDisabled = function (button, element) {
                var that = this;
                button.disabled = that.state.isDisabled;
                if (that.state.isDisabled)
                    _dom.addClass(button, 'disabled');
                else
                    _dom.removeClass(button, 'disabled');
            };
            Link.prototype._state2UI = function () {
                var that = this;
                var button = that._button();
                var element = that.$element ? that.$element.get(0) : null;
                if (button) {
                    that._setDisabled(button, element);
                    that.setHidden(element);
                }
            };
            Link.prototype.stateChanged = function (propName, params) {
                var that = this;
                var state = that.form.getState(that.$bind);
                var button = that._button();
                var element = that.$element ? that.$element.get(0) : null;
                if (state.isHidden !== that.state.isHidden) {
                    that.state.isHidden = state.isHidden;
                    if (button)
                        that.setHidden(element);
                }
                if (state.isDisabled != that.state.isDisabled) {
                    that.state.isDisabled = state.isDisabled;
                    if (button)
                        that._setDisabled(button, element);
                }
            };
            Link.prototype.render = function ($parent) {
                var that = this;
                var opts = that._initOptions(_ui.Utils.defaultOptions);
                if (!that.$element) {
                    that.$element = $(_createButton(that.id, opts, that.options.design, _ulocale.tt(that.$schema ? that.$schema.title : that.$bind, that.form.$locale)));
                    that._state2UI();
                }
                that.appendElement($parent, opts);
                return that.$element;
            };
            return Link;
        }(ui.AbsField));
        ui.Link = Link;
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../../../../../typings/index.d.ts" />
/// <reference path="../../../core/core.ts" />
/// <reference path="../../../core/locale.ts" />
/// <reference path="../../../data/datasets.ts" />
/// <reference path="../schema.data.ts" />
/// <reference path="./absfield.control.ts" />
/// <reference path="./edit.control.ts" />
/// <reference path="./dropitems.control.ts" />
var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        var _ui = ui, _sutils = Phoenix.Observable.SchemaUtils, _data = Phoenix.data, _utils = Phoenix.utils, _dom = Phoenix.dom, _locale = Phoenix.locale, _ulocale = Phoenix.ulocale, _ui = ui, _device = Phoenix.device, _bootstrap4 = Phoenix.bootstrap4;
        var specialKeyCodeMap = {
            27: "esc",
            9: "tab",
            13: "enter",
            33: "pgUp",
            34: "pgDown",
            35: "end",
            36: "home",
            38: "up",
            40: "down",
            115: 'f4'
        };
        var withModifier = function ($event) {
            return $event.altKey || $event.ctrlKey || $event.metaKey || $event.shiftKey;
        }, defOptions = {
            autoComplete: false,
            maxItems: -1
        }, _lookupEnumValue2Text = function (value, $lookup) {
            if (value === "" || value === null || value === undefined) {
                return '';
            }
            if ($lookup && $lookup.data && $lookup.data.$value) {
                var values = $lookup.data.$value;
                for (var i = 0, len = values.length; i < len; i++) {
                    var item = values[i];
                    if (item.code === value)
                        return item.title;
                }
                return value || '';
            }
            return value || '';
        }, _filterData = function (ldata, filter, context) {
            if (ldata.value)
                ldata = ldata.value;
            if (filter) {
                var res_3 = [];
                var f_1 = _data.compileFilterTree(filter, null, context, null);
                ldata.forEach(function (item) {
                    if (_data.acceptFilter(f_1, item))
                        res_3.push(item);
                });
                return res_3;
            }
            return ldata;
        };
        var Lookup = (function (_super) {
            __extends(Lookup, _super);
            function Lookup(fp, options, form) {
                _super.call(this, fp, options, form);
                var that = this;
                that.lookupOptions = defOptions;
                that.eventBus = new Phoenix.utils.SingleEventBus(50);
                that.onselectItemHandler = that._onselectItem.bind(that);
                that.isEnum = (that.$lookup && that.$lookup.data && that.$lookup.data.$type === "enum");
            }
            Lookup.prototype.customOptions = function (options) {
                options.after = { icon: 'chevron-down' };
            };
            Lookup.prototype._value2Text = function () {
                var that = this;
                if (that.isEnum) {
                    return _lookupEnumValue2Text(that.state.value, that.$lookup);
                }
                else
                    return that.state.value || '';
            };
            //TEST
            Lookup.prototype._getSource = function (options) {
                var that = this;
                var pm = that.form.getParentModel(that.$bind);
                //options: {search: '', select: false,  find: false, findFirst: true}
                if (!that.$lookup.data || !that.$lookup.data.$type) {
                    return _utils.dataAsPromise(null);
                }
                if (that.$lookup.data.$type == "inline" || that.$lookup.data.$type == "enum")
                    return _utils.dataAsPromise(_filterData(that.$lookup.data.$value, (that.$lookup.data && that.$lookup.data.$params ? that.$lookup.data.$params.$filter : null), pm.model(true)));
                if (_sutils.allData(that.$lookup)) {
                    if (that.$lookup.cache && that.hasCachedData)
                        return _utils.dataAsPromise(that.cachedData);
                    else
                        return _sutils.executeLookup(that.$lookup, that.form.getParentModel(that.$bind));
                }
                else
                    return _utils.dataAsPromise(null);
            };
            Lookup.prototype._filterResult = function (ldata, opts) {
                var that = this;
                if (ldata && Array.isArray(ldata)) {
                    ldata = { value: ldata };
                }
                else if (ldata && ldata.documents) {
                    ldata.value = ldata.documents;
                    delete ldata.documents;
                }
                if (_sutils.allData(that.$lookup)) {
                    if (that.$lookup.cache && !that.hasCachedData) {
                        that.hasCachedData = true;
                        that.cachedData = ldata;
                    }
                    if (opts.findFirst && !opts.search)
                        return null;
                    if (opts.search && ldata && ldata.value) {
                        if (opts.findFirst) {
                            var fi = _sutils.findFirst(opts.search, that.isEnum ? 'title' : _sutils.remoteSearch(_sutils.lastSegment(that.$bind, that.$display), that.$lookup), ldata.value);
                            if (fi)
                                return { value: [fi.item] };
                            return null;
                        }
                    }
                }
                return ldata;
            };
            Lookup.prototype._findselected = function (ldata, opts) {
                var that = this;
                if (opts.search && opts.select && ldata && ldata.value) {
                    var fi = _sutils.findFirst(opts.search, that.isEnum ? 'title' : _sutils.remoteSearch(_sutils.lastSegment(that.$bind, that.$display), that.$lookup), ldata.value);
                    if (fi)
                        return fi.index;
                }
                return -1;
            };
            Lookup.prototype._findValue = function (search, after) {
                var that = this;
                if (!search && search == '')
                    this.eventBus.push(null, function (ldata) { after(null); }, true);
                var opts = { search: search, select: false, findFirst: true, find: false };
                this.eventBus.push(that._getSource(opts), function (ldata) {
                    ldata = that._filterResult(ldata, opts);
                    if (ldata && ldata.value && ldata.value.length)
                        after(ldata.value[0]);
                    else
                        after(null);
                }, true);
            };
            Lookup.prototype._onselectItem = function (value) {
                var that = this;
                this.eventBus.push(value, function (ldata) {
                    var mapping = Object.keys(that.$lookup.mapping);
                    var base = _sutils.extractBase(that.$bind);
                    mapping.forEach(function (key) {
                        that.form.setValue(base + key, ldata ? ldata[that.$lookup.mapping[key]] || '' : '');
                    });
                    var input = that._input();
                    if (input.value != that._value2Text())
                        that._value2Input(input);
                }, true);
            };
            Lookup.prototype._checkPopupMenu = function () {
                var that = this;
                if (!that.menu) {
                    var input = that._input();
                    var $parent = that.$element;
                    if (that.renderOptions.columns) {
                        $parent = $(that._colParent());
                    }
                    that.menu = new ui.DropItems($parent, input, {
                        primaryKey: that.$lookup.primaryKey,
                        search: that.isEnum ? 'title' : _sutils.remoteSearch(_sutils.lastSegment(that.$bind, that.$display), that.$lookup),
                        onselect: that.onselectItemHandler
                    });
                }
            };
            Lookup.prototype.mousedown = function (event) {
                var that = this;
                if (that.menu && that.menu.opened && that.menu.inMenu(event.target)) {
                    event.stopPropagation();
                    return false;
                }
                return _super.prototype.mousedown.call(this, event);
            };
            Lookup.prototype.stopProppagation = function (event) {
                var that = this;
                _super.prototype.stopProppagation.call(this, event);
                if (that.menu && that.menu.opened && that.menu.inMenu(event.target)) {
                    event.preventDefault();
                    event.stopPropagation();
                }
            };
            Lookup.prototype.click = function (event) {
                var that = this;
                var input = that._input();
                if (_dom.isChildOf(input.parentNode.lastChild, event.target)) {
                    if (_sutils.supportPagination(that.$lookup)) {
                    }
                    else {
                        that._checkPopupMenu();
                        if (that.menu.opened)
                            this.eventBus.push(null, function (ldata) { that.menu.hide(event.target); }, true);
                        else {
                            var opts = { search: input.value, select: true, find: false, findFirst: false };
                            this.eventBus.push(that._getSource(opts), function (ldata) {
                                ldata = that._filterResult(ldata, opts);
                                var si = -1;
                                if (opts.select)
                                    si = that._findselected(ldata, opts);
                                that.menu.show(ldata, si, false);
                            }, true);
                        }
                    }
                }
                else if (that.menu && that.menu.opened && that.menu.inMenu(event.target)) {
                    that.menu.click(event);
                }
            };
            Lookup.prototype.beforeAppend = function () {
                var that = this;
                //_sutils.executeLookup(that.$lookup, null, function(data) {
                //});
            };
            Lookup.prototype._managePreventDefault = function (keyName, $event) {
                var preventDefault;
                switch (keyName) {
                    case "up":
                    case "pgDown":
                    case "pgUp":
                    case "home":
                    case "end":
                        preventDefault = !withModifier($event);
                        break;
                    case "down":
                        if ($event.ctrlKey) {
                            preventDefault = true;
                            keyName = 'f4';
                        }
                        else
                            preventDefault = !withModifier($event);
                        break;
                    default:
                        preventDefault = false;
                }
                preventDefault && $event.preventDefault() && $event.stopPropagation();
                return keyName;
            };
            Lookup.prototype._shouldTrigger = function (keyName, $event) {
                var trigger;
                switch (keyName) {
                    case "tab":
                        trigger = !withModifier($event);
                        break;
                    default:
                        trigger = true;
                }
                return trigger;
            };
            Lookup.prototype.setEvents = function (opts) {
                var that = this;
                $(that._input()).on("input", function () {
                    that.inputChanged();
                });
            };
            Lookup.prototype.removeEvents = function () {
                var that = this;
                $(that._input()).off("input");
            };
            Lookup.prototype.inputChanged = function () {
                var that = this;
                var input = that._input();
                that.modified = (input.value != that._value2Text());
                that.trigger("inputChanged", null);
            };
            Lookup.prototype.checkValue = function (nv, after) {
                var that = this;
                var input = that._input();
                var modified = (input.value != that._value2Text());
                if (modified) {
                    that._findValue(input.value, function (val) {
                        that._onselectItem(val);
                    });
                }
                else
                    after(that.state.value);
            };
            Lookup.prototype.keydown = function ($event) {
                var that = this, keyName = specialKeyCodeMap[$event.which || $event.keyCode];
                keyName = that._managePreventDefault(keyName, $event);
                if (keyName && that._shouldTrigger(keyName, $event)) {
                    that.trigger(keyName + "Keyed", $event);
                }
            };
            Lookup.prototype.focusOut = function (event) {
                var that = this;
                if (that.menu && that.menu.opened)
                    this.eventBus.push(null, function (ldata) { that.menu.hide(null); }, true);
                _super.prototype.focusOut.call(this, event);
                //console.log("focus-out")
            };
            Lookup.prototype.focusIn = function (event) {
                //console.log("focus-in")
                var that = this;
                this.trigger("focused");
            };
            Lookup.prototype.trigger = function (event, $event) {
                var that = this;
                var input = that._input();
                if (that.menu && that.menu.opened) {
                    switch (event) {
                        case "escKeyed":
                            that.eventBus.push(null, function (ldata) { that.menu.hide(null); }, true);
                            break;
                        case "enterKeyed":
                            that.eventBus.push(null, function (ldata) { that.menu.select(); }, true);
                            break;
                        case "upKeyed":
                            that.eventBus.push(null, function (ldata) { that.menu.move(-1); }, true);
                            break;
                        case "downKeyed":
                            that.eventBus.push(null, function (ldata) { that.menu.move(1); }, true);
                            break;
                        case "homeKeyed":
                            that.eventBus.push(null, function (ldata) { that.menu.move(-1000); }, true);
                            break;
                        case "endKeyed":
                            that.eventBus.push(null, function (ldata) { that.menu.move(1000); }, true);
                            break;
                        case "pgDownKeyed":
                            that.eventBus.push(null, function (ldata) { that.menu.move(7); }, true);
                            break;
                        case "pgUpKeyed":
                            that.eventBus.push(null, function (ldata) { that.menu.move(-7); }, true);
                            break;
                        case "inputChanged":
                            var opts = { search: input.value, select: true, find: false, findFirst: false };
                            this.eventBus.push(that._getSource(opts), function (ldata) {
                                if (that.menu && that.menu.opened) {
                                    opts.search = input.value;
                                    ldata = that._filterResult(ldata, opts);
                                    var si = -1;
                                    if (opts.select)
                                        si = that._findselected(ldata, opts);
                                    that.menu.show(ldata, si, true);
                                }
                            }, false);
                            break;
                    }
                }
                else {
                    if (event == 'f4Keyed') {
                        if (_sutils.supportPagination(that.$lookup)) {
                        }
                        else {
                            if (!that.menu || !that.menu.opened) {
                                that._checkPopupMenu();
                                var opts = { search: input.value, select: true, find: false, findFirst: false };
                                that.eventBus.push(that._getSource(opts), function (ldata) {
                                    ldata = that._filterResult(ldata, opts);
                                    var si = -1;
                                    if (opts.select)
                                        si = that._findselected(ldata, opts);
                                    that.menu.show(ldata, si, false);
                                }, true);
                            }
                        }
                    }
                }
            };
            Lookup.prototype.destroy = function () {
                var that = this;
                that.onselectItemHandler = null;
                that.cachedData = null;
                if (that.menu) {
                    that.menu.destroy();
                    that.menu = null;
                }
                _super.prototype.destroy.call(this);
            };
            return Lookup;
        }(ui.Edit));
        ui.Lookup = Lookup;
        _ui.registerControl(Lookup, "string", false, '', { lookup: true });
        _ui.registerControl(Lookup, "number", false, '', { lookup: true });
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../../../../../typings/index.d.ts" />
/// <reference path="../../../core/core.ts" />
/// <reference path="./group.control.ts" />
var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        var _ui = ui, _utils = Phoenix.utils, _dom = Phoenix.dom, _ulocale = Phoenix.ulocale, _bootstrap4 = Phoenix.bootstrap4;
        var _createRadioGroups = function (id, options, authoring, title, enums, enumsNames) {
            title = title || '';
            options = $.extend({ titleIsHidden: false, placeHolder: false, columns: false, horizontal: false }, options);
            var html = [], customizer;
            var customize = null;
            _ui.Utils.fieldWrapper(html, options, authoring, function () {
                if (!options.titleIsHidden) {
                    html.push('<label for="{0}_input" id="{0}_label"');
                    var css = [];
                    if (options.columns) {
                        if (_bootstrap4) {
                            css.push('form-control-label');
                        }
                        else {
                            css.push('checkbox-inline bs-cursor-d');
                        }
                        css.push('bs-lib-col col-sm-' + options.labelCol);
                    }
                    if (options.inline) {
                        css.push('checkbox-inline bs-cursor-d no-x-padding');
                    }
                    if (css.length)
                        html.push(' class="' + css.join(' ') + '"');
                    html.push('>');
                    html.push(_utils.escapeHtml(title || '') + (options.inline ? '&nbsp;' : ''));
                    if (options.description)
                        _ui.Utils.addTooltip(html, options.description, options);
                    html.push('</label>');
                    if (!options.inline && options.horizontal)
                        html.push('<div></div>'); //line
                }
                if (options.columns)
                    html.push('<div class="no-x-padding  col-sm-' + (12 - options.labelCol) + '">');
                var lc = options.inline || options.horizontal ? ["radio-inline"] : [];
                enums.forEach(function (enumName, index) {
                    if (!options.inline && !options.horizontal)
                        html.push('<div id="{0}_radio" class="radio">');
                    html.push('<label');
                    if (lc.length)
                        html.push(' class="' + lc.join(' ') + '"');
                    html.push('>');
                    html.push('<input type="radio" name="{0}_input" id="{0}_item_' + index + '" value="' + enumName + '">');
                    html.push('&nbsp;');
                    html.push(_utils.escapeHtml(enumsNames[index] || ''));
                    html.push('</label>');
                    if (!options.inline && !options.horizontal)
                        html.push('</div>');
                });
                if (options.columns)
                    html.push('</div>');
            }, customize);
            return _utils.format(html.join(''), id);
        };
        var RadioGroup = (function (_super) {
            __extends(RadioGroup, _super);
            function RadioGroup(fp, options, form) {
                _super.call(this, fp, options, form);
                this._state();
            }
            RadioGroup.prototype._state2UI = function () {
                _super.prototype._state2UI.call(this, function (item) {
                    item.checked = true;
                });
            };
            RadioGroup.prototype.changed = function (propName, ov, nv, op) {
                var that = this;
                if (that.state.value != nv) {
                    that.state.value = nv;
                    var ii = that.$schema.enum.indexOf(that.state.value);
                    var input = _super.prototype._item.call(this, ii);
                    if (input)
                        input.checked = true;
                }
            };
            RadioGroup.prototype.render = function ($parent) {
                var that = this;
                var opts = that._initOptions(_ui.Utils.defaultOptions);
                if (!that.$element) {
                    var enumNames = that.$schema.enumNames || that.$schema.enum;
                    enumNames = enumNames.map(function (v) { return _ulocale.tt(v, that.form.$locale); });
                    if (that.$schema.description)
                        opts.description = _ulocale.tt(that.$schema.description, that.form.$locale);
                    that.$element = $(_createRadioGroups(that.id, opts, that.options.design, _ulocale.tt(that.$schema.title, that.form.$locale), that.$schema.enum, enumNames));
                    that.setEvents(opts);
                    that._state2UI();
                }
                that.appendElement($parent, opts);
                return that.$element;
            };
            return RadioGroup;
        }(ui.Group));
        ui.RadioGroup = RadioGroup;
        _ui.registerControl(RadioGroup, "*", true, "radio", null);
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../../../../../typings/index.d.ts" />
/// <reference path="../../../core/core.ts" />
/// <reference path="./absfield.control.ts" />
var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        var _ui = ui, _utils = Phoenix.utils, _dom = Phoenix.dom, _ulocale = Phoenix.ulocale;
        function _createReadOnly(id, options, authoring, title, valuepattern) {
            title = title || '';
            options = $.extend({ titleIsHidden: false }, options);
            var html = [];
            _ui.Utils.fieldWrapper(html, options, authoring, function () {
                html.push('<div style="background-color: red;">' + title + '</div>');
            });
            return _utils.format(html.join(''), id);
        }
        ;
        var ReadOnlyField = (function (_super) {
            __extends(ReadOnlyField, _super);
            function ReadOnlyField(fp, options, form) {
                _super.call(this, fp, options, form);
                var that = this;
                that._map = [];
                if (fp.options && fp.options.$expression) {
                    that.$expression = fp.options.$expression;
                    _utils.extractAngularVars(that.$expression, that._map);
                }
                else {
                    that.$expression = _utils.format('{0}: {{{1}}}', _utils.escapeHtml(_ulocale.tt(that.$schema.title, that.form.$locale)), that.$bind);
                    that._map.push({ name: that.$bind });
                }
                that._map.forEach(function (map) {
                    if (map.name != that.$bind) {
                        map.schema = form.getSchema(map.name);
                        that.form.registerListenerFor(map.name, that);
                    }
                    else
                        map.schema = that.$schema;
                });
                this._state();
            }
            ReadOnlyField.prototype._state = function () {
                var that = this;
                that.state = that.state || {};
                that.state.values = that.state.values || {};
                that.state.fvalues = that.state.fvalues || {};
                var state = that.form.getState(that.$bind);
                that.state.isHidden = state.isHidden;
                that._map.forEach(function (map) {
                    that.state.values[map.name] = that.form.getValue(map.name);
                    that.state.fvalues[map.name] = _ui.Utils.displayValue(that.state.values[map.name], map.schema, that.form.$locale, { html: false, useSymbol: true }).value;
                });
            };
            ReadOnlyField.prototype._value2UI = function () {
                var that = this, element = that.$element ? that.$element.get(0) : null;
                var nv = _utils.execAngularExpression(that.$expression, that.state.fvalues);
                var r = $('<div>' + nv + '</div>').get(0);
                _dom.empty(element);
                while (r.childNodes.length > 0) {
                    element.appendChild(r.childNodes[0]);
                }
            };
            ReadOnlyField.prototype._findMap = function (pn) {
                var that = this;
                for (var i = 0, len = that._map.length; i < len; i++) {
                    var cm = that._map[i];
                    if (cm.name == pn)
                        return cm;
                }
                return null;
            };
            ReadOnlyField.prototype.changed = function (propName, ov, nv, op) {
                var that = this;
                if (propName) {
                    if (that.state.values[propName] != nv) {
                        var map = that._findMap(propName);
                        ;
                        if (map) {
                            that.state.values[propName] = nv;
                            that.state.fvalues[propName] = _ui.Utils.displayValue(that.state.values[propName], map.schema, that.form.$locale, { html: false, useSymbol: true }).value;
                            that._value2UI();
                        }
                    }
                }
            };
            ReadOnlyField.prototype.stateChanged = function (propName, params) {
                if (!propName || (propName === 'isHidden')) {
                    var that = this, state = that.form.getState(that.$bind), element = that.$element ? that.$element.get(0) : null;
                    if (state.isHidden !== that.state.isHidden) {
                        that.state.isHidden = state.isHidden;
                        if (element)
                            that.setHidden(element);
                    }
                }
            };
            ReadOnlyField.prototype._state2UI = function () {
                var that = this, element = that.$element ? that.$element.get(0) : null;
                if (element) {
                    that.setHidden(element);
                    that._value2UI();
                }
            };
            ReadOnlyField.prototype.render = function ($parent) {
                var that = this;
                var opts = that._initOptions(_ui.Utils.defaultOptions);
                if (!that.$element) {
                    that.$element = $(_createReadOnly(that.id, opts, that.options.design, _ulocale.tt(that.$schema.title, that.form.$locale), ''));
                    that._state2UI();
                }
                that.appendElement($parent, opts);
                return that.$element;
            };
            ReadOnlyField.prototype.destroy = function () {
                var that = this;
                that._map.forEach(function (map) {
                    if (map.name != that.$bind) {
                        that.form.unRegisterListenerFor(map.name, that);
                    }
                });
                _super.prototype.destroy.call(this);
            };
            return ReadOnlyField;
        }(ui.AbsField));
        ui.ReadOnlyField = ReadOnlyField;
        _ui.registerControl(ReadOnlyField, "*", false, '', { readOnly: true });
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../../../../../typings/index.d.ts" />
/// <reference path="../../../core/core.ts" />
/// <reference path="../../../core/locale.ts" />
/// <reference path="./absfield.control.ts" />
/// <reference path="../schema.data.ts" />
/// <reference path="../errors.data.ts" />
/// <reference path="./edit.control.ts" />
var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        var _ui = ui, _utils = Phoenix.utils, _dom = Phoenix.dom, _locale = Phoenix.locale, _su = Phoenix.Observable.SchemaUtils, _ulocale = Phoenix.ulocale, _ui = ui, _bootstrap4 = Phoenix.bootstrap4;
        var _createSelectInput = function (id, options, authoring, title, enums, enumsNames) {
            title = title || '';
            options = $.extend({ titleIsHidden: false, placeHolder: false, columns: false, labelCol: 3 }, options);
            var html = [];
            if (options.titleIsHidden) {
                options.columns = false;
            }
            options.placeHolder = false;
            _ui.Utils.fieldWrapper(html, options, authoring, function () {
                if (!options.titleIsHidden) {
                    html.push('<label for="{0}_input" id="{0}_label"');
                    var css = [];
                    if (options.columns) {
                        if (_bootstrap4) {
                            css.push('form-control-label');
                        }
                        else {
                            css.push('checkbox-inline bs-cursor-d');
                        }
                        css.push('bs-lib-col col-sm-' + options.labelCol);
                    }
                    if (options.inline) {
                        css.push('no-x-padding checkbox-inline bs-cursor-d');
                    }
                    if (css.length)
                        html.push(' class="' + css.join(' ') + '"');
                    html.push('>');
                    html.push(_utils.escapeHtml(title || '') + (options.inline ? '&nbsp;' : ''));
                    if (options.description)
                        _ui.Utils.addTooltip(html, options.description, options);
                    html.push('</label>');
                }
                if (options.columns)
                    html.push('<div class="no-x-padding col-sm-' + (12 - options.labelCol) + '">');
                html.push('<select type="text" class="form-control');
                if (options.size && _bootstrap4)
                    html.push(' form-control-' + options.size);
                html.push('" id="{0}_input"');
                var style = [];
                if (options.maxWidth)
                    style.push('max-width: ' + options.maxWidth + ';');
                if (options.minWidth)
                    style.push('min-width: ' + options.minWidth + ';');
                if (style.length)
                    html.push(' style="' + style.join("") + '"');
                html.push('">');
                enums.forEach(function (en, index) {
                    html.push('<option value="' + en + '">' + enumsNames[index] + '</option>');
                });
                html.push('</select>');
                _ui.Utils.addErrorDiv(html);
                if (options.columns)
                    html.push('</div>');
                if (options.titleIsHidden && options.description)
                    _ui.Utils.addTooltip(html, options.description, options);
            });
            return _utils.format(html.join(''), id);
        };
        var Select = (function (_super) {
            __extends(Select, _super);
            function Select(fp, options, form) {
                _super.call(this, fp, options, form);
            }
            Select.prototype.fillSelect = function (enums) {
                var that = this;
                _ui.Utils.fillSelect(enums, that._input(), that.$schema);
            };
            Select.prototype._state2UI = function () {
                var that = this;
                var input = that._input();
                if (input)
                    that._setFilter(true);
                _super.prototype._state2UI.call(this);
            };
            Select.prototype._setFilter = function (inRender) {
                var that = this;
                var cf = that.state.filter;
                if (inRender)
                    return;
                var enums = cf ? that.$schema.filters[cf] || [] : that.$schema.enum;
                that.fillSelect(enums);
                if (!inRender) {
                    var ii = enums.indexOf(that.state.value);
                    if (ii < 0) {
                        that.form.setValue(that.$display, enums.length ? enums[0] : null);
                    }
                    else {
                        var input = that._input();
                        if (input)
                            that._value2Input(input);
                    }
                }
            };
            Select.prototype.stateChanged = function (propName, params) {
                var that = this;
                var state = that.form.getState(that.$bind);
                _super.prototype.stateChanged.call(this, propName, params);
                if (!propName || (propName === 'filter')) {
                    that.state.filter = state.filter;
                    that._setFilter(false);
                }
            };
            Select.prototype.render = function ($parent) {
                var that = this;
                var opts = that._initOptions(_ui.Utils.defaultOptions);
                if (!that.$element) {
                    var enumNames = that.$schema.enumNames || that.$schema.enum;
                    enumNames = enumNames.map(function (v) { return _ulocale.tt(v + '', that.form.$locale); });
                    opts.title = _ulocale.tt(that.$schema.title, that.form.$locale);
                    if (that.$schema.description)
                        opts.description = _ulocale.tt(that.$schema.description, that.form.$locale);
                    that.$element = $(_createSelectInput(that.id, opts, that.options.design, opts.title, that.$schema.enum, enumNames));
                    that._state2UI();
                    that.setEvents(opts);
                }
                that.appendElement($parent, opts);
                return that.$element;
            };
            Select.prototype.removeEvents = function () {
                var that = this;
                var input = that._input();
                $(input).off("change");
            };
            Select.prototype._value2Input = function (input) {
                var that = this;
                input.selectedIndex = that.state.filter ? that.$schema.filters[that.state.filter].indexOf(that.state.value) : that.$schema.enum.indexOf(that.state.value);
            };
            Select.prototype.setEvents = function (opts) {
                var that = this;
                var input = that._input();
                $(input).on("change", function (event) {
                    var ii = that._input();
                    var iv = that.state.filter ? that.$schema.filters[that.state.filter][ii.selectedIndex] : that.$schema.enum[ii.selectedIndex];
                    if (that.state.value !== iv) {
                        that.state.value = iv;
                        that.form.setValue(that.$display, that.state.value);
                    }
                });
            };
            return Select;
        }(ui.BaseEdit));
        ui.Select = Select;
        _ui.registerControl(Select, "*", true, '', null);
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../../../../../typings/index.d.ts" />
/// <reference path="../../../core/core.ts" />
/// <reference path="./absfield.control.ts" />
var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        var _ui = ui, _utils = Phoenix.utils, _dom = Phoenix.dom, _ulocale = Phoenix.ulocale, _bootstrap4 = Phoenix.bootstrap4;
        function _createToggle(id, options, authoring, title) {
            title = title || '';
            options = $.extend({ titleIsHidden: false, placeHolder: false, columns: false }, options);
            var html = [];
            _ui.Utils.fieldWrapper(html, options, authoring, function () {
                var css = [];
                if (!options.titleIsHidden) {
                    html.push('<label for="{0}_toggle" id="{0}_label"');
                    if (options.columns) {
                        if (_bootstrap4) {
                            css.push('form-control-label');
                        }
                        else {
                            css.push('checkbox-inline');
                        }
                        css.push('bs-lib-col col-sm-' + options.labelCol);
                    }
                    if (options.inline) {
                        css.push('checkbox-inline no-x-padding');
                    }
                    if (css.length)
                        html.push(' class="' + css.join(' ') + '"');
                    html.push('>');
                    html.push(_utils.escapeHtml(title || '') + (options.inline ? '&nbsp;' : ''));
                    if (options.description)
                        _ui.Utils.addTooltip(html, options.description, options);
                    html.push('</label>');
                }
                if (options.columns)
                    html.push('<div class="no-x-padding col-sm-' + (12 - options.labelCol) + '" id="{0}_colparent">');
                _createInput(html, options, title);
                if (options.columns)
                    html.push('</div>');
                if (options.titleIsHidden && options.description)
                    _ui.Utils.addTooltip(html, options.description, options);
            });
            return _utils.format(html.join(''), id);
        }
        ;
        function _createInput(html, options, title) {
            html.push('<input class="tgl tgl-light" id="{0}_toggle" type="checkbox">');
            html.push('<label class="tgl-btn" for="{0}_toggle"></label>');
        }
        ;
        var Toggle = (function (_super) {
            __extends(Toggle, _super);
            function Toggle(fp, options, form) {
                _super.call(this, fp, options, form);
                this._state();
            }
            Toggle.prototype._check = function () {
                var that = this, e = that.$element.get(0);
                return _dom.find(e, that.id + '_toggle');
            };
            Toggle.prototype.click = function (event) {
                var that = this, input = that._check(), value = input.checked || false;
                if (event.target != input)
                    return;
                if (that.state.value != value) {
                    that.state.value = value;
                    that.form.setValue(that.$bind, value);
                }
            };
            Toggle.prototype._setDisabled = function (input, element) {
                var that = this, check = that._check();
                if (that.state.isDisabled || that.state.isReadOnly)
                    _dom.addClass(check, "disabled");
                else
                    _dom.removeClass(check, "disabled");
                input.disabled = that.state.isDisabled;
            };
            Toggle.prototype._setReadOnly = function (input, element) {
                this._setDisabled(input, element);
            };
            Toggle.prototype._setMandatory = function (input, element) { };
            Toggle.prototype._state2UI = function () {
                var that = this, input = that._check(), element = that.$element ? that.$element.get(0) : null;
                if (input) {
                    input.checked = that.state.value || false;
                    that._setDisabled(input, element);
                    that._setReadOnly(input, element);
                    that.setHidden(element);
                }
            };
            Toggle.prototype.changed = function (propName, ov, nv, op) {
                var that = this, input = that._check();
                if (that.state.value != nv) {
                    that.state.value = nv;
                    input.checked = that.state.value || false;
                }
            };
            Toggle.prototype.stateChanged = function (propName, params) {
                var that = this, state = that.form.getState(that.$bind), input = that._check(), element = that.$element ? that.$element.get(0) : null;
                if (state.isHidden !== that.state.isHidden) {
                    that.state.isHidden = state.isHidden;
                    if (input)
                        that.setHidden(element);
                }
                if (state.isDisabled != that.state.isDisabled) {
                    that.state.isDisabled = state.isDisabled;
                    if (input)
                        that._setDisabled(input, element);
                }
                if (state.isReadOnly != that.state.isReadOnly) {
                    that.state.isReadOnly = state.isReadOnly;
                    if (input)
                        that._setReadOnly(input, element);
                }
                if (state.isMandatory != that.state.isMandatory) {
                    that.state.isMandatory = state.isMandatory;
                    if (input)
                        that._setMandatory(input, element);
                }
            };
            Toggle.prototype.render = function ($parent) {
                var that = this;
                var opts = that._initOptions(_ui.Utils.defaultOptions);
                if (!that.$element) {
                    if (that.$schema.description)
                        opts.description = _ulocale.tt(that.$schema.description, that.form.$locale);
                    that.$element = $(_createToggle(that.id, opts, that.options.design, _ulocale.tt(that.$schema.title, that.form.$locale)));
                    that._state2UI();
                }
                that.appendElement($parent, opts);
                return that.$element;
            };
            return Toggle;
        }(ui.AbsField));
        ui.Toggle = Toggle;
        _ui.registerControl(Toggle, "boolean", false, 'toggle', null);
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../../core/core.ts" />
/// <reference path="./schema.data.ts" />
/// <reference path="./controls/absfield.control.ts" />
/// <reference path="./controls/link.control.ts" />
var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        var _render = Phoenix.render, _ui = ui, _observable = Phoenix.Observable, _sutils = Phoenix.Observable.SchemaUtils;
        var _controlFactory = function (fd, schema, lookup) {
            if (_sutils.isLink(fd.$bind)) {
                return ui.Link;
            }
            var meta = _sutils.isMeta(fd.$bind);
            if (meta) {
                return _ui.Utils.getRegisterdControl("meta", false, meta.widget, {});
            }
            if (!schema)
                return null;
            var options;
            if (fd.$readOnly) {
                options = options || {};
                options.readOnly = true;
            }
            if (lookup) {
                options = options || {};
                options.lookup = true;
            }
            return _ui.Utils.getRegisterdControl(schema.type, schema.enum ? true : false, fd.$widget, options);
        };
        _render.register("javascript", 'field.control', _controlFactory);
        _render.register("angular", 'field.control', _controlFactory);
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../core/core.ts" />
/// <reference path="../core/locale.ts" />
/// <reference path="../ui/form/modalform.control.ts" />
var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        var _locale = Phoenix.locale, _utils = Phoenix.utils, schema = {
            type: "object",
            properties: {
                message: {
                    type: "string"
                }
            }
        }, layout = {
            name: "alert",
            $type: "block",
            $items: [{ $bind: "message", $readOnly: true, options: { $expression: "{{message}}" } }]
        };
        var _alert = function (title, message, after) {
            title = title || _locale.ui.Info;
            var opt = {
                title: title,
                buttons: [
                    {
                        type: "primary",
                        title: _locale.ui.Ok,
                        name: "ok"
                    }
                ]
            };
            var ldata = { message: message };
            ui.OpenModalForm(opt, layout, schema, ldata, Phoenix.locale, function (modal, action, data, formcontrol) {
                if (action.operation === "modal-action") {
                    switch (action.property) {
                        case "ok":
                            modal.close();
                            if (after)
                                after();
                            break;
                    }
                }
            });
        };
        _utils.alert = function (title, message, after) {
            _alert(title, message, after);
        };
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../core/core.ts" />
/// <reference path="../ui/form/modalform.control.ts" />
/// <reference path="../ui/datasets-plugin.ts" />
var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        var _locale = Phoenix.locale, _utils = Phoenix.utils, _external = Phoenix.external, _application = Phoenix.application, _dsPlugin = Phoenix.DatasetPlugin, _dom = Phoenix.dom, _ui = ui;
        var layoutPassword = {
            "name": "form",
            "$type": "block",
            "$items": [
                {
                    "$bind": "oldPwd"
                },
                {
                    "$bind": "newPwd"
                },
                {
                    "$bind": "$$newPwd"
                }
            ]
        };
        var _changePasswordHandler = function (after) {
            var schemaPassword = {
                "type": "object",
                "properties": {
                    "oldPwd": { "title": _locale.ui.password.oldPassword, "type": "string", "format": "password", "capabilities": { noConfirming: true } },
                    "newPwd": { "title": _locale.ui.password.newPassword, "type": "string", "format": "password", "minLength": 8 }
                },
                "states": {
                    "oldPwd": { "isMandatory": true },
                    "newPwd": { "isMandatory": true }
                }
            };
            var fo = { "title": _locale.ui.password.change, "buttons": [{ "pattern": "validate" }] };
            _ui.OpenModalForm(fo, layoutPassword, schemaPassword, {}, {}, function (form, action, model, formControl) {
                switch (action.property) {
                    case "validate":
                        if (!model.validate())
                            return;
                        var result = {};
                        var ds = _application.configuration && _application.configuration.application &&
                            _application.configuration.application.authentication ? _application.configuration.application.authentication.changePasswordDs : null;
                        if (!ds) {
                            form.close();
                            return;
                        }
                        _dom.processing(true);
                        var toSend = {
                            oldPwd: model.oldPwd,
                            newPwd: model.newPwd
                        };
                        ds.name = "data";
                        _dsPlugin.executeDatasets([ds], toSend, result, [], function (sended, ex) {
                            if (!ex) {
                                _dom.processing(false);
                                form.close();
                                if (after)
                                    after();
                            }
                            else {
                                model.addAjaxException(ex);
                                _dom.processing(false);
                            }
                        });
                        break;
                }
            });
        };
        _external.changePasswordHandler = _changePasswordHandler;
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../core/core.ts" />
/// <reference path="../core/locale.ts" />
/// <reference path="../ui/form/modalform.control.ts" />
var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        var _locale = Phoenix.locale, _utils = Phoenix.utils, schema = {
            type: "object",
            properties: {
                message: {
                    type: "string"
                }
            }
        }, layout = {
            name: "confirm",
            $type: "block",
            $items: [{ $bind: "message", $readOnly: true, options: { $expression: "{{message}}" } }]
        };
        var _confirm = function (title, message, onsuccess) {
            title = title || _locale.ui.Warning;
            var opt = {
                title: title,
                buttons: [
                    {
                        type: "default",
                        title: _locale.ui.No,
                        name: "no"
                    },
                    {
                        type: "primary",
                        title: _locale.ui.Yes,
                        name: "yes"
                    }
                ]
            };
            var ldata = { message: message };
            ui.OpenModalForm(opt, layout, schema, ldata, Phoenix.locale, function (modal, action, data, formcontrol) {
                if (action.operation === "modal-action") {
                    switch (action.property) {
                        case "yes":
                            modal.close();
                            if (onsuccess)
                                onsuccess();
                            break;
                        case "no":
                            modal.close();
                            break;
                    }
                }
            });
        };
        ui.confirmDlg = _confirm;
        _utils.confirm = function (title, message, success) {
            _confirm(title, message, success);
        };
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../core/core.ts" />
/// <reference path="../data/odata-provider.ts" />
var Phoenix;
(function (Phoenix) {
    var data;
    (function (data) {
        var _data = data, _utils = Phoenix.utils;
        var OdataEnumManager = (function () {
            function OdataEnumManager(moduleName, entity, enumTypeField, enumCodeField, enumTitleField, enumOrderByField, fields) {
                var that = this;
                that._enums = {};
                that._entity = entity;
                that._module = moduleName;
                that._typeField = enumTypeField;
                that._codeField = enumCodeField;
                that._titleField = enumTitleField;
                that._orderByField = enumOrderByField;
                that._fields = fields;
            }
            OdataEnumManager.prototype.promise = function (enums, enumType) {
                var res = {};
                var missedEnums = [];
                var that = this;
                var odataFilter = [];
                Object.keys(enums).forEach(function (enumName) {
                    var ce = enums[enumName];
                    if (!that._enums[enumName]) {
                        missedEnums.push({ name: enumName, config: ce });
                        var tff = that._typeField + ' eq \'' + enumName + '\'';
                        if (ce.filter)
                            tff = '(' + tff + ' and ' + ce.filter + ')';
                        odataFilter.push(tff);
                    }
                    else {
                        res[enumName] = that._enums[enumName];
                    }
                });
                if (!missedEnums.length)
                    return new _utils.Promise(function (resolve, reject) {
                        resolve({ type: enumType, enums: res });
                    });
                var params = {
                    "$top": 1000,
                    "nocount": true,
                    "$entity": that._entity,
                    "$module": that._module,
                    "$filter": odataFilter.join(' or '),
                    "$orderby": that._typeField + "," + that._orderByField
                };
                return _data.odata.getRessources(params, function (ldata) {
                    ldata.documents && ldata.documents.forEach(function (item) {
                        var code = item[that._codeField];
                        var title = item[that._titleField];
                        var type = item[that._typeField];
                        if (!res[type]) {
                            res[type] = { enum: [], enumNames: [] };
                            that._enums[type] = res[type];
                        }
                        if (that._fields) {
                            res[type].fields = res[type].fields || [];
                            var ff_1 = [];
                            var fv_1 = {};
                            that._fields.forEach(function (fn) {
                                if (item[fn])
                                    ff_1.push(item[fn]);
                                fv_1[fn] = item[fn];
                            });
                            res[type].fields.push(fv_1);
                            if (ff_1.length) {
                                var fn = ff_1.join('$');
                                res[type].filters = res[type].filters || {};
                                res[type].filters[fn] = res[type].filters[fn] || [];
                                res[type].filters[fn].push(code);
                            }
                        }
                        res[type].enum.push(code);
                        res[type].enumNames.push(title);
                    });
                    return { type: enumType, enums: res };
                });
            };
            return OdataEnumManager;
        }());
        data.OdataEnumManager = OdataEnumManager;
    })(data = Phoenix.data || (Phoenix.data = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../core/core.ts" />
/// <reference path="../core/locale.ts" />
/// <reference path="../ui/form/modalform.control.ts" />
var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        var _locale = Phoenix.locale, _utils = Phoenix.utils, schema = {
            type: "object",
            properties: {
                value: {
                    type: "string"
                }
            }
        }, layout = {
            name: "prompt",
            $type: "block",
            $items: [{ $bind: "value", options: { titleIsHidden: true } }]
        };
        var _prompt = function (title, defaultValue, onsuccess) {
            title = title || _locale.ui.Warning;
            var opt = {
                title: title,
                buttons: [
                    {
                        type: "primary",
                        title: _locale.ui.Ok,
                        name: "ok"
                    }
                ]
            };
            var ldata = { value: defaultValue || '' };
            ui.OpenModalForm(opt, layout, schema, ldata, Phoenix.locale, function (modal, action, data, formcontrol) {
                if (action.operation === "modal-action") {
                    switch (action.property) {
                        case "ok":
                            var nv = data.value;
                            modal.close();
                            if (onsuccess)
                                onsuccess(nv);
                            break;
                    }
                }
            });
        };
        _utils.prompt = function (title, defaultValue, success) {
            _prompt(title, defaultValue, success);
        };
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../core/locale.ts" />
/// <reference path="../core/core.ts" />
/// <reference path="../data/datasets.ts" />
/// <reference path="../ui/form/schema.data.ts" />
var Phoenix;
(function (Phoenix) {
    var _ulocale = Phoenix.ulocale, _application = Phoenix.application, _ajax = Phoenix.ajax;
    var Data;
    (function (Data) {
        var _data = Phoenix.data, _utils = Phoenix.utils, _su = Phoenix.Observable.SchemaUtils, _dom = Phoenix.dom, _application = Phoenix.application, _schema = {
            getRessources: function (schemaName, ondata) {
                var _after = function (cd) {
                    if (ondata)
                        cd = ondata(cd);
                    return cd;
                };
                var config = _application.config(_application.name);
                if (!config)
                    throw "Application configuration not found.";
                var lurl = config.prototypes + '/' + schemaName;
                var p1 = Phoenix.ajax.get(lurl, {}, function (ldata) {
                    return ldata;
                });
                return new _utils.Promise(function (resolve, reject) {
                    p1.then(function (schema) {
                        _dom.processing(true);
                        _su.loadEnumsPromise(schema).then(function (schema) {
                            _dom.processing(false);
                            resolve(_after(schema));
                        }).catch(function (ex) {
                            _dom.processing(false);
                            reject(ex);
                        });
                    }).catch(function (ex) {
                        reject(ex);
                    });
                });
            }
        }, _execLoadSchema = function (config, lurl, context, callerObject) {
            return _schema.getRessources(config.$params.$url, function (ldata) {
                return ldata;
            });
        };
        _data.registerDataProvider("form-meta", _execLoadSchema);
    })(Data = Phoenix.Data || (Phoenix.Data = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../js/core/core.ts" />
var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        var dsPlugin = Phoenix.DatasetPlugin, _dom = Phoenix.dom;
        var DsLookup = (function () {
            function DsLookup(ds, options) {
                var that = this;
                that._init = false;
                that._options = options || {};
                that._notify = options.notify;
                that._ds = ds || {};
                that._ds.mapping = that._ds.mapping || {};
                that._ds.mapping.code = that._ds.mapping.code || "code";
                that._ds.mapping.libelle = that._ds.mapping.libelle || that._ds.mapping.lib || "lib";
                var $params = ds.data.$params || {};
                that._pageSize = $params.$top || null;
                that.searchText = null;
                that._count = 0;
                that._page = 0;
                that._items = [];
                that._initData();
            }
            DsLookup.prototype._initData = function () {
                var that = this, res = {};
                var _ds = that._ds.data || {};
                var ds = {
                    "name": "dataset",
                    "$type": _ds.$type || "odata",
                    "$params": {
                        "$entity": _ds.$params.$entity,
                        "$module": _ds.$params.$module,
                        "$aggregation": "$count"
                    }
                };
                _dom.processing(true);
                dsPlugin.executeDatasets([ds], {}, res, null, function (sended, ex) {
                    _dom.processing(false);
                    if (!ex) {
                        that._init = true;
                        that._count = res.dataset;
                        that._notify(null, { inited: true, updated: true });
                    }
                }, false);
            };
            Object.defineProperty(DsLookup.prototype, "items", {
                get: function () {
                    return this._items;
                },
                set: function (value) {
                    if (value) {
                        this._items = value;
                        this._notifyChange("items");
                    }
                },
                enumerable: true,
                configurable: true
            });
            DsLookup.prototype._notifyChange = function (propName) {
                var that = this;
                switch (propName) {
                    case "items":
                        that._notify(that.items, {});
                        break;
                }
            };
            DsLookup.prototype.getNbPages = function () {
                var that = this;
                return Math.ceil(that._count / that._pageSize);
            };
            DsLookup.prototype._getSkip = function (page) {
                var that = this;
                return page * that._pageSize;
            };
            DsLookup.prototype._getPage = function (page, context) {
                var that = this;
                if (!that._init)
                    return;
                var ds = $.extend(true, {}, that._ds.data), res = {};
                ds.name = "dataset";
                ds.$params = ds.$params || {};
                ds.$params.$skip = that._getSkip(page);
                context = context || {};
                if (that.searchText)
                    context.$searchText = that.searchText;
                _dom.processing(true);
                dsPlugin.executeDatasets([ds], context, res, null, function (sended, ex) {
                    _dom.processing(false);
                    if (!ex) {
                        var data_3 = res.dataset;
                        if (data_3 && that._count != data_3.count) {
                            that._count = data_3.count;
                            that._page = 0;
                            that._notify(null, { updated: true });
                        }
                        if (data_3.documents) {
                            data_3.documents = data_3.documents.map(function (item) {
                                return { code: item[that._ds.mapping.code], libelle: item[that._ds.mapping.libelle] };
                            });
                            that.items = data_3.documents;
                        }
                    }
                }, false);
            };
            DsLookup.prototype.currentPage = function () {
                return this._page;
            };
            DsLookup.prototype.toPage = function (page) {
                var that = this;
                if (page >= 0 && page < that.getNbPages()) {
                    that._page = page;
                    that._getPage(page);
                }
            };
            DsLookup.prototype.nextPage = function () {
                var that = this;
                var page = that._page + 1;
                if (page < that.getNbPages()) {
                    that._page = page;
                    that._getPage(page);
                }
            };
            DsLookup.prototype.prevPage = function () {
                var that = this;
                var page = that._page - 1;
                if (page >= 0) {
                    that._page = page;
                    that._getPage(page);
                }
            };
            DsLookup.prototype.firthPage = function () {
                var that = this;
                that._page = 0;
                that._getPage(0);
            };
            DsLookup.prototype.lastPage = function () {
                var that = this;
                var page = that.getNbPages() - 1;
                that._page = page;
                that._getPage(page);
            };
            DsLookup.prototype.search = function (searchText) {
                var that = this;
                that.searchText = searchText ? searchText : null;
                if (that._ds.data.$params.$search)
                    that._getPage(0);
            };
            return DsLookup;
        }());
        ui.DsLookup = DsLookup;
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../js/core/locale.ts" />
/// <reference path="../../js/ui/form/form.control.ts" />
/// <reference path="../../js/ui/form/controls/absfield.control.ts" />
/// <reference path="./filter-lookup.ts" />
var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        var _ui = ui, _utils = Phoenix.utils, _ulocale = Phoenix.ulocale, _dom = Phoenix.dom, _sutils = Phoenix.Observable.SchemaUtils, _bootstrap4 = Phoenix.bootstrap4;
        var ListeOperateurs = (function () {
            function ListeOperateurs() {
                this.liste = [];
            }
            ListeOperateurs.prototype.add = function (code, lib, isBinary, options) {
                var that = this;
                var op = {
                    code: code,
                    libelle: lib || code,
                    isBinary: isBinary,
                    options: options || {}
                };
                op.options.symbol = options.symbol || lib || code;
                if (isBinary) {
                    op.options.liaison = op.options.liaison || "et";
                }
                that.liste.push(op);
            };
            ListeOperateurs.prototype.gets = function () {
                return this.liste;
            };
            ListeOperateurs.prototype.get = function (code) {
                return this.liste.find(function (item) { return item.code == code; });
            };
            ListeOperateurs.prototype.remove = function (code) {
                var index = this.liste.findIndex(function (item) { return item.code == code; });
                if (index >= 0)
                    this.liste.splice(index, 1);
            };
            return ListeOperateurs;
        }());
        ui.ListeOperateurs = ListeOperateurs;
        var ListeChamps = (function () {
            function ListeChamps() {
                this.liste = [];
            }
            ListeChamps.prototype.add = function (code, lib, type, options) {
                var that = this;
                that.liste.push({
                    code: code,
                    libelle: lib || code,
                    type: type || "string",
                    options: options || {}
                });
            };
            ListeChamps.prototype.get = function (code) {
                return this.liste.find(function (item) { return item.code == code; });
            };
            ListeChamps.prototype.gets = function () {
                return this.liste;
            };
            ListeChamps.prototype.remove = function (code) {
                var index = this.liste.findIndex(function (item) { return item.code == code; });
                if (index >= 0)
                    this.liste.splice(index, 1);
            };
            return ListeChamps;
        }());
        ui.ListeChamps = ListeChamps;
        var Filter = (function () {
            function Filter(id, code, op, values) {
                var that = this;
                that.id = id;
                that.code = code;
                that.op = op;
                that.values = values || [];
            }
            Filter.prototype.getValues = function () {
                return this.values.map(function (item) {
                    if (item && item.code)
                        return item.code;
                    return item;
                });
            };
            Filter.prototype.getValueNames = function () {
                return this.values.map(function (item) {
                    if (item && item.lib)
                        return item.lib;
                    return item;
                });
            };
            return Filter;
        }());
        ui.Filter = Filter;
        var ListeFilters = (function () {
            function ListeFilters(filters) {
                this.liste = [];
                this.filters = filters;
                this.compteur = 0;
            }
            ListeFilters.prototype.add = function (champCode, opCode, values) {
                var that = this;
                var filter = new Filter(that.compteur++, champCode, opCode, values);
                that.liste.push(filter);
                that.filters.push(filter);
                return filter;
            };
            ListeFilters.prototype.add2 = function (champCode, opCode, values) {
                var that = this;
                var filter = new Filter(that.compteur++, champCode, opCode, values);
                that.liste.push(filter);
                return filter;
            };
            ListeFilters.prototype.set = function (id, data) {
                var that = this;
                var filter;
                var index = -1;
                that.liste.forEach(function (item, i) {
                    if (item.id == id) {
                        filter = item;
                        index = i;
                    }
                });
                if (filter) {
                    filter.op = data.op;
                    filter.values = data.values || [];
                }
                if (index >= 0 && index < that.filters.length) {
                    var f = that.filters.get(index);
                    if (f) {
                        f.code = filter.code;
                        f.op = filter.op;
                        f.values = filter.values;
                    }
                }
                return filter;
            };
            ListeFilters.prototype.get = function (id) {
                return this.liste.find(function (item) { return item.id == id; });
            };
            ListeFilters.prototype.getByIndex = function (index) {
                return this.liste[index];
            };
            //getCode(values) {
            //    let id = -1;
            //    this.liste.forEach(function (filter) {
            //        let isOK = true;
            //        if (Array.isArray(values)) {
            //            values.forEach(function (v, indexV) {
            //                if (filter.values[indexV] && v != filter.values[indexV]) {
            //                    isOK = false;
            //                    return false;
            //                }
            //            });
            //        }
            //        else if (filter.values[0] != values)
            //            isOK = false;
            //        if (isOK) {
            //            code = filter.code;
            //            return false;
            //        }
            //    });
            //    return code;
            //}
            ListeFilters.prototype.gets = function () {
                return this.liste;
            };
            ListeFilters.prototype.getsByChamp = function (codeChamp) {
                var filters = [];
                this.liste.forEach(function (item) {
                    if (item.code == codeChamp)
                        filters.push(item);
                });
                return filters;
            };
            ListeFilters.prototype.remove = function (id) {
                var that = this;
                var index = that.liste.findIndex(function (item) { return item.id == id; });
                if (index >= 0) {
                    that.liste.splice(index, 1);
                    that.filters.remove(that.filters.get(index));
                }
            };
            ListeFilters.prototype.removeAll = function () {
                var that = this;
                that.liste.splice(0);
                that.filters.forEach(function (item, index) { that.filters.remove(that.filters.get(index)); });
            };
            ListeFilters.prototype.removeAllByChamp = function (champCode) {
                var that = this;
                that.liste.forEach(function (item, index) {
                    if (item.code == champCode) {
                        that.liste.splice(index, 1);
                        that.filters.remove(that.filters.get(index));
                    }
                });
            };
            return ListeFilters;
        }());
        ui.ListeFilters = ListeFilters;
        var ListeTypes = (function () {
            function ListeTypes() {
                this.liste = [];
            }
            ListeTypes.prototype.addType = function (code, lib, operateurs) {
                this.liste.push({
                    code: code,
                    libelle: lib || code,
                    operateurs: operateurs || []
                });
            };
            ListeTypes.prototype.addOperateur = function (codeType, codeOp) {
                this.liste.find(function (item) { return item.code == codeType; }).operateurs.push(codeOp);
            };
            ListeTypes.prototype.getOperateurs = function (codeType) {
                return this.liste.find(function (item) { return item.code == codeType; }).operateurs;
            };
            return ListeTypes;
        }());
        ui.ListeTypes = ListeTypes;
        var FilterListView = (function () {
            function FilterListView(listeChamps, listeFilters, listeOperateurs, callBack, options, filter) {
                this.listeChamps = listeChamps;
                this.listeFilters = listeFilters;
                this.listeOperateurs = listeOperateurs;
                this.filter = filter;
                this.callBack = callBack;
                this.options = options || {};
                this.data = {};
                this.init();
            }
            FilterListView.prototype.init = function () {
                var that = this;
                that.model = {
                    type: "object",
                    properties: {
                        filters: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    code: { type: "string" },
                                    libelle: { type: "string" },
                                    selected: { type: "string" }
                                }
                            }
                        }
                    },
                    links: {
                        validate: {
                            title: "Valider",
                            isHidden: that.options.btnValidate != true
                        }
                    }
                };
                that.layout = {
                    name: "form",
                    $type: "block",
                    $items: [
                        {
                            $type: "block",
                            $items: [
                                {
                                    $type: "block",
                                    $items: [
                                        { $bind: "filters", "$widget": "tagview" }
                                    ]
                                },
                                {
                                    $type: "block",
                                    $inline: true,
                                    $items: [
                                        {
                                            $bind: "$links.validate",
                                            options: {
                                                type: "success",
                                                right: true
                                            }
                                        }
                                    ]
                                }
                            ],
                            $title: {
                                value: "Filtres sélectionnés",
                                size: 5,
                                style: ""
                            }
                        }
                    ]
                };
                that.data.filters = that.listeFilters.gets().map(function (item) {
                    var op = that.listeOperateurs.get(item.op);
                    var champ = that.listeChamps.get(item.code);
                    var lib = champ.libelle + " " + op.options.symbol + " ";
                    if (op.isBinary)
                        lib += item.values[0] + " " + op.options.liaison + " " + item.values[1];
                    else {
                        lib += item.getValueNames().join(", ");
                    }
                    return {
                        code: item.id,
                        libelle: lib,
                        selected: that.filter && that.filter.id == item.id ? true : false
                    };
                });
            };
            FilterListView.prototype.render = function (parent) {
                var that = this;
                if (parent)
                    _ui.OpenForm($(parent), that.layout, that.model, that.data, {}, function (action, data, formControl) {
                        switch (action.property) {
                            case "upd":
                                that.callBack("EDIT", { id: action.actionParams.code });
                                break;
                            case "remove":
                                that.callBack("REMOVE", { id: action.actionParams.code });
                                break;
                            case "$links.validate":
                                that.callBack("VALIDE", {});
                                break;
                        }
                    });
            };
            return FilterListView;
        }());
        var ValueModel = (function () {
            function ValueModel(type, op, options) {
                this.valueModel = null;
                var that = this;
                that.type = type;
                that.op = op;
                that.options = $.extend(true, {}, options);
                that.valueModel = that.getInstance();
            }
            ValueModel.prototype.getInstance = function () {
                var that = this;
                var options = that.addDefaultOptions(that.options);
                if (that.op.isBinary)
                    return new ModelTwoVal(options);
                else if (that.op.code === "vide" || that.op.code === "nvide")
                    return new ModelVideVal(options);
                else if (that.type === "enum")
                    return new ModelEnumVal(options);
                else if (that.type === "lookup")
                    return new ModelLookupVal(options);
                else if ((that.op.code === "in" || that.op.code === "nin") && that.type != "decimal" && that.type != "money" && that.type != "date")
                    return new ModelMultiVal(options);
                else
                    return new ModelOneVal(options);
            };
            ValueModel.prototype.init = function (after) {
                this.valueModel.init(after);
            };
            ValueModel.prototype.addDefaultOptions = function (options) {
                var that = this;
                switch (that.type) {
                    case "integer":
                        options.type = "number";
                        break;
                    case "decimal":
                        options.type = "number";
                        // "symbol": "jours",
                        // "decimals": 0
                        options.decimals = options.decimals || 5;
                        break;
                    case "money":
                        options.type = "number";
                        options.format = "money";
                        break;
                    case "date":
                        options.type = "string",
                            options.format = "date";
                        options.title = "Date";
                        break;
                    default:
                        options.type = that.type || "string";
                }
                return options;
            };
            ValueModel.prototype.getModel = function () {
                if (this.valueModel)
                    return this.valueModel.getModel();
                return null;
            };
            ValueModel.prototype.getLayout = function () {
                if (this.valueModel)
                    return this.valueModel.getLayout();
                return null;
            };
            ValueModel.prototype.getData = function () {
                if (this.valueModel)
                    return this.valueModel.getData();
                return null;
            };
            ValueModel.prototype.getValues = function () {
                if (this.valueModel)
                    return this.valueModel.getValues();
                return null;
            };
            ValueModel.prototype.setValues = function (data, $type) {
                if (this.valueModel)
                    return this.valueModel.setValues(data, $type);
                return null;
            };
            ValueModel.prototype.setValuesByFilter = function (data) {
                if (this.valueModel)
                    this.valueModel.setValuesByFilter(data);
            };
            return ValueModel;
        }());
        var ModelVal = (function () {
            function ModelVal(options) {
            }
            ModelVal.prototype.init = function (after) {
                if (after)
                    after();
            };
            ModelVal.prototype.getModel = function () {
                return this.model;
            };
            ModelVal.prototype.getLayout = function () {
                return this.layout;
            };
            ModelVal.prototype.getData = function () {
                return this.data;
            };
            ModelVal.prototype.getValues = function () { };
            ModelVal.prototype.setValues = function (data, type) { };
            ModelVal.prototype.setValuesByFilter = function (data) { };
            return ModelVal;
        }());
        var ModelVideVal = (function (_super) {
            __extends(ModelVideVal, _super);
            function ModelVideVal(options) {
                _super.call(this, options);
            }
            ModelVideVal.prototype.getValues = function () {
                return [""];
            };
            return ModelVideVal;
        }(ModelVal));
        var ModelOneVal = (function (_super) {
            __extends(ModelOneVal, _super);
            function ModelOneVal(options) {
                _super.call(this, options);
                var that = this;
                that.options = options || {};
                that.model = {
                    type: "object",
                    properties: {
                        value: {
                            title: that.options.title || "Valeur",
                            type: that.options.type || "string"
                        }
                    },
                    states: {
                        value: {
                            isMandatory: true
                        }
                    }
                };
                if (that.options.format)
                    that.model.properties.value.format = that.options.format;
                if (that.options.decimals)
                    that.model.properties.value.decimals = that.options.decimals;
                that.layout = {
                    name: "filter-value",
                    $type: "block",
                    $items: [
                        {
                            $items: [{ $bind: "value", options: { titleIsHidden: true, placeHolder: true } }],
                            $colSize: 12
                        }
                    ]
                };
                that.data = { value: null };
            }
            ModelOneVal.prototype.getValues = function () {
                if (this.data.value)
                    return [this.data.value];
                return null;
            };
            ModelOneVal.prototype.setValues = function (data) {
                this.data.value = data["value"];
            };
            ModelOneVal.prototype.setValuesByFilter = function (data) {
                this.data.value = data[0];
            };
            return ModelOneVal;
        }(ModelVal));
        var ModelTwoVal = (function (_super) {
            __extends(ModelTwoVal, _super);
            function ModelTwoVal(options) {
                _super.call(this, options);
                var that = this;
                that.options = options || {};
                that.model = {
                    type: "object",
                    properties: {
                        value1: {
                            title: (options.title || "Valeur") + " 1",
                            type: options.type || "string"
                        },
                        value2: {
                            title: (options.title || "Valeur") + " 2",
                            type: options.type || "string"
                        }
                    },
                    states: {
                        value1: {
                            isMandatory: true
                        },
                        value2: {
                            isMandatory: true
                        }
                    }
                };
                if (that.options.format) {
                    that.model.properties.value1.format = that.options.format;
                    that.model.properties.value2.format = that.options.format;
                }
                if (that.options.decimals) {
                    that.model.properties.value1.decimals = that.options.decimals;
                    that.model.properties.value2.decimals = that.options.decimals;
                }
                that.layout = {
                    name: "filter-value",
                    $type: "block",
                    $items: [
                        {
                            $type: "row",
                            $items: [
                                {
                                    $items: [{ $bind: "value1", options: { titleIsHidden: true, placeHolder: true } }],
                                    $colSize: 6
                                },
                                {
                                    $items: [{ $bind: "value2", options: { titleIsHidden: true, placeHolder: true } }],
                                    $colSize: 6
                                }
                            ]
                        }
                    ]
                };
                that.data = { value1: null, value2: null };
            }
            ModelTwoVal.prototype.getValues = function () {
                var that = this;
                if (that.data.value1 && that.data.value2)
                    return [that.data.value1, that.data.value2];
                return null;
            };
            ModelTwoVal.prototype.setValues = function (data) {
                this.data.value1 = data["value1"];
                this.data.value2 = data["value2"];
            };
            ModelTwoVal.prototype.setValuesByFilter = function (data) {
                this.data.value1 = data[0];
                this.data.value2 = data[1];
            };
            return ModelTwoVal;
        }(ModelVal));
        var ModelMultiVal = (function (_super) {
            __extends(ModelMultiVal, _super);
            function ModelMultiVal(options) {
                _super.call(this, options);
                var that = this;
                that.options = options || {};
                that.model = {
                    type: "object",
                    properties: {
                        value: {
                            title: 'Valeur',
                            type: "string"
                        }
                    },
                    states: {
                        value: {
                            isMandatory: true
                        }
                    }
                };
                if (that.options.format)
                    that.model.properties.value.format = that.options.format;
                that.layout = {
                    name: "filter-value",
                    $type: "block",
                    $items: [
                        {
                            $items: [{ $bind: "value", options: { titleIsHidden: true, placeHolder: 'Une ou plusieurs valeurs (séparées par un ";" : val1;val2;...)' } }],
                            $colSize: 12
                        }
                    ]
                };
                that.data = { value: null };
            }
            ModelMultiVal.prototype.getValues = function () {
                var that = this;
                if (!that.data.value)
                    return null;
                var vals = that.data.value.split(";");
                if (that.options.type == "number")
                    vals = vals.map(function (item) {
                        return parseInt(item, 10);
                    });
                return vals;
            };
            ModelMultiVal.prototype.setValues = function (data) {
                var that = this;
                if (!data["value"])
                    return;
                var values = data["value"].split(";");
                values = values.map(function (item) {
                    return item.replace(/\"/g, "");
                });
                var vals = [];
                values.forEach(function (item) {
                    if (that.options.type == "number") {
                        if ((new RegExp('^[0-9]+$')).test(item))
                            vals.push(item);
                    }
                    else
                        vals.push(item);
                });
                that.data.value = vals.join(";");
            };
            ModelMultiVal.prototype.setValuesByFilter = function (data) {
                this.data.value = data.join(";");
            };
            return ModelMultiVal;
        }(ModelVal));
        var ModelEnumVal = (function (_super) {
            __extends(ModelEnumVal, _super);
            function ModelEnumVal(options) {
                _super.call(this, options);
                var that = this;
                that.options = options || {};
                that.options.enumName = that.options.enumName || that.options.champName;
                that.model = {
                    type: "object",
                    properties: {
                        value: {
                            title: "List",
                            type: "array",
                            items: {
                                type: "string",
                                enums: {},
                                $enumref: "list"
                            }
                        }
                    },
                    states: {
                        value: {
                            isMandatory: true
                        }
                    }
                };
                that.model.properties.value.items.enums[that.options.enumName] = {
                    type: "default",
                    enum: [],
                    enumNames: []
                };
                that.model.properties.value.items.$enumref = that.options.enumName;
                that.layout = {
                    name: "filter-value",
                    $type: "block",
                    $items: [
                        {
                            $items: [{
                                    $bind: "value",
                                    $widget: "enums-list",
                                    options: {
                                        titleIsHidden: true
                                    }
                                }],
                            $colSize: 12
                        }
                    ]
                };
                that.options.enum && that.options.enum.forEach(function (item) {
                    that.model.properties.value.items.enums[that.options.enumName].enum.push(item.code);
                    that.model.properties.value.items.enums[that.options.enumName].enumNames.push(item.libelle || item.code);
                });
                that.data = { value: [] };
            }
            ModelEnumVal.prototype.getValues = function () {
                var that = this;
                if (that.data.value && that.data.value.length) {
                    return that.data.value.map(function (item) {
                        var elt = null;
                        that.options.enum.forEach(function (it, i) {
                            if (item == it.code) {
                                elt = it;
                                return false;
                            }
                        });
                        return { code: item, lib: elt.libelle || elt.lib || item };
                    });
                }
                return [];
            };
            ModelEnumVal.prototype.setValues = function (data) {
                this.data.value = data["value"];
            };
            ModelEnumVal.prototype.setValuesByFilter = function (data) {
                this.data.value = data.map(function (item) {
                    return item.code;
                });
            };
            return ModelEnumVal;
        }(ModelVal));
        var ModelLookupVal = (function (_super) {
            __extends(ModelLookupVal, _super);
            function ModelLookupVal(options) {
                _super.call(this, options);
                var that = this;
                that.options = options || {};
                that.model = {
                    type: "object",
                    properties: {
                        value: {
                            title: "List",
                            type: "array",
                            ds: that.options.lookupSchema || null,
                            items: {
                                type: "object",
                                properties: {
                                    code: {
                                        type: "string"
                                    },
                                    lib: {
                                        type: "string"
                                    }
                                }
                            }
                        }
                    },
                    states: {
                        value: {
                            isMandatory: true
                        }
                    }
                };
                that.layout = {
                    name: "filter-value",
                    $type: "block",
                    $items: [
                        {
                            $items: [{
                                    $bind: "value",
                                    $widget: "lookup-list",
                                    options: {
                                        titleIsHidden: true
                                    }
                                }],
                            $colSize: 12
                        }
                    ]
                };
                that.data = { value: [] };
            }
            ModelLookupVal.prototype.getValues = function () {
                var that = this;
                if (that.data.value && that.data.value.length)
                    return that.data.value;
                return [];
            };
            ModelLookupVal.prototype.setValues = function (data) {
                this.data.value = data["value"];
            };
            ModelLookupVal.prototype.setValuesByFilter = function (data) {
                this.data.value = data;
            };
            return ModelLookupVal;
        }(ModelVal));
        var FilterEditView = (function () {
            function FilterEditView(champ, listeFilters, listeOperateurs, listeTypes, callBack, filter, options) {
                this.champ = champ;
                this.filter = filter;
                this.listeFilters = listeFilters;
                this.listeOperateurs = listeOperateurs;
                this.listeTypes = listeTypes;
                this.callBack = callBack;
                this.options = options || {};
                this.data = { operateur: null, values: [] };
            }
            FilterEditView.prototype.renderOperateur = function () {
                var that = this;
                var model = {
                    type: "object",
                    properties: {
                        champ: {
                            title: "Filtre",
                            type: "string"
                        },
                        operateur: {
                            title: "Opérateur",
                            type: "string",
                            enum: [],
                            enumNames: []
                        }
                    },
                    states: {
                        champ: {
                            isReadOnly: true,
                            isHidden: that.options.showLabel == false
                        },
                        operateur: {
                            isHidden: that.options.showOperateur == false
                        }
                    }
                };
                var layout = {
                    name: "filter-operateur",
                    $type: "block",
                    $items: [
                        {
                            $type: "block",
                            $items: [
                                {
                                    $bind: "champ",
                                    $readOnly: true,
                                    options: {
                                        $expression: "{{champ}}"
                                    }
                                },
                                { $bind: "operateur", options: { titleIsHidden: true } }
                            ]
                        }
                    ]
                };
                var properties = model.properties;
                var states = model.states;
                // Champ
                that.data.champ = that.champ.libelle;
                // Opérateurs
                var unType = that.champ.options.format || that.champ.type;
                properties.operateur.enum = that.listeTypes.getOperateurs(unType);
                properties.operateur.enum.forEach(function (item) {
                    properties.operateur.enumNames.push(that.listeOperateurs.get(item).libelle);
                });
                if (that.filter)
                    that.data.operateur = that.filter.op;
                else
                    that.data.operateur = properties.operateur.enum[0];
                if (that.options.showLabel == false && that.options.showOperateur == false)
                    return;
                var parent = _dom.query(that.container, ".operateur");
                if (parent) {
                    var oldForm = _ui.formManager().formByName('filter-operateur');
                    _ui.removeForm(oldForm);
                    _ui.OpenForm($(parent), layout, model, that.data, {}, function (action, data, formControl) {
                        var model;
                        switch (action.property) {
                            case "operateur":
                                if (action.operation == "propchange") {
                                    var op = that.listeOperateurs.get(data.model().operateur);
                                    that.data.operateur = data.model().operateur;
                                    that.renderValue(op);
                                }
                                break;
                        }
                    });
                }
            };
            FilterEditView.prototype.renderValue = function (op) {
                var that = this;
                var parent = _dom.query(that.container, ".value");
                if (parent) {
                    var oldForm = _ui.formManager().formByName('filter-value');
                    _ui.removeForm(oldForm);
                    var options = that.champ.options || {};
                    options.champName = that.champ.code;
                    that.modelType = new ValueModel(that.champ.options.format || that.champ.type, op, options);
                    that.modelType && that.modelType.init(function () {
                        var model = that.modelType.getModel();
                        var layout = that.modelType.getLayout();
                        if (model && layout) {
                            var ldata = void 0;
                            if (that.filter)
                                that.modelType.setValuesByFilter(that.filter.values);
                            ldata = that.modelType.getData();
                            _ui.OpenForm($(parent), layout, model, ldata, {}, function (action, data, formControl) {
                                switch (action.operation) {
                                    case "propchange":
                                        that.modelType.setValues(data.model());
                                        that.data.values = that.modelType.getValues();
                                        break;
                                    default:
                                        that.modelType.setValues(data.model());
                                        that.data.values = that.modelType.getValues();
                                        break;
                                }
                            });
                        }
                        else
                            that.data.values = that.modelType.getValues();
                    });
                }
            };
            FilterEditView.prototype.renderButton = function () {
                var that = this;
                var model = {
                    type: "object",
                    properties: {},
                    links: {
                        add: {
                            title: "Ajouter"
                        }
                    }
                };
                var layout = {
                    name: "filter-link",
                    $type: "block",
                    $items: [
                        {
                            $inline: true,
                            $items: [
                                {
                                    $bind: "$links.add",
                                    options: {
                                        type: "primary",
                                        icon: "plus",
                                        right: true
                                    }
                                }
                            ],
                            $colSize: 12
                        }
                    ]
                };
                var parent = _dom.query(that.container, ".link");
                if (parent) {
                    var oldForm = _ui.formManager().formByName('filter-link');
                    _ui.removeForm(oldForm);
                    _ui.OpenForm($(parent), layout, model, that.data, {}, function (action, data, formControl) {
                        switch (action.property) {
                            case "$links.add":
                                var fm = _ui.formManager();
                                var fvalue = fm.formByName('filter-value');
                                if (!data.validate() || (fvalue && !fvalue.$model.validate()))
                                    return;
                                var model_1 = data.model();
                                if (that.data.values && that.data.values.length) {
                                    that.callBack({ code: that.champ.code, op: that.data.operateur, values: that.data.values });
                                }
                                break;
                        }
                    });
                }
            };
            FilterEditView.prototype.render = function (parent) {
                var that = this;
                var _html = [
                    '<div>',
                    '<div class="operateur">',
                    '</div>',
                    '<div class="value">',
                    '</div>',
                    '<div class="link">',
                    '</div>',
                    '</div>'
                ];
                if (parent) {
                    that.container = parent;
                    _dom.empty(parent);
                    _dom.append(parent, $(_html.join("")).get(0));
                    that.renderOperateur();
                    that.renderValue(that.listeOperateurs.get(that.data.operateur));
                    that.renderButton();
                }
            };
            return FilterEditView;
        }());
        // class RenderModel1 {
        //     container;
        //     listContent;
        //     listeChamps: ListeChamps;
        //     listeFilters: ListeFilters;
        //     listeOperateurs: ListeOperateurs;
        //     listeTypes: ListeTypes;
        //     options;
        //     champListView;
        //     filterListView;
        //     filterEditView;
        //     constructor(listeChamps: ListeChamps, listeFilters: ListeFilters, listeOperateurs: ListeOperateurs, listeTypes: ListeTypes, options?) {
        //         this.listeChamps = listeChamps;
        //         this.listeFilters = listeFilters;
        //         this.listeOperateurs = listeOperateurs;
        //         this.listeTypes = listeTypes;
        //         this.options = options || {};
        //     }
        //     createContainer() {
        //         let that = this;
        //         let _html = [
        //             '<div class="row">',
        //             '<div class="col-sm-4 champ-list">',
        //             '</div>',
        //             '<div class="col-sm-8 filter-edit">',
        //             '</div>',
        //             '</div>',
        //             '<div class="row">',
        //             '<div class="col-sm-12 filter-list">',
        //             '</div>',
        //             '</div>'
        //         ];
        //         that.container = document.createElement("div");
        //         _dom.addClass(that.container, "filter-view");
        //         that.container.innerHTML = _html.join("");
        //         that.champListView = _dom.query(that.container, ".champ-list");
        //         that.filterListView = _dom.query(that.container, ".filter-list");
        //         that.filterEditView = _dom.query(that.container, ".filter-edit");
        //     }
        //     render() {
        //         let that = this;
        //         that.createContainer();
        //         if (that.listeChamps.gets().length) {
        //             that.showChampList();
        //             that.selecteChamp(that, that.listeChamps.gets()[0].code);
        //         }
        //         return that.container;
        //     }
        //     showChampList() {
        //         let that = this;
        //         let list = document.createElement("select");
        //         list.multiple = false;
        //         _dom.attr(list, "size", that.options.listSize || "7");
        //         _dom.addClass(list, "form-control");
        //         list.addEventListener("change", function(event) {
        //             let target = <HTMLSelectElement> event.target;
        //             that.selecteChamp(that, (<HTMLOptionElement>target.options[target.selectedIndex]).value);
        //         }, false);
        //         _dom.append(that.champListView, list);
        //         let option = document.createElement("option");
        //         that.listeChamps && that.listeChamps.gets().forEach(function(champ, key) {
        //             let optionClone = <HTMLOptionElement> option.cloneNode(true);
        //             optionClone.value = champ.code;
        //             optionClone.textContent = champ.libelle;
        //             _dom.append(list, optionClone);
        //         });
        //     }
        //     selecteChamp(that, codeChamp) {
        //         let select = <HTMLSelectElement> _dom.query(that.champListView, 'select');
        //         let length = select.options.length;
        //         for (var i = 0; i < length; i++) {
        //             let option = <HTMLOptionElement>select.options.item(i);
        //             if (option.selected) option.selected = false;
        //         }
        //         let newOption = <HTMLOptionElement> _dom.query(that.champListView, 'option[value="' + codeChamp + '"]');
        //         if (newOption) newOption.selected = true;
        //         that.updateFilter(that, codeChamp);
        //         let filters = that.listeFilters.getsByChamp(codeChamp);
        //         let filter = null;
        //         if (filters && filters.length)
        //             filter = filters[0];
        //         that.showFilterList(that, filter);
        //     }
        //     showFilterList(that, filter?) {
        //         let editView = new FilterListView(that.listeChamps, that.listeFilters, that.listeOperateurs, function(action, data) {
        //             if (action == "EDIT") {
        //                 let filter = that.listeFilters.get(data.id);
        //                 if (filter)
        //                     that.selecteChamp(that, filter.code);
        //             }
        //             else
        //                 that.removeFilter(that, data.id);
        //         }, filter);
        //         _dom.empty(that.filterListView);
        //         editView.render(that.filterListView);
        //     }
        //     updateFilter(that, codeChamp) {
        //         let champ = that.listeChamps.get(codeChamp);
        //         let filters = that.listeFilters.getsByChamp(codeChamp);
        //         let filter = null;
        //         if (filters && filters.length)
        //             filter = filters[0];
        //         let editView = new FilterEditView(champ, that.listeFilters, that.listeOperateurs, that.listeTypes, function(data) {
        //             that.addFilter(that, data);
        //         }, filter, that.options);
        //         _dom.empty(that.filterEditView);
        //         editView.render(that.filterEditView);
        //     }
        //     addFilter(that, data) {
        //         let filters = that.listeFilters.getsByChamp(data.code);
        //         let filter;
        //         if (!that.options.multiple && filters && filters.length)
        //             filter = that.listeFilters.set(filters[0].id, data);
        //         else
        //             filter = that.listeFilters.add(data.code, data.op, data.values);
        //         that.showFilterList(that, filter);
        //     }
        //     removeFilter(that, codeFilter) {
        //         let codeChamp = that.listeFilters.get(codeFilter).code;
        //         that.listeFilters.remove(codeFilter);
        //         that.selecteChamp(that, codeChamp);
        //         that.showFilterList(that);
        //     }
        // }
        var RenderModel1 = (function () {
            function RenderModel1(listeChamps, listeFilters, listeOperateurs, listeTypes, options) {
                this.listeChamps = listeChamps;
                this.listeFilters = listeFilters;
                this.listeOperateurs = listeOperateurs;
                this.listeTypes = listeTypes;
                this.options = options || {};
            }
            RenderModel1.prototype.createContainer = function () {
                var that = this;
                var _html = [
                    '<div class="row">',
                    '<div class="col-sm-4 champ-list">',
                    '</div>',
                    '<div class="col-sm-8 filter-edit">',
                    '</div>',
                    '</div>',
                    '<div class="row">',
                    '<div class="col-sm-12 filter-list">',
                    '</div>',
                    '</div>'
                ];
                that.container = document.createElement("div");
                _dom.addClass(that.container, "filter-view");
                that.container.innerHTML = _html.join("");
                that.champListView = _dom.query(that.container, ".champ-list");
                that.filterListView = _dom.query(that.container, ".filter-list");
                that.filterEditView = _dom.query(that.container, ".filter-edit");
            };
            RenderModel1.prototype.render = function () {
                var that = this;
                that.createContainer();
                if (that.listeChamps.gets().length) {
                    that.showChampList();
                    that.selecteChamp(that, that.listeChamps.gets()[0].code);
                }
                return that.container;
            };
            RenderModel1.prototype.showChampList = function () {
                var that = this;
                var list = $('<div class="list-group"></div>').get(0);
                list.addEventListener("click", function (event) {
                    item = event.target;
                    if (item["href"]) {
                        var href = _dom.attr(item, 'href');
                        if (href === '#') {
                            event.preventDefault();
                            event.stopPropagation();
                        }
                    }
                    var champCode = _dom.attr(item, "data-code");
                    if (champCode)
                        that.selecteChamp(that, champCode);
                }, false);
                var listHeightSize = 70 * (that.options.listSize || 7);
                var containerScroll = $('<div style="overflow-y:auto;max-height:' + listHeightSize + 'px;"></div>').get(0);
                _dom.append(containerScroll, list);
                _dom.append(that.champListView, containerScroll);
                var item = $('<a href="#" class="list-group-item"></a>').get(0);
                that.listeChamps && that.listeChamps.gets().forEach(function (champ, key) {
                    var itemClone = item.cloneNode(true);
                    _dom.attr(itemClone, "data-code", champ.code);
                    _dom.text(itemClone, champ.libelle);
                    _dom.append(list, itemClone);
                });
            };
            RenderModel1.prototype.selecteChamp = function (that, codeChamp) {
                var oldItem = _dom.query(that.champListView, ".active");
                var newItem = _dom.query(that.champListView, 'a[data-code="' + codeChamp + '"]');
                if (oldItem)
                    _dom.removeClass(oldItem, "active");
                if (newItem)
                    _dom.addClass(newItem, "active");
                that.updateFilter(that, codeChamp);
                var filters = that.listeFilters.getsByChamp(codeChamp);
                var filter = null;
                if (filters && filters.length)
                    filter = filters[0];
                that.showFilterList(that, filter);
            };
            RenderModel1.prototype.showFilterList = function (that, filter) {
                var editView = new FilterListView(that.listeChamps, that.listeFilters, that.listeOperateurs, function (action, data) {
                    if (action == "EDIT") {
                        var filter_1 = that.listeFilters.get(data.id);
                        if (filter_1)
                            that.selecteChamp(that, filter_1.code);
                    }
                    else if (action == "REMOVE")
                        that.removeFilter(that, data.id);
                    else if (action == "VALIDE")
                        that.valideFilters();
                }, that.options, filter);
                _dom.empty(that.filterListView);
                editView.render(that.filterListView);
            };
            RenderModel1.prototype.updateFilter = function (that, codeChamp) {
                var champ = that.listeChamps.get(codeChamp);
                var filters = that.listeFilters.getsByChamp(codeChamp);
                var filter = null;
                if (filters && filters.length)
                    filter = filters[0];
                var editView = new FilterEditView(champ, that.listeFilters, that.listeOperateurs, that.listeTypes, function (data) {
                    that.addFilter(that, data);
                }, filter, that.options);
                _dom.empty(that.filterEditView);
                editView.render(that.filterEditView);
            };
            RenderModel1.prototype.addFilter = function (that, data) {
                var filters = that.listeFilters.getsByChamp(data.code);
                var filter;
                if (!that.options.multiple && filters && filters.length)
                    filter = that.listeFilters.set(filters[0].id, data);
                else
                    filter = that.listeFilters.add(data.code, data.op, data.values);
                that.showFilterList(that, filter);
            };
            RenderModel1.prototype.removeFilter = function (that, codeFilter) {
                var codeChamp = that.listeFilters.get(codeFilter).code;
                that.listeFilters.remove(codeFilter);
                that.selecteChamp(that, codeChamp);
            };
            RenderModel1.prototype.valideFilters = function () { };
            return RenderModel1;
        }());
        var RenderModel2 = (function (_super) {
            __extends(RenderModel2, _super);
            function RenderModel2(listeChamps, listeFilters, listeOperateurs, listeTypes, options, callback) {
                options.btnValidate = true;
                _super.call(this, listeChamps, listeFilters, listeOperateurs, listeTypes, options);
                this._callback = callback;
            }
            RenderModel2.prototype.createContainer = function () {
                var that = this;
                var _html = [
                    '<div class="row">',
                    '<div class="col-sm-12 filter-list">',
                    '</div>',
                    '</div>',
                    '<div class="row">',
                    '<div class="col-xs-12">',
                    '<h5 class="bs-block-title" data-ignore="true">' + (that.options.title || "Filtre") + '</h5>',
                    '</div>',
                    '</div>',
                    '<div class="row">',
                    '<div class="col-sm-4 champ-list">',
                    '</div>',
                    '<div class="col-sm-8 filter-edit">',
                    '</div>',
                    '</div>'
                ];
                that.container = document.createElement("div");
                _dom.addClass(that.container, "filter-view");
                that.container.innerHTML = _html.join("");
                that.champListView = _dom.query(that.container, ".champ-list");
                that.filterListView = _dom.query(that.container, ".filter-list");
                that.filterEditView = _dom.query(that.container, ".filter-edit");
            };
            RenderModel2.prototype.valideFilters = function () {
                this._callback("VALIDE");
            };
            return RenderModel2;
        }(RenderModel1));
        var TagView = (function (_super) {
            __extends(TagView, _super);
            function TagView(fp, options, form) {
                _super.call(this, fp, options, form);
                var that = this;
                form.registerListenerFor(that.$bind + ".$item", that);
                this._state();
            }
            TagView.prototype._state = function () {
                var that = this;
                that.state = that.state || {};
                var state = that.form.getState(that.$bind);
                Object.keys(state).forEach(function (pn) {
                    that.state[pn] = state[pn];
                });
                that.state.value = that.form.getValue(that.$bind);
            };
            TagView.prototype.click = function (event) {
                var that = this;
                var target = event.target;
                if (target.nodeName.toUpperCase() == "LI" || target.nodeName.toUpperCase() == "I") {
                    var tag = target;
                    if (target.nodeName.toUpperCase() == "I")
                        tag = _dom.parentByTag(that.$element.get(0), target, "LI");
                    var tagId_1 = -1;
                    if (tag)
                        tagId_1 = parseInt(_dom.attr(tag, "data-id"), 10);
                    if (tagId_1 < 0)
                        return;
                    tag = null;
                    var model_2 = null;
                    that.state.value.forEach(function (item, index) {
                        if (item.code == tagId_1) {
                            model_2 = item.model();
                            return false;
                        }
                    });
                    if (!model_2)
                        return;
                    var btnType = _dom.attr(target, "data-id");
                    if (btnType == "REMOVE")
                        that.form.execAction("remove", model_2);
                    else
                        that.form.execAction("upd", model_2);
                }
            };
            TagView.prototype._state2UI = function () {
                var that = this;
                that.createContainer(that.id);
                that.state.value && that.state.value.forEach(function (tag) {
                    that.addTag(tag);
                });
            };
            TagView.prototype.destroy = function () {
                var that = this;
                that.form.unRegisterListenerFor(that.$bind + ".$item", that);
                _super.prototype.destroy.call(this);
            };
            TagView.prototype.changed = function (propName, ov, nv, op, obj) {
                var that = this;
                if (op == "add") {
                    that.addTag(nv);
                }
                else if (op == "remove") {
                    that.removeTag(obj.$value.code);
                }
            };
            TagView.prototype.stateChanged = function (propName, params) {
                var that = this, state = that.form.getState(that.$bind), element = that.$element ? that.$element.get(0) : null;
                if (element && state.isHidden !== that.state.isHidden) {
                    that.state.isHidden = state.isHidden;
                    that.setHidden(element);
                }
            };
            TagView.prototype.addTag = function (tag) {
                var that = this;
                var item = document.createElement("li");
                _dom.addClass(item, "item");
                _dom.addClass(item, "boxed-tags-item");
                _dom.addClass(item, "bs-cursor-p");
                _dom.addClass(item, "btn-primary");
                if (tag.selected)
                    _dom.addClass(item, "focus");
                _dom.attr(item, "data-id", tag.code);
                //item.innerHTML = tag.libelle + ' <i data-id="UPDATE" class="glyphicon glyphicon-pencil" ></i><i data-id="REMOVE" class="glyphicon glyphicon-remove" ></i>';
                item.innerHTML = tag.libelle + ' <i data-id="REMOVE" class="glyphicon glyphicon-remove" ></i>';
                _dom.append(that.$element.get(0), item);
            };
            TagView.prototype.removeTag = function (id) {
                var that = this;
                var tag = _dom.query(that.$element.get(0), 'li[data-id="' + id + '"]');
                _dom.remove(tag);
            };
            TagView.prototype.createContainer = function (id) {
                var that = this;
                that.$element = $(_utils.format('<ul id="{0}" data-render="{0}" class="boxed-tags" draggable="true"></ul>', id));
            };
            TagView.prototype.render = function ($parent) {
                var that = this;
                var opts = that._initOptions(_ui.Utils.defaultOptions);
                if (!that.$element) {
                    that.setEvents(null);
                    that._state2UI();
                }
                that.appendElement($parent, opts);
                return that.$element;
            };
            return TagView;
        }(ui.AbsField));
        _ui.registerControl(TagView, "array", false, 'tagview');
        //export class CheckBoxElement {
        //    config: any;
        //    data: any;
        //    props: any;
        //    protected $element;
        //    protected options;
        //    constructor(config, options?) {
        //        let that = this;
        //        that.config = config || {};
        //        that.options = that.options || {};
        //        that.data = {
        //            value: config.value
        //        };
        //        that.props = {};
        //        that._defineProps();
        //    }
        //    private _defineProps(): void {
        //        let that = this, _dp = utils.defineProperty;
        //        _dp("value", that);
        //    }
        //    private _notifyChange(propertyName: string): void {
        //        var that = this;
        //        switch (propertyName) {
        //            case "value":
        //                that.update();
        //                break;
        //        }
        //    }
        //    protected createElement(index, config, data) {
        //        let css = ["bs-button btn"];
        //        if (config.type)
        //            css.push('btn-' + config.type);
        //        if (config.right)
        //            css.push("pull-right");
        //        let html = [
        //            '<button tool="' + index + '" type="button" class="' + css.join(" ") + '">',
        //            (config.icon ? '<span class="' + _dom.iconClass(config.icon) + '"></span>' : ''),
        //            (config.title ? '&nbsp;' + config.title : ''),
        //            '</button>'
        //        ];
        //        return html.join('');
        //    }
        //    protected update() { }
        //    public render($parent) {
        //        let that = this;
        //        if (!that.$element) {
        //            that.$element = $(that.createElement(that.config.id, that.config, that.data.value));
        //        }
        //        if ($parent)
        //            _dom.append($parent.get(0), that.$element.get(0));
        //        return that.$element;
        //    }
        //    public destroy(): void {
        //        var that = this;
        //        that.$element = null;
        //        that.options = null;
        //        that.config = null;
        //    }
        //}
        var CheckBoxList = (function () {
            function CheckBoxList(options) {
                var that = this;
                that.options = options || {};
                that._elements = [];
                that._values = [];
            }
            Object.defineProperty(CheckBoxList.prototype, "elements", {
                get: function () {
                    return this._elements;
                },
                set: function (value) {
                    if (value) {
                        this._elements = value;
                        this._notifyChange("elements");
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CheckBoxList.prototype, "values", {
                get: function () {
                    return this._values;
                },
                set: function (value) {
                    if (value) {
                        this._values = value;
                        this._notifyChange("values");
                    }
                },
                enumerable: true,
                configurable: true
            });
            CheckBoxList.prototype._notifyChange = function (propName) {
                var that = this;
                switch (propName) {
                    case "elements":
                        _dom.empty(that.$element.get(0));
                        that.renderElements(that.elements || [], that.values || [], that.options || {});
                        break;
                }
            };
            CheckBoxList.prototype.findVal = function (val) {
                var index = -1;
                this.values.forEach(function (item, i) {
                    if (item == val) {
                        index = i;
                        return false;
                    }
                });
                return index;
            };
            CheckBoxList.prototype.render = function ($parent) {
                var that = this;
                if (!that.$element) {
                    that.$element = $('<div class="row bs-checkboxlist"></div>');
                    that.renderElements(that.elements, that.values, that.options);
                    that.setEvents(null);
                }
                if ($parent) {
                    if (that.options.replaceParent)
                        $parent.replaceWith(that.$element);
                    else
                        $parent.append(that.$element);
                }
                return that.$element;
            };
            CheckBoxList.prototype.destroy = function () {
                var that = this;
                that._removeEvents();
                that.$element = null;
                that.options = null;
            };
            CheckBoxList.prototype.removeVal = function (val) {
                var that = this;
                var index = that.findVal(val);
                if (index >= 0)
                    that.values.splice(index, 1);
            };
            CheckBoxList.prototype.addVal = function (val) {
                this.values.push(val);
            };
            CheckBoxList.prototype.setEvents = function (opts) {
                var that = this;
                if (that.$element) {
                    that.$element.on('click', function (event) {
                        if (that.options.isDisabled || that.options.isReadOnly)
                            return;
                        var row = _dom.parentByClass(that.$element.get(0), event.target, "bs-checkboxlist-list");
                        if (!row)
                            return;
                        that._toggleEnumByIndex(_dom.indexOf(row.parentNode, row));
                    });
                }
            };
            CheckBoxList.prototype._removeEvents = function () {
                var that = this;
                if (that.$element)
                    that.$element.off('click');
            };
            CheckBoxList.prototype.renderElements = function (elements, values, options) {
                var that = this;
                var f = document.createDocumentFragment();
                if (!elements.length) {
                    var e = $('<center><div class="bs-lv-nodata">Aucun résultat trouvé ...</div></center>').get(0);
                    _dom.append(f, e);
                }
                else {
                    options = options || {};
                    //let e: HTMLElement = $('<div tabindex="0" class="bs-checkboxlist-list checkbox-inline"><div class="bs-checkboxlist-list-check"><a><center><span class="' + _dom.iconClass('square-o') + '"></span></center></a></div><div class="bs-checkboxlist-list-title"></div></div>').get(0);
                    var e_1 = $('<div tabindex="0" class="bs-checkboxlist-list col-lg-6 col-xs-12 checkbox-inline"><div class="bs-checkboxlist-list-check"><a><span class="' + _dom.iconClass('square-o') + '"></span></a></div><div class="bs-checkboxlist-list-title"></div></div>').get(0);
                    elements.forEach(function (en, index) {
                        var ii = e_1.cloneNode(true);
                        if (options.disabled) {
                            _dom.attr(ii, "tabindex", "-1");
                            _dom.removeClass(ii, "bs-pointer");
                            _dom.addClass(ii, "bs-cursor-disabled");
                        }
                        else {
                            _dom.attr(ii, "tabindex", "0");
                            _dom.addClass(ii, "bs-pointer");
                            _dom.removeClass(ii, "bs-cursor-disabled");
                        }
                        var check = ii.firstChild.firstChild.firstChild;
                        check.className = (values && values.indexOf(en.code) >= 0) ? _dom.iconClass("check-square-o") : _dom.iconClass("square-o");
                        var tparent = ii.lastChild;
                        _dom.append(tparent, document.createTextNode(en.libelle)),
                            _dom.append(f, ii);
                    });
                }
                _dom.append(that.$element.get(0), f);
            };
            CheckBoxList.prototype._inputs = function () {
                return this.$element.get(0);
            };
            CheckBoxList.prototype._setItemValue = function (item, value) {
                var check = item.firstChild.firstChild.firstChild;
                check.className = value ? _dom.iconClass("check-square-o") : _dom.iconClass("square-o");
            };
            CheckBoxList.prototype._toggleEnumByIndex = function (index) {
                var that = this;
                if (index >= 0 && index < that.elements.length) {
                    var e = that.elements[index];
                    var ii = that.findVal(e.code);
                    var inputs = that._inputs();
                    if (ii >= 0) {
                        that._setItemValue(inputs.childNodes[index], false);
                        that.removeVal(e.code);
                        if (that.options.onSelectItem)
                            that.options.onSelectItem("remove", { id: index, value: e, data: e });
                    }
                    else {
                        that._setItemValue(inputs.childNodes[index], true);
                        that.addVal(e.code);
                        if (that.options.onSelectItem)
                            that.options.onSelectItem("add", { id: index, value: e, data: e });
                    }
                }
            };
            return CheckBoxList;
        }());
        ui.CheckBoxList = CheckBoxList;
        var LookupList = (function (_super) {
            __extends(LookupList, _super);
            function LookupList(fp, options, form) {
                _super.call(this, fp, options, form);
                var that = this;
                form.registerListenerFor(that.$bind + ".$item", that);
                this._state();
            }
            LookupList.prototype._state = function () {
                var that = this;
                that.state = that.state || {};
                var state = that.form.getState(that.$bind);
                Object.keys(state).forEach(function (pn) {
                    that.state[pn] = state[pn];
                });
                that.state.value = that.form.getValue(that.$bind);
            };
            LookupList.prototype.click = function (event) {
            };
            LookupList.prototype._state2UI = function () {
            };
            LookupList.prototype.destroy = function () {
                var that = this;
                that.form.unRegisterListenerFor(that.$bind + ".$item", that);
                _super.prototype.destroy.call(this);
            };
            LookupList.prototype.changed = function (propName, ov, nv, op, obj) {
                //let that = this;
                //that._list.values = that._getValues();
            };
            LookupList.prototype.stateChanged = function (propName, params) {
            };
            LookupList.prototype._createContainer = function (id, authoring, title, options) {
                var that = this;
                var html = [
                    '<div id="{0}" data-render="{0}">',
                    '<label for="{0}_input" id="{0}_label" class="' + (!title ? "bs-none" : "") + '">' + (title || '') + '</label>',
                    '<div id="{0}_toolbar"></div>',
                    '<br />',
                    '<div id="{0}_list"></div>',
                    '<center id="{0}_paginer"></center>',
                    '</div>'
                ];
                return _utils.format(html.join(''), id);
            };
            LookupList.prototype._onSelectToolElement = function (toolElement) {
                var that = this;
                if (toolElement.name === "search")
                    that._lookup.search(toolElement.value);
            };
            LookupList.prototype.createToolBar = function (id, options) {
                var that = this;
                if (!that.$element)
                    return;
                if (!that._toolbar) {
                    var toolElements = [{
                            "name": "search",
                            "type": "search",
                            "right": false
                        }];
                    options = $.extend({ selectToolElement: that._onSelectToolElement.bind(that) });
                    that._toolbar = new _ui.ToolBar(toolElements, options);
                    var container = _dom.query(that.$element.get(0), "#" + id + "_toolbar");
                    if (!container)
                        return;
                    that._toolbar.render($(container));
                }
            };
            LookupList.prototype._onSelectPaginer = function (page) {
                var that = this;
                switch (page) {
                    case "next":
                        that._lookup.nextPage();
                        break;
                    case "prev":
                        that._lookup.prevPage();
                        break;
                    case "first":
                        that._lookup.firthPage();
                        break;
                    case "last":
                        that._lookup.lastPage();
                        break;
                    default:
                        that._lookup.toPage(page - 1);
                        break;
                }
            };
            LookupList.prototype.createPaginer = function (id, options) {
                var that = this;
                if (!that.$element)
                    return;
                if (!that._pager) {
                    options = $.extend({ size: "default", boundaryLinks: true, selectPage: that._onSelectPaginer.bind(that) }, options);
                    that._pager = new _ui.Pager(options);
                    var container = _dom.query(that.$element.get(0), "#" + id + "_paginer");
                    if (!container)
                        return;
                    that._pager.render($(container));
                }
                var p = that._pager;
                p.props.totalPages = that._lookup.getNbPages();
                p.props.currentPage = that._lookup.currentPage() + 1;
            };
            LookupList.prototype._onSelectCheckBoxList = function (action, data) {
                var that = this;
                if (action === "add")
                    that.state.value.push({ code: data.value.code, lib: data.value.libelle });
                else if (action === "remove")
                    that.state.value.remove(that.state.value.find("code", data.value.code));
            };
            LookupList.prototype._getValues = function () {
                var that = this;
                var ld = $.extend(true, {}, that.state.value);
                ld._items = ld._items.map(function (item) {
                    return item.code;
                });
                return ld._items;
            };
            LookupList.prototype.createList = function (id, options) {
                var that = this;
                if (!that.$element)
                    return;
                if (!that._list) {
                    that._list = new _ui.CheckBoxList({ onSelectItem: that._onSelectCheckBoxList.bind(that) });
                    that._list.values = that._getValues();
                    var container = _dom.query(that.$element.get(0), "#" + id + "_list");
                    if (!container)
                        return;
                    that._list.render($(container));
                }
            };
            LookupList.prototype.createLookup = function (options) {
                var that = this;
                if (that.$schema.ds) {
                    var notify = function (data, options) {
                        options = options || {};
                        if (options.inited && options.updated)
                            that._lookup.firthPage();
                        else if (data) {
                            if (that.$schema.ds.data.$params.$search)
                                that.createToolBar(that.id, {});
                            that.createList(that.id, {});
                            that._list.elements = data;
                            that.createPaginer(that.id, that.renderOptions.pager);
                        }
                    };
                    that._lookup = new _ui.DsLookup(that.$schema.ds, { notify: notify });
                }
            };
            LookupList.prototype.render = function ($parent) {
                var that = this;
                var opts = that._initOptions(_ui.Utils.defaultOptions);
                if (!that.$element) {
                    that.setEvents(null);
                    that.$element = $(that._createContainer(that.id, _ulocale.tt(that.$schema.title, that.form.$locale), that.options.design, opts));
                    that.createLookup({});
                    that._state2UI();
                }
                that.appendElement($parent, opts);
                return that.$element;
            };
            return LookupList;
        }(ui.AbsField));
        _ui.registerControl(LookupList, "array", false, 'lookup-list', null);
        var ComposantFilter = (function (_super) {
            __extends(ComposantFilter, _super);
            function ComposantFilter(fp, options, form) {
                _super.call(this, fp, options, form);
                this.renderInternal = function (context, options) {
                    var that = this;
                    if (!that.$element)
                        return;
                    var view;
                    switch (options["renderModel"]) {
                        case "model2":
                            view = new RenderModel2(that.listeChamps, that.listeFilters, that.listeOperateurs, that.listeTypes, options, function (action, data) {
                                if (action == "VALIDE")
                                    that.form.execAction("validate", {});
                            });
                            break;
                        default:
                            view = new RenderModel1(that.listeChamps, that.listeFilters, that.listeOperateurs, that.listeTypes, options);
                    }
                    _dom.append(that.$element.get(0), view.render());
                };
                this.createContainer = function (id) {
                    return _utils.format('<div id="{0}" data-render="{0}" class="bs-filter"></div>', id);
                };
                this._state();
                this.options = options || {};
                this.initData();
            }
            ComposantFilter.prototype.initData = function () {
                var that = this;
                // reporter sur un fichier json les labels
                that.listeOperateurs = new ListeOperateurs();
                that.listeOperateurs.add("in", "égal à", false, { symbol: "=" });
                that.listeOperateurs.add("nin", "différent de", false, { symbol: "!=" });
                that.listeOperateurs.add("gt", "supérieur à", false, { symbol: ">" });
                that.listeOperateurs.add("ge", "supérieur ou égal à", false, { symbol: ">=" });
                that.listeOperateurs.add("lt", "inférieur à", false, { symbol: "<" });
                that.listeOperateurs.add("le", "inférieur ou égal à", false, { symbol: "<=" });
                that.listeOperateurs.add("between", "entre", true, { symbol: "entre" });
                that.listeOperateurs.add("nbetween", "pas entre", true, { symbol: "pas entre" });
                that.listeOperateurs.add("like", "contient", false, { symbol: "contient" });
                that.listeOperateurs.add("nlike", "ne contient pas", false, { symbol: "ne contient pas" });
                that.listeOperateurs.add("vide", "vide", false, { symbol: "est vide" });
                that.listeOperateurs.add("nvide", "pas vide", false, { symbol: "n'est pas vide" });
                that.listeTypes = new ListeTypes();
                that.listeTypes.addType("decimal", "Décimal", ["in", "nin", "gt", "ge", "lt", "le", "between", "nbetween", "vide", "nvide"]);
                that.listeTypes.addType("money", "Money", ["in", "nin", "gt", "ge", "lt", "le", "between", "nbetween", "vide", "nvide"]);
                that.listeTypes.addType("integer", "Entier", ["in", "nin", "gt", "ge", "lt", "le", "between", "nbetween", "vide", "nvide"]);
                that.listeTypes.addType("date", "Date", ["in", "nin", "gt", "ge", "lt", "le", "between", "nbetween", "vide", "nvide"]);
                that.listeTypes.addType("string", "Chaîne de caractères", ["in", "nin", "like", "nlike", "vide", "nvide"]);
                that.listeTypes.addType("enum", "Enum", ["in", "nin", "vide", "nvide"]);
                that.listeTypes.addType("lookup", "Lookup", ["in", "nin", "vide", "nvide"]);
                that.listeTypes.addType("boolean", "Booléen", ["in", "nin", "vide", "nvide"]);
                that.listeChamps = new ListeChamps();
                var champs = that.state.value && that.state.value.champs ? that.state.value.champs : [];
                champs.forEach(function (item) {
                    var options = {};
                    if (item.lookup) {
                        options["lookupSchema"] = _sutils.getLookup(that.$bind, item.lookup, that.$schema);
                        options["lookup"] = item.lookup;
                        options["format"] = "lookup";
                    }
                    else if (item.enum && item.enum.length) {
                        options["enum"] = item.enum;
                        options["enumName"] = item.enumName;
                        options["format"] = "enum";
                    }
                    else if (item.type === "boolean") {
                        options["enum"] = [{ code: "true", libelle: "Vrai" }, { code: "false", libelle: "Faux" }];
                        options["format"] = "enum";
                    }
                    else
                        options["decimals"] = item.decimals;
                    that.listeChamps.add(item.code, item.libelle, item.type, options);
                });
                var filters = that.state.value && that.state.value.filters ? that.state.value.filters : [];
                that.listeFilters = new ListeFilters(filters);
                filters.forEach(function (item) {
                    var values = [];
                    item.values.forEach(function (value) {
                        values.push(value);
                    });
                    var values2 = [];
                    if (item.values2) {
                        item.values2.forEach(function (value) {
                            values2.push(value);
                        });
                    }
                    that.listeFilters.add2(item.code, item.op, values2.length ? values2 : values);
                });
            };
            ComposantFilter.prototype._state = function () {
                var that = this;
                that.state = that.state || {};
                var state = that.form.getState(that.$bind);
                Object.keys(state).forEach(function (pn) {
                    that.state[pn] = state[pn];
                });
                that.state.value = that.form.getValue(that.$bind);
            };
            ComposantFilter.prototype.click = function (event) { };
            ComposantFilter.prototype._setDisabled = function (input, element) { };
            ComposantFilter.prototype._setReadOnly = function (input, element) { };
            ComposantFilter.prototype._setMandatory = function (input, element) { };
            ComposantFilter.prototype._state2UI = function () { };
            ComposantFilter.prototype.changed = function (propName, ov, nv, op) { };
            ComposantFilter.prototype.stateChanged = function (propName, params) { };
            ComposantFilter.prototype.render = function ($parent) {
                var that = this;
                var opts = that._initOptions(_ui.Utils.defaultOptions);
                if (!that.$element) {
                    that.$element = $(that.createContainer(that.id));
                    _dom.empty(that.$element.get(0));
                    opts.id = that.id;
                    opts.title = that.$schema.title || "";
                    opts = $.extend(true, opts, that.renderOptions);
                    that.renderInternal({ data: that.state.value }, opts);
                    that.setEvents(null);
                    that._state2UI();
                }
                that.appendElement($parent, opts);
                return that.$element;
            };
            ComposantFilter.prototype.destroy = function () {
                _super.prototype.destroy.call(this);
            };
            return ComposantFilter;
        }(ui.AbsField));
        ui.ComposantFilter = ComposantFilter;
        _ui.registerControl(ComposantFilter, "object", false, 'filter');
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../js/core/core.ts" />
/// <reference path="../../js/ui/form/modalform.control.ts" />
var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        var _ui = ui;
        var _addField2 = function (fieldList, code, libelle, type, options) {
            options = options || {};
            var champ = {
                code: code,
                libelle: libelle,
                type: type,
                decimals: options.decimals,
                enum: options.enum,
                enumName: options.enumName,
                lookup: options.lookup
            };
            fieldList.push(champ);
        }, _addField = function (fieldList, code, libelle, type, decimals, enums, enumName) {
            var options = {};
            options["decimals"] = decimals;
            options["enum"] = enums;
            options["enumName"] = enumName;
            _addField2(fieldList, code, libelle, type, options);
        }, _toPhenix = function (champs, filters) {
            var constructeOdata = function (oFilters, op) {
                var tmpFilters = [];
                var isImpair = oFilters.length % 2 != 0;
                var length = isImpair ? oFilters.length - 1 : oFilters.length;
                for (var i = 0; i < length; i += 2) {
                    tmpFilters.push({ $left: oFilters[i], $op: op, $right: oFilters[i + 1] });
                }
                if (isImpair)
                    tmpFilters.push(oFilters[oFilters.length - 1]);
                if (tmpFilters.length >= 2)
                    tmpFilters = constructeOdata(tmpFilters, op);
                return tmpFilters;
            };
            var constructeFilter = function (filter) {
                var champ = champs.find(function (item) { return item.code == filter.code; });
                var op = filter.op == "in" ? "eq" : filter.op;
                op = op == "nin" ? "ne" : op;
                var values = filter.values.map(function (item) {
                    if (item.code)
                        return item.code;
                    return item;
                });
                if (op == "between" || op == "nbetween") {
                    if (op == "between")
                        return between(filter.code, champ.type, values[0], values[1]);
                    else
                        return { $op: "not", $right: between(filter.code, champ.type, values[0], values[1]) };
                }
                else {
                    values = values.map(function (item) {
                        var value = null;
                        switch (op) {
                            case "like":
                                value = like(filter.code, champ.type, item);
                                break;
                            case "nlike":
                                value = { $op: "not", $right: like(filter.code, champ.type, item) };
                                break;
                            case "vide":
                                value = { $left: filter.code, $op: "eq", $right: { type: "string", value: '' } };
                                break;
                            case "nvide":
                                value = { $left: filter.code, $op: "ne", $right: { type: "string", value: '' } };
                                break;
                            default:
                                value = { $left: filter.code, $op: op, $right: { type: champ.type, value: item } };
                        }
                        return value;
                    });
                    return constructeOdata(values, "or")[0];
                }
                function between(code, type, value1, value2) {
                    return {
                        $left: { $left: code, $op: "ge", $right: { type: type, value: value1 } },
                        $op: "and",
                        $right: { $left: code, $op: "le", $right: { type: type, value: value2 } }
                    };
                }
                function like(code, type, value) {
                    return {
                        $left: 'contains(' + code + ', \'' + value + '\')',
                        $op: "eq",
                        $right: true
                    };
                }
            };
            var oFilters = [];
            filters.forEach(function (filter) {
                oFilters.push(constructeFilter(filter));
            });
            return constructeOdata(oFilters, "and")[0];
        };
        ui.filterData = {
            filter: {
                champs: [],
                filters: []
            }
        };
        _ui["glbGridFilter"] = function (filtrableColumns, documents, locale) {
            if (!filtrableColumns.length)
                return;
            var layout = {
                "name": "filtre",
                "$type": "block",
                "$items": [
                    {
                        "$type": "block",
                        "$items": [
                            {
                                "$bind": "filter",
                                "$widget": "filter",
                                "options": {
                                    "renderModel": "model1"
                                }
                            }
                        ]
                    }
                ],
                "form": true
            };
            var model = {
                "type": "object",
                "properties": {
                    "filter": {
                        "type": "object",
                        "title": "Filtre",
                        "properties": {
                            "champs": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "code": { "type": "string" },
                                        "libelle": { "type": "string" },
                                        "type": { "type": "string" },
                                        "decimals": { "type": "number" },
                                        "enumName": { "type": "string" },
                                        "enum": {
                                            "type": "array",
                                            "items": {
                                                "type": "object",
                                                "properties": {
                                                    "code": { "type": "string" },
                                                    "libelle": { "type": "string" }
                                                }
                                            }
                                        },
                                        "lookup": {
                                            "type": "string"
                                        }
                                    }
                                }
                            },
                            "filters": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "code": { "type": "string" },
                                        "op": { "type": "string" },
                                        "values": {
                                            "type": "array",
                                            "items": {
                                                "type": "string"
                                            }
                                        },
                                        "values2": {
                                            "type": "array",
                                            "items": {
                                                "type": "object",
                                                "properties": {
                                                    "code": {
                                                        "type": "string"
                                                    },
                                                    "lib": {
                                                        "type": "string"
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            };
            if (ui.filterData.filter.champs.length)
                ui.filterData.filter.champs.splice(0);
            filtrableColumns.forEach(function (item) {
                var sc = $.extend(true, {}, item.schema);
                switch (sc.type) {
                    case "number":
                        if (sc.decimals > 0)
                            sc.type = "decimal";
                        else
                            sc.type = "integer";
                        break;
                }
                if (item.schema.enum) {
                    sc.enum = item.schema.enum.map(function (en, i) {
                        return { code: en, libelle: item.schema.enumNames[i] || en };
                    });
                }
                _ui.filter.addField2(ui.filterData.filter.champs, item.name, sc.title, sc.type, { decimals: sc.decimals, enum: sc.enum });
            });
            var opts = { "title": "Filtre", "buttons": [{ "pattern": "validate" }] };
            _ui.OpenModalForm(opts, layout, model, ui.filterData, locale, function (form, action, model, formControl) {
                switch (action.property) {
                    case "validate":
                        if (!model.validate())
                            return;
                        ui.filterData = model.model();
                        var $filter = null;
                        if (ui.filterData.filter.filters.length)
                            $filter = _ui.filter.format.toPhenix(ui.filterData.filter.champs, ui.filterData.filter.filters);
                        documents.filter = { value: $filter, title: formatFiltersForTooltip(ui.filterData.filter.filters, ui.filterData.filter.champs) };
                        form.close();
                        break;
                }
            });
            function formatFiltersForTooltip(filters, champs) {
                var tooltip = [];
                filters.forEach(function (item) {
                    champs.forEach(function (champ) {
                        if (item.code === champ.code) {
                            item.lib = champ.libelle;
                            return false;
                        }
                    });
                    var format = (item.lib || item.code) + " " + getSymbol(item.op);
                    if (item.op === "vide" || item.op === "nvide")
                        format += " vide";
                    else if (item.op === "between" || item.op === "nbetween")
                        format += " " + item.values[0] + " et " + item.values[1];
                    else {
                        if (item.getValueNames)
                            format += " " + item.getValueNames().join(",");
                        else
                            format += " " + item.values.join(",");
                    }
                    if (tooltip.length)
                        tooltip.push(" et ");
                    tooltip.push(format);
                });
                function getSymbol(op) {
                    var symb;
                    switch (op) {
                        case "in":
                            symb = "=";
                            break;
                        case "nin":
                            symb = "!=";
                            break;
                        case "like":
                            symb = "contient";
                            break;
                        case "nlike":
                            symb = "ne contient pas";
                            break;
                        case "vide":
                            symb = "est";
                            break;
                        case "nvide":
                            symb = "n'est pas";
                            break;
                        case "gt":
                            symb = ">";
                            break;
                        case "ge":
                            symb = ">=";
                            break;
                        case "lt":
                            symb = "<";
                            break;
                        case "le":
                            symb = "<=";
                            break;
                        case "between":
                            symb = "entre";
                            break;
                        case "nbetween":
                            symb = "pas entre";
                            break;
                        default:
                            symb = op;
                    }
                    return symb;
                }
                return tooltip.join("");
            }
        };
        ui.filter = {
            format: {
                toPhenix: _toPhenix
            },
            addField: _addField,
            addField2: _addField2
        };
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));
/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../js/core/core.ts" />
var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        var _dom = Phoenix.dom, _utils = Phoenix.utils, _locale = Phoenix.locale;
        var ToolElement = (function () {
            function ToolElement(config, options) {
                var that = this;
                that.config = config || {};
                that.options = that.options || {};
                that.data = {
                    value: config.value
                };
                that.props = {};
                that._defineProps();
            }
            ToolElement.prototype._defineProps = function () {
                var that = this, _dp = Phoenix.utils.defineProperty;
                _dp("value", that);
            };
            ToolElement.prototype._notifyChange = function (propertyName) {
                var that = this;
                switch (propertyName) {
                    case "value":
                        that.update();
                        break;
                }
            };
            ToolElement.prototype.createElement = function (index, config, data) {
                var css = ["bs-button btn"];
                if (config.type)
                    css.push('btn-' + config.type);
                if (config.right)
                    css.push("pull-right");
                var html = [
                    '<div class="input-group ' + (config.right ? "pull-right" : "") + '">',
                    '<button toolClick="' + index + '" type="button" class="' + css.join(" ") + '">',
                    (config.icon ? '<span class="' + _dom.iconClass(config.icon) + '"></span>' : ''),
                    (config.title ? '&nbsp;' + config.title : ''),
                    '</button>',
                    '</div>'
                ];
                return html.join('');
            };
            ToolElement.prototype._setEvents = function () { };
            ToolElement.prototype.update = function () { };
            ToolElement.prototype.getValue = function () { };
            ToolElement.prototype.render = function ($parent) {
                var that = this;
                if (!that.$element) {
                    that.$element = $(that.createElement(that.config.id, that.config, that.data.value));
                    that._setEvents();
                }
                if ($parent)
                    _dom.append($parent.get(0), that.$element.get(0));
                return that.$element;
            };
            ToolElement.prototype.destroy = function () {
                var that = this;
                that.$element = null;
                that.options = null;
                that.config = null;
            };
            return ToolElement;
        }());
        ui.ToolElement = ToolElement;
        var ToolElementCount = (function (_super) {
            __extends(ToolElementCount, _super);
            function ToolElementCount(config, options) {
                _super.call(this, config, options);
            }
            ToolElementCount.prototype.createElement = function (index, config, data) {
                var css = ["label label-default form-control-static bs-toolbarandgrid-count"];
                if (config.right)
                    css.push("pull-right");
                var html = [
                    '<span tool="' + index + '" class="' + css.join(' ') + '">' + data + '</span>'
                ];
                return html.join('');
            };
            ToolElementCount.prototype.update = function () {
                var that = this;
                if (!that.$element)
                    return;
                _dom.text(that.$element.get(0), that.data.value);
            };
            return ToolElementCount;
        }(ToolElement));
        ui.ToolElementCount = ToolElementCount;
        var ToolElementSearch = (function (_super) {
            __extends(ToolElementSearch, _super);
            function ToolElementSearch(config, options) {
                _super.call(this, config, options);
                this.data.value = "";
                this.oldValue = "";
            }
            ToolElementSearch.prototype.createElement = function (index, config, data) {
                var css = [];
                if (config.right)
                    css.push("pull-right");
                var html = [
                    '<div tabindex="' + index + '" class="input-group ' + css.join(" ") + '">',
                    '<input toolKeyup="' + index + '" type="text" class="form-control" placeholder="' + (config.title || "Recherche") + '" />',
                    '<span class="input-group-btn">',
                    '<button toolClick="' + index + '" class="btn btn-default" type="button">',
                    '<span toolClick="' + index + '" class="' + _dom.iconClass(config.icon || "search") + '"> </span>',
                    '</button>',
                    '</span>',
                    '</div>'
                ];
                return html.join('');
            };
            ToolElementSearch.prototype.update = function () {
                var that = this;
                if (!that.$element)
                    return;
                var input = _dom.query(that.$element.get(0), "input");
                if (input)
                    input.value = that.data.value;
            };
            ToolElementSearch.prototype.getValue = function () {
                var that = this;
                that.oldValue = that._getInputValue();
                return that.oldValue;
            };
            ToolElementSearch.prototype._getInputValue = function () {
                var that = this;
                if (!that.$element)
                    return;
                var input = _dom.query(that.$element.get(0), "input");
                if (input)
                    return input.value;
                return null;
            };
            ToolElementSearch.prototype._setEvents = function () {
                var that = this;
                if (!that.$element)
                    return;
                var div = that.$element.get(0);
                if (div) {
                    var input_1 = _dom.query(div, "input");
                    var btn_1 = _dom.query(div, "button");
                    input_1.addEventListener('focus', function (event) {
                        input_1.select();
                    });
                    div.addEventListener('blur', function (event) {
                        var isNotBtnSearch = event.explicitOriginalTarget && event.explicitOriginalTarget != btn_1 && event.relatedTarget == null;
                        isNotBtnSearch = isNotBtnSearch || (event.relatedTarget == null || (event.relatedTarget && event.relatedTarget != btn_1)) && event.explicitOriginalTarget == undefined;
                        if (event.target == input_1 && isNotBtnSearch) {
                            //if (!that._getInputValue() && that.filtering){
                            that.data.value = " ";
                            that.props.value = that.oldValue;
                        }
                    }, true);
                }
            };
            return ToolElementSearch;
        }(ToolElement));
        ui.ToolElementSearch = ToolElementSearch;
        var ToolElementFilter = (function (_super) {
            __extends(ToolElementFilter, _super);
            function ToolElementFilter(config, options) {
                _super.call(this, config, options);
            }
            ToolElementFilter.prototype.createElement = function (index, config, data) {
                var css = ["bs-button btn btn-primary"];
                var html = [
                    '<div class="input-group ' + (config.right ? "pull-right" : "") + '">',
                    '<button toolClick="' + index + '" type="button" class="' + css.join(" ") + '">',
                    (config.icon ? '<span class="' + _dom.iconClass(config.icon) + '"></span>' : ''),
                    (config.title ? '&nbsp;' + config.title : ''),
                    '</button>',
                    '<span class="bs-toolbar-filter form-control-static bs-cursor-h"></span>',
                    '</div>'
                ];
                return html.join('');
            };
            ToolElementFilter.prototype.addTooltip = function (data) {
                var that = this;
                var tooltip = $('<span data-toggle="tooltip" data-phoenix-tooltip="true" data-placement="auto" title= "' + data + '"> ' + data + ' </span>');
                var tt = _dom.query(that.$element.get(0), ".bs-toolbar-filter");
                _dom.empty(tt);
                _dom.append(tt, tooltip.get(0));
                tooltip["tooltip"]({
                    html: true,
                    container: 'body',
                    template: '<div class="tooltip bs-tooltip-help" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner" style="text-align:left"></div></div>'
                });
            };
            ToolElementFilter.prototype.update = function () {
                var that = this;
                if (!that.$element)
                    return;
                that.addTooltip(that.data.value);
            };
            ToolElementFilter.prototype.render = function ($parent) {
                _super.prototype.render.call(this, $parent);
                var that = this;
                that.addTooltip(that.data.value);
            };
            return ToolElementFilter;
        }(ToolElement));
        ui.ToolElementFilter = ToolElementFilter;
        var ToolBar = (function () {
            function ToolBar(toolElements, options) {
                var that = this;
                that.options = options || {};
                that.toolElements = toolElements || {};
            }
            ToolBar.prototype.getToolElement = function (indexOrName) {
                var e = null;
                this.toolElements.forEach(function (item, i) {
                    if (i == indexOrName || item.name === indexOrName) {
                        e = item.$component;
                        return false;
                    }
                });
                return e;
            };
            ToolBar.prototype.setValue = function (name, value) {
                var that = this;
                var te = that.getToolElement(name);
                if (te)
                    te.props.value = value;
            };
            ToolBar.prototype.getValue = function (name, value) {
                var that = this;
                var te = that.getToolElement(name);
                if (te)
                    return te.getValue();
                return;
            };
            ToolBar.prototype._setEvents = function () {
                var that = this;
                if (that.$element) {
                    that.$element.on('click', function (event) {
                        var index = _dom.attr(event.target, "toolClick");
                        if (index !== null)
                            onToolElement("click", index);
                    }).on('keyup', function (event) {
                        if (event.keyCode == 13) {
                            var index = _dom.attr(event.target, "toolKeyup");
                            onToolElement("keyup", index);
                        }
                    });
                }
                function onToolElement(action, id) {
                    if (id >= 0) {
                        var toolData = that.getToolElement(id);
                        if (toolData && that.options.selectToolElement) {
                            var value = toolData.getValue();
                            that.options.selectToolElement({ id: toolData.config.id, name: toolData.config.name, value: value, toolData: toolData.config }, action);
                        }
                    }
                }
            };
            ToolBar.prototype._removeEvents = function () {
                var that = this;
                if (that.$element)
                    that.$element.off('click');
            };
            ToolBar.prototype._renderToolElements = function (toolElements) {
                var that = this;
                if (!toolElements.length)
                    return;
                var e = that.$element.get(0);
                toolElements.forEach(function (item, index) {
                    item.id = index;
                    switch (item.type) {
                        case "count":
                            item.$component = new ToolElementCount(item);
                            break;
                        case "filter":
                            item.$component = new ToolElementFilter(item);
                            break;
                        case "search":
                            item.$component = new ToolElementSearch(item);
                            break;
                        default:
                            item.$component = new ToolElement(item);
                            break;
                    }
                    if (item.$component)
                        item.$component.render(that.$element);
                });
            };
            ToolBar.prototype.render = function ($parent) {
                var that = this;
                if (!that.$element) {
                    that.$element = $('<div class="form-inline bs-toolbar"></div>');
                    that._renderToolElements(that.toolElements);
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
            ToolBar.prototype.destroy = function () {
                var that = this;
                that._removeEvents();
                that.$element = null;
                that.options = null;
            };
            return ToolBar;
        }());
        ui.ToolBar = ToolBar;
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));
//# sourceMappingURL=core.js.map