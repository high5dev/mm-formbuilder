// declare mongoose
const mongoose = require("mongoose");

const WebSiteInvite = new mongoose.Schema(
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
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "web-roles",
      required: true,
    },
    toEmail: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'pending',
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

module.exports = mongoose.model("web-invite", WebSiteInvite);
