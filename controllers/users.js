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
	  	inputs.full_name = typeof(req.body.full_name) !== 'undefined' ? req.body.full_name : null;
		inputs.email = typeof(req.body.username) !== 'undefined' ? req.body.username : null;
	  	inputs.agree_terms = typeof(req.body.agree_terms) !== 'undefined' ? req.body.agree_terms : null;
		var has_password = typeof(req.body.password) !== 'undefined' ? true : false;
		var password = typeof(req.body.password) !== 'undefined' ? req.body.password : false;

	  	// Verify inputs are acceptable, add input name to error array if not
	  	inputs.full_name = inputs.full_name && inputs.full_name.length > 0 ? inputs.full_name.trim() : inputs.full_name;
	  	if(typeof(inputs.full_name) === 'undefined' || !inputs.full_name || inputs.full_name.length === 0){
	  		res.response_data.head.messages.errors.push({input : 'full_name'});
	  	}

	  	if(typeof(inputs.agree_terms) === 'undefined' || !(inputs.agree_terms) || inputs.agree_terms === null || (typeof(inputs.agree_terms) === 'string' && inputs.agree_terms.trim() == 'false')){
	  		res.response_data.head.messages.errors.push({input : 'agree_terms'});
	  	}

	  	if(has_password){
		  	inputs.password = password.length > 0 ? password.trim() : password;
		  	if(typeof(inputs.password) === 'undefined' || !inputs.password || inputs.password.length === 0 || inputs.password == 'd41d8cd98f00b204e9800998ecf8427e'){
		  		res.response_data.head.messages.errors.push({input : 'password'});
		  	}	
	  	}

	  	inputs.email = inputs.email && inputs.email.length > 0 ? inputs.email.trim() : inputs.email;
	  	var email_invalidated = false;
	  	if(typeof(inputs.email) === 'undefined' || !inputs.email || inputs.email.length === 0 || !api.utilities.validate_email(inputs.email)){
	  		res.response_data.head.messages.errors.push({input : 'username'});
	  		email_invalidated = true;
	  	}


		// Check if user exists
		var criteria = {
			'email.address' : inputs.email,
		};
		model.users.get('client', criteria, undefined, function(user){
			if(user && user.length > 0 && !email_invalidated){
				res.response_data.head.messages.errors.push({input : 'username'});
				email_invalidated = true;
			}

		  	// Return errored response if needed
		  	if(res.response_data.head.messages.errors.length > 0){
		  		api.errors._400(req, res, 'One or more of the inputs passed contained errors. See errors in head.');

		  	} else {
			  	// Try to create a client user
			  	var first_name = inputs.full_name.substr(0,inputs.full_name.indexOf(' '));
			  	var last_name = inputs.full_name.substr(inputs.full_name.indexOf(' ')+1);
				var dataset = {
					name_last : last_name,
					name_first : first_name,
					email : {
						address : inputs.email,
					}
				};
				if(has_password){
					dataset.password_hash = inputs.password;
				}
				model.users.client.post(dataset, function(user_data){
					if(user_data){
						// Create a token for this new user
						var dataset = {
							user_type : 'client',
							user_id : user_data._id
						};
						model.auth.tokens.post(dataset, req, function(token_data){
							if(token_data){

								// Return the user data and the token
								var payload = {
									'token' : token_data,
									'user' : user_data
								};
								api.success._200(req, res, undefined, payload);

								// Compile welcome email if the user has set a password
								if(typeof(has_password) !== 'undefined'){
									var email_data = user_data;
									email_data.to = user_data.email.address;
									var mail_obj = require('./../email/welcome_client')(email_data);

									// Send to mail queue
									rabbitmq_client.publish('outgoing_mail_queue', mail_obj);
								}
							} else {
								api.errors._500(req, res, 'Error creating token');
							}
						});						
					} else {
						api.errors._500(req, res, 'Error creating user');
					}
				});
		  	}			 
		});

	})
	.get(function(req, res, next) {
		// Get basic user details
		var criteria = {
			'_id' : req.query._id,
		};
		model.users.client.get(criteria, undefined, function(data){
			if(data && data.length > 0){
				data = data[0];
				var payload = data;
				// Augment payload based on passed token
				var user_type = res.response_data.head.credentials.access_token.user_type;
				var user_id = res.response_data.head.credentials.access_token.user_id; 
				if((user_type == 'client' && user_id == req.query._id)|| user_type == 'admin'){
					payload.password_hash = undefined;
				} else {
					payload.email = undefined;
					payload.email.confirmation_id = undefined;
					payload.terms_agreement_timestamp = undefined;
					payload.password_hash = undefined;
					payload.billing_profiles = undefined;
					payload.reservations = undefined;
					payload.transactions = undefined;
					payload.relationships = undefined;
					payload.messages_sent = undefined;
					payload.messages_received = undefined;
				}
				api.success._200(req, res, undefined, payload);
			} else {
				api.errors._404(req, res, 'A matching user could not be found');
			}
		});
	})
	.put(function(req, res, next) {
	  	// Should be restricted to valid admin tokens and the user themself
		api.utilities.permissions.restrict_to_type_or_self(req, res, ['admin'], 'client', req.body._id, function(cont){
			if(cont){
			  	// Grab inputs
			  	var _id = typeof(req.body._id) !== 'undefined' ? req.body._id : null;
			  	var inputs = req.body;
			  	var advanced_filters = typeof(req.body.filters) !== 'undefined' ? req.body.filters : null;
			  	delete inputs._id;
			  	delete inputs.filters;
			  	var criteria = {};

			  	// Verify inputs are acceptable, add input name to error array if not
			  	if(typeof(_id) === 'undefined' || !_id || _id.length === 0){
			  		res.response_data.head.messages.errors.push({input : '_id'});
			  	}

			  	// Check if password was passed as an update field, validate if so
			  	var password_changed = false;
			  	if (typeof(inputs.password_hash) !== 'undefined'){
			  		password_changed = true;
				  	var new_password = typeof(inputs.password_hash) !== 'undefined' && inputs.password_hash && inputs.password_hash.length > 0 ? inputs.password_hash.trim() : null;
				  	var new_password_confirm = typeof(inputs.password_confirm_hash) !== 'undefined' && inputs.password_confirm_hash && inputs.password_confirm_hash.length > 0 ? inputs.password_confirm_hash.trim() : null;
				  	if(typeof(new_password) === 'undefined' || !new_password || new_password.length === 0 || new_password == 'd41d8cd98f00b204e9800998ecf8427e'){
				  		res.response_data.head.messages.errors.push({input : 'password'});
				  	}
				  	if(typeof(new_password_confirm) === 'undefined' || !new_password_confirm || new_password_confirm.length === 0 || new_password_confirm !== new_password){
				  		res.response_data.head.messages.errors.push({input : 'password_confirm'});
				  	}

			  	}

			  	// Check if email was passed as an update field. Validate if so.
			  	if (typeof(inputs.email) !== 'undefined' && typeof(inputs.email.address) !== 'undefined'){
				  	var new_email = typeof(inputs.email.address) !== 'undefined' && inputs.email.address && inputs.email.address.length > 0 ? inputs.email.address.trim() : null;
				  	var email_invalidated = false;
				  	if(typeof(new_email) === 'undefined' || !new_email || new_email.length === 0 || !api.utilities.validate_email(new_email)){
				  		res.response_data.head.messages.errors.push({input : 'email'});
				  		email_invalidated = true;
				  	}
					// Check if user exists
					criteria = {
						'email.address' : new_email,
					};
					model.users.get('pro', criteria, undefined, function(user){
						if(user && user.length > 0 && !email_invalidated){
							res.response_data.head.messages.errors.push({input : 'email'});
							email_invalidated = true;
						}
					  	// Return errored response if needed
					  	if(res.response_data.head.messages.errors.length > 0){
					  		api.errors._400(req, res, 'One or more of the inputs passed contained errors. See errors in head.');
					  	} else {
							// Check if user exists
							var criteria = {
								'_id' : _id,
							};
							if(typeof(inputs.email) !=='undefined' && typeof(inputs.email.is_confirmed) !=='undefined'){
								criteria['email.confirmation_id'] = typeof(advanced_filters.email.confirmation_id) !== 'undefined' ? advanced_filters.email.confirmation_id : null;
								criteria['email.is_confirmed'] = false;
							}
							model.users.client.get(criteria, undefined, function(user){
								if(user && user.length > 0 ){
								  	// Try to update a user
								  	var saved_data = user[0];
									var dataset = inputs;
									model.users.client.put(_id, dataset, function(user_data){
										if(user_data){
											// Return the user data
											var payload = user_data;
											api.success._200(req, res, undefined, payload);	

											// Compile confirm-email message
											var email_data = user_data;
											email_data.to = user_data.email.address;
											var mail_obj = require('./../email/confirm_email_client')(email_data);

											// Send to mail queue
											rabbitmq_client.publish('outgoing_mail_queue', mail_obj);


										} else {
											api.errors._500(req, res, 'Error updating user data');
										}
									});
								  	
								} else {
									api.errors._404(req, res, 'A matching user could not be found');
								}
							});
					  	}
					});
			  	} else {
				  	// Return errored response if needed
				  	if(res.response_data.head.messages.errors.length > 0){
				  		api.errors._400(req, res, 'One or more of the inputs passed contained errors. See errors in head.');
				  	} else {
						// Check if user exists
						criteria = {
							'_id' : _id,
						};
						model.users.client.get(criteria, undefined, function(user){
							if(user && user.length > 0 ){
							  	// Try to update a user
							  	var saved_data = user[0];
							  	var existing_password = saved_data.password_hash;
								var dataset = inputs;
								var email_data = null;
								var mail_obj = null;
								model.users.client.put(_id, dataset, function(user_data){
									if(user_data){

										// If user updated password, send conf email or welcome email
										if(password_changed){
											if(existing_password === null){
												email_data = user_data;
												email_data.to = user_data.email.address;
												mail_obj = require('./../email/welcome_client')(email_data);

												// Send to mail queue
												rabbitmq_client.publish('outgoing_mail_queue', mail_obj);
											} else {
												email_data = user_data;
												email_data.to = user_data.email.address;
												mail_obj = require('./../email/password_changed_client')(email_data);

												// Send to mail queue
												rabbitmq_client.publish('outgoing_mail_queue', mail_obj);						
											}
										}

										// Return the user data
										var payload = user_data;
										api.success._200(req, res, undefined, payload);					
									} else {
										api.errors._500(req, res, 'Error updating user data');
									}
								});
							  	
							} else {
								api.errors._404(req, res, 'A matching user could not be found');
							}
						});
				  	}
			  	}
			}
		});
	})
	.delete(function(req, res, next) {
	  	// Should be restricted to valid admin tokens and the user themself
		api.utilities.permissions.restrict_to_type_or_self(req, res, ['admin'], 'client', req.body._id, function(cont){
			if(cont){
			  	// Grab inputs
			  	var _id = typeof(req.body._id) !== 'undefined' ? req.body._id : null;
			  	var password_hash = typeof(req.body.password_hash) !== 'undefined' ? req.body.password_hash : null;
			  	var ramification_1 = typeof(req.body.ramification_1) !== 'undefined' ? req.body.ramification_1 : null;
			  	var ramification_2 = typeof(req.body.ramification_2) !== 'undefined' ? req.body.ramification_2 : null;
			  	var ramification_3 = typeof(req.body.ramification_3) !== 'undefined' ? req.body.ramification_3 : null;
			  	var ramification_4 = typeof(req.body.ramification_4) !== 'undefined' ? req.body.ramification_4 : null;
			  	var ramification_5 = typeof(req.body.ramification_5) !== 'undefined' ? req.body.ramification_5 : null;
			  	var user_type = res.response_data.head.credentials.access_token.user_type;

			  	// Verify inputs are acceptable, add input name to error array if not
			  	if(typeof(_id) === 'undefined' || !_id || _id.length === 0){
			  		res.response_data.head.messages.errors.push({input : '_id'});
			  	}

			  	// Only check form inputs if the request comes from the user in question
			  	if(user_type == 'client'){
				  	if(typeof(ramification_1) === 'undefined' || !ramification_1 || ramification_1 == 'false'){
				  		res.response_data.head.messages.errors.push({input : 'ramification_1'});
				  	}
				  	if(typeof(ramification_2) === 'undefined' || !ramification_2 || ramification_2 == 'false'){
				  		res.response_data.head.messages.errors.push({input : 'ramification_2'});
				  	}
				  	if(typeof(ramification_3) === 'undefined' || !ramification_3 || ramification_3 == 'false'){
				  		res.response_data.head.messages.errors.push({input : 'ramification_3'});
				  	}
				  	if(typeof(ramification_4) === 'undefined' || !ramification_4 || ramification_4 == 'false'){
				  		res.response_data.head.messages.errors.push({input : 'ramification_4'});
				  	}
				  	if(typeof(ramification_5) === 'undefined' || !ramification_5 || ramification_5 == 'false'){
				  		res.response_data.head.messages.errors.push({input : 'ramification_5'});
				  	}
				  	if(typeof(password_hash) === 'undefined' || !password_hash || password_hash.length === 0){
				  		res.response_data.head.messages.errors.push({input : 'password'});
				  	}
					var criteria = {
						'_id' : _id,
						'password_hash' : password_hash
					};
					model.users.client.get(criteria, undefined, function(data){
						if(!data || data.length === 0){
							res.response_data.head.messages.errors.push({input : 'password'});
						}
					  	// Return errored response if needed
					  	if(res.response_data.head.messages.errors.length > 0){
					  		api.errors._400(req, res, 'One or more of the inputs passed contained errors. See errors in head.');
					  	} else {
							// Delete user
							model.users.client.delete({'_id' : _id}, function(outcome){
								if(outcome){
									api.success._200(req, res);
								} else {
									api.errors._500(req, res, 'Error trying to delete user');
								}
							});
					  	}
					});
			  	} else {
				  	// Return errored response if needed
				  	if(res.response_data.head.messages.errors.length > 0){
				  		api.errors._400(req, res, 'One or more of the inputs passed contained errors. See errors in head.');
				  	} else {
						// Delete user
						model.users.client.delete({'_id' : _id}, function(outcome){
							if(outcome){
								api.success._200(req, res);
							} else {
								api.errors._500(req, res, 'Error trying to delete user');
							}
						});
				  	}			  		
			  	}
			}
		});
	});


// Export
module.exports = router;

