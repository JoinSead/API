// Dependencies
var express = require('express');
var router = express.Router();

// Routes
router.route('/')
	.all(function(req, res, next) {
		next();
	})
	.post(function(req, res, next) {
		var user_data = req.params;
	  	api.errors._403(req, res);
	})
	.get(function(req, res, next) {


		// Should be restricted to valid admin tokens
		api.utilities.permissions.restrict_to_type(req, res, ['admin'], function(cont){
			if(cont){
				// Get basic user details
				var criteria = {
					'_id' : req.query._id,
				};
				model.admins.get(criteria, undefined, function(data){
					if(data && data.length > 0){
						data = data[0];
						var payload = data;
						api.success._200(req, res, undefined, payload);
					} else {
						api.errors._404(req, res, 'A matching admin could not be found');
					}
				});
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

