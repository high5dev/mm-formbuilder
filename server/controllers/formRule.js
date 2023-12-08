// model
const { default: mongoose } = require("mongoose");
const asyncHandler = require("express-async-handler");
const {
 FormRule,
 Form
} = require("../models/index/index");

exports.createFormRule = asyncHandler(async (req, res) => {
  try {
    const { organization } = req.headers;
    const user = req.user;
    const {formId, input, operators, output} = req.body;
    const formRule = {
        userId: mongoose.Types.ObjectId(req.user._id),
        organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
        creatorType: organization
          ? user.organizations.find((x) => x.organizationId.toString() === organization).userType
          : user.userType,
        formId: mongoose.Types.ObjectId(formId),
        input,
        operators,
        output
      };
    const data= await FormRule.create(formRule);
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

exports.getFormRules = asyncHandler(async (req, res) => {
    try {
      const { organization } = req.headers;
      const user = req.user;
      let query = {
          userId: mongoose.Types.ObjectId(user._id),
          organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
          isDelete: false,
      };
      const data = await FormRule.aggregate([
        {$match: query}
      ]);
  
      return res.status(200).json({ success: true, data: data});
    } catch (err) {
      res.status(500).send({ msg: err.message });
    }
  });


exports.deleteFormRule = asyncHandler(async (req, res) => {
let { id } = req.params;
try {
    id = mongoose.Types.ObjectId(id);
    await FormRule.findByIdAndUpdate(id, { isDelete: true });
    res.status(200).json({ success: true});
} catch (err) {
    res.send({ msg: err.message.replace(/\'/g, ""), success: false });
}
});


exports.editFormRule = asyncHandler(async (req, res) => {
  let { id } = req.params;
  try {
    const Obj=req.body;
    const data=await FormRule.findOneAndUpdate({_id: mongoose.Types.ObjectId(id)}, Obj, {new:true});
    console.log('data', data.input); 
      return res.send({ 
        success: true, 
        data: data
      });
    }

  catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});

exports.getFormRule= asyncHandler(async(req, res) =>{
    const {id} =req.params;
    try{
      const data=await FormRule.findOne({_id:mongoose.Types.ObjectId(id)});
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


