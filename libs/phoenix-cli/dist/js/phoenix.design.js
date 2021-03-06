var Phoenix;
(function (Phoenix) {
    var ui;
    (function (ui) {
        var _dom = Phoenix.dom, _ui = ui, _ipc = Phoenix.ipc, _link = Phoenix.link, _drag = Phoenix.drag, _utils = Phoenix.utils, _layoutUtils = Phoenix.layoutUtils;
        var _event2Id = function (event, root, layout) {
            var t = event.target, id = null, level, ll;
            while (t) {
                id = t.getAttribute('data-layout');
                if (id) {
                    level = parseInt(t.getAttribute('data-level') || '1', 10);
                    ll = layout.getLayoutById(id);
                    if (!ll || !_layoutUtils.canSelect(ll, level))
                        id = null;
                    if (id)
                        break;
                }
                else {
                    id = t.getAttribute('data-render');
                    if (id)
                        break;
                }
                t = (t === root) ? null : t.parentNode;
            }
            return id;
        }, _cleanIds = function (item) {
            item.$idDesign = null;
            item.$idDrag = null;
            item.$idSelect = null;
            item.$idStep2 = null;
            item.$idStep3 = null;
        }, _removeChildFromParent = function (layout, parent, index, sameParent, isLayout) {
            if (!isLayout) {
                parent.$items.splice(index, 1);
                return;
            }
            parent.$items.splice(index, 1);
            if (parent.$type === _layoutUtils.LAYOUT_ROW) {
                if (!parent.$items.length) {
                    parent.$type = _layoutUtils.LAYOUT_BLOCK;
                    parent.$origin = _layoutUtils.LAYOUT_ROW;
                    _cleanIds(parent);
                }
                else {
                    delete parent.$items[0].$colSize;
                }
            }
            else if (parent.$type === _layoutUtils.LAYOUT_ACCORDION) {
                if (!parent.$items.length) {
                    parent.$type = _layoutUtils.LAYOUT_BLOCK;
                    delete parent.$origin;
                    _cleanIds(parent);
                }
            }
        }, _addChildToParent = function (layout, parent, child, index, sameParent, isLayout) {
            if (!isLayout) {
                child.$parentId = parent.$id;
                parent.$items.splice(index, 0, child);
                return;
            }
            if (parent.$origin === _layoutUtils.LAYOUT_ROW && parent.$type !== _layoutUtils.LAYOUT_ROW) {
                delete parent.$origin;
                parent.$type = _layoutUtils.LAYOUT_ROW;
                _cleanIds(parent);
            }
            child.$parentId = parent.$id;
            if (parent.$type === _layoutUtils.LAYOUT_ROW) {
                if (child.$type === _layoutUtils.LAYOUT_BLOCK && child.$origin === _layoutUtils.LAYOUT_ROW) {
                    child.$type = _layoutUtils.LAYOUT_ROW;
                    delete child.$origin;
                }
                switch (child.$type) {
                    case _layoutUtils.LAYOUT_BLOCK:
                    case _layoutUtils.LAYOUT_ACCORDION_GROUP:
                        delete child.$origin;
                        delete child.$type;
                        _cleanIds(child);
                        break;
                    case _layoutUtils.LAYOUT_COLUMN:
                        if (!sameParent) {
                            delete child.$colSize;
                            delete child.$customColSize;
                        }
                        break;
                    default:
                        var nc = { $items: [], $auto: true };
                        nc.$items.push(child);
                        child = nc;
                        break;
                }
            }
            else if (parent.$type === _layoutUtils.LAYOUT_ACCORDION) {
                switch (child.$type) {
                    case _layoutUtils.LAYOUT_ACCORDION_GROUP:
                        break;
                    case _layoutUtils.LAYOUT_BLOCK:
                        child.$type = _layoutUtils.LAYOUT_ACCORDION_GROUP;
                        _cleanIds(child);
                        break;
                    case _layoutUtils.LAYOUT_COLUMN:
                        delete child.$colSize;
                        delete child.$customColSize;
                        child.$type = _layoutUtils.LAYOUT_ACCORDION_GROUP;
                        ;
                        _cleanIds(child);
                        break;
                    default:
                        var nc = { $type: _layoutUtils.LAYOUT_ACCORDION_GROUP, $items: [], $auto: true };
                        nc.$items.push(child);
                        child = nc;
                        break;
                }
            }
            else {
                switch (child.$type) {
                    case _layoutUtils.LAYOUT_COLUMN:
                    case _layoutUtils.LAYOUT_ACCORDION_GROUP:
                        delete child.$colSize;
                        delete child.$customColSize;
                        child.$type = _layoutUtils.LAYOUT_BLOCK;
                        _cleanIds(child);
                        if (child.$auto) {
                            child = child.$items[0];
                        }
                        break;
                }
            }
            parent.$items.splice(index, 0, child);
        }, _isRemoveButton = function (event, root) {
            var t = event.target;
            while (t) {
                if (t.hasAttribute('data-remove'))
                    return true;
                t = (t === root) ? null : t.parentNode;
            }
            return false;
        }, _isDetailButton = function (event, root) {
            var t = event.target;
            while (t) {
                if (t.hasAttribute('data-layout-detail'))
                    return true;
                t = (t === root) ? null : t.parentNode;
            }
            return false;
        }, _event = function (event) {
            return event.originalEvent ? event.originalEvent : event;
        }, _cleanCopy = function (data, onlySelf) {
            if (!data)
                return null;
            var restoreMap, map, fields, items, render, datasets;
            if (data.map) {
                restoreMap = true;
                map = data.map;
                data.map = null;
                fields = data.fields;
                data.fields = null;
            }
            if (onlySelf) {
                items = data.$items;
                if (items)
                    data.$items = [];
                render = data.$render;
                data.$render = null;
            }
            if (data.$config && data.$config.datasets) {
                datasets = data.$config.data ? data.$config.data.ds : null;
                if (datasets)
                    delete data.$config.data.ds;
            }
            var o = $.extend(true, {}, data);
            if (restoreMap) {
                data.map = map;
                data.fields = fields;
                delete o.fields;
                delete o.map;
            }
            if (onlySelf) {
                data.$items = items;
                data.$render = render;
            }
            if (datasets)
                data.$config.data.ds = datasets;
            _layoutUtils.clearMeta(o, !onlySelf);
            if (onlySelf)
                delete o.$items;
            return o;
        }, _createPositionList = function (p, exclude, placeHolder, horizontal) {
            var res = [];
            var children = p.childNodes;
            for (var i = 0, len = children.length; i < len; i++) {
                var c = children[i];
                var o = _dom.offset(c);
                var di = {
                    position: horizontal ? (o.left + (o.width >> 1)) : (o.top + (o.height >> 1)),
                    ignore: (c === exclude && !horizontal) || c.nodeType === 3 || c.hasAttribute('data-remove') || c.hasAttribute('data-ignore'),
                    placeHolder: (c === placeHolder)
                };
                res.push(di);
            }
            return res;
        }, _newIndex = function (list, position) {
            var index = 0;
            if (list.length) {
                for (var i = 0, len = list.length; i < len; i++) {
                    var v = list[i];
                    if (!v.ignore && (position < v.position)) {
                        return i;
                    }
                    index = i + 1;
                }
                return index;
            }
            return index;
        }, _indexInParent = function (parent, placeHolder, dragging, isLayout) {
            var j = 0;
            for (var i = 0, len = parent.childNodes.length; i < len; i++) {
                var c = parent.childNodes[i];
                if (c.nodeType === 3)
                    continue;
                if (c === placeHolder)
                    return j;
                if (c === dragging)
                    continue;
                if (isLayout && !c.hasAttribute('data-layout'))
                    continue;
                if (!isLayout && !c.hasAttribute('data-render'))
                    continue;
                j++;
            }
            return 0;
        }, _horizontalPlaceHolder = function (placeHolder) {
            var next = placeHolder.nextSibling, prev = placeHolder.previousSibling, left = 0, delta = 5;
            if (prev) {
                if (next)
                    left = next.offsetLeft - delta;
                else
                    left = prev.offsetLeft + prev.offsetWidth - 2 * delta;
            }
            placeHolder.style.left = parseInt(left + '', 10) + 'px';
        }, _appendPlaceHolder = function (parent, list, index, placeHolder, parentLayout, level, di, isLayout) {
            if (isLayout) {
                if (di.horizontal) {
                    _dom.addClass(placeHolder, 'drop-target-col');
                }
                else {
                    if (placeHolder.style.removeProperty) {
                        placeHolder.style.removeProperty('height');
                        placeHolder.style.removeProperty('left');
                    }
                    _dom.removeClass(placeHolder, 'drop-target-col');
                }
            }
            var _beforeAppend = function (sameParent) {
                if (placeHolder.parentNode)
                    _removePlaceHolder(placeHolder);
                if (parentLayout.$type && !sameParent) {
                    if (parentLayout.$type === 'column' && level === 1) {
                        _dom.addClass(placeHolder, 'col');
                    }
                    else {
                        _dom.removeClass(placeHolder, 'col');
                    }
                }
            };
            var doAppend = true;
            if (!list.length) {
                _beforeAppend(false);
                _dom.append(parent, placeHolder);
                doAppend = false;
            }
            if (doAppend) {
                var phIndex = -1;
                for (var i = 0, len = list.length; i < len; i++) {
                    var e = list[i];
                    if (e.placeHolder) {
                        phIndex = i;
                        if ((i === index) || (i === (index - 1))) {
                            return false;
                        }
                    }
                    else if (e.ignore) {
                        if ((i === index) && (i + 1 < len) && list[i + 1].placeHolder)
                            return false;
                        if ((i === (index - 1)) && (i > 0) && list[i - 1].placeHolder)
                            return false;
                    }
                }
                if (phIndex < 0 || index >= list.length) {
                    _beforeAppend(phIndex >= 0);
                    _dom.append(parent, placeHolder);
                }
                else {
                    var c = parent.childNodes[index];
                    _beforeAppend(phIndex >= 0);
                    _dom.before(c, placeHolder);
                }
            }
            if (di.horizontal)
                _horizontalPlaceHolder(placeHolder);
            return true;
        }, _sourceInDraging = function (element, value, isColumn) {
            if (!isColumn)
                return;
            for (var i = 0, len = element.childNodes.length; i < len; i++) {
                if (value)
                    _dom.addClass(element.childNodes[i], 'bs-none-drag');
                else
                    _dom.removeClass(element.childNodes[i], 'bs-none-drag');
            }
            if (value) {
                _dom.addClass(element, 'drag-source');
                if (isColumn === 2)
                    _dom.removeClass(element, 'auto');
            }
            else {
                _dom.removeClass(element, 'drag-source');
                if (isColumn === 2)
                    _dom.addClass(element, 'auto');
            }
        }, _createPlaceHolderOnStart = function (proto, placeHolder, isLayout, isField, isWidget, layout, data) {
            if (isLayout) {
                var isHorizontal = data.$type === _layoutUtils.LAYOUT_COLUMN;
                if (placeHolder) {
                    _removePlaceHolder(placeHolder);
                }
                placeHolder = _createEmptyPlaceHolderOnStart(null, isLayout, isField, isWidget, isHorizontal);
                _dom.addClass(placeHolder, 'drop-target');
                if (isHorizontal) {
                    proto.isColumn = 1;
                    if (data.$auto)
                        proto.isColumn = 2;
                    _sourceInDraging(proto.firstChild, true, proto.isColumn);
                    _dom.before(proto, placeHolder);
                    _horizontalPlaceHolder(placeHolder);
                }
                else {
                    _dom.addClass(proto, 'bs-none');
                    _dom.before(proto, placeHolder);
                }
            }
            else {
                placeHolder = _createEmptyPlaceHolderOnStart(placeHolder, false, isField, isWidget, false);
                _dom.before(proto, placeHolder);
                _dom.addClass(proto, 'bs-none');
            }
            return placeHolder;
        }, _createEmptyPlaceHolderOnStart = function (placeHolder, isLayout, isField, isWidget, isHorizontal) {
            if (placeHolder)
                _removePlaceHolder(placeHolder);
            placeHolder = document.createElement('div');
            placeHolder.className = 'container-fluid no-x-padding drop-layouts-zone drop-fields-zone design drop-target'
                + (isField ? " bs-island bs-field" : "") + (isWidget ? " bs-island bs-widget" : "")
                + (isHorizontal ? " drop-target-col" : "");
            return placeHolder;
        }, _createDragImage = function (isLayout) {
            var crt = document.createElement('div');
            crt.className = 'bs-drag-image';
            document.body.appendChild(crt);
            return crt;
        }, _showSelected = function ($element, layout) {
            if (!$element)
                return;
            var e = _dom.find($element.get(0), layout.$idSelect || layout.$idDrag);
            if (layout.selected)
                _dom.addClass(e, 'selected');
            else
                _dom.removeClass(e, 'selected');
        }, _onSelectedChanged = function (element, data, notify, layout) {
            if (data) {
                var p = _dom.find(element, data.$idSelect || data.$idDrag);
                if (element !== p && p) {
                    if (data.selected) {
                        var old = p.querySelector('div[data-remove="true"]');
                        if (!old) {
                            var r = $('<div class="bs-rt-button" data-remove="true"><span class="' + _dom.iconClass('times-circle') + '"></span></div>').get(0);
                            var c = p.childNodes;
                            if (c.length)
                                _dom.before(c[0], r);
                            else
                                _dom.append(p, r);
                        }
                    }
                    else {
                        var rmv = p.querySelector('div[data-remove="true"]');
                        if (rmv)
                            _dom.remove(rmv);
                    }
                }
            }
            if (notify) {
                var cd = _cleanCopy(data, true);
                if (cd)
                    delete cd.$id;
                if (data && data.$type) {
                    cd.$type = data.$type;
                    if (!data.$items || !data.$items.length || data.$items[0].$bind)
                        cd.onlyFields = true;
                    var pd = layout.getLayoutById(data.$parentId);
                    if (pd) {
                        cd.parent = _cleanCopy(pd, true);
                        ;
                        cd.parent.$type = pd.$type;
                    }
                }
                _ipc.emit("SelectedChanged", {
                    type: data ? (data.$type ? "layout" : (data.$config ? "widget" : "field")) : null,
                    id: data ? data.$id : null,
                    data: cd,
                    control: layout
                });
            }
        }, _removeEvents = function ($element, layout, design) {
            if (design) {
                $element.off('click');
                $element.find('*[draggable="true"]').off('dragstart').add($element).off('dragend');
                $element.find('*[draggable="true"]').off('dragstart');
                $element.find('.drop-layouts-zone, .drop-fields-zone').add($element).off('dragover dragenter drop');
            }
        }, _removePlaceHolder = function (placeHolder) {
            _dom.remove(placeHolder);
        }, _setEvents = function ($element, layout, design) {
            if (design) {
                var dragging, dragImage, startDrag, placeHolder, posList, stopped;
                var _restart = function () {
                    setTimeout(function () { stopped = false; }, 0);
                }, _cleanUp = function () {
                    stopped = false;
                    if (dragging) {
                        _dom.removeClass(dragging, 'bs-none');
                        if (dragging.isColumn)
                            _sourceInDraging(dragging.firstChild, false, dragging.isColumn);
                        dragging.isColumn = false;
                        dragging = null;
                    }
                    if (placeHolder) {
                        _removePlaceHolder(placeHolder);
                        placeHolder = null;
                    }
                    if (dragImage) {
                        _dom.remove(dragImage);
                        dragImage = null;
                    }
                    posList = null;
                    startDrag = false;
                    _drag.setData(null);
                }, _performDrop = function (td) {
                    var root = $element.get(0);
                    if (td) {
                        if (td.data === td.dst)
                            return;
                        var ni, oi, op, np = td.dst, moved = td.data;
                        var e = _dom.find(root, moved.$id), p = _dom.find(root, np.$idDesign), sameParent = false, c;
                        if (moved.$parentId === np.$id) {
                            op = td.dst;
                            oi = op.$items.indexOf(moved);
                            ni = td.indexInParent;
                            sameParent = true;
                            if (ni === oi)
                                return;
                        }
                        else {
                            op = td.isNew ? null : layout.getLayoutById(moved.$parentId);
                            oi = op ? op.$items.indexOf(moved) : -1;
                            ni = td.indexInParent;
                        }
                        if (oi >= 0) {
                            _removeChildFromParent(layout, op, oi, sameParent, td.isLayout);
                        }
                        _addChildToParent(layout, np, moved, ni, sameParent, td.isLayout);
                        if (!td.isNew && !td.isLayout) {
                            if (oi >= 0)
                                _dom.detach(e);
                            if (ni === (np.$items.length - 1))
                                _dom.append(p, e);
                            else {
                                c = _dom.find(root, np.$items[ni + 1].$id);
                                _dom.before(c, e);
                            }
                            if (!np.$items[ni].$bind) {
                                var toUpdate = [op];
                                if (np !== op)
                                    toUpdate.push(np);
                                _removeEvents($element, layout, design);
                                _setEvents($element, layout, design);
                                toUpdate.forEach(function (item) {
                                    layout._afterPropsChanged(item);
                                });
                                return;
                            }
                            layout.check(null);
                        }
                        else {
                            layout.check(null);
                        }
                        layout.render();
                    }
                };
                $element.on('click', function (event) {
                    var id = _event2Id(event, $element.get(0), layout);
                    if (_isRemoveButton(event, $element.get(0))) {
                        layout.removeChild(id);
                        return;
                    }
                    else if (_isDetailButton(event, $element.get(0))) {
                        layout.authoringChild(id);
                        return;
                    }
                    layout.select(id);
                });
                $element.find('*[draggable="true"]').on('dragstart', function (event) {
                    event.stopPropagation();
                    var isField = false, isLayout = true, isWidget = false;
                    var l = layout.getLayoutById(this.getAttribute('data-layout'));
                    if (!l) {
                        l = layout.getFieldById(this.getAttribute('data-render'));
                        isWidget = (l.$config != null);
                        isField = !isWidget;
                        isLayout = false;
                    }
                    if (!l) {
                        event.preventDefault();
                        return false;
                    }
                    else {
                        if (l.selected)
                            layout.select(null);
                        var dt = _event(event).dataTransfer;
                        dt.effectAllowed = 'move';
                        dt.setData('Text', 'data');
                        if (isLayout && dt.setDragImage) {
                            dragImage = _createDragImage(true);
                            dt.setDragImage(dragImage, 0, 0);
                        }
                        var ll = layout.getLayoutById(l.$parentId);
                        if (ll && ll.$auto) {
                            l = ll;
                        }
                        _drag.setData({
                            data: l,
                            isLayout: isLayout,
                            isField: isField,
                            isWidget: isWidget,
                            isNew: false
                        });
                        dragging = _dom.find($element.get(0), l.$idDrag);
                        startDrag = true;
                    }
                }).add($element).on('dragend', function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    _cleanUp();
                    return false;
                });
                $element.find('.drop-layouts-zone, .drop-fields-zone').add($element).on('dragover dragenter drop', function (event) {
                    var t = this, td = _drag.getData(), e = _event(event), dt = e.dataTransfer;
                    event.stopPropagation();
                    if (stopped)
                        return true;
                    if (!td || (!td.isLayout && !_dom.hasClass(t, 'drop-fields-zone')) ||
                        (td.isLayout && !_dom.hasClass(t, 'drop-layouts-zone'))) {
                        dt.effectAllowed = 'none';
                        return true;
                    }
                    if (event.type === 'drop') {
                        event.preventDefault();
                        var dst = layout.getLayoutById(t.getAttribute('data-layout'));
                        var dstLevel = t.getAttribute('data-level');
                        if (dst) {
                            td = _drag.getData();
                            td.dst = dst;
                            td.dstLevel = dstLevel;
                            td.indexInParent = _indexInParent(t, placeHolder, dragging, td.isLayout);
                            _drag.setData(td);
                            _cleanUp();
                            _performDrop(td);
                            return false;
                        }
                        _cleanUp();
                        return false;
                    }
                    dt.getData('Text');
                    if (startDrag) {
                        if (!dragging)
                            return;
                        startDrag = false;
                        if (!td.isNew) {
                            stopped = true;
                            placeHolder = _createPlaceHolderOnStart(dragging, placeHolder, td.isLayout, td.isField, td.isWidget, layout, td.data);
                            _restart();
                            event.preventDefault();
                            return false;
                        }
                    }
                    var p = layout.getLayoutById(t.getAttribute('data-layout'));
                    var level = t.getAttribute('data-level');
                    if (!placeHolder) {
                        if (!td.isNew)
                            return true;
                        var di = layout._canDropChild(td.data, p, level);
                        if (!di) {
                            dt.effectAllowed = 'none';
                            return true;
                        }
                        posList = _createPositionList(t, dragging, placeHolder, di.horizontal);
                        var iph = _newIndex(posList, di.horizontal ? e.pageX : e.pageY);
                        placeHolder = _createEmptyPlaceHolderOnStart(placeHolder, td.isLayout, td.isField, td.isWidget, di.horizontal);
                        _appendPlaceHolder(t, posList, iph, placeHolder, p, level, di, td.isLayout);
                        posList = null;
                        event.preventDefault();
                        return false;
                    }
                    if (event.type === 'dragenter')
                        posList = null;
                    if (dragging === t) {
                        dt.effectAllowed = 'none';
                        return true;
                    }
                    var dri = layout._canDropChild(td.data, p, level);
                    if (!dri) {
                        dt.effectAllowed = 'none';
                        return true;
                    }
                    if (!posList)
                        posList = _createPositionList(t, dragging, placeHolder, dri.horizontal);
                    var ii = _newIndex(posList, dri.horizontal ? e.pageX : e.pageY);
                    if (_appendPlaceHolder(t, posList, ii, placeHolder, p, level, dri, td.isLayout)) {
                        posList = null;
                    }
                    event.preventDefault();
                    return false;
                });
            }
        }, _methods = {
            _setDesignListeners: function (layout) {
                _ipc.listen('onToolBoxDragend', function () {
                    if (this.$element) {
                        this.$element.trigger('dragend');
                    }
                }, this);
                _ipc.listen('onUpdateSelected', function (data) {
                    if (data.type === "layout") {
                        this.updateLayout(data.id, data.data);
                    }
                    else
                        this.updateField(data.id, data.data);
                }, this);
                _ipc.listen('onAuthoringModeChanged', function (value) {
                    this.setDesignMode(value);
                }, this);
                _ipc.listen('onSaveLayout', function () {
                    if (this.saveHandler) {
                        var o = _cleanCopy(this.data, false);
                        this.saveHandler(o);
                    }
                }, this);
                _ipc.listen('onNewLayout', function (data) {
                    if (this.createHandler) {
                        var o = _cleanCopy(this.data, false);
                        this.createHandler(data.name, o);
                    }
                }, this);
                _ipc.listen('onLoadNestedLayouts', function (data) {
                    if (this.loadNestedHandler) {
                        this.loadNestedHandler(data.data, data.after);
                    }
                }, this);
                _ipc.listen('onOpenLayout', function (data) {
                    if (this.openHandler) {
                        this.openHandler(data.name);
                    }
                }, this);
                _ipc.listen('onRemoveLayout', function () {
                    if (this.removeHandler) {
                        this.removeHandler();
                    }
                }, this);
                _ipc.listen('onListLayout', function (after) {
                    if (this.listHandler) {
                        this.listHandler(after);
                    }
                }, this);
            },
            _afterCreate: function () {
                var that = this;
                if (that.options.form && that.options.design)
                    _utils.nextTick(function () {
                        _ipc.emit('FormData', {
                            schema: that.$schema,
                            locale: that.$locale
                        });
                    });
            },
            authoringChild: function (id) {
                var that = this;
                var ll = that.getLayoutById(id);
                if (ll && ll.$ref) {
                    if (that.options.form) {
                        var params = { name: ll.$ref };
                        if (ll.$refProperty)
                            params.path = ll.$refProperty;
                        var ctx = _link.context();
                        params.schema = ctx.$url.prototype ? ctx.$url.prototype : that.data.name;
                        params.locale = ctx.$url.locale ? ctx.$url.locale : that.data.name;
                        _link.doFormAuthoring(params);
                    }
                    else
                        _link.doAuthoring(ll.$ref, true);
                }
            },
            _removeEvents: function () {
                var that = this;
                _removeEvents(that.$element, that, true);
                that._removeBaseEvents();
            },
            _addEvents: function () {
                var that = this;
                _setEvents(that.$element, that, that.options.design);
                that._addBaseEvents();
            },
            _onSelectedChanged: function (element, data, notify) {
                var that = this;
                _onSelectedChanged(element, data, notify, that);
            },
            _showSelected: function ($element, layout) {
                _showSelected($element, layout);
            },
            _canDropChild: function (child, parent, parentLevel) {
                var that = this;
                if (parent && parent.$type && parent.$ref)
                    return null;
                if (child.$type) {
                    parentLevel = parseInt(parentLevel || '1', 10);
                    if (!parent || !child)
                        return null;
                    if (parent === child)
                        return null;
                    if (that.isChildOf(child, parent))
                        return null;
                    if (parent.$type === 'row')
                        return { horizontal: true };
                    else
                        return { horizontal: false };
                }
                else if (child.$bind || child.$config) {
                    var i = parent.$items.length;
                    if (!i)
                        return { horizontal: false };
                    var ctype = child.$bind ? '$bind' : '$config';
                    while (i--) {
                        if (!parent.$items[i][ctype])
                            return null;
                    }
                    return { horizontal: false };
                }
                return null;
            },
            toString: function (layout) {
                var o = _cleanCopy(layout || this.data, false);
                return JSON.stringify(o);
            }
        };
        $.extend(_ui.Layout.prototype, _methods);
        $.extend(_ui.Form.prototype, _methods);
    })(ui = Phoenix.ui || (Phoenix.ui = {}));
})(Phoenix || (Phoenix = {}));

var Phoenix;
(function (Phoenix) {
    var authpropedit;
    (function (authpropedit) {
        var _p = Phoenix, _utils = _p.utils, _ipc = _p.ipc, _locale = _p.locale, _ui = _p.ui, _lu = _p.layoutUtils, _dom = _p.dom;
        var PropertyEditor = (function () {
            function PropertyEditor(options) {
                this.$element = null;
                this.form = null;
                this.$id = _utils.allocID();
                this.options = options || {};
                this.selected = null;
                this._setListeners();
            }
            PropertyEditor.prototype._sendLayout = function (model) {
                var that = this;
                if (that.selected && that.selected.id) {
                    _utils.nextTick(function () {
                        var o = that._model2layout(model);
                        if (o) {
                            _ipc.emit('UpdateSelected', { type: "layout", id: that.selected.id, data: o });
                        }
                    });
                }
            };
            PropertyEditor.prototype._updateFields = function (model) {
                var that = this;
                if (that.selected && that.selected.id) {
                    if (that.selected.data && that.selected.data.$config)
                        that.selected.data.$config = JSON.parse(model.options);
                    else
                        that.selected.data = JSON.parse(model.options);
                    _utils.nextTick(function () {
                        _ipc.emit('UpdateSelected', that.selected);
                    });
                }
            };
            PropertyEditor.prototype._hasData = function () {
                return this.selected && this.selected.type;
            };
            PropertyEditor.prototype._setListeners = function () {
                _ipc.listen('onSelectedChanged', function (data) {
                    var that = this;
                    that.selected = data;
                    var e = that.$element.get(0);
                    if (!that._hasData()) {
                        _dom.addClass(e, 'bs-none');
                        return;
                    }
                    _dom.removeClass(e, 'bs-none');
                    var isLayout = that.selected.type === "layout";
                    if (that.$element) {
                        var json = data.data;
                        if (json && json.$config) {
                            json = json.$config;
                        }
                        that._setJson(json, isLayout);
                    }
                }, this);
                _ipc.listen('onAuthoringModeChanged', function (value) {
                    this.setDesignMode(value);
                }, this);
            };
            PropertyEditor.prototype._model2layout = function (model) {
                var that = this, changed = false;
                ;
                var layout = that.selected.data;
                var o = {};
                var tv = model.childrenFlow;
                if (tv === _lu.LAYOUT_BLOCK) {
                    if (layout.$type === "column") {
                        tv = "column";
                    }
                    else if (layout.$type === _lu.LAYOUT_ACCORDION_GROUP) {
                        tv = _lu.LAYOUT_ACCORDION_GROUP;
                    }
                }
                var isAccordion = tv === _lu.LAYOUT_ACCORDION;
                var isAccordionGroup = tv === _lu.LAYOUT_ACCORDION_GROUP;
                var ot = layout.$origin || layout.$type;
                if (tv !== ot) {
                    o.$type = tv;
                    changed = true;
                }
                var ot = layout.$ref || layout.$type;
                o.$ref = model.subLayoutName;
                if (!changed && (layout.$ref || '') !== (model.subLayoutName || ''))
                    changed = true;
                o.$refProperty = model.subPathSchema;
                if (!changed && (layout.$refProperty || '') !== (model.subPathSchema || ''))
                    changed = true;
                o.$forceTable = model.forceTable;
                if (!changed && (layout.$forceTable || false) !== (model.forceTable || false))
                    changed = true;
                o.$name = model.name;
                if (!changed && (layout.$name || '') !== (model.name || ''))
                    changed = true;
                if (tv === _lu.LAYOUT_BLOCK) {
                    o.$sticky = model.sticky;
                    if (!changed && (layout.$sticky || '') !== (model.sticky || ''))
                        changed = true;
                }
                o.$refController = model.subController;
                if (!changed && (layout.$refController || '') !== (model.subController || ''))
                    changed = true;
                o.$style = model.style;
                if (!changed && (layout.$style || '') !== (model.style || ''))
                    changed = true;
                var bp = (tv === _lu.LAYOUT_ACCORDION && model.format === 'none') ? model.bindPages : undefined;
                o.$bindPages = bp;
                if (layout.$bindPages !== bp) {
                    changed = true;
                }
                if (!model.$states.colSize.isHidden) {
                    if (tv === "column") {
                        if (model.colSize !== layout.$colSize) {
                            o.$colSize = model.colSize;
                            changed = true;
                        }
                        if ((model.customColSize || '') !== (layout.$customColSize || '')) {
                            o.$customColSize = model.customColSize;
                            changed = true;
                        }
                    }
                    else if (layout.parent && layout.parent.$auto) {
                        if (model.colSize !== layout.parent.$colSize) {
                            o.parent = o.parent || {};
                            o.parent.$colSize = model.colSize;
                            changed = true;
                        }
                        if ((model.customColSize || '') !== (layout.parent.$customColSize || '')) {
                            o.parent = o.parent || {};
                            o.parent.$customColSize = model.customColSize;
                            changed = true;
                        }
                    }
                }
                if (!model.$states.showTitle.isHidden) {
                    if (model.showTitle) {
                        if (!layout.$title) {
                            changed = true;
                            o.$title = {};
                            o.$title.value = model.title;
                            if (!isAccordionGroup) {
                                o.$title.size = model.titleSize;
                                o.$title.$style = model.titleStyle;
                            }
                        }
                        else {
                            if (!layout.$title.value !== model.title) {
                                changed = true;
                                o.$title = o.$title || {};
                                o.$title.value = model.title;
                            }
                            if (!isAccordionGroup) {
                                if (!layout.$title.size !== model.titleSize) {
                                    changed = true;
                                    o.$title = o.$title || {};
                                    o.$title.size = model.titleSize;
                                }
                                if (!layout.$title.$style !== model.titleStyle) {
                                    changed = true;
                                    o.$title = o.$title || {};
                                    o.$title.$style = model.titleStyle;
                                }
                            }
                        }
                    }
                    else {
                        if (layout.$title) {
                            changed = true;
                        }
                    }
                }
                else if (layout.$title) {
                    changed = true;
                }
                if (isAccordion) {
                    var ov = layout.$widget;
                    var nv = model.format === _lu.LAYOUT_ACCORDION ? undefined : model.format;
                    if (ov !== nv) {
                        changed = true;
                    }
                    o.$widget = nv;
                }
                if (!model.$states.formType.isHidden) {
                    var mt = model.formType;
                    var ov = layout.$inline ? 'inline' : ((layout.$fieldsOptions && layout.$fieldsOptions.columns ? 'horizontal' : 'block'));
                    o.$fieldsOptions = {};
                    if (mt !== ot) {
                        changed = true;
                        switch (mt) {
                            case _lu.LAYOUT_BLOCK:
                                o.$inline = false;
                                o.$fieldsOptions.columns = false;
                                break;
                            case 'horizontal':
                                o.$inline = false;
                                o.$fieldsOptions.columns = true;
                                o.$fieldsOptions.labelCol = model.labelCol;
                                break;
                            case 'inline':
                                o.$inline = true;
                                o.$fieldsOptions.columns = false;
                                break;
                        }
                    }
                    else if (mt === 'horizontal' && o.$fieldsOptions.labelCol !== model.labelCol) {
                        o.$fieldsOptions.labelCol = model.labelCol;
                        changed = true;
                    }
                    if (o.$fieldsOptions.labelCol && o.$fieldsOptions.labelCol == 3)
                        delete o.$fieldsOptions.labelCol;
                    var oth = (layout.$fieldsOptions && layout.$fieldsOptions.titleIsHidden ? true : false);
                    if (oth !== model.titleIsHidden) {
                        o.$fieldsOptions.titleIsHidden = model.titleIsHidden;
                        changed = true;
                    }
                }
                if (!changed)
                    return null;
                return o;
            };
            PropertyEditor.prototype._schemaFields = function () {
                return {
                    links: {
                        apply: {
                            title: _locale.layouts.design.actionApply
                        }
                    },
                    properties: {
                        options: {
                            type: "string",
                            format: "json"
                        }
                    }
                };
            };
            PropertyEditor.prototype._field2FormData = function (value) {
                return {
                    options: JSON.stringify(value, null, 2),
                };
            };
            PropertyEditor.prototype._layoutFields = function () {
                return {
                    name: _utils.allocID(),
                    $type: _lu.LAYOUT_BLOCK,
                    $items: [
                        {
                            $type: _lu.LAYOUT_BLOCK,
                            $title: { value: _locale.layouts.design.properties },
                            $items: [
                                { $bind: "options", options: { rows: 5 } }
                            ]
                        },
                        {
                            $type: "row",
                            $items: [
                                {
                                    $bind: "title",
                                    $inline: true,
                                    $items: [
                                        {
                                            $bind: "$links.apply",
                                            options: {
                                                "type": "primary",
                                                "right": true
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                };
            };
            PropertyEditor.prototype._schemaLayout = function () {
                return {
                    links: {
                        apply: {
                            title: _locale.layouts.design.actionApply
                        }
                    },
                    properties: {
                        typeLayout: {
                            type: "string"
                        },
                        forceTable: {
                            title: _locale.layouts.design.forceDisplayTable,
                            type: "boolean"
                        },
                        name: {
                            title: _locale.layouts.design.name,
                            type: "string"
                        },
                        showTitle: {
                            title: _locale.layouts.design.showTitle,
                            type: "boolean"
                        },
                        title: {
                            type: "string",
                            title: _locale.layouts.design.Title
                        },
                        bindPages: {
                            type: "string",
                            title: _locale.layouts.design.bindPagesTitle
                        },
                        titleSize: {
                            type: "number",
                            title: "Size",
                            enum: [1, 2, 3, 4, 5, 6],
                            enumNames: ["H1", "H2", "H3", "H4", "H5", "H6"]
                        },
                        titleStyle: {
                            type: "string",
                            title: "Style"
                        },
                        childrenFlow: {
                            type: "string",
                            title: _locale.layouts.design.childrenFlow,
                            enum: [_lu.LAYOUT_BLOCK, _lu.LAYOUT_ROW, _lu.LAYOUT_ACCORDION],
                            enumNames: [_locale.layouts.design.childrenFlowVertical, _locale.layouts.design.childrenTableCell, _locale.layouts.design.childrenAccordionGroup],
                            filters: {
                                blockrow: [_lu.LAYOUT_BLOCK, _lu.LAYOUT_ROW],
                                onlyblock: [_lu.LAYOUT_BLOCK],
                                accordion: [_lu.LAYOUT_ACCORDION]
                            }
                        },
                        format: {
                            type: "string",
                            title: _locale.layouts.design.appearance,
                            enum: [_lu.LAYOUT_ACCORDION, 'tabs', 'none'],
                            enumNames: [_locale.layouts.design.appearanceAccordion, _locale.layouts.design.appearanceTabs, _locale.layouts.design.appearanceWizard]
                        },
                        subLayoutName: {
                            type: "string",
                            title: _locale.layouts.design.nestedLayoutName
                        },
                        subPathSchema: {
                            type: "string",
                            title: _locale.layouts.design.nestedLayoutBind
                        },
                        subController: {
                            type: "string",
                            title: _locale.layouts.design.nestedFormController
                        },
                        style: {
                            type: "string",
                            title: _locale.layouts.design.customStyle
                        },
                        colSize: {
                            type: "number",
                            title: _locale.layouts.design.columnSize,
                            enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                            enumNames: ["08.33%", "16.67%", "25.00%", "33.33%", "41.37%", "50.00%", "58.33%", "66.67%", "75.00%", "83.33%", "91.33%", "100.00%"]
                        },
                        customSize: {
                            type: "string",
                            title: _locale.layouts.design.customColumnSize
                        },
                        formType: {
                            title: _locale.layouts.design.formType,
                            enum: [_lu.LAYOUT_BLOCK, "horizontal", "inline"],
                            enumNames: [_locale.layouts.design.ftVertical, _locale.layouts.design.ftHorizontal, _locale.layouts.design.ftInline],
                            type: "string"
                        },
                        labelCol: {
                            title: _locale.layouts.design.labelSize,
                            enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                            type: "number"
                        },
                        sticky: {
                            title: _locale.layouts.design.blockPosition,
                            type: "string",
                            enum: ['', 'top', 'bottom'],
                            enumNames: [_locale.layouts.design.bpStatic, _locale.layouts.design.bpStickyTop, _locale.layouts.design.bpStickyBottom],
                        },
                        titleIsHidden: {
                            title: _locale.layouts.design.noTitlesForFields,
                            type: "boolean"
                        }
                    }
                };
            };
            PropertyEditor.prototype._layout2FormData = function (layout) {
                var that = this;
                var cv = layout.$origin || layout.$type;
                var cf = _lu.LAYOUT_BLOCK, cff = 'onlyblock';
                var colLayout = layout;
                var isAccordionGroup = (cv === _lu.LAYOUT_ACCORDION_GROUP);
                var isAccordion = (cv === _lu.LAYOUT_ACCORDION);
                var format = isAccordion ? (layout.$widget || _lu.LAYOUT_ACCORDION) : _lu.LAYOUT_ACCORDION;
                var titleVisible = (that.options.form && (cv === _lu.LAYOUT_BLOCK || cv === "column")) || isAccordionGroup;
                var refVisible = (isAccordionGroup || cv === _lu.LAYOUT_BLOCK || cv === "column");
                var showTitle = (titleVisible && !!layout.$title) || isAccordionGroup;
                if (isAccordionGroup) {
                    if (layout.$title && layout.$title.size)
                        layout.$title.size = 4;
                }
                if (["column", _lu.LAYOUT_BLOCK, "row"].indexOf(cv) >= 0) {
                    if (cv === 'row')
                        cf = 'row';
                    if (layout.parent)
                        cff = 'blockrow';
                }
                else if (cv === _lu.LAYOUT_ACCORDION) {
                    cff = _lu.LAYOUT_ACCORDION;
                    cf = _lu.LAYOUT_ACCORDION;
                }
                var colInfoVisible = false;
                if (cv === "column" || (layout.parent && layout.parent.$auto && layout.parent.$type === "column")) {
                    colInfoVisible = true;
                    colLayout = cv === "column" ? layout : layout.parent;
                }
                var onlyFields = that.options.form && layout.onlyFields && !layout.$ref;
                var ft = layout.$inline ? 'inline' : ((layout.$fieldsOptions && layout.$fieldsOptions.columns ? 'horizontal' : _lu.LAYOUT_BLOCK));
                return {
                    typeLayout: cv,
                    showTitle: showTitle,
                    name: layout.$name,
                    title: layout.$title && layout.$title.value ? layout.$title.value : '',
                    titleSize: layout.$title && layout.$title.size ? layout.$title.size : 4,
                    titleStyle: layout.$title && layout.$title.$style ? layout.$title.$style : '',
                    childrenFlow: cf,
                    bindPages: layout.$bindPages,
                    colSize: layout.$colSize || 0,
                    customSize: layout.$customColSize,
                    formType: ft,
                    format: format,
                    subLayoutName: layout.$ref,
                    subPathSchema: layout.$refProperty,
                    forceTable: layout.$forceTable,
                    subController: layout.$refController,
                    style: layout.$style,
                    labelCol: (layout.$fieldsOptions && layout.$fieldsOptions.labelCol ? layout.$fieldsOptions.labelCol : 3),
                    titleIsHidden: (layout.$fieldsOptions && layout.$fieldsOptions.titleIsHidden ? true : false),
                    sticky: (cv === _lu.LAYOUT_BLOCK ? (layout.$sticky || '') : ''),
                    $states: {
                        showTitle: {
                            isHidden: !titleVisible,
                            isDisabled: isAccordionGroup
                        },
                        title: {
                            isHidden: !titleVisible || !showTitle
                        },
                        bindPages: {
                            isHidden: !(cv === _lu.LAYOUT_ACCORDION && layout.$widget === 'none')
                        },
                        titleSize: {
                            isHidden: (!titleVisible || !showTitle) || isAccordionGroup
                        },
                        titleStyle: {
                            isHidden: (!titleVisible || !showTitle) || isAccordionGroup
                        },
                        colSize: {
                            isHidden: !colInfoVisible
                        },
                        customSize: {
                            isHidden: !colInfoVisible
                        },
                        childrenFlow: {
                            filter: cff,
                        },
                        format: {
                            isHidden: !isAccordion
                        },
                        formType: {
                            isHidden: !onlyFields
                        },
                        labelCol: {
                            isHidden: !onlyFields || ft !== 'horizontal'
                        },
                        titleIsHidden: {
                            isHidden: !onlyFields
                        },
                        subLayoutName: {
                            isHidden: !refVisible
                        },
                        forceTable: {
                            isHidden: cv !== _lu.LAYOUT_ROW
                        },
                        subPathSchema: {
                            isHidden: !refVisible || !that.options.form
                        },
                        subController: {
                            isHidden: !refVisible || !that.options.form
                        },
                        sticky: {
                            isHidden: cv !== _lu.LAYOUT_BLOCK
                        }
                    },
                    $links: {
                        apply: { isDisabled: true }
                    }
                };
            };
            PropertyEditor.prototype._emptyContent = function () {
                var that = this;
                if (that.form) {
                    _ui.removeForm(that.form);
                    that.form = null;
                }
                _dom.empty(that.$element.get(0));
            };
            PropertyEditor.prototype._layoutEdit = function () {
                return {
                    name: _utils.allocID(),
                    $type: _lu.LAYOUT_BLOCK,
                    $items: [
                        {
                            $title: { value: "Title" },
                            $bindState: "showTitle",
                            $type: _lu.LAYOUT_BLOCK,
                            $items: [
                                { $bind: "showTitle" }, { $bind: "title" }, { $bind: "titleSize" }, { $bind: "titleStyle" }
                            ]
                        },
                        {
                            $type: _lu.LAYOUT_BLOCK,
                            $title: { value: _locale.layouts.design.properties },
                            $items: [
                                { $bind: "name" },
                                { $bind: "childrenFlow" },
                                { $bind: "forceTable" },
                                { $bind: "format" },
                                { $bind: "sticky" },
                                { $bind: "bindPages" },
                                { $bind: "subLayoutName" },
                                { $bind: "subPathSchema" },
                                { $bind: "subController" },
                                { $bind: "style" },
                                { $bind: "colSize" },
                                { $bind: "customSize" }
                            ]
                        },
                        {
                            $type: _lu.LAYOUT_BLOCK,
                            $bindState: "formType",
                            $title: { value: _locale.layouts.design.fieldsTitle },
                            $items: [
                                { $bind: "formType" },
                                { $bind: "labelCol" },
                                { $bind: "titleIsHidden" }
                            ]
                        },
                        {
                            $type: "row",
                            $items: [
                                {
                                    $bind: "title",
                                    $inline: true,
                                    $items: [
                                        {
                                            $bind: "$links.apply",
                                            options: {
                                                "type": "primary",
                                                "right": true
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                };
            };
            PropertyEditor.prototype._setJson = function (value, isLayout) {
                var that = this;
                that._emptyContent();
                if (isLayout) {
                    _ui.OpenForm(that.$element, that._layoutEdit(), that._schemaLayout(), that._layout2FormData(value), {}, function (action, model, form) {
                        var activateApply = false;
                        if (action.operation === 'propchange') {
                            var isAccordionGroup = (model.typeLayout === _lu.LAYOUT_ACCORDION_GROUP);
                            switch (action.property) {
                                case "showTitle":
                                    if (!isAccordionGroup) {
                                        model.$states.title.isHidden = !model.showTitle;
                                        model.$states.titleSize.isHidden = !model.showTitle;
                                        model.$states.titleStyle.isHidden = !model.showTitle;
                                        activateApply = true;
                                    }
                                    break;
                                case "formType":
                                    model.$states.labelCol.isHidden = model.$states.showTitle.isHidden || model.formType !== 'horizontal';
                                    activateApply = true;
                                    break;
                                case "childrenFlow":
                                case "colSize":
                                    if (!model.validate())
                                        return;
                                    that._sendLayout(model);
                                    break;
                                case "subLayoutName":
                                    if (!model.validate())
                                        return;
                                    that._sendLayout(model);
                                    break;
                                case "subPathSchema":
                                    if (!model.validate())
                                        return;
                                    if (model.subLayoutName)
                                        that._sendLayout(model);
                                    else
                                        activateApply = true;
                                    break;
                                case "forceTable":
                                    if (!model.validate())
                                        return;
                                    that._sendLayout(model);
                                    break;
                                case "format":
                                    model.$states.bindPages.isHidden = !(model.typeLayout === _lu.LAYOUT_ACCORDION && model.format === 'none');
                                default:
                                    activateApply = true;
                                    break;
                            }
                            if (activateApply) {
                                model.$links.apply.isDisabled = false;
                            }
                        }
                        if (action.operation === 'execute' && action.property === "$links.apply") {
                            if (!model.validate())
                                return;
                            that._sendLayout(model);
                        }
                    }, null, {}, function (form) {
                        that.form = form;
                    });
                }
                else {
                    _ui.OpenForm(that.$element, that._layoutFields(), that._schemaFields(), that._field2FormData(value), {}, function (action, model, form) {
                        var activateApply = false;
                        if (action.operation === 'propchange') {
                            switch (action.property) {
                                default:
                                    activateApply = true;
                                    break;
                            }
                            if (activateApply) {
                                model.$links.apply.isDisabled = false;
                            }
                        }
                        if (action.operation === 'execute' && action.property === "$links.apply") {
                            if (!model.validate())
                                return;
                            that._updateFields(model);
                        }
                    }, null, {}, function (form) {
                        that.form = form;
                    });
                }
            };
            PropertyEditor.prototype.setDesignMode = function (value) {
                this.options.design = value;
                if (this.$element) {
                    if (this.options.design && this.selected)
                        _dom.removeClass(this.$element.get(0), 'bs-none');
                    else
                        _dom.addClass(this.$element.get(0), 'bs-none');
                }
            };
            PropertyEditor.prototype.render = function ($parent) {
                var that = this;
                if (!that.$element) {
                    that.$element = $('<div id= "' + that.$id + '"></div>');
                    if (that.options.beforeAdd)
                        that.options.beforeAdd(that.$element);
                }
                if ($parent) {
                    if (that.options.replaceParent)
                        $parent.replaceWith(that.$element);
                    else
                        $parent.append(that.$element);
                }
                return that.$element;
            };
            PropertyEditor.prototype.destroy = function () {
                var that = this;
                if (that.form) {
                    that.form.destroy();
                    that.form = null;
                }
                if (that.$element) {
                    that.$element = null;
                }
                _ipc.unlisten(that);
            };
            return PropertyEditor;
        }());
        authpropedit.PropertyEditor = PropertyEditor;
        ;
    })(authpropedit = Phoenix.authpropedit || (Phoenix.authpropedit = {}));
})(Phoenix || (Phoenix = {}));

var Phoenix;
(function (Phoenix) {
    var _p = Phoenix, _utils = _p.utils, _ipc = _p.ipc, _build = _p.build, _drag = _p.drag, _dom = _p.dom, _ui = _p.ui, _locale = _p.locale, _pagecontrol = _p.pagecontrol, _ulocale = _p.ulocale;
    var authtoolbar;
    (function (authtoolbar) {
        var _html = function (id, options) {
            var _bootstrap4 = _p.bootstrap4;
            var html = [];
            if (_bootstrap4) {
                html.push('<div class="bs-island" id="' + id + '">');
                html.push('<form class="form-inline">');
            }
            else {
                html.push('<nav class="navbar navbar-default" id="' + id + '">');
                html.push('<div class="container-fluid">');
                html.push('<div class="navbar-header">');
                html.push('<a class="navbar-brand" href="#">');
                html.push(_locale.layouts.design.AuthoringMode);
                html.push('</a>');
                html.push('</div>');
                html.push('<div class="collapse navbar-collapse">');
                html.push('<form class="navbar-form navbar-left" role="search">');
            }
            html.push('<button type="button" class="mr-2 bs-button btn btn-' + _dom.bootstrapStyles(true).secondary + (_build.release || options.form ? ' bs-none' : '') + '" id="' + id + '_new">');
            html.push('<span class="' + _dom.iconClass('plus') + '" aria-hidden="false"></span> ');
            html.push(_locale.layouts.design.New);
            html.push('</button>&nbsp;');
            html.push('<button type="button" class="mr-2 bs-button  btn btn-' + _dom.bootstrapStyles(true).secondary + (_build.release || options.form ? ' bs-none' : '') + '" id="' + id + '_open">');
            html.push('<span class="' + _dom.iconClass('file-o') + '" aria-hidden="false"></span> ');
            html.push(_locale.layouts.design.Open.title);
            html.push('</button>&nbsp;');
            html.push('<button type="button" class="mr-2 bs-button btn btn-' + _dom.bootstrapStyles(true).secondary + (options.form ? ' bs-none' : '') + '" id="' + id + '_remove">');
            html.push('<span class="' + _dom.iconClass('times') + '" aria-hidden="false"></span> ');
            if (_build.release)
                html.push(_locale.layouts.design.DeletePreferences);
            else
                html.push(_locale.layouts.design.Delete);
            html.push('</button>&nbsp;');
            html.push('<button type="button" class="mr-2 bs-button btn btn-' + _dom.bootstrapStyles(true).secondary + '" id="' + id + '_save">');
            html.push('<span class="' + _dom.iconClass('floppy') + '" aria-hidden="false"></span> ');
            html.push(_locale.layouts.design.Save);
            html.push('</button>&nbsp;');
            if (_bootstrap4) {
                html.push('<label class="form-check-inline">');
                html.push('<input class="form-check-input" type="checkbox" id="' + id + '_preview"' + (options.design ? '' : ' checked="true"') + '>&nbsp;&nbsp;');
                html.push(_locale.layouts.design.Preview);
                html.push('</label>');
            }
            else {
                html.push('<div class="checkbox">');
                html.push('<label>');
                html.push('<input type="checkbox" id="' + id + '_preview"' + (options.design ? '' : ' checked="true"') + '> ');
                html.push(_locale.layouts.design.Preview);
                html.push('</label>');
                html.push('</div>');
            }
            html.push('</form>');
            if (!_bootstrap4) {
                html.push('</div>');
            }
            if (_bootstrap4)
                html.push('<div>');
            else
                html.push('</nav>');
            return html.join('');
        };
        var AuthoringToolBar = (function () {
            function AuthoringToolBar(options) {
                this.$element = null;
                this.$id = _utils.allocID();
                this.options = options || {};
            }
            AuthoringToolBar.prototype._removeEvents = function () {
                var that = this;
                that.$element.off('click');
            };
            AuthoringToolBar.prototype._setEvents = function () {
                var that = this, e = that.$element.get(0);
                that.$element.on('click', function (event) {
                    var stopEvent = false;
                    var target = event.target;
                    switch (target.id) {
                        case that.$id + '_save':
                            _ipc.emit('SaveLayout', null);
                            stopEvent = true;
                            break;
                        case that.$id + '_open':
                            that._openExisting();
                            stopEvent = true;
                            break;
                        case that.$id + '_remove':
                            stopEvent = true;
                            _utils.confirm('', _build.release ? _locale.layouts.design.ConfirmDeletePrefs : _locale.layouts.design.ConfirmDelete, function () {
                                _ipc.emit('RemoveLayout', null);
                            });
                            break;
                        case that.$id + '_preview':
                            var p = _dom.query(that.$element.get(0), '#' + that.$id + '_preview');
                            _ipc.emit('AuthoringModeChanged', !p.checked);
                            break;
                        case that.$id + '_new':
                            stopEvent = true;
                            _utils.prompt(_locale.layouts.design.PageName, "", function (pn) {
                                pn = pn.trim();
                                if (!pn)
                                    return;
                                if (pn.indexOf(' ') >= 0) {
                                    alert(_locale.layouts.design.InvalidPageName);
                                    return;
                                }
                                _ipc.emit('NewLayout', { name: pn });
                            });
                            break;
                        default:
                            stopEvent = false;
                            break;
                    }
                    if (stopEvent) {
                        event.stopPropagation();
                        event.preventDefault();
                        return false;
                    }
                    return true;
                });
            };
            AuthoringToolBar.prototype._clearChildren = function () { };
            AuthoringToolBar.prototype._openExisting = function () {
                var that = this;
                _ipc.emit('ListLayout', function (data) {
                    if (data && data.files) {
                        var files = [];
                        for (var i = 0; i < data.files.length; i++) {
                            var fileName = data.files[i];
                            if (fileName == _pagecontrol.Page().currentPage())
                                continue;
                            files.push(fileName);
                        }
                        if (files.length) {
                            that._openModal(files, function (pageName) {
                                _ipc.emit('OpenLayout', { name: pageName });
                            });
                        }
                    }
                });
            };
            AuthoringToolBar.prototype._openModal = function (files, onsuccess) {
                files.sort();
                var schema = {
                    type: "object",
                    properties: {
                        page: {
                            title: "Name",
                            type: "string",
                            enum: files
                        }
                    }
                }, layout = {
                    name: "open",
                    $type: "block",
                    $items: [{ $bind: "page" }]
                }, localData = { page: files[0] }, opt = {
                    title: _locale.layouts.design.Open.title,
                    buttons: [
                        {
                            type: "default",
                            title: _locale.layouts.design.Open.close,
                            name: "cancel"
                        },
                        {
                            type: "primary",
                            title: _locale.layouts.design.Open.open,
                            name: "ok"
                        }
                    ]
                };
                _ui.OpenModalForm(opt, layout, schema, localData, Phoenix.locale, function (modal, action, data, formcontrol) {
                    if (action.operation === "modal-action") {
                        switch (action.property) {
                            case "ok":
                                var v = data.page;
                                modal.close();
                                if (onsuccess)
                                    onsuccess(v);
                                break;
                            case "cancel":
                                modal.close();
                                break;
                        }
                    }
                });
            };
            AuthoringToolBar.prototype.render = function ($parent) {
                var that = this;
                if (!that.$element) {
                    that.$element = $(_html(that.$id, that.options));
                    that._setEvents();
                    if (that.options.beforeAdd)
                        that.options.beforeAdd(that.$element);
                }
                if ($parent) {
                    if (that.options.replaceParent)
                        $parent.replaceWith(that.$element);
                    else
                        $parent.append(that.$element);
                }
                return that.$element;
            };
            AuthoringToolBar.prototype.destroy = function () {
                var that = this;
                that._clearChildren();
                if (that.$element) {
                    that._removeEvents();
                    that.$element = null;
                }
                _ipc.unlisten(that);
            };
            return AuthoringToolBar;
        }());
        authtoolbar.AuthoringToolBar = AuthoringToolBar;
    })(authtoolbar = Phoenix.authtoolbar || (Phoenix.authtoolbar = {}));
})(Phoenix || (Phoenix = {}));

var Phoenix;
(function (Phoenix) {
    var authtoolboxutils;
    (function (authtoolboxutils) {
        var _p = Phoenix, _utils = _p.utils, _dom = _p.dom, _build = _p.build, _locale = _p.locale;
        var _checkItem = function (item, parent, map) {
            item.$id = item.$id || _utils.allocID();
            if (parent)
                item.$parentId = parent.$id;
            if (item.$items)
                item.$contentId = item.$contentId || _utils.allocUuid();
            if (map)
                map[item.$id] = item;
        }, _beforeGroups = function (html, item, parent, first) {
            html.push('<div class="panel-group" id="accordion_expo" role="tablist" aria-multiselectable="true">');
        }, _afterGroups = function (html, item) {
            html.push('</div>');
        }, _beforeGroup = function (html, item, parent, first) {
            var _bootstrap4 = Phoenix.bootstrap4;
            item.$typeItems = item.$typeItems || 'layouts';
            var icon, title;
            switch (item.$typeItems) {
                case 'layouts':
                    title = item.$title || _locale.layouts.design.layouts;
                    icon = 'bars';
                    break;
                case 'widgets':
                    title = item.$title || _locale.layouts.design.widgets;
                    icon = 'bars';
                    break;
                case 'actions':
                    title = item.$title || _locale.layouts.design.actions;
                    icon = 'bars';
                    break;
                default:
                    title = item.$title || _locale.layouts.design.fields;
                    icon = 'bars';
                    break;
            }
            html.push('<div class="' + (_bootstrap4 ? 'card' : 'panel panel-default') + '" id="' + item.$id + '">');
            html.push('<div class="' + (_bootstrap4 ? 'card-header' : 'panel-heading') + '"  role="tab" id="' + item.$id + '_tab">');
            if (!_bootstrap4)
                html.push('<h3 class="panel-title">');
            html.push('<a data-toggle="collapse" aria-expanded="' + (first ? 'true' : 'false') + '" draggable="false" data-parent="#accordion_expo" aria-controls="' + item.$id + '_tab" href="#' +
                item.$id + '_content"><span class="' + _dom.iconClass('bars') + '">');
            html.push('</span>&nbsp;');
            html.push(title);
            html.push('</a>');
            if (!_bootstrap4)
                html.push('</h3>');
            html.push('</div>');
            html.push('<div id="' + item.$id + '_content" class="panel-collapse collapse' + (first ? (_bootstrap4 ? ' show' : ' in') : '') + '" role="tabpanel" aria-labelledby="' + item.$id + '_title">');
            html.push('<ul class="list-group">');
        }, _afterGroup = function (html, item) {
            html.push('</ul></div></div>');
        }, _beforeItem = function (html, item, parent, first) {
            var css = ['list-group-item bs-cursor-p'];
            if (item.data && item.data.$type === 'widget') {
                if (_build.authMode !== 'dev') {
                    var isHidden = true;
                    if (_build.authMode === 'admin') {
                        isHidden = ['admin', 'user'].indexOf(item.mode) < 0;
                    }
                    else if (_build.authMode === 'user') {
                        isHidden = item.mode !== 'user';
                    }
                    if (isHidden) {
                        css.push('bs-none');
                    }
                }
            }
            html.push('<li draggable="true" class="' + css.join(' ') + '" data-toolbox="' + item.$id + '" id="' + item.$id + '">');
            html.push('<span class="' + _dom.iconClass('file-o') + '"></span>&nbsp;');
            html.push(item.$title);
            html.push('</li>');
        }, _afterItem = function (html, item) { }, _enumItems = function (item, parent, onItem) {
            if (item) {
                onItem(item, parent, true);
                if (item.$items)
                    item.$items.forEach(function (ci) {
                        _enumItems(ci, item, onItem);
                    });
                onItem(item, parent, false);
            }
        }, _renderToolBox = function (data, dataParent, html) {
            var firstGroup = true;
            _enumItems(data, dataParent, function (item, parent, before) {
                var rb = _beforeItem;
                var ra = _afterItem;
                switch (item.$type) {
                    case "groups":
                        rb = _beforeGroups;
                        ra = _afterGroups;
                        break;
                    case "group":
                        if (before)
                            _beforeGroup(html, item, parent, firstGroup);
                        else
                            _afterGroup(html, item);
                        ra = null;
                        rb = null;
                        firstGroup = false;
                        break;
                    default:
                        rb = _beforeItem;
                        ra = _afterItem;
                        break;
                }
                if (rb && ra) {
                    if (before) {
                        rb(html, item, parent, false);
                    }
                    else {
                        ra(html, item);
                    }
                }
            });
        };
        function check(data, map) {
            _enumItems(data, null, function (item, parent, before) {
                if (before) {
                    _checkItem(item, parent, map);
                }
            });
        }
        authtoolboxutils.check = check;
        function toHtml(data, parent) {
            var html = [];
            _renderToolBox(data, parent, html);
            return html.join('');
        }
        authtoolboxutils.toHtml = toHtml;
    })(authtoolboxutils = Phoenix.authtoolboxutils || (Phoenix.authtoolboxutils = {}));
})(Phoenix || (Phoenix = {}));

var Phoenix;
(function (Phoenix) {
    var authtoolbox;
    (function (authtoolbox) {
        var _p = Phoenix, _utils = _p.utils, _dom = _p.dom, _ipc = _p.ipc, _drag = _p.drag, _ulocale = _p.ulocale, _sutils = _p.Observable.SchemaUtils, _tbUtils = _p.authtoolboxutils;
        var _setEvents = function ($element, toolBox) {
            $element.find('li[draggable="true"]').on('dragstart', function (event) {
                event.stopPropagation();
                var l = toolBox.getItemById($(this).attr('data-toolbox'));
                if (!l || !l.data) {
                    event.preventDefault();
                    return false;
                }
                else {
                    var dt = (event.originalEvent ? event.originalEvent["dataTransfer"] : event["dataTransfer"]);
                    dt.effectAllowed = 'move';
                    dt.setData('Text', 'Data');
                    var td = {
                        isNew: true,
                        data: $.extend(true, {}, l.data.data),
                        isLayout: false,
                        isField: false,
                        isWidget: false
                    };
                    switch (l.data.$type) {
                        case "layout":
                            td.isLayout = true;
                            break;
                        case "field":
                            td.isField = true;
                            break;
                        case "widget":
                            td.isWidget = true;
                            break;
                    }
                    _drag.setData(td);
                }
            }).on('dragend', function (event) {
                _ipc.emit('ToolBoxDragend', null);
                _drag.setData(null);
                event.preventDefault();
                event.stopPropagation();
                return false;
            });
        }, _rmvEvents = function ($element, toolBox) {
            $element.find('li[draggable="true"]').off('dragstart dragend');
        };
        var ToolBox = (function () {
            function ToolBox(data, options) {
                var that = this;
                that.$element = null;
                that.map = {};
                that.options = options || {};
                data = data || {};
                data.$type = data.$type || "groups";
                _tbUtils.check(data, that.map);
                that.data = data;
                that._setListeners();
            }
            ToolBox.prototype.updateFieldItems = function (fields) {
                var that = this;
                var item = that.data.$items.find(function (ci) {
                    return (ci.$typeItems === "fields");
                });
                var itemActions = that.data.$items.find(function (ci) {
                    return (ci.$typeItems === "actions");
                });
                if (!item) {
                    item = { "$type": "group", "$typeItems": "fields", "$items": [] };
                    that.data.$items.push(item);
                }
                if (!itemActions) {
                    itemActions = { "$type": "group", "$typeItems": "actions", "$items": [] };
                    that.data.$items.push(itemActions);
                }
                item.$items = [];
                itemActions.$items = [];
                fields.forEach(function (field) {
                    var d = { $type: "item", $title: field.$title, data: { $type: "field", data: { $bind: field.$bind, $widget: field.$widget, options: field.options } } };
                    if (field.$type === 'field')
                        item.$items.push(d);
                    else
                        itemActions.$items.push(d);
                });
                that.map = {};
                _tbUtils.check(that.data, that.map);
                if (that.$element) {
                    var e = that.$element.get(0);
                    _rmvEvents(that.$element, that);
                    var old = _dom.find(e, item.$id);
                    if (old)
                        _dom.remove(old);
                    old = _dom.find(e, itemActions.$id);
                    if (old)
                        _dom.remove(old);
                    if (item.$items.length) {
                        var p = $(_tbUtils.toHtml(item, that.data)).get(0);
                        _dom.append(e, p);
                    }
                    if (itemActions.$items.length) {
                        var pa = $(_tbUtils.toHtml(itemActions, that.data)).get(0);
                        _dom.append(e, pa);
                    }
                    _setEvents(that.$element, that);
                }
            };
            ToolBox.prototype.renderToolBox = function (data, parentData) {
                return $(_tbUtils.toHtml(data, parentData));
            };
            ToolBox.prototype.render = function ($parent) {
                var that = this;
                if (!that.$element) {
                    that.$element = that.renderToolBox(that.data, null);
                    _setEvents(that.$element, that);
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
            ToolBox.prototype._clearChildren = function () { };
            ToolBox.prototype._removeEvents = function () {
                var that = this;
                if (that.$element) {
                    _rmvEvents(that.$element, that);
                }
            };
            ToolBox.prototype.destroy = function () {
                var that = this;
                that._clearChildren();
                if (that.$element) {
                    that._removeEvents();
                    that.$element = null;
                }
                _ipc.unlisten(that);
            };
            ToolBox.prototype.getItemById = function (id) {
                if (!id)
                    return null;
                var that = this;
                return that.map[id];
            };
            ToolBox.prototype._setListeners = function () {
                var that = this;
                _ipc.listen('onFormData', function (value) {
                    if (value.schema) {
                        var fields = _sutils.schema2Authoring(value.schema, value.schema, value.locale);
                        this.updateFieldItems(fields);
                    }
                }, this);
            };
            return ToolBox;
        }());
        authtoolbox.ToolBox = ToolBox;
        ;
    })(authtoolbox = Phoenix.authtoolbox || (Phoenix.authtoolbox = {}));
})(Phoenix || (Phoenix = {}));

var Phoenix;
(function (Phoenix) {
    var _p = Phoenix, _utils = _p.utils, _ipc = _p.ipc, _dom = _p.dom, _authtoolbar = _p.authtoolbar, _authtoolbox = _p.authtoolbox, _authpropedit = _p.authpropedit;
    function _html(id, options) {
        var html = ['<div class="container-fluid">'];
        html.push('<div id="nav_{0}"></div>');
        html.push('<div class="row design-table">');
        html.push('<div style="width:100%">');
        html.push('<div id="content"></div>');
        html.push('</div>');
        html.push('<div id="toolbox_parent_{0}" style="width:300px">');
        html.push('<div id="toolbox_{0}" class="bs-scroll-container"></div>');
        html.push('</div>');
        html.push('</div>');
        html.push('<div id="editor_{0}"></div>');
        html.push('</div>');
        return _utils.format(html.join(''), id);
    }
    var authoring;
    (function (authoring) {
        var AuthoringEditor = (function () {
            function AuthoringEditor(options, toolBoxData) {
                var that = this;
                that.options = options;
                that.id = _utils.allocID();
                that._pe = new Phoenix.authpropedit.PropertyEditor(options);
                that._toolBar = new Phoenix.authtoolbar.AuthoringToolBar(options);
                that._toolBox = new Phoenix.authtoolbox.ToolBox(toolBoxData, options);
                that._setListeners();
            }
            AuthoringEditor.prototype.render = function ($parent) {
                var that = this;
                var noAppend = false;
                if (!that.$element) {
                    var p = $parent.get(0).parentNode;
                    var tp = _dom.find(p, 'toolbox_parent');
                    if (tp) {
                        noAppend = true;
                        that.$element = $(p);
                        tp.id = 'toolbox_parent_' + that.id;
                        var ce = _dom.find(p, 'editor');
                        if (ce)
                            ce.id = 'editor_' + that.id;
                        ce = _dom.find(p, 'nav');
                        if (ce)
                            ce.id = 'nav_' + that.id;
                        ce = _dom.find(p, 'toolbox');
                        if (ce)
                            ce.id = 'toolbox_' + that.id;
                    }
                    else {
                        that.$element = $(_html(that.id, that.options));
                    }
                    var e = that.$element.get(0);
                    if (that.options.beforeAdd)
                        that.options.beforeAdd(that.$element);
                    var cc = _dom.find(e, 'editor_' + that.id);
                    if (cc)
                        that._pe.render($(cc));
                    cc = _dom.find(e, 'nav_' + that.id);
                    if (cc)
                        that._toolBar.render($(cc));
                    cc = _dom.find(e, 'toolbox_' + that.id);
                    if (cc) {
                        that._toolBox.render($(cc));
                    }
                    that.setDesignMode(that.options.design);
                }
                if ($parent && !noAppend) {
                    if (that.options.replaceParent)
                        $parent.replaceWith(that.$element);
                    else
                        $parent.append(that.$element);
                }
                return that.$element;
            };
            AuthoringEditor.prototype._setListeners = function () {
                var that = this;
                _ipc.listen('onAuthoringModeChanged', function (value) {
                    that.setDesignMode(value);
                }, this);
            };
            AuthoringEditor.prototype.setDesignMode = function (value) {
                var that = this;
                that.options.design = value;
                if (that.$element) {
                    var e = _dom.find(that.$element.get(0), 'toolbox_parent_' + that.id);
                    if (e) {
                        if (that.options.design)
                            _dom.removeClass(e, 'bs-none');
                        else
                            _dom.addClass(e, 'bs-none');
                    }
                }
            };
            AuthoringEditor.prototype.destroy = function () {
                var that = this;
                if (that.$element) {
                    that.$element = null;
                }
                if (that._pe) {
                    that._pe.destroy();
                    that._pe = null;
                }
                if (that._pe) {
                    that._pe.destroy();
                    that._pe = null;
                }
                _ipc.unlisten(that);
            };
            return AuthoringEditor;
        }());
        authoring.AuthoringEditor = AuthoringEditor;
    })(authoring = Phoenix.authoring || (Phoenix.authoring = {}));
})(Phoenix || (Phoenix = {}));
