const mongoose = require("mongoose");

const WebBlogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auths",
      required: true,
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "organizations",
      default:null
    },
    creatorType: {
      type: String,
      default: "user",
    },
    websiteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "web-builders",
      required: true,
    },
    pageName:{
      type:String
    },
    avatar:{
      type:String
    },
    imageUrl:{
      type:String
    },
    name:{
      type:String,
      required:true
    },
    title:{
      type: String,
      required: true
    },
    description:{
      type:String,
      required:true
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("web-blog", WebBlogSchema);
