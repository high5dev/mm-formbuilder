// model
const { default: mongoose } = require("mongoose");
const asyncHandler = require("express-async-handler");
const fetch = require('node-fetch');
const { profileCollectionFields } = require('../constants/profileCollectionFields');

const {
  WebBuilder,
  WebsiteEntry,
  WebBuilderHistory,
  WebBuilderActivity,
  WebBuilderPageHistory,
  WebBuilderForm,
  WebBuilderTheme,
  Authenticate,
  WebPage,
  WebBuilderBlog,
  WebBuilderElementCategory,
  WebBuilderElement,
  WebSiteRole,
  WebSiteCollection,
  WebSiteDataSet,
  WebSiteConnection,
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
const { defaultRoles } = require('../constants/defaultRoles');
require("dotenv").config();
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
    const { clonedFrom, formData, colors, buttons, fonts, image, background} = req.body;
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
      const webThemeData={
        colors,
        buttons,
        fonts,
        image,
        background,
        websiteId: websiteData._id,
        userId: mongoose.Types.ObjectId(req.user._id),
        organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
        creatorType: organization
          ? user.organizations.find((x) => x.organizationId.toString() === organization).userType
          : user.userType,
      };
      const defaultTheme= await WebBuilderTheme.create(webThemeData);
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
        const data = await WebBuilderBlog.create(blogData);
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
      const formElements=[
        {
          mainMenu:'contact-forms',
          subMenu:'forms',
          category:'New Form',
          html:`<div></div>`,
          imageUrl:'https://i.ibb.co/zPyYX5q/1.png'
        },
        {
          mainMenu:'contact-forms',
          subMenu:'forms',
          category:'Add Existing Form',
          html:`<div></div>`,
          imageUrl:'https://i.ibb.co/6F2Z94x/2.png'
        }
      ];
      for (let i=0; i<formElements.length;i++){
        const mainMenu=formElements[i].mainMenu;
        const subMenu=formElements[i].subMenu;
        const category=formElements[i].category;
        const html=formElements[i].html;
        const imageUrl=formElements[i].imageUrl;
        const selectedCategory = await WebBuilderElementCategory.findOne({
          mainMenu,
          subMenu: subMenu || '',
          name: category,
        });
        if(selectedCategory===null){
          const newCategory = await WebBuilderElementCategory.create({
            mainMenu,
            subMenu: subMenu || '',
            name: category,
          });
          const newElement = await WebBuilderElement.create({
            userId: mongoose.Types.ObjectId(req.user._id),
            category: newCategory._id,
            html,
            imageUrl,
          });
        }
      }

      //create default roles related to website
      const defaultRoleDocs = [];
      defaultRoles.map(r => {
        defaultRoleDocs.push({
          ...r,
          userId: mongoose.Types.ObjectId(req.user._id),
          organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
          websiteId: mongoose.Types.ObjectId(websiteData._id),
          isDelete: false,
        });
      });
      await WebSiteRole.insertMany(defaultRoleDocs);

      const profileCollection = await WebSiteCollection.create({
        userId: mongoose.Types.ObjectId(user._id),
        organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
        websiteId: websiteData._id,
        name: "PROFILE",
        fields: profileCollectionFields,
        values: [],
        type: "single",
        isDelete: false,
        isProfile: true,
      });

      await WebSiteDataSet.create({
        userId: mongoose.Types.ObjectId(user._id),
        organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
        collectionId: profileCollection._id,
        name: "Profile Dataset",
      });

      return res.send({
        success: true,
        message: "Website created successfully",
        data: {
          websiteData,
          formData:newPage,
          defaultTheme
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
      const webThemeData={
        colors,
        buttons,
        fonts,
        image,
        background,
        websiteId: data._id,
        userId: mongoose.Types.ObjectId(req.user._id),
        organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
        creatorType: organization
          ? user.organizations.find((x) => x.organizationId.toString() === organization).userType
          : user.userType,
      };
      const defaultTheme= await WebBuilderTheme.create(webThemeData);
      const newData = [];
      for (const d of newPages) {
        const blankPageData = "<body></body><style></style>"
        await googleCloudStorageWebBuilder.createAndUpdatePage(`${data._id}/${d._id}`, blankPageData);
        newData.push({
          [d._id]: blankPageData
        });
      }
      
      //create default roles related to website
      const defaultRoleDocs = [];
      defaultRoles.map(r => {
        defaultRoleDocs.push({
          ...r,
          userId: mongoose.Types.ObjectId(req.user._id),
          organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
          websiteId: mongoose.Types.ObjectId(data._id),
          isDelete: false,
        });
      });
      await WebSiteRole.insertMany(defaultRoleDocs);

      const profileCollection = await WebSiteCollection.create({
        userId: mongoose.Types.ObjectId(user._id),
        organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
        websiteId: data._id,
        name: "PROFILE",
        fields: profileCollectionFields,
        values: [],
        type: "single",
        isDelete: false,
        isProfile: true,
      });

      await WebSiteDataSet.create({
        userId: mongoose.Types.ObjectId(user._id),
        organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
        collectionId: profileCollection._id,
        name: "Profile Dataset",
      });

      return res.send({
        success: true,
        message: "Website created successfully",
        data: {
          ...data,
          newPages,
          pageData: newData,
          defaultTheme:defaultTheme
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
      const webThemeData={
        colors,
        buttons,
        fonts,
        image,
        background,
        websiteId: data._id,
        userId: mongoose.Types.ObjectId(req.user._id),
        organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
        creatorType: organization
          ? user.organizations.find((x) => x.organizationId.toString() === organization).userType
          : user.userType,
      };
      const defaultTheme= await WebBuilderTheme.create(webThemeData);
      const pageData = [];
      for (const page of newPages) {
        const tempData = await googleCloudStorageWebBuilder.copyPage(`${webToClone._id}/${page._id}`, `${data._id}/${page._id}`);
        pageData.push({[page._id]: tempData.toString()});
      }

      //create default roles related to website
      const defaultRoleDocs = [];
      defaultRoles.map(r => {
        defaultRoleDocs.push({
          ...r,
          userId: mongoose.Types.ObjectId(req.user._id),
          organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
          websiteId: mongoose.Types.ObjectId(data._id),
          isDelete: false,
        });
      });
      await WebSiteRole.insertMany(defaultRoleDocs);

      const profileCollection = await WebSiteCollection.create({
        userId: mongoose.Types.ObjectId(user._id),
        organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
        websiteId: data._id,
        name: "PROFILE",
        fields: profileCollectionFields,
        values: [],
        type: "single",
        isDelete: false,
        isProfile: true,
      });

      await WebSiteDataSet.create({
        userId: mongoose.Types.ObjectId(user._id),
        organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
        collectionId: profileCollection._id,
        name: "Profile Dataset",
      });

      return res.send({
        success: true,
        message: "Website created successfully",
        data: {
          ...data,
          newPages,
          pageData,
          defaultTheme
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
  const {id, name}=req.body;
  const { organization } = req.headers;
  const user = req.user;

  try{
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
      clonedFrom: webToClone._id,
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
      const result = await googleCloudStorageWebBuilder.readPage(`${webToClone._id}/${pagesToClone[i]._id}`);
      await googleCloudStorageWebBuilder.createAndUpdatePage(`${websiteData._id}/${pageData[i]._id}`, result);
    };
    // console.log('website ===== >data', websiteData);

    //create default roles related to website
    const defaultRoleDocs = [];
    defaultRoles.map(r => {
      defaultRoleDocs.push({
        ...r,
        userId: mongoose.Types.ObjectId(req.user._id),
        organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
        websiteId: mongoose.Types.ObjectId(websiteData._id),
        isDelete: false,
      });
    });
    await WebSiteRole.insertMany(defaultRoleDocs);

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
    const data = await WebBuilder.findOneAndUpdate({ _id: id}, Obj, {new: true});
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
    const { template, currentPage, rowsPerPage } = req.query;
    let _currentPage=parseInt(currentPage);
    let _rowsPerPage=parseInt(rowsPerPage);
    let  skip=(_currentPage-1)*_rowsPerPage;
    let query = {
        userId: mongoose.Types.ObjectId(user._id),
        organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
        isTemplate: template === "true" ? true : false,
        isDelete: false,
    };
    const count = await WebBuilder.find(query).count();
    const data = await WebBuilder.aggregate([
      {$match: query},
      {
        $skip:skip
      },
      {
        $limit:_rowsPerPage
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

    return res.status(200).json({ success: true, data: data, count:count});
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
});

exports.getWebsite= asyncHandler(async(req, res) =>{
  const {id} =req.params;
  const { organization } = req.headers;
  const user = req.user;
  try{
    const websiteData=await WebBuilder.findOne({_id:id});
    if(websiteData){
      const themeData=await WebBuilderTheme.findOne({websiteId:mongoose.Types.ObjectId(websiteData._id)});
      const collectionData = await WebSiteCollection.findOne({ websiteId: mongoose.Types.ObjectId(id), isProfile: true });
      if(!collectionData) {
        await WebSiteCollection.create({
          userId: mongoose.Types.ObjectId(user._id),
          organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
          websiteId: mongoose.Types.ObjectId(id),
          name: "PROFILE",
          fields: profileCollectionFields,
          values: [],
          type: "single",
          isDelete: false,
          isProfile: true,
        });

        await WebSiteDataSet.create({
          userId: mongoose.Types.ObjectId(user._id),
          organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
          collectionId: collectionData._id,
          name: "Profile Dataset",
        });
      }

      const pageData=await WebPage.find({websiteId:mongoose.Types.ObjectId(websiteData._id), isDelete: false});
      let query = {
        userId: mongoose.Types.ObjectId(user._id),
        websiteId: mongoose.Types.ObjectId(id),
        organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
        isDelete: false,
      };
    const forms = await WebBuilderForm.aggregate([
      {$match: query},
      {
        $lookup: {
          from: "webbuilderform-pages",
          localField: "_id",
          foreignField: "formId",
          as: "pageInfo",
        }
      }
    ]);
      return res.send({
        success: true,
        data: {
          websiteData,
          formData:pageData,
          forms:forms,
          themeData:themeData
        },
      });
    }
  }
  catch(err){
    res.send({ msg: err.message.replace(/\'/g, ""), success: false });
  }
})

exports.getHistory= asyncHandler(async(req, res) =>{
  const {id} =req.params;
  let {pageNames} = req.query;
  const { organization } = req.headers;
  const user = req.user;
  try{
    const websiteData=await WebBuilder.findOne({_id:id});
    if(websiteData){
      //Total Site Viewed Amount
       const countSiteViewed=await WebBuilderHistory.find({websiteId:mongoose.Types.ObjectId(id)}).count();
       //Per Month Site Viewed Amount
       let countPerMonthSiteViewed=[];
       const year=new Date().getFullYear();
       for(let i=1; i<13; i++){
        const startDate=new Date(`${year}-${i}-1`);
        const endDate=new Date(`${year}-${i+1}-1`);
        const perMonthUniqueViewed=await WebBuilderHistory.aggregate([
          {
            $match:{
              websiteId:mongoose.Types.ObjectId(id),
              createdAt:
                {
                  $gte:startDate,
                  $lt:endDate
                }
            }
          }
        ]
        );
        countPerMonthSiteViewed.push({
          month:i,
          count:perMonthUniqueViewed.length
        })
       }
       const tempCountUniqueViewed=await WebBuilderHistory.aggregate([
        {$match: {websiteId:mongoose.Types.ObjectId(id)}},
        {"$group":{_id:"$ipAddress", count:{$sum:1}}}]);
        //Total Unique Site Viewed Amount
       let countUniqueViewed=0;
       tempCountUniqueViewed && tempCountUniqueViewed.map((_item)=>{
         countUniqueViewed+=_item.count;
       });
       //Per Month Unique Site Viewed Amount
       let countPerMonthUniqueViewed=[];
       for(let i=1; i<13; i++){
        const startDate=new Date(`${year}-${i}-1`);
        let endDate;
        if(i===12){
          endDate=new Date(`${year+1}-${1}-1`);
        }
        else{
          endDate=new Date(`${year}-${i+1}-1`);
        }
        const perMonthUniqueViewed=await WebBuilderHistory.distinct("ipAddress",
        { websiteId:mongoose.Types.ObjectId(id),
          createdAt:
          {
            $gte:startDate,
            $lt:endDate
          }
        }
        );
        countPerMonthUniqueViewed.push({
          month:i,
          count:perMonthUniqueViewed.length
        });
       }
       //Per page Viewed Amount
       let countPageViewed=[];
       const webPages=await WebPage.aggregate([
        {
          $match:{
            websiteId:mongoose.Types.ObjectId(id)
          }
        }
       ]);
       for(let i=0; i<webPages.length; i++){
         const pageName=webPages[i].name;
         const pageViewed=await WebBuilderPageHistory.find({ websiteId:mongoose.Types.ObjectId(id), pageName:pageName}).count();
         const item={
          pageName:pageName,
          amount:pageViewed
         };
         countPageViewed.push(item);
       };
       let query = {
        websiteId:mongoose.Types.ObjectId(id),
        isDelete: false,
      };
      const entryFilled = await WebsiteEntry.aggregate([
        {$match: query},
        {"$group":{_id:"$formId", count:{$sum:1}}}
      ]);
      const activityData=await WebBuilderActivity.aggregate([
        {
          $match: {
            websiteId:mongoose.Types.ObjectId(id)
          }
        },
        { $limit : 10 }
      ]);
      const historyData={
        countSiteViewed,
        countPerMonthSiteViewed,
        countUniqueViewed,
        countPerMonthUniqueViewed,
        countPageViewed,
        entryFilled,
        activityData
       };
       return res.send({
        success: true,
        data: {
          historyData
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

    await WebSiteCollection.updateMany({websiteId: id}, { isDelete: true });
    await WebSiteConnection.updateMany({websiteId: id}, { isDelete: true });

    //delete default roles related to website
    await WebSiteRole.updateMany({websiteId: id}, { isDelete: true });

    res.status(200).json({ success: true });
  } catch (err) {
    res.send({ msg: err.message.replace(/\'/g, ""), success: false });
  }
});

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

exports.createDynamicPage = asyncHandler(async (req, res) => {
  const {id, pageData, html, style} = req.body;
  try {
    const page = new WebPage({
      ...pageData,
      userId: mongoose.Types.ObjectId(req.user._id),
      websiteId: mongoose.Types.ObjectId(id),
    });
    const newPage = await page.save();
    const pageContent = `<body>${html}</body>${style}`;
    await googleCloudStorageWebBuilder.createAndUpdatePage(`${id}/${newPage._id}`, pageContent);
    return res.status(200).json({ success: true, data:newPage });
  } catch (err) {
    res.send({ msg: "error" });
  }
});

exports.createShopPages = asyncHandler(async (req, res) => {
  const {id, pageData} = req.body;
  try {
    let page = new WebPage({
      "organizationId": null,
      "name": "Shop",
      "path": `/${id}/Shop`,
      "step": 1,
      "isDelete": false,
      "type": "shop",
      "seoDetails": {
        "title": "Shop",
        "keywords": "Shop",
        "author": "Shop",
        "twitter": "Shop",
        "description": "Shop",
        "headCode": "Shop",
        "bodyCode": "Shop"
      },
      userId: mongoose.Types.ObjectId(req.user._id),
      websiteId: mongoose.Types.ObjectId(id),
    });
    let newPage = await page.save();
    let blankPageData = "<body></body><style></style>";
    let css = "* { box-sizing: border-box; } body {margin: 0;}*{box-sizing:border-box;}body{margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;}a{text-decoration-line:none;text-decoration-thickness:initial;text-decoration-style:initial;text-decoration-color:initial;color:black;}a:hover{color:blue;}.gridproductgallery{display:grid;column-gap:15px;row-gap:15px;width:100%;grid-template-columns:repeat(auto-fit, minmax(min(100%, 240px), 1fr));justify-items:center;}.product-item{width:240px;}.hover-overlay{position:relative;}.hover-overlay:hover .mask{opacity:1;}.shadow-1-strong{box-shadow:rgba(0, 0, 0, 0.2) 0px 4px 8px 0px;}.rounded{border-top-left-radius:0.25rem;border-top-right-radius:0.25rem;border-bottom-right-radius:0.25rem;border-bottom-left-radius:0.25rem;}.product-img1{width:240px !important;height:240px !important;}.product-img2{width:240px !important;height:240px !important;}.mask{position:absolute;top:0px;left:0px;width:100%;height:240px;opacity:0;transition-behavior:normal;transition-duration:0.3s;transition-timing-function:ease;transition-delay:0s;transition-property:opacity;}.quick-view{width:100%;height:50px;position:absolute;bottom:0px;background-color:white;display:flex;align-items:center;justify-content:center;color:black;}.product-cart{width:100%;height:50px;background-color:black;color:white;display:flex;align-items:center;justify-content:center;margin-top:20px;cursor:pointer;}@media (max-width: 1920px){.product-img2{width:337px;height:336.927px;}.gridproductgallery{column-gap:20px;}}";
    let html = '<body id="itm3"><div class="gridproductgallery"><div productId="product-1701651099438" class="product-item"><div class="bg-image hover-overlay ripple shadow-1-strong rounded" data-mdb-ripple-color="light" draggable="false"><img src="https://i.ibb.co/6br0NxL/1.png" class="product-img1" alt="Louvre" draggable="false"/><div class="product-hover" draggable="false"><div class="mask" draggable="false"><img src="https://i.ibb.co/6br0NxL/1.png" class="product-img2" draggable="false"/><div class="quick-view" draggable="false">Quick View</div></div></div><div class="product-name" draggable="false">Product 1</div><div class="product-price" draggable="false">USD100</div><div class="product-cart" draggable="false">Add to cart</div></div></div><div productId="product-1701651099439" class="product-item"><div class="bg-image hover-overlay ripple shadow-1-strong rounded" data-mdb-ripple-color="light" draggable="false"><img src="https://i.ibb.co/6br0NxL/1.png" class="product-img1" alt="Louvre" draggable="false"/><div class="product-hover" draggable="false"><div class="mask" draggable="false"><img src="https://i.ibb.co/6br0NxL/1.png" class="product-img2" draggable="false"/><div class="quick-view" draggable="false">Quick View</div></div></div><div class="product-name" draggable="false">Product 2</div><div class="product-price" draggable="false">USD100</div><div class="product-cart" draggable="false">Add to cart</div></div></div><div productId="product-1701651099440" class="product-item"><div class="bg-image hover-overlay ripple shadow-1-strong rounded" data-mdb-ripple-color="light" draggable="false"><img src="https://i.ibb.co/6br0NxL/1.png" class="product-img1" alt="Louvre" draggable="false"/><div class="product-hover" draggable="false"><div class="mask" draggable="false"><img src="https://i.ibb.co/6br0NxL/1.png" class="product-img2" draggable="false"/><div class="quick-view" draggable="false">Quick View</div></div></div><div class="product-name" draggable="false">Product 3</div><div class="product-price" draggable="false">USD100</div><div class="product-cart" draggable="false">Add to cart</div></div></div><div productId="product-1701651099441" class="product-item"><div class="bg-image hover-overlay ripple shadow-1-strong rounded" data-mdb-ripple-color="light" draggable="false"><img src="https://i.ibb.co/6br0NxL/1.png" class="product-img1" alt="Louvre" draggable="false"/><div class="product-hover" draggable="false"><div class="mask" draggable="false"><img src="https://i.ibb.co/6br0NxL/1.png" class="product-img2" draggable="false"/><div class="quick-view" draggable="false">Quick View</div></div></div><div class="product-name" draggable="false">Product 4</div><div class="product-price" draggable="false">USD100</div><div class="product-cart" draggable="false">Add to cart</div></div></div><div productId="item-1702529927026" class="product-item"><div class="bg-image hover-overlay ripple shadow-1-strong rounded" data-mdb-ripple-color="light" draggable="false"><img src="asdsad" class="product-img1" alt="Louvre" draggable="false"/><div class="product-hover" draggable="false"><div class="mask" draggable="false"><img src="https://i.ibb.co/6br0NxL/1.png" class="product-img2" draggable="false"/><div class="quick-view" draggable="false">Quick View</div></div></div><div class="product-name" draggable="false">dasd</div><div class="product-price" draggable="false">sadsadsadsad</div><div class="product-cart" draggable="false">Add to cart</div></div></div></div> </body>';
    await googleCloudStorageWebBuilder.createAndUpdatePage(`${id}/${newPage._id}`, `${html} <style>${css}</style>`);

    page = new WebPage({
      "organizationId": null,
      "name": "Product Page",
      "path": `/${id}/Product`,
      "step": 1,
      "isDelete": false,
      "type": "shop",
      "seoDetails": {
        "title": "Product Page",
        "keywords": "Product Page",
        "author": "Product Page",
        "twitter": "Product Page",
        "description": "Product Page",
        "headCode": "Product Page",
        "bodyCode": "Product Page"
      },
      userId: mongoose.Types.ObjectId(req.user._id),
      websiteId: mongoose.Types.ObjectId(id),
    });
    newPage = await page.save();
    html = `<body id="itm3"><div class="productpage" productId="" id="iwkf"><div draggable="false" class="product-content"><img src="https://i.ibb.co/6br0NxL/1.png" draggable="false" class="product-img"/></div><div draggable="false" class="product-content"><div draggable="false" class="product-name">I'm a product</div><div draggable="false" class="product-price">USD 100</div><div draggable="false" class="product-quantity-title">Quantity</div><input type="number" pattern="[0-9]*" data-hook="number-input-spinner-input" aria-label="Quantity" max="99999" min="1" value="1" draggable="false" class="product-quantity"/><div draggable="false" class="product-item-cart">Add to cart</div><div draggable="false" class="product-detail">asdf</div></div></div> </body>`;
    css = `* { box-sizing: border-box; } body {margin: 0;}*{box-sizing:border-box;}body{margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;}a{text-decoration-line:none;text-decoration-thickness:initial;text-decoration-style:initial;text-decoration-color:initial;color:black;}a:hover{color:blue;}.productpage{width:100%;max-width:1440px;padding-left:20px;padding-right:20px;display:flex;align-items:center;}.product-content {width: 50%;display: flex;flex-direction: column;}.product-content.align1 {align-items: flex-start;}.product-content.align2 {align-items: center;}.product-content.align3 {align-items: flex-end;}.product-img{width:100%;height:100%;margin-inline-start: 0px;margin-inline-end: 0px;}.product-name{color:rgb(87, 87, 87);font-size:32px;line-height:1.2em;}.product-price{margin-top:10px;font-size:20px;}.product-quantity-title{margin-top:20px;font-size:14px;margin-bottom:8px;}.product-quantity{height:30px;}.product-item-cart{margin-top:32px;width:100%;height:40px;background-color:rgb(56, 74, 211);color:white;display:flex;align-items:center;justify-content:center;}`;
    await googleCloudStorageWebBuilder.createAndUpdatePage(`${id}/${newPage._id}`, `${html} <style>${css}</style>`);

    page = new WebPage({
      "organizationId": null,
      "name": "Cart Page",
      "path": `/${id}/Cart`,
      "step": 1,
      "isDelete": false,
      "type": "shop",
      "seoDetails": {
        "title": "Cart Page",
        "keywords": "Cart Page",
        "author": "Cart Page",
        "twitter": "Cart Page",
        "description": "Cart Page",
        "headCode": "Cart Page",
        "bodyCode": "Cart Page"
      },
      userId: mongoose.Types.ObjectId(req.user._id),
      websiteId: mongoose.Types.ObjectId(id),
    });
    newPage = await page.save();
    css = `* { box-sizing: border-box; } body {margin: 0;}*{box-sizing:border-box;}body{margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;}a{text-decoration-line:none;text-decoration-thickness:initial;text-decoration-style:initial;text-decoration-color:initial;color:black;}a:hover{color:blue;}.cartpage{margin-top:2rem;background-color:rgb(255, 255, 255);border-top-left-radius:4px;border-top-right-radius:4px;border-bottom-right-radius:4px;border-bottom-left-radius:4px;max-width:1440px;width:100%;}.cart-content{display:flex;justify-content:space-between;width:100%;}.cart{flex-grow:3;flex-shrink:1;flex-basis:0%;padding-top:1rem;padding-right:1rem;padding-bottom:1rem;padding-left:1rem;}.cart-title{font-size:1.5rem;color:rgb(51, 51, 51);}.cart-item img{max-width:100px;height:auto;margin-right:1rem;}.order-summary{flex-grow:1;flex-shrink:1;flex-basis:0%;padding-top:1rem;padding-right:1rem;padding-bottom:1rem;padding-left:1rem;border-left-width:1px;border-left-style:solid;border-left-color:rgba(0, 0, 0, 0.2);}.order-summary-title{font-size:1.5rem;color:rgb(51, 51, 51);}.summary-items{margin-top:1rem;}.summary-item{display:flex;justify-content:space-between;font-size:1.2rem;color:rgb(51, 51, 51);margin-bottom:0.5rem;}.total{display:flex;justify-content:space-between;font-size:1.5rem;color:rgb(51, 51, 51);margin-top:1rem;border-top-width:1px;border-top-style:solid;border-top-color:rgba(0, 0, 0, 0.2);padding-top:1rem;}.checkout-button{margin-top:1rem;text-align:center;background-color:rgb(56, 80, 211);color:rgb(255, 255, 255);border-top-width:initial;border-right-width:initial;border-bottom-width:initial;border-left-width:initial;border-top-style:none;border-right-style:none;border-bottom-style:none;border-left-style:none;border-top-color:initial;border-right-color:initial;border-bottom-color:initial;border-left-color:initial;border-image-source:initial;border-image-slice:initial;border-image-width:initial;border-image-outset:initial;border-image-repeat:initial;padding-top:0.5rem;padding-right:1rem;padding-bottom:0.5rem;padding-left:1rem;font-size:1.2rem;border-top-left-radius:4px;border-top-right-radius:4px;border-bottom-right-radius:4px;border-bottom-left-radius:4px;cursor:pointer;}.cart-item{display:flex;align-items:center;margin-top:1rem;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:rgba(0, 0, 0, 0.2);padding-bottom:1rem;}.product-name{font-size:1.2rem;color:rgb(51, 51, 51);}.product-price{font-size:1rem;color:rgb(51, 51, 51);}.cart-item-quantity{display:flex;align-items:center;margin-left:auto;}.quantity-input{width:40px;text-align:center;border-top-width:1px;border-right-width:1px;border-bottom-width:1px;border-left-width:1px;border-top-style:solid;border-right-style:solid;border-bottom-style:solid;border-left-style:solid;border-top-color:rgb(51, 51, 51);border-right-color:rgb(51, 51, 51);border-bottom-color:rgb(51, 51, 51);border-left-color:rgb(51, 51, 51);border-image-source:initial;border-image-slice:initial;border-image-width:initial;border-image-outset:initial;border-image-repeat:initial;border-top-left-radius:4px;border-top-right-radius:4px;border-bottom-right-radius:4px;border-bottom-left-radius:4px;margin-top:0px;margin-right:0.5rem;margin-bottom:0px;margin-left:0.5rem;padding-top:0.2rem;padding-right:0.2rem;padding-bottom:0.2rem;padding-left:0.2rem;font-size:1rem;}.increment{background-color:rgb(51, 51, 51);color:rgb(255, 255, 255);border-top-width:initial;border-right-width:initial;border-bottom-width:initial;border-left-width:initial;border-top-style:none;border-right-style:none;border-bottom-style:none;border-left-style:none;border-top-color:initial;border-right-color:initial;border-bottom-color:initial;border-left-color:initial;border-image-source:initial;border-image-slice:initial;border-image-width:initial;border-image-outset:initial;border-image-repeat:initial;cursor:pointer;padding-top:0.2rem;padding-right:0.5rem;padding-bottom:0.2rem;padding-left:0.5rem;font-size:1rem;border-top-left-radius:4px;border-top-right-radius:4px;border-bottom-right-radius:4px;border-bottom-left-radius:4px;}.decrement{background-color:rgb(51, 51, 51);color:rgb(255, 255, 255);border-top-width:initial;border-right-width:initial;border-bottom-width:initial;border-left-width:initial;border-top-style:none;border-right-style:none;border-bottom-style:none;border-left-style:none;border-top-color:initial;border-right-color:initial;border-bottom-color:initial;border-left-color:initial;border-image-source:initial;border-image-slice:initial;border-image-width:initial;border-image-outset:initial;border-image-repeat:initial;cursor:pointer;padding-top:0.2rem;padding-right:0.5rem;padding-bottom:0.2rem;padding-left:0.5rem;font-size:1rem;border-top-left-radius:4px;border-top-right-radius:4px;border-bottom-right-radius:4px;border-bottom-left-radius:4px;}.cart-item-total{display:flex;flex-direction:column;align-items:center;justify-content:space-between;margin-left:1rem;}.total-price{font-size:1.2rem;color:rgb(51, 51, 51);margin-top:0.5rem;}.remove-item{color:red;font-size:1rem;cursor:pointer;margin-top:0.5rem;}`;
    html = `<body id="itm3"><div class="cartpage" productId="" productid="" id="ijym"><div class="cart-content"><div class="cart"><h2 class="cart-title">My cart</h2><div class="cart-items"></div></div><div class="order-summary"><h2 class="order-summary-title">Order summary</h2><div class="summary-items"><div class="summary-item"><span class="item-label">Subtotal</span><span class="item-value">USD 0</span></div><div class="summary-item"><span class="item-label">Delivery</span><span class="item-value">FREE</span></div></div><div class="total"><span class="total-label">Total</span><span class="total-value">USD 0</span></div><div class="checkout-button">Checkout</div></div></div></div> </body>`;
    await googleCloudStorageWebBuilder.createAndUpdatePage(`${id}/${newPage._id}`, `${html} <style>${css}</style>`);

    page = new WebPage({
      "organizationId": null,
      "name": "Thankyou Page",
      "path": `/${id}/Thankyou`,
      "step": 1,
      "isDelete": false,
      "type": "shop",
      "seoDetails": {
        "title": "Thankyou Page",
        "keywords": "Thankyou Page",
        "author": "Thankyou Page",
        "twitter": "Thankyou Page",
        "description": "Thankyou Page",
        "headCode": "Thankyou Page",
        "bodyCode": "Thankyou Page"
      },
      userId: mongoose.Types.ObjectId(req.user._id),
      websiteId: mongoose.Types.ObjectId(id),
    });
    newPage = await page.save();
    css = `* { box-sizing: border-box; } body {margin: 0;}*{box-sizing:border-box;}body{margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;}a{text-decoration-line:none;text-decoration-thickness:initial;text-decoration-style:initial;text-decoration-color:initial;color:black;}a:hover{color:blue;}.thankyoupage{display:flex;justify-content:center;}.thankyou-content{width:100%;max-width:740px;padding-left:10px;padding-right:10px;}.thankyou-title{font-style:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;font-kerning:auto;font-optical-sizing:auto;font-feature-settings:normal;font-variation-settings:normal;font-variant-position:normal;font-weight:normal;font-stretch:normal;font-size:28px;line-height:36px;font-family:avenir-lt-w01_35-light1475496, avenir-lt-w05_35-light, sans-serif;text-align:center;}.thankyou-mail{margin-top:16px;font-style:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;font-kerning:auto;font-optical-sizing:auto;font-feature-settings:normal;font-variation-settings:normal;font-variant-position:normal;font-weight:normal;font-stretch:normal;font-size:16px;line-height:24px;font-family:avenir-lt-w01_35-light1475496, avenir-lt-w05_35-light, sans-serif;text-align:center;}.thankyou-order{margin-top:16px;font-style:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;font-kerning:auto;font-optical-sizing:auto;font-feature-settings:normal;font-variation-settings:normal;font-variant-position:normal;font-weight:normal;font-stretch:normal;font-size:14px;line-height:20px;font-family:avenir-lt-w01_35-light1475496, avenir-lt-w05_35-light, sans-serif;text-align:center;}.thankyou-list{border-top-width:1px;border-right-width:1px;border-bottom-width:1px;border-left-width:1px;border-top-style:solid;border-right-style:solid;border-bottom-style:solid;border-left-style:solid;border-top-color:rgb(227, 227, 227);border-right-color:rgb(227, 227, 227);border-bottom-color:rgb(227, 227, 227);border-left-color:rgb(227, 227, 227);border-image-source:initial;border-image-slice:initial;border-image-width:initial;border-image-outset:initial;border-image-repeat:initial;margin-top:32px;padding-left:32px;padding-right:32px;padding-bottom:32px;}.product-item{padding-top:32px;padding-bottom:32px;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:rgba(44, 44, 43, 0.2);grid-template-columns:auto 1fr 0.5fr auto auto;grid-template-rows:auto;display:grid;}.product-name{font-style:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;font-kerning:auto;font-optical-sizing:auto;font-feature-settings:normal;font-variation-settings:normal;font-variant-position:normal;font-weight:normal;font-stretch:normal;font-size:16px;line-height:24px;font-family:avenir-lt-w01_35-light1475496, avenir-lt-w05_35-light, sans-serif;}.product-price{font-style:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;font-kerning:auto;font-optical-sizing:auto;font-feature-settings:normal;font-variation-settings:normal;font-variant-position:normal;font-weight:normal;font-stretch:normal;font-size:14px;line-height:20px;font-family:avenir-lt-w01_35-light1475496, avenir-lt-w05_35-light, sans-serif;margin-top:12px;}.product-qty{font-style:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;font-kerning:auto;font-optical-sizing:auto;font-feature-settings:normal;font-variation-settings:normal;font-variant-position:normal;font-weight:normal;font-stretch:normal;font-size:16px;line-height:24px;font-family:avenir-lt-w01_35-light1475496, avenir-lt-w05_35-light, sans-serif;}.product-total{font-style:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;font-kerning:auto;font-optical-sizing:auto;font-feature-settings:normal;font-variation-settings:normal;font-variant-position:normal;font-weight:normal;font-stretch:normal;font-size:16px;line-height:24px;font-family:avenir-lt-w01_35-light1475496, avenir-lt-w05_35-light, sans-serif;}.thankyou-detail{width:100%;display:flex;justify-content:space-between;margin-top:32px;}.thankyou-note{width:50%;}.note-title{font-style:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;font-kerning:auto;font-optical-sizing:auto;font-feature-settings:normal;font-variation-settings:normal;font-variant-position:normal;font-weight:normal;font-stretch:normal;font-size:14px;line-height:20px;font-family:avenir-lt-w01_35-light1475496, avenir-lt-w05_35-light, sans-serif;}.note-content{font-style:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;font-kerning:auto;font-optical-sizing:auto;font-feature-settings:normal;font-variation-settings:normal;font-variant-position:normal;font-weight:normal;font-stretch:normal;font-size:14px;line-height:20px;font-family:avenir-lt-w01_35-light1475496, avenir-lt-w05_35-light, sans-serif;}.thankyou-price{width:50%;font-style:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;font-kerning:auto;font-optical-sizing:auto;font-feature-settings:normal;font-variation-settings:normal;font-variant-position:normal;font-weight:normal;font-stretch:normal;font-size:14px;line-height:20px;font-family:avenir-lt-w01_35-light1475496, avenir-lt-w05_35-light, sans-serif;}.thankyou-subtotal{display:flex;justify-content:space-between;}.thankyou-delivery{margin-top:12px;display:flex;justify-content:space-between;}.thankyou-tax{margin-top:12px;display:flex;justify-content:space-between;}.thankyou-total{margin-top:20px;padding-top:10px;border-top-width:0px;border-right-width:0px;border-bottom-width:1px;border-left-width:0px;border-top-color:rgb(227, 227, 227);font-style:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;font-kerning:auto;font-optical-sizing:auto;font-feature-settings:normal;font-variation-settings:normal;font-variant-position:normal;font-weight:normal;font-stretch:normal;font-size:20px;line-height:28px;font-family:avenir-lt-w01_35-light1475496, avenir-lt-w05_35-light, sans-serif;display:flex;justify-content:space-between;}`;
    html = `<body id="itm3"><div class="thankyoupage" productId="" id="ihm3"><div class="thankyou-content"><div class="thankyou-title">Thank you, Customer Name</div><div class="thankyou-mail">You'll receive a confirmation email soon</div><div class="thankyou-order">Order number: 10000</div><div class="thankyou-list"><div class="product-lit"><div class="product-item"><div class="product-img"><img src="product.jpg" width="100" height="100"/></div><div class="product-detail"><div class="product-name">Product Name</div><div class="product-price">$0.00</div></div><div class="product-qty">Qty: 1</div><div class="product-total">$0.00</div></div></div><div class="thankyou-detail"><div class="thankyou-note"><div class="note-title">Note</div><div class="note-content">Your customer's note will show here.</div></div><div class="thankyou-price"><div class="thankyou-subtotal"><div class="subtotal-title">Subtotal</div><div class="subtotal-price">$0.00</div></div><div class="thankyou-delivery"><div class="delivery-title">Delivery</div><div class="delivery-price">Free</div></div><div class="thankyou-tax"><div class="tax-title">Sales Tax</div><div class="tax-price">$0.00</div></div><div class="thankyou-total"><div class="total-title">Total</div><div class="total-price">$0.00</div></div></div></div></div></div></div></body>`;
    await googleCloudStorageWebBuilder.createAndUpdatePage(`${id}/${newPage._id}`, `${html} <style>${css}</style>`);
    return res.status(200).json({ success: true });
  } catch (err) {
    res.send({ msg: "error" });
  }
});

exports.updatePage = asyncHandler(async (req, res) => {
  let { id } = req.params;
  const { html, css, page} = req.body;
  try {
    const _page = await WebPage.findOneAndUpdate({ _id: page }, { _id: page });
    const data = await WebBuilder.findOne({_id: mongoose.Types.ObjectId(id)});
    const url=await googleCloudStorageWebBuilder.createAndUpdatePage(`${data._id}/${_page._id}`, `${html} <style>${css}</style>`);
    return res.status(200).json({ success: true, data, url });
  } catch (err) {
    console.log(err);
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
    console.log(err);
    res.send({ msg: "error" });
  }
});

exports.updatePageName = asyncHandler(async (req, res) => {
  let { id } = req.params;
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
    const pageToDelete = await WebPage.findOneAndUpdate({_id: mongoose.Types.ObjectId(id)}, {isDelete: true}, {new: true});
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
  let {id, pageName, pageViewed, totalViewed} = req.query;
  const ipAddress = req.ip;
  try {
    const data = await WebBuilder.findOne({_id: id});
    const page = await WebPage.findOne({ name: pageName, websiteId: mongoose.Types.ObjectId(id), isDelete: false });
    if(totalViewed==="false"){
      const payload={
        websiteId:mongoose.Types.ObjectId(id),
        ipAddress:ipAddress
      };
      const siteHistory=await WebBuilderHistory.create(payload);
    }
    if(pageViewed==="false"){
      const payload={
        websiteId:mongoose.Types.ObjectId(id),
        pageName:pageName,
        ipAddress:ipAddress
      };
      const pageHistory=await WebBuilderPageHistory.create(payload);
    }
    if(data && data.isPublish){
      const result=await googleCloudStorageWebBuilder.readPage(`${data._id}/${page._id}`);
      return res.status(200).json({ success: true, data:result, pageInfo: page});
    }
    return res.status(404).json({ success: false, message: `Page not found` });
  } catch (err) {
    console.log(err);
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

exports.getWebsiteCounts = asyncHandler(async(req,res)=>{
  try {
    const user = req.user
    const {organization} = req.headers
    const data = await WebBuilder.find({
      userId: user._id,
      organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
      isDelete: false,
    });
    const count = {
      websites:data.filter(x=>x.isTemplate===false).length,
      templates:data.filter(x=>x.isTemplate===true).length
    }
    return res.status(200).json({ success: true, data:count });
  } catch (error) {
    console.log(error)
    res.status(500).send({ msg: error.message });
  }
})

exports.getGoogleFonts = asyncHandler(async (req, res) => {
  try {
    const response = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.GOOGLE_FONT_API_KEY}`);
    const data = await response.json();
    return res.status(200).json({ success: true, data:data });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
})