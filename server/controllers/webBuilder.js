// model
const { default: mongoose } = require("mongoose");
const asyncHandler = require("express-async-handler");
const {
  WebBuilder,
  FormEntry,
  User,
  Authenticate,
  WebPage,
  //Income,
  //Contact,
} = require("../models/index/index");

const whois = require("whois");
const { getFinanceCategoty, generateInvoiceNo } = require("../helper/finance");
//const Invoice = require("../models/Invoice");
const { userNotifyFormEmail, invoiceEmailTemplate } = require("../constants/emailTemplates");
const { SendMail } = require("../service/sendMail");
const { getContactTypesHelper } = require("../helper/contacts");

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
    const { clonedFrom } = req.body;
    if (clonedFrom === 'blank') {
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

      const pageData = {
        name: 'Home',
        path: 'home',
        step: 1,
      };
      const newPage = await WebPage.create({
        ...pageData,
        websiteId: data._id,
      });

      const blankPageData = "<body></body><style></style>"
      await googleCloudStorageWebBuilder.createAndUpdatePage(`${data._id}/${newPage.name}`, blankPageData);

      return res.send({
        success: true,
        message: "Website created successfully",
        data: {
          ...data,
          newPages: [newPage],
          pageData: [
            {[newPage._id]: blankPageData}
          ],
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
        await googleCloudStorageWebBuilder.createAndUpdatePage(`${data._id}/${d.name}`, blankPageData);
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
        const tempData = await googleCloudStorageWebBuilder.copyPage(`${webToClone._id}/${page.name}`, `${data._id}/${page.name}`);
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

exports.getWebSites = asyncHandler(async (req, res) => {
  try {
    const { organization } = req.headers;
    const user = req.user;
    const { template } = req.query;

    let query = {
        userId: user._id,
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

    const result = [];
    for (const d of data) {
      const pageData = [];
      for (const p of d.pageInfo) {
        const pData = await googleCloudStorageWebBuilder.readPage(`${d._id}/${p.name}`);
        pageData.push(pData);
      }
      result.push({
        ...d,
        pageData,
      });
    }

    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
});

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

exports.createPage = asyncHandler(async (req, res) => {
  let { id } = req.params;
  const { html, css, pageData } = req.body;
  try {
    const newPage = await WebPage.create({
      ...pageData,
      websiteId: mongoose.Types.ObjectId(id),
    });

    await googleCloudStorageWebBuilder.createAndUpdatePage(`${id}/${newPage.name}`, `${html} <style>${css}</style>`);

    return res.status(200).json({ success: true, data });
  } catch (err) {
    res.send({ msg: "error" });
  }
});

exports.updatePage = asyncHandler(async (req, res) => {
  let { id } = req.params;
  const { html, css, pageData } = req.body;
  try {
    const newPage = await WebPage.findOneAndUpdate({_id: mongoose.Types.ObjectId(id)}, pageData);
    const data = await WebBuilder.findOne({_id: newPage.websiteId});

    await googleCloudStorageWebBuilder.createAndUpdatePage(`${data._id}/${newPage.name}`, `${html} <style>${css}</style>`);

    return res.status(200).json({ success: true, data });
  } catch (err) {
    res.send({ msg: "error" });
  }
});

exports.deletePage = asyncHandler(async (req, res) => {
  let { id } = req.params;
  try {
    const pageToDelete = await WebPage.findOneAndUpdate({_id: mongoose.Types.ObjectId(id)}, {isDelete: true});
    const data = await WebBuilder.findOne({_id: pageToDelete.websiteId});

    await googleCloudStorageWebBuilder.deletePage(`${data._id}/${pageToDelete.name}`);

    return res.status(200).json({ success: true, data });
  } catch (err) {
    res.send({ msg: "error" });
  }
});

exports.getPage = asyncHandler(async (req, res) => {
  let { id } = req.params;
  try {
    const page = await WebPage.findOne({_id: mongoose.Types.ObjectId(id)});
    const data = await WebBuilder.findOne({_id: page.websiteId});

    await googleCloudStorageWebBuilder.readPage(`${data._id}/${pageToDelete.name}`);

    return res.status(200).json({ success: true, data });
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
        const pData = await googleCloudStorageWebBuilder.readPage(`${d._id}/${p.name}`);
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

