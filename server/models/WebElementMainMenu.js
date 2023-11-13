// declare mongoose
const mongoose = require("mongoose");

const WebBuilderElementMainMenuSchema = new mongoose.Schema(
  {
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

module.exports = mongoose.model("web-element-mainmenu", WebBuilderElementMainMenuSchema);