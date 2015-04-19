/*
 * Error utilities
 *
 */

// Create export object
var errors = {};

// Standard error
errors.std = function(req, res, code, message, details){
	if(typeof(code) !== 'undefined'){
		res.response_data.head.http_code = code;
	}
	if(typeof(message) !== 'undefined'){
		res.response_data.head.http_message = message;
	}
	if(typeof(details) !== 'undefined' && details){
		res.response_data.head.messages.errors.push(details);
	}
	api.output(req, res);
	
};

// 400 Bad Request
errors._400 = function(req, res, details){
	var message = 'Bad Request';
	details = typeof(details) !== 'undefined' ? details : 'The request could not be completed due to malformed syntax.';
	errors.std(req, res, 400, message, details);
};

// 401 Unauthorized
errors._401 = function(req, res, details){
	var message = 'Unauthorized';
	details = typeof(details) !== 'undefined' ? details : 'Access could not be granted to the resource specified with the credentials provided';
	errors.std(req, res, 401, message, details);
};

// 403 Forbidden
errors._403 = function(req, res, details){
	var message = 'Forbidden';
	details = typeof(details) !== 'undefined' ? details : 'You are not authorized to access this resource using the given method.';
	errors.std(req, res, 403, message, details);
};

// 404 Not Found
errors._404 = function(req, res, details){
	var message = 'Not Found';
	details = typeof(details) !== 'undefined' ? details : 'Sorry that resource cannot be found.';
	errors.std(req, res, 404, message, details);
};

// 405 Method Not Allowed
errors._405 = function(req, res){
	var message = 'Method Not Allowed';
	var details = 'The http method you used is not permitted.';
	errors.std(req, res, 405, message, details);
};

// 406 Not Acceptable
errors._406 = function(req, res){
	var message = 'Not Acceptable';
	var details = 'The resource is not capable of generating response entities that conform to the accept headers sent in the request.';
	errors.std(req, res, 406, message, details);
};

// 500 Internal Server Error
errors._500 = function(req, res, details){
	var message = 'Internal Server Error';
	details = typeof(details) !== 'undefined' ? details : null;
	errors.std(req, res, 500, message, details);
};

// 503 Service Unavailable
errors._503 = function(req, res){
	var message = 'Service Unavailable';
	var details = 'Service temporarily offline due to high load or maintenance';
	errors.std(req, res, 503, message, details);
};

// 505 HTTP Version Not Supported
errors._505 = function(req, res){
	var message = 'HTTP Version Not Supported';
	var details = 'This API does not support the protocol (or protocol-version) used in the request.';
	errors.std(req, res, 505, message, details);
};

// Mongodb Error
errors.mongodb = function(req, res, err){
	var message = 'Internal Server Error';
	var details = 'Error with the MongoDB database, error message: '+err;
	errors.std(req, res, 500, message, details);
};




// Export
module.exports = errors;