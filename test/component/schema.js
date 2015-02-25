var should = require('should');
var app = require('./../../app');
var mongoose = require('mongoose');
var tmp = false;

describe('schema:mongodb', function(){

    describe('ips', function(){

        it('Should create a ips schema with particular characteristics', function(){
            var tmp = require('./../../schema/mongodb/ips');
            tmp.should.have.property('_id');
            tmp.should.have.property('ipv4_addr');
            tmp.should.have.property('ipv6_addr');
            tmp.should.have.property('white_list');
            tmp.should.have.property('black_list');
        });

        it('Should register a mongoose model named ips', function(){
            (function(){
              model = mongoose.model('ips');
            }).should.not.throw();
        });

    });



});
