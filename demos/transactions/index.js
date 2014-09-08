var http = require('http');
var websocket = require('websocket-stream');
var JSONStream = require('JSONStream');
var es = require('event-stream');
var sse = require('sse-stream')('/');

var ws = websocket('ws://ws.blockchain.info:8335/inv');

ws.write('{"op":"unconfirmed_sub"}')

sse.install(http.createServer().listen(1337))

amounts = ws
  .pipe(JSONStream.parse())
  .pipe(es.map(function (tx, cb) { 
  	cb(null, (tx.x.out[0].value/1e8)+'')
  }));

amounts.pipe(process.stdout);

sse.on('connection', function (socket) {
  amounts.pipe(socket);
});