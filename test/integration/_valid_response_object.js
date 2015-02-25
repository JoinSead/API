/*
 * Dependencies
 *
 */

var request = require('supertest');
var should = require('should');


/*
 * Check if object is a valid response
 *
 */


var valid_response = function(res){
    res.body.head.should.be.an.Object;
    res.body.head.http_code.should.be.a.Number;
    res.body.head.http_message.should.be.a.String;
    res.body.head.current_api_version.should.be.a.String;
    res.body.head.resource.should.be.a.String;
    res.body.head.method.should.be.a.String;
    res.body.head.rate_limits.should.be.an.Array;
    should.exist(res.body.head.request_hash);
    should.exist(res.body.head.response_from_cache);
    res.body.head.credentials.should.be.an.Object;
    res.body.head.credentials.client_key.should.be.an.Object;
    should.exist(res.body.head.credentials.client_key.code);
    should.exist(res.body.head.credentials.client_key.is_valid);
    res.body.head.credentials.access_token.should.be.an.Object;
    should.exist(res.body.head.credentials.access_token.code);
    should.exist(res.body.head.credentials.access_token.user_id);
    should.exist(res.body.head.credentials.access_token.user_type);
    should.exist(res.body.head.credentials.access_token.is_valid);
    res.body.head.credentials.access_token.expires_in.should.be.a.Number;
    res.body.head.times.should.be.an.Object;
    res.body.head.times.receipt.should.be.a.Number;
    res.body.head.times.response.should.be.a.Number;
    res.body.head.times.elapsed.should.be.a.Number;
    res.body.head.messages.should.be.an.Object;
    res.body.head.messages.errors.should.be.an.Array;
    res.body.head.messages.warnings.should.be.an.Array;
    res.body.head.messages.notices.should.be.an.Array;
    res.body.head.messages.info.should.be.an.Array;
    res.body.body.should.be.an.Object;
};


/*
 * Export
 *
 */

module.exports = valid_response;



