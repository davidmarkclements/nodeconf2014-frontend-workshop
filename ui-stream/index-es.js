var MyCmp = require('./es-style');
var rs = require('random-stream');
var cmp = MyCmp();

rs().pipe(cmp);



