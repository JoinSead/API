/*
 * Text for welcome email
 *
 */


// Config
var express = require('express');
var Handlebars = require('handlebars');
var app  = require('./../app');


// Compose email
var get_email = function(data){
    var email = {};

    email.subject = 'Confirm your email address!';
    var source = 'Hi {{name_first}},\n'
    +'\n'
    +'Thank you for joining! \n'
    +'Please follow the link below to confirm your email address\n'
    +'\n'
    +api.config.urls.www+'dashboard/confirm_email/{{email.confirmation_id}}\n'
    +'\n'
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






