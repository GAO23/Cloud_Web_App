const {mongoose} = require('../common/mongo');

const fileSchema =  new mongoose.Schema({
    _ownerId: { type: mongoose.Schema.Types.ObjectId, required: true},
    _storageId: { type: mongoose.Schema.Types.ObjectId, required: true },
    filename: {type: String, required: true},
    lastModified: {type: Date, required: true},
    fullPath: {type: String, required: true},
    size: {type: Number, required: true},
    contentType: {type: String, required: true}
});

module.exports = mongoose.model('File', fileSchema);