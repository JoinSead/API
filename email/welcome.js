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

    email.subject = 'Confirm your LimitX Pro email address!';
    var source = 'Hi {{name_first}},\n'
    +'\n'
    +'Thank you for joining LimitX Pro! We strive to offer the best sport platform to help you manage your clients, sport activities and get easily found online.\n'
    +'Please take an instant to verify your email address in order to access all the features of LimitX by clicking on the link below:\n'
    +'\n'
    +api.config.urls.pro+'cp/confirm_email/{{email.confirmation_id}}\n'
    +'\n'
    +'We are constantly adding new features and we are always happy to get your feedback and listen to your needs. Don’t hesitate to contact us at support@limitx.com for any questions you might have!\n'
    +'\n'
    +'Thanks again,\n'
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






