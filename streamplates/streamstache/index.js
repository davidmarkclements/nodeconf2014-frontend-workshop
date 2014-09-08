var streamstache = require('streamstache');
var fs = require('fs');
var data = require('./data.json');

var tmpl = streamstache(fs.readFileSync('./index.tmpl'));
tmpl.pipe(process.stdout);

tmpl.name = data.name;
setTimeout(function () {
	tmpl.count = data.count;	
}, 2000)

