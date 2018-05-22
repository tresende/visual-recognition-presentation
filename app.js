var app = require('./config/express')();
var cfenv = require('cfenv');
var express = require('express');

app.use(express.static(__dirname + '/public'));
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
