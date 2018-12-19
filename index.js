// Libraries
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require ('cookie-parser');

// Modules
const libs = require('./functionals/libs');
const files = libs.files(__dirname + '/controllers');
const handlers = libs.handlers(files, "../controllers/");
const database = require('./functionals/database');

// Config
const CONFIG = JSON.parse(fs.readFileSync(__dirname + '/config.json', 'utf-8'))
const db_url = "mongodb://" + CONFIG.db.username + ':' + CONFIG.db.password + '@' + CONFIG.db.address + ':' + CONFIG.db.port + '/' + CONFIG.db.dbname;

// App
var app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.post("/api", function(req, res) {
    console.log(req.body);
    var handler = handlers[req.body.lib][req.body.action];

    if (handler)
        handler(req, res);
    else
        res.sendStatus(500);
});

app.listen(CONFIG.port, CONFIG.address, function () {
    database.connect(db_url, files)
    console.log("Listening on " + CONFIG.address + ", port " + CONFIG.port)
});
