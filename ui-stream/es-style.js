var es = require('event-stream');
module.exports = function () {
  return es.through(function (chunk) {
	document.body.innerHTML += chunk;
  })
}