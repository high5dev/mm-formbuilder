const { FormCategory } = require("../models/index/index");
const { default: mongoose } = require("mongoose");
const asyncHandler = require("express-async-handler");

exports.createCategory = asyncHandler(async (req, res) => {
  const { name, type, labelColor } = req.body;
  try {
    const user = req.user;
    const { organization } = req.headers;
    const categoryObj = new FormCategory({
      userId: mongoose.Types.ObjectId(user._id),
      name,
      type,
      labelColor,
      creatorType: organization
        ? user.organizations.find((x) => x.organizationId.toString() === organization).userType
        : user.userType,
      organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
    });
    const data = await categoryObj.save();
    res.send({ success: true, message: "Category data created successfully", data: data });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.getOneCategory = asyncHandler(async (req, res) => {
  try {
    const getdata = await FormCategory.find(mongoose.Types.ObjectId(req.params.id));
    return res.send({
      success: true,
      message: "success",
      data: getdata,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.getAllCategories = asyncHandler(async (req, res) => {
  try {
    const { organization } = req.headers;
    const user = req.user;
    let q = {};
    if (organization) {
      q = {
        $or: [
          {
            userId: mongoose.Types.ObjectId(user._id),
            organizationId: mongoose.Types.ObjectId(organization),
          },
          {
            organizationId: mongoose.Types.ObjectId(organization),
            creatorType: "admin",
          },
          {
            organizationId: null,
            creatorType: "super-admin",
          },
        ],
      };
    } else {
      q = {
        $or: [
          {
            userId: mongoose.Types.ObjectId(user._id),
            organizationId: null,
          },
          {
            organizationId: null,
            creatorType: "super-admin",
          },
        ],
      };
    }
    const getAllCategories = await FormCategory.aggregate([
      {
        $match: { ...q },
      },
      {
        $lookup: {
          from: "form-builders",
          localField: "_id",
          foreignField: "subCategory",
          let: { isTemplate: true,isDelete:false },
          pipeline: [
            {
              $match: {
                $expr:{
                  $and:[
                    {$eq: ["$isTemplate", "$$isTemplate"]},
                    {$eq: ["$isDelete", "$$isDelete"]},
                  ]
                }
              },
            },
          ],
          as: "forms",
        },
      },
      {
        $addFields: { count: { $size: "$forms" } },
      },
      {
        $project: {
          forms: 0,
          __v: 0,
        },
      },
    ]);

    return res.send({
      success: true,
      message: "success",
      data: getAllCategories,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.updateCategory = asyncHandler(async (req, res) => {
  const { _id, name, labelColor,type } = req.body;
  try {
    let payload = {
      name,labelColor
    }
    if(type){
      payload = {...payload,type}
    }
    const data = await FormCategory.findByIdAndUpdate(mongoose.Types.ObjectId(_id), payload);
    return res.send({
      success: true,
      message: "Category data updated successfully",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await FormCategory.findByIdAndDelete(mongoose.Types.ObjectId(id));
    return res.send({
      success: true,
      message: "Category data deleted successfully",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message.replace(/"/g, "") });
  }
});
