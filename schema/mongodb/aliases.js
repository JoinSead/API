/*
 * Aliases model
 *
 */

//Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema
var new_schema = new Schema({
	uri : {
		type: String,
		default: null,
		index : true
	},
	type : {
		type: String,
		default: null
	},
	ref_id : {
		type: String,
		default: null
	},
	creator_type : {
		type: String,
		default: null
	},
	creator_ref_id : {
		type: String,
		default: null
	},
	created : {
		type : Number
	}
});

// Save
mongoose.model('aliases', new_schema, 'aliases');

// Export
module.exports = new_schema.tree;