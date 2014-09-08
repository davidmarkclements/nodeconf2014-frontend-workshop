var dust = require('dustjs-linkedin');
var fs = require('fs');
var data = require('./data.json')
var content = fs.readFileSync('./index.tmpl').toString();

dust.renderSource(content, data).pipe(process.stdout)
