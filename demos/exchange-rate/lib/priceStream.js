var T = require('stream').Transform;
var util = require('util');


util.inherits(PriceStream, T);
function PriceStream () {
  T.call(this);
  this._readableState.objectMode = false;
  this._writableState.objectMode = true;

}

PriceStream.prototype._transform = function (o, enc, cb) {
  if (!o.price) {return cb();}
  this.push(o.price.toFixed(2) + '\n');
  cb();
}

module.exports = function () {
  return new PriceStream; 
}