const mongoose = require("mongoose");

const imageLibrarySchema = new mongoose.Schema(
    {
        userId:{
            type:mongoose.Types.ObjectId,
            ref:"auth"
        },
        image:{
            type:String
        },
        organizationId:{
            type:mongoose.Types.ObjectId,
            ref:"organizations",
            default:null
        },
        creatorType:{
            type:String,
            default:"user"
        }
    },
    {timestamps:true,
        versionKey: false}
)
module.exports = mongoose.model("image-library", imageLibrarySchema);