// declare mongoose
const mongoose = require("mongoose");

const WebBuilderFormPageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auths",
      required: true,
    },
    formId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "forms",
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

module.exports = mongoose.model("webbuilderform-page", WebBuilderFormPageSchema);
