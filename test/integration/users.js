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

describe('users', function(){

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
     
    before(function(done){

        tmp_data = {};
        random = Date.now();
        dataset = {};

        // Set request urls
        config.service = 'users';
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

        require('./_create_user')(function(data){
            tmp_data.user_alt = data;
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


        require('./_create_token')('user', tmp_data.user_alt.user_data._id, function(data){
            tmp_data.user_alt.token = data;
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

        it('should return 400 if no data is passed for the new user', function(done){
        config.request
            .post(config.service)
            .set(config.valid_headers)
            .expect(valid_response)
            .expect(400)
            .end(done);
        });

        it('should return 400 if full name missing ', function(done){
        config.request
            .post(config.service)
            .set(config.valid_headers)
            .send({
                username : 'create_user'+random+'@malcolmdiggs.com',
                agree_terms : true
            })
            .expect(valid_response)
            .expect(400)
            .end(done);
        });


        it('should return 400 if agree_terms missing ', function(done){
        config.request
            .post(config.service)
            .set(config.valid_headers)
            .send({
                full_name : 'Test user',
                username : 'create_user'+random+'@malcolmdiggs.com',
            })
            .expect(valid_response)
            .expect(400)
            .end(done);
        });

        it('should return 400 if agree_terms false ', function(done){
        config.request
            .post(config.service)
            .set(config.valid_headers)
            .send({
                full_name : 'Test user',
                username : 'create_user_'+random+'@malcolmdiggs.com',
                agree_terms : false
            })
            .expect(valid_response)
            .expect(400)
            .end(done);
        });

        it('should return 400 if email missing ', function(done){
        config.request
            .post(config.service)
            .set(config.valid_headers)
            .send({
                full_name : 'Test user',
                agree_terms : true
            })
            .expect(valid_response)
            .expect(400)
            .end(done);
        });

        it('should return 400 if email already in use ', function(done){
        config.request
            .post(config.service)
            .set(config.valid_headers)
            .send({
                full_name : 'Test user',
                username : tmp_data.user.username,
                agree_terms : true
            })
            .expect(valid_response)
            .expect(400)
            .end(done);
        });

        it('should return 200 and new user data if all fields are specified and valid', function(done){
        config.request
            .post(config.service)
            .set(config.valid_headers)
            .send({
                full_name : 'Test user',
                username : 'create_user_'+random+'@malcolmdiggs.com',
                agree_terms : true
            })
            .expect(valid_response)
            .expect(function(res){
                should.exist(res.body.body);
                data = res.body.body;
                tmp_data.created_user = data;
                data.should.be.an.Object;
                data.token.should.be.an.Object;
                data.user.should.be.an.Object;
                should.exist(data.user._id);

            })
            .expect(200)
            .end(done);
        });

    });

    /*
     * GET
     *
     */


    describe('GET', function(){

        it('should return 404 if no user id is sent', function(done){
        config.request
            .get(config.service)
            .set(config.valid_headers)
            .expect(valid_response)
            .expect(404)
            .end(done);
        });

        it('should return 404 if invalid user id is sent', function(done){
        config.request
            .get(config.service)
            .set(config.valid_headers)
            .query({_id : 'xxx'})
            .expect(valid_response)
            .expect(404)
            .end(done);
        });

        it('should return 200 and user data if valid user id is sent', function(done){
        config.request
            .get(config.service)
            .set(config.valid_headers)
            .query({_id : tmp_data.user.user_data._id.toString()})
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

        it('should not return sensitive user fields for anonymous requests', function(done){
        config.request
            .get(config.service)
            .set(config.valid_headers)
            .query({_id : tmp_data.user.user_data._id.toString()})
            .expect(valid_response)
            .expect(function(res){
                should.exist(res.body.body);
                var data = res.body.body;
                data.should.be.an.Object;
                should.exist(data._id);
                should.exist(data.projects);
                should.exist(data.checkouts);
                should.exist(data.library_items);  
                should.not.exist(data.email);
                should.not.exist(data.password_hash);
                should.not.exist(data.terms_agreement_timestamp);  
                should.not.exist(data.billing_profiles);   
                should.not.exist(data.transactions);    
                should.not.exist(data.relationships);  
                should.not.exist(data.messages_sent);      
                should.not.exist(data.messages_received);  
            })
            .expect(200)
            .end(done);
        });


        it('should not return sensitive user fields for user requests when that user is not the user in question', function(done){
        config.request
            .get(config.service)
            .set(config.valid_headers)
            .query({_id : tmp_data.user_alt.user_data._id.toString()})
            .set(config.valid_token('user', tmp_data))
            .expect(valid_response)
            .expect(function(res){
                should.exist(res.body.body);
                var data = res.body.body;
                data.should.be.an.Object;
                should.exist(data._id);
                should.exist(data.projects);
                should.exist(data.checkouts);
                should.exist(data.library_items);  
                should.not.exist(data.email);
                should.not.exist(data.password_hash);
                should.not.exist(data.terms_agreement_timestamp);  
                should.not.exist(data.billing_profiles);   
                should.not.exist(data.transactions);    
                should.not.exist(data.relationships);  
                should.not.exist(data.messages_sent);      
                should.not.exist(data.messages_received); 
            })
            .expect(200)
            .end(done);
        });

        it('should return most sensitive user fields for user requests when that user is the user in question', function(done){
        config.request
            .get(config.service)
            .set(config.valid_headers)
            .query({_id : tmp_data.user.user_data._id.toString()})
            .set(config.valid_token('user', tmp_data))
            .expect(valid_response)
            .expect(function(res){
                should.exist(res.body.body);
                var data = res.body.body;
                data.should.be.an.Object;
                should.exist(data._id);
                should.exist(data.email); 
                should.not.exist(data.password_hash);
                should.exist(data.terms_agreement_timestamp);  
                should.exist(data.billing_profiles);   
                should.exist(data.transactions);     
                should.exist(data.relationships);  
                should.exist(data.messages_sent);      
                should.exist(data.messages_received);  
                should.exist(data.projects);  
                should.exist(data.library_items);
                should.exist(data.checkouts);    
            })
            .expect(200)
            .end(done);
        });


        it('should return most sensitive user fields for admin requests', function(done){
        config.request
            .get(config.service)
            .set(config.valid_headers)
            .query({_id : tmp_data.user.user_data._id.toString()})
            .set(config.valid_token('admin', tmp_data))
            .expect(valid_response)
            .expect(function(res){
                should.exist(res.body.body);
                var data = res.body.body;
                data.should.be.an.Object;
                should.exist(data._id);
                should.exist(data.email); 
                should.not.exist(data.password_hash);
                should.exist(data.terms_agreement_timestamp);  
                should.exist(data.billing_profiles);   
                should.exist(data.transactions);     
                should.exist(data.relationships);  
                should.exist(data.messages_sent);      
                should.exist(data.messages_received);  
                should.exist(data.projects);  
                should.exist(data.library_items);
                should.exist(data.checkouts);   
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

        it('should return 401 for unauthenticated requests', function(done){
        config.request
            .put(config.service)
            .set(config.valid_headers)
            .expect(valid_response)
            .expect(401)
            .end(done);
        });

        it('should return 401 for user requests if the requester is not the user in question', function(done){
        config.request
            .put(config.service)
            .set(config.valid_headers)
            .set(config.valid_token('user', tmp_data))
            .send({
                _id: tmp_data.user_alt.user_data._id.toString(),
                name_first : 'put_test_fn_'+random,
                name_last : 'put_test_ln_'+random
            })
            .expect(valid_response)
            .expect(401)
            .end(done);
        });

        it('should return 400 if no id is specified', function(done){
        config.request
            .put(config.service)
            .set(config.valid_headers)
            .set(config.valid_token('admin', tmp_data))
            .send({
                name_first : 'put_test_fn_'+random,
                name_last : 'put_test_ln_'+random
            })
            .expect(valid_response)
            .expect(400)
            .end(done);
        });

        it('should return 404 if the id specified does not exist', function(done){
        config.request
            .put(config.service)
            .set(config.valid_headers)
            .set(config.valid_token('admin', tmp_data))
            .send({
                _id: 'xxx',
                name_first : 'put_test_fn_'+random,
                name_last : 'put_test_ln_'+random
            })
            .expect(valid_response)
            .expect(404)
            .end(done);
        });


        it('should return 200 and updated data if requester matched the user in question', function(done){
        config.request
            .put(config.service)
            .set(config.valid_headers)
            .set(config.valid_token('user', tmp_data))
            .send({
                _id: tmp_data.user.user_data._id.toString(),
                name_first : 'put_test_fn_'+random,
                name_last : 'put_test_ln_'+random
            })
            .expect(valid_response)
            .expect(function(res){
                res.body.body.should.be.an.Object;
                var user = res.body.body;
                user.name_first.should.eql('put_test_fn_'+random);
                user.name_last.should.eql('put_test_ln_'+random);
            })
            .expect(200)
            .end(done);
        });

        it('should return 200 and updated data for admin requests', function(done){
        config.request
            .put(config.service)
            .set(config.valid_headers)
            .set(config.valid_token('admin', tmp_data))
            .send({
                _id: tmp_data.user.user_data._id.toString(),
                name_first : 'put_test_fn_'+random+'1',
                name_last : 'put_test_ln_'+random+'1'
            })
            .expect(function(res){
                res.body.body.should.be.an.Object;
                var user = res.body.body;
                user.name_first.should.eql('put_test_fn_'+random+'1');
                user.name_last.should.eql('put_test_ln_'+random+'1');
            })
            .expect(valid_response)
            .expect(200)
            .end(done);
        });

    });


    /*
     * DELETE
     *
     */

    describe('DELETE', function(){

        it('should return 401 if no token is present', function(done){
        config.request
            .del(config.service)
            .set(config.valid_headers)
            .send({
                _id: tmp_data.user.user_data._id.toString()

            })
            .expect(valid_response)
            .expect(401)
            .end(done);
        });

        it('should return 401 if token is for user other than the one specified', function(done){
        config.request
            .del(config.service)
            .set(config.valid_headers)
            .set(config.valid_token('user', tmp_data))
            .send({
                _id: tmp_data.user_alt.user_data._id.toString()

            })
            .expect(valid_response)
            .expect(401)
            .end(done);
        });

        it('should return 400 if no payload is sent', function(done){
        config.request
            .del(config.service)
            .set(config.valid_headers)
            .set(config.valid_token('admin', tmp_data))
            .expect(valid_response)
            .expect(400)
            .end(done);
        });

        it('should return 400 if no user id is specified', function(done){
        config.request
            .del(config.service)
            .set(config.valid_headers)
            .set(config.valid_token('admin', tmp_data))
            .send({
                foo: 'bar'

            })
            .expect(valid_response)
            .expect(400)
            .end(done);
        });

        it('should return 200 if token is for admin and user id is specified', function(done){
        config.request
            .del(config.service)
            .set(config.valid_headers)
            .set(config.valid_token('admin', tmp_data))
            .send({
                _id: tmp_data.user_alt.user_data._id.toString()

            })
            .expect(valid_response)
            .expect(200)
            .end(done);
        });

        it('should return 200 if token is for admin even if user has already been deleted', function(done){
        config.request
            .del(config.service)
            .set(config.valid_headers)
            .set(config.valid_token('admin', tmp_data))
            .send({
                _id: tmp_data.user_alt.user_data._id.toString()

            })
            .expect(valid_response)
            .expect(200)
            .end(done);
        });


        it('should return 200 if token is for admin and user does not exist', function(done){
        config.request
            .del(config.service)
            .set(config.valid_headers)
            .set(config.valid_token('admin', tmp_data))
            .send({
                _id: 'xxx'
            })
            .expect(valid_response)
            .expect(200)
            .end(done);
        });


        it('should return 400 if any of the ramifications are not agreed to but the user is correct for user in question', function(done){
        config.request
            .del(config.service)
            .set(config.valid_headers)
            .set(config.valid_token('user', tmp_data))
            .send({
                _id: tmp_data.user.user_data._id.toString(),
                password_hash : tmp_data.user.user_data.password_hash,
                ramification_1 : true,
                ramification_2 : false,
                ramification_3 : true,
                ramification_4 : true,
                ramification_5 : true

            })
            .expect(valid_response)
            .expect(400)
            .end(done);
        });

        it('should return 400 if password is wrong but the user is correct for user in question', function(done){
        config.request
            .del(config.service)
            .set(config.valid_headers)
            .set(config.valid_token('user', tmp_data))
            .send({
                _id: tmp_data.user.user_data._id.toString(),
                password_hash : tmp_data.user.user_data.password_hash+'1',
                ramification_1 : true,
                ramification_2 : true,
                ramification_3 : true,
                ramification_4 : true,
                ramification_5 : true

            })
            .expect(valid_response)
            .expect(400)
            .end(done);
        });

        it('should return 200 if token is for user in question and all fields are correct', function(done){
        config.request
            .del(config.service)
            .set(config.valid_headers)
            .set(config.valid_token('user', tmp_data))
            .send({
                _id: tmp_data.user.user_data._id.toString(),
                password_hash : tmp_data.user.user_data.password_hash,
                ramification_1 : true,
                ramification_2 : true,
                ramification_3 : true,
                ramification_4 : true,
                ramification_5 : true
            })
            .expect(valid_response)
            .expect(200)
            .end(done);
        });

        it('should return 404 when trying to fetch the user that was deleted', function(done){
        config.request
            .get(config.service)
            .set(config.valid_headers)
            .query({
                _id : tmp_data.user.user_data._id.toString(),
                caching : false
            })
            .expect(valid_response)
            .expect(404)
            .end(done);
        });

        it('should still return 200 and user data for user that was not deleted', function(done){
        config.request
            .get(config.service)
            .set(config.valid_headers)
            .query({
                _id : tmp_data.created_user.user._id.toString(),
                caching : false
            })
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
     * After all
     *
     */
     
    after(function(done){

        // Delete the created users 
        model.users.delete({_id : tmp_data.created_user.user._id}, function(){});
        model.admins.delete({_id : tmp_data.admin.user_data._id}, function(){});        

        // Delete the created tokens
        model.auth.tokens.delete({_id : tmp_data.user.token._id}, function(){});
        model.auth.tokens.delete({_id : tmp_data.admin.token._id}, function(){});

        done();

    }); 

});


