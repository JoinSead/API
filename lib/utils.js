/*
 * Helper utilities
 *
 */

// Create export object
var utilities = {};

// Complete the application
utilities.complete = function(res){
    res.response_data.head.complete = true;
};

// Is app complete
utilities.is_complete = function(res){
    return (
        typeof(res) !== 'undefined' &&
        typeof(res.response_data) !== 'undefined' &&
        typeof(res.response_data.head) !== 'undefined' &&
        typeof(res.response_data.head.complete) !== 'undefined' &&
        res.response_data.head.complete ?
        true : false
    );
};

// Conditional next
utilities.conditional_next = function(res, next){
    if(!api.utilities.is_complete(res)){
        next();
    } else {
        next('Conditional next could not be executed because api completion has been be set to true');
    }
};


// Fill in initial response data
utilities.initial_response_data = function(req,res){
    if(typeof(req) === 'undefined' || typeof(res) === 'undefined'){
        return false;
    }
    var response = {};
    response.settings = {
        verbose : true,
        caching : true,
        jsonp : false,
        complete : false,
    };
    response.head = {
        http_code : 500,
        http_message : 'Internal Server Error',
        current_api_version : api.config.version_num,
        resource : typeof(req.path) !== 'undefined' ? req.path : false,
        method : typeof(req.method) !== 'undefined' ? req.method : false,
        rate_limits : [],
        request_hash : false,
        response_from_cache : false,
        credentials : {
            client_key : {
                code : false,
                is_valid : false
            },
            access_token : {
                code : false,
                user_id : false,
                user_type : false,
                is_valid : false,
                expires_in : 0
            }
        },
        times : {
            receipt : Date.now(),
            response : Date.now(),
            elapsed : 0
        },
        messages : {
            errors : [],
            warnings : [],
            notices : [],
            info : []
        }
    };
    response.body = {};
    res.response_data = response;
    return true;
};

// Validate and set the client id
utilities.validate_client_id = function(req,res, callback){
    var client_id = typeof(req.get('client_key')) !== 'undefined' && req.get('client_key') ? req.get('client_key') : false;
    client_id = !client_id && typeof(req.param('client_key')) !== 'undefined' && req.param('client_key') ? req.param('client_key') : client_id;
    res.response_data.head.credentials.client_key.code = client_id;
    if(!client_id || api.config.client_keys.indexOf(client_id) == -1){
        api.errors._400(req, res, 'Please supply a valid client key with your request.');
    } else {
        res.response_data.head.credentials.client_key.is_valid = true;
        callback();
    }
};

// Validate and set the token
utilities.validate_token = function(req,res, callback){
    var token = typeof(req.get('token')) !== 'undefined' && req.get('token') ? req.get('token') : false;
    token = !token && typeof(req.param('token')) !== 'undefined' && req.param('token') ? req.param('token') : token;
    if(token){
        res.response_data.head.credentials.access_token.code = token;
        var mongoose = require('mongoose');
        var tokens = mongoose.model('tokens');
        var time  = Date.now();
        var ip_address = typeof(req.ip) !== 'undefined' ? req.ip : false;
        tokens.findOne({ _id: token, expires : {$gt: time}, ipv4_addr : ip_address }, function (err, data) {
            if(data){
                res.response_data.head.credentials.access_token.user_id = data.user_id;
                res.response_data.head.credentials.access_token.user_type = data.user_type;
                res.response_data.head.credentials.access_token.is_valid = true;
                res.response_data.head.credentials.access_token.expires_in = data.expires - time;  
                var new_expiration_time = Date.now() + (60 * 60 * 1000); 
                // Update the token to new exp time
                model.auth.tokens.put(token, {expires : new_expiration_time}, function(token_data){
                    if(token_data){
                        res.response_data.head.credentials.access_token.expires_in = new_expiration_time - time;
                    }
                    callback();
                });                    
            } else {
                callback();
            }
        });

    } else {
        callback();
    }
};

// Check and set if output should be verbose
utilities.check_verbose = function(req,res, callback){
    var verbose = typeof(req.get('verbose')) !== 'undefined' && (!req.get('verbose') || req.get('verbose') == 'false') ? false : true;
    verbose = verbose && typeof(req.param('verbose')) !== 'undefined' && (!req.param('verbose') || req.param('verbose') == 'false') ? false : verbose;
    res.response_data.settings.verbose = verbose;
    callback();
};

// Check and set if output should be jsonp
utilities.check_jsonp = function(req,res, callback){
    var jsonp = typeof(req.param('callback')) !== 'undefined' && req.param('callback') ? true : false;
    res.response_data.settings.jsonp = jsonp;
    callback();
};

// Check and set if output should be allowed to cache
utilities.check_caching = function(req,res, callback){
    var caching = typeof(req.get('caching')) !== 'undefined' && (!req.get('caching') || req.get('caching') == 'false') ? false : true;
    caching = caching && typeof(req.param('caching')) !== 'undefined' && (!req.param('caching') || req.param('caching') == 'false') ? false : caching;
    res.response_data.settings.caching = caching;
    callback();
};

// Check and set if output should be allowed to cache
utilities.output_cache = function(req,res, callback){
    if(res.response_data.settings.caching){
        var request_hash = utilities.generate_request_hash(req, res);
        if(request_hash && request_hash.length > 0){
            var redis = require('redis');
            redis_client.get(request_hash, function(err, data) {
                if(!err && data){
                    data_obj = JSON.parse(data);
                    res.response_data.head.response_from_cache = true;
                    api.success._200(req, res, undefined, data_obj);
                } else {
                    callback();
                }
            });
        } else {
            callback();
        }
    } else {
        callback();
    }    
};

// Generate a hash from a request object
utilities.generate_request_hash = function(req, res){
    var crypto = require('crypto');
    var hashable = {
        ip : typeof(req.ip) !== 'undefined' ? req.ip : null,
        token : res.response_data.head.credentials.access_token.code,
        resource : res.response_data.head.resource,
        method : res.response_data.head.method,
        params : req.params,
        body : req.body,
        query : req.query,
        headers : req.headers
    };
    var hash = crypto.createHash('md5').update(JSON.stringify(hashable)).digest('hex');
    res.response_data.head.request_hash = hash;
    return hash;

};



// Check if requesting IP is on the blacklist
utilities.check_ip_blacklist = function(req,res, callback){
    var ip_address = typeof(req.ip) !== 'undefined' ? req.ip : false;
    if(ip_address){
        var mongoose = require('mongoose');
        var ips = mongoose.model('ips');
        ips.count({ ipv4_addr: ip_address, black_list : true }, function (err, count) {
            if (err){
                api.errors.mongodb(req, res, err);
            } else {
                if(count > 0){
                    api.errors._403(req, res, 'The requesting IP has been blacklisted');
                } else {
                    callback();
                }
            }
        });
    } else {
        res.response_data.messages.warnings.push('No ipv4 address could be found in your request. Please supply one.');
    }
};

// Validate the request headers
utilities.validate_headers = {
    // Check http version
    http_version : function(req,res, callback){
        var http_version = req.httpVersion;
        if(http_version != api.config.http_version){
            api.errors._505(req, res);
        } else {
            callback();
        }
    },
    // Check that types are accepted
    accept_type : function(req,res, callback){
        if(!req.accepts(api.config.accept_type)){
            api.errors._406(req, res);
        } else {
            callback();
        }
    },
    // Check that method is accepted
    http_method : function(req,res, callback){
        var method = req.method.toLowerCase();
        if(api.config.methods.indexOf(method) == -1){
            if(method == 'options'){
                api.success._202(req, res);
            } else {
               api.errors._405(req, res); 
            }            
        } else {
            callback();
        }
    },
};

// Perform health check on API and underlying services
utilities.healh_check = {

    // Check if Mongo is in ready state
    mongodb : function(req,res, callback){
        var mongoose = require('mongoose');
        if(mongoose.connection.readyState !== 1){
            api.errors._500(req, res, 'The database could not be accessed');
        } else {
            callback();
        }
    },
    // Check if Redis is ready
    redis : function(req,res, callback){
        if(!redis_client.connected){
           api.errors._500(req, res, 'The caching layer could not be accessed');
        } else {
            callback();
        }
    },
    // Check if RabbitMQ is ready
    rabbitmq : function(req,res, callback){
        if(typeof(api.config.rabbitmq.ready) === undefined || !api.config.rabbitmq.ready){
           api.errors._500(req, res, 'The queueing system could not be accessed');
        } else {
            callback();
        }
    },
    // Check the load on the server
    server_load : function(req,res, callback){
        var os = require('os');
        var load_array = os.loadavg();
        var current_load = parseFloat(load_array[1]);
        var cpu_array = os.cpus();
        var cpu_count = cpu_array.length;
        var actual_load = current_load / cpu_count;
        if(actual_load > api.config.max_load){
           api.errors._503(req, res);
        } else {
            callback();
        }
    },
    // Check the available memory
    memory : function(req,res, callback){
        var os = require('os');
        var total_memory = os.totalmem();
        var free_memory = os.freemem();
        var memory_usage = (total_memory - free_memory) / total_memory;
        if(memory_usage > api.config.max_mem){
           api.errors._503(req, res);
        } else {
            callback();
        } 
    }
};

// Logger
utilities.log = function(data){
    if(api.config.log && typeof(data) !== 'undefined'){
        console.log(data);
    }
};

// Validate email address
utilities.validate_email = function(email){ 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

// Permissions
utilities.permissions = {
    restrict_to_type : function(req, res, user_types, callback){
        if(typeof(user_types) !== 'undefined' && user_types instanceof Array){
            var user_type = res.response_data.head.credentials.access_token.user_type;
            if(user_types.indexOf(user_type) > -1){
                callback(true);
            } else {
                api.errors._401(req, res);
                callback(false);
            }
        } else {
            api.errors._401(req, res);
            callback(false);            
        }
    },
    restrict_to_type_or_self : function(req, res, user_types, self_type, self_id, callback){
        if(typeof(user_types) !== 'undefined' && user_types instanceof Array){
            var user_type = res.response_data.head.credentials.access_token.user_type;
            var user_id = res.response_data.head.credentials.access_token.user_id; 
            if(user_types.indexOf(user_type) > -1){
                callback(true);
            } else {
                if(typeof(self_type) !== 'undefined' && typeof(self_id) !== 'undefined' && user_type && user_id && user_type == self_type && user_id == self_id){
                    callback(true);
                } else {
                    api.errors._401(req, res);
                    callback(false);                    
                }                
            }
        } else {
            api.errors._401(req, res);
            callback(false);   
        }
    }
};

// Combine a data object with a pre-existing object, recursively
utilities.combine_objects_recursive = function(new_obj, old_obj){
    var combined_obj = typeof(old_obj) === 'object' ? old_obj : {};
    for(var index in new_obj) { 
       if (typeof(combined_obj[index]) === 'undefined'){
           combined_obj[index] = new_obj[index];
       } else {
        if(typeof(combined_obj[index]) === 'object' && typeof(new_obj[index]) === 'object' && combined_obj[index] && new_obj[index] && !utilities.is_object_empty(new_obj[index]) && !utilities.is_object_empty(combined_obj[index]) && !(combined_obj[index] instanceof Array) && !(new_obj[index] instanceof Array)){
            combined_obj[index] = utilities.combine_objects_recursive(new_obj[index], combined_obj[index]);
        } else {
            combined_obj[index] = new_obj[index];
        }
       }
    }
    return combined_obj;

};

// Is the object empty?
utilities.is_object_empty = function(obj){
    return Object.getOwnPropertyNames(obj).length === 0 ? true : false;
};



// Export
module.exports = utilities;