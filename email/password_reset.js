/*
 * Text for password-reset email
 *
 */


// Config
var express = require('express');
var Handlebars = require('handlebars');
var app  = require('./../app');


// Compose email
var get_email = function(data){
    var email = {};
    email.subject = 'Password Reset Instructions';
    var source = 'Hi {{name_first}},\n'
    +'\n'
    +'We have received a request to reset your LimitX Pro password.\n'
    +'\n'
    +'If you would like to reset your password, please follow the link below. It will grant you 1-time access to your LimitX Pro control panel. It will take you to the section of your account where you can choose a new password:\n'
    +'\n'
    +api.config.urls.pro+'reset_password/{{reset.url}}\n'
    +'\n'
    +'If you did not request this reset, you can ignore this email.\n'
    +'\n'
    +'Thanks you,\n'
    +'The LimitX Team';

    var template = Handlebars.compile(source);
    email.text = template(data);
    email.sender = {
        name : 'LimitX',
        address : 'no-reply@limitx.com'
    };
    email.from = email.sender.name+' <'+email.sender.address+'>',
    email.to = data.to;
    return email;
};


// Export

module.exports = get_email;






