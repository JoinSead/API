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

    email.subject = 'Confirm your new email address!';
    var source = 'Hi {{name_first}},\n'
    +'\n'
    +'You have recently changed your email address on '++'.\n'
    +'Please take a moment to verify your new email address by clicking below:\n'
    +'\n'
    +api.config.urls.www+'dashboard/confirm_email/{{email.confirmation_id}}\n'
    +'\n'
    +'If you have any questions, please don’t hesitate to contact us by replying to this email.\n'
    +'\n'
    +'Thanks again,\n'
    +api.config.site_name;

    var template = Handlebars.compile(source);
    email.text = template(data);
    email.sender = {
        name : api.config.site_name,
        address : api.config.mailgun.default_sender
    };
    email.from = email.sender.name+' <'+email.sender.address+'>',
    email.to = data.to;
    return email;
};


// Export

module.exports = get_email;




