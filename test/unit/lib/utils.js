var should = require('should');
var app = require('./../../../app');

describe('utilities', function(){

    describe('.complete', function(){

        it('Should throw exception if called without response_data.head being set in res object', function(){
            (function(){
              api.utilities.complete({});
            }).should.throw();
        });

        it('Should not throw exception if called with response_data.head being set in res object', function(){
            var tmp = {
                response_data : {
                    head : {}
                }
            };
            (function(){
                api.utilities.complete(tmp).should.not.throw();
            });
        });

        it('Should set res.response_data.head.complete to true', function(){
            var tmp = {
                response_data : {
                    head : {}
                }
            };
            api.utilities.complete(tmp);
            tmp.response_data.head.complete.should.be.true;         
        });

    });

    describe('.is_complete', function(){

        it('Should return false if res.response_data.head.complete is not defined', function(){
            var data = api.utilities.is_complete();
            data.should.not.be.ok;         
        });

        it('Should return false if res.response_data.head.complete is falsey', function(){
            var tmp = {
                response_data : {
                    head : {
                        complete : false
                    }
                }
            };
            var data = api.utilities.is_complete(tmp);
            data.should.not.be.ok;         
        });

        it('Should return true if res.response_data.head.complete is truthy', function(){
            var tmp = {
                response_data : {
                    head : {
                        complete : true
                    }
                }
            };
            var data = api.utilities.is_complete(tmp);
            data.should.be.ok;         
        });

    });

    describe('.initial_response_data', function(){

        it('Should return false if neither req nor res objects are passed', function(){
            var response = api.utilities.initial_response_data(undefined, undefined);
            response.should.not.be.ok;
        });

        it('Should return false if req object is not passed', function(){
            var response = api.utilities.initial_response_data(undefined, {});
            response.should.not.be.ok;
        });

        it('Should return false if res object is not passed', function(){
            var response = api.utilities.initial_response_data({}, undefined);
            response.should.not.be.ok;
        });

        it('Should return true if both objects are passed', function(){
            var response = api.utilities.initial_response_data({}, {});
            response.should.be.ok;
        });

        it('Should return true if both objects are passed', function(){
            var response = api.utilities.initial_response_data({}, {});
            response.should.be.ok;
        });

        it('Should modify the passed res object, adding a response_data object to it', function(){
            var tmp = {};
            api.utilities.initial_response_data({}, tmp);
            tmp.should.have.property('response_data').an.Object;

        });

        it('Should fill response object with 3 child objects "settings", "head", and "body"', function(){
            var tmp = {};
            api.utilities.initial_response_data({}, tmp);
            var data = tmp.response_data;
            var n = Object.keys(data).length;
            n.should.eql(3);
            data.should.have.property('settings').an.Object;
            data.should.have.property('head').an.Object;
            data.should.have.property('body').an.Object;

        });

        it('Should fill response_data.settings with specific attributes', function(){
            var tmp = {};
            api.utilities.initial_response_data({}, tmp);
            var settings = tmp.response_data.settings;
            settings.should.have.property('verbose').a.Boolean;
            settings.should.have.property('caching').a.Boolean;
            settings.should.have.property('jsonp').a.Boolean;
            settings.should.have.property('complete').a.Boolean;
        });

        it('Should fill response_data.head with specific attributes', function(){
            var tmp = {};
            api.utilities.initial_response_data({}, tmp);
            var head = tmp.response_data.head;
            head.should.have.property('http_code').a.Number;
            head.should.have.property('http_message').a.String;
            head.should.have.property('current_api_version').a.String;
            should.exist(head.resource);
            should.exist(head.method);
            head.should.have.property('rate_limits').an.Array;
            should.exist(head.request_hash);
            head.should.have.property('response_from_cache').a.Boolean;
            head.should.have.property('credentials').an.Object;
            head.should.have.propertyByPath('credentials','client_key').an.Object;
            should.exist(head.credentials.client_key.code);
            head.should.have.propertyByPath('credentials','client_key', 'is_valid').a.Boolean;
            head.should.have.propertyByPath('credentials','access_token').an.Object;
            should.exist(head.credentials.access_token.code);
            should.exist(head.credentials.access_token.user_id);
            should.exist(head.credentials.access_token.user_type);
            head.should.have.propertyByPath('credentials','access_token', 'is_valid').a.Boolean;
            head.should.have.propertyByPath('credentials','access_token', 'expires_in').a.Number;
            head.should.have.property('times').an.Object;
            head.should.have.propertyByPath('times','receipt').a.Number;
            head.should.have.propertyByPath('times','response').a.Number;
            head.should.have.propertyByPath('times','elapsed').a.Number;
            head.should.have.property('messages').an.Object;
            head.should.have.propertyByPath('messages','errors').an.Array;
            head.should.have.propertyByPath('messages','warnings').an.Array;
            head.should.have.propertyByPath('messages','notices').an.Array;
            head.should.have.propertyByPath('messages','info').an.Array;
        });

        it('Should set response_data.body as an empty object', function(){
            var tmp = {};
            api.utilities.initial_response_data({}, tmp);
            var body = tmp.response_data.body;
            body.should.be.an.Object;
            body.should.be.empty;

        });

    });

    describe('.validate_client_id', function(){

        it('Should throw exception if called without response_data.head being set in res object', function(){
            (function(){
              api.utilities.complete({});
            }).should.throw();
        });

        it('Should not throw exception if called with response_data.head being set in res object', function(){
            var tmp = {
                response_data : {
                    head : {}
                }
            };
            (function(){
                api.utilities.complete(tmp).should.not.throw();
            });
        });

        it('Should set res.response_data.head.complete to true', function(){
            var tmp = {
                response_data : {
                    head : {}
                }
            };
            api.utilities.complete(tmp);
            tmp.response_data.head.complete.should.be.true;         
        });

    });

    describe('.check_verbose', function(){


    });

    describe('.check_jsonp', function(){


    });

    describe('.check_caching', function(){


    });

    describe('.generate_request_hash', function(){


    });

    describe('.log', function(){


    });

    describe('.validate_email', function(){


    });


});
