const express = require('express');
const router = express.Router();
const cors = require("cors");
const {upload} = require('../common/mongo');
const env = require('dotenv').config();
const not_authenticated = require('../common/ProtectedRoute');
const passport = require('passport');

// for cross origin domain
router.use(cors());

router.get('/', function(req, res, next) {
  return res.status(200).send({status: process.env.STATUS_OK, msg: "Back end server is online"});
});

router.post('/upload', not_authenticated, upload.single('content'), function (req, res){
  return res.send({status: process.env.STATUS_OK});
});

router.post('/login', function(req, res, next){
  if(req.isAuthenticated()){
    return res.json({status: process.env.STATUS_OK, msg: "already logged in"});
  }

  passport.authenticate('local', function(err, user, info) {
    if (err) return res.status(process.env.CLIENT_ERROR_CODE).send({status: process.env.STATUS_ERROR, error: err.message});
    req.logIn(user, function(err) {
      if (err) {
        return res.status(process.env.CLIENT_ERROR_CODE).send({status: process.env.STATUS_ERROR, error: err.message});
      }
      return res.json({status: process.env.STATUS_OK});
    });
  })(req, res, next);
});

router.get('/isLoggedIn', function(req, res, next){
  if(req.isAuthenticated()){
    return res.send({status: process.env.STATUS_OK, msg: 'Y'});
  }else{
    return res.send({status: process.env.STATUS_OK, msg: 'N'});
  }
});

router.post('/logout', function(req, res, next){
  if(!req.isAuthenticated()){
    return res.json({status: process.env.STATUS_OK, msg: "already out"});
  }else{
    req.logOut();
    return res.json({status: process.env.STATUS_OK, msg: "logged out"});
  }
});


module.exports = router;
