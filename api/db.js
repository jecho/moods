
var fs = require('fs');
var mongoose = require('mongoose');
var config = require('./config');

var database = mongoose.connect(
	(config.DATABASE_ADDR + config.DATABASE_INSTANCE), function(err) {
		if (err) {
			console.log('falied to connect.');
		}
});

module.exports.database = database;