/*
 * Checkouts model
 *
 */

//Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema
var new_schema = new Schema({
	release : {
		type: Schema.ObjectId,
		ref: 'releases'
	},
	user : {
		type: Schema.ObjectId,
		ref: 'users'
	},
	status : {
		type: String,
		default: null
	},
	library_item : {
		type: Schema.ObjectId,
		ref: 'library_items'
	},
	transactions : [{
		type: Schema.ObjectId,
		ref: 'transactions'
	}],
	created : {
		type : Number
	}
});

// Save
mongoose.model('checkouts', new_schema, 'checkouts');

// Export
module.exports = new_schema.tree;