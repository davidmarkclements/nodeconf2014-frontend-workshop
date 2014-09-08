var jadeStream = require('jade-stream'),
  fs = require('fs');

fs.createReadStream('./index.jade')
  .pipe(jadeStream(require('./data.json')))
  .pipe(process.stdout);