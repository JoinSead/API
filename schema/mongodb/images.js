/*
 * Token model
 * Tokens are granted via auth and identify a user for future requests.
 *
 */

//Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema
var new_schema = new Schema({
	uploader_user_type : {
		type: String,
		default: null
	},
	uploader_ref_id : {
		type: String,
		default: null
	},
	purpose_type : {
		type: String,
		default: null
	},
	purpose_ref_id : {
		type: String,
		default: null
	},
	created : {
		type: Number,
		default : 0
	},
	last_updated : {
		type: Number,
		default : 0
	},
	storage_location : {
		type: String,
		default : null
	},
    upload_method : {
        type: String,
        default : null
    },
	width : {
		type : Number,
		default : 0
	},
	height : {
		type : Number,
		default : 0
	}
});

// Save
mongoose.model('images', new_schema, 'images');

// Export
module.exports = new_schema.tree;