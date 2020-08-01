const express = require('express');
const router = express.Router();
const File = require('../models/file');
const env = require('dotenv').config();
const not_authenticated = require('../common/ProtectedRoute');
const passport = require('passport');
const {mongoose} = require('../common/mongo');
const ObjectId = mongoose.Types.ObjectId;
const package = require('../common/MulterSetup'); // need to import it first because of strange bugs, empty atm
const {getFileDirName ,getLevels, getDirContent}  = require('../common/HelperFunctions');
const cors = require('cors');

router.use(cors({ origin: process.env.REACT_SERVER_ORIGIN , credentials :  true}));

router.get('/', function(req, res, next) {
  return res.status(200).send({status: process.env.STATUS_OK, msg: "Back end server is online"});
});

router.post('/upload', not_authenticated, function (req, res){
  const {gfs, upload} = require('../common/MulterSetup'); // import from the package again
  upload(req, res, async function(err) {
      try{
        if (err) return res.send({status: process.env.STATUS_ERROR, error: err.message});
        else if (req.fileValidationError) return res.send({status: process.env.STATUS_ERROR, error: req.fileValidationError});
        else if (!req.file)  return res.send({status: process.env.STATUS_ERROR, error: 'Please select a file to upload'});
        let fileItem = await File.findOne({fullPath: req.body.fullPath, isDir: false});
        if(!fileItem){
          fileItem = new File({_ownerId: req.user._id, filename: req.file.originalname, fullPath: req.body.fullPath});
        }else{
          await gfs.files.deleteOne({_id: new ObjectId(fileItem._storageId)});
        }

        if(fileItem.fullPath.charAt(0) !== '/') {
          await gfs.files.deleteOne({_id: new ObjectId(req.file.id)});
          await gfs.db.collection('uploads' + '.chunks').remove({files_id: req.file.id});
          throw new Error('full file path must starts with \'/\'');
        }
        let fileDir = getFileDirName(fileItem.fullPath);
        let dirItem = await File.findOne({fullPath: fileDir, isDir: true});

        if(!dirItem && fileDir === '/') {
          rootDir = new File({_ownerId: req.user._id, filename: fileDir, fullPath: fileDir, isDir: true});
          await rootDir.save();
        }else if (!dirItem){
          await gfs.files.deleteOne({_id: new ObjectId(req.file.id)});
          await gfs.db.collection('uploads' + '.chunks').remove({files_id: req.file.id});
          throw new Error('dir that contains this file does not exit');
        }

        fileItem._storageId = req.file.id;
        fileItem.lastModified = new Date(req.body.lastModified * 1000).toISOString();
        fileItem.contentType = req.file.contentType;
        fileItem.size = req.file.size;
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
    return res.json({status: process.env.STATUS_OK, error: "already logged in"});
  }
  passport.authenticate('local', function(err, user, info) {
    if (err) return res.status(200).send({status: process.env.STATUS_ERROR, error: err.message});
    req.logIn(user, function(err) {
      if (err) {
        return res.send({status: process.env.STATUS_ERROR, error: err.message});
      }
      return res.send({status: process.env.STATUS_OK});
    });
  })(req, res, next);
});

router.get('/isLoggedIn', function(req, res, next){
  if(req.isAuthenticated()){
    return res.send({status: process.env.STATUS_OK, msg: 'Y', username: req.user.username});
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

router.get('/stream', not_authenticated, async function (req, res) {
  try{
    const {gfs} = require('../common/MulterSetup'); // import from the package again
    let fileItem = await File.findOne({fullPath:  req.query.fullPath, _ownerId: new ObjectId(req.user._id)});
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

router.get('/download', not_authenticated, async function(req, res) {
  try{
    const {gfs} = require('../common/MulterSetup'); // import from the package again
    let fileItem = await File.findOne({fullPath:  req.query.fullPath,  _ownerId: new ObjectId(req.user._id)});
    if(!fileItem) return res.send({status: process.env.STATUS_ERROR, error: "file not found"});
    let file = await gfs.files.findOne({_id: new ObjectId(fileItem._storageId)});
    if(!file || file.length === 0) return res.send({status: process.env.STATUS_ERROR, error: "file not found"});
    res.set('Content-Type', fileItem.contentType);
    res.set('Content-Disposition', 'attachment; filename="' + fileItem.filename + '"');
    const readstream = gfs.createReadStream(file.filename);
    readstream.pipe(res);
    return;
  }catch (err) {
    console.log(err.stack);
    res.err_msg = err.message;
    res.status(process.env.CLIENT_ERROR_CODE).send({status: process.env.STATUS_ERROR, error: err.message});
  }
});

router.get('/info', not_authenticated, async function(req, res){
  try{
    const fullPath =  req.query.fullPath;
    let fileItem = await File.findOne({fullPath: fullPath,  _ownerId: new ObjectId(req.user._id)});
    if(!fileItem) return  res.send({status: process.env.STATUS_ERROR, error: 'no such file'});
    res.send({status: process.env.STATUS_OK, data: fileItem});
  }catch (err) {
    console.log(err.stack);
    res.err_msg = err.message;
    res.status(process.env.CLIENT_ERROR_CODE).send({status: process.env.STATUS_ERROR, error: err.message});
  }
});

router.get('/all_dir', not_authenticated, async function(req, res) {
  try{
    let fileItems = await File.find({ isDir: true, _ownerId: new ObjectId(req.user._id)});
    if(!fileItems || fileItems.length === 0) return  res.send({status: process.env.STATUS_OK, result: []});
    res.send({status: process.env.STATUS_OK, data: fileItems});
  }catch (err) {
    console.log(err.stack);
    res.err_msg = err.message;
    res.status(process.env.CLIENT_ERROR_CODE).send({status: process.env.STATUS_ERROR, error: err.message});
  }
});

router.get('/dir', not_authenticated, async function(req, res){
  try{
    const fullPath =  req.query.dir;
    const levels = getLevels(fullPath);
    let fileItem = await File.find({ fullPath: { $regex: `^${fullPath}/[^/]+$`, $options: 'i'},  _ownerId: new ObjectId(req.user._id)});
    if(!fileItem || fileItem.length === 0) return  res.send({status: process.env.STATUS_ERROR, error: 'no such dir'});
    let files = getDirContent(fileItem, levels);
    res.send({status: process.env.STATUS_OK, data: files});
  }catch (err) {
    console.log(err.stack);
    res.err_msg = err.message;
    res.status(process.env.CLIENT_ERROR_CODE).send({status: process.env.STATUS_ERROR, error: err.message});
  }
});

router.post('/mkdir', not_authenticated, async function(req, res){
  try{
    let fileItem = await File.findOne({ fullPath: { $regex: `^${req.body.fullPath}/*`, $options: 'i'},  _ownerId: new ObjectId(req.user._id)});
    if(fileItem) return res.send({status: process.env.STATUS_ERROR, error: "dir already exists"});
    fileItem = new File({fullPath: req.body.fullPath, _ownerId: req.user._id, isDir: true});
    await fileItem.save();
    return res.send({status: process.env.STATUS_OK});
  }catch (err) {
    console.log(err.stack);
    res.err_msg = err.message;
    res.status(process.env.CLIENT_ERROR_CODE).send({status: process.env.STATUS_ERROR, error: err.message});
  }
})

router.post('/delete_dir', not_authenticated, async function(req, res){
  try{
    let fileItem = await File.findOne({ fullPath: { $regex: `^${req.body.fullPath}/*`, $options: 'i'},  _ownerId: new ObjectId(req.user._id)});
    if(!fileItem) return res.send({status: process.env.STATUS_ERROR, error: "no dir found"});
    await File.deleteMany({ fullPath: { $regex: `^${req.body.fullPath}/*`, $options: 'i'},  _ownerId: new ObjectId(req.user._id)});
    return res.send({status: process.env.STATUS_OK});
  }catch (err) {
    console.log(err.stack);
    res.err_msg = err.message;
    res.status(process.env.CLIENT_ERROR_CODE).send({status: process.env.STATUS_ERROR, error: err.message});
  }
});

router.post('/delete_file', not_authenticated, async function(req, res){
  try{
    const {gfs} = require('../common/MulterSetup');
    let fileItem = await File.findOne({ fullPath: req.body.fullPath,  _ownerId: new ObjectId(req.user._id)});
    if(!fileItem) return res.send({status: process.env.STATUS_ERROR, error: "no file found"});
    await gfs.files.deleteOne({_id: new ObjectId(fileItem._storageId)});
    await gfs.db.collection('uploads' + '.chunks').remove({files_id: fileItem._storageId});
    await File.deleteOne({ fullPath: req.body.fullPath,  _ownerId: new ObjectId(req.user._id)});
    return res.send({status: process.env.STATUS_OK});
  }catch (err) {
    console.log(err.stack);
    res.err_msg = err.message;
    res.status(process.env.CLIENT_ERROR_CODE).send({status: process.env.STATUS_ERROR, error: err.message});
  }
});

router.post('/rename_dir', not_authenticated, async function(req, res) {
  try {
    let fileItem = await File.find({ fullPath: { $regex: `^${req.body.dir}/*`, $options: 'i'},  _ownerId: new ObjectId(req.user._id)});
    if(!fileItem || fileItem.length === 0) return res.send({status: process.env.STATUS_ERROR, error: "no dir found"});
    const dir = req.body.dir;
    const newName = req.body.newName;
    const oldDirCount = dir.length;
    let promises = fileItem.map((element) =>{
      let oldFilePath = element.fullPath.substring(oldDirCount, element.fullPath.length);
      let newFilePath = `${newName}${oldFilePath}`;
      element.fullPath = newFilePath;
      element.markModified();
      return element.save();
    });

    await Promise.all(promises);
    return res.send({status: process.env.STATUS_OK});
  } catch (err) {
    console.log(err.stack);
    res.err_msg = err.message;
    res.status(process.env.CLIENT_ERROR_CODE).send({status: process.env.STATUS_ERROR, error: err.message});
  }
});

router.post('/rename_file', not_authenticated, async function(req, res) {
  try {
    let fileItem = await File.findOne({ fullPath: req.body.fullPath,  _ownerId: new ObjectId(req.user._id)});
    if(!fileItem) return res.send({status: process.env.STATUS_ERROR, error: "no file found"});
    fileItem.fullPath = req.body.newName;
    fileItem.markModified();
    await fileItem.save();
    return res.send({status: process.env.STATUS_OK});
  } catch (err) {
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
