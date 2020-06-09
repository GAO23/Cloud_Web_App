const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const admin = require('../models/admin');
const env = require('dotenv').config();

const get_admin = async ()=> {
    let user = await admin.findOne({username: 'admin'});
    if(user == null) {
        user = new admin({password: await bcrypt.hash(process.env.ADMIN_PASSWORD, 10)});
        await user.save();
    }
    return user;
}

function init(passport){

    // done has the error, user, info as the parameter
    passport.use(new LocalStrategy( async function(username, password, done) {
        try{
            let user = await get_admin();
            if (await bcrypt.compare(password, user.password)) {
                done(null, { username: username, password: password });
            } else {
                done({message: "password incorrect"}, false, "failed");
            }
        }catch (err) {
            console.log(err.stack);
            done({message: err.message}, false, "failed");
        }
    }));

    // serializing, call in the logged in method
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    // deserailizing the user
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
}

module.exports = init;