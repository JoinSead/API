/*
 * Auth Model
 *
 */

// Dependencies
var express = require('express');
var mongoose = require('mongoose');
var random_string = require('random-string');

// Create export object
var model = {};

/* 
 * token related functions
 *
 */
model.tokens = {};


// Post 
model.tokens.post = function(dataset, req, callback){
    var model = mongoose.model('tokens');
    var instance = new model();
    instance.ipv4_addr = req.ip;
    instance.issued = Date.now();
    instance.expires = instance.issued + (60 * 60 * 1000);
    instance = api.utilities.combine_objects_recursive(dataset, instance);
    instance.save(function (err, saved) {
        var response = false;
        if(!err && saved){
            response = saved;
        }
        callback(response);
    });
};

// Get 
model.tokens.get = function(criteria, projection, callback){
    var model = mongoose.model('tokens');
    model.find(criteria, projection, function (err, docs) {
        var response = false;
        if(!err && docs){
            response = docs;
        }
        callback(response);
    });
};

// Put 
model.tokens.put = function(id, dataset, callback){
    var model = mongoose.model('tokens');
    model.findByIdAndUpdate(id, dataset, function (err, docs) {
        var response = false;
        if(!err && docs){
            response = docs;
        }
        callback(response);
    });
};
// Delete 
model.tokens.delete = function(id, callback){
    var model = mongoose.model('tokens');
    model.findByIdAndRemove(id, function(err, docs){
    var response = false;
        if(!err){
            response = true;
        }
        callback(response);
    });
};


/* 
 * Reset related functions
 *
 */
model.resets = {};


// Post 
model.resets.post = function(dataset, callback){
    var model = mongoose.model('resets');
    var instance = new model();
    instance.issued = Date.now();
    instance.expires = instance.issued + (48 * 60 * 60 * 1000);
    instance.url = random_string({length: 35});
    instance = api.utilities.combine_objects_recursive(dataset, instance);
    instance.save(function (err, saved) {
        var response = false;
        if(!err && saved){
            response = saved;
        }
        callback(response);
    });
};

// Get 
model.resets.get = function(criteria, projection, populate, callback){
    var model = mongoose.model('resets');
    var response = false;
    populate = typeof(populate) !== 'undefined' && populate ? true : false;
    if(populate){
        model.find(criteria, projection)
        .populate('tokens')
        .exec(function (err, docs) {
            response = false;
            if(!err && docs){
                response = docs;
            }
            callback(response);
        });
    } else {
        model.find(criteria, projection, function (err, docs) {
            response = false;
            if(!err && docs){
                response = docs;
            }
            callback(response);
        });
    }
    

};

// Put 
model.resets.put = function(id, dataset, callback){
    var model = mongoose.model('resets');
    model.findByIdAndUpdate(id, dataset, function (err, docs) {
        var response = false;
        if(!err && docs){
            response = docs;
        }
        callback(response);
    });
};

// Delete 
model.resets.delete = function(id, callback){
    var model = mongoose.model('resets');
    var response = false;
    if(id == 'all'){
        model.remove(function(err){
            response = false;
            if(!err){
                response = true;
            }
            callback(response);
        });
    } else {
        model.findByIdAndRemove(id, function(err){
            response = false;
            if(!err){
                response = true;
            }
            callback(response);
        });      
    }

};


/* 
 * ip related functions
 *
 */
model.ips = {};


// Create an ip
model.ips.post = function(dataset, callback){
    var model = mongoose.model('ips');
    var instance = new model();
    instance = api.utilities.combine_objects_recursive(dataset, instance);
    instance.save(function (err, saved) {
        var response = false;
        if(!err && saved){
            response = saved;
        }
        callback(response);
    });
};


// Get 
model.ips.get = function(criteria, projection, callback){
    var model = mongoose.model('ips');
    model.find(criteria, projection, function (err, docs) {
        var response = false;
        if(!err && docs){
            response = docs;
        }
        callback(response);
    });
};

// Put 
model.ips.put = function(id, dataset, callback){
    var model = mongoose.model('ips');
    model.findByIdAndUpdate(id, dataset, function (err, docs) {
        var response = false;
        if(!err && docs){
            response = docs;
        }
        callback(response);
    });
};

// Delete 
model.ips.delete = function(ip, callback){
    var model = mongoose.model('ips');
    model.findOneAndRemove({ipv4_addr:ip}, function(err, docs){
    var response = false;
        if(!err){
            response = true;
        }
        callback(response);
    });
};


// Export
module.exports = model;