/*
 * Messages
 *
 */

//Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema
var new_schema = new Schema({
	sender_type : {
		type: String,
		default: null
	},
	sender_ref_id : {
		type: String,
		default: null
	},
	recipient_type : {
		type: String,
		default: null
	},
	recipient_ref_id : {
		type: String,
		default: null
	},
	subject : {
		type : String,
		default : null
	},
	message : {
		type : String,
		default : null
	},
	sent_timestamp : {
		type : Number,
		default : 0
	},
	opened_timestamp : {
		type : Number,
		default : 0
	},
	opened_relayed_timestamp : {
		type : Number,
		default : 0
	},
	tracking_id : {
		type: String,
		default : null,
		index : true
	}
});

// Save
mongoose.model('messages', new_schema, 'messages');

// Export
module.exports = new_schema.tree;