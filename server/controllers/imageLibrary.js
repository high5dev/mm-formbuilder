const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const { ImageLibrary } = require("../models/index");



exports.addImageLibrary = asyncHandler(async(req,res)=>{
    const userId = req.user._id;
    const user = req.user;
    const {organization} = req.headers;
    const {image} = req.body;
    const payload = {
        userId:mongoose.Types.ObjectId(userId),
        image,
        organizationId:organization?mongoose.Types.ObjectId(organization):null,
        creatorType:organization?user.organizations.find(x=>x.organizationId.toString()===organization).userType:user.userType
    }
    try {
        const data = await ImageLibrary.create(payload);
        console.log('data', data);
        if(data){
            res.status(200).json({ success: true });
        }
        else{
            res.status(200).json({ success: false, message:"Image didn't save" });
        }
    } catch (error) {
        res.send({ success: false, message: error.message.replace(/"/g, "") });
    }
})

exports.getUserImages = asyncHandler(async(req,res)=>{
    try {
        const user = req.user;
        const {organization} = req.headers;
        let q = {}
        if(organization){
            q = {
                $or:[
                    {
                        userId:mongoose.Types.ObjectId(user._id),
                        organizationId:mongoose.Types.ObjectId(organization),
                    },
                    {
                        creatorType:"admin",
                        organizationId:mongoose.Types.ObjectId(organization),
                    },
                    {
                        creatorType:"super-admin",
                    }
                ]
            }
        }
        else{
            q = {
                $or:[
                    {
                        userId:mongoose.Types.ObjectId(user._id),
                        organizationId:null,
                    },
                    {
                        creatorType:"super-admin",
                    }
                ]
            }
        }
        const data = await ImageLibrary.find(q)
        res.status(200).json({ success: true, data:data });
    } catch (error) {
        res.send({ success: false, message: error.message.replace(/"/g, "") });
    }
})


exports.delImageFromLibrary=asyncHandler(async(req, res) =>{
    const {id}=req.params;
    try{
        const data = await ImageLibrary.findByIdAndDelete(mongoose.Types.ObjectId(id));
        return res.send({
            success: true,
            message: "Image deleted successfully",
            data: data,
          });
    }
    catch(error){
        return res.status(500).json({ success: false, message: error.message.replace(/"/g, "") });
    }
})