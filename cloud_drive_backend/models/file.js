const {mongoose} = require('../common/mongo');
const env = require('dotenv').config();

const fileSchema =  new mongoose.Schema({
    _ownerId: { type: mongoose.Schema.Types.ObjectId, required: true},
    _storageId: { type: mongoose.Schema.Types.ObjectId, required: false},
    filename: {type: String, required: true, default: "dir file"},
    lastModified: {type: Date, required: true, default: Date.now()},
    fullPath: {type: String, required: true},
    size: {type: Number, required: true, default: 0},
    contentType: {type: String, required: true, default: "null"},
    isDir: {type: Boolean, default: false}
});

module.exports = mongoose.model('File', fileSchema);