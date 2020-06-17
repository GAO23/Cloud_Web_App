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
        console.log(file);
        try{
            if(file && (file.originalname[0] === '*')) {
                let fileItem = await File.findOne({filename: file.originalname.substring(1, file.originalname.length)});
                if(fileItem){
                    file.originalname = file.originalname.substring(1, file.originalname.length);
                    await gfs.files.deleteOne({_id: new ObjectId(fileItem._storageId)});
                }else{
                    throw new Error("no such file name for override");
                }
                cb(null, true);
            }else if(await File.findOne({filename: file.originalname})){
                throw new Error("file already exists");
            }else{
                cb(null, true);
            }
        }catch (err) {
            console.log(err.stack);
            cb(new Error(err.message), false);
        }
    };

    const upload = multer({preservePath: true, storage: storage, fileFilter: fileFilter }).single('content');
    // doing it like this because of strange bugs in module.export
    module.exports = {upload, gfs};
});








