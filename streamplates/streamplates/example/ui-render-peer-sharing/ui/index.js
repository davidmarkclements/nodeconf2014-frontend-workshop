var websocket = require('websocket-stream')
var ws = websocket('ws://localhost:9110/')
var StrStream = require('to-string-stream');
var strStream = new StrStream();
var JSONStream = require('JSONStream')
var streamplates = require('../../..');
var fs = require('fs');
var partial = fs.readFileSync('./partial.tmpl');
var rtcDataStream = require('rtc-data-stream')
var quickconnect = require('rtc-quickconnect')
var es = require('event-stream')

var parse = JSONStream.parse('doc', function (doc) { 
	return {
	  name: doc.name || '',
	  description: doc.description ? doc.description || '' : '',
	  author: doc.author ? doc.author.name || '' : '',
	  url: doc.repository ? doc.repository.url || '' : ''
	}
})

var tmpl = streamplates.partial(partial);

var list = [];
var plateline = ws.pipe(strStream).pipe(parse).pipe(tmpl)


plateline.on('data', function (data) {
    if (process.title === 'browser') {
      list.unshift(data + '');
      list.length = 3;
      document.body.innerHTML = '';
      list.forEach(function (s) {
         document.body.innerHTML += s;
      });
    }
  });

var me = quickconnect('http://rtc.io/switchboard', {room: 'tmpl'})
  .createDataChannel('templates')
  .on('channel:opened:templates', function(id, dc) {
    var stream = rtcDataStream(dc);

    list.forEach(function (s) {
    	stream.write(s);
    })

    plateline.pipe(stream);

  });
