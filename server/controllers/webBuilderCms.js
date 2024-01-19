// model
const { default: mongoose } = require("mongoose");
const asyncHandler = require("express-async-handler");
const {
  WebSiteCollection,
  WebSiteDataSet,
  WebSiteConnection,
  ProductCategory
} = require("../models/index/index");

exports.createCollection = asyncHandler(async (req, res) => {
  let userId = req.user._id;
  const { organization } = req.headers;
  const payload = req.body; //websiteId, name, fields, values, type
  const websiteId = payload.websiteId;

  try {
      const colsWithName = await WebSiteCollection.find({websiteId: mongoose.Types.ObjectId(websiteId), name: payload.name}).sort({nameDuplicatedIndex: 1});
      let newCollection;
      if (colsWithName.length > 0) {
        newCollection = await WebSiteCollection.create({
          userId: mongoose.Types.ObjectId(userId),
          organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
          ...payload,
          websiteId: mongoose.Types.ObjectId(websiteId),
          nameDuplicatedIndex: colsWithName[colsWithName.length - 1].duplicatedIndex || 1,
        });
      } else {
        newCollection = await WebSiteCollection.create({
          userId: mongoose.Types.ObjectId(userId),
          organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
          ...payload,
          websiteId: mongoose.Types.ObjectId(websiteId),
        });
      }

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
      isDelete: false,
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
    const deletedCollection = await WebSiteCollection.findByIdAndUpdate(id, { isDelete: true }, {new: true});
    res.status(200).json({ success: true, data: deletedCollection });
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

exports.getConnectedDataset = asyncHandler(async (req, res) => {
  let userId = req.user._id;
  const { organization } = req.headers;
  const websiteId = req.params.id;
  const { ids } = req.query;
  try {
    const connections = await WebSiteConnection.find({
      userId: mongoose.Types.ObjectId(userId),
      websiteId: mongoose.Types.ObjectId(websiteId),
      componentId:{$in:ids},
      isDelete: false,
    });
    const keys=connections && connections.map((connection)=>{
       if(connection){
        return connection.connectedField;
       }
    })
    const connection =connections[0];
    if(connection){
      const datasetId=connection.datasetId;
      const query={
        _id:mongoose.Types.ObjectId(datasetId)
      };
      const datasets = await WebSiteDataSet.aggregate([
        {
          $match:query
        },
        {
          $lookup: {
            from: "web-collections",
            localField: "collectionId",
            foreignField: "_id",
            as: "collection",
          }
        }   
      ]);
      const values=datasets[0].collection[0].values;
      const data={
        connectedkeys:keys,
        connectedvalues:values
      }
      res.status(200).json({ success: true, data:data });

    }
    }
   catch (err) {
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
      },
      {
        ...payload,
        userId: mongoose.Types.ObjectId(userId),
        organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
        websiteId: mongoose.Types.ObjectId(websiteId),
        datasetId: mongoose.Types.ObjectId(datasetId),
      },
      {new: true});
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

exports.createMultipleConnection = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { organization } = req.headers;
  const payloads = req.body;
  const tempPayloads = [];
  
  try {
    payloads.map((payload) => {
      tempPayloads.push({
        ...payload,
        userId: mongoose.Types.ObjectId(userId),
        organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
        websiteId: mongoose.Types.ObjectId(payload.websiteId),
        datasetId: mongoose.Types.ObjectId(payload.datasetId),
      })
    });

    const result = await WebSiteConnection.insertMany(tempPayloads);
    res.status(200).json({ success: true, data: result });
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

exports.getProductCategoriesByPage = asyncHandler(async (req, res) => {
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

exports.updateProductCategoryByPage = asyncHandler(async (req, res) => {
  try {
    let { id } = req.params;
    const { name, products, websiteId, isEdit } = req.body;
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
        websiteId: websiteId,
      });
    }
    res.status(200).json({ success: true });
  } catch (err) {
    res.send({ msg: err.message.replace(/\'/g, ""), success: false });
  }
});

exports.checkProductDataset = asyncHandler(async (req, res) => {
  let { id } = req.params;
  let userId = req.user._id;
  const { organization } = req.headers;
  try {
    let datasets = await WebSiteCollection.find({
      websiteId: mongoose.Types.ObjectId(id),
      name: "PRODUCTS",
      category: "store"
    });
    if (datasets.length == 0) {
      await WebSiteCollection.create({
        websiteId: mongoose.Types.ObjectId(id),
        userId: mongoose.Types.ObjectId(userId),
        organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
        name: "PRODUCTS",
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
        type: "multiple",
        isDelete: false,
        category: "store"
      });
    }
    const collections = await WebSiteCollection.find({
      userId: mongoose.Types.ObjectId(userId),
      organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
      websiteId: mongoose.Types.ObjectId(id),
      isDelete: false,
    });
    res.status(200).json({ success: true, data: collections });
  } catch (err) {
    res.send({ msg: err.message.replace(/\'/g, ""), success: false });
  }
});

// exports.updateProductDatasetsByPage = asyncHandler(async (req, res) => {
//   let { id } = req.params;
//   const payload = req.body;
//   try {
//     const updatedCollection = await ProductDataSet.findOneAndUpdate(
//       { websiteId: mongoose.Types.ObjectId(id) },
//       payload,
//       { new: true }
//     );
//     res.status(200).json({ success: true, data: updatedCollection });
//   } catch (err) {
//     res.send({ msg: err.message.replace(/\'/g, ""), success: false });
//   }
// });
