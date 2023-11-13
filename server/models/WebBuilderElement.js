// declare mongoose
const mongoose = require("mongoose");

const WebBuilderElementSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auths",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    mainMenu: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "web-element-mainmenus",
      required: true,
    },
    subMenu: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "web-element-submenus",
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
