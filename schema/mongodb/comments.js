/*
 * Comments model
 *
 */

//Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema
var new_schema = new Schema({
	annotation : {
		type: Schema.ObjectId,
		ref: 'annotations'
	},
	title : {
		type: String,
		default: null
	},
	content : {
		type: String,
		default: null
	},
	created : {
		type : Number
	},
	comments : {
		type: Schema.ObjectId,
		ref: 'comments'
	},
	reactions : {
		type : Schema.Types.Mixed
	},
	rewards : {
		type : Schema.Types.Mixed
	}
});

// Save
mongoose.model('comments', new_schema, 'comments');

// Export
module.exports = new_schema.tree;