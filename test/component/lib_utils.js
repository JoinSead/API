var should = require('should');
var app = require('./../../app');

describe('utilities', function(){


    describe('.conditional_next', function(){

        it('Should call next without error if is_complete returns falsey', function(){
            api.utilities.conditional_next({}, function(err){
                should.not.exist(err);
            });     
        });

        it('Should call next with error if is_complete returns truthy', function(){
            var tmp = {
                response_data : {
                    head : {
                        complete : true
                    }
                }
            };
            api.utilities.conditional_next(tmp, function(err){
                err.should.be.ok;
            });     
        });

    });

    describe('.validate_client_id', function(){


    });

    describe('.validate_token', function(){


    });

    describe('.output_cache', function(){


    });

    describe('.check_ip_blacklist', function(){


    });

    describe('.validate_headers.http_version', function(){


    });

    describe('.validate_headers.accept_type', function(){


    });

    describe('.validate_headers.http_method', function(){


    });

    describe('.health_check.mongodb', function(){


    });

    describe('.health_check.redis', function(){


    });

    describe('.health_check.rabbitmq', function(){


    });

    describe('.health_check.server_load', function(){


    });

    describe('.health_check.memory', function(){


    });


});
