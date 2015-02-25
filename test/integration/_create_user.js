/*
 * Create a user
 *
 */


// Config

var express = require('express');
var app  = require('../../app');


// Insert a user into the db, store login data
var get_user = function(callback){
    var user = {};
    var random = Date.now()+Math.random().toString(36).substring(7);
    var dataset = {};
    user.username = 'tmp_user_email_'+random+'@limitx.com';
    user.password = 'tmp_user_pw_'+random;
    dataset = {
        name_first : 'tmp_autocreated_user_fn'+random,
        name_last : 'tmp_autocreated_user_ln'+random,
        email : {
            address : user.username
        },
        password_hash : user.password
    };
    model.users.post(dataset, function(user_data){
        user.user_data = user_data;
        callback(user);
    });
};




// Export

module.exports = get_user;
