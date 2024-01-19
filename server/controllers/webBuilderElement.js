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
const { uploadMenuImage } = require("../Utilities/googleCloudStorageWebBuilder");
const path = require('path');

exports.createElement = asyncHandler(async (req, res) => {
  let userId = req.user._id;
  const { category, mainMenu, subMenu, html, imageUrl, mediaType, name } = req.body;

  try {
    // for (let i=299 ; i<303; i++) {
    //   await uploadMenuImage(path.resolve(__dirname, `../../client/public/assets/import-elements/menu-images/myimage-${i}.png`), `myimage-${i}.png`);
    // }
    
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
        mediaType: mediaType || '',
        name: name || '',
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
        mediaType: mediaType || '',
        name: name || '',
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
          // userId: mongoose.Types.ObjectId(userId)
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
    console.log('*************')

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
  const {name} = req.body;
  try {
    const webElement=await WebBuilderElement.findOne({_id:mongoose.Types.ObjectId(id)});
    const categoryId=webElement.category;
    const payload={name:name};
    const updatedElement = await WebBuilderElementCategory.findOneAndUpdate({_id: mongoose.Types.ObjectId(categoryId)}, payload, {new:true});
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

exports.getImageFromMedia =asyncHandler(async(req, res)=>{
  try{
    const {page, pageSize}=req.query;
    let _page=parseInt(page);
    let _pageSize=parseInt(pageSize);
    const skip=(_page-1)*_pageSize;
    const categories = await WebBuilderElementCategory.find({
      mainMenu:'media',
      subMenu:'images',
    });
    const ids=categories && categories.map((_category)=>{
      return _category._id;
    });
    if(ids.length>0){
        const data = await WebBuilderElement.aggregate([
          {
              $match: { category: { $in: ids } },
          },
          {
              $skip:skip
          },
          {
              $limit:_pageSize
          }
      ]);
        res.send({ success: true, data:data});
    }
  }
  catch (error) {
    res.send({ success: false, message: error.message.replace(/"/g, "") });
}
})