/*
 * Chapter snapshots model
 *
 */

//Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema
var new_schema = new Schema({
	chapter : {
		type: Schema.ObjectId,
		ref: 'chapters'
	},
	save_type : {
		type: String,
		default: null
	},
	note : {
		type: String,
		default: null
	},
	content : {
		type : Schema.Types.Mixed
	},
	created : {
		type : Number
	}
});

// Save
mongoose.model('chapter_snapshots', new_schema, 'chapter_snapshots');

// Export
module.exports = new_schema.tree;