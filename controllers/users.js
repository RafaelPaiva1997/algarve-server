var database = require("../functionals/database");
var req_res = require("../functionals/req_res");

module.exports = {
    add: (req, res) => database.insert(req.body.lib, req.body.data.item, req_res.res_err(res)),
    login: (req, res) => database.findOne("users", req.body.data.login, req_res.res_err_result(res))
}