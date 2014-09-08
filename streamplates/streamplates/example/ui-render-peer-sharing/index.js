var http = require('http');
var WebSocketServer = require('ws').Server
var wsStream = require('websocket-stream');
var st = require('st')(__dirname + '/static');
var server = http.createServer(st).listen(9110);
var wss = new WebSocketServer({server: server});
var request = require('request');
var feed = 'https://skimdb.npmjs.com/registry/_changes';

function init(res, socket) {
  var since = JSON.parse(res.body).last_seq - 4;
  var url = feed + '?include_docs=true&feed=continuous&since=' + since;
  var req = request(url) 
  var stream = wsStream(socket);
  req.pipe(stream);
}

wss.on('connection', function(socket) {   
 request(feed + '?descending=true&limit=1', function (err, res) {
    init(res, socket)
 })
})

