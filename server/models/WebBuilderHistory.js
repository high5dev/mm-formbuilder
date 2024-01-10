// declare mongoose
const mongoose = require("mongoose");

const WebBuilderHistorySchema = new mongoose.Schema(
  {
    websiteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "web-builders",
      required: true,
    },
    ipAddress: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Web-builder-history", WebBuilderHistorySchema);
