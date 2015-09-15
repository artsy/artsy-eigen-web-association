var path     = require('path');
var express  = require('express');
var app      = express();
exports.app  = app;
var filename = path.resolve(__dirname, 'apple-app-site-association');
var options  = { 'headers': { 'Content-Type': 'application/pkcs7-mime' } };

app.get('/', function(request, response) {
  response.sendFile(filename, options, function(error) {
    if (error) {
      console.log(error);
      response.status(error.status).end();
    }
  });
});
