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

    email.subject = 'Your LimitX Pro password has changed';
    var source = 'Hi {{name_first}},\n'
    +'\n'
    +'This is a notice to inform you that someone has recently changed your password on the LimitX platform.\n'
    +'If you did not authorize this password change, please contact us immediately at support@limitx.com..\n'
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




