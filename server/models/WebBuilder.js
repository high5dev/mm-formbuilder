// declare mongoose
const mongoose = require("mongoose");

const WebBuilderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auths",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    memberType: {
      type: String, 
      default: null,
      //required: true,
    },
    contactType:{
      type:mongoose.Schema.Types.ObjectId,
      default:null,
      ref:"contact-types"
    },
    automateEntry: {
      type: Boolean,
      required: true,
      default: false,
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "formcategories",
    },
    formType: {
      type: String,
      required: true,
    },
    pages: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "web-pages",
    }],
    clonedFrom: {
      type: String,
      default: null,
    },
    status: {
      type: String,
    },
    isTemplate: {
      type: Boolean,
      default: false,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
    organizationId: {
      type: mongoose.Types.ObjectId,
      ref: "organizations",
      default: null,
    },
    creatorType: {
      type: String,
      default: "user",
    },
    products: [
      {
        productId: mongoose.Schema.Types.ObjectId,
        name: String,
        qty: Number,
        price: Number,
      },
    ],
    automationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "form-automations",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Web-builder", WebBuilderSchema);
