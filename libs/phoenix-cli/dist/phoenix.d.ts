declare namespace Phoenix {
    module utils {
        var Promise: any;
        var allocUuid: () => string;
        var allocID: () => string;
        var format: (...args: any[]) => any;
        var merge: (src: any, dst: any) => void;
        var formatNames: (value: string, params: any) => string;
        var extend: (dst: any, opts: any) => any;
        var logModule: (moduleName: string, value?: any) => any;
        var log: (value: any, moduleName: string) => void;
        var equals: (src: any, dst: any) => boolean;
        var copy: (src: any) => any;
        var deltaPatch: (oldValue: any, newValue: any) => any;
        var isNull: (value: any) => boolean;
        var isUndefined: (value: any) => boolean;
        var isNullOrUndefined: (value: any) => boolean;
        var logRule: (spaces: number, rule: any, trigger: string, entity: string) => void;
        var showRules: (value?: boolean) => boolean;
        var escapeHtml: (value: string) => string;
        var phoenixPath: () => string;
        var parseExpression: (expression: string, context: Object) => string;
        var hasExpression: (expression: string) => boolean;
        var parseVariable: (path: string, value: Object) => string;
        var defineProperty: (propertyName: any, target: any) => void;
        var applyMixins: (derivedCtor: any, baseCtors: any[]) => void;
        var nextTick: any;
        var focusDelay: (fn: any) => void;
        var dataAsPromise: (localData: any) => Promise<any>;
        var extractAngularVars: (expression: string, map: any[]) => boolean;
        var execAngularExpression: (expression: string, context: any, noExpand?: boolean) => string;
        var confirm: (title: any, message: any, success: any, cancel?: any) => void;
        var alert: (title: any, message: any, success: any) => void;
        var prompt: (title: string, defaultValue: string, success: (res: string) => void) => void;
        var cleanUpObject: (src: any) => void;
        var getValue: (value: any, path: string) => any;
    }
}
declare namespace Phoenix {
    module external {
        var hashHandler: Function;
        var logoutHandler: Function;
        var forbiddenHandler: Function;
        var changePasswordHandler: Function;
        var checkLoggedInHandler: Function;
        var historyChangedHandler: Function;
        var formOpenHandler: Function;
        var preferenceLoadHandler: (name: string) => Promise<any>;
        var preferenceSaveHandler: (name: string, data: any) => Promise<void>;
        var ruleLoaderHandler: (names: string[]) => Promise<any>;
        var ruleViewer: (rules: any[]) => void;
    }
    module history {
        var removeLast: () => void;
        var add: (hash: any, reset: any) => void;
        var hasBack: () => boolean;
        var value: string[];
        var locationPrefix: string;
    }
    module render {
        let register: (context: any, name: any, handler: any) => void;
        let get: (context: any, name: any) => any;
    }
    module ipc {
        let emit: (eventName: any, data: any) => void;
        let listen: (eventName: any, handler: any, listener: any) => void;
        let unlisten: (listener: any, eventName?: string) => void;
    }
}
declare namespace Phoenix {
    module serial {
        class Serial {
            private _eventList;
            private _inExec;
            constructor();
            execute(proc: any): void;
            private _execute();
        }
        class SingleEventBus {
            private currentEvent;
            defaultDelay: number;
            onError: Function;
            private _error;
            private _dispose;
            constructor(delay: any);
            private _errorHandler(error);
            clear(): void;
            _onEventDisposed(event: any): void;
            push(promise: any, onsuccess: any, nodelay: any): void;
            destroy(): void;
        }
        var GlbSerial: Serial;
    }
}
declare namespace Phoenix {
    var locale: any;
}
declare namespace Phoenix {
    module customData {
        var register: (namespace: string, value: any) => void;
        var unregister: (namespace: string, value: any) => void;
        var get: (namespace: string) => any;
    }
}
declare namespace Phoenix {
    var device: {
        phone: boolean;
        tablet: boolean;
        deviceType: string;
    };
    var $mem: any;
    function save$mem(): void;
    function sessionPreferences(name: string, value?: any): any;
    function preferences(name: string, value?: any): any;
    var build: {
        version: string;
        release: boolean;
        authMode: string;
    };
}
declare namespace Phoenix {
    module authentication {
        var db: () => any;
        var save: (credentials: any, onlyCredentials?: boolean) => void;
        var load: () => any;
        var clear: () => void;
        var registerAfterLogout: (hnd: Function) => void;
    }
}
declare namespace Phoenix {
    module application {
        var angularApplication: any;
        var core: string;
        var name: string;
        var support: string;
        var homeName: string;
        var title: string;
        var licences: any;
        var configuration: any;
        var useJSONPatch: boolean;
        function config(appName: string, cfg?: any): any;
        function init(appName: string, appTitle: string, config?: any): void;
        function portailName(): string;
        function isPortail(): boolean;
        function isCustomizable(typeRes: string, resName: string): boolean;
    }
}
declare namespace Phoenix {
    module ajax {
        var extractAjaxErrors: (ex: any) => any;
        var get: (lurl: string, options?: any, ondata?: any) => Promise<any>;
        var getScript: (lurl: any) => any;
        var getDefaultAjaxOptions: () => any;
        var put: (lurl: any, data: any, options?: any) => any;
        var patch: (lurl: any, data: any, options?: any) => any;
        var post: (lurl: any, data: any, options?: any) => any;
        var remove: (lurl: any, options?: any) => any;
        var postAndDownload: (lurl: string, postData: any) => any;
        var addAuthToUrl: (uri: string) => string;
        var loadScript: (name: any, lurl: any, after: any, loader: any) => any;
        var interceptError: (status: any, handler: any) => void;
        var activateInterceptError: (status: any, value: any) => void;
    }
}
declare namespace Phoenix {
    module ulocale {
        var register: (hnd: any) => void;
        var translate: (ll: any, lang: any) => void;
        var tt: (v: any, context: any) => any;
        var currentLang: string;
        var defCountry: string;
        var lang: string;
        var country: string;
        var money: (value: number, useSymbol: boolean) => any;
        var truncMoney: (value: number) => number;
        var decimal: (value: any, decimals: any, symbol: any) => any;
        var integer: (value: number) => string;
        var format: (desc: any, value: any) => any;
        var parseISODate: (value: any) => Date;
        var parseISODateAsUTC: (value: string) => number;
        var parseISODateTime: (value: any) => Date;
        var isoDatePart: (isoDate: string) => string;
        var shortDateTime: (date: any) => any;
        var shortDate: (date: any) => any;
        var longDate: (date: any) => any;
        var monthYear: (date: any) => any;
        var localeDate2ISO: (value: string) => string;
        var localeDateTime2ISO: (value: string) => string;
        var date2ISO: (value: Date) => string;
        var string2Float: (value: any) => number;
        var tryParseDate: (value: any) => string;
        var tryParseDateTime: (value: string) => string;
        var localeTitle: (title: any) => any;
        function loadLocale(newLang: any): void;
    }
    module angularjs {
        var registerFilters: (app: any) => void;
    }
}
declare namespace Phoenix {
}
declare namespace Phoenix {
    var bootstrap4: boolean;
    var fontawesome: boolean;
    module dom {
        var readyHandlers: (() => void)[];
        var finalizeHandlers: any[];
        const keys: {
            VK_TAB: number;
            VK_UP: number;
            VK_DOWN: number;
            VK_INSERT: number;
            VK_DELETE: number;
            VK_LEFT: number;
            VK_RIGHT: number;
            VK_ENTER: number;
            VK_ESCAPE: number;
            VK_F1: number;
            VK_HOME: number;
            VK_END: number;
            VK_PGUP: number;
            VK_PGDOWN: number;
            VK_SPACE: number;
            VK_F2: number;
            VK_F3: number;
            VK_F4: number;
            VK_BACKSPACE: number;
            VK_F10: number;
        };
        var queryAll: (parent: HTMLElement, selector: any) => NodeList;
        var find: (parent: HTMLElement, id: string) => HTMLElement;
        var query: (parent: HTMLElement, selector: any) => HTMLElement;
        var addClass: (element: HTMLElement, className: string) => void;
        var removeClass: (element: HTMLElement, className: string) => void;
        var hasClass: (element: HTMLElement, className: string) => boolean;
        var icon: (iconName: string) => HTMLElement;
        var iconClass: (iconName: string, noPrefix?: boolean) => string;
        var customIconClass: (iconName: string, iconClass: string) => string;
        var iconPrefix: () => string;
        var bodyTheme: (value: string) => boolean;
        var offset: (element: Element) => ClientRect;
        var before: (child: Node, element: Node) => void;
        var after: (child: HTMLElement, element: HTMLElement) => void;
        var parentByTag: (root: HTMLElement, element: HTMLElement, tag: string) => HTMLElement;
        var parentByAttr: (root: HTMLElement, element: HTMLElement, attr: string) => HTMLElement;
        var parentByClass: (root: HTMLElement, element: HTMLElement, className: string) => HTMLElement;
        var indexOf: (parent: HTMLElement, child: HTMLElement) => number;
        var append: (parent: Node, element: Node) => void;
        var prepend: (parent: Node, element: Node) => void;
        var select: (input: any) => void;
        var empty: (element: HTMLElement) => void;
        var remove: (element: Node) => void;
        var detach: (element: HTMLElement) => HTMLElement;
        var downloadFrame: () => any;
        var attr: (element: HTMLElement, attr: string, value?: string) => any;
        var text: (node: Element, text?: string) => string;
        var findByAttribute: (el: any, root: any, attr: any) => any;
        var isChildOf: (parent: Node, child: Node) => boolean;
        var parseStyle: (style: any, css: any) => void;
        var ignoreKeys: number[];
        var arrowKeys: number[];
        var processing: (value: boolean, delay?: number) => void;
        var inProcessing: () => boolean;
        var inCover: (element: Node) => boolean;
        var scrollbar: () => number;
        var supportCssCalc: () => boolean;
        var documentScroll: () => {
            left: number;
            top: number;
        };
        var documentClientDim: () => {
            width: number;
            height: number;
        };
        var documentViewSize: () => {
            width: number;
            height: number;
        };
        var touch: () => boolean;
        var position: (element: HTMLElement, parent: HTMLElement) => {
            left: number;
            top: number;
            width: number;
            height: number;
        };
        var childrenPositions: (parent: HTMLElement, list: any[], vertical: boolean, zone: string, options: any) => any[];
        var findNearest: (x: any, y: any, elements: any) => any;
        var showMove: (res: HTMLElement, vertical: boolean, pos: {
            left: number;
            top: number;
            width: number;
            height: number;
        }, cssClass: string) => HTMLElement;
        var featureTest: (property: string, value: string, noPrefixes: boolean) => boolean;
        var getPx: (unit: string) => number;
        var removeStype: (d: any, name: any) => void;
        var rem2px: (value: number) => number;
        var checkSize: (value: any) => string;
        var bootstrapStyles: (useOutline?: boolean) => any;
        var selectRange: (input: HTMLInputElement, start: number, end?: number) => void;
        var childrenRectsbyAttribute: (parent: HTMLElement, options: {
            attributeName: string;
        }) => any[];
        var findAttrByPosition: (x: any, y: any, elements: any) => any;
        var setCookie: (name: string, value: string, path: string, expireDate: Date) => boolean;
        var getCookie: (name: string) => string;
    }
}
declare namespace Phoenix {
    module link {
        var search: () => any;
        var object2search: (value: any) => string;
        var parseUrl: (value: string) => {
            path: string;
            search: any;
        };
        var hashLink: (cfg: any, data: any, params: any) => string;
        var pageName: (cfg: any) => any;
        var isCustomLink: (e: any, event: any, dontStopPropagation?: boolean) => {
            protocol: any;
            value: any;
        };
        var registerLinkExecutor: (value: {
            test: any;
            hnd: any;
            equal: any;
        }) => void;
        var getLinkExecutor: (link: any) => any;
        var registerCustomProtocol: (protocol: any, handler: any) => void;
        var execCustomProtocol: (clink: any, context: any, config: any, params: any) => void;
        var isCustomProtocol: (href: any) => any;
        var doAuthoring: (pageName?: string, force?: boolean) => void;
        var doFormAuthoring: (params: any) => void;
        var execLink: (clink: any, context: any, params: any) => any;
        var context: (opts?: any) => {
            $url: any;
            $mem: any;
            $user: {
                name: any;
                firstName: any;
                lastName: any;
            };
            $item: any;
            $cookie: any;
            $target: any;
        };
        var changeSearch: (search: any) => void;
    }
}
declare namespace Phoenix {
}
declare namespace Phoenix {
    module ui {
    }
}
declare namespace Phoenix {
    module events {
        class EventManager {
            private _isDisabled;
            constructor();
            disable(): void;
            enable(): void;
        }
        var mouseEvents: (eventType: string) => string;
        function isLeftButton(eventObject: JQueryMouseEventObject): boolean;
        function stopEvent(eventObject: any): void;
        function point(event: any): {
            x: number;
            y: number;
        };
        var eventManager: EventManager;
    }
}
declare namespace Phoenix {
    module drag {
        class DragAndDropManager {
            private _listeners;
            private _current;
            private _coverId;
            private _md;
            private _mu;
            private _mm;
            constructor();
            initialize(): void;
            finalize(): void;
            startMouseMove(): void;
            stopMouseMove(): void;
            private _canExecuteEvent(event);
            private mouseUp(eventObject);
            private mouseDownEmpty(eventObject);
            private mouseMove(eventObject);
            addDrag(listeners: HTMLElement[]): DragElement;
            rmvDrag(drag: DragElement): void;
            setCurrent(dragObject: DragElement): boolean;
            cancelDrag(): void;
            cover(value: boolean, cursor?: string, zindex?: number): void;
        }
        class DragElement {
            minLeft: number;
            maxLeft: number;
            minTop: number;
            maxTop: number;
            currentLeft: number;
            currentTop: number;
            moveX: boolean;
            moveY: boolean;
            moveSourceName: string;
            stopEvent: boolean;
            floatElement: HTMLElement;
            floatParent: HTMLElement;
            startOffset: any;
            startPoint: any;
            currentPoint: any;
            data: any;
            private mouseMoveCount;
            private _elements;
            private _mdEvent;
            private _lastDropTarget;
            private _targets;
            inDragging: boolean;
            coverDocument: boolean;
            cursor: string;
            onDragEnd: any;
            onDragStart: any;
            onDrag: any;
            canStartDragHandler: any;
            constructor(elements: HTMLElement[]);
            clear(): void;
            private _removeEvents();
            private _setEvents();
            private mousedown(eventObject);
            finalize(): void;
            ready(eventObject: JQueryMouseEventObject): boolean;
            notifyDrag(eventObject: JQueryMouseEventObject): void;
            private notifyDragStart(eventObject);
            private canStartDrag(event);
            private canDrop(value);
            notifyDragEnd(doCancel: any, event: JQueryMouseEventObject): void;
        }
        var dragManager: DragAndDropManager;
        var setData: (data: any) => void;
        var getData: () => any;
    }
}
declare namespace Phoenix {
    module sticky {
        var topOffset: number;
        var bottomOffset: number;
        class StickyManager {
            private _map;
            private _list;
            private _scroll;
            private _resize;
            private _refreshTimer;
            private _scrollTimer;
            add(element: {
                id: string;
                element: HTMLElement;
                position: string;
            }): void;
            remove(id: string): void;
            initialize(): void;
            private _updateElements(onlyActive);
            private _onscroll();
            private _onresize();
            private _refresh(scroll);
            refresh(scroll: boolean): void;
            finalize(): void;
        }
        var stickyManager: StickyManager;
        var native: boolean;
    }
}
declare namespace Phoenix {
    module jsonpatch {
        function compare(tree1: any, tree2: any, options: any): any[];
    }
}
declare namespace Phoenix {
    module filters {
        const OPERATORS: {
            in: string;
            nin: string;
            gt: string;
            ge: string;
            lt: string;
            le: string;
            between: string;
            nbetween: string;
            like: string;
            nlike: string;
            empty: string;
            nempty: string;
        };
        const TYPES: {
            number: string;
            decimal: string;
            money: string;
            integer: string;
            date: string;
            time: string;
            'date-time': string;
            string: string;
            enum: string;
            lookup: string;
            boolean: string;
        };
    }
}
declare namespace Phoenix {
    module data {
        var menu: {
            get: (menu: any, localization: any, appName: any) => Promise<any>;
        };
    }
}
declare namespace Phoenix {
    module data {
        var schema: {
            get: (schema: string, localization: boolean, appName: string) => Promise<any>;
        };
    }
}
declare namespace Phoenix {
    module data {
        var rest: {
            get: (url: string) => Promise<any>;
            put: (url: string, cdata: any) => Promise<any>;
            post: (url: string, cdata: any) => Promise<any>;
            remove: (url: string) => Promise<any>;
            getRessources: (params: any, ondata: any) => any;
        };
    }
}
declare namespace Phoenix {
    module data {
        var local: {
            getRessources: (params: any, ondata: any) => Promise<any>;
        };
    }
}
declare namespace Phoenix {
    module data {
        var odata: {
            v4: boolean;
            transport: {
                doPost: (lurl: any, data: any, options?: any) => any;
                doPut: (lurl: any, data: any, options?: any) => any;
                doDelete: (lurl: any, options?: any) => any;
                doGet: (lurl: string, options?: any, ondata?: any, params?: any) => Promise<any>;
                doPatch: (lurl: any, data: any, options?: any) => any;
            };
            afterLogout: () => void;
            addImageUrlToken: (url: string) => string;
            baseUrl: (params: any) => string;
            urlResEntity: (params: any, checkId: boolean) => string;
            doDelete: (params: any, etag: any) => any;
            doPost: (params: any, data: any) => any;
            doPut: (params: any, data: any, etag: any, returnRepresentation: any) => any;
            doPatch: (params: any, data: any, etag: any, returnRepresentation: any) => any;
            applyFilters: (documents: any, search: string, serchFields: string[], skip: number, top: number, orderBy: string) => {
                documents: any[];
                count: number;
                dataCount: number;
                skip: number;
                pageSize: number;
                nodata: boolean;
                search: string;
                orderBy: string;
            };
            getRessources: (params: any, ondata: any, errors?: any) => any;
        };
    }
}
declare namespace Phoenix {
    module data {
        var execData: (config: any, context: any, callerObject: any) => any;
        class DataSet {
            private _emitters;
            autoselect: boolean;
            config: any;
            defaultDataset: boolean;
            selectedIndex: number;
            constructor(config: any);
            execute(context: any, callerObject: any): any;
            enumTriggers(addLoad: any, cb: any): void;
            enumEmitters(cb: any): void;
            hasCustomEvents(): boolean;
            canExecute(event: any, context: any): boolean;
            data2Output(def: any, context: any): any;
            destroy(): void;
            _findSelectedOData(ldata: any): {
                item: any;
                index: number;
            };
            _findSelected(ldata: any): {
                item: any;
                index: number;
            };
            doAutoSelect(d: any, select: any): any;
        }
        var replaceFilterVars: (filter: any, context: any) => any;
        var registerDataProvider: (name: string, provider: any) => void;
        var compileFilterTree: (tree: any, lurl: any, context: any, localContext: any) => any;
        var acceptFilter: (tree: any, item: any) => boolean;
        var extractValue: (value: string) => any;
        var execOutputData: (dataSource: any, result: any) => void;
        var test: {
            output: (def: any, context: any) => any;
            parseTree: (tree: any, lurl: any, context: any, localContext: any) => string;
        };
    }
}
declare namespace Phoenix {
    module ui {
        class Pager {
            private _options;
            private pages;
            private $element;
            private data;
            private _updating;
            private _changed;
            props: any;
            visible: boolean;
            constructor(options: any);
            private _defineProps();
            private _notifyChange(propertyName);
            private _renderPager();
            private _updatePages();
            private _setEvents();
            private _removeEvents();
            updating(value: boolean): void;
            render($parent: any): void;
            destroy(): void;
        }
    }
}
declare namespace Phoenix {
    module pagecontrol {
        class PageControl {
            private data;
            private lastError;
            children: any[];
            props: any;
            popup: any;
            contextMenu: any;
            dataListeners: any[];
            errors: any[];
            private $error;
            private $loading;
            constructor();
            _defineProps(): void;
            currentPage(): string;
            emittersFor(events: any): any[];
            _historyChanged(): void;
            _notifyChange(propertyName: any): void;
            private _notifyChildOnAdd(child, type);
            _notifyChildren(propName: any, value: any): void;
            registerDataListener(value: any, parent: any): void;
            removeDataListener(listener: any): void;
            removeParentDataListener(parent: any): void;
            emitDataEvent(event: any, value: any, filter: any): void;
            childByType(ct: any): any;
            addChild(type: any, child: any): void;
            removeChild(child: any): void;
            destroy(): void;
            _setEvents(): void;
            _hideErrors(remove: any): void;
            _showErrors(): void;
            _hideLoading(): void;
            _showLoading(): void;
            loading(show: any): void;
            _removeEvents(): void;
            private _closePopup(event);
            private _inContextMenu(event);
            private _closeContextMenu(event);
            setPopup(popup: any): void;
            setContextMenu(popup: any): void;
            activePage(): {
                $module: string;
                $page: string;
            };
        }
        function Page(): PageControl;
    }
}
declare namespace Phoenix {
    module contextmenu {
        function openContextMenu(event: any, parent: any, data: any[]): void;
    }
}
declare namespace Phoenix {
    module modal {
        class Modal {
            private $element;
            private _inProcessing;
            options: any;
            $id: string;
            $locale: any;
            render: any;
            _clickHnd: Function;
            constructor(options: any, locale: any);
            protected _removeEvents(): void;
            protected _execAction(name: any): void;
            protected _addEvents(): void;
            protected _clear(): void;
            processing(value: any): void;
            on(hnd: any): void;
            close(): void;
            open(): void;
            destroy(): void;
        }
    }
}
declare namespace Phoenix {
    module DatasetPlugin {
        class DatasetMethods {
            _lastEvent: any;
            props: any;
            datasets: any;
            loadingHandler: Function;
            noDataHandler: Function;
            errorHandler: Function;
            emitHandler: Function;
            getLocalContextHandler: Function;
            dataChangedHandler: Function;
            updateMenuHandler: Function;
            ds_init(config: any): boolean;
            ds_storeLastEvent(event: any, value: any): void;
            ds_LastEvent(): any;
            ds_destroy(): void;
            ds_context(): any;
            ds_reemit(listeners: any, after: any): any;
            ds_select(datasetName: any, value: any): void;
            ds_loaded(datasetName: any, value: any): void;
            ds_exec(event: any, context: any, dst: any, after: any, datasets: any, notify: any): void;
        }
        var executeDatasets: (datasets: any[], context: any, result: any, handlers: any, after: any, contextByDs?: boolean) => void;
    }
}
declare namespace Phoenix {
    module WidgetUtils {
        var toHtml: (data: any, options: any, parent: any, model: any, llocale: any) => string;
        var cssClass: (cfg: any, options: any, selected?: boolean) => string;
        var heightText: (height: any) => string;
        var loader: () => JQuery<HTMLElement>;
        var error: () => JQuery<HTMLElement>;
        var widgetTitle: (html: string[], id: string, data: any, llocale: any, forceShowTitle: boolean) => void;
        var settings: () => JQuery<HTMLElement>;
        var warning: () => JQuery<HTMLElement>;
        var noData: (message: string, icon: any) => JQuery<HTMLElement>;
    }
}
declare namespace Phoenix {
    module ui {
        class Widget implements DatasetPlugin.DatasetMethods {
            private _watchers;
            _lastEvent: any;
            props: any;
            datasets: any;
            loadingHandler: Function;
            noDataHandler: Function;
            errorHandler: Function;
            emitHandler: Function;
            getLocalContextHandler: Function;
            dataChangedHandler: Function;
            updateMenuHandler: Function;
            private $element;
            private $settings;
            private $loader;
            private $noData;
            private $error;
            private $warning;
            private handlers;
            onDSChanged: Function;
            ondatasets: Function;
            layout: any;
            data: any;
            item: any;
            options: any;
            contentRender: any;
            links: any;
            $local: any;
            constructor(localData: any, options: any, layout: any);
            ds_init(config: any): boolean;
            ds_storeLastEvent(event: any, value: any): void;
            ds_LastEvent(): any;
            ds_destroy(): void;
            ds_context(): any;
            ds_reemit(listeners: any, after: any): any;
            ds_select(datasetName: any, value: any): void;
            ds_loaded(datasetName: any, value: any): void;
            ds_exec(event: any, context: any, dst: any, after: any, datasets: any, notify: any): void;
            _defineProps(): void;
            _notifyChange(propertyName: any): void;
            _listen(): void;
            _unlisten(): void;
            on(event: any, hnd: any): void;
            _exec(event: any): void;
            _setEvents(): void;
            executeLink(href: any, params: any): void;
            _removeEvents(): void;
            dataChanged(datasetNames: any): void;
            execDataSet(datasets: any, context: any, callBack: any, res: any, notify: any): void;
            _loadData(after: any): any;
            _updateTitle(): void;
            _cleanErrors(endLoading: any): void;
            loading(show: any): void;
            _linksState(show: any): void;
            noData(value: any, message: string, icon: string): void;
            getLocalContext(): any;
            settings(): void;
            error(ex: any): void;
            warning(message: any): void;
            _updateHeight($e?: JQuery): boolean;
            _updateCssClass(): void;
            _internalRenderContent($content: any, append: any, async: any): void;
            private watchersHandler(names);
            render($parent: any): void;
            emit(eventName: any, value: any, filter: any): void;
            dataEvent(eventName: any, value: any): void;
            destroy(): void;
            watch(dsName: string, cb: (value: any) => void): void;
            unwatch(dsName: string, cb: any): void;
        }
    }
}
declare namespace Phoenix {
    module menubase {
        class MenuBase {
            _lastEvent: any;
            protected _map: any;
            props: any;
            datasets: any;
            loadingHandler: Function;
            noDataHandler: Function;
            errorHandler: Function;
            emitHandler: Function;
            getLocalContextHandler: Function;
            dataChangedHandler: Function;
            updateMenuHandler: Function;
            page: pagecontrol.PageControl;
            data: any;
            protected $items: any;
            protected items: any;
            protected options: any;
            protected $element: JQuery;
            protected $content: JQuery;
            ds_init(config: any): boolean;
            ds_storeLastEvent(event: any, value: any): void;
            ds_LastEvent(): any;
            ds_destroy(): void;
            ds_context(): any;
            ds_reemit(listeners: any, after: any): any;
            ds_select(datasetName: any, value: any): void;
            ds_loaded(datasetName: any, value: any): void;
            ds_exec(event: any, context: any, dst: any, after: any, datasets: any, notify: any): void;
            constructor(data: any, options: any);
            _initOptions(options: any): void;
            emit(eventName: any, value: any, filter: any): void;
            init(data: any, options: any): void;
            loading(show: any): void;
            registerDataListener(value: any): void;
            removeDataListener(listener: any): void;
            emitDataEvent(event: any, value: any, filter: any): void;
            onPageChange(propName: any, value: any): void;
            setMenu(data: any): void;
            protected _onPageChanged(): void;
            protected _doCloseClick(): void;
            protected _menuShowed(): void;
            protected _executeLink(item: any, link: any): void;
            protected _executeContextMenu(event: any, item: any, link: any): boolean;
            protected _setEvents(): void;
            protected updateItemsAfterCollapse(): void;
            renderItems($content: JQuery): JQuery;
            _removeEvents(): void;
            _loadData(after: any): any;
            _expandItem(item: any, url: any, mem: any, itemtitle: any, link: any, index: any): {
                $title: string;
                $item: any;
                $index: any;
                $link: any;
            };
            _expandDatasetItems(dataset: any, itemtitle: any, link: any): any[];
            copyMenuItemData(dst: any, src: any): void;
            protected isVisible(item: any): boolean;
            protected colapseAll(value: boolean): void;
            protected colapse(item: any, value: boolean, recursive: boolean): void;
            private _prepareItems();
            _removeContent(): void;
            renderContent(): JQuery<HTMLElement>;
            show($parent: any): void;
            hide(autoCloseChanged?: boolean): void;
            _hideContent(autoCloseChanged?: boolean): void;
            _showContent(): void;
            render($parent?: JQuery): void;
            _recreateDatasets(): void;
            destroy(): void;
            inPopup(element: any): boolean;
        }
    }
}
declare namespace Phoenix {
    module menu {
        class Menu extends menubase.MenuBase {
            constructor(ldata: any, options: any);
            _initOptions(options: any): void;
            _hideContent(autoCloseChanged: any): void;
            _showContent(): void;
            _switchAutoClose(): boolean;
            _doCloseClick(): void;
            copyMenuItemData(dst: any, src: any): void;
            private _updateCloseButton($content);
            renderContent(): JQuery<HTMLElement>;
            private _changeSelected(item);
            private _selectDatasetItem(dataset, item);
            private _expandSelected(item);
            private _canClick(item);
            render($parent?: JQuery): void;
            renderItems(): JQuery<HTMLElement>;
            protected updateItemsAfterCollapse(): void;
            protected _executeLink(item: any, link: any): any;
            protected _executeContextMenu(event: JQueryMouseEventObject, item: any, link: any): boolean;
            contextMenu(item: any): void;
            protected _onPageChanged(): void;
            selectItem(value: any): void;
        }
        var Menuleft: typeof Menu;
        var Menuright: typeof Menu;
    }
}
declare namespace Phoenix {
    module ui {
        class Header {
            private $element;
            private $parent;
            private $location;
            private _location;
            private _locationTimeOut;
            private _ignoreClick;
            private _ctx;
            private $buttons;
            private _ob;
            page: any;
            title: string;
            private leftButtonsSpace;
            private rightButtonsSpace;
            private _doResize;
            options: any;
            constructor(data: any, options: any);
            setLocation(value: string, add: boolean): void;
            private _init(data, options);
            private _show();
            setData(data: any): void;
            buttonByType(value: any): any;
            _createButtons(): void;
            _updateButtons(): void;
            private _updateTitleSpaceMargins();
            inPopup(target: any): boolean;
            hide(target: any): void;
            private _openPopup(button);
            private _executeLink(button, si);
            private _onresize();
            private _setEvents();
            setPage(pageName: string, value: any): void;
            onPageChange(propName: any, value: any): void;
            private _removeEvents();
            renderButtons(): void;
            private _renderTitle();
            private _auth(inRender);
            render($parent: any): void;
            destroy(): void;
        }
    }
}
declare namespace Phoenix {
    module tabs {
        class Tabs {
            private _options;
            private _page;
            private _tabs;
            private $element;
            constructor(options: any, tabs: any);
            private _renderTabs();
            private _setEvents();
            private _removeEvents();
            render($parent: any): void;
            destroy(): void;
        }
    }
}
declare namespace Phoenix {
    module layoutUtils {
        const LAYOUT_BLOCK = "block";
        const LAYOUT_ROW = "row";
        const LAYOUT_COLUMN = "column";
        const LAYOUT_HTML = "html";
        const LAYOUT_ACCORDION = "accordion";
        const LAYOUT_ACCORDION_GROUP = "accordion-group";
        var check: (layout: any, parentLayout: any, map: any, mapFields: any, namedMap: any, namedFieldMap: any) => void;
        var layoutVisible: (layout: any) => any;
        var clearMeta: (layout: any, clearIds: any) => void;
        var namesOfLayout: (layout: any) => {
            name: string;
            title: string;
        }[];
        var clearMaps: (layout: any, map: any, mapFields: any, namedMap: any, namedMapFields: any) => void;
        var afterRemoveChild: (layout: any, map: any, mapFields: any, namedMap: any, namedMapFields: any) => void;
        var canSelect: (layout: any, level: any) => boolean;
        var updateCssClass: (e: any, layout: any, parent: any, options: any) => void;
        var toHtml: (layout: any, model: any, llocale: any, options: any, cb: any) => string;
        var updateLayoutTitle: (titleElement: HTMLElement, layout: any, formData: any, llocale: any) => void;
        var enumSubLayouts: (layout: any, cb: (layout: any) => void) => void;
    }
}
declare namespace Phoenix {
    module ui {
        class BaseLayout {
            map: any;
            autoClose: any;
            expressionTitle: boolean;
            mapFields: any;
            namedMap: any;
            namedMapFields: any;
            $locale: any;
            $element: JQuery;
            protected $content: JQuery;
            protected resizeList: any[];
            protected stickies: any;
            protected activeStickies: any;
            any: any;
            protected currentResizeList: any[];
            protected afterRenderList: any[];
            options: any;
            data: any;
            children: any;
            controls: any;
            page: pagecontrol.PageControl;
            private _disableRules;
            protected _autofocus: any;
            constructor(ldata: any, options: any, fdata: any, schema: any, locale: any, preferences: any);
            _afterCreate(): void;
            protected initOptions(options: any): any;
            protected _init(ldata: any, options: any): void;
            pageLayoutInit(): void;
            getSchema(path: string): any;
            getLookupForSchema(path: string, lookupName: string): any;
            _setDesignListeners(): void;
            _removeEvents(): void;
            _addEvents(): void;
            _removeBaseEvents(): void;
            _addBaseEvents(): void;
            _onSelectedChanged(element: any, data: any, notify: any): void;
            _showSelected($element: any, layout: any): void;
            private _setAccordionEvents();
            protected _activatePageLayout(item: any): void;
            activatePage(name: string): void;
            private _openTab(id);
            _doDatasetEventAfterEnabled(child: any): void;
            protected _activateLayout(layout: any, value: boolean): void;
            _removeAccordionEvents(): void;
            toString(layout: any): any;
            emit(eventName: any, value: any, filter: any): void;
            protected openErrors(): void;
            protected _getFormLData(): any;
            protected _renderLayout(layout: any): JQuery<HTMLElement>;
            protected afterRenderChildren($e: any): void;
            isChildOf(child: any, layout: any): boolean;
            _isChildVisibleOf(child: any, layout: any): boolean;
            _getVisibleChildren(layout: any): any[];
            _getChildrenOf(layout: any): any[];
            _getEventListFor(list: any): any[];
            _refreshDataSets(children: any): void;
            protected _afterLayoutAdded(layout: any): void;
            private _updateLayoutContent(layout);
            private _renderLayoutContent(layout);
            _isVisible(id: any): boolean;
            _renderChildren($e: any): any[];
            addControl(layout: any, controlName: string, control: any): void;
            protected _afterVisibilityChanged(options: {
                inDom: boolean;
                resize: boolean;
            }): void;
            private _refreshStickies(refresh);
            private _refreshCurrentResizeList();
            private _clearSticks();
            private _clearChildren();
            _refreshSelected(): void;
            registerDataListener(value: any): void;
            removeDataListener(listener: any): void;
            emitDataEvent(event: any, value: any, filter: any): void;
            protected afterRender($e: JQuery): void;
            protected _internalRender($parent: any, refresh: any): JQuery<HTMLElement>;
            protected afterAddedInDom(): void;
            protected _callInternalRender($parent: any, refresh: any): void;
            render($parent?: JQuery): JQuery<HTMLElement>;
            _destroyDataSets(): void;
            destroy(): void;
            check(layout: any, parent: any): void;
            private _afterStructureChanged(layout);
            protected _afterPropsChanged(item: any): void;
            removeChild(id: any): void;
            setDesignMode(value: any): void;
            getLayoutById(id: any): any;
            getLayoutElementByName(name: string): HTMLElement;
            getLayoutByName(name: string): any;
            getLayoutsByName(name: string): any[];
            scrollTo(name: string): void;
            getNamedLayouts(): {
                name: string;
                title: string;
            }[];
            getFieldById(id: any): any;
            select(id: any): void;
            updateField(id: any, data: any): void;
            _cleanIds(item: any): void;
            _blockToCols(layout: any): void;
            _changeType(layout: any, newtype: any): void;
            updateIsHidden(layout: any, isHidden: any): void;
            updateLayout(id: string, data: any): void;
        }
        class PageLayout extends BaseLayout implements DatasetPlugin.DatasetMethods {
            _lastEvent: any;
            props: any;
            datasets: any;
            loadingHandler: Function;
            noDataHandler: Function;
            errorHandler: Function;
            emitHandler: Function;
            getLocalContextHandler: Function;
            dataChangedHandler: Function;
            updateMenuHandler: Function;
            ds_init(config: any): boolean;
            ds_storeLastEvent(event: any, value: any): void;
            ds_LastEvent(): any;
            ds_destroy(): void;
            ds_context(): any;
            ds_reemit(listeners: any, after: any): any;
            ds_select(datasetName: any, value: any): void;
            ds_loaded(datasetName: any, value: any): void;
            ds_exec(event: any, context: any, dst: any, after: any, datasets: any, notify: any): void;
            pageLayoutInit(): void;
            _doDatasetEventAfterEnabled(child: any): void;
            _refreshDataSets(children: any): void;
            protected _callInternalRender($parent: any, refresh: any): void;
            _destroyDataSets(): void;
            _removeMenus(): void;
            updateMenu(mn: any, data: any): void;
        }
        class Layout extends PageLayout {
            constructor(ldata: any, options: any, fdata: any, schema: any, locale: any, preferences: any);
        }
        var LayoutClass: typeof Layout;
    }
}
declare namespace Phoenix {
    module autoclose {
        const SCREEN_CENTER = "screencenter";
        const SCREEN_TOP_CENTER = "screentopcenter";
        const BOTTOM_LEFT = "bottom-left";
        const BOTTOM_RIGHT = "bottom-right";
        function open(align: string, options: {
            width?: string;
            height?: string;
            minWidth?: string;
            minHeight?: string;
            style?: string;
            parents?: string[];
            parent: HTMLElement;
            alignElement: HTMLElement;
            contentRender: any;
            beforeClose: any;
            stayOnTop?: boolean;
        }): void;
    }
}
declare namespace Phoenix {
    module Observable {
        const INDEX_FIELD_NAME = "$index";
        const SELECTED_FIELD_NAME = "$select";
        const EXPANDED_FIELD_NAME = "$expand";
        var SchemaUtils: {
            RATE_DECIMALS: number;
            RATE_MAXIMUM: number;
            RATE_SYMBOL: string;
            expandSchema$Ref: (schema: any) => void;
            path2RulePath: (propName: string) => string;
            _getDefault: (value: any) => any;
            checkLookup: (lookup: any) => any;
            schema2Authoring: (schema: any, rootSchema: any, locale: any) => any[];
            extractClassNames(schema: any, rootSchema: any): any;
            expandRules(rules: any[], names: any): any;
            filtrableFields(schema: any, rootSchema: any, locale: any): any[];
            searchableFields: (schema: any, rootSchema: any, locale: any) => any[];
            isFwField: (fieldName: string) => boolean;
            copyModel: (schema: any, model: any, rootSchema?: any, copyUX?: boolean, copyStates?: boolean) => any;
            columns: (schema: any, rootSchema: any, locale: any) => any[];
            allData: (lookup: any) => boolean;
            pkFields: (pk: any) => string[];
            entityId: (pkValue: any) => string;
            extractPkValue: (item: any, map: string[]) => any;
            odataId: (keys: string[], item: any) => string;
            pk2Id: (pk: any, keys: string[]) => any;
            id2Pk: (id: any, keys: string[]) => any;
            equals: (primaryItem: any, item: any, keys: string[]) => boolean;
            extractBase: (path: any) => string;
            parentPath: (path: string) => string;
            findByPk: (primaryItem: any, keys: string[], list: any[]) => any;
            supportPagination: (lookup: any) => boolean;
            executeLookup: (lookup: any, data: any, options: {
                fieldName: string;
                search: string;
                paginated: boolean;
                find: boolean;
                findFirst: boolean;
                containerId: string;
                viewId: any;
            }, ondata?: Function) => any;
            remoteSearch: (localSearch: string, lookup: any) => string;
            lastSegment: (bind: string, display: string) => string;
            hasProperty(propertyName: string, schema: any, rootSchema: any): boolean;
            findFirst: (value: string, searchField: any, ldata: any[]) => {
                item: any;
                index: number;
            };
            _states: string[];
            isMetaProp: (pn: string) => boolean;
            isMeta: (bind: any) => {
                widget: any;
            };
            getLookup: (path: string, lookupName: string, schema: any, rootSchema: any) => any;
            getSchema: (path: string, schema: any, rootSchema: any, expandArray: boolean) => any;
            states: string[];
            statesAndErrors: string[];
            linksStates: string[];
            isLink: (path: any) => boolean;
            _isMoney: (schema: any) => boolean;
            _internalExtractEnums: (schema: any, rootSchema: any, enums: any, names: string[]) => void;
            _extractEnums: (schema: any, enums: any) => void;
            _fillEnums: (schema: any, enums: any) => void;
            _internalFillEnums: (schema: any, rootSchema: any, enums: any, names: any) => void;
            loadEnums(schema: any): any[];
            arrayProps: string[];
            init: (schema: any, rootSchema: any, context: any, value: any, iCreate: boolean, opts: any) => any;
            isCompositionRef: (prop: any, rootSchema: any) => boolean;
            isRef: (prop: any, rootSchema: any) => boolean;
            isList: (prop: any, rootSchema: any) => boolean;
            isCompositionList: (prop: any, rootSchema: any, followRefs: boolean) => boolean;
            isSimpleList: (prop: any, rootSchema: any) => boolean;
            inModel: (prop: any, rootSchema: any) => boolean;
            formatNumber: (schema: any, value: number) => string;
            _title: (title: any, locale: any) => any;
            canSort: (schema: any) => any;
            canShowField: (schema: any) => boolean;
            canFilter: (schema: any) => any;
            canSearch: (schema: any) => any;
            checkNumber: (value: any, schema: any, locale: any, errors: any) => boolean;
            _validateEmail: (email: string, error: any) => boolean;
            _validateJson: (value: string, error: any) => boolean;
            checkString: (value: any, state: any, schema: any, locale: any, errors: any) => boolean;
            validatePassword: (orig: any, value: any, schema: any, state: any, locale: any, errors: any) => boolean;
            validateSchema: (value: any, schema: any, state: any, locale: any, errors: any, glbErrors: any) => boolean;
            loadEnumsPromise: (schema: any) => any;
            loadSchemaRefs: (schema: any, ldata: any, layout: any, after: any) => any;
            stateProps: (schema: any) => string[];
            isPassword: (schema: any) => boolean;
            isDate: (schema: any) => boolean;
            isDateTime: (schema: any) => boolean;
            isBoolean: (schema: any) => boolean;
            isSelectField: (fieldName: string) => boolean;
            isExpandField: (fieldName: string) => boolean;
            isNumber: (schema: any) => boolean;
            isText: (schema: any) => boolean;
            isMoney: (schema: any) => boolean;
            hasSymbol: (schema: any) => any;
            text2Value: (textValue: any, schema: any, state: any) => any;
            value2Text: (value: any, schema: any, state: any) => any;
            expand$Ref: (cs: any, rootSchema: any) => any;
            parsePath: (base: string, propName: string, expandingProperty: string) => string;
            registerValidator: (name: any, handler: any) => void;
            getValidator: (name: any) => any;
            registerEnumManager: (name: string, manager: any) => void;
            getEnumManager: (name: any) => any;
        };
        var DataUtils: {
            extractDatasets: (config: any, onlyAutoOpen: boolean) => any[];
            isQuery: (ds: any) => boolean;
            isCreateOrUpdate: (ds: any) => any;
            extractMainDataSource: (config: any) => any;
            datasetsAsPromise: (ds: any[], transform?: any, context?: any) => any;
            datasetAsPromise: (ds: any, ldata?: any) => any;
            loadMainData: (config: {
                datasets: any;
                transform: any;
                context: any;
            }, onlyAutoOpen: boolean) => Promise<any>;
            dsConfig: (datasets: any, prop: any, isQuery: boolean) => any;
        };
    }
}
declare namespace Phoenix {
    module Observable {
        class BaseState {
            protected _state: any;
            name: string;
            parent: any;
            constructor(parent: any, prop: any, value: any);
            destroy(): void;
            state(): any;
            protected _init(parent: any, prop: any, value: any, list: any): void;
        }
        class ListStates extends BaseState {
            private _orderBy;
            private _filter;
            constructor(parent: any, prop: any, value: any);
            protected _init(parent: any, prop: any, value: any, list: any): void;
            columns: string;
            selected: string;
            orderBy: string;
            filter: string;
        }
        class DataStates extends BaseState {
            constructor(parent: any, prop: any, value: any);
        }
        class LinkStates extends BaseState {
            constructor(parent: any, prop: any, value: any);
        }
    }
}
declare namespace Phoenix {
    module Observable {
        class Errors {
            private _errors;
            name: string;
            isArray: boolean;
            parent: any;
            constructor(parent: any, prop: string, value: any[]);
            destroy(): void;
            errors(): any[];
            readonly length: number;
            find(prop: any, ...keys: any[]): any;
            clear(notify: boolean): boolean;
            hasErrors(): boolean;
            rmvError(message: string): void;
            rmvErrorById(id: any): void;
            addErrors(errors: any[]): void;
            push(error: any): void;
            remove(error: any): void;
            addError(message: string, id?: any): void;
            addSuccess(message: string, id?: any): void;
            addWarning(message: string, id?: any): void;
            private notify();
            private _init(parent, prop, value);
        }
        var errorsUtils: {
            errorChanged: (oldErrors: any, newErrors: any) => boolean;
        };
    }
}
declare namespace Phoenix {
    module Observable {
        class QueryableDataSource {
            private _config;
            private _filter;
            private _origFilter;
            private _orderby;
            private _pageSize;
            private _currentPage;
            private _totalCount;
            private _skip;
            private _searchFields;
            private _search;
            private _model;
            constructor(dsConfig: any, model: any);
            initPagination(pageSize: number, currentpage: number, totalCount: number): void;
            initFromData(ldata: any): void;
            filter: any;
            search: string;
            searchFields: string[];
            pageSize(): number;
            orderBy(value?: string): string;
            refresh(resetPagination: boolean, forceReload: boolean): Promise<void>;
            currentPage(page?: number): number;
            totalPages(): number;
            totalCount(): number;
            destroy(): void;
            isQuery(): boolean;
            open(): any;
            remove(key: any, etag?: string): any;
            private _applyFilters();
            private _open(forceReload);
            save(): void;
        }
    }
}
declare namespace Phoenix {
    module rules {
        var execInitRules: (inst: Observable.Data) => void;
        var execBeforeSaveRules: (inst: Observable.Data) => void;
        var execPropChangeRules: (root: Observable.Data, propertyName: string, params: any, options: {
            validations: boolean;
            propagations: boolean;
        }) => void;
        var execValidationRules: (inst: Observable.Data, selectedProps?: string[]) => boolean;
        var injectInContext: (propertyName: string, value: any) => void;
    }
}
declare namespace Phoenix {
    module Observable {
        class DataListCore {
            isArray: boolean;
            protected _map: any;
            protected _parentSelected: DataListCore;
            protected _selected: any;
            protected _expanded: boolean;
            protected _selectedUids: string[];
            protected _selectedPks: string[];
            protected _schema: any;
            $links: any;
            $states: any;
            protected _rootSchema: any;
            protected _schemaItems: any;
            protected _simulateSelecting: boolean;
            protected _savedSelectedUids: string[];
            protected _saved: boolean;
            protected _items: Data[];
            protected _model: any[];
            protected _path: string;
            protected _locale: any;
            protected _parent: Data;
            frozen: boolean;
            protected _arrayParent: DataListCore;
            protected _queryable: boolean;
            isNull: boolean;
            isUndefined: boolean;
            isQuery: boolean;
            constructor(schema: any, parent: any, path: any, value: any, arrayParent: any, locale: any, isQuery: any, parentSelected: DataListCore);
            selecting(value: any, expandingProperty: any): void;
            readonly simulateSelecting: boolean;
            readonly schema: any;
            readonly path: string;
            readonly parent: Data;
            $selected: any;
            private _setSelected(value, notify);
            enumSelectedItems(expandingProperty: string, cb: (item: any) => void): void;
            getJSONPatchPath(propertyName?: string): string;
            getFullPath(): string;
            private _rmvSelected(value, notify);
            pushSelected(item: Data, notify: boolean): void;
            model(original?: boolean): any[];
            schemaModel(): any[];
            private _getModel(original);
            protected _initModelInParent(): void;
            removeSelected(item: Data, notifySelectedChanged: boolean): void;
            protected notifyChangedProperty(operation: string): void;
            addAjaxException(ex: any): void;
            notifyPaginationChanged(): void;
            notifyCountChanged(): void;
            notifySortingChanged(): void;
            isQueryable(): boolean;
            addErrors(errors: any): void;
            addError(message: string): void;
            rmvError(message: string): void;
            readonly length: number;
            protected _destroyItems(): void;
            $orderby(value?: string): string;
            totalPages(): number;
            currentPage(page?: number): number;
            totalCount(): number;
            destroy(): void;
            protected _fillItems(): void;
            protected _setModel(value: any, frozen: any): void;
            setModel(value: any): void;
            protected afterSetModel(): void;
            indexOf(value: any): number;
            find(prop: any, ...keys: any[]): Data;
            private _expandForEach(cb, expandingProperty, level, index, noCheckExpanding);
            forEach(cb: (item: Data, index: number, level: number) => void, expandingProperty?: string, noCheckExpanding?: boolean): void;
            get(index: any): Data;
            $expand: boolean;
        }
        class DataListBase extends DataListCore {
            protected _fillItems(): void;
            private _updateSelecting(multiSelect, expandingProperty, list, root);
            clearSelection(expandingProperty?: string): void;
            getSelectedItems(expandingProperty?: string): any[];
            setSelectedItems(selected: any[]): void;
            updateSelecting(multiSelect: boolean, expandingProperty: string): void;
            enumSelectedItems(expandingProperty: string, cb: (item: any) => void): void;
            private _enumChildren(expandingProperty, cb);
            private _enumSelected(expandingProperty, cb);
            selectItem(value: boolean, item: any, multiSelect: boolean, expandingProperty: string, selectChildren: boolean, externAction: boolean): void;
            protected canDoNext(): boolean;
            protected canDoPrev(): boolean;
            moveSelected(value: number, navigate?: boolean): void;
            sortByKey(values: any[], key: string): void;
            findById(id: string): Data;
            indexOf(value: any): number;
            $orderby(value?: string): string;
            $filter(value?: string): string;
        }
        class QueryList extends DataListBase {
            private _query;
            private _main;
            allData: any[];
            constructor(parentSchema: any, schema: any, parent: any, path: any, value: any, pageSize: any, pageNumber: any, totalCount: any, allData: any[], arrayParent: any, locale: any);
            filter: any;
            readonly searchFields: string[];
            searchField: string[];
            search: string;
            totalPages(): number;
            totalCount(): number;
            $refresh(resetPagination: boolean): Promise<void>;
            $orderby(value?: string): string;
            notifyPaginationChanged(): void;
            notifyFilterChanged(): void;
            notifySortingChanged(): void;
            currentPage(page?: number): number;
            private _removeItem(key, etag);
            remove(item: Data): void;
            destroy(): void;
        }
        class CompositionList extends DataListBase {
            protected _destroyItems(): void;
            find(prop: any, ...keys: any[]): Data;
        }
        class SimpleCompositionList extends DataListCore {
            protected _destroyItems(): void;
        }
        class SimpleTypeList extends SimpleCompositionList {
            push(item: any): void;
            splice(start: number, deleteCount: number, item: any): void;
            remove(item: any): void;
        }
        class DataList extends CompositionList {
            private _new;
            constructor(schema: any, parent: any, path: any, value: any, arrayParent: any, locale: any, parentSelected: any);
            private _initNew();
            filter: any;
            private _createNewItem(init, define);
            updateItem(old: Observable.Data, newItem: Observable.Data): boolean;
            addNew(): void;
            private _destroyNew();
            destroy(): void;
            push(item: any): void;
            splice(start: number, deleteCount: number, item: any): void;
            remove(item: any): void;
        }
        class Data {
            private _schema;
            private _initialized;
            private _selected;
            private _model;
            private _origModel;
            private _updating;
            private _locale;
            private _validators;
            private _path;
            private _fullPath;
            private _parent;
            private _rootParent;
            private _arrayParent;
            private _children;
            $states: any;
            $errors: any;
            $links: any;
            $create: boolean;
            frozen: boolean;
            onchange: Function;
            onsync: Function;
            onstatechanged: Function;
            isNull: boolean;
            isUndefined: boolean;
            $id: string;
            className: string;
            onRefresh: any;
            datasets: any;
            transform: string;
            callStack: string[];
            design: boolean;
            constructor(schema: any, parent: Data, path: any, value: any, arrayParent: any, frozen: any, locale: any, datasets: any, transform?: string, designMode?: boolean);
            readonly fullPath: string;
            readonly owner: any;
            getJSONPatchPath(propertyName: string): any;
            getPropertyPath(propertyName?: string, treePath?: string): string;
            saveModel(): void;
            readonly $schema: any;
            readonly parent: any;
            readonly root: any;
            setModel(value: any): void;
            update(value: any): void;
            $refresh(options?: any): Promise<void>;
            clearErrors(recursive?: boolean): void;
            private _validate(validators, isSaving?, selectedProps?);
            isRecursiveRule(propertyName: any): boolean;
            validate(isSaving?: boolean): boolean;
            partialValidate(properties: string[]): boolean;
            $select: boolean;
            select(value: boolean, multiSelect: boolean, parentArray: any, expandingProperty: string, selectChildren: boolean): void;
            toggleExpand(expandingProperty: string): boolean;
            enumVisibleChildren(expandingProperty: string, level: number, root: boolean, cb: any): void;
            internalSetSelected(value: boolean): boolean;
            readonly $index: number;
            getJsonPachDelta(options: {
                useId: boolean;
            }): any;
            applyJsonPachDelta(delta: any[]): any;
            $save(): any;
            getRootModel(): Data;
            addValidator(name: string, value: boolean): void;
            activateValidator(name: string, value: boolean): void;
            hasValidators(): boolean;
            getParentOf(bind: string, params: any): any;
            setValue(path: any, value: any, params: any): void;
            _getModel(original: boolean, copyUx?: boolean): any;
            schemaModel(copyStates: boolean): any;
            model(original?: boolean): any;
            getRelativeValue(path: any): any;
            getRelativeState(path: any): any;
            getValueInfo(path: any, params: any): {
                value: any;
                parentIsNull: boolean;
            };
            getValue(path: any, params: any): any;
            getSchema(path: string): any;
            getState(path: any, params: any): any;
            private _setPropErrors(propName, value);
            private _setModel(value, frozen);
            _setRefChild(propertyName: any, oldvalue: any, value: any): void;
            _setListChild(propertyName: any, oldvalue: any, value: any): void;
            _setSimpleListChild(propertyName: any, oldvalue: any, value: any): void;
            _setQueryListChild(propertyName: any, value: any[], pageSize: number, page: number, totalCount: number, allData: any[]): void;
            private _initFromSchema(schema);
            getParentModel(path: string): any;
            addAjaxException(ex: any): void;
            addError(message: string): void;
            rmvError(message: string): void;
            addErrors(errors: any[]): void;
            private _beforeChange(thisObject, propertyName, schema, oldValue, value, forceContinue);
            notifyStateChanged(stateName: string, params: any): void;
            private _extractPropName(pn, params);
            private _execValidators(validators, propertyName, event, params, ldata?);
            notifyBeforeChanged(propertyName: any, oldValue: any, value: any, params: any): boolean;
            private _getSelectedParentArray(avanced?);
            private _getPaths(params);
            notifyChanged(propertyName: any, oldValue: any, value: any, op: any, params: any, validate: any): void;
            execSyncAction(propName: string, actionParams?: any, params?: any): boolean;
            syncAction(actionName: string, actionParams: any): any;
            private _destroyObject(obj, pn);
            hasErrors(): boolean;
            destroy(): void;
        }
        var ObservableUtils: {
            setValue: (path: string, value: any, model: Data, params?: any) => void;
            getValue: (path: string, model: Data, params?: any) => any;
            getState: (path: string, model: Data, params?: any) => any;
            _segment2Id(segment: string): any;
            _resolveJSONPatchSegment: (segment: string, value: any, useId: boolean) => any;
            getJSONPatchParent: (segment: string, value: any) => {
                lastSegment: string;
                value: any;
                type: number;
            };
            _resolveSegment: (segment: string, path: string, value: any, params: any, val?: any, isSet?: boolean) => any;
        };
    }
}
declare namespace Phoenix {
    module serversync {
        function update(model: Observable.Data, actions: {
            op?: string;
            path: string;
            params: any;
            after: string;
        }[], form: ui.Form, success: (delta: any) => void, after: () => void): void;
    }
}
declare namespace Phoenix {
    module Observable {
    }
}
declare namespace Phoenix {
    module ui {
        class FormManager {
            private _forms;
            private _inAction;
            constructor();
            setInAction(value: boolean): void;
            isInAction(): boolean;
            broadcast(eventName: string, params: any): void;
            add(form: any): void;
            remove(form: any): void;
            formByName(form: string): any;
        }
        var formManager: () => FormManager;
    }
}
declare namespace Phoenix {
    module ui {
        class Form extends ui.BaseLayout {
            private _bindStates;
            private _actions;
            private _transactionId;
            private _viewId;
            private _resizeHnd;
            private _bindTitles;
            private _bindAccordion;
            private _parentForm;
            private _syncTimeOut;
            private _inSync;
            private _childrenForms;
            $schema: any;
            $rootSchema: any;
            $rootPath: string;
            $data: any;
            formData: any;
            $model: Observable.Data;
            module: any;
            onaction: Function;
            onsync: Function;
            inAction: boolean;
            private _nestedControllers;
            private _localSettings;
            private _settingsName;
            private _settings;
            private _internalDelayedAction;
            private _inProcessing;
            private _listenerChanged;
            private _listeners;
            private _listenersByName;
            formManager: FormManager;
            addChildForm(aForm: Form, parentId: string): void;
            removeChildForm(aForm: Form): void;
            closeInlineForms(where: string): void;
            hasInlineForms(where: string): Form;
            private _isInDelayedAction();
            private _setInDelayedAction(value);
            protected initOptions(options: any): any;
            syncTransactionId(): string;
            syncViewId(): string;
            syncDataSet(): any;
            constructor(layoutData: any, options: any, ldata: any, schema: any, locale: any, preferences: any);
            protected _getFormLData(): any;
            private _activateTab(l);
            setData(ldata: any): void;
            processing(value: boolean): void;
            controlByField(fieldName: string): any[];
            controlByName(name: string, includeNotCreated?: boolean): any;
            private _findControlByField(fieldName);
            private _findControlByName(name, includeNotCreated);
            loadPrefs(): void;
            supportSettings(): boolean;
            getFieldSettings(field: string): any;
            setFieldSettings(field: string, settings: any): void;
            savePrefs(after: any): void;
            sendMessage(message: string, field: string, params: any): any;
            afterSettings(field: string, widget: string, sdata: any): any;
            beforeSettings(field: string, widget: string): any;
            protected _createError(): HTMLElement;
            private _createErrorItem(error, show);
            protected clearErrors(): void;
            protected showErrorItem(error: any, clear: any): void;
            protected afterRenderChildren($e: any): void;
            private _loadNestedControllers();
            hasNestedControllers(): boolean;
            modelCreated(data: any): void;
            modelChanged(action: any, model: any, form: any, modal: any): void;
            protected afterRender($e: JQuery): void;
            protected _afterLayoutAdded(layout: any): void;
            protected changed(propName: string, ov: any, nv: any, op: string, params: any): void;
            private _showErrors();
            stateChanged(propName: any, params: any): void;
            getSchema(path: string): any;
            getLookupForSchema(path: string, lookupName: string): any;
            registerListenerFor(field: string, target: any, id?: string): void;
            unRegisterListenerFor(field: string, target: any): void;
            setValue(path: any, value: any): void;
            getValue(path: any): any;
            getParentModel(path: any): any;
            getState(path: any): any;
            private _enumListener(name, cb);
            private _rebuildListeners();
            private _match(p, cb, params);
            openInlineForm(opts: {
                where: string;
                name: any;
                meta: any;
                controller: any;
                data?: any;
                locale?: any;
            }): void;
            execAction(propName: string, actionParams?: any, params?: any): void;
            close(): void;
            broadcast(eventName: string, params: any): void;
            patch(delta: any[]): void;
            private _sendData();
            private _synModel(action);
            private _modelChanged(propName, ov, nv, op, params, actionParams);
            afterchanged(propName: any, op: any, params: any, actionParams: any): void;
            on(cb: any): void;
            _stateChanged(propName: any, params: any): void;
            destroy(): void;
            _idComponent(el: any): any;
            _event2Layout: (event: any) => any;
            private _event2FieldByElement(el);
            _event2Field(event: any): any;
            _removeBaseEvents(): void;
            _freeze(e: any): boolean;
            private _doKeyDown(event);
            private _doKeyPress(event);
            _addBaseEvents(): void;
            private _resizeControls();
            private _resizeAndAfterRender();
            protected afterAddedInDom(): void;
            protected _afterVisibilityChanged(options: {
                inDom: boolean;
                resize: boolean;
            }): void;
        }
        var FormClass: typeof Form;
        function removeForm(form: BaseLayout): void;
        var OpenForm: ($parent: JQuery, layout: any, schema: any, fdata: any, locale: any, handler: any, formOpts?: any, after?: Function) => void;
        var OpenInlineForm: (parentId: string, layout: any, schema: any, contrtoller: any, fdata: any, locale: any, after?: Function) => void;
    }
}
declare namespace Phoenix {
    module ui {
        interface ModalFormOptions {
            name: any;
            meta: any;
            controller: any;
            autoClose?: any;
            options: any;
            locale?: any;
            formParent?: string;
        }
        class ModalForm extends modal.Modal {
            constructor(formOptions: any, layout: any, schema: any, data: any, locale: any, preferences: any);
            on(hnd: any): void;
            onNatural(hnd: any): void;
        }
        class FormController {
            isFormController(): boolean;
            storageName: string;
            bindProperty: string;
            data(): any;
            beforeSetModel(model: any, form: any): void;
            initObjectState(model: any, form?: any): void;
            modelChanged(action: any, model: any, form: any, modal?: any): void;
            onModelChanged(action: any, model: any, form: any, modal?: any): any;
        }
        const loadSchema: (schema: any) => Promise<any>;
        const formController2Options: (options: any, config: any) => void;
        const OpenModalForm: (formOptions: any, layout: any, schema: any, fdata: any, locale: any, handler: any) => void;
        const showModalForm: (opts: ModalFormOptions, data?: any) => void;
        const showAutoCloseForm: (opts: ModalFormOptions, data?: any, after?: any) => void;
    }
}
declare namespace Phoenix {
    module uiutils {
        var utils: {
            useDatePicker(): boolean;
            useDateTimePicker(): boolean;
            nativeDate: () => boolean;
            nativeNumber: () => boolean;
            addErrorDiv: (html: any, noMargin?: boolean) => void;
            keyPressPassword: (event: JQueryEventObject, input: HTMLInputElement, options: any) => boolean;
            keyPressDate: (event: JQueryEventObject, input: HTMLInputElement, options: any) => boolean;
            keyPressCode: (event: JQueryEventObject, input: HTMLInputElement, options: any) => boolean;
            keyPressNumber: (event: JQueryEventObject, input: HTMLInputElement, options: any) => boolean;
            doPasteDate: (event: JQueryEventObject, input: HTMLInputElement, options: any) => boolean;
            doPasteCode: (event: JQueryEventObject, input: HTMLInputElement, options: any) => boolean;
            doPasteNumber: (event: JQueryEventObject, input: HTMLInputElement, options: any) => boolean;
            doPastePassword: (event: JQueryEventObject, input: HTMLInputElement, options: any) => boolean;
            keyDownDate: (event: JQueryEventObject, input: HTMLInputElement, options: any) => boolean;
            keyDownCode: (event: JQueryEventObject, input: HTMLInputElement, options: any) => boolean;
            keyDownNumber: (event: JQueryEventObject, input: HTMLInputElement, options: any) => boolean;
            keyDownPassword: (event: JQueryEventObject, input: HTMLInputElement, options: any) => boolean;
            addContainerId: (html: string[], authoring: boolean) => void;
            containerBaseClass: (groupClass: string, authoring: boolean, options: any) => string;
            align2Css: (align: string) => "" | "align-center" | "align-end";
            fieldWrapper: (html: string[], options: any, authoring: boolean, after: Function, customizer?: any) => void;
            fillSelect(enums: any[], input: any, schema: any): void;
            datePickerSetValue: ($element: JQuery<HTMLElement>, value: string) => void;
            datePickerInitialize: ($element: JQuery<HTMLElement>, opts: any, onHide: any) => void;
            datePickerDestroy: ($element: JQuery<HTMLElement>) => void;
            dateTimePickerSetValue: ($element: JQuery<HTMLElement>, value: string) => void;
            dateTimePickerInitialize: ($element: JQuery<HTMLElement>, opts: any, onHide: any) => void;
            dateTimePickerDestroy: ($element: JQuery<HTMLElement>) => void;
            text2value(textValue: string, schema: any, state: any): any;
            defaultOptions: {
                titleIsHidden: boolean;
                placeHolder: boolean;
                labelCol: number;
            };
            displayValue: (value: any, schema: any, locale: any, options: any, item: any, fieldName?: string) => any;
            addTooltipAndRule: (html: any, options: any) => void;
        };
    }
}
declare namespace Phoenix {
    module ui {
        class AbsField {
            protected $element: JQuery;
            state: any;
            name: any;
            protected _isBinded: boolean;
            protected _internalValue: any;
            protected _internalState: any;
            config: any;
            form: Form;
            options: any;
            focused: boolean;
            destroyed: boolean;
            focusTimer: number;
            fieldOptions: any;
            protected renderOptions: any;
            protected $lookup: any;
            protected $display: string;
            protected useDisplay: boolean;
            $schema: any;
            $schemaItems: any;
            id: string;
            $bind: string;
            parent: any;
            protected title: string;
            constructor(fp: any, options: any, form: Form);
            hide(value: boolean): void;
            setInternalValue(value: any, notify?: boolean): void;
            getInternalValue(): any;
            getSettingsName(controlName: string): string;
            targetInControl(target: any): boolean;
            focusInControl(activeFocusElement: any): boolean;
            protected setParentId(id: string): void;
            protected isMeta(): boolean;
            protected beforeSaveSettings(): boolean;
            savePreferences(after: any): any;
            protected getCustomBind(): string;
            protected getBind(): string[];
            setHidden(element: any): void;
            protected _state(): void;
            private _defineProps();
            render($parent: JQuery): void;
            appendElement($parent: JQuery, options: any): void;
            setEvents(opts: any): void;
            removeEvents(): void;
            customOptions(opts: any): void;
            showRules(): void;
            _initOptions(defOpts: any): any;
            destroy(): void;
            protected showErrors(element: any, errors: any): void;
        }
        var registerControl: (factory: any, type: string, isEnum: boolean, widget: string, options?: any) => void;
        var getRegisteredControl: (type: string, isEnum: boolean, widget: string, format: string, options: any) => any;
        var filterManagerFactory: any;
    }
}
declare namespace Phoenix {
    module ui {
        class Alert extends AbsField {
            constructor(fp: any, options: any, form: any);
            _setDisabled(input: any, element: any): void;
            _setReadOnly(input: any, element: any): void;
            _setMandatory(input: any, element: any): void;
            _label(): HTMLElement;
            _state2UI(): void;
            changed(propName: any, ov: any, nv: any, op: any): void;
            stateChanged(propName: any, params: any): void;
            render($parent: any): JQuery<HTMLElement>;
        }
    }
}
declare namespace Phoenix {
    module formcomplex {
        class ComplexBase extends ui.AbsField {
            constructor(fp: any, options: any, form: any);
            click(event: any): void;
            private _setDisabled(element);
            private _setReadOnly(element);
            private _setMandatory(element);
            private _state2UI();
            protected renderContent(parent: any): void;
            changed(propName: any, ov: any, nv: any, op: any): void;
            stateChanged(propName: any, params: any): void;
            render($parent: any): JQuery<HTMLElement>;
        }
    }
}
declare namespace Phoenix {
    module formarray {
        class ArrayControl extends formcomplex.ComplexBase {
            private _map;
            private _render;
            private _layout;
            private _id;
            private _moveDelta;
            private _moving;
            private _nOverflow;
            private _nCtrlLeft;
            private _nCtrlRight;
            private _nContainer;
            private _nInScroll;
            private _nCtrls;
            private _row;
            private _columns;
            private _cp;
            private _parent;
            private _parentItemAddedInDom;
            private _localModel;
            customOptions(options: any): void;
            _renderContentElement(item: any, index: any, itemAfter?: boolean): void;
            protected beforeRenderContent(): void;
            protected renderContent(parent: any): void;
            destroy(): void;
            setEvents(opts: any): void;
            removeEvents(): void;
            click(event: any): void;
            afterAddedInDom(): void;
            protected resize(): void;
            changed(propName: any, ov: any, nv: any, op: any): void;
            _activeMove(): void;
            _setMoveCtrls(): void;
            _move(ctx: any): void;
        }
    }
}
declare namespace Phoenix {
    module gridrender {
        var GridUtil: {
            createCols: (id: any, columns: any, options: any, authoring: boolean, locale: any, orderby: string, isFrozen: boolean) => DocumentFragment;
            createColGroup: (columns: any, options: any, isFrozen: boolean) => DocumentFragment;
            updSorting: (options: any, pc: HTMLElement, colMap: any, orderby: string) => void;
            gridContainer: (id: any, options: any, authoring: any, title: any, locale: any, columns: any, frozenColumns: any) => any;
            createRows: (id: any, rows: any, columns: any, options: any, authoring: any, locale: any, isFrozen: boolean, isTotal: boolean, cb: any, totalField: string) => DocumentFragment;
            createBulkRows: (id: any, rows: any, columns: any, options: any, authoring: any, locale: any, isFrozen: boolean, isTotal: boolean, cb: any) => DocumentFragment;
            createRow: (id: string, index: number, level: number, row: any, columns: any, options: any, authoring: boolean, locale: any, isOdd: Boolean, isFrozen: boolean, isTotal: boolean, totalOptions?: {
                colspan: number;
                columnField: string;
            }) => HTMLTableRowElement;
            setRowsSelected: (id: string, value: boolean, options: any, parent: HTMLElement) => void;
            createGridRows: (id: any, rows: any, values: any, columns: any, options: any, authoring: any, locale: any) => DocumentFragment;
            createInplaceEdit: (svalue: string, value: any, state: any, parent: HTMLElement, cell: any, col: any, opts: any) => {
                input: HTMLInputElement;
                parent: HTMLElement;
                td: HTMLElement;
                combo: any;
                isInputElement: boolean;
                canSelect: boolean;
                schema: any;
                decimals?: number;
            };
            updateInplaceEdit: (inplace: any, svalue: string, value: any, state: any, parent: HTMLElement, cell: any, col: any, opts: any) => void;
            createDetail: (id: string, childBefore: HTMLElement) => HTMLElement;
            updateEvenOdd: (pr: HTMLElement) => void;
            ensureWidth: (value: any) => string;
            updateFrozenWidth: (e: HTMLElement, id: string, cols: any) => void;
            setColumnWidth: (colId: string, colsParents: HTMLElement[], width: number) => void;
            hasFrozenColumns: (opts: any, frozenColumns: any[]) => boolean;
            cloneForMove: (element: HTMLElement) => HTMLElement;
            isPixel: (value: any) => boolean;
            widthFromSchema: (schema: any) => 50 | 110 | 150;
            resizeDiv: (parent: HTMLElement, point: any) => HTMLElement;
            getColumnsSizeParents: (id: string, parent: HTMLElement, options: any, isFrozen: boolean) => HTMLElement[];
            multiselectContainer: (id: string, maximized: boolean) => HTMLElement;
            createMultiselectItems: (id: string, container: HTMLElement, options: any, items: Observable.Data[]) => void;
            isMultiselectMinimized: (container: HTMLElement) => boolean;
            setMultiselectMinimized: (minimized: boolean, id: string, container: HTMLElement) => void;
        };
    }
}
declare namespace Phoenix {
    module formgrid {
        var toolBarFactory: (grid: BasicGrid) => any;
        var toolBarRender: ($parent: JQuery, toolbar: any, $parentBottom: JQuery) => any;
        var gridlookup: any;
        var glbGridFilter: any;
        var glbGridSettings: any;
        var glbMongoFilter2Filter: any;
        class BasicGrid extends ui.AbsField {
            columns: any[];
            frozenColumns: any[];
            opts: any;
            selectedCell: any;
            private _timeOutSelected;
            private _eventBus;
            private _settings;
            private _settingsName;
            private _ignoreNotifications;
            private _totalProperty;
            private _totalField;
            private _view;
            private _viewMap;
            private _useView;
            private _mapCols;
            private _details;
            private _onselectItemHandler;
            private _originalCols;
            private _pager;
            toolBar: any;
            private _scroller;
            private _rsTimer;
            private _rsFrozenTimer;
            private _scrollableMaster;
            private _scrollableHeaderOfMaster;
            private _scrollableFooterOfMaster;
            private _scrollableFrozenContent;
            private _deltaHScrollContent;
            private _drag;
            private inplace;
            constructor(fp: any, options: any, form: ui.Form);
            private _initOrigColumns(opts);
            private checkOptions(opts);
            protected beforeSaveSettings(): boolean;
            private _inplaceEditValue2Model(value, item, col);
            setFocus(focusParams?: any): void;
            private _inplaceEditAcceptKeys(key);
            private _inplaceEditAddEvents();
            private _inplaceEditRemoveEvents();
            private _inplaceEditGetValue(cell);
            private _inpaceEditShow(td, isFocusIn);
            private _destroyInplaceEdit();
            private _inplaceEditRemove(isFocusOut, isDestroy);
            private _inplaceEditModel2Control(item, field, td);
            removeEvents(): void;
            private _onFrozenFocusScroll(td, col);
            setEvents(opts: any): void;
            private _getColsInfo(columns, parent);
            private _canStartDrag(event);
            private _onDragStart(event);
            private _onDrag(event);
            private _onDragEnd(cancel, event);
            private _cddresize(event);
            private _sddresize(event);
            _dddresize(event: any): boolean;
            private _eddresize(cancel, event);
            private _updateColWidth(col, width);
            private _cddmove(event);
            private _cddrowmove(event);
            private _sddrowmove(event);
            private _dddrowmove(event);
            private _eddrowmove(cancel, event);
            private _sddmove(event);
            private _eddmove(cancel, event);
            _dddmove(event: any): boolean;
            destroy(): void;
            private _moveToPage(page);
            private _onselectPage(page);
            setColumns(columns: any[]): void;
            private _getMultiselectdItems();
            private _updateMultiselectSummary(isCreate);
            private _openMultiselectSummary(selectedItems, forceMaximized);
            private _closeMultiselectSummary(forceClose, toggleMinimize);
            private _toggleMultiselectSummary(selectedItems, forceMaximized);
            private _renderToolbar();
            private _createToolbar();
            protected _state(): void;
            private _destroyDetails();
            private _destroyDetailById(id);
            private _initCols(options);
            private _colByField(field);
            private _totalChanged(propName, ov, nv, op, params);
            changed(propName: string, ov: any, nv: any, op: any, params: any): boolean;
            private _modifyTD(item, field, td);
            private _findTR(id, col);
            private _id2rowId(id);
            private _findtBody(col);
            private _modifyFooterCell(item, field);
            private _findCellAndModify(item, tr, field);
            private _modifyCell(item, field, td?);
            private _rootElement();
            private _gridParentFocus();
            private _setErrors(grid, element);
            private _setTableFocus(value);
            focusIn($event: any): void;
            focusOut($event: any): void;
            _doTab(forward: boolean): boolean;
            keypress(event: JQueryEventObject): boolean;
            keydown($event: any): void;
            private _toggleGridLookup();
            private _createGridPopup();
            private _searchText();
            private _getSource(cell, options);
            private _findValue(search, cell, after);
            private _filterResult(ldata, opts, lookup, bind, display);
            private _setRemoteValue(col, item, ldata);
            private _onselectItem(value);
            private _openGridLookup();
            checkFocus(focusParams?: any): void;
            focusInControl(activeFocusElement: any): boolean;
            private _tr2rowId(tr, col);
            private _td2cell(td);
            private _td2value(td);
            mousedown(event: any): boolean;
            private _addRows(item, childrens);
            private _removeRows(item, childrens);
            dblclick(event: any): void;
            click(event: any): void;
            private _setDisabled(button, element);
            private _showSelected(cell, value, editable, mousedown);
            private canSelect(cell);
            private canEdit(cell);
            private _selectRow(id);
            private _selectCell(cell, target, mousedown);
            private _selectFirstCell(source, rowId);
            _cell(cell: any, addIndex: boolean): any;
            private _moveUpSelectedCell(count);
            protected resize(): void;
            protected _updateFrozenColumnsHeight(): void;
            private _resize();
            private syncHeaderAndFrozenScroll(e);
            private syncMasterScroll(e);
            private _removeScroller();
            private _vscroll();
            private _vsmcroll();
            private _hscroll();
            private _moveDownSelectedCell(count);
            private _moveRightSelectedCell();
            private _moveLeftSelectedCell();
            private _state2UI(inRender);
            afterAddedInDom(): void;
            private _isHidden();
            setHidden(element: any): void;
            stateChanged(propName: any, params: any): void;
            stopProppagation(event: any): void;
            private _buildView(item, index, level, _view, _viewMap);
            private _findById(id);
            private _findByIdEx(id);
            private _findNext(id);
            private _findPrev(id);
            private _renderTotalRows();
            private _renderRows(allRows, afterRow, values, isCreate);
            editDetail(item: any): void;
            private closeDetail(id);
            private _removeRow(id);
            private _updOddEven();
            private _createRow(item);
            filtrableColumns(): any[];
            private _getColumnsFromSchema();
            private _getSelectedColumns();
            private _getGroupsFromSchema();
            getColumnsForSettings(): any;
            getColumnsForFilter(mongoFilter: boolean): any;
            getColumnsForFilterExpress(fields?: any): any;
            private _updateSorting();
            private _renderColumns(opts);
            private _refreshGrid;
            toggleMultiselect(): void;
            render($parent: any): JQuery<HTMLElement>;
        }
    }
}
declare namespace Phoenix {
    module formcheck {
        class Check extends ui.AbsField {
            constructor(fp: any, options: any, form: any);
            _input(): HTMLInputElement;
            private _check();
            click(event: any): void;
            _setDisabled(input: any, element: any): void;
            _setReadOnly(input: any, element: any): void;
            _setMandatory(input: any, element: any): void;
            protected _setErrors(element: any): void;
            _state2UI(): void;
            changed(propName: any, ov: any, nv: any, op: any): void;
            stateChanged(propName: any, params: any): void;
            render($parent: any): JQuery<HTMLElement>;
        }
    }
}
declare namespace Phoenix {
    module formcolumngrid {
    }
}
declare namespace Phoenix {
    module formdropitems {
        class DropItems {
            opened: boolean;
            private static itemHeight;
            private static deltaHeight;
            private $element;
            private $parent;
            private $input;
            private options;
            private keys;
            private currentList;
            private page;
            constructor($parent: JQuery, $input: any, options: any);
            click(event: any): void;
            inMenu(target: any): boolean;
            static _itemHeight(): number;
            _checkOptions(options: any): void;
            _renderContent(): void;
            _renderElements(): void;
            private _afterHide(doFocus);
            hide(target: any): void;
            private _selectByListIndex(map, li);
            private _emptyHtmlList();
            private _show(selectedIndex);
            triggerBlurred(event: any): void;
            show(ldata: any, selectedIndex: number, ignoreNegativeSSelectedIndex: boolean): void;
            private _map();
            private _selectByPk(id, map?);
            private _findSeleted(map?);
            _isInView(e: any, parent: any): boolean;
            move(value: number): any;
            select(): void;
            private _doSelect(selected, close);
            inPopup(target: any): boolean;
            destroy(): void;
        }
    }
}
declare namespace Phoenix {
    module formedit {
        class BaseEdit extends ui.AbsField {
            protected _doSelect: boolean;
            protected _hasSymbol: boolean;
            protected _search: boolean;
            protected _searchEventBus: serial.SingleEventBus;
            constructor(fp: any, options: any, form: any);
            protected _input(): HTMLElement;
            protected _colParent(): HTMLElement;
            protected _value2Text(): any;
            protected _isPassword(): boolean;
            protected _isDate(): boolean;
            protected _isDateTime(): boolean;
            protected _isMemo(): boolean;
            protected _isNumber(): boolean;
            setFocus(focusParams?: any): void;
            protected _isMoney(): boolean;
            protected _setDisabled(input: any, element: any): void;
            protected _setReadOnly(input: any, element: any): void;
            protected _setErrors(input: any, element: any): void;
            protected _setMandatory(input: any, element: any): void;
            protected _state2UI(): void;
            protected _setSymbol(e: any): void;
            protected _value2Input(input: any): void;
            changed(propName: any, ov: any, nv: any, op: any): void;
            stateChanged(propName: any, params: any): void;
            destroy(): void;
        }
        class Edit extends BaseEdit {
            constructor(fp: any, options: any, form: any);
            beforeAppend(): void;
            mousedown(event: any): boolean;
            stopProppagation(event: any): void;
            click(event: any): void;
            internalRender($parent: any): void;
            render($parent: any): void;
            _text2value(textValue: any): any;
            protected _value2Text(): any;
            customOptions(options: any): void;
            private customOptionsMemo(options);
            private customOptionsPassword(options);
            private customOptionsDate(options);
            private customOptionsDateTime(options);
            private customOptionsNumber(options, symbol);
            private _removeEventsDate();
            private _setEventsDate();
            private _removeEventsDateTime();
            private _setEventsDateTime();
            setEvents(opts: any): void;
            removeEvents(): void;
            checkValue(value: any, after: any): void;
            paste(event: JQueryEventObject): boolean;
            protected _ignoreKeys(event: JQueryEventObject, keyPress: boolean): boolean;
            keypress(event: JQueryEventObject): boolean;
            keydown(event: JQueryEventObject): boolean;
            equals(nv: any): boolean;
            protected updateModel(): void;
            private _internalSetValue(value, isfocusOut);
            protected _input2Model(isFocusOut: boolean): void;
            focusOut(event: JQueryEventObject): void;
            destroy(): void;
        }
    }
}
declare namespace Phoenix {
}
declare namespace Phoenix {
}
declare namespace Phoenix {
    module frame {
    }
}
declare namespace Phoenix {
    module gridlookup {
        class GridItems {
            private _opened;
            private _form;
            private _searchField;
            private _parentControl;
            private _focusParams;
            private _lookup;
            private _lookupColumns;
            private _onselect;
            private _beforeColseHnd;
            private _options;
            constructor($parent: JQuery, $input: any, options: any);
            private _modelChanged(action, model, form, modalForm);
            private _checkFormLayout(form);
            private _beforeClose();
            private _checkPopup();
            readonly opened: boolean;
            focusInCombo(el: any): boolean;
            show(ds: any, parentControl: any, opts: {
                alignElementId?: string;
                openerId?: string;
                focusParams?: any;
                lookup: any;
                lookupColumns?: any[];
                display: string;
                onselect: any;
                search?: string;
            }): void;
            hide(): void;
            destroy(): void;
        }
        let utils: {
            checkGridPopup: (that: any, lookup: any, input: HTMLElement, parent: HTMLElement) => GridItems;
            closeGridLookup: (that: any, eventBus: serial.SingleEventBus, propertyName: string) => void;
            openGridLookup: (that: any, options: {
                lookup: any;
                parentControl: any;
                formControl: any;
                display: string;
                bind: string;
                align: string;
                openerId: string;
                searchText: string;
                onselect: any;
                lookupColumns: any;
                containerId: any;
                viewId: any;
                propertyName: string;
            }) => void;
        };
    }
}
declare namespace Phoenix {
    module ui {
        class Group extends AbsField {
            constructor(fp: any, options: any, form: any);
            protected _item(ii: number): HTMLElement;
            click(event: any): void;
            _setDisabled(element: any): void;
            protected _enumItems(cb: Function): void;
            _setMandatory(element: any): void;
            _state2UI(cb: Function): void;
            protected _setErrors(element: any): void;
            _getDefaultItem(): HTMLElement;
            stateChanged(propName: any, params: any): void;
        }
    }
}
declare namespace Phoenix {
    module ui {
        class BtnGroup extends Group {
            constructor(fp: any, options: any, form: any);
            _state2UI(): void;
            changed(propName: any, ov: any, nv: any, op: any): void;
            mousedown(event: any): void;
            focusIn(event: any): void;
            focusOut(event: any): void;
            setFocus(focusParams?: any): void;
            keydown($event: any): void;
            render($parent: any): JQuery<HTMLElement>;
        }
    }
}
declare namespace Phoenix {
    module formlabel {
        class Label extends ui.AbsField {
            private _parentId;
            constructor(fp: any, options: any, form: any);
            protected isMeta(): boolean;
            protected setParentId(id: string): void;
            getCustomBind(): any;
            _setDisabled(input: any, element: any): void;
            _setReadOnly(input: any, element: any): void;
            _setMandatory(input: any, element: any): void;
            _label(): HTMLElement;
            _state2UI(): void;
            stateChanged(propName: any, params: any): void;
            private _title();
            render($parent: any): JQuery<HTMLElement>;
        }
    }
}
declare namespace Phoenix {
    module formlink {
        class Link extends ui.AbsField {
            private _fpTitle;
            constructor(fp: any, options: any, form: any);
            private _button();
            protected click(event: any): void;
            private _setDisabled(button, element);
            _state2UI(): void;
            stateChanged(propName: any, params: any): void;
            render($parent: any): JQuery<HTMLElement>;
        }
    }
}
declare namespace Phoenix {
    module formlookup {
        class Lookup extends formedit.Edit {
            private lookupOptions;
            private gc;
            private menu;
            private hasCachedData;
            private cachedData;
            private modified;
            private eventBus;
            private onselectItemHandler;
            private isEnum;
            constructor(fp: any, options: any, form: any);
            customOptions(options: any): void;
            protected _value2Text(): any;
            private _getSource(options);
            private _filterResult(ldata, opts);
            private _findselected(ldata, opts);
            private _findValue(search, after);
            private _onselectItem(value);
            private _checkPopupMenu();
            mousedown(event: any): boolean;
            stopProppagation(event: any): void;
            click(event: any): void;
            beforeAppend(): void;
            private _searchText();
            private _managePreventDefault(keyCode, $event);
            private _shouldTrigger(keyCode, $event);
            setEvents(opts: any): void;
            removeEvents(): void;
            inputChanged(): void;
            checkValue(nv: any, after: any): void;
            keydown($event: JQueryEventObject): boolean;
            focusIn(event: any): void;
            focusOut(event: any): void;
            private _triggerEvent(event, $event?);
            private _checkGridPopup();
            focusInControl(activeFocusElement: any): boolean;
            private _openGridLookup();
            private _toggleGridLookup();
            private _closeMenuLookup();
            private _toggleMenuLookup();
            private _triggerKey(key, $event?);
            destroy(): void;
            checkFocus(focusParams?: any): void;
        }
    }
}
declare namespace Phoenix {
    module formpicture {
    }
}
declare namespace Phoenix {
    module ui {
        class RadioGroup extends Group {
            constructor(fp: any, options: any, form: any);
            _state2UI(): void;
            changed(propName: any, ov: any, nv: any, op: any): void;
            render($parent: any): JQuery<HTMLElement>;
        }
    }
}
declare namespace Phoenix {
    module ui {
        class ReadOnlyField extends AbsField {
            private _map;
            private $expression;
            constructor(fp: any, options: any, form: any);
            protected _state(): void;
            private _refreshValues();
            _value2UI(): void;
            private _findMap(pn);
            changed(propName: string, ov: any, nv: any, op: any): void;
            stateChanged(propName: any, params: any): void;
            _state2UI(): void;
            render($parent: any): JQuery<HTMLElement>;
            destroy(): void;
        }
    }
}
declare namespace Phoenix {
    module search {
        class Search extends formedit.Edit {
            private _searchField;
            private _query;
            private _incremental;
            constructor(fp: any, options: any, form: any);
            protected updateModel(): void;
            destroy(): void;
            keyup(event: JQueryEventObject): boolean;
            protected customKeyUp(event: any): void;
            changed(propName: any, ov: any, nv: any, op: any): void;
            protected _ignoreKeys(event: JQueryEventObject, keyPress: boolean): boolean;
        }
    }
}
declare namespace Phoenix {
    module ui {
        class Select extends formedit.BaseEdit {
            constructor(fp: any, options: any, form: any);
            private fillSelect(enums);
            protected _setDisabled(input: any, element: any): void;
            protected _setReadOnly(input: any, element: any): void;
            protected _state2UI(): void;
            private _setFilter(inRender);
            stateChanged(propName: any, params: any): void;
            render($parent: any): JQuery<HTMLElement>;
            removeEvents(): void;
            protected _value2Input(input: any): void;
            setEvents(opts: any): void;
        }
    }
}
declare namespace Phoenix {
    module wizardctrl {
        class WizardSteps extends ui.Group {
            constructor(fp: any, options: any, form: any);
            _state2UI(): void;
            changed(propName: any, ov: any, nv: any, op: any): void;
            render($parent: any): JQuery<HTMLElement>;
        }
    }
}
declare namespace Phoenix {
    module ui {
        class Toggle extends AbsField {
            constructor(fp: any, options: any, form: any);
            private _check();
            click(event: any): void;
            private _setDisabled(input, element);
            private _setReadOnly(input, element);
            private _setMandatory(input, element);
            private _state2UI();
            changed(propName: any, ov: any, nv: any, op: any): void;
            stateChanged(propName: any, params: any): void;
            render($parent: any): JQuery<HTMLElement>;
        }
    }
}
declare namespace Phoenix {
    module wizard {
    }
}
declare namespace Phoenix {
}
declare namespace Phoenix {
}
declare namespace Phoenix {
}
declare namespace Phoenix {
    var confirmDlg: (title: string, message: string, onsuccess: Function, oncancel?: Function) => void;
}
declare namespace Phoenix {
    module ui {
        class ImageMenuItem {
            private $id;
            private _options;
            private $element;
            module: any;
            constructor(data: any, options: {
                imageSrc: string;
                title: string;
                link?: any;
                maxWidth?: number;
                replaceParent?: boolean;
            });
            private _setEvents();
            private _removeEvents();
            render($parent: any): void;
            destroy(): void;
        }
    }
}
declare namespace Phoenix {
    module data {
        class OdataEnumManager {
            private _enums;
            private _entity;
            private _module;
            private _typeField;
            private _codeField;
            private _titleField;
            private _orderByField;
            private _fields;
            constructor(moduleName: string, entity: string, enumTypeField: string, enumCodeField: string, enumTitleField: string, enumOrderByField: string, fields?: string[]);
            promise(enums: any, enumType: any): any;
        }
    }
}
declare namespace Phoenix {
}
declare namespace Phoenix {
}
declare namespace Phoenix {
}
declare namespace Phoenix {
    module Data {
    }
}
declare namespace Phoenix {
    module iframe {
        class IFrame {
            private $element;
            private _options;
            constructor(options: any);
            private _setEvents();
            private _removeEvents();
            render($parent: any): void;
            destroy(): void;
        }
    }
}
declare namespace Phoenix {
    module ui {
        class FilterExpress {
            /*********************************
            ********** VARIABLES
            ********************************/
            private _cb;
            private _options;
            private _nodeParent;
            private _render;
            static FIELD_SELECT_TEXT_DEFAULT: string;
            static VALIDATE_TEXT_DEFAULT: string;
            static VALIDATE_ICON_DEFAULT: string;
            static FORMAT_STRING: string;
            static FORMAT_INTEGER: string;
            static FORMAT_ENUM: string;
            static OP_STRING: string;
            static OP_INTEGER: string;
            static OP_ENUM: string;
            /*******************************
            ************ METHODS
            *******************************/
            constructor(fieldList: any[], cb: Function, options?: any);
            fields: any[];
            destroy(): void;
            render($parent: any): void;
            _completeFieldList(fields: any): any;
        }
    }
}
declare namespace Phoenix {
    module ui {
        class DsLookup {
            private _ds;
            private _count;
            private _pageSize;
            private _page;
            private _items;
            private _options;
            private _notify;
            private _init;
            private searchText;
            constructor(ds: any, options: any);
            private _initData();
            items: any;
            private _notifyChange(propName);
            getNbPages(): number;
            private _getSkip(page);
            private _getPage(page, context?);
            currentPage(): any;
            toPage(page: any): void;
            nextPage(): void;
            prevPage(): void;
            firthPage(): void;
            lastPage(): void;
            search(searchText: any): void;
            remove(): void;
        }
    }
}
declare namespace Phoenix {
    module ui {
        class ListeOperateurs {
            liste: any;
            constructor();
            add(code: string, lib: string, isBinary: boolean, options?: any): void;
            gets(): any;
            get(code: string): any;
            remove(code: string): void;
        }
        class ListeChamps {
            liste: any;
            constructor();
            add(code: string, lib: string, type: string, options?: any): void;
            get(code: string): any;
            gets(): any;
            remove(code: string): void;
        }
        class Filter {
            id: any;
            code: any;
            op: any;
            values: any;
            constructor(id: any, code: any, op: any, values: any);
            getValues(): any;
            getValueNames(): any;
        }
        class ListeFilters {
            liste: any;
            filters: any;
            compteur: any;
            constructor(filters: any);
            add(champCode: string, opCode: string, values: any): Filter;
            add2(champCode: string, opCode: string, values: any): Filter;
            set(id: any, data: any): any;
            get(id: any): any;
            getByIndex(index: any): any;
            gets(): any;
            getsByChamp(codeChamp: any): any[];
            remove(id: any): void;
            removeAll(): void;
            removeAllByChamp(champCode: string): void;
        }
        class ListeTypes {
            liste: any;
            constructor();
            addType(code: string, lib: string, operateurs: any): void;
            get(type: string): any;
            addOperateur(codeType: string, codeOp: string): void;
            getOperateurs(codeType: string): any;
        }
        class CheckBoxList {
            private _elements;
            private _values;
            private options;
            private $element;
            private _items;
            constructor(options?: any);
            elements: any;
            values: any;
            private _notifyChange(propName);
            findVal(val: any): number;
            render($parent: any): any;
            destroy(): void;
            private removeVal(val);
            private addVal(val);
            private setEvents(opts);
            private _removeEvents();
            private renderElements(elements, values, options);
            private _inputs();
            private _setItemValue(item, value);
            private _toggleEnumByIndex(index);
        }
        class ComposantFilter extends AbsField {
            state: any;
            _options: Object;
            listeChampsArbre: any;
            listeChamps: ListeChamps;
            listeFilters: ListeFilters;
            listeTypes: ListeTypes;
            listeOperateurs: ListeOperateurs;
            constructor(fp: any, options: any, form: any);
            initData(): void;
            _updateData(): void;
            refresh(): void;
            _state(): void;
            renderInternal: (context: Object, options: Object) => void;
            createContainer: (id: string) => any;
            render($parent: any): JQuery<HTMLElement>;
            destroy(): void;
        }
    }
}
declare namespace Phoenix {
    module ui {
        var filter: {
            format: {
                toPhenix: (champs: any, filters: any) => any;
                toMongoDbFilter: (fields: any, filters: any) => any;
                toTitle: (filters: any, champs: any) => string;
            };
            removeMdbFilterExpress: (filter: any, expressFilters: any, fields: any) => any;
            addMdbFilterExpress: (filter: any, expressFilters: any, filterExpress: any) => any;
            addField: (fieldList: any, code: any, libelle: any, type: any, decimals?: any, enums?: any, enumName?: any) => void;
            addField2: (fieldList: any, code: any, libelle: any, type: any, options?: any) => void;
            transformPropsToFilterFormat: (champs: any, columns: any) => void;
            toTitle: (filters: any, champs: any) => string;
            mongoDbFilter2Filter: (filter: any, fields: any) => any;
        };
        class FilterManager {
            filterComplex: any;
            filterExpress: any;
            constructor();
            constructeFilter(): any;
        }
    }
}
declare namespace Phoenix {
    module ui {
        var multiSelectUtils: {
            transformPropsToMultiselectFormat: (columns: any, groups: any, columnsLimited?: any) => any;
            transformMultiSelectColumnsToGridColumnsFormat: (columns: any) => any[];
            transformSelectedColumnsToMultiSelectFormat: (columns: any, selectedColumns: any, groups?: any, columnsLimited?: any) => any[];
        };
    }
}
declare namespace Phoenix {
    module ui {
        class MultiSelectList {
            private _data;
            private _options;
            private _callback;
            private _selectedItems;
            private _container;
            private _nodes;
            private _name;
            private _title;
            constructor(data: any, options: any, callback?: any);
            items: any;
            selectedItems: any;
            private _init();
            private _getGroupNode(groups, name);
            private _getItemNode(items, name);
            private _getItem(items, name);
            private _getSelectedItemIndex(name);
            private _itemsIsSelected(items);
            private _itemsIsUnselected(items);
            private _constructeNodes(items, options);
            private _addTags(nodes);
            private _template();
            private _createIcon(elt, icon?, autre?);
            private _addIcon(elt, icon, autre?);
            private _setEvents();
            private _display(name, show);
            private _select(name, callback?);
            private _unSelect(name, callback?);
            private _checkF(name, isCheck?, callback?);
            private _check(name, isCheck?, callback?);
            private _checkG(name, isCheck?, callback?, children?);
            private _showItem(name);
            addItem(name: any): void;
            removeItem(name: any): void;
            private _renderItems(nodes);
            render(parent?: HTMLElement): HTMLElement;
        }
    }
}
declare namespace Phoenix {
    module ui {
        class PillBox {
            private _data;
            private _options;
            private _callback;
            private _selectedItems;
            private _container;
            private _nodes;
            private _input;
            private _name;
            private _title;
            private _menu;
            private _drag;
            constructor(data: any, options: any, callback: any);
            items: any;
            selectedItems: any;
            private _init();
            private _constructeNodes(items, options);
            private _getItem(items, name);
            private _getItemIndex(items, name);
            private _addTag(name, callback?);
            private _removeTag(name, callback?);
            private _filterList(chaine);
            private _setEvents(parent);
            private _template();
            addItem(name: any): void;
            removeItem(name: any): void;
            private _canStartDrag(event);
            private _onDragStart(event);
            private _onDrag(event);
            private _onDragEnd(cancel, event);
            private _onMenuSelectItemHandler(v);
            private _includeDropDownMenu();
            private _renderItems();
            render(parent?: HTMLElement): HTMLElement;
            remove(): void;
        }
    }
}
declare namespace Phoenix {
    module ui {
        class ComposantMultiSelect extends AbsField {
            state: any;
            opts: any;
            private multiSelectList;
            private pillBox;
            private _name;
            private _title;
            private _options;
            private _entree;
            private _sortie;
            constructor(fp: any, options: any, form: any);
            private _initMultiSelectList(entree, sortie);
            private _initPillBox(entree, sortie);
            private _getSortieItem(items, name);
            private _extractItems(liste, groupIsItem);
            _state(): void;
            _state2UI(): void;
            changed(propName: any, ov: any, nv: any, op: any, params: any): void;
            _template(id: any): any;
            render($parent: any): JQuery<HTMLElement>;
        }
    }
}
declare namespace Phoenix {
    module gridHandlers {
    }
}
declare namespace Phoenix {
    module ui {
        class ToolElement {
            id: string;
            protected config: any;
            protected $element: any;
            protected options: any;
            constructor(config: any, options?: any);
            getValue(): any;
            setValue(value: any): void;
            setOptions(value: any): void;
            protected createElement(index: any, config: any, data: any): any;
            refresh(): void;
            protected beforeAppend(): void;
            after(): void;
            render($parent: any): any;
            destroy(): void;
            protected _setEvents(): void;
            protected _removeEvents(): void;
            protected update(): void;
            protected updateRender(): void;
        }
        class ToolElementTitle extends ToolElement {
            constructor(config: any, options?: any);
            protected createElement(index: any, config: any, data: any): any;
            protected update(): void;
        }
        class ToolElementIcon extends ToolElement {
            constructor(config: any, options?: any);
            protected createElement(index: any, config: any, data: any): any;
        }
        class ToolElementButton extends ToolElement {
            constructor(config: any, options?: any);
            protected createElement(index: any, config: any, data: any): any;
        }
        class ToolElementCount extends ToolElement {
            constructor(config: any, options?: any);
            protected createElement(index: any, config: any, data: any): any;
            protected update(): void;
        }
        class ToolElementDropdownAction extends ToolElement {
            constructor(config: any, options?: any);
            protected createElement(index: any, config: any, data: any): any;
            click(event: any): void;
        }
        class ToolElementArrayAction extends ToolElement {
            private _schema;
            private _form;
            private _schemaItems;
            private _selected;
            private _bind;
            private _grid;
            constructor(config: any, options?: any);
            protected beforeAppend(): void;
            private _state2Ui();
            private _updateselected();
            private _stateOfLink(link);
            private _state();
            private findLinkByBind(bind);
            private findLinkById(id);
            stateChanged(propName: string, params: any): void;
            changed(propName: string, ov: any, nv: any, op: any, params: any): void;
            private _createImportantActions(html);
            private _createMenuActions(html);
            protected createElement(index: any, config: any, data: any): any;
            destroy(): void;
            click(event: any): void;
        }
        class ToolElementSelect extends ToolElement {
            constructor(config: any, options?: any);
            protected createElement(index: any, config: any, data: any): any;
            private _select();
            protected update(): void;
            protected _setEvents(): void;
            protected _removeEvents(): void;
        }
        class ToolElementSearch extends ToolElement {
            oldValue: any;
            constructor(config: any, options?: any);
            protected createElement(index: any, config: any, data: any): any;
            protected update(): void;
            getValue(): any;
            private _getInputValue();
            _setEvents(): void;
        }
        class ToolElementFilterExpress extends ToolElement {
            filterExpress: FilterExpress;
            constructor(config: any, options?: any);
            private _init();
            protected createElement(index: any, config: any, data: any): any;
            render($parent: any): any;
            protected updateRender(): void;
            private _formatTitle(fields, filters);
            protected update(): void;
        }
        class ToolElementFilter extends ToolElement {
            constructor(config: any, options?: any);
            protected createElement(index: any, config: any, data: any): any;
            private addTooltip(data);
            protected update(): void;
            render($parent: any): void;
        }
        class ToolBar {
            id: string;
            private _map;
            private _schema;
            private _schemaItems;
            private _form;
            private _bind;
            private toolElements;
            private options;
            private $elementTop;
            private $elementBottom;
            constructor(toolElements: any, options?: any);
            readonly form: ui.Form;
            readonly schema: any;
            readonly schemaItems: any;
            private _idComponent(el);
            getToolElement(indexOrName: any): any;
            setValue(name: any, value: any): void;
            getValue(name: any): any;
            refresh(): void;
            setOptions(name: any, value: any): void;
            getOptions(name: any): any;
            private _setEvents();
            private _controlById(id);
            private _removeEvents();
            private _renderToolElements(toolElements);
            render($parentTop: any, $parentBottom?: any): void;
            destroy(): void;
        }
        class ToolbarForm extends AbsField {
            private _toolbar;
            constructor(fp: any, options: any, form: any);
            getValue(name: any): any;
            setValue(name: any, value: any): void;
            refresh(): void;
            getOptions(name: any): any;
            setOptions(name: any, value: any): void;
            changed(propName: any, ov: any, nv: any, op: any): void;
            destroy(): void;
            click(event: any): void;
            private _createContainer(id);
            private _onSelectToolElement(toolElement);
            render($parent: any): JQuery<HTMLElement>;
        }
    }
}
