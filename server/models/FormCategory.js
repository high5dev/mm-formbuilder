const mongoose = require("mongoose");
const formCategorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref:'auths',
      required: true,
    },
    organizationId:{
      type:mongoose.Types.ObjectId,
      ref:"organizations",
      default:null
    },
    creatorType:{
      type:String,
      default:'user'
    },
    name: { type: String, require: true },
    type: { type: String, require: true },
    labelColor: {
      type: String,
      default: "primary",
    }

  },

  { timestamps: true }
);

module.exports = mongoose.model("formCategory", formCategorySchema);
