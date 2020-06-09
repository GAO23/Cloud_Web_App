const multer = require('multer');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const GridFsStorage = require('multer-gridfs-storage');
const env = require('dotenv').config();

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGO_DATABASE_URL);
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

const upload = multer({
    storage: storage
});

module.exports = exports = {upload, mongoose};