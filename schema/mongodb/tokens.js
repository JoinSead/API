/*
 * Token model
 * Tokens are granted via auth and identify a user for future requests.
 *
 */

//Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema
var new_schema = new Schema({
	user_type : {
		type: String,
		default: null
	},
	user_id : {
		type: String,
		default: null
	},
	ipv4_addr : {
		type : String,
		default : null,
		index : true
	},
	issued : {
		type: Number

	},
	expires : {
		type : Number,
		index : true
	}
});

// Save
mongoose.model('tokens', new_schema, 'tokens');

// Export
module.exports = new_schema.tree;