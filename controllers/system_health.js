// Dependencies
var express = require('express');
var router = express.Router();

// Routes
router.route('/')
	.all(function(req, res, next) {
		next();
	})
	.post(function(req, res, next) {
	  	api.errors._403(req, res);
	})
	.get(function(req, res, next) {
		// Should be restricted to valid admin tokens
		api.utilities.permissions.restrict_to_type(req, res, ['admin'], function(cont){
			if(cont){
				// add token processing to utils, so user type is set
				var stats = {
					server_load : model.system.get_server_load(),
					ram : model.system.get_server_memory(),
					minutes_since_restart : model.system.get_hours_since_restart(),
					deployed_version : typeof(api.config.version_num) !== 'undefined' ? api.config.version_num : false
				};
				api.success._200(req, res, undefined, stats);			
			}
		});

	})
	.put(function(req, res, next) {
		api.errors._403(req, res);
	})
	.delete(function(req, res, next) {
	  	api.errors._403(req, res);
	});


// Export
module.exports = router;

