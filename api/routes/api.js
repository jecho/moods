var express = require('express');
var config = require('../config');

var Mood = require('../models/api.server.mood');
var app = express.Router();

app.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); 
});

app.get('/all', function (req, res) {
	Mood.find({}, function(err, moods) {
		if (err) throw err;
		res.json(moods);
	});
});

app.get('/largest', function (req, res) {
	Mood.aggregate([
	    { 
	    	"$group":
	    	{
	        	"_id": "$hex",
	        	"tag" : { $addToSet : "$tag" },
	        	"freq": { "$sum": 1 },
	    	}
	    }, 
	    {
	    	"$sort" : { "freq" : -1 }	
	    }
	], function(err, moods) {
		if (err) throw err;
		res.json(moods);
	});
});

app.post('/submit', function (req, res) {
	
	if (req.body.tag == null) return;
	var mood = new Mood();
	
	if (req.body.face != null) mood.face = req.body.face;
	if (req.body.email != null) mood.email = req.body.email;
	if (req.body.tag != null) mood.tag = req.body.tag;
	if (req.body.color != null) mood.color = req.body.color;
	if (req.body.hex != null) mood.hex = req.body.hex;

	mood.save(function(err) {
		if (err) {
			throw err;
		}
	});

	res.sendStatus('Mood saves successfully!');
});

module.exports = app;
