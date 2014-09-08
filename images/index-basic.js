var fs = require('fs');
var sharp = require('sharp');
var express = require('express');

var app = express();

app.get('/:img/:width?/:height?', function (req, res) { 
  var img = req.params.img;
  var h = ~~(req.params.height); 
  var w = ~~(req.params.width);
  var imgStrm = fs.createReadStream('./img/' + img);
  imgStrm.pipe(sharp().resize(w, h)).pipe(res)
});

app.listen(8080)
