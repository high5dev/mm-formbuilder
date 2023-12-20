// model
const { default: mongoose } = require("mongoose");
const asyncHandler = require("express-async-handler");
const {
  WebsiteEntry, 
  Form
} = require("../models/index/index");

exports.createWebsiteEntry = asyncHandler(async (req, res) => {
  try {
    const {websiteId, pageName, formId, fields, values} = req.body;
    const websiteDataset = {
        websiteId:mongoose.Types.ObjectId(websiteId),
        formId:mongoose.Types.ObjectId(formId),
        pageName:pageName,
        fields:fields,
        values:values
      };
    const data= await WebsiteEntry.create(websiteDataset);
    if(data){
      return res.send({
        success:true,
        data:data,
        message:"created successfully"
      });
    }

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

exports.getWebsiteEntries = asyncHandler(async (req, res) => {
    try {
      const { organization } = req.headers;
      const user = req.user;
      let query = {
          userId: mongoose.Types.ObjectId(user._id),
          organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
          isDelete: false,
      };
      const data = await WebsiteEntry.aggregate([
        {$match: query}
      ]);
  
      return res.status(200).json({ success: true, data: data});
    } catch (err) {
      res.status(500).send({ msg: err.message });
    }
  });

exports.deleteWebsiteEntry = asyncHandler(async (req, res) => {
let { id } = req.params;
try {
    id = mongoose.Types.ObjectId(id);
    await WebsiteEntry.findByIdAndUpdate(id, { isDelete: true });
    res.status(200).json({ success: true});
} catch (err) {
    res.send({ msg: err.message.replace(/\'/g, ""), success: false });
}
});

exports.editWebsiteEntry = asyncHandler(async (req, res) => {
  let { id } = req.params;
  try {
    const Obj=req.body;
    const data=await WebsiteEntry.findOneAndUpdate({_id: mongoose.Types.ObjectId(id)}, Obj, {new:true});
      return res.send({ 
        success: true, 
        data: data
      });
    }

  catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});

exports.getWebsiteEntry= asyncHandler(async(req, res) =>{
    const {id} =req.params;
    try{
      let query = {
        _id: mongoose.Types.ObjectId(id),
        isDelete: false
      };
      const data = await Form.aggregate([
        {$match: query},
        {
          $lookup: {
            from: "website-entries",
            localField: "_id",
            foreignField: "formId",
            as: "entries",
          }
        }
      ]);
      if(data){
        return res.send({
          success: true,
          data:data
        });
      }
    }
    catch(err){
      res.send({ msg: err.message.replace(/\'/g, ""), success: false });
    }
  })

