var db = require('../functionals/database');
var req_res = require('../functionals/req_res');

exports.add = (req, res) => {
    db.insert(req.body.lib, req.body.data.item, req_res.res_err(res));
}

exports.update = (req, res) => {
    db.update(req.body.lib, req.body.data.key, req_res.res_err_result(res));
}

exports.find = (req, res) => {
    db.find(req.body.lib, req.body.data.key, req_res.res_err_result(res));
}