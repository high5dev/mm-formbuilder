// declare mongoose
const mongoose = require("mongoose");

const WebBuilderElementSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auths",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "web-element-categories",
      required: true,
    },
    html: {
      type: String,
      default: '',
    },
    imageUrl: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: '',
    },
    mediaType: {
      type: String,
      default: '',
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("web-builder-element", WebBuilderElementSchema);
