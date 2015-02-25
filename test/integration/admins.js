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

describe('admins', function(){

    /*
     * Temp data
     *
     */
    var tmp_data = {};
    var random = Date.now();
    var dataset = {};

    /*
     * Before all
     *
     */

    // Settings
    
    before(function(done){

        tmp_data = {};
        random = Date.now();
        dataset = {};

        // Set request urls
        config.service = 'admins';
        config.request = request(config.base_url);

        done();
    }); 

    // Create users

    before(function(done){

        require('./_create_user')(function(data){
            tmp_data.user = data;
            done();
        });

    }); 



    before(function(done){

        require('./_create_admin')(function(data){
            tmp_data.admin = data;
            done();
        });
        
        
    }); 
     
    // Create tokens for each user

    before(function(done){


        require('./_create_token')('user', tmp_data.user.user_data._id, function(data){
            tmp_data.user.token = data;
            done();
        });          

        
    }); 
 

    before(function(done){

        require('./_create_token')('admin', tmp_data.admin.user_data._id, function(data){
            tmp_data.admin.token = data;
            done();
        });              

        
    });   



    /*
     * POST
     *
     */

    describe('POST', function(){   

        it('should return 403', function(done){
        config.request
            .post(config.service)
            .set(config.valid_headers)
            .expect(valid_response)
            .expect(403)
            .end(done);
        });

    });

    /*
     * GET
     *
     */


    describe('GET', function(){

        it('should return 401 if no admin token is supplied', function(done){
        config.request
            .get(config.service)
            .set(config.valid_headers)
            .expect(valid_response)
            .expect(401)
            .end(done);
        });

        it('should return 401 if token supplied is not for admin', function(done){
        config.request
            .get(config.service)
            .set(config.valid_headers)
            .set(config.valid_token('user', tmp_data))
            .expect(valid_response)
            .expect(401)
            .end(done);
        });

        it('should return 401 if token supplied is not for admin', function(done){
        config.request
            .get(config.service)
            .set(config.valid_headers)
            .set(config.valid_token('user', tmp_data))
            .expect(valid_response)
            .expect(401)
            .end(done);
        });

        it('should return 404 if admin token is supplied but no admin id is specified', function(done){
        config.request
            .get(config.service)
            .set(config.valid_headers)
            .set(config.valid_token('admin', tmp_data))
            .expect(valid_response)
            .expect(404)
            .end(done);
        });

        it('should return 404 if admin token is supplied, admin id is supplied, but admin id does not exist', function(done){
        config.request
            .get(config.service)
            .set(config.valid_headers)
            .set(config.valid_token('admin', tmp_data))
            .query({ _id: 'xxx' })
            .expect(valid_response)
            .expect(404)
            .end(done);
        });

        it('should return 200 and admin data if admin token is supplied and valid admin id is supplied', function(done){

        config.request
            .get(config.service)
            .set(config.valid_headers)
            .set(config.valid_token('admin', tmp_data))
            .query({_id: tmp_data.admin.user_data._id.toString()})
            .expect(valid_response)
            .expect(function(res){
                should.exist(res.body.body);
                data = res.body.body;
                data.should.be.an.Object;
                should.exist(data._id);
            })
            .expect(200)
            .end(done);
        });

    });



         
    /*
     * PUT
     *
     */

    describe('PUT', function(){

        it('should return 403', function(done){
        config.request
            .put(config.service)
            .set(config.valid_headers)
            .expect(valid_response)
            .expect(403)
            .end(done);
        });

    });


    /*
     * DELETE
     *
     */

    describe('DELETE', function(){

        it('should return 403', function(done){
        config.request
            .del(config.service)
            .set(config.valid_headers)
            .expect(valid_response)
            .expect(403)
            .end(done);
        });

    });



    /*
     * After all
     *
     */
     
    after(function(done){

        // Delete the created users 
        model.users.delete({_id : tmp_data.user.user_data._id}, function(){});
        model.admins.delete({_id : tmp_data.admin.user_data._id}, function(){});
        
        // Delete the created tokens
        model.auth.tokens.delete({_id : tmp_data.user.token._id}, function(){});
        model.auth.tokens.delete({_id : tmp_data.admin.token._id}, function(){});

        done();

    });

});


