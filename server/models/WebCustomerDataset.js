// declare mongoose
const mongoose = require("mongoose");

const WebCustomerDataset = new mongoose.Schema(
  {
    customerCollectId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    websiteId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    values: [{
      type: Object
    }],
    isApproved: {
      type: Boolean,
      required: true
    },
    isDeclined: {
      type: Boolean,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'auth',
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("web-customer-dataset", WebCustomerDataset);