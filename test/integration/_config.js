/*
 * Dependencies
 *
 */
var express = require('express');
var app  = require('../../app');

/*
 * Config
 *
 */
var config = {
    base_url : 'http://localhost:'+app.api.config.port+'/',
    valid_headers : {
        Accept : 'application/json',
        client_key : app.api.config.client_keys[0]
    }, 
    valid_token : function(type, tmp_data){
        var token = typeof(tmp_data[type].token._id) ? tmp_data[type].token._id : null;
        var headers = {
            token : token
        };
        return headers;
    }
};

/*
 * Export
 *
 */
module.exports = config;
