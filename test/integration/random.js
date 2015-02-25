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

describe('{random}', function(){

    /*
     * Before all
     *
     */

    before(function(done){
        // Set request urls
        config.service = Date.now();
        config.request = request(config.base_url);
        done();
    });  


    /*
     * POST
     *
     */

    describe('POST', function(){
        it('should not be found', function(done){
        config.request
            .post(config.service)
            .set(config.valid_headers)
            .expect(valid_response)
            .expect(404)
            .end(done);
        });
    });

    /*
     * GET
     *
     */

    describe('GET', function(){
        it('should not be found', function(done){
        config.request
            .get(config.service)
            .set(config.valid_headers)
            .expect(valid_response)
            .expect(404)
            .end(done);
        });
    });

         
    /*
     * PUT
     *
     */

    describe('PUT', function(){
        it('should not be found', function(done){
        config.request
            .put(config.service)
            .set(config.valid_headers)
            .expect(valid_response)
            .expect(404)
            .end(done);
        });
    });


    /*
     * DELETE
     *
     */

    describe('DELETE', function(){
        it('should not be found', function(done){
        config.request
            .del(config.service)
            .set(config.valid_headers)
            .expect(valid_response)
            .expect(404)
            .end(done);
        });
    });

});



