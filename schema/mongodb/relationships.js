/*
 * Relationships
 *
 */

//Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema
var new_schema = new Schema({
	user : {
		type: Schema.ObjectId,
		ref: 'users'
	},
	created : {
		type: Number,
		default: null
	},
	type : {
		type: String,
		default: null
	}
});

// Save
mongoose.model('relationships', new_schema, 'relationships');

// Export
module.exports = new_schema.tree;