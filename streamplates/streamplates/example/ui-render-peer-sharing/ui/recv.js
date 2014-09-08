var rtcDataStream = require('rtc-data-stream')
var quickconnect = require('rtc-quickconnect')
var StrStream = require('to-string-stream');
var strStream = new StrStream();

var list = [];

var me = quickconnect('http://rtc.io/switchboard', {room: 'tmpl'})
  .createDataChannel('templates')
  .on('channel:opened:templates', function(id, dc) {
    var stream = rtcDataStream(dc);
    stream.pipe(strStream).on('data', function(data) {
      
      list.unshift(data + '');
      list.length = 3;
      document.body.innerHTML = '';
      list.forEach(function (s) {
         document.body.innerHTML += s;
      });

    })
  });
