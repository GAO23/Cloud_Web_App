const Grid = require('gridfs-stream');
const GridFsStorage = require('multer-gridfs-storage');
const env = require('dotenv').config();
const File = require('../models/file');
const multer = require('multer');
const {mongoose} = require('./mongo');
const conn = mongoose.connection;

let gfs;
//set up gridfs
conn.once('open', ()=>{
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});

// set up storage
const storage = new GridFsStorage({
    url: process.env.MONGO_DATABASE_URL,
    gfs : gfs,
    file: (req, file) => {
        req._contentId = mongoose.Types.ObjectId();
        return {
            // these are the fields in the collections
            filename: new Date().toISOString() + '_' + file.originalname,
            bucketName: 'uploads',
            id: req._contentId
        };
    }
});

// not using this
const fileFilter = async (req, file, cb) => {
    try{
        let fileItem = await File.findOne({pathname: file.originalname});
        if(file && (file.originalname[0] === '*')) {
            await gfs.remove({_id: fileItem._storageId});
            cb(null, true);
        }else if(fileItem){
            throw new Error("file already exists");
        }else{
            cb(null, true);
        }
    }catch (err) {
        cb(new Error(err.message), false);
    }
};

let upload = multer({ storage: storage, fileFilter: fileFilter }).single('content');
module.exports = {upload, gfs};
