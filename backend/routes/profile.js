var express = require('express');
var router = express.Router();
var Profile = require('../models/Profile');

router.get('/list', function(req, res, next) {
   Profile.findAll()
   .then(function(profiles){
      res.json(profiles);
   }).error(function(err){
      res.status(500).json(err);
   })
});

module.exports = router;
