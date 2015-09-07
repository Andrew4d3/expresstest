var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Holding = require('../models/Holding');
var Profile = require('../models/Profile');
var bcrypt = require('bcryptjs');
var Sequelize = require('sequelize');

/* GET users listing. */

//Validating session for specific actions
var isAuthenticated = function(req, res, next){
   if(req.session.authenticated){
      next();
   }
   else{
      res.status(403).json({msg:"User should be authenticated to perform this action"});
   }
};

// List all users
router.get('/list',isAuthenticated);
router.get('/list', function(req, res, next) {
   User.findAll({
      include: [Holding,Profile]
   })
   .then(function(users){
      res.json(users);
   }).error(function(err){
      console.log(err)
      res.status(500).json(err);
   })
});

// Create new user
router.post('/', function(req, res, next) {

   req.body.password = bcrypt.hashSync(req.body.password, 8);

   User.create(req.body)
   .then(function(result){
      res.json(result);
   }).catch(function(err){
      res.status(500).json(err);
   })

});

//Update an user
router.put('/',isAuthenticated);
router.put('/', function(req, res, next) {

   if(req.body.attributes.password){
      req.body.attributes.password = bcrypt.hashSync(req.body.attributes.password, 8);
   }

   User.update(req.body.attributes,{
      where: {
         id: req.body.id
      }})
   .then(function(result){
      res.json(result);
   }).catch(function(err){
      res.status(500).json(err);
   })

});

//Delete an user
router.delete('/:id',isAuthenticated);
router.delete('/:id', function(req, res, next) {

   if(req.session.userinfo.id == req.params.id){
      return res.json({error:"user_in_session"});
   }

   User.destroy({
      where: {
         id: req.params.id
      }})
   .then(function(result){
      res.json(result);
   }).catch(function(err){
      res.status(500).json(err);
   })

});


//Check session status
router.get('/session', function(req, res, next) {

   var session = req.session.authenticated ? req.session.authenticated : false;
   res.json({session:session});

});

//Start session
router.post('/login', function(req, res, next) {

   User.findOne({
      where: {
         email:req.body.email
      }
   })
   .then(function(found){
      if(!found){
         return res.json({msg:"not_exist"});
      }
      else{

         if(!bcrypt.compareSync(req.body.password,found.password)){
            return res.json({msg:"password_incorrect"});
         }

         req.session.authenticated = true,
         req.session.userinfo = found;

         res.json({
            id: found.id,
            email: found.email,
            msg: "authorized"
         });
      }

   }).catch(function(err){
      res.status(500).json(err);
   })

});

//Finish session
router.post('/logout',isAuthenticated);
router.post('/logout', function(req, res, next) {

   req.session.authenticated = false;
   delete req.session.userinfo;

   res.json({msg:"Good Bye!"});

});


module.exports = router;
