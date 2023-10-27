const mongoose = require("mongoose");

const SocialProofGoal = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auths",
      required: true,
    },
    campaignId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "campaign",
      required: true,
    },
    name: {
      type: String
    },
    label: {
      type: String,
      default: "Lead",
    },
    conversion: {
      type: Number
    },
    url:{
      type:String
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("socialproofgoal", SocialProofGoal);
