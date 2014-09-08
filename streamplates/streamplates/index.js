var streamstache = require('streamstache');
var JSONStream = require('JSONStream');
var stream = require('stream');
var es = require('event-stream');

function set(tmpl, key, val) {
  tmpl.set(key, val);
}

function parse() {
  var self = this;
  return JSONStream.parse('*', function (val, key) {
    key = key[0];
    
    typeof key === 'string' ? 
      set(self.tmpl, key, val) :
      Object.keys(val).forEach(function (key) {
        set(self.tmpl, key, val[key] || ' ');
      })

  });
}

function streamplate(tmpl, scope) {
  tmpl = streamstache(tmpl, scope);
  
  tmpl.__proto__.__proto__ = new stream.PassThrough;

  tmpl.tmpl = tmpl;
  tmpl.makeParseStream = parse;
  tmpl.parser = tmpl.makeParseStream(tmpl);



  tmpl._write = function (chunk, enc, cb) {
    this.parser.write(chunk);
    cb();
  }

  return tmpl;
}


streamplate.partial = function (tmpl, scope) {
  return es.map(function (chunk, cb) {
    streamstache(tmpl, chunk).pipe(es.wait(cb));
  })
}

module.exports = streamplate;