const express = require('express');
const router = express.Router();
const cors = require("cors");
const File = require('../models/file');
const env = require('dotenv').config();
const not_authenticated = require('../common/ProtectedRoute');
const passport = require('passport');
const {mongoose} = require('../common/mongo');
const ObjectId = mongoose.Types.ObjectId;
const package = require('../common/multer_setup'); // need to import it first because of strange bugs, empty atm
// for cross origin domain
router.use(cors());

router.get('/', function(req, res, next) {
  return res.status(200).send({status: process.env.STATUS_OK, msg: "Back end server is online"});
});

router.post('/upload', not_authenticated, function (req, res){
  const {upload} = require('../common/multer_setup'); // import from the package again
  upload(req, res, async function(err) {
      try{
        console.log(req.file);
        if (err) return res.send({status: process.env.STATUS_ERROR, error: err.message});
        else if (req.fileValidationError) return res.send({status: process.env.STATUS_ERROR, error: req.fileValidationError});
        else if (!req.file)  return res.send({status: process.env.STATUS_ERROR, error: 'Please select a file to upload'});
        let fileItem = await File.findOne({filename: req.file.originalname});
        if(!fileItem){
          fileItem = new File({_ownerId: req.user._id, filename: req.file.originalname})
        }
        fileItem._storageId = req.file.id;
        fileItem.markModified();
        await fileItem.save();
        res.send({status: process.env.STATUS_OK});
      }catch (err) {
        console.log(err.stack);
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

router.get('/stream/:filename', /*not_authenticated,*/ async function (req, res) {
  try{
    const {gfs} = require('../common/multer_setup'); // import from the package again
    let fileItem = await File.findOne({filename:  req.params.filename});
    if(!fileItem) return res.send({status: process.env.STATUS_ERROR, error: "file not found"});
    let file = await gfs.files.findOne({_id: new ObjectId(fileItem._storageId)});
    if(!file || file.length === 0) return res.status(404).send({status: process.env.STATUS_ERROR, error: "file not found"});
    const readstream = gfs.createReadStream(file.filename);
    readstream.pipe(res);
    return;
  }catch (err) {
    console.log(err.stack);
    res.err_msg = err.message;
    res.status(process.env.CLIENT_ERROR_CODE).send({status: process.env.STATUS_ERROR, error: err.message});
  }
});

router.get('/file/:filename', function(req,res,next){
  let file_name = req.params.filename;
  let file_path = process.env.FILE_DIR + `/${file_name}`;
  res.download(file_path);
});


module.exports = router;
