var streamplates = require('../..');
var fs = require('fs');

var tmpl = streamplates(fs.readFileSync('./index.tmpl'));

fs.createReadStream('./data.json').on('data', function (data) { 
   
   setTimeout(function () { 
     tmpl.write(data);
   }, 1000);

});


tmpl.pipe(process.stdout);
