var fs      = require('fs');
var path    = require('path');
var assert  = require('assert');
var request = require('supertest');
var app     = require('./app');

function binaryParser(response, callback) {
  response.setEncoding('binary');
  response.data = '';
  response.on('data', function(chunk) {
    response.data += chunk;
  });
  response.on('end', function() {
    callback(null, new Buffer(response.data, 'binary'));
  });
}

describe('apple-app-site-association serving', function() {
  it('returns a 200', function(done) {
    request(app)
      .get('/')
      .expect(200, done);
  });

  it('returns the right content type', function(done) {
    request(app)
      .get('/')
      .expect('Content-Type', 'application/json', done);
  });

  it('serves the correct static file', function(done) {
    request(app)
      .get('/')
      .parse(binaryParser)
      .end(function(error, response) {
        if (error) return done(error);
        var expected = fs.readFileSync(path.resolve(__dirname, 'apple-app-site-association.json'));
        assert.equal(0, Buffer.compare(expected, response.body));
        done();
      });
  });
});
