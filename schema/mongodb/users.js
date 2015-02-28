/*
 * Users
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
	created : {
		type : Number
	},
	terms_agreement_timestamp : {
		type : Number
	},
	projects : [{
		type: Schema.ObjectId,
		ref: 'projects'
	}],
	library : [{
		type: Schema.ObjectId,
		ref: 'checkouts'
	}],
	transactions : [{
		type: Schema.ObjectId,
		ref: 'transactions'
	}],
	billing_profiles : [{
		type: Schema.ObjectId,
		ref: 'billing_profiles'
	}],
	billing_recipients : [{
		type: Schema.ObjectId,
		ref: 'billing_recipients'
	}],
	profile_images : [{
		type: Schema.ObjectId,
		ref: 'images'
	}],
	banner_images : [{
		type: Schema.ObjectId,
		ref: 'images'
	}],
	relationships : [{
		type: Schema.ObjectId,
		ref: 'relationships'
	}],
	messages_sent : [{
		type: Schema.ObjectId,
		ref: 'messages'
	}],
	messages_received : [{
		type: Schema.ObjectId,
		ref: 'messages'
	}],
	location : {
		name : {
			type : String,
			default : null
		},
		address : {
			type : String,
			default : null				
		},
		geo : {
			type: [Number],
			index: '2dsphere'				
		}
	},
	password_hash : {
		type: String,
		default : null
	},
	email : {
		address : { 
			type: String,
			default : null
		},
		is_confirmed : { 
			type: Boolean,
			default : false
		},
		confirmation_id : { 
			type: String,
			default : null
		},
		confirmation_timestamp : { 
			type: Number,
			default : null
		},
		relay_messages : { 
			type: Boolean,
			default : true
		},
		reveal_to_connections : { 
			type: Boolean,
			default : true
		},
		mailing_list_subscribe : { 
			type: Boolean,
			default : false
		},
	}
});

// Save
mongoose.model('users', new_schema, 'users');

// Export
module.exports = new_schema.tree;