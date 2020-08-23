const {mongoose} = require('../common/mongo');


const adminSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String , required: true},
    storageSize: {type: Number, required: true, default: 0}
});

module.exports = mongoose.model('Users', adminSchema);