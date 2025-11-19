const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  edad: Number
});

module.exports = mongoose.model("user", userSchema);
