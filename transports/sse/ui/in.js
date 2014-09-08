var EvtSrcStream = require('evt-src-stream');

var es = new EvtSrcStream('http://localhost:1337/sse');

es.on('data', function (data) {
  document.body.innerHTML += data;
});