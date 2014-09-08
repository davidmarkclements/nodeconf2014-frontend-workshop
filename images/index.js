var fs = require('fs');
var path = require('path');

var sharp = require('sharp');
var express = require('express');


var app = express();

app.use(rewrite);
app.use(express.static('./cache'))
app.use(unwrite);

app.get('/:img/:width?/:height?', function (req, res) { 
  var img = req.params.img;
  var h = ~~(req.params.height); 
  var w = ~~(req.params.width);
  var imgStrm = fs.createReadStream('./img/' + img);

  imgStrm = imgStrm.pipe(sharp().resize(w, h))

  imgStrm.pipe(res);
  imgStrm.pipe(fs.createWriteStream(cache(img, w, h)))

});

app.listen(8080);

function unwrite(req, res, next) {
  req.url = req._trueUrl;
  delete req._trueUrl;
  next();
}
function rewrite(req, res, next) { 
  req._trueUrl = req.url;
  req.url = '/'+req.url.substr(1).replace(/\//g,'-')
  req.url += path.extname(req.url).split('-')[0]
  next();
}
function cache(img, w, h) {
  var cachePath = './cache/' + img
  if (w) { cachePath += '-' + w; }
  if (h) { cachePath += '-' + h; }
  if (w || h) { cachePath += path.extname(img) }
  return cachePath;
}
