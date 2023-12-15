// model
const { default: mongoose } = require("mongoose");
const asyncHandler = require("express-async-handler");
const {
  FormDataset
} = require("../models/index/index");

exports.createDataset = asyncHandler(async (req, res) => {
  try {
    const { organization } = req.headers;
    const user = req.user;
    const {websiteId, pageName, fields, values} = req.body;
    const formDataset = {
        userId: mongoose.Types.ObjectId(req.user._id),
        organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
        creatorType: organization
          ? user.organizations.find((x) => x.organizationId.toString() === organization).userType
          : user.userType,
        websiteId:mongoose.Types.ObjectId(websiteId),
        pageName:pageName,
        fields:fields,
        values:values
      };
    console.log('formDataset', formDataset);
    const data= await FormDataset.create(formDataset);
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

exports.getFormDatasets = asyncHandler(async (req, res) => {
    try {
      const { organization } = req.headers;
      const user = req.user;
      let query = {
          userId: mongoose.Types.ObjectId(user._id),
          organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
          isDelete: false,
      };
      const data = await FormDataset.aggregate([
        {$match: query}
      ]);
  
      return res.status(200).json({ success: true, data: data});
    } catch (err) {
      res.status(500).send({ msg: err.message });
    }
  });


exports.deleteFormDataset = asyncHandler(async (req, res) => {
let { id } = req.params;
try {
    id = mongoose.Types.ObjectId(id);
    await FormDataset.findByIdAndUpdate(id, { isDelete: true });
    res.status(200).json({ success: true});
} catch (err) {
    res.send({ msg: err.message.replace(/\'/g, ""), success: false });
}
});


exports.editFormDataset = asyncHandler(async (req, res) => {
  let { id } = req.params;
  try {
    const Obj=req.body;
    const data=await FormDataset.findOneAndUpdate({_id: mongoose.Types.ObjectId(id)}, Obj, {new:true});
      return res.send({ 
        success: true, 
        data: data
      });
    }

  catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});

exports.getFormDataset= asyncHandler(async(req, res) =>{
    const {id} =req.params;
    try{
      const data=await FormDataset.findOne({_id:mongoose.Types.ObjectId(id)});
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

