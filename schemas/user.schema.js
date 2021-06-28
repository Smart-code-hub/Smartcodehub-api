const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userType: { type: String, enum: ["admin", "Supplier", "user"] },
  salt: String,
  isEmailVerified: {
    type: Boolean,
    default: true
  },
  isPhoneVerified: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,

    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    maxlength: 1024,
    required: true
  },
  phone: {
    type: Number,
    maxlength: 12,
    minlength: 9,
    required: true
  },
  joinedOn: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: true
  },
  deleted: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("User", userSchema);
