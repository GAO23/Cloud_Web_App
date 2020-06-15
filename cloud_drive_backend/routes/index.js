const express = require('express');
const router = express.Router();
const cors = require("cors");
const File = require('../models/file');
const {upload, gfs} = require('../common/multer_setup');
const env = require('dotenv').config();
const not_authenticated = require('../common/ProtectedRoute');
const passport = require('passport');


// for cross origin domain
router.use(cors());

router.get('/', function(req, res, next) {
  return res.status(200).send({status: process.env.STATUS_OK, msg: "Back end server is online"});
});

router.post('/upload', not_authenticated, function (req, res){
    upload(req, res, async function(err) {
      try{
        if (err) return res.send({status: process.env.STATUS_ERROR, error: err.message});
        else if (req.fileValidationError) return res.send({status: process.env.STATUS_ERROR, error: req.fileValidationError});
        else if (!req.file)  return res.send({status: process.env.STATUS_ERROR, error: 'Please select a file to upload'});


        res.send({status: process.env.STATUS_OK});
      }catch (err) {
        return res.send({status: process.env.STATUS_ERROR, error: err.message});
      }
    });
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

// router.get('/download/:filepath', not_authenticated, async function (req, res) {
//   try{
//     let file = await gfs.files.findOne({_id:  ObjectId(req.params.id)});
//     if(!file || file.length === 0){
//       return res.status(404).send({status: "error", error: "file not found"});
//     }
//     const readstream = gfs.createReadStream(file.filename);
//     readstream.pipe(res);
//     return;
//   }catch (err) {
//     res.err_msg = err.message;
//     res.status(ERR_CODE).send({status: "error", error: err.message});
//   }
// });

router.get('/file/:filename', function(req,res,next){
  let file_name = req.params.filename;
  let file_path = process.env.FILE_DIR + `/${file_name}`;
  res.download(file_path);
});


module.exports = router;
