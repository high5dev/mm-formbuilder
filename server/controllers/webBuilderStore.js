// model
const { default: mongoose } = require("mongoose");
const asyncHandler = require("express-async-handler");
const {
  WebSiteCollection,
  WebSiteDataSet,
} = require("../models/index/index");

exports.getDatasetsByCollection = asyncHandler(async (req, res) => {
  let { id } = req.params;
  try {
    const datasets = await WebSiteCollection.find({
      _id: mongoose.Types.ObjectId(id),
      isDelete: false,
    });

    res.status(200).json({ success: true, data: datasets });
  } catch (err) {
    res.send({ msg: err.message.replace(/\'/g, ""), success: false });
  }
});