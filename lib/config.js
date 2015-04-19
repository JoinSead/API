/*
 * Config 
 *
 */

var get_config = function(app){

	// Create export object
	var config = {
		site_name : 'Sead',
	    port : 3000,
	    version_num : '0.0.1',
	    log : false,
	    max_mem : 1.5,
	    max_load : 2.5,
	    http_version : 1.1,
	    accept_type : 'json',
	    methods : [
	        'post',
	        'get',
	        'put',
	        'delete'
	    ],
	    client_keys : [
	        'dkpuXKEuF7pLvBL', // development
	        'HJq3xOYbSwOWoL7', // staging
	        'K4cjNMiAwWjpMuc' // production
	    ],
	    cachable_statuses : [
	        '200'
	    ],
	    cachable_methods : [
	        'get'
	    ],
	    cache_expiration_seconds : 30,
	    flag_types : [
	        'users',
	        'messages'
	    ],
	    mailgun : {
	        api_key : null,
	        domain : null,
	        default_sender : 'info@sead.io'
	    },
	    stripe : {
	        client_id : null,
	        secret_key : null,
	        publishable_key : null,
	        magic_connect_code : null,
	        magic_card_code : null,
	        magic_customer_id : null
	    }
	};

	// Environment-specific config
	switch(app.get('env')){
	    case 'development' :
	        // Base URLs
	        config.urls = {
	            'www' : 'http://localhost:4001/',
	            'api' : 'http://localhost:3000/'
	        };
	        // Mongo
	        config.mongo = {
	            host : 'localhost',
	            name : 'sead'
	        };

	        // Redis
	        config.redis = {
	            host : 'localhost',
	            port : 6379
	        };

	        // RabbitMQ
	        config.rabbitmq = {
	            host : 'localhost',
	            port : 5672,
	            username : 'guest',
	            password : 'guest'
	        };
	    break;
	    case 'lan' :
	        // Base URLs
	        config.urls = {
	            'www' : 'http://192.168.1.1:4001/',
	            'api' : 'http://192.168.1.1:3000/'
	        };
	        // Mongo
	        config.mongo = {
	            host : 'localhost',
	            name : 'sead'
	        };
	        // Redis
	        config.redis = {
	            host : 'localhost',
	            port : 6379
	        };

	        // RabbitMQ
	        config.rabbitmq = {
	            host : 'localhost',
	            port : 5672,
	            username : 'guest',
	            password : 'guest'
	        };
	    break;
	    case 'staging' :
	        // Port
	        config.port = 80;

	        // Base URLs
	        config.urls = {
	            'www' : 'http://staging.sead.io/',
	            'api' : 'http://api-staging.sead.io/'
	        };
	        // Mongo
	        config.mongo = {
	            host : 'localhost',
	            name : 'sead'
	        };
	        // Redis
	        config.redis = {
	            host : 'localhost',
	            port : 6379
	        };

	        // RabbitMQ
	        config.rabbitmq = {
	            host : 'localhost',
	            port : 5672,
	            username : 'guest',
	            password : 'guest'
	        };
	    break;
	    case 'production' :
	        // Port
	        config.port = 80;

	        // Base URLs
	        config.urls = {
	            'www' : 'https://sead.io/',
	            'api' : 'https://api.sead.io/'
	        };
	        // Mongo
	        config.mongo = {
	            host : null,
	            name : 'sead',
	            username : null,
	            password : null
	        };

	        // Redis
	        config.redis = {
	            host : 'localhost',
	            port : 6379
	        };

	        // RabbitMQ
	        config.rabbitmq = {
	            host : 'localhost',
	            port : 5672,
	            username : 'guest',
	            password : 'guest'
	        };

	        // Stripe
	        config.stripe = {
	            client_id : null,
	            secret_key : null,
	            publishable_key : null
	        };
	    break;
	}
	return config;
};


// Export
module.exports = get_config;