// declare mongoose
const mongoose = require("mongoose");

const WebBuilderActivitySchema = new mongoose.Schema(
  {
    websiteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "web-builders",
      required: true,
    },
    formName:{
      type:String
    },
    type:{
      type:String
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Web-builder-activity", WebBuilderActivitySchema);
