// declare mongoose
const mongoose = require("mongoose");

const WebSiteCollectionSchema = new mongoose.Schema(
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
    name: {
      type: String,
      required: true,
    },
    fields: [{
      type: Object,
    }],
    values: [{
      type: Object,
    }],
    type: {
      type: String,
      default: 'multiple'
    },
    category: {
      type: String,
      default: null
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
    isProfile: {
      type: Boolean,
      default: false,
    },
    nameDuplicatedIndex: {
      type: Number,
      default: 0,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("web-collection", WebSiteCollectionSchema);
