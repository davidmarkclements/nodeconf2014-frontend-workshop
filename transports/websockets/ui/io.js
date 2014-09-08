var websocket = require('websocket-stream')
var ws = websocket('ws://localhost:1337/')

ws.on('data', function (data) {
  document.body.innerHTML += data;
});