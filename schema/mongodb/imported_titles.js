/*
 * Imported Titles model
 *
 */

//Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema
var new_schema = new Schema({
	name : {
		type: String,
		default: null
	},
	description : {
		type: String,
		default: null
	},
	source : {
		name : {
			type: String,
			default: null
		},
		type : {
			type: String,
			default: null
		},
		url : {
			type: String,
			default: null
		}
	},
	status : {
		type: String,
		default: null
	},
	text : {
		type: String,
		default: null
	},
	project : {
		type: Schema.ObjectId,
		ref: 'projects'
	},
});

// Save
mongoose.model('imported_titles', new_schema, 'imported_titles');

// Export
module.exports = new_schema.tree;