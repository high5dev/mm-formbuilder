// declare mongoose
const mongoose = require("mongoose");

const WebBuilderPageHistorySchema = new mongoose.Schema(
  {
    websiteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "web-builders",
      required: true,
    },
    pageName:{
      type:String,
      required:true
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

module.exports = mongoose.model("Web-builder-page-history", WebBuilderPageHistorySchema);
