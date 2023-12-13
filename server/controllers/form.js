// model
const { default: mongoose } = require("mongoose");
const asyncHandler = require("express-async-handler");
const {
 Entry,
 Form,
 FormPage
} = require("../models/index/index");
const googleCloudStorageWebBuilder = require("../Utilities/googleCloudStorageWebBuilder");

exports.createForm = asyncHandler(async (req, res) => {
  try {
    const { organization } = req.headers;
    const user = req.user;
    const {elements, name, pageId, websiteId} = req.body;
    const formData = {
        elements,
        name,
        userId: mongoose.Types.ObjectId(req.user._id),
        organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
        creatorType: organization
          ? user.organizations.find((x) => x.organizationId.toString() === organization).userType
          : user.userType,
        pageId:mongoose.Types.ObjectId(pageId),
        websiteId:mongoose.Types.ObjectId(websiteId)
      };
    const form= await Form.create(formData);
    const formPageData={
      formId:form._id,
      userId: mongoose.Types.ObjectId(req.user._id)
    };
    const formPage=await FormPage.create(formPageData);
    const blankPageData = "<body></body><style></style>"
    await googleCloudStorageWebBuilder.createAndUpdatePage(`${form._id}/${formPage._id}`, blankPageData);
    if(form){
      return res.send({
        success:true,
        data:{
          form:form,
          formPage:formPage
        },
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

exports.getForms = asyncHandler(async (req, res) => {
    try {
      const { organization } = req.headers;
      const user = req.user;
      let query = {
          userId: mongoose.Types.ObjectId(user._id),
          organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
          isDelete: false,
      };
      const data = await Form.aggregate([
        {$match: query},
        {
          $lookup: {
            from: "form-pages",
            localField: "_id",
            foreignField: "formId",
            as: "pageInfo",
          }
        }
      ]);
  
      return res.status(200).json({ success: true, data: data});
    } catch (err) {
      res.status(500).send({ msg: err.message });
    }
  });

exports.deleteForm = asyncHandler(async (req, res) => {
let { id } = req.params;
try {
    id = mongoose.Types.ObjectId(id);
    await Form.findByIdAndUpdate(id, { isDelete: true });
    res.status(200).json({ success: true });
} catch (err) {
    res.send({ msg: err.message.replace(/\'/g, ""), success: false });
}
});

exports.editForm = asyncHandler(async (req, res) => {
  let { id } = req.params;
  try {
    const Obj=req.body;
    let {currentPage, html, css}=req.body;
    delete Obj.currentPage;
    id = mongoose.Types.ObjectId(id);
    currentPage=mongoose.Types.ObjectId(currentPage);
    const _page=await FormPage.findOne({_id: currentPage});
    const data = await Form.findOneAndUpdate({ _id: id}, Obj, {new:true});
    await googleCloudStorageWebBuilder.createAndUpdatePage(`${data._id}/${_page._id}`, `${html} <style>${css}</style>`);
    const page=await googleCloudStorageWebBuilder.readPage(`${data._id}/${_page._id}`);
    if (data) {
      return res.send({ 
        success: true, 
        data,
        page
     });
    }
    else{
      return res.status(404).json({ success: false, message: `website with id: ${id} not found` });
    }
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});

exports.getFormPage = asyncHandler(async (req, res) => {
  let { id } = req.params;
  try {
    let {currentPage}=req.query;
    id = mongoose.Types.ObjectId(id);
    currentPage=mongoose.Types.ObjectId(currentPage);
    console.log('id', id);
    console.log('currentPage', currentPage);
    const _page=await FormPage.findOne({_id: currentPage});
    const data = await Form.findOne({_id:id});
    const page=await googleCloudStorageWebBuilder.readPage(`${data._id}/${_page._id}`);
    if (data) {
      return res.send({ 
        success: true, 
        page
     });
    }
    else{
      return res.status(404).json({ success: false, message: `website with id: ${id} not found` });
    }
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});


exports.getForm= asyncHandler(async(req, res) =>{
    const {id} =req.params;
    try{
      const data=await Form.findOne({_id:mongoose.Types.ObjectId(id)});
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

exports.getFormPreviewPage=asyncHandler(async(req, res) =>{
  let {id, pageId} = req.query;
  try {
    const data = await Form.findOne({_id: id});
    const page=await FormPage.findOne({_id:mongoose.Types.ObjectId(pageId)});
    if(data){
      const result=await googleCloudStorageWebBuilder.readPage(`${data._id}/${page._id}`);
      return res.status(200).json({ success: true, data:result});
    }
    return res.status(404).json({ success: false, message: `Page not found` });
  } catch (err) {
    res.send({ msg: "error" });
  }

})

exports.createFormPage = asyncHandler(async (req, res) => {
  const {formId} = req.body;
  try {
    const page=new FormPage({
        formId:mongoose.Types.ObjectId(formId),
        userId: mongoose.Types.ObjectId(req.user._id)
    });
    const newPage=await page.save();
    const blankPageData = "<body></body><style></style>"
    await googleCloudStorageWebBuilder.createAndUpdatePage(`${formId}/${newPage._id}`, blankPageData);
    return res.status(200).json({ success: true, data:newPage });


  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

exports.deleteFormPage =asyncHandler(async(req, res) =>{
  let { id } = req.params;
  try {
    const pageToDelete = await FormPage.findOneAndUpdate({_id: mongoose.Types.ObjectId(id)}, {isDelete: true});
    const data = await Form.findOne({_id: pageToDelete.formId});
    await googleCloudStorageWebBuilder.deletePage(`${data._id}/${pageToDelete._id}`);
    return res.status(200).json({ success: true, data:pageToDelete });
  } catch (err) {
    res.send({ msg: "error" });
  }
})

exports.uploadFile = asyncHandler(async (req, res) => {
  try {
    let url = "";
    if (req.file) {
      url = await GoogleCloudStorage.upload(req.file);
    }
    res.status(200).json({ success: "OK", data: url });
  } catch (error) {}
});
