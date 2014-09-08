var Writable = require('stream').Writable;
var util = require('util');


util.inherits(MyCmpStream, Writable)
function MyCmpStream () {

  Writable.call(this);

}
MyCmpStream.prototype._write = function(chunk, enc, cb) { 
	document.body.innerHTML += chunk;
	cb();
}

module.exports = MyCmpStream;