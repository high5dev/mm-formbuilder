// declare mongoose
const mongoose = require("mongoose");

const WebBuilderElementSubMenuSchema = new mongoose.Schema(
  {
    mainMenuId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "web-element-mainmenus",
      required: true,
    },
    name: {
      type: String,
      required: true,
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

module.exports = mongoose.model("web-element-submenu", WebBuilderElementSubMenuSchema);