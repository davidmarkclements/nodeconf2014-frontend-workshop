var freeice = require('freeice');
var rtcDataStream = require('rtc-data-stream');
var quickconnect = require('rtc-quickconnect');
var rs = require('random-stream');
var StrStream = require('to-string-stream');
var strStream = new StrStream();

var me = quickconnect('http://rtc.io/switchboard', {
    room: 'yay', 
    iceServers: freeice()
  })
  .createDataChannel('randomness')
  .on('channel:opened:randomness', function(id, dc) {
    var color = '#' + id.substr(-6);

    var stream = rtcDataStream(dc);
    stream.on('data', function(data) {
      document.body.innerHTML += '<span style="color:' +
        color + '">' + data + '</span>';
    })

    rs().pipe(strStream).pipe(stream);
  });

document.getElementById('me')
  .style.background = '#' + me.id.substr(-6);