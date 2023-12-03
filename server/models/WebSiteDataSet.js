// declare mongoose
const mongoose = require("mongoose");

const WebSiteDatasetSchema = new mongoose.Schema(
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
    collectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "web-collections",
      required: true,
    },
    name: {
      type: String,
      unique: true,
      required: true,
    },
    isFormDataset: {
      type: Boolean,
      default: false,
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

module.exports = mongoose.model("web-dataset", WebSiteDatasetSchema);
