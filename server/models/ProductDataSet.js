// declare mongoose
const mongoose = require("mongoose");

const ProductDataSetSchema = new mongoose.Schema(
  {
    websiteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "web-builders",
      required: true,
    },
    fields: [{
      type: Object,
    }],
    values: [{
      type: Object,
    }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("product-dataset", ProductDataSetSchema);
