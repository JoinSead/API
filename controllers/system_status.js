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
	  	api.errors._403(req, res);
	})
	.put(function(req, res, next) {
		api.errors._403(req, res);
	})
	.delete(function(req, res, next) {
	  	api.errors._403(req, res);
	});


// Export
module.exports = router;

