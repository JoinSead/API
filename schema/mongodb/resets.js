/*
 * Resets model
 * Resets are generated and sent to the email on file for the user. They are exchangeable (1-time-use) for auth tokens.
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
	issued : {
		type: Number

	},
	expires : {
		type : Number,
		index : true
	},
	is_claimed : {
		type : Boolean,
		default : false
	},
	tokens : [{
		type: Schema.ObjectId,
		ref: 'tokens'
	}],
	url : {
		type: String,
		default: null
	}	
});

// Save
mongoose.model('resets', new_schema, 'resets');

// Export
module.exports = new_schema.tree;