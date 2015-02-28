/*
 * Annotations model
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
	release : {
		type: Schema.ObjectId,
		ref: 'releases'
	},
	position : {
		type: String,
		default: null
	},
	title : {
		type: String,
		default: null
	},
	content : {
		type: String,
		default: null
	},
	is_public : {
		type: Boolean,
		default: false
	},
	status : {
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
mongoose.model('annotations', new_schema, 'annotations');

// Export
module.exports = new_schema.tree;