var express = require('express');
var bodyParser = require('body-parser');
var database = require('./db');
var config = require('./config');
var app = express();

var mongo = require('./routes/api');

var allowCrossDomain = function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With");
  	next();
}

app.use("/mood", express.static(config.__dirname + '/public'));

app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

app.use('/api', mongo);

app.get('/home', function (req, res) {
	res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port ' + config.SERVER_PORT + '!');
});
