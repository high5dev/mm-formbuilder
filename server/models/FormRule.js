const mongoose = require("mongoose");
const formRuleSchema = new mongoose.Schema(
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
    formId:{
      type:mongoose.Schema.Types.ObjectId,
      default:null,
      ref:"forms"
    },
    input: [
      {
        field:{
          label:{
            type:String,
            required:true
          },
          value:{
            type:String,
            required:true
          }
        },
        condition:{
          label:{
            type:String,
            required:true
          },
          value:{
            type:String,
            required:true
          }
        },
        value:{
        }
      }
    ],
    operators:[
      {
        label: {
         type: String,
         required:true
        },
        value:{
          type:String,
          required:true
        }
      },
    ]
    ,
    output:[
      {
        field:[
         {
          label:{
            type:String,
            required:true
          },
          value:{
            type:String,
            required:true
          }
         }
        ],
        value:{
          label:{
            type:String,
          },
          value:{
            type:String,
            required:true
          }
        },
        outputIds:[]
      }
    ]
  },

  { timestamps: true }
);

module.exports = mongoose.model("form-rule", formRuleSchema);
