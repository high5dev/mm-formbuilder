const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SocialProofDisplayUrl = new Schema(
  {
    campaignId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "campaign",
      required: true,
    },
    url: {
      type: String,
      required:true
    },
    verification: {
      type: String,
      default: 'inactive',
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "auths",
      required: true,
    }
  },
  { timestamps: true }
);


module.exports = mongoose.model("social-display-url", SocialProofDisplayUrl);
