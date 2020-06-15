const {mongoose} = require('../common/mongo');


const adminSchema = new mongoose.Schema({
    username: {type: String, default: 'admin', required: true},
    password: {type: String , required: true}
});

module.exports = mongoose.model('Admin', adminSchema);