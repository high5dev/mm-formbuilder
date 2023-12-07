// model
const { default: mongoose } = require("mongoose");
const asyncHandler = require("express-async-handler");
const {
  WebSiteCollection,
  WebSiteDataSet,
  WebSiteConnection,
} = require("../models/index/index");

exports.createCollection = asyncHandler(async (req, res) => {
  let userId = req.user._id;
  const { organization } = req.headers;
  const payload = req.body; //websiteId, name, fields, values, type
  const websiteId = payload.websiteId;

  try {
      const newCollection = await WebSiteCollection.create({
        userId: mongoose.Types.ObjectId(userId),
        organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
        ...payload,
        websiteId: mongoose.Types.ObjectId(websiteId),
      });

      res.status(200).json({ success: true, data: newCollection });    
  } catch (err) {
    res.send({ msg: err.message.replace(/\'/g, ""), success: false });
  }
});

exports.getCollections = asyncHandler(async (req, res) => {
  let userId = req.user._id;
  const { organization } = req.headers;
  const websiteId = req.params.id;
  try {
    const collections = await WebSiteCollection.find({
      userId: mongoose.Types.ObjectId(userId),
      organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
      websiteId: mongoose.Types.ObjectId(websiteId),
    });

    res.status(200).json({ success: true, data: collections });
  } catch (err) {
    res.send({ msg: err.message.replace(/\'/g, ""), success: false });
  }
});

exports.updateCollection = asyncHandler(async (req, res) => {
  let { id } = req.params;
  const payload = req.body;
  try {
    const updatedCollection = await WebSiteCollection.findOneAndUpdate({_id: mongoose.Types.ObjectId(id)}, payload, {new: true});
    res.status(200).json({ success: true, data: updatedCollection });
  } catch (err) {
    res.send({ msg: err.message.replace(/\'/g, ""), success: false });
  }
});

exports.deleteCollection = asyncHandler(async (req, res) => {
  let { id } = req.params;
  try {
    id = mongoose.Types.ObjectId(id);
    const deletedCollection = await WebSiteCollection.findByIdAndUpdate(id, { isDelete: true });

    res.status(200).json({ success: true });
  } catch (err) {
    res.send({ msg: err.message.replace(/\'/g, ""), success: false });
  }
});

exports.createDataset = asyncHandler(async (req, res) => {
  let userId = req.user._id;
  const { organization } = req.headers;
  const payload = req.body; //collectionId, name, isFormDataset
  const collectionId = payload.collectionId;

  try {
      const newDataset = await WebSiteDataSet.create({
        userId: mongoose.Types.ObjectId(userId),
        organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
        ...payload,
        collectionId: mongoose.Types.ObjectId(collectionId),
      });

      res.status(200).json({ success: true, data: newDataset });    
  } catch (err) {
    res.send({ msg: err.message.replace(/\'/g, ""), success: false });
  }
});

exports.getDatasetsByCollection = asyncHandler(async (req, res) => {
  let userId = req.user._id;
  const { organization } = req.headers;
  const collectionId = req.params.id;
  try {
    const datasets = await WebSiteDataSet.find({
      userId: mongoose.Types.ObjectId(userId),
      organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
      collectionId: mongoose.Types.ObjectId(collectionId),
      isDelete: false,
    });

    res.status(200).json({ success: true, data: datasets });
  } catch (err) {
    res.send({ msg: err.message.replace(/\'/g, ""), success: false });
  }
});

exports.getAllDatasets = asyncHandler(async (req, res) => {
  let userId = req.user._id;
  const { organization } = req.headers;
  const websiteId = req.params.id;

  try {
    const collections = await WebSiteCollection.find({
      userId: mongoose.Types.ObjectId(userId),
      organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
      websiteId: mongoose.Types.ObjectId(websiteId)
    });

    const collectionIds = collections.map(c => c._id);

    const datasets = await WebSiteDataSet.find({
      userId: mongoose.Types.ObjectId(userId),
      organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
      collectionId: {$in: collectionIds},
      isDelete: false,
    });

    res.status(200).json({ success: true, data: datasets });
  } catch (err) {
    res.send({ msg: err.message.replace(/\'/g, ""), success: false });
  }
});

exports.updateDataset = asyncHandler(async (req, res) => {
  let { id } = req.params;
  const payload = req.body;
  try {
    const updatedDataset = await WebSiteDataSet.findOneAndUpdate({_id: mongoose.Types.ObjectId(id)}, payload, {new: true});
    res.status(200).json({ success: true, data: updatedDataset });
  } catch (err) {
    res.send({ msg: err.message.replace(/\'/g, ""), success: false });
  }
});

exports.deleteDataset = asyncHandler(async (req, res) => {
  let { id } = req.params;
  try {
    id = mongoose.Types.ObjectId(id);
    const deletedDataset = await WebSiteDataSet.findByIdAndUpdate(id, { isDelete: true });

    res.status(200).json({ success: true });
  } catch (err) {
    res.send({ msg: err.message.replace(/\'/g, ""), success: false });
  }
});

exports.createOrUpdateConnection = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { organization } = req.headers;
  const { componentId, websiteId, datasetId } = req.body;
  const payload = req.body;

  try {
    let connection = await WebSiteConnection.findOne({
      userId: mongoose.Types.ObjectId(userId),
      websiteId: mongoose.Types.ObjectId(websiteId),
      componentId,
      isDelete: false,
    });

    if (connection) {
      connection = await WebSiteConnection.findOneAndUpdate({
        userId: mongoose.Types.ObjectId(userId),
        websiteId: mongoose.Types.ObjectId(websiteId),
        componentId,
      }, payload, {new: true});
    } else {
      connection = await WebSiteConnection.create({
        ...payload,
        userId: mongoose.Types.ObjectId(userId),
        organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
        websiteId: mongoose.Types.ObjectId(websiteId),
        datasetId: mongoose.Types.ObjectId(datasetId),
      });
    }

    res.status(200).json({ success: true, data: connection });
  } catch (err) {
    res.send({ msg: err.message.replace(/\'/g, ""), success: false });
  }
});

exports.getConnectionsByWebsiteId = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { organization } = req.headers;
  const {id} = req.params;

  try {
    const connections = await WebSiteConnection.find({
      userId: mongoose.Types.ObjectId(userId),
      organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
      websiteId: mongoose.Types.ObjectId(id),
      isDelete: false,
    });

    res.status(200).json({ success: true, data: connections });
  } catch (err) {
    res.send({ msg: err.message.replace(/\'/g, ""), success: false });
  }
});

exports.deleteConnection = asyncHandler(async (req, res) => {
  const {id} = req.params;
  try {
    const deletedDataset = await WebSiteConnection.findByIdAndUpdate(mongoose.Types.ObjectId(id), { isDelete: true });
    res.status(200).json({ success: true, data: deletedDataset });
  } catch (err) {
    res.send({ msg: err.message.replace(/\'/g, ""), success: false });
  }
});

exports.multipleDeleteConnection = asyncHandler(async (req, res) => {
  const { ids } = req.body;
  try {
    ids.forEach(async(e) => {
      await WebSiteConnection.findOneAndUpdate({_id: mongoose.Types.ObjectId(e)}, { isDelete: true });
    });
    res.status(200).json({ success: true, data: deletedDataset });
  } catch (err) {
    res.send({ msg: err.message.replace(/\'/g, ""), success: false });
  }
});