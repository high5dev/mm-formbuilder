const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  userType: {
    type: String,
    enum: ["super-admin", "admin", "user"],
  },
  hashed_password: {
    type: String,
  },
  oldId:{
    type:mongoose.Schema.Types.ObjectId
  },
  isLogout: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("auth", authSchema);
