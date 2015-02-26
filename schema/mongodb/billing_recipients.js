/*
 * Billing Recipients
 *
 */

//Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema
var new_schema = new Schema({
	user_type : {
		type: String,
		default: null,
		index : true
	},
	ref_id : {
		type: String,
		default: null,
		index : true
	},
	created : {
		type : Number
	},
	credentials : {
		type : mongoose.Schema.Types.Mixed
	},
});

// Save
mongoose.model('billing_recipients', new_schema, 'billing_recipients');

// Export
module.exports = new_schema.tree;