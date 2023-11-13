// declare mongoose
const mongoose = require("mongoose");

const WebBuilderElementCategorySchema = new mongoose.Schema(
  {
    subMenu: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "web-element-submenus",
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

module.exports = mongoose.model("web-element-category", WebBuilderElementCategorySchema);