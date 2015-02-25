/*
 * Dependencies
 *
 */

var request = require('supertest');
var config = require('./_config');
var valid_response = require('./_valid_response_object');
var should = require('should');
var app = require('./../../app');


/*
 * Tests
 *
 */

describe('{all}', function(){

    /*
     * Before all
     *
     */
    before(function(done){
        // Set request urls
        config.service = '*';
        config.request = request(config.base_url);
        done();
    });  


    /*
     * Tests
     *
     */

    it('should return 202 if OPTIONS is sent', function(done){
    config.request
        .options(config.service)
        .expect(valid_response)
        .expect(202)
        .end(done);
    });

    it('should return 405 if HEAD is sent', function(done){
    config.request
        .head(config.service)
        .expect(405)
        .end(done);
    });

    it('should return 405 if TRACE is sent', function(done){
    config.request
        .trace(config.service)
        .expect(405)
        .end(done);
    });

    it('should return 406 if accept-type is incorrect', function(done){
    config.request
        .get(config.service)
        .set('Accept', 'xxx')
        .expect(valid_response)
        .expect(406)
        .end(done);
    });

    it('should return 400 if client id is missing', function(done){
    config.request
        .get(config.service)
        .set('Accept', 'application/json')
        .expect(valid_response)
        .expect(400)
        .end(done);
    });

    it('should return 400 if client id is incorrect', function(done){
    config.request
        .get(config.service)
        .set('Accept', 'application/json')
        .set('client_key', 'xxx')
        .expect(valid_response)
        .expect(400)
        .end(done);
    });

    it('should be verbose if verbose is true', function(done){
    config.request
        .get(config.service)
        .set('Accept', 'application/json')
        .set('client_key', app.api.config.client_keys[0])
        .set('verbose', true)
        .expect(valid_response)
        .end(done);
    });

    it('should be concise if verbose is false', function(done){
    config.request
        .get(config.service)
        .set('Accept', 'application/json')
        .set('client_key', app.api.config.client_keys[0])
        .set('verbose', false)
        .expect({})
        .end(done);
    });

    it('should return a function if a callback is passed', function(done){
    config.request
        .get(config.service)
        .set('Accept', 'application/json')
        .set('client_key', app.api.config.client_keys[0])
        .query({callback: 'mycallback'})
        .expect(function(res){
            var tmp = (res.res.text);
            // @TODO is there a better way of parsing the returned text and checking for the existence of the function?
            if(tmp.indexOf("mycallback(") == -1){
                return 'no callback function found';
            }
        })
        .end(done);
    });

    it('should have a request hash if minimal headers provided', function(done){
    config.request
        .get(config.service)
        .set('Accept', 'application/json')
        .set('client_key', app.api.config.client_keys[0])
        .expect(function(res){
            res.body.head.request_hash.should.be.a.String;
        })
        .end(done);
    });


});



