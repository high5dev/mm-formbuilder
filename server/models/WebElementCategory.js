// declare mongoose
const mongoose = require("mongoose");

const WebBuilderElementCategorySchema = new mongoose.Schema(
  {
    mainMenu: {
      type: String,
      required: true,
    },
    subMenu: {
      type: String,
      default: '',
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