const mongoose = require("mongoose");

const userCollection = "usuarios";

const UserSchema = new mongoose.Schema({
  user: { type: String, require: true },
  password: { type: String, require: true },
});

const User = mongoose.model(userCollection, UserSchema);

module.exports = User;
