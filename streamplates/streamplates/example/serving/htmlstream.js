var request = require('request');
var JSONStream = require('JSONStream');
var streamplates = require('../..');
var fs = require('fs');
var partial = fs.readFileSync('./partial.tmpl');
var feed = 'https://skimdb.npmjs.com/registry/_all_docs';
var opts = '?include_docs=true';

module.exports = function () {
  var tmpl = streamplates.partial(partial);

  var parse = JSONStream.parse('rows.*.doc', function (doc) { 
  	return {
  	  name: doc.name || '',
  	  description: doc.description ? doc.description || '' : '',
  	  author: doc.author ? doc.author.name || '' : '',
  	  url: doc.repository ? doc.repository.url || '' : ''
  	}
 })

 return request(feed + opts)
   .pipe(parse)
   .pipe(tmpl)
}