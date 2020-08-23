const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const admin = require('../models/users');
const env = require('dotenv').config();
const display_error = require("./display_error");

const get_user = async (username)=> {
    let user = await admin.findOne({username: username});
    if(user == null && username === "admin") {
        user = new admin({username: username, password: await bcrypt.hash(process.env.ADMIN_PASSWORD, 10)});
        await user.save();
    }
    return user;
}

function init(passport){

    // done has the error, user, info as the parameter
    passport.use(new LocalStrategy( async function(username, password, done) {
        try{
            let user = await get_user(username);
            if(!user)  throw new Error("no such user found");
            if (await bcrypt.compare(password, user.password)) {
                done(null, user);
            } else {
                throw new Error("password incorrect");
            }
        }catch (err) {
            display_error(err);
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