/*
 * Create an auth token for a user
 *
 */


// Config

var express = require('express');
var app  = require('../../app');


// Temp data

var random = Date.now();
var dataset = {};


// Insert a token for the given user
var get_token = function(user_type, user_id, callback){
    var dataset = {
        user_type : user_type,
        user_id : user_id
    };
    var req = {
        ip : '127.0.0.1'
    };
    model.auth.tokens.post(dataset, req, function(data){
        callback(data);
    });
    
};


// Export

module.exports = get_token;
