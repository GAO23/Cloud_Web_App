const env = require('dotenv').config();

function not_authenticated(req, res, next){
    if(!req.isAuthenticated()){
        return res.status(process.env.CLIENT_ERROR_CODE).send({status: process.env.STATUS_ERROR, error: 'Not logged in'});
    }
    next();
}

module.exports = not_authenticated;