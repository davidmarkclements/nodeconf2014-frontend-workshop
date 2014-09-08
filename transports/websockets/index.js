var WebSocketServer = require('ws').Server
var rs = require('random-stream');
var http = require('http');
var st = require('st')(__dirname + '/static');
var server = http.createServer(st).listen(1337);
var wsStream = require('websocket-stream')
var wss = new WebSocketServer({server: server});
var StrStream = require('to-string-stream');
var strStream = new StrStream();

wss.on('connection', function(socket) {
  rs().pipe(strStream).pipe(wsStream(socket));
})