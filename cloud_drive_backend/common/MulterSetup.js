const Grid = require('gridfs-stream');
const GridFsStorage = require('multer-gridfs-storage');
const env = require('dotenv').config();
const File = require('../models/file');
const multer = require('multer');
const {mongoose} = require('./mongo');
const conn = mongoose.connection;
const ObjectId = mongoose.Types.ObjectId;


let gfs;
//set up gridfs
conn.once('open', ()=>{
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');

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

    const fileFilter = async (req, file, cb) => {
        try{
            cb(null, true);
        }catch (err) {
            console.log(err.stack);
            cb(new Error(err.message), false);
        }
    };

    const upload = multer({preservePath: true, storage: storage, fileFilter: fileFilter }).single('content');
    // doing it like this because of strange bugs in module.export
    module.exports = {upload, gfs};
});








