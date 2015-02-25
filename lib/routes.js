/*
 * Routing table
 *
 */

 // Dependencies
var express = require('express');
var router = express.Router();

// Set controllers directory
var dir = '../controllers/';

// System
router.use('/system/health', require(dir+'system_health'));
router.use('/system/status', require(dir+'system_status'));

// Users
router.use('/users', require(dir+'users'));
router.use('/admins', require(dir+'admins'));

// Flags
router.use('/flags', require(dir+'flags'));


// 404 handler
router.use(function(req, res){
    api.errors._404(req, res);
});


// Export
module.exports = router;
