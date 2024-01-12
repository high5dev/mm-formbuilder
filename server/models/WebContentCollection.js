// declare mongoose
const mongoose = require("mongoose");

const WebContentCollection = new mongoose.Schema(
  {
    websiteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "web-builders",
      required: true,
    },
    collectionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    fields: [{
      type: Object
    }],
    values: [{
      type: Object
    }],
    isApproved: {
      type: String,
      default: '',
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("web-content-collection", WebContentCollection);
