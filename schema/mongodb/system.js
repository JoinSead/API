/*
 * System model
 *
 */

//Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema
var new_schema = new Schema({
	pro_mode : {
		type: String,
		default: null,
		index : true
	},
	client_mode : {
		type: String,
		default: null,
		index : true
	},
	admin_mode : {
		type : String,
		default : null,
		index : true
	},
	api_mode : {
		type : String,
		default : null,
		index : true
	},

});

// Save
mongoose.model('system', new_schema, 'system');

// Export
module.exports = new_schema.tree;