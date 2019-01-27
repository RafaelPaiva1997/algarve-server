var database = require("../functionals/database");
var req_res = require("../functionals/req_res");

module.exports = {
    add: (req, res) => db.insert(req.body.lib, req.body.data.item, req_res.res_err(res)),
    login: (req, res) => database.find(req.body.lib, req.body.data.login, {w: 1}, req_res.res_err_result(res))
}