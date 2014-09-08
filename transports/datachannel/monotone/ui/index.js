var rtcDataStream = require('rtc-data-stream')
var quickconnect = require('rtc-quickconnect')
var rs = require('random-stream');
var StrStream = require('to-string-stream');
var strStream = new StrStream();

quickconnect('http://rtc.io/switchboard', {room: 'yay'})
  .createDataChannel('randomness')
  .on('channel:opened:randomness', function(id, dc) {
    var stream = rtcDataStream(dc);

    stream.on('data', function(data) {
       document.body.innerHTML += data;
    })

    rs().pipe(strStream).pipe(stream);
  });


