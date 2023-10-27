// declare mongoose
const mongoose = require("mongoose");

const FormBuilderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
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
    smartList: {
      type: String,
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "formcategories",
    },
    formType: {
      type: String,
      required: true,
    },
    formData: {
      type: Object,
    },
    formDataThankyou: {
      type: Object,
    },
    clonedFrom: {
      type: String,
    },
    status: {
      type: String,
    },
    seoDetails: {
      type: Object,
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
    orderElements: {
      showInfo: { type: Boolean, default: false },
      showFullName: { type: Boolean, default: false },
      showPhone: { type: Boolean, default: false },
      showEmail: { type: Boolean, default: false },
      showDob: { type: Boolean, default: false },
      showAddress: { type: Boolean, default: false },
      showBillingAddress: { type: Boolean, default: false },
      tabColor: { type: String, default: "red" },
      participant: { type: String },
    },
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

module.exports = mongoose.model("Form-builder", FormBuilderSchema);
