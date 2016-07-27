var path     = require('path');
var express  = require('express');
var app      = express();
var filename = path.resolve(__dirname, 'apple-app-site-association');
var options  = { 'headers': { 'Content-Type': 'application/pkcs7-mime' } };

app.get('/', function(request, response) {
  response.sendFile(filename, options, function(error) {
    if (error) {
      console.log(error);
      code = error.status >= 100 && error.status < 600 ? error.status : 500
      response.status(code).end();
    }
  });
});

module.exports = app;
