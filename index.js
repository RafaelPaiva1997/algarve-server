// Libraries
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Modules
const libs = require('./functionals/libs');
const files = libs.files(__dirname + '/controllers');
const handlers = libs.handlers(files, "../controllers/");
const database = require('./functionals/database');
const ObjectID = require('mongodb').ObjectID;

// Config
const CONFIG = JSON.parse(fs.readFileSync(__dirname + '/config.json', 'utf-8'))
const db_url = "mongodb://" + CONFIG.db.username + ':' + CONFIG.db.password + '@' + CONFIG.db.address + ':' + CONFIG.db.port + '/' + CONFIG.db.dbname;

// App
var app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.post("/api", (req, res, next) => database.findOne({ _id: ObjectID(req.body.auth.id) }, (err, result) => !err && result && result === req.body.auth.user ? next() : res.sendStatus(401)), (req, res) => {
    console.log(JSON.stringify(req.body));
    var handler = handlers[req.body.lib][req.body.action];

    if (handler)
        handler(req, res);
    else
        res.sendStatus(500);
});

app.post("/login", handlers.users.login);

app.listen(CONFIG.port, CONFIG.address, function () {
    database.connect(db_url, files)
    console.log("Listening on " + CONFIG.address + ", port " + CONFIG.port)
});
