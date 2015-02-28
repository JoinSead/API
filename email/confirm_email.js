/*
 * Text for confirm-email email
 *
 */


// Config
var express = require('express');
var Handlebars = require('handlebars');
var app  = require('./../app');


// Compose email
var get_email = function(data){
    var email = {};

    email.subject = 'Confirm your LimitX Pro email address!';
    var source = 'Hi {{name_first}},\n'
    +'\n'
    +'You have recently changed your email address on your LimitX platform.\n'
    +'Please take an instant to verify your new email address to continue enjoying all the features of LimitX by clicking on the link below:\n'
    +'\n'
    +api.config.urls.pro+'cp/confirm_email/{{email.confirmation_id}}\n'
    +'\n'
    +'If you have any questions, please don’t hesitate to email us at support@limitx.com.\n'
    +'\n'
    +'Thanks you!\n'
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




