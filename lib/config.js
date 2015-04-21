/*
 * Dependencies
 *
 */
var ursa = require('ursa'),
	fs = require('fs');

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
	        domain : 'sead.io',
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
	            'www' : 'http://localhost:4103/',
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
	            'www' : 'http://192.168.1.1:4103/',
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
	    case 'staging':
	    case 'production':
	    	// Set the private key
	    	var private_key = ursa.createPrivateKey(fs.readFileSync('./devops/keys/privkey.pem'));
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
	            host : private_key.decrypt(fs.readFileSync('./devops/encrypted_files/staging/mongo_host.txt', 'utf8').trim(), 'base64', 'utf8'),
	            name : private_key.decrypt(fs.readFileSync('./devops/encrypted_files/staging/mongo_name.txt', 'utf8').trim(), 'base64', 'utf8'),
	            username : private_key.decrypt(fs.readFileSync('./devops/encrypted_files/staging/mongo_username.txt', 'utf8').trim(), 'base64', 'utf8'),
	            password : private_key.decrypt(fs.readFileSync('./devops/encrypted_files/staging/mongo_password.txt', 'utf8').trim(), 'base64', 'utf8')
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
	            username : private_key.decrypt(fs.readFileSync('./devops/encrypted_files/staging/rabbitmq_username.txt', 'utf8').trim(), 'base64', 'utf8'),
	            password : private_key.decrypt(fs.readFileSync('./devops/encrypted_files/staging/rabbitmq_password.txt', 'utf8').trim(), 'base64', 'utf8')
	        };

	        // Stripe
	        config.stripe = {
	            client_id : private_key.decrypt(fs.readFileSync('./devops/encrypted_files/staging/stripe_client_id.txt', 'utf8').trim(), 'base64', 'utf8'),
	            secret_key : private_key.decrypt(fs.readFileSync('./devops/encrypted_files/staging/stripe_secret_key.txt', 'utf8').trim(), 'base64', 'utf8'),
	            publishable_key : private_key.decrypt(fs.readFileSync('./devops/encrypted_files/staging/stripe_publishable_key.txt', 'utf8').trim(), 'base64', 'utf8'),
	           	magic_connect_code : private_key.decrypt(fs.readFileSync('./devops/encrypted_files/staging/stripe_magic_connect_code.txt', 'utf8').trim(), 'base64', 'utf8'),
	        	magic_card_code : private_key.decrypt(fs.readFileSync('./devops/encrypted_files/staging/stripe_magic_card_code.txt', 'utf8').trim(), 'base64', 'utf8'),
	        	magic_customer_id : private_key.decrypt(fs.readFileSync('./devops/encrypted_files/staging/stripe_magic_customer_id.txt', 'utf8').trim(), 'base64', 'utf8')
	        };

	        // Mailgun
		    config.mailgun.api_key = private_key.decrypt(fs.readFileSync('./devops/encrypted_files/staging/mailgun_api_key.txt', 'utf8').trim(), 'base64', 'utf8');

		    

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
	            host : private_key.decrypt(fs.readFileSync('./devops/encrypted_files/production/mongo_host.txt', 'utf8').trim(), 'base64', 'utf8'),
	            name : private_key.decrypt(fs.readFileSync('./devops/encrypted_files/production/mongo_name.txt', 'utf8').trim(), 'base64', 'utf8'),
	            username : private_key.decrypt(fs.readFileSync('./devops/encrypted_files/production/mongo_username.txt', 'utf8').trim(), 'base64', 'utf8'),
	            password : private_key.decrypt(fs.readFileSync('./devops/encrypted_files/production/mongo_password.txt', 'utf8').trim(), 'base64', 'utf8')
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
	            username : private_key.decrypt(fs.readFileSync('./devops/encrypted_files/production/rabbitmq_username.txt', 'utf8').trim(), 'base64', 'utf8'),
	            password : private_key.decrypt(fs.readFileSync('./devops/encrypted_files/production/rabbitmq_password.txt', 'utf8').trim(), 'base64', 'utf8')
	        };

	        // Stripe
	        config.stripe = {
	            client_id : private_key.decrypt(fs.readFileSync('./devops/encrypted_files/production/stripe_client_id.txt', 'utf8').trim(), 'base64', 'utf8'),
	            secret_key : private_key.decrypt(fs.readFileSync('./devops/encrypted_files/production/stripe_secret_key.txt', 'utf8').trim(), 'base64', 'utf8'),
	            publishable_key : private_key.decrypt(fs.readFileSync('./devops/encrypted_files/production/stripe_publishable_key.txt', 'utf8').trim(), 'base64', 'utf8'),
	           	magic_connect_code : private_key.decrypt(fs.readFileSync('./devops/encrypted_files/production/stripe_magic_connect_code.txt', 'utf8').trim(), 'base64', 'utf8'),
	        	magic_card_code : private_key.decrypt(fs.readFileSync('./devops/encrypted_files/production/stripe_magic_connect_code.txt', 'utf8').trim(), 'base64', 'utf8'),
	        	magic_customer_id : private_key.decrypt(fs.readFileSync('./devops/encrypted_files/production/stripe_magic_customer_id.txt', 'utf8').trim(), 'base64', 'utf8')
	        };

	        // Mailgun
		    config.mailgun.api_key = private_key.decrypt(fs.readFileSync('./devops/encrypted_files/staging/mailgun_api_key.txt', 'utf8').trim(), 'base64', 'utf8');

	    break;
	}
	return config;
};


// Export
module.exports = get_config;