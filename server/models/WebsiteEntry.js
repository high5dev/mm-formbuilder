// declare mongoose
const mongoose = require("mongoose");
const WebsiteEntrySchema = new mongoose.Schema(
  {
    websiteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "web-builders",
      required: true,
    },
    formId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "forms",
      required: true,
    },
    pageName: {
      type: String,
      required: true,
    },
    fields: [{
      type: Object,
    }],
    values: [{
      type: Object,
    }],
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

module.exports = mongoose.model("website-entry", WebsiteEntrySchema);
