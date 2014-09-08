var EvtSrcStream = require('evt-src-stream');
var evtsrc = new EvtSrcStream('http://localhost:1337/');
var chartStream = require('./chartStream');

var prices = chartStream(document.getElementById("canvas"));

evtsrc.pipe(prices);

window.addEventListener('load', prices.init)