(function ($p) {

    var odataSources = {};
    var odataProvider = $p.data.odata;
    var _utils = $p.utils;
    //todo odata transport
    function _page(params, data) {
        let res = [];
        var op = params.params;
        op.$skip = op.$skip || 0;
        for (var i = op.$skip, len = data.length; i < len; i++) {
            res.push(data[i]);
            if (op.$top && res.length >= op.$top)
                break;
        }
        return res;
    }

    odataProvider.transport.doGet = function (lurl, options, ondata, params) {
        var _promise = _utils.Promise;
        console.log(lurl);
        return new _promise(function (resolve, reject) {
            window.setTimeout(function () {
                if (!params.entity || !odataSources[params.entity]) {
                    var errorThrown = { message: "Not found", status: 404 };
                    return reject(errorThrown);
                }
                if (!params.enyityId) {
                    var data = odataSources[params.entity].value || [];
                    var res = { '@odata.count': data.length, value: _page(params, data) };
                    if (ondata) {
                        res = ondata(res);
                    }
                    return resolve(res);
                } else {
                    var errorThrown = { message: "Not implemented", status: 501 };
                    return reject(errorThrown);
                }

            }, 200);

        });
    };

    odataProvider.registerEntity = function (entityName, data) {
        odataSources[entityName] = data;
    }



})(window.Phoenix);

