var Pusher = require('pusher-client');
var http = require('http');

var pusher = new Pusher('de504dc5763aeef9ff52'),
  trades = pusher.subscribe('live_trades'),
  prices = require('./lib/priceStream')(),
  sse = require('sse-stream')('/');

sse.install(http.createServer().listen(1337))

trades.bind('trade', prices.write.bind(prices));

prices.pipe(process.stdout);

sse.on('connection', function (socket) {
  prices.pipe(socket);
});


