/*
 * Admins
 *
 */

//Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema
var new_schema = new Schema({
	name_first : {
		type: String,
		default : null
	},
	name_last : {
		type: String,
		default : null
	},
	email : {
		address : { 
			type: String,
			default : null
		},
		timestamp : { 
			type: Number,
			default : 0
		}
	},
	password_hash : {
		type : String,
		default : null
	},
	phone : {
		number : { 
			type: String,
			default : null
		},
		timestamp : { 
			type: Number,
			default : 0
		}
	},
	ips_added : [{
		type: Schema.ObjectId,
		ref: 'ips'
	}],
	messages_sent : [{
		type: Schema.ObjectId,
		ref: 'messages'
	}]
});

// Save
mongoose.model('admins', new_schema, 'admins');

// Export
module.exports = new_schema.tree;