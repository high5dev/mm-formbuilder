// model
const { default: mongoose } = require("mongoose");
const asyncHandler = require("express-async-handler");
const {
  WebBuilder,
  FormEntry,
  User,
  Authenticate,
  WebPage,
  WebBlog,
  //Income,
  //Contact,
} = require("../models/index/index");

const whois = require("whois");
const { getFinanceCategoty, generateInvoiceNo } = require("../helper/finance");
//const Invoice = require("../models/Invoice");
const { userNotifyFormEmail, invoiceEmailTemplate } = require("../constants/emailTemplates");
const { SendMail } = require("../service/sendMail");
const { getContactTypesHelper } = require("../helper/contacts");
const {postMoment}=require('../Utilities/timeHandler');

const googleCloudStorageWebBuilder = require("../Utilities/googleCloudStorageWebBuilder");

/**
 *
 * @desc Create WebBuilder Controller
 * @route POST /api/formBuilder/create
 * @returns 201: {msg: "success", data:{}}, 500  {errors: { common: { msg: err.message } }},
 */
// eslint-disable-next-line consistent-return

exports.createWebsite = asyncHandler(async (req, res) => {
  try {
    const { organization } = req.headers;
    const user = req.user;
    const { clonedFrom, formData } = req.body;
    if (clonedFrom === 'blank') {
      delete req.body.formData;
      const webData = {
        ...req.body,
        clonedFrom: 'blank',
        userId: mongoose.Types.ObjectId(req.user._id),
        organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
        creatorType: organization
          ? user.organizations.find((x) => x.organizationId.toString() === organization).userType
          : user.userType,
      };
      const websiteData = await WebBuilder.create(webData);
      const {name, html, css, step, path}=formData[0];
      const page_path="/"+websiteData._id+"/"+name;
      const pageData={
        name,
        step,
        path:page_path,
        websiteId: websiteData._id,
        userId: mongoose.Types.ObjectId(req.user._id)
      };
      const newPage = await WebPage.create(pageData);
      const blankPageData = "<body></body><style></style>"
      await googleCloudStorageWebBuilder.createAndUpdatePage(`${websiteData._id}/${newPage._id}`, blankPageData);
      const templateBlogs=[
        {
          name: 'Maria Cole',
          title: 'Now you can blog from everywhere',
          avatar: 'https://i.ibb.co/yWzNT3Q/2-3.png',
          description: 'We made it quick and convenient for you to manage blog',
          imageUrl: 'https://i.ibb.co/kGBQfB3/images.jpg'
        },
        {
          name: 'Maria Cole',
          title: 'Grow Your Blog Community',
          avatar: 'https://i.ibb.co/yWzNT3Q/2-3.png',
          description: 'We made it quick and convenient for you to manage blog',
          imageUrl: 'https://i.ibb.co/rGqqZtF/2.jpg'
        },
        {
          name: 'Maria Cole',
          title: 'Let us have more information',
          avatar: 'https://i.ibb.co/yWzNT3Q/2-3.png',
          description: 'We made it quick and convenient for you to manage blog',
          imageUrl: 'https://i.ibb.co/bgfqQWN/3.jpg'
        }
      ];
      for(let i=0; i<templateBlogs.length; i++){
        const _blog=templateBlogs[i];
        const blogData = {
          ..._blog,
          pageName:'Home',
          websiteId:mongoose.Types.ObjectId(websiteData._id),
          userId: mongoose.Types.ObjectId(req.user._id),
          organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
          creatorType: organization
              ? user.organizations.find((x) => x.organizationId.toString() === organization).userType
              : user.userType,
          isTemplate:true
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
        await googleCloudStorageWebBuilder.createAndUpdatePage(`${websiteData._id}/${data._id}`, pageData);
      }

      return res.send({
        success: true,
        message: "Website created successfully",
        data: {
          websiteData,
          formData:newPage
        },
      });
    } else if (clonedFrom === 'default') {
      const webData = {
        ...req.body,
        clonedFrom: null,
        userId: mongoose.Types.ObjectId(req.user._id),
        organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
        creatorType: organization
          ? user.organizations.find((x) => x.organizationId.toString() === organization).userType
          : user.userType,
      }
      const data = await WebBuilder.create(webData);

      const pageData = [
        {
          name: 'Home',
          path: 'home',
          step: 1,
          websiteId: data._id,
        },
        {
          name: 'Contact Us',
          path: 'contact-us',
          step: 2,
          websiteId: data._id,
        },
        {
          name: 'About',
          path: 'about',
          step: 3,
          websiteId: data._id,
        },
      ];
      const newPages = await WebPage.create(pageData);

      const newData = [];
      for (const d of newPages) {
        const blankPageData = "<body></body><style></style>"
        await googleCloudStorageWebBuilder.createAndUpdatePage(`${data._id}/${d._id}`, blankPageData);
        newData.push({
          [d._id]: blankPageData
        });
      }
      
      return res.send({
        success: true,
        message: "Website created successfully",
        data: {
          ...data,
          newPages,
          pageData: newData,
        }
      });
    } else {
      const webToClone = await WebBuilder.findOne({_id: mongoose.Types.ObjectId(clonedFrom)});
      const pagesToClone = await WebPage.findOne({websiteId: webToClone._id});

      const webData = {
        ...req.body,
        clonedFrom: mongoose.Types.ObjectId(clonedFrom),
        userId: mongoose.Types.ObjectId(req.user._id),
        organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
        creatorType: organization
          ? user.organizations.find((x) => x.organizationId.toString() === organization).userType
          : user.userType,
      };

      const data = await WebBuilder.create(webData);
      const newPageData = pagesToClone.map(e => {
        const tempPage = {...e};
        delete tempPage._id;
        delete tempPage.createdAt;
        delete tempPage.updatedAt;
        return {
          ...tempPage,
          websiteId: data._id,
        };
      });
      const newPages = await WebPage.create(newPageData);      

      const pageData = [];
      for (const page of newPages) {
        const tempData = await googleCloudStorageWebBuilder.copyPage(`${webToClone._id}/${page._id}`, `${data._id}/${page._id}`);
        pageData.push({[page._id]: tempData.toString()});
      }

      return res.send({
        success: true,
        message: "Website created successfully",
        data: {
          ...data,
          newPages,
          pageData,
        }
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

exports.duplicateWebsite = asyncHandler (async(req, res) => {
  try{
    const {id, name}=req.body;
    const { organization } = req.headers;
    const user = req.user;
    const webToClone = await WebBuilder.findOne({_id: mongoose.Types.ObjectId(id)});
    const pagesToClone = await WebPage.find({websiteId: mongoose.Types.ObjectId(webToClone._id)});

    const temp_webData=JSON.parse(JSON.stringify(webToClone));
    delete temp_webData._id;
    delete temp_webData.userId;
    delete temp_webData.isPublish;
    delete temp_webData.organizationId;
    const webData = {
      ...temp_webData,
      name,
      isPublish:false,
      userId: mongoose.Types.ObjectId(req.user._id),
      organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
      creatorType: organization
        ? user.organizations.find((x) => x.organizationId.toString() === organization).userType
        : user.userType,
    };
    const websiteData = await WebBuilder.create(webData);
    const newPageData = pagesToClone.map(e => {
      const tempPage = JSON.parse(JSON.stringify(e));
      delete tempPage._id;
      delete tempPage.createdAt;
      delete tempPage.updatedAt;
      return {
        ...tempPage,
        websiteId: mongoose.Types.ObjectId(websiteData._id),
      };
    });
    let pageData=[];
    for(let i=0; i<newPageData.length; i++){
      const page=await WebPage.create(newPageData[i]);
      pageData.push(page);   
    };
    for (let i=0; i<pageData.length; i++) {
      const result=await googleCloudStorageWebBuilder.readPage(`${webToClone._id}/${pagesToClone[i]._id}`);
      await googleCloudStorageWebBuilder.createAndUpdatePage(`${websiteData._id}/${pageData[i]._id}`, result);
    };
    // console.log('website ===== >data', websiteData);
    return res.send({
      success: true,
      message: "Website duplicated successfully",
      data: {
        websiteData,
        formData:pageData
      },
    });
  }
  catch(error){
    res.status(500).send({ msg: err.message });
  }

})

exports.editWebsite = asyncHandler(async (req, res) => {
  let { id } = req.params;
  try {
    const Obj=req.body;
    id = mongoose.Types.ObjectId(id);
    const data = await WebBuilder.findOneAndUpdate({ _id: id}, Obj);
    console.log('edited data', data);
    if (data) {
      return res.send({ success: true, data });
    }
    else{
      return res.status(404).json({ success: false, message: `website with id: ${id} not found` });
    }
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});

exports.updateAllPages =asyncHandler(async(req, res)=>{
  let { id } = req.params;
  try {
    const pageData=req.body;
    id = mongoose.Types.ObjectId(id);
    for(let i=0; i<pageData.length;i++){
      const page=pageData[i];
      const {name, path, step, html, css}=page;
      const newPage = await WebPage.create({
        name,
        path,
        step,
        websiteId: mongoose.Types.ObjectId(id),
        userId: mongoose.Types.ObjectId(req.user._id)
      });
      await googleCloudStorageWebBuilder.createAndUpdatePage(`${id}/${newPage._id}`, `${html} <style>${css}</style>`);
    }
    return res.send({success:true});
    
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
})

exports.getWebSites = asyncHandler(async (req, res) => {
  try {
    const { organization } = req.headers;
    const user = req.user;
    const { template } = req.query;
    let query = {
        userId: mongoose.Types.ObjectId(user._id),
        organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
        isTemplate: template === "true" ? true : false,
        isDelete: false,
    };
    const data = await WebBuilder.aggregate([
      {$match: query},
      {
        $lookup: {
          from: "web-pages",
          localField: "_id",
          foreignField: "websiteId",
          as: "pageInfo",
        }
      }
    ]);

    return res.status(200).json({ success: true, data: data});
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
});

exports.getWebsite= asyncHandler(async(req, res) =>{
  const {id} =req.params;
  try{
    const websiteData=await WebBuilder.findOne({_id:id});
    if(websiteData){
      const pageData=await WebPage.find({websiteId:mongoose.Types.ObjectId(websiteData._id)});
      return res.send({
        success: true,
        message: "Website created successfully",
        data: {
          websiteData,
          formData:pageData
        },
      });
    }
  }
  catch(err){
    res.send({ msg: err.message.replace(/\'/g, ""), success: false });
  }
})

exports.deleteWebsite = asyncHandler(async (req, res) => {
  let { id } = req.params;
  try {
    id = mongoose.Types.ObjectId(id);
    const webToDelete = await WebBuilder.findByIdAndUpdate(id, { isDelete: true });
    await WebPage.updateMany({websiteId: id}, { isDelete: true });
    await googleCloudStorageWebBuilder.deleteWeb(webToDelete._id);

    res.status(200).json({ success: true });
  } catch (err) {
    res.send({ msg: err.message.replace(/\'/g, ""), success: false });
  }
});///////////////////////////////////////////////////////////////////

exports.renameWebsite =asyncHandler(async (req, res) =>{
  let {id} =req.params;
  const Obj=req.body; 
  try{
    id=mongoose.Types.ObjectId(id);
    const data=await WebBuilder.findOneAndUpdate({_id:id}, Obj, {new: true});
    if(data){
      return res.status(200).json({ success: true, data });
    }
    else{
      return res.status(404).json({ success: false, message: `website with id: ${id} not found` });
    }
  }
  catch(err){
    res.send({ msg: err.message.replace(/\'/g, ""), success: false });
  }
})

exports.createPage = asyncHandler(async (req, res) => {
  const {id, pageData} = req.body;
  try {
    const page = new WebPage({
      ...pageData,
      userId: mongoose.Types.ObjectId(req.user._id),
      websiteId: mongoose.Types.ObjectId(id),
    });
    const newPage = await page.save();
    const blankPageData = "<body></body><style></style>"
    await googleCloudStorageWebBuilder.createAndUpdatePage(`${id}/${newPage._id}`, blankPageData);
    return res.status(200).json({ success: true, data:newPage });
  } catch (err) {
    res.send({ msg: "error" });
  }
});

exports.updatePage = asyncHandler(async (req, res) => {
  let { id } = req.params;
  const { html, css, page} = req.body;
  try {
    const _page=await WebPage.findOne({_id: page});
    const data = await WebBuilder.findOne({_id: mongoose.Types.ObjectId(id)});
    const url=await googleCloudStorageWebBuilder.createAndUpdatePage(`${data._id}/${_page._id}`, `${html} <style>${css}</style>`);
    return res.status(200).json({ success: true, data, url });
  } catch (err) {
    res.send({ msg: "error" });
  }
});

exports.publishWebsite = asyncHandler(async (req, res) => {
  let { id } = req.params;
  const { html, css, page} = req.body;
  try {
    const _page=await WebPage.findOne({_id: page});
    const data=await WebBuilder.findOneAndUpdate({_id: mongoose.Types.ObjectId(id)}, {isPublish:true}, {new: true});
    const url=await googleCloudStorageWebBuilder.createAndUpdatePage(`${data._id}/${_page._id}`, `${html} <style>${css}</style>`);
    if(data){
      return res.status(200).json({ success: true, message: `Success`, data});
    }
  } catch (err) {
    res.send({ msg: "error" });
  }
});

exports.updatePageName = asyncHandler(async (req, res) => {
  let { id } = req.params;
  console.log('id============', id);
  try {
    const Obj=req.body;
    const _page=await WebPage.findOneAndUpdate({_id: mongoose.Types.ObjectId(id)}, Obj);
    console.log('_page----------', _page);
    if(_page){
      return res.status(200).json({ success: true, message: `Success`});
    }
    return res.status(404).json({ success: false, message: `Page not found` });
  } catch (err) {
    res.send({ msg: "error" });
  }
});

exports.deletePage = asyncHandler(async (req, res) => {
  let { id } = req.params;
  try {
    const pageToDelete = await WebPage.findOneAndUpdate({_id: mongoose.Types.ObjectId(id)}, {isDelete: true});
    const data = await WebBuilder.findOne({_id: pageToDelete.websiteId});
    await googleCloudStorageWebBuilder.deletePage(`${data._id}/${pageToDelete._id}`);

    return res.status(200).json({ success: true, data:pageToDelete });
  } catch (err) {
    res.send({ msg: "error" });
  }
});

exports.getPage = asyncHandler(async (req, res) => {
  let { id } = req.params;
  try {
    const page = await WebPage.findOne({_id: mongoose.Types.ObjectId(id)});
    const data = await WebBuilder.findOne({_id: page.websiteId});
    const result=await googleCloudStorageWebBuilder.readPage(`${data._id}/${page._id}`);
    return res.status(200).json({ success: true, data:result });
  } catch (err) {
    res.send({ msg: "error" });
  }
});

exports.getPublishPage = asyncHandler(async (req, res) => {
  let {id, pageName} = req.query;
  try {
    const data = await WebBuilder.findOne({_id: id});
    const page=await WebPage.findOne({name:pageName, websiteId:mongoose.Types.ObjectId(id)});
    if(data && data.isPublish){
      const result=await googleCloudStorageWebBuilder.readPage(`${data._id}/${page._id}`);
      return res.status(200).json({ success: true, data:result, pageInfo: page });
    }
    return res.status(404).json({ success: false, message: `Page not found` });
  } catch (err) {
    res.send({ msg: "error" });
  }
});

exports.getPreviewPage = asyncHandler(async (req, res) => {
  let {id, pageName} = req.query;
  try {
    const data = await WebBuilder.findOne({_id: id});
    const page=await WebPage.findOne({name:pageName, websiteId:mongoose.Types.ObjectId(id)});
    if(data){
      const result=await googleCloudStorageWebBuilder.readPage(`${data._id}/${page._id}`);
      return res.status(200).json({ success: true, data:result, pageInfo: page });
    }
    return res.status(404).json({ success: false, message: `Page not found` });
  } catch (err) {
    res.send({ msg: "error" });
  }
});

exports.getTemplates = asyncHandler(async (req, res) => {
  try {
    let id = req.user._id;
    let { organization } = req.headers;

    //get all templates that should show to user
    let q = {};
    if (organization) {
      q = {
        $or: [
          {
            userId: mongoose.Types.ObjectId(id),
            organizationId: mongoose.Types.ObjectId(organization),
            isTemplate: true,
            isDelete: false,
          },
          { isTemplate: true, creatorType: "super-admin", isDelete: false },
          {
            isTemplate: true,
            organizationId: mongoose.Types.ObjectId(organization),
            creatorType: "admin",
            isDelete: false,
          },
        ],
      };
    } else {
      q = {
        $or: [
          {
            userId: mongoose.Types.ObjectId(id),
            organizationId: null,
            isTemplate: true,
            isDelete: false,
          },
          { isTemplate: true, creatorType: "super-admin", organizationId: null, isDelete: false },
        ],
      };
    }
    const webData = await WebBuilder.aggregate([
      {
        $match: q
      },
      {
        $lookup: {
          from: "web-pages",
          localField: "_id",
          foreignField: "websiteId",
          as: "pageInfo",
        }
      }
    ]);

    const result = [];
    for (const d of webData) {
      const pageData = [];
      for (const p of d.pageInfo) {
        const pData = await googleCloudStorageWebBuilder.readPage(`${d._id}/${p._id}`);
        pageData.push(pData);
      }
      result.push({
        ...d,
        pageData,
      });
    }
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    res.send({ msg: "error" });
  }
});

