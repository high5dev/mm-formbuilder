const { SocialProofDisplayUrl } = require("../models/index/index");
const { default: mongoose } = require("mongoose");
const asyncHandler = require("express-async-handler");
const validUrl = require('valid-url'); 

exports.createDisplayUrl = asyncHandler(async (req, res) => {
  const { campaignId, url} = req.body;
  try {
    const user = req.user;
    let verification='inactive';
    if(validUrl.isUri(url)){
      verification='active';
    };
    const createDisplayUrl = new SocialProofDisplayUrl({
      userId: mongoose.Types.ObjectId(user._id),
      campaignId: mongoose.Types.ObjectId(campaignId),
      url,
      verification
    });
    const data = await createDisplayUrl.save();
    res.send({ success: true, message: "Url added successfully", data: data });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: error.message.replace(/"/g, "") });
  }
});


exports.getOneDisplayUrl = asyncHandler(async (req, res) => {
  try {
    const getOneUrl = await SocialProofDisplayUrl.findById(mongoose.Types.ObjectId(req.params.id));
    return res.send({
      success: true,
      message: "success",
      data: getOneUrl,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.getDisplayUrlList = asyncHandler(async (req, res) => {
  try {
    const getdata = await SocialProofDisplayUrl.find({campaignId:mongoose.Types.ObjectId(req.params.id)});
    return res.send({
      success: true,
      message: "success",
      data: getdata,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message.replace(/"/g, "") });
  }
});


exports.delDisplayUrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await SocialProofDisplayUrl.findByIdAndDelete(mongoose.Types.ObjectId(id));
    return res.send({
      success: true,
      message: "Goal data deleted successfully",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.delManyDisplayUrl=asyncHandler(async (req, res) => {
  const { ids, type, campaignId } = req.body;
  try {
    if(type){
      const data = await SocialProofDisplayUrl.deleteMany({campaignId:mongoose.Types.ObjectId(campaignId)});
      return res.send({
        success: true,
        message: "Urls deleted successfully",
        data: data,
      });
    }
    else{
      const data = await SocialProofDisplayUrl.deleteMany({_id:{$in:ids}});
      return res.send({
        success: true,
        message: "Urls deleted successfully",
        data: data,
      });
    }
   
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.updateDisplayUrl = asyncHandler(async (req, res) => {
  const { id, url } = req.body;
  try {
    const data=await SocialProofDisplayUrl.findById(mongoose.Types.ObjectId(id));
    let verification='inactive';
    if(validUrl.isUri(url)){
      verification='active';
    };
    data.url=url;
    data.verification=verification;
    await data.save();
    return res.send({
      success: true,
      message: "Display url updated successfully",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message.replace(/"/g, "") });
  }
});

