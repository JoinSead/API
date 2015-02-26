/*
 * Flags
 *
 */

//Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema
var new_schema = new Schema({
	type : {
		type: String,
		default: null
	},
	ref_id : {
		type: String,
		default: null
	},
	ref_url : {
		type : String,
		default : null
	},
	sender_type : {
		type: String,
		default: null
	},
	sender_ref_id : {
		type: String,
		default: null
	},
	sender_comments : {
		type: String,
		default : null

	},
	is_resolved : {
		type : Boolean,
		default : false
	},
	timestamp : {
		type : Number,
		default : 0,
		index : true
	},
	resolved_timestamp : {
		type : Number,
		default : 0
	},	
	snapshot : {
		type : Schema.Types.Mixed
	}
});

// Save
mongoose.model('flags', new_schema, 'flags');

// Export
module.exports = new_schema.tree;