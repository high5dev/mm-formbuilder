// declare mongoose
const mongoose = require("mongoose");

const ProductCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    websiteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "web-builders",
      required: true,
    },
    isAll: {
      type: Boolean,
    },
    products: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("product-category", ProductCategorySchema);
