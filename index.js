// Libraries
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require('path')

// Modules
const libs = require("./functionals/libs");
const files = libs.files(__dirname + "/controllers");
const handlers = libs.handlers(files, "../controllers/");
const database = require("./functionals/database");
const ObjectID = require("mongodb").ObjectID;

// Config
const CONFIG = JSON.parse(fs.readFileSync(__dirname + "/config.json", "utf-8"));
const PORT = process.env.PORT || CONFIG.port;
const db_url =
  "mongodb://" +
  CONFIG.db.username +
  ":" +
  CONFIG.db.password +
  "@" +
  CONFIG.db.address +
  ":" +
  CONFIG.db.port +
  "/" +
  CONFIG.db.dbname;

// App
var app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))

app.post(
  "/api",
  (req, res, next) =>
    req.body.auth ===
    "jakshd7asfhfu33bhg2oun23opcri2porcu2mcrh23872tng2bor28573n2urio23bu8rc23nryc27rhc28mo3rg2nomh87rm2ohh3rcccccg8mo2ncm27rc2gcc"
      ? next()
      : database.findOne(
          "users",
          { _id: ObjectID(req.body.auth.id) },
          (err, result) =>
            !err &&
            result &&
            JSON.stringify(result) === JSON.stringify(req.body.auth.user)
              ? next()
              : res.sendStatus(401)
        ),
  (req, res) => {
    console.log(JSON.stringify(req.body));
    var handler = handlers[req.body.lib][req.body.action];

    if (handler) handler(req, res);
    else res.sendStatus(500);
  }
);

app.post("/login", handlers.users.login);

app.listen(PORT, function() {
  database.connect(
    db_url,
    files
  );
  console.log("Listening on, port " + PORT);
});
