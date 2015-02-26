/*
 * Transactions
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
		type : String,
		default : null
	},
	user_type : {
		type: String,
		default: null
	},
	user_ref_id : {
		type : String,
		default : null
	},
	item_price : {
		type : Number,
		default : 0
	},
	item_quantity : {
		type : Number,
		default : 0
	},
	item_name : {
		type : String,
		default : null
	},
	item_description : {
		type : String,
		default : null
	},
	service_percent : {
		type : Number,
		default : 0
	},
	convenience_fee : {
		type : Number,
		default : 0
	},
	subtotal : {
		type : Number,
		default : 0
	},
	tax : {
		type : Number,
		default : 0
	},
	stripe_fee : {
		type : String,
		default : null
	},
	is_stripe_fee_added : {
		type : Boolean,
		default : false
	},
	total : {
		type : Number,
		default : 0
	},
	timestamp : {
		type : Number,
		default : 0
	},
	stripe_transaction_id : {
		type : String,
		default : null,
		index : true
	},
	billing_profile : {
		type: Schema.ObjectId,
		ref: 'billing_profile'
	},
	billing_recipient : {
		type: Schema.ObjectId,
		ref: 'billing_recipient'
	},
	recipient_fee : {
		type : Number,
		default : 0
	},
	invoice_id : {
		type: String,
		default : null

	},
	private_hash : {
		type : String,
		default : null,
		index : true
	},
	status : {
		type: String,
		default: null
	}
});

// Save
mongoose.model('transactions', new_schema, 'transactions');

// Export
module.exports = new_schema.tree;