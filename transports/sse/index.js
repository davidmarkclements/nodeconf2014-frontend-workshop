var sse = require('sse-stream')('/sse');
var rs = require('random-stream');
var http = require('http');
var st = require('st')(__dirname + '/static');
var server = http.createServer(st).listen(1337);
sse.install(server)

sse.on('connection', function(socket) {
  rs().pipe(socket);
})