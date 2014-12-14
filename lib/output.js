/*
 * Output utilities
 *
 */

// Create output object
var print = function(req, res){
    if(!api.utilities.is_complete(res)){
        var start_time =  res.response_data.head.times.receipt;
        var end_time = Date.now();
        var elapsed = end_time - start_time;
        res.response_data.head.times.elapsed = elapsed;
        res.response_data.head.times.response = end_time;
        var http_code = res.response_data.head.http_code;
        var method = res.response_data.head.method;
        var verbose = res.response_data.settings.verbose;
        if(verbose){
            response = {
                head : res.response_data.head,
                body : res.response_data.body
            };
        } else {
            response = res.response_data.body;
        }
        api.utilities.log(res.response_data.head.http_code + ' ' + res.response_data.head.method + ' ' + res.response_data.head.resource + ' ' + res.response_data.head.times.elapsed + 'ms' + ' ' + res.response_data.head.messages.errors);

        // Turn off browser based caching
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        res.header('Expires', 'Sat, 19 Jan 2013 00:00:00 GMT');
        res.header('Pragma', 'no-cache');
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods','POST, GET, PUT, DELETE, OPTIONS');
        if(typeof(req.get('Access-Control-Request-Headers')) !== 'undefined'){
            res.header('Access-Control-Allow-Headers', req.get('Access-Control-Request-Headers'));
        }

        // Send response
        var jsonp = res.response_data.settings.jsonp;
        if(jsonp){
            res.jsonp(http_code, response);
        } else {
            res.json(http_code, response);
        }

        // Mark response as sent
        api.utilities.complete(res);

        // Add response to the cache if appropriate
        if(api.config.cachable_statuses.indexOf(String(http_code)) !== -1 && api.config.cachable_methods.indexOf(method.toLowerCase()) !== -1){
            var redis = require('redis');
            var data = res.response_data.body;
            var hash = res.response_data.head.request_hash;
            var from_cache = res.response_data.head.response_from_cache;
            if(hash && hash.length > 0 && !from_cache){
                redis_client.setex(hash, api.config.cache_expiration_seconds, JSON.stringify(data));
            }
        }
    }
};



// Export
module.exports = print;