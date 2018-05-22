var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var cors = require('cors');


module.exports = function () {
    var app = express();
    app.use(bodyParser.json({
        limit: '50mb'
    }));
    app.use(bodyParser.urlencoded({
        limit: '50mb',
        extended: true
    }));

    app.use(bodyParser.urlencoded({
        extended: false
    }))
    app.use(bodyParser.json());
    app.use(cors())
    load('routes', {
            cwd: 'app'
        })
        .then('dataAccess')
        .into(app);
    return app;
}