var db = require("../functionals/database");
var req_res = require("../functionals/req_res");
var email_lib = require("../functionals/email_lib");

exports.add = (req, res) => {
  db.insert(req.body.lib, req.body.data.item, req_res.res_err(res));
};

exports.addMany = (req, res) => {
  db.insertMany(req.body.lib, req.body.data.items, req_res.res_err(res));
};

exports.update = (req, res) => {
  db.update(
    req.body.lib,
    req.body.data.key,
    req.body.data.update,
    req_res.res_err_result(res)
  );
};

exports.find = (req, res) => {
  db.find(req.body.lib, req.body.data.key, req_res.res_err_result(res));
};

exports.findLimited = (req, res) => {
  db.findLimited(
    req.body.lib,
    req.body.data.key,
    req.body.data.inf,
    req.body.data.sup,
    req_res.res_err_result(res)
  );
};

exports.deleteOne = (req, res) => {
  db.deleteOne(req.body.lib, req.body.data.key, req_res.res_err_result(res));
};

exports.deleteMany = (req, res) => {
  db.deleteMany(req.body.lib, req.body.data.key, req_res.res_err_result(res));
};

exports.bulkMail = (req, res) => {
  db.find(req.body.lib, {mailingList: req.body.data.to}, (err, result) => {
    if (!err) {
      email_lib
    .sendText(
      req.body.data.from,
      result.map(e => e.email),
      req.body.data.subject,
      req.body.data.text,
      req.body.data.html
    )
    .then(info => res.send(info).status(200))
    .catch(err => res.send(err).status(400));
    }
    else sendStatus(404);
  })
};
