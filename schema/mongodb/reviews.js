/*
 * Reviews model
 *
 */

//Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema
var new_schema = new Schema({
	release : {
		type: Schema.ObjectId,
		ref: 'releases'
	},
	project : {
		type: Schema.ObjectId,
		ref: 'projects'
	},
	user : {
		type: Schema.ObjectId,
		ref: 'user'
	},
	rating : {
		type: Number
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
	}
});

// Save
mongoose.model('reviews', new_schema, 'reviews');

// Export
module.exports = new_schema.tree;