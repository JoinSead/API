/*
 * Projects model
 *
 */

//Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema
var new_schema = new Schema({
	title : {
		type: String,
		default: null
	},
	profile_images : [{
		type: Schema.ObjectId,
		ref: 'images'
	}],
	banner_images : [{
		type: Schema.ObjectId,
		ref: 'images'
	}],
	cover_images : [{
		type: Schema.ObjectId,
		ref: 'images'
	}],
	description : {
		type: String,
		default: null
	},
	created : {
		type: String,
		default: null
	},
	categories : [{
		type: String,
		default: null
	}],
	user : {
		type: Schema.ObjectId,
		ref: 'users'
	},
	co_authors : {
		type: Schema.ObjectId,
		ref: 'users'
	},
	contributors : {
		type: Schema.ObjectId,
		ref: 'users'
	},
	presale_price : {
		type : Number
	},
	presale_info : {
		type: String,
		default: null
	},
	presale_checkouts : [{
		type: Schema.ObjectId,
		ref: 'checkouts'
	}],
	presale_transactions : [{
		type: Schema.ObjectId,
		ref: 'transactions'
	}],
	checkouts : [{
		type: Schema.ObjectId,
		ref: 'checkouts'
	}],
	transactions : [{
		type: Schema.ObjectId,
		ref: 'transactions'
	}],
	group_messages : [{
		type: Schema.ObjectId,
		ref: 'messages'
	}],
	chapters : [{
		type: Schema.ObjectId,
		ref: 'chapters'
	}],
	releases : [{
		type: Schema.ObjectId,
		ref: 'releases'
	}],
	reviews : [{
		type: Schema.ObjectId,
		ref: 'reviews'
	}]
});

// Save
mongoose.model('projects', new_schema, 'projects');

// Export
module.exports = new_schema.tree;