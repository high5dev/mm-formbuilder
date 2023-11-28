// model
const { default: mongoose } = require("mongoose");
const asyncHandler = require("express-async-handler");
const {
  WebBuilder,
  Authenticate,
  WebPage,
  WebBuilderElement,
  WebBuilderElementCategory
} = require("../models/index/index");
const { response } = require("express");

exports.createElement = asyncHandler(async (req, res) => {
  let userId = req.user._id;
  const { category, mainMenu, subMenu, html, imageUrl } = req.body;

  try {
    const selectedCategory = await WebBuilderElementCategory.findOne({
      mainMenu,
      subMenu: subMenu || '',
      name: category,
    });

    if (selectedCategory) {
      const newElement = await WebBuilderElement.create({
        userId: mongoose.Types.ObjectId(userId),
        category: selectedCategory._id,
        html,
        imageUrl,
      });
  
      res.status(200).json({ success: true, data: newElement });
    } else {
      const newCategory = await WebBuilderElementCategory.create({
        mainMenu,
        subMenu: subMenu || '',
        name: category,
      });
      const newElement = await WebBuilderElement.create({
        userId: mongoose.Types.ObjectId(userId),
        category: newCategory._id,
        html,
        imageUrl,
      });
  
      res.status(200).json({ success: true, data: newElement });
    }
    
  } catch (err) {
    res.send({ msg: err.message.replace(/\'/g, ""), success: false });
  }
});

exports.getAllElements = asyncHandler(async (req, res) => {
  let userId = req.user._id;
  try {

    const elements = await WebBuilderElement.aggregate([
      {
        $match: {
          isDelete: false,
          // $or: [
          //   {
          //     userId: mongoose.Types.ObjectId(userId),
          //     isDelete: false,
          //   },
          //   {
          //     isDefault: true,
          //     isDelete: false,
          //   }
          // ]
        }
      },
      {
        $lookup: {
          from: "web-element-categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      // {
      //   $group: {
      //     _id: { mainMenu: "$category.mainMenu", subMenu: "$category.subMenu", category: "$category.name" },
      //     elements: { $push: "$$ROOT" },
      //   },
      // },
    ]);

    // const newElements = [];
    // elements.map((element) => {
    //   const mainIndex = newElements.findIndex(e => e.mainMenu === element._id.mainMenu);
    //   if (mainIndex === -1) {
    //     newElements.push({
    //       mainMenu: element._id.mainMenu,
    //       data: [
    //         {
    //           subMenu: element._id.subMenu,
    //           data: [
    //             {
    //               category: element._id.category,
    //               data: [
    //                 ...element.elements
    //               ],
    //             },
    //           ],
    //         },
    //       ],
    //     });
    //   } else {
    //     const subIndex = newElements[mainIndex].data.findIndex(e => e.subMenu === element._id.subMenu);
    //     if (subIndex === -1) {
    //       newElements[mainIndex].data.push({
    //         subMenu: element._id.subMenu,
    //         data: [
    //           {
    //             category: element._id.category,
    //             data: [
    //               ...element.elements
    //             ],
    //           },
    //         ],
    //       })
    //     } else {
    //       newElements[mainIndex].data[subIndex].data.push({
    //         category: element._id.category,
    //         data: [
    //           ...element.elements
    //         ],
    //       });
    //     }
    //   }
    // });

    res.status(200).json({ success: true, data: elements });
  } catch (err) {
    res.send({ msg: err.message.replace(/\'/g, ""), success: false });
  }
});

exports.updateElement = asyncHandler(async (req, res) => {
  let { id } = req.params;
  let userId = req.user._id;
  const payload = req.body;
  try {
    const updatedElement = await WebBuilderElement.findOneAndUpdate({_id: mongoose.Types.ObjectId(id)}, payload);
    res.status(200).json({ success: true, data: updatedElement });
  } catch (err) {
    res.send({ msg: err.message.replace(/\'/g, ""), success: false });
  }
});

exports.deleteElement = asyncHandler(async (req, res) => {
  let { id } = req.params;
  try {
    id = mongoose.Types.ObjectId(id);
    const webToDelete = await WebBuilderElement.findByIdAndUpdate(id, { isDelete: true });

    res.status(200).json({ success: true });
  } catch (err) {
    res.send({ msg: err.message.replace(/\'/g, ""), success: false });
  }
});

exports.getCategories = asyncHandler(async (req, res) => {
  const {mainMenu, subMenu} = req.body;
  try {
    const categories = await WebBuilderElementCategory.find({
      mainMenu,
      subMenu,
    });
    res.status(200).json({ success: true, data: categories });
  } catch (err) {
    res.send({ msg: err.message.replace(/\'/g, ""), success: false });
  }
});