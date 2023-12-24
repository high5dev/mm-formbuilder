// declare mongoose
const mongoose = require("mongoose");

const WebSiteConnectionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auths",
      required: true,
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "organizations",
      default: null,
    },
    websiteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "web-builders",
      required: true,
    },
    datasetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "web-datasets",
      required: true,
    },
    componentId: {
      type: String,
      required: true,
    },
    componentType: {
      type: String,
      default: '',
    },
    connectedField: {
      type: String,
      default: '',
    },
    fieldIndex: {
      type: Number,
      default: 0,
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

module.exports = mongoose.model("web-connection", WebSiteConnectionSchema);
