module.exports = function (app) {
    var _base = "http://localhost:3000";
    var mongoose = require('mongoose');
    var Historial = require('../modelos/historial.js');

    ObtenerHistorialesP = function (req, res) {
        console.log('post /ObtenerHistorialesP');

        var sort;
        var sortObject = {};
        var count = req.query.count || 5;
        var page = req.query.page || 1;

        var filter = {
            filters: {
                mandatory: {
                    contains: req.query.filter
                }
            }
        };
        var pagination = {
            start: (page - 1) * count,
            count: count
        };

        if (req.query.sorting) {
            var sortKey = Object.keys(req.query.sorting)[0];
            var sortValue = req.query.sorting[sortKey];
            sortObject[sortValue] = sortKey;
        }
        else {
            sortObject.desc = '_id';
        }

        sort = {
            sort: sortObject
        };

        Historial
            .find()
            .filter(filter)
            .order(sort)
            .page(pagination, function (err, historiales) {
                if (err) {
                    return res.send(400, {
                        message: getErrorMessage(err)
                    });
                } else {
                    res.jsonp(historiales);
                }
            });

    };

    app.get('/historial/ObtenerHisorialesPaginados', ObtenerHistorialesP);
}
