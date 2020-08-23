const express = require('express');
const router = express.Router();
const File = require('../models/file');
const env = require('dotenv').config();
const not_authenticated = require('../common/ProtectedRoute');
const passport = require('passport');
const {mongoose} = require('../common/mongo');
const ObjectId = mongoose.Types.ObjectId;
const package = require('../common/MulterSetup'); // need to import it first because of strange bugs, empty atm
const {getFileName, getFileDirName ,getLevels, getDirContent, calculateDirSize}  = require('../common/HelperFunctions');
const cors = require('cors');
const display_error = require('../common/display_error');
const User = require("../models/users");

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

        // get all the needed data from the data base
        let user = await User.findOne({_id: ObjectId(req.user._id)});
        let fileItem = await File.findOne({fullPath: req.body.fullPath, isDir: false});
        let fileDir = getFileDirName(req.body.fullPath);
        let dirItem = await File.findOne({fullPath: fileDir, isDir: true});

        // if this file already exists then remove its original media and replace it with new, its size must be remove from the parent dir and the user storage size too
        if(!fileItem){ // if file does not exist yet, create one
          fileItem = new File({_ownerId: req.user._id, filename: req.file.originalname, fullPath: req.body.fullPath});
        }else{
          await gfs.files.deleteOne({_id: new ObjectId(fileItem._storageId)});
          await gfs.db.collection('uploads' + '.chunks').remove({files_id: fileItem._storageId});
          if(!dirItem) throw new Error("database inconsistency, file exists but its dir doesn't exist")
          dirItem.size -= fileItem.size;
          dirItem.dirItemCount -= 1;
          user.storageSize -= fileItem.size;
        }

        // error handling, all full path must start with /
        if(fileItem.fullPath.charAt(0) !== '/') {
          await gfs.files.deleteOne({_id: new ObjectId(req.file.id)});
          await gfs.db.collection('uploads' + '.chunks').remove({files_id: req.file.id});
          throw new Error('full file path must starts with \'/\'');
        }

        // if the root dir in the data base does not exist yet, create one. If the parent dir is not the root dir and does not exist, throw an error.
        if(!dirItem && fileDir === '/') {
          let rootDir = new File({_ownerId: req.user._id, filename: fileDir, fullPath: fileDir, isDir: true});
          await rootDir.save();
          dirItem = rootDir;
        }else if (!dirItem){
          await gfs.files.deleteOne({_id: new ObjectId(req.file.id)});
          await gfs.db.collection('uploads' + '.chunks').remove({files_id: req.file.id});
          throw new Error('dir that contains this file does not exist');
        }

        // update the database. Size minus during for override are done in code blocks above as well as deleting the original file during override or deleting the uploaded file if errors, bad idea....
        fileItem._storageId = req.file.id;
        fileItem.lastModified = new Date(req.body.lastModified * 1000).toISOString();
        fileItem.contentType = req.file.contentType;
        fileItem.size = req.file.size;
        fileItem.markModified();
        await fileItem.save();
        dirItem.size += fileItem.size;
        dirItem.dirItemCount += 1;
        dirItem.markModified();
        await dirItem.save();
        user.storageSize += fileItem.size;
        user.markModified();
        await user.save();
        res.send({status: process.env.STATUS_OK});
      }catch (err) {
        display_error(err);
        return res.send({status: process.env.STATUS_ERROR, error: err.message});
      }
    });
});

router.post('/login', function(req, res, next){
  if(req.isAuthenticated()){
    return res.json({status: process.env.STATUS_OK, error: "already logged in"});
  }
  passport.authenticate('local', function(err, user, info) {
    if (err)  {
      return res.status(200).send({status: process.env.STATUS_ERROR, error: err.message})
    };
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
    display_error(err);
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
    display_error(err);
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
    display_error(err);
    res.status(process.env.CLIENT_ERROR_CODE).send({status: process.env.STATUS_ERROR, error: err.message});
  }
});

router.get('/all_dir', not_authenticated, async function(req, res) {
  try{
    let fileItems = await File.find({ isDir: true, _ownerId: new ObjectId(req.user._id)});
    if(!fileItems || fileItems.length === 0) return  res.send({status: process.env.STATUS_OK, result: []});
    res.send({status: process.env.STATUS_OK, result: fileItems});
  }catch (err) {
    display_error(err);
    res.status(process.env.CLIENT_ERROR_CODE).send({status: process.env.STATUS_ERROR, error: err.message});
  }
});

router.get('/dir', not_authenticated, async function(req, res){
  try{
    let fullPath =  req.query.dir;
    if(fullPath === '/') fullPath = '';
    const levels = getLevels(fullPath);
    let fileItem = await File.find({ fullPath: { $regex: `^${fullPath}/[^/]+$`, $options: 'i'},  _ownerId: new ObjectId(req.user._id)});
    if(!fileItem) return  res.send({status: process.env.STATUS_ERROR, error: 'no such dir'});
    let files = getDirContent(fileItem, levels);
    res.send({status: process.env.STATUS_OK, data: files});
  }catch (err) {
    display_error(err);
    res.status(process.env.CLIENT_ERROR_CODE).send({status: process.env.STATUS_ERROR, error: err.message});
  }
});

router.post('/mkdir', not_authenticated, async function(req, res){
  try{
    let fileItem = await File.findOne({ fullPath: { $regex: `^${req.body.fullPath}/*`, $options: 'i'},  _ownerId: new ObjectId(req.user._id)});
    if(fileItem) return res.send({status: process.env.STATUS_ERROR, error: "dir already exists"});

    let parentDir = getFileDirName(req.body.fullPath);
    let dirItem = await File.findOne({fullPath: parentDir, isDir: true});
    if(!dirItem && parentDir === '/'){
      let rootDir = new File({_ownerId: req.user._id, fullPath:parentDir, filename: parentDir, isDir: true});
      await rootDir.save();
      dirItem = rootDir
    }else if(!dirItem){
      throw new Error(
          "its parent dir does not exist"
      );
    }
    let name = getFileName(req.body.fullPath);
    fileItem = new File({filename: name, fullPath: req.body.fullPath, _ownerId: req.user._id, isDir: true});
    await fileItem.save();
    dirItem.dirItemCount += 1;
    dirItem.markModified();
    await dirItem.save();
    return res.send({status: process.env.STATUS_OK});
  }catch (err) {
    display_error(err);
    res.status(process.env.CLIENT_ERROR_CODE).send({status: process.env.STATUS_ERROR, error: err.message});
  }
})

router.post('/delete_dir', not_authenticated, async function(req, res){
  try{
    if(req.body.fullPath === '/') throw new Error("can't delete root");
    let fileItem = await File.findOne({ fullPath: req.body.fullPath,  _ownerId: new ObjectId(req.user._id), isDir: true});
    if(!fileItem) return res.send({status: process.env.STATUS_ERROR, error: "no dir found"});
    let parentDir = getFileDirName(req.body.fullPath);
    let dirItem = await File.findOne({fullPath: parentDir, isDir: true});
    let user = await User.findOne({_id: ObjectId(req.user._id)});
    if(!dirItem) throw new Error("database inconsistency issue, dir exists but its parent dir does not exist");
    let deleteDirSize = await calculateDirSize(req.body.fullPath, req.user._id);
    await File.deleteMany({ fullPath: { $regex: `^${req.body.fullPath}/*`, $options: 'i'},  _ownerId: new ObjectId(req.user._id)});
    dirItem.dirItemCount -= 1;
    dirItem.markModified();
    await dirItem.save();
    user.storageSize -= deleteDirSize;
    user.markModified();
    await user.save();
    return res.send({status: process.env.STATUS_OK});
  }catch (err) {
    display_error(err);
    res.status(process.env.CLIENT_ERROR_CODE).send({status: process.env.STATUS_ERROR, error: err.message});
  }
});

router.post('/delete_file', not_authenticated, async function(req, res){
  try{
    const {gfs} = require('../common/MulterSetup');
    let fileItem = await File.findOne({ fullPath: req.body.fullPath,  _ownerId: new ObjectId(req.user._id)});
    if(!fileItem) return res.send({status: process.env.STATUS_ERROR, error: "no file found"});
    let fileDir = getFileDirName(fileItem.fullPath);
    let dirItem = await File.findOne({fullPath: fileDir, isDir: true});
    if(!dirItem) throw new Error("db inconsistency error, dir of the file not found");
    let user = await User.findOne({_id: ObjectId(req.user._id)});
    await gfs.files.deleteOne({_id: new ObjectId(fileItem._storageId)});
    await gfs.db.collection('uploads' + '.chunks').remove({files_id: fileItem._storageId});
    await File.deleteOne({ fullPath: req.body.fullPath,  _ownerId: new ObjectId(req.user._id)});
    dirItem.size -= fileItem.size;
    dirItem.dirItemCount -= 1;
    dirItem.markModified();
    user.storageSize -= fileItem.size;
    user.markModified();
    await user.save();
    await dirItem.save();
    return res.send({status: process.env.STATUS_OK});
  }catch (err) {
    display_error(err);
    res.status(process.env.CLIENT_ERROR_CODE).send({status: process.env.STATUS_ERROR, error: err.message});
  }
});

router.post('/rename_dir', not_authenticated, async function(req, res) {
  try {
    let fileItem = await File.find({ fullPath: { $regex: `^${req.body.dir}/*`, $options: 'i'},  _ownerId: new ObjectId(req.user._id)});
    if(!fileItem || fileItem.length === 0) return res.send({status: process.env.STATUS_ERROR, error: "no dir found"});
    const dir = req.body.dir;
    const newName = req.body.newName;
    const newDirItem = await File.find({fullPath: newName, isDir: true});
    if(newDirItem) throw new Error('this directory already exists');
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
    display_error(err);
    res.status(process.env.CLIENT_ERROR_CODE).send({status: process.env.STATUS_ERROR, error: err.message});
  }
});

router.post('/rename_file', not_authenticated, async function(req, res) {
  try {
    let fileItem = await File.findOne({ fullPath: req.body.fullPath,  _ownerId: new ObjectId(req.user._id), isDir: false});
    if(!fileItem) return res.send({status: process.env.STATUS_ERROR, error: "no file found"});
    let fileFolder = getFileDirName(fileItem.fullPath);
    let newPath =  `${fileFolder}/${req.body.newName}`;
    let newPathFileItem = await File.findOne({fullPath: newPath, isDir: false});
    if(newPathFileItem) throw new Error("file with the same name already exists");
    fileItem.fullPath = newPathFileItem;
    fileItem.filename = req.body.newName;
    fileItem.markModified();
    await fileItem.save();
    return res.send({status: process.env.STATUS_OK});
  } catch (err) {
    display_error(err);
    res.status(process.env.CLIENT_ERROR_CODE).send({status: process.env.STATUS_ERROR, error: err.message});
  }
});


router.post('/move_file', not_authenticated, async function(req, res) {
    try {
        let fileItem = await File.findOne({ fullPath: req.body.fullPath,  _ownerId: new ObjectId(req.user._id), isDir: false});
        if(!fileItem) return res.send({status: process.env.STATUS_ERROR, error: "no file found"});
        let newDir = req.body.newPath;
        let newPath =  `${newDir}/${fileItem.filename}`;
        let newPathFileItem = await File.findOne({fullPath: newPath, isDir: false});
        if(newPathFileItem) throw new Error("file with the same name already exists");
        fileItem.fullPath = newPath;
        fileItem.markModified();
        await fileItem.save();
        return res.send({status: process.env.STATUS_OK});
    } catch (err) {
        display_error(err);
        res.status(process.env.CLIENT_ERROR_CODE).send({status: process.env.STATUS_ERROR, error: err.message});
    }
});


router.get('/file/:filename', function(req,res,next){
  try{
    let file_name = req.params.filename;
    let file_path = process.env.FILE_DIR + `/${file_name}`;
    res.download(file_path);
  }catch(err){
    display_error(err);
    res.send({status: process.env.STATUS_ERROR, error: err.message});
  }
});

router.get('/userinfo/:username', not_authenticated, async function (req, res, next){
  try{
    if(req.user.username === 'admin' || req.user.username === req.params.username){
      let user = await User.findOne({username: req.params.username});
      return res.send({status: process.env.STATUS_OK, user: user});
    }else {
      throw new Error("Unauthorized");
    }
  }catch (err){
    return res.send({status: process.env.STATUS_ERROR, error: err.message});
  }
});


module.exports = router;
