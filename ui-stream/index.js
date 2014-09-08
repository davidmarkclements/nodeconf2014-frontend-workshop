var MyCmp = require('./classical-style');
var rs = require('random-stream');
var cmp = new MyCmp;

rs().pipe(cmp);


