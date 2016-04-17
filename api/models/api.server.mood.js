var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var moodSchema = new Schema({
	face : { type : String },
	email : { type : String },
	tag : { type : String },
	color : { type : String },
	hex : { type : String }
}, { timestamps: { createdAt: 'createdAt' }
});

module.exports = mongoose.model('Mood', moodSchema);