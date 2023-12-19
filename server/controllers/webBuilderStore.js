// model
const { default: mongoose } = require("mongoose");
const asyncHandler = require("express-async-handler");
const { ProductDataSet, ProductCategory } = require("../models/index/index");

exports.getCategoriesByPage = asyncHandler(async (req, res) => {
  let { id } = req.params;
  try {
    let categories = await ProductCategory.find({
      websiteId: mongoose.Types.ObjectId(id),
    });
    if (categories.length == 0) {
      await ProductCategory.create({
        name: "All Products",
        websiteId: mongoose.Types.ObjectId(id),
        isAll: true,
        products: "",
      });
      categories = await ProductCategory.find({
        websiteId: mongoose.Types.ObjectId(id),
      });
    }
    res.status(200).json({ success: true, data: categories });
  } catch (err) {
    res.send({ msg: err.message.replace(/\'/g, ""), success: false });
  }
});

exports.updateCategoryByPage = asyncHandler(async (req, res) => {
  try {
    let { id } = req.params;
    const { name, products, websitesId, isEdit } = req.body;
    if (isEdit) {
      await ProductCategory.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(id) },
        {
          name: name,
          isAll: false,
          products: products,
        },
        { returnDocument: "after" }
      );
    } else {
      await ProductCategory.create({
        name: name,
        isAll: false,
        products: products,
        websiteId: websitesId,
      });
    }
    res.status(200).json({ success: true });
  } catch (err) {
    res.send({ msg: err.message.replace(/\'/g, ""), success: false });
  }
});

exports.getDatasetsByPage = asyncHandler(async (req, res) => {
  let { id } = req.params;
  try {
    let datasets = await ProductDataSet.find({
      websiteId: mongoose.Types.ObjectId(id),
    });
    if (datasets.length == 0) {
      await ProductDataSet.create({
        websiteId: mongoose.Types.ObjectId(id),
        fields: [
          {
            name: "id",
            type: "text",
            default: true,
          },
          {
            name: "name",
            type: "text",
          },
          {
            name: "description",
            type: "text",
          },
          {
            name: "price",
            type: "text",
          },
          {
            name: "currency",
            type: "text",
          },
          {
            name: "url",
            type: "Image",
          },
          {
            name: "createdAt",
            type: "date",
            default: true,
          },
        ],
        values: [
          {
            id: "product-1701651099438",
            name: "Product 1",
            description: "Product1",
            price: "100",
            currency: "USD",
            url: "https://i.ibb.co/6br0NxL/1.png",
            createdAt: "12/3/2023, 7:51:39 PM",
          },
          {
            id: "product-1701651099439",
            name: "Product 2",
            description: "Product2",
            price: "100",
            currency: "USD",
            url: "https://i.ibb.co/6br0NxL/1.png",
            createdAt: "12/3/2023, 7:51:39 PM",
          },
          {
            id: "product-1701651099440",
            name: "Product 3",
            description: "Product3",
            price: "100",
            currency: "USD",
            url: "https://i.ibb.co/6br0NxL/1.png",
            createdAt: "12/3/2023, 7:51:39 PM",
          },
          {
            id: "product-1701651099441",
            name: "Product 4",
            description: "Product4",
            price: "100",
            currency: "USD",
            url: "https://i.ibb.co/6br0NxL/1.png",
            createdAt: "12/3/2023, 7:51:39 PM",
          },
        ],
      });
      datasets = await ProductDataSet.find({
        websiteId: mongoose.Types.ObjectId(id),
      });
    }
    res.status(200).json({ success: true, data: datasets });
  } catch (err) {
    res.send({ msg: err.message.replace(/\'/g, ""), success: false });
  }
});

exports.updateDatasetsByPage = asyncHandler(async (req, res) => {
  let { id } = req.params;
  const payload = req.body;
  try {
    const updatedCollection = await ProductDataSet.findOneAndUpdate(
      { websiteId: mongoose.Types.ObjectId(id) },
      payload,
      { new: true }
    );
    res.status(200).json({ success: true, data: updatedCollection });
  } catch (err) {
    res.send({ msg: err.message.replace(/\'/g, ""), success: false });
  }
});
