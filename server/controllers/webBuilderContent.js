const { default: mongoose } = require("mongoose");
const asyncHandler = require("express-async-handler");
const { ProductDataSet, WebSiteCollection, WebCustomerDataset, User, WebContentCollection } = require("../models/index/index");
const googleCloudStorageWebBuilder = require('../Utilities/googleCloudStorageWebBuilder');

exports.create = asyncHandler(async (req, res) => {
    try {
        const { websiteId, fields, collectionId } = req.body;
        const existedCol = await WebContentCollection.findOne({
            websiteId: mongoose.Types.ObjectId(websiteId),
            collectionId: mongoose.Types.ObjectId(collectionId)
        });
        if (!existedCol) {
            const data = await WebContentCollection.create({
                websiteId: mongoose.Types.ObjectId(websiteId),
                fields: fields,
                collectionId: mongoose.Types.ObjectId(collectionId)
            });
            return res.send({ success: true, data: data });
        } else {
            const existedCol = await WebContentCollection.findOneAndUpdate({
                websiteId: mongoose.Types.ObjectId(websiteId),
                collectionId: mongoose.Types.ObjectId(collectionId)
            }, {fields: fields}, {new: true});
            return res.send({ success: true, data: existedCol });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            errors: { common: { msg: err.message } },
        });
    }
});

exports.getContentCollect = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const data = await WebContentCollection.findById(mongoose.Types.ObjectId(id));
        return res.send({ success: true, data: data });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            errors: { common: { msg: err.message } },
        });
    }
});

exports.getContentCollectByCol = asyncHandler(async (req, res) => {
    try {
        const {websiteId, collectionId} = req.body;
        const data = await WebContentCollection.find({
            websiteId: mongoose.Types.ObjectId(websiteId),
            isApproved: 'pending',
        });
        return res.send({ success: true, data: data });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            errors: { common: { msg: err.message } },
        });
    }
});

exports.saveContentCollect = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const payload = req.body;
        let userId = req.user._id;
        const collectData = await WebContentCollection.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id)}, payload, {new: true});
        return res.send({ success: true, data: collectData });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            errors: { common: { msg: err.message } },
        });
    }
});

exports.uploadImage = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        if (req.file && id) {
            const imageUrl = await googleCloudStorageWebBuilder.upload(req.file, id);
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

exports.getImageUrls = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const imageUrls = await googleCloudStorageWebBuilder.getWebsiteImageUrls(id);
        return res.send({ success: true, data: imageUrls});
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
            const collectData = await WebContentCollection.findOne({ _id: mongoose.Types.ObjectId(data.customerCollectId) });
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