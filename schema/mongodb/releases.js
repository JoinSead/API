/*
 * Releases model
 *
 */

//Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema
var new_schema = new Schema({
	version : {
		type: String,
		default: null
	},
	project : {
		type: Schema.ObjectId,
		ref: 'projects'
	},
	created : {
		type : Number
	},
	chapter_snapshots : [{
		type: Schema.ObjectId,
		ref: 'chapter_snapshots'
	}],
	price : {
		type : Number
	},
	checkouts : [{
		type: Schema.ObjectId,
		ref: 'checkouts'
	}],
	transactions : [{
		type: Schema.ObjectId,
		ref: 'transactions'
	}],
	annotations : [{
		type: Schema.ObjectId,
		ref: 'annotations'
	}],
	comments : [{
		type: Schema.ObjectId,
		ref: 'comments'
	}],
	meta : {
		type : Schema.Types.Mixed
	},
	content : {
		type : Schema.Types.Mixed
	}
});

// Save
mongoose.model('releases', new_schema, 'releases');

// Export
module.exports = new_schema.tree;