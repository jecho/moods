var fs = require('fs');
var https = require('https');
var express = require('express');
var config = require('./scripts/configController');

var app = express();
var options = {
   key  : fs.readFileSync('./certs/server.key'),
   cert : fs.readFileSync('./certs/server.crt')
};

app.use('/', express.static('.'));

app.use('/submit', express.static('form.html'));

app.use("/tellus", express.static('submit.html'));

app.get('/home', function (req, res) {
	res.send('Hello World!');
});

https.createServer(options, app).listen(config.CLIENT_PORT, function () {
	console.log('Example app listening on port ' + config.CLIENT_PORT + '!');
});
