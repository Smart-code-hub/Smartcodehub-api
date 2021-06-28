const mongoose = require("mongoose");

const entitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,

    lowercase: true
  },
  authPayLoads: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  },
  uId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  entitySchema: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  properties: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  isAuthEntity: {
    type: Boolean,
    default: false
  },
  authEntity: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  },
  createdOn: {
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

module.exports = mongoose.model("Entity", entitySchema);
