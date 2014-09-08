var EventSource = require('event-source');
var Readable = require('stream').Readable;
var util = require('util');


util.inherits(EvtSrcStream, Readable)
function EvtSrcStream (url) {
  if ( (!this instanceof EvtSrcStream) ) { return (new EvtSrcStream(url)); }
  var self = this;
  Readable.call(self, {objectMode: true});

  self.es = new EventSource(url);

  self.es.onmessage = function(ev) {
  	ev.toString = function () { return ev.data + ''; }
    self.push(ev);
  }
}
EvtSrcStream.prototype._read = function() { }

module.exports = EvtSrcStream;