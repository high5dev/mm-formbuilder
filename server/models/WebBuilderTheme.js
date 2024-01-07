// declare mongoose
const mongoose = require("mongoose");
const WebBuilderThemeSchema = new mongoose.Schema(
  {
    websiteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "web-builders",
      required: true,
    },
    colors:[
        {
            name: {
                type: String,
                required: true,
            },
            value:{
                type: String
            }
        }
    ],
    image:
      {
        type:{
          type:String,
          required:true
        },
        attributes:{
          type: Object
        }
    },
    buttons:[
      {
        type:{
          type:String,
          required:true
        },
        attributes:{
          type: Object
        }
      }
    ],
    fonts:[
      {
        type:{
          type:String,
          required:true
        },
        attributes:{
          type: Object
        }
      }
    ],
    background:{
      backgroundColor:{
        type:String,
        required:true
      },
      pages:{
        type:Array
      }   
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("webbuilder-theme", WebBuilderThemeSchema);
