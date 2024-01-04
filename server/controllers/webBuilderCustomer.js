const { default: mongoose } = require("mongoose");
const asyncHandler = require("express-async-handler");
const { WebCustomerCollect, ProductDataSet, WebSiteCollection, WebCustomerDataset, User } = require("../models/index/index");
const GoogleCloudStorage = require('../Utilities/googleCloudStorage');
const googleCloudStorageWebBuilder = require('../Utilities/googleCloudStorageWebBuilder');

exports.create = asyncHandler(async (req, res) => {
    try {
        const { websiteId, fields, type, collectionId } = req.body;
        const data = await WebCustomerCollect.create({
            websiteId: mongoose.Types.ObjectId(websiteId),
            fields: fields,
            type: type,
            collectionId: collectionId != "" ? mongoose.Types.ObjectId(collectionId) : null
        });
        return res.send({ success: true, data: data });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            errors: { common: { msg: err.message } },
        });
    }
});

exports.getCustomerCollect = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const data = await WebCustomerCollect.findById(mongoose.Types.ObjectId(id)).lean();
        let customerDataset;
        if (data.type == 'product') {
            customerDataset = await ProductDataSet.findOne({ websiteId: mongoose.Types.ObjectId(data.websiteId) });
        } else {
            customerDataset = await WebSiteCollection.findById(mongoose.Types.ObjectId(data.collectionId));
        }
        const tempDataset = await WebCustomerDataset.findOne({ customerCollectId: mongoose.Types.ObjectId(data._id), isApproved: false, isDeclined: false });
        data.customerDataset = customerDataset;
        if (tempDataset) {
            data.customerDataset.values = tempDataset.values;
        }
        return res.send({ success: true, data: data });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            errors: { common: { msg: err.message } },
        });
    }
})

exports.saveCustomerDataset = asyncHandler(async (req, res) => {
    try {
        const { id, values, websiteId } = req.body;
        let userId = req.user._id;
        const collectData = await WebCustomerCollect.findOne({ _id: mongoose.Types.ObjectId(id) });
        const data = await WebCustomerDataset.findOneAndUpdate({ customerCollectId: mongoose.Types.ObjectId(id) }, { userId: mongoose.Types.ObjectId(userId), values: values, isApproved: false, isDeclined: false, customerCollectId: mongoose.Types.ObjectId(id), websiteId: mongoose.Types.ObjectId(collectData.websiteId) }, { new: true, upsert: true });
        return res.send({ success: true, data: data });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            errors: { common: { msg: err.message } },
        });
    }
});

exports.uploadImage = asyncHandler(async (req, res) => {
    try {
        if (req.file) {
            imageUrl = await GoogleCloudStorage.upload(req.file);
            if (imageUrl) {
                return res.send({ success: true, data: imageUrl });
            }
        };
        return res.send({ success: false, data: "" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            errors: { common: { msg: err.message } },
        });
    }
});

exports.getWaitingClients = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const datasets = await WebCustomerDataset.find({ websiteId: mongoose.Types.ObjectId(id), isApproved: false, isDeclined: false }).populate('userId');

        // Now you have the Auth data in datasets. Next, get the corresponding User data
        const userIds = datasets.map(dataset => dataset.userId._id);
        const users = await User.find({ userId: { $in: userIds } });

        // Combine the user data with datasets as needed
        const combinedData = datasets.map(dataset => {
            const userData = users.find(user => user.userId.equals(dataset.userId._id));
            return { ...dataset.toObject(), user: userData };
        });
        return res.send({ success: true, data: combinedData });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            errors: { common: { msg: err.message } },
        });
    }
});

exports.confirmCustomer = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { isApproved, isDeclined } = req.body;
        const data = await WebCustomerDataset.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id) }, { isApproved: isApproved, isDeclined: isDeclined }, { new: true });
        if (isApproved) {
            const collectData = await WebCustomerCollect.findOne({ _id: mongoose.Types.ObjectId(data.customerCollectId) });
            if (collectData.type == "product") {
                await ProductDataSet.findOneAndUpdate({ websiteId: mongoose.Types.ObjectId(collectData.websiteId) }, { values: data.values });
            } else {
                await WebSiteCollection.findOneAndUpdate({ _id: mongoose.Types.ObjectId(collectData.collectionId) }, { values: data.values });
            }
        }
        const datasets = await WebCustomerDataset.find({ websiteId: mongoose.Types.ObjectId(data.websiteId), isApproved: false, isDeclined: false }).populate('userId');

        // Now you have the Auth data in datasets. Next, get the corresponding User data
        const userIds = datasets.map(dataset => dataset.userId._id);
        const users = await User.find({ userId: { $in: userIds } });

        // Combine the user data with datasets as needed
        const combinedData = datasets.map(dataset => {
            const userData = users.find(user => user.userId.equals(dataset.userId._id));
            return { ...dataset.toObject(), user: userData };
        });
        return res.send({ success: true, data: combinedData });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            errors: { common: { msg: err.message } },
        });
    }
});