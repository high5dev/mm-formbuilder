// model
const { default: mongoose } = require("mongoose");
const asyncHandler = require("express-async-handler");
const {
  WebBuilder,
  Authenticate,
  WebPage,
  WebBuilderElement,
} = require("../models/index/index");

exports.createElement = asyncHandler(async (req, res) => {
  let userId = req.user._id;
  const payload = req.body;
  try {
    const newElement = await WebBuilderElement.create({
      userId: mongoose.Types.ObjectId(userId),
      ...payload,
    });

    res.status(200).json({ success: true, data: newElement });
  } catch (err) {
    res.send({ msg: err.message.replace(/\'/g, ""), success: false });
  }
});

exports.getAllElements = asyncHandler(async (req, res) => {
  let userId = req.user._id;
  const payload = req.body;
  try {
    // const elements = await WebBuilderElement.find({
    //   userId: mongoose.Types.ObjectId(userId),
    //   isDelete: false,
    // });

    const elements = await WebBuilderElement.aggregate([
      {
        $match: {
          $or: [
            {
              userId: mongoose.Types.ObjectId(userId),
              isDelete: false,
            },
            {
              isDefault: true,
              isDelete: false,
            }
          ]
        }
      },
      {
        $group: {
          _id: { mainMenu: "$mainMenu", subMenu: "$subMenu", category: "$category" },
          elements: { $push: "$$ROOT" },
        },
      },
    ]);

    const newElements = [];
    elements.map((element) => {
      const mainIndex = newElements.findIndex(e => e.mainMenu === element._id.mainMenu);
      if (mainIndex === -1) {
        newElements.push({
          mainMenu: element._id.mainMenu,
          data: [
            {
              subMenu: element._id.subMenu,
              data: [
                {
                  category: element._id.category,
                  data: [
                    ...element.elements
                  ],
                },
              ],
            },
          ],
        });
      } else {
        const subIndex = newElements[mainIndex].data.findIndex(e => e.subMenu === element._id.subMenu);
        if (subIndex === -1) {
          newElements[mainIndex].data.push({
            subMenu: element._id.subMenu,
            data: [
              {
                category: element._id.category,
                data: [
                  ...element.elements
                ],
              },
            ],
          })
        } else {
          newElements[mainIndex].data[subIndex].data.push({
            category: element._id.category,
            data: [
              ...element.elements
            ],
          });
        }
      }
    });

    res.status(200).json({ success: true, data: newElements });
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