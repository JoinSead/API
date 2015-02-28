/*
 * Text for password-changed email
 *
 */


// Config
var express = require('express');
var Handlebars = require('handlebars');
var app  = require('./../app');


// Compose email
var get_email = function(data){
    var email = {};

    email.subject = 'Your password has changed';
    var source = 'Hi {{name_first}},\n'
    +'\n'
    +'This is a notice to inform you that someone has recently changed your '+api.config.site_name+' password.\n'
    +'If you did not authorize this password change, please contact us immediately by replying to this email.\n'
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




