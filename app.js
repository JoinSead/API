/*
 * Application init
 *
 */

// Dependencies
var express = require('express');
var compression = require('compression');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var redis = require('redis');
var fs = require('fs');
var rabbitmq = require('amqp');

// Define the application
var app = express();

// Set the process
process.title = 'litariaapi';

// App level settings
app.enable('trust proxy');

// Required middleware
app.use(compression({threshold:0}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

// Create the API object, with needed lib helpers
api = {
    config : require('./lib/config')(app),
    errors : require('./lib/errors'),
    success : require('./lib/success'),
    utilities : require('./lib/utils'),
    workers : require('./lib/workers'),
    output : require('./lib/output')
};


// Load MongoDB
if(typeof(api.config.mongo.username) == 'undefined'){
    mongoose.connect('mongodb://'+api.config.mongo.host+'/'+api.config.mongo.name);
} else {
    mongoose.connect('mongodb://'+api.config.mongo.username+':'+api.config.mongo.password+'@'+api.config.mongo.host+'/'+api.config.mongo.name);
}

// Load Redis
redis_client = redis.createClient(api.config.redis.port, api.config.redis.host);

// Load RabbitMQ
rabbitmq_client = rabbitmq.createConnection({
    host: api.config.rabbitmq.host,
    port: api.config.rabbitmq.port,
    login: api.config.rabbitmq.username,
    password: api.config.rabbitmq.password
});
rabbitmq_client.on('ready', function (){

    // Set rabbitmq as ready
    global.api.config.rabbitmq.ready = true;

    // Create outgoing mail queue
    rabbitmq_client.queue('outgoing_mail_queue', function(q){
        q.bind('#');
        q.subscribe(function (message) {
          api.workers.send_email(message);
        });
    });
});

// Load All MongoDB Schema
fs.readdirSync(__dirname + '/schema/mongodb').forEach(function(filename){
    if(~filename.indexOf('.js')){
        require(__dirname + '/schema/mongodb/'+filename);
    }
});

// Load All Models
model = {};
fs.readdirSync(__dirname + '/models').forEach(function(filename){
    if(~filename.indexOf('.js')){
        model[filename.replace('.js', '')] = require(__dirname + '/models/'+filename);
    }
});


/*
 * Request init
 *
 */

// Load the initial api response 
app.use(function(req, res, next){
    api.utilities.initial_response_data(req, res);
    api.utilities.conditional_next(res, next);
});

// Disable extraneous response headers
app.disable('etag');
app.disable('x-powered-by');

// Check if output should be verbose
app.use(function(req, res, next){
    api.utilities.check_verbose(req, res, function(){
        api.utilities.conditional_next(res, next);
    });
});

// Check if output should be JSONP callback
app.use(function(req, res, next){
    api.utilities.check_jsonp(req, res, function(){
        api.utilities.conditional_next(res, next);
    });
});

// Perform validation of basic request headers 
app.use(function(req, res, next){
    api.utilities.validate_headers.http_version(req, res, function(){
        api.utilities.conditional_next(res, next);
    });
});

app.use(function(req, res, next){
    api.utilities.validate_headers.http_method(req, res, function(){
        api.utilities.conditional_next(res, next);
    });
});

app.use(function(req, res, next){
    api.utilities.validate_headers.accept_type(req, res, function(){
        api.utilities.conditional_next(res, next);
    });
});


// Perform API health check validations
app.use(function(req, res, next){
    api.utilities.healh_check.mongodb(req, res, function(){
        api.utilities.conditional_next(res, next);
    });
});

app.use(function(req, res, next){
    api.utilities.healh_check.redis(req, res, function(){
        api.utilities.conditional_next(res, next);
    });
});

app.use(function(req, res, next){
    api.utilities.healh_check.rabbitmq(req, res, function(){
        api.utilities.conditional_next(res, next);
    });
});

app.use(function(req, res, next){
    api.utilities.healh_check.server_load(req, res, function(){
        api.utilities.conditional_next(res, next);
    });
});

app.use(function(req, res, next){
    api.utilities.healh_check.memory(req, res, function(){
        api.utilities.conditional_next(res, next);
    });
});

// Validate and set client ID
app.use(function(req, res, next){
    api.utilities.validate_client_id(req, res, function(){
        api.utilities.conditional_next(res, next);
    });
});

// Check IP blacklist
app.use(function(req, res, next){
    api.utilities.check_ip_blacklist(req, res, function(){
        api.utilities.conditional_next(res, next);
    });
});

// Validate token, get user id and role
app.use(function(req, res, next){
    api.utilities.validate_token(req, res, function(){
        api.utilities.conditional_next(res, next);
    });
});

// Check if output should be allowed to cache
app.use(function(req, res, next){
    api.utilities.check_caching(req, res, function(){
        api.utilities.conditional_next(res, next);
    });
});

// Check caching layer for resource, output optionally
app.use(function(req, res, next){
    api.utilities.output_cache(req, res, function(){
        api.utilities.conditional_next(res, next);
    });
});


/*
 * Routing
 *
 */

var routes = require('./lib/routes');
app.use('/', routes);


/*
 * Export
 *
 */

app.api = api;
module.exports = app;