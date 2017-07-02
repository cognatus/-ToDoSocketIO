var mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment');

var List = mongoose.Schema({

	done: {type: Boolean, required: true},
	task: {type: String, required: true},
	lugar: {type: Number, required: true, unique: false}

});

List.plugin(autoIncrement.plugin, { model: 'list', field: 'lugar' });
module.exports = mongoose.model('list', List);