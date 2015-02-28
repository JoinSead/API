/*
 * Chapters model
 *
 */

//Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema
var new_schema = new Schema({
	project : {
		type: Schema.ObjectId,
		ref: 'projects'
	},
	number : {
		type: Number
	},
	name : {
		type: String,
		default: null
	},
	description : {
		type: String,
		default: null
	},
	content : {
		type: String,
		default: null
	},
	snapshots : [{
		type: Schema.ObjectId,
		ref: 'chapter_snapshots'
	}],
	created : {
		type : Number
	},
	author_annotations : [{
		type: Schema.ObjectId,
		ref: 'annotations'
	}],
});

// Save
mongoose.model('chapters', new_schema, 'chapters');

// Export
module.exports = new_schema.tree;