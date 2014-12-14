/*
 * Background Workers
 *
 */

// Create export object
var workers = {};

// Send an email from the outgoing mail-queue
workers.send_email = function(mail_data){
    if(typeof(mail_data) !== 'undefined'){
        var mailgun = require('mailgun-js')({
            apiKey: api.config.mailgun.api_key,
            domain: api.config.mailgun.domain
        });
        mailgun.messages().send(mail_data, function (error, body) {});
    }
};



// Export
module.exports = workers;