const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const role = mongoose.model("role", new Schema({
    category: String,
    isAdmin: Boolean
  })
);

module.exports = role;