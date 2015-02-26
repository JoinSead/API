/*
 * Relationships
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
	ref_id : {
		type: String,
		default: null
	},
	users_pro : [{
		type: Schema.ObjectId,
		ref: 'users_pro'
	}],
	users_client : [{
		type: Schema.ObjectId,
		ref: 'users_client'
	}],
	users_admin : [{
		type: Schema.ObjectId,
		ref: 'users_admin'
	}]
});

// Save
mongoose.model('relationships', new_schema, 'relationships');

// Export
module.exports = new_schema.tree;