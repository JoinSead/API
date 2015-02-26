var should = require('should');
var app = require('./../../app');
var mongoose = require('mongoose');
var tmp = false;

describe('schema:neo4j', function(){

    describe('relationsips', function(){

        it('Should create a relationsips schema with particular characteristics', function(){
            var tmp = require('./../../schema/neo4j/relationships');
            tmp.should.have.property('_id');
            tmp.should.have.property('user_1');
            tmp.should.have.property('user_2');
            tmp.should.have.property('type');
        });

        it('Should register a neo4j model named relationsips', function(){
            (function(){
              model = neo4j.model('relationsips');
            }).should.not.throw();
        });

    });


});
