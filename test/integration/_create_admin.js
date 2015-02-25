/*
 * Create an admin
 *
 */


// Config

var express = require('express');
var app  = require('../../app');


// Insert a admin user into the db, store login data
var get_admin = function(callback){
    var admin = {};
    var random = Date.now()+Math.random().toString(36).substring(7);
    var dataset = {};
    admin.username = 'tmp_admin_email_'+random+'@limitx.com';
    admin.password = 'tmp_admin_pw_'+random;
    dataset = {
        name_first : 'tmp_autocreated_admin_fn'+random,
        name_last : 'tmp_autocreated_admin_ln'+random,
        email : {
            address : admin.username
        },
        password_hash : admin.password
    };
    model.admins.post(dataset, function(user_data){
        admin.user_data = user_data;
        callback(admin);
    });
};

// Export

module.exports = get_admin;
