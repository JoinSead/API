/*
 * Library Items model
 *
 */

//Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema
var new_schema = new Schema({
	project : {
		type: Schema.ObjectId,
		ref: 'projects'
	},
	release : {
		type: Schema.ObjectId,
		ref: 'releases'
	},
	checkout : {
		type: Schema.ObjectId,
		ref: 'checkouts'
	},
	transactions : [{
		type: Schema.ObjectId,
		ref: 'transactions'
	}],
	bookmarks : [{
		type: Schema.ObjectId,
		ref: 'bookmarks'
	}],
	annotations : [{
		type: Schema.ObjectId,
		ref: 'annotations'
	}],
	place_marker : {
		type: String,
		default: null
	},
	has_finished : {
		type: Boolean,
		default: false
	},
	status : {
		type: String,
		default: false
	}
});

// Save
mongoose.model('library_items', new_schema, 'library_items');

// Export
module.exports = new_schema.tree;