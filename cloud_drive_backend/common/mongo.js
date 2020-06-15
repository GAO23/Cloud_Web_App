const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
const env = require('dotenv').config();
mongoose.connect(process.env.MONGO_DATABASE_URL);
module.exports = {mongoose};