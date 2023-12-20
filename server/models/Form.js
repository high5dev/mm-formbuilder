// declare mongoose
const mongoose = require("mongoose");

const FormSchema = new mongoose.Schema(
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
    websiteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "web-builders",
        required: true,
      },
    pageId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "web-pages",
        required: true,
    },
    elements:[
      {
        type:{
          type:String,
          required:true
        },
        name:{
          type:String,
          required:true
        }
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("form", FormSchema);
