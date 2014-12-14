/*
 * Success utilities
 *
 */

// Create export object
var success = {};

// Standard success
success.std = function(req, res, code, message, details, payload){
	if(typeof(code) !== 'undefined'){
		res.response_data.head.http_code = code;
	}
	if(typeof(message) !== 'undefined'){
		res.response_data.head.http_message = message;
	}
	if(typeof(details) !== 'undefined' && details){
		res.response_data.head.messages.info.push(details);
	}
	if(typeof(payload) !== 'undefined' && payload){
		res.response_data.body = payload;
	}
	api.output(req, res);
};



// 200 Success
success._200 = function(req, res, details, payload){
	var message = 'OK';
	details = typeof(details) !== 'undefined' ? details : 'See body payload, if any';
	payload = (typeof(payload) !== 'undefined' ? payload : false);
	success.std(req, res, 200, message, details, payload);
};

// 201 Created
success._201 = function(req, res){
	var message = 'Created';
	var details = 'Resource created, no payload returned.';
	success.std(req, res, 201, message, details);
};

// 202 Accepted
success._202 = function(req, res){
	var message = 'Accepted';
	var details = 'Request accepted for processing, no payload returned.';
	success.std(req, res, 202, message, details);
};

        

// Export
module.exports = success;