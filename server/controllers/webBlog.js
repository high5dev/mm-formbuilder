// model
const { default: mongoose } = require("mongoose");
const asyncHandler = require("express-async-handler");
const GoogleCloudStorage = require("../Utilities/googleCloudStorage");
const {
 WebBlog,
 WebBuilder
} = require("../models/index/index");
const {postMoment} = require('../Utilities/timeHandler');

const googleCloudStorageWebBuilder = require("../Utilities/googleCloudStorageWebBuilder");

/**
 *
 * @desc Create WebBuilder Controller
 * @route POST /api/formBuilder/create
 * @returns 201: {msg: "success", data:{}}, 500  {errors: { common: { msg: err.message } }},
 */
// eslint-disable-next-line consistent-return

exports.createBlog = asyncHandler(async (req, res) => {
  try {
    const { organization } = req.headers;
    const user = req.user;
    let imageUrl="";
    if (req.file) {
        imageUrl = await GoogleCloudStorage.upload(req.file);
    };
    const {websiteId}=req.body;
    delete req.body.websiteId;
    const blogData = {
      ...req.body,
      websiteId:mongoose.Types.ObjectId(websiteId),
      name:user.firstName+' '+ user.lastName,
      imageUrl:imageUrl,
      isTemplate:false,
      avatar:"https://i.ibb.co/7Sh09k6/avatar.png",
      userId: mongoose.Types.ObjectId(req.user._id),
      organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
      creatorType: organization
          ? user.organizations.find((x) => x.organizationId.toString() === organization).userType
          : user.userType,
    };
    const data = await WebBlog.create(blogData);
    const blogDate=postMoment(data.createdAt);
    const pageData=`
    <head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>
  <div class='main d-flex justify-content-around mt-3'>
    <div class='blog-container w-50 p-4 mt-4' style="border:1px solid lightgray">
      <div class='blog-header d-flex align-items-center'>
        <img src=${data.avatar} class='blog-avatar' width="100px"/>
        <div class='ms-2'>
          <h4>${data.name}</h4>
          <div>${blogDate}</div>
        </div>

      </div>
      <div class='blog-body mt-4'>
        <div class="blog-title">
          <h2 class='text-black'>${data.title}</h2>
        </div>
        <div class="blog-description fs-5 text-black">
          ${data.description}
        </div>
        <div class="blog-image d-flex justify-content-around mt-4">
          <img src=${data.imageUrl} width="70%"/>
        </div>
      </div>  
      <div class="blog-footer mt-4">
        <div class="social-comment d-flex p-2" style="border-top:1px solid lightgray; border-bottom: 1px solid lightgray">
          <img src="https://i.ibb.co/xCx4cQY/facebook.png" class="ms-4" width="20px"/>
          <img src="https://i.ibb.co/sJ6zSjV/linkedin.png" class="ms-4" width="20px"/>
          <img src="https://i.ibb.co/zGkfmkg/twitter.png" class="ms-4" width="20px"/>
        </div>
        <div class="post-comment p-2">
          <div class="customer-visit-history d-flex justify-content-between align-items-center">
            <div class="customer-visit-comment d-flex align-items-center">
              <img src="https://i.ibb.co/9TptRDC/eye.png" width="16px"height="16px"style="margin-right:5px"/>
              <div>0</div>
              <img src="https://i.ibb.co/YbVMJrd/message.png" width="16px" height="16px"                                                          															style="margin-left:20px; margin-right:5px"/>
              <div>0</div>
            </div>
            <img src="https://i.ibb.co/Zx2T8G3/heart.png" width="16px" height="16px"/>
          </div>
        </div>
      </div>
</body>
`
    await googleCloudStorageWebBuilder.createAndUpdatePage(`${websiteId}/${data._id}`, pageData);
    if(data){
        return res.send({
            success: true,
            message: "Blog created successfully",
            data:data
            });
        }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

exports.getPublishBlogPage = asyncHandler(async (req, res) => {
  let {id, blogId} = req.query;
  try {
    const page = await WebBlog.findOne({_id: mongoose.Types.ObjectId(blogId)});
    const data = await WebBuilder.findOne({_id: mongoose.Types.ObjectId(page.websiteId)});
    if(data){
      const result=await googleCloudStorageWebBuilder.readPage(`${data._id}/${page._id}`);
      return res.status(200).json({ success: true, data:result });
    }
  } catch (err) {
    res.send({ msg: "error" });
  }
});

exports.getPreviewBlogPage = asyncHandler(async (req, res) => {
  let {id, blogId} = req.query;
  try {
    const page = await WebBlog.findOne({_id: mongoose.Types.ObjectId(blogId)});
    const data = await WebBuilder.findOne({_id: mongoose.Types.ObjectId(page.websiteId)});
    if(data){
      const result=await googleCloudStorageWebBuilder.readPage(`${data._id}/${page._id}`);
      return res.status(200).json({ success: true, data:result });
    }
  } catch (err) {
    res.send({ msg: "error" });
  }
});

exports.getBlogs = asyncHandler(async (req, res) => {
    try {
      const { organization } = req.headers;
      const websiteId = req.params.id;
      const user = req.user;
      let query = {
          userId: mongoose.Types.ObjectId(user._id),
          organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
          isDelete: false,
          websiteId:mongoose.Types.ObjectId(websiteId)
      };
      const data = await WebBlog.aggregate([
        {$match: query},
        {
          $sort: {
            createdAt: -1,
          },
        },
      ]);
  
      return res.status(200).json({ success: true, data: data});
    } catch (err) {
      res.status(500).send({ msg: err.message });
    }
  });

exports.getBlog = asyncHandler(async(req, res) => {
  let { id } = req.params;
  try{
    const data=await WebBlog.findOne({_id:mongoose.Types.ObjectId(id)});
    if(data){
      return res.send({
        success:true,
        data
      })
    }

  }
  catch(error){

  }
})

  exports.deleteBlog = asyncHandler(async (req, res) => {
    let { id } = req.params;
    try{
        const blogToDelete = await WebBlog.findByIdAndUpdate(id, { isDelete: true });
        console.log('blogToDelete', blogToDelete);
        if(blogToDelete){
            res.status(200).json({ success: true });
        }
    }
    catch(err){
        res.send({ msg: err.message.replace(/\'/g, ""), success: false });
    }
  });

  exports.updateBlog = asyncHandler(async (req, res) => {
    let { id } = req.params;
    try{
        let imageUrl='';
        let payload={
            ...req.body
        }
        if (req.file) {
            imageUrl = await GoogleCloudStorage.upload(req.file);
            payload={...this.deleteBlogpayload, imageUrl:imageUrl};
        };
        const data = await WebBlog.findByIdAndUpdate({ _id: id}, payload,  {new: true});
        if(data){
            res.status(200).json({ success: true, data });
        }
    }
    catch(err){
        res.send({ msg: err.message.replace(/\'/g, ""), success: false });
    }
  });






