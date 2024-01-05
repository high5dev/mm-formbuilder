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
      unique: true,
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("web-collection", WebSiteCollectionSchema);
