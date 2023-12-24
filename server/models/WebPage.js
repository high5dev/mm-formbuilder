// declare mongoose
const mongoose = require("mongoose");

const WebPageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auths",
      required: true,
    },
    organizationId: {
      type: mongoose.Types.ObjectId,
      ref: "organizations",
      default: null,
    },
    websiteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "web-builders",
      required: true,
    },
    type: {
      type: mongoose.Schema.Types.String,
    },
    name: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    step: {
      type: Number,
      required: true,
    },
    popups: [
      {
        type: Object
      }
    ],
    seoDetails: {
      type: Object,
    },
    presetName: {
      type: String,
      default: '',
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

module.exports = mongoose.model("web-page", WebPageSchema);
