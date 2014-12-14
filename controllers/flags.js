// Dependencies
var express = require('express');
var router = express.Router();

// Routes
router.route('/')
	.all(function(req, res, next) {
		next();
	})
	.post(function(req, res, next) {
	  	// Grab inputs
	  	var inputs = {};
	  	inputs.type = typeof(req.body.type) !== 'undefined' ? req.body.type : null;
		inputs.ref_id = typeof(req.body.ref_id) !== 'undefined' ? req.body.ref_id : null;
		inputs.ref_url = typeof(req.body.ref_url) !== 'undefined' ? req.body.ref_url : null;
		inputs.comments = typeof(req.body.comments) !== 'undefined' ? req.body.comments : null;

	  	// Verify inputs are acceptable, add input name to error array if not
	  	var allowed_types = api.config.flag_types;
	  	if(typeof(inputs.type) === 'undefined' || !inputs.type || inputs.type === 0 || allowed_types.indexOf(inputs.type) == -1){
	  		res.response_data.head.messages.errors.push({input : 'type'});
	  	}

	  	inputs.ref_id = inputs.ref_id && inputs.ref_id > 0 ? inputs.ref_id.trim() : inputs.ref_id;
	  	if(typeof(inputs.ref_id) === 'undefined' || !inputs.ref_id || inputs.ref_id.length === 0){
	  		res.response_data.head.messages.errors.push({input : 'ref_id'});
	  	}

	  	inputs.ref_url = inputs.ref_url && inputs.ref_url > 0 ? inputs.ref_url.trim() : inputs.ref_url;
	  	if(typeof(inputs.ref_url) === 'undefined' || !inputs.ref_url || inputs.ref_url.length === 0){
	  		res.response_data.head.messages.errors.push({input : 'ref_url'});
	  	}

		// Check if user exists
		var criteria = {
			'email.address' : inputs.email,
		};

	  	// Return errored response if needed
	  	if(res.response_data.head.messages.errors.length > 0){
	  		api.errors._400(req, res, 'One or more of the inputs passed contained errors. See errors in head.');

	  	} else {
		  	// Try to create a flag
            var user_type = res.response_data.head.credentials.access_token.user_type;
            var user_id = res.response_data.head.credentials.access_token.user_id; 
			var dataset = {
				type : inputs.type,
				ref_id : inputs.ref_id,
				ref_url : inputs.ref_url
			};
			if(user_type && user_id){
				dataset.sender_type = user_type;
				dataset.sender_ref_id = user_id;
			}
			if(inputs.comments){
				dataset.sender_comments = inputs.comments;
			}
			model.flags.post(dataset, function(data){
				if(data){

					// Return the flag data 
					var payload = data;
					api.success._200(req, res, undefined, payload);
												
				} else {
					api.errors._500(req, res, 'Error creating flag');
				}
			});

	  	}			 

	})
	.get(function(req, res, next) {
	  	// Should be restricted to valid admin tokens 
		api.utilities.permissions.restrict_to_type(req, res, ['admin'], function(cont){
			if(cont){
			  	if(!Object.keys(req.query).length){
			  		res.response_data.head.messages.errors.push({input : 'filters'});
			  	}
			  	// Return errored response if needed
			  	if(res.response_data.head.messages.errors.length > 0){
			  		api.errors._400(req, res, 'One or more of the inputs passed contained errors. See errors in head.');
			  	} else {
					// Get basic user details
					var criteria = req.query;
					model.flags.get(criteria, undefined, function(data){
						if(data && data.length > 0){
							var payload = data;
							api.success._200(req, res, undefined, payload);
						} else {
							api.errors._404(req, res, 'A matching flag could not be found');
						}
					});	
				}			
			}
		});
	})
	.put(function(req, res, next) {
	  	// Should be restricted to valid admin tokens 
		api.utilities.permissions.restrict_to_type(req, res, ['admin'], function(cont){
			if(cont){

			  	var _id = typeof(req.body._id) !== 'undefined' ? req.body._id : null;

			  	if(!Object.keys(req.body).length){
			  		res.response_data.head.messages.errors.push({input : 'filters'});
			  	} else if(typeof(_id) === 'undefined' || !_id || _id.length === 0){
			  		res.response_data.head.messages.errors.push({input : '_id'});
			  	}

			  	var inputs = req.body;
			  	delete inputs._id;

			  	// Return errored response if needed
			  	if(res.response_data.head.messages.errors.length > 0){
			  		api.errors._400(req, res, 'One or more of the inputs passed contained errors. See errors in head.');
			  	} else {
					// Get basic user details
					var criteria = {
						'_id' : _id
					};
					model.flags.get(criteria, undefined, function(data){
						if(data && data.length > 0){
						  	var saved_data = data[0];
							var dataset = inputs;
							model.flags.put(_id, dataset, function(flag_data){
								if(flag_data){
									// Return the flag data
									var payload = flag_data;
									api.success._200(req, res, undefined, payload);					
								} else {
									api.errors._500(req, res, 'Error updating flag data');
								}
							});
						} else {
							api.errors._404(req, res, 'A matching flag could not be found');
						}
					});	
				}			
			}
		});
	})
	.delete(function(req, res, next) {
	  	// Should be restricted to valid admin tokens 
		api.utilities.permissions.restrict_to_type(req, res, ['admin'], function(cont){
			if(cont){

			  	var _id = typeof(req.body._id) !== 'undefined' ? req.body._id : null;

				if(typeof(_id) === 'undefined' || !_id || _id.length === 0){
			  		res.response_data.head.messages.errors.push({input : '_id'});
			  	}

			  	// Return errored response if needed
			  	if(res.response_data.head.messages.errors.length > 0){
			  		api.errors._400(req, res, 'One or more of the inputs passed contained errors. See errors in head.');
			  	} else {
					// Delete user
					model.flags.delete({'_id' : _id}, function(outcome){
						if(outcome){
							api.success._200(req, res);
						} else {
							api.errors._500(req, res, 'Error trying to delete flag');
						}
					});
				}			
			}
		});
	});


// Export
module.exports = router;

