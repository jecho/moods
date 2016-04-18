var express = require('express');
var config = require('./scripts/configController');

var app = express();

app.use('/', express.static('.'));

app.use('/submit', express.static('form.html'));

app.use("/tellus", express.static('submit.html'));

app.get('/home', function (req, res) {
	res.send('Hello World!');
});

app.listen(config.CLIENT_PORT, function () {
	console.log('Example app listening on port ' + config.CLIENT_PORT + '!');
});
