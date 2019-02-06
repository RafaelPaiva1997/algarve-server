var db = require("../functionals/database");
var req_res = require("../functionals/req_res");
var email_lib = require("../functionals/email_lib");

var buffer = [];

var email = (mails, to) => () => {
  email_lib.sendText(mails[0].from, to, mails[0].subject, mails[0].text, mails[0].html).then(info => {
    console.log(info);
    sending();
  }).catch(err => {
    console.log(err);
    sending();
  })
}

var sending = () => {
  if (buffer.length) {
    var mails =  buffer.splice(0, 1);
    var to = mails.map(e => e.to);
    setTimeout(email(mails, to), Math.floor(Math.random * 18000) - 7000);
  }
}

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
  db.find(req.body.lib, { mailingList: req.body.data.to }, (err, result) => {
    if (!err) {
      result.map(e =>
        buffer.push({
          from: req.body.data.from,
          to: e.email,
          subject: req.body.data.subject,
          text: req.body.data.text,
          html: req.body.data.html
        })
      );
      res.sendStatus(200);
      sending();
    }
    else res.send(err).status(400);
  });
};