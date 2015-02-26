/*
 * Billing Profiles
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
	stripe_customer_id : {
		type : String,
		default : null
	},
	credit_card_number : {
		type : String,
		default : null
	},
	expiration_month : {
		type : String,
		default : null
	},
	expiration_year : {
		type : String,
		default : null
	},
	cvc : {
		type : String,
		default : null
	},
	meta_data_customer : {
		type : Schema.Types.Mixed
	},
	meta_data_card : {
		type : Schema.Types.Mixed
	},
	is_valid : {
		type : Boolean,
		default : true
	},
});

// Save
mongoose.model('billing_profiles', new_schema, 'billing_profiles');

// Export
module.exports = new_schema.tree;