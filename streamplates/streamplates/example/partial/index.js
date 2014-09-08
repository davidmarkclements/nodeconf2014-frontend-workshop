var request = require('hyperquest');
var JSONStream = require('JSONStream');
var streamplates = require('../..');
var fs = require('fs');
var feed = 'https://skimdb.npmjs.com/registry/_all_docs'
var opts = '?include_docs=true';
var tmpl = streamplates.partial(fs.readFileSync('./partial.tmpl'));

var parse = JSONStream.parse('rows.*.doc', function (doc) { 
  	return {
  	  name: doc.name || '',
  	  description: doc.description ? doc.description || '' : '',
  	  author: doc.author ? doc.author.name || '' : '',
  	  url: doc.repository ? doc.repository.url || '' : ''
  	}
  })

request(feed + opts)
  .pipe(parse)
  .pipe(tmpl)
  .pipe(process.stdout)