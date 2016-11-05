
fs = require('fs');
var req = require('request');


/*
	dirty script to generate some inputs
*/

var someLength = 4000;
var moods = ['angry', 'sad', 'queasy', 'lethargic', 'hopeful', 'drunk', 'complacent', 'happy'];
var submit_uri = 'http://localhost:3000/api/submit';
var size = moods.length;

var i = 0;
while (i < someLength) {
	var r = Math.floor((Math.random() * 10) + 1);
	var n = r % size;
	console.log(moods[n] + '.json');
	fs.readFile(moods[n] + '.json', function(err, data) {
		if (err) {
			console.log(err);
			return;
		}
		req.post(
			submit_uri,
			{ form: JSON.parse(data) },
			function(err, res, body) {
				if (err && res.statusCode != 200) {
					console.log('fail');
			 	}	
			}
		);
	 });
	i++;
}

console.log('finished...');