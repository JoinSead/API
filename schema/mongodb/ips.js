/*
 * IP addresses
 *
 */

//Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema
var new_schema = new Schema({
	ipv4_addr : {
		type: String,
		default: null,
		sparse : true
	},
	ipv6_addr : {
		type: String,
		default: null,
		sparse : true
	},
	white_list : {
		type: Boolean,
		default: false
	},
	black_list : {
		type: Boolean,
		default: false
	},
});

// Save
mongoose.model('ips', new_schema, 'ips');

// Export
module.exports = new_schema.tree;