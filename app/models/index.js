const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.rates = require("./rate.model")(mongoose);
db.posts = require("./post.model")(mongoose);
module.exports = db;
