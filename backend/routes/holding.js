var express = require('express');
var router = express.Router();
var Holding = require('../models/Holding');


router.get('/list', function(req, res, next) {
   Holding.findAll()
   .then(function(holdings){
      res.json(holdings);
   }).error(function(err){
      res.status(500).json(err);
   })
});

module.exports = router;
