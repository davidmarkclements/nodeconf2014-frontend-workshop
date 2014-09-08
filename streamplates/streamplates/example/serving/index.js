var htmlstream = require('./htmlstream')
var http = require('http');

var style = [
  
  '<style>',
	'dt {font-weight: bold}',
	'dl {padding:1em}',
	'dl:nth-child(even) {background:#ddd;}',  
  '</style>'

].join('');

http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(style)
  htmlstream().pipe(res);
}).listen(9110)