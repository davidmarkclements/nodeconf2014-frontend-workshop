var smoothie = require('smoothie');
var es = require('event-stream');

var series = new smoothie.TimeSeries();

function createTimeline(canvas) {
  var chart = new smoothie.SmoothieChart();
  chart.addTimeSeries(series, { strokeStyle: 'rgba(0, 255, 0, 1)', fillStyle: 'rgba(0, 255, 0, 0.2)', lineWidth: 4 });
  chart.streamTo(canvas, 500);
}

module.exports = function (canvas) {

	var stream = es.through(function (number) {
	   series.append(new Date().getTime(), +(number+''));
	})

	stream.init = createTimeline.bind(null, canvas);

	return stream;

}


