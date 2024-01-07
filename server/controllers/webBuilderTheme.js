// model
const { default: mongoose } = require("mongoose");
const asyncHandler = require("express-async-handler");
const {
  WebBuilderTheme
} = require("../models/index/index");


exports.createTheme = asyncHandler(async (req, res) => {
  try {
    const { organization } = req.headers;
    const user = req.user;
    if (clonedFrom === 'blank') {
      const webThemeData = {
        ...req.body,
        userId: mongoose.Types.ObjectId(req.user._id),
        organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
        creatorType: organization
          ? user.organizations.find((x) => x.organizationId.toString() === organization).userType
          : user.userType,
      };
      const themeData = await WebBuilderTheme.create(webThemeData);
      return res.send({
        success: true,
        message: "Theme created successfully",
        data: {
          themeData,
        },
      });
    } 
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

exports.updateTheme=asyncHandler(async(req, res)=>{
    let { id } = req.params;
    try {
      const Obj=req.body;
      id = mongoose.Types.ObjectId(id);
      const data = await WebBuilderTheme.findOneAndUpdate({ _id: id}, Obj, {new:true});
      if (data) {
        return res.send({ 
          success: true, 
          data,
       });
      }
      else{
        return res.status(404).json({ success: false, message: `website with id: ${id} not found` });
      }
    } catch (error) {
      return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
    }
  
})

exports.addThemeColor=asyncHandler(async(req, res)=>{
  let { id } = req.params;
  try {
    const Obj=req.body;
    id = mongoose.Types.ObjectId(id);
    const data=await WebBuilderTheme.findOneAndUpdate({_id:id}, {$push: {"colors":{...Obj}}}, {new:true})
    if (data) {
      return res.send({ 
        success: true, 
        data,
     });
    }
    else{
      return res.status(404).json({ success: false, message: `website with id: ${id} not found` });
    }
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
})



