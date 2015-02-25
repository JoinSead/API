/*
 * Admin Model
 *
 */

// Dependencies
var express = require('express');
var mongoose = require('mongoose');
var random_string = require('random-string');

// Create export object
var model = {};


// Get 
model.get = function(criteria, projection, callback){
    var response = false;
    criteria = typeof(criteria) !== 'undefined' ? criteria : {};
    projection = typeof(projection) !== 'undefined' ? projection : {};
    var resource = mongoose.model('admins');
    resource.find(criteria, projection, function (err, docs) {
      if(!err){
        response = docs;
      }
      callback(response);
    });
};

// post
model.post = function(dataset, callback){
    var model = mongoose.model('admins');
    var instance = new model();
    instance.created_timestamp = Date.now();
    instance = api.utilities.combine_objects_recursive(dataset, instance);
    instance.save(function (err, saved) {
        var response = false;
        if(!err && saved){
             response = saved;
        }
        callback(response);
    });
};

// Put 
model.put = function(id, dataset, callback){
    var model = mongoose.model('admins');
    model.findByIdAndUpdate(id, dataset, function (err, docs) {
        var response = false;
        if(!err && docs){
            response = docs;
        }
        callback(response);
    });
};

// Delete
model.delete = function(dataset, callback){
    var model = mongoose.model('admins');
    if(typeof(dataset._id) !== 'undefined'){
      model.findByIdAndRemove(dataset._id, function(){
        callback(true);
      });
    } else {
      callback(false);
    }
};



// Export
module.exports = model;