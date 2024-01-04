// declare mongoose
const mongoose = require("mongoose");

const WebCustomerCollect = new mongoose.Schema(
  {
    websiteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "web-builders",
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    collectionId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    fields: [{
      type: Object
    }]
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("web-customer-collect", WebCustomerCollect);
