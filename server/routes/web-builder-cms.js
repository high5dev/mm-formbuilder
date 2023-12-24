const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");

const {
  createCollection,
  updateCollection,
  deleteCollection,
  getCollections,
  createDataset,
  updateDataset,
  deleteDataset,
  getDatasetsByCollection,
  getAllDatasets,
  createOrUpdateConnection,
  getConnectionsByWebsiteId,
  deleteConnection,
  multipleDeleteConnection,
  createMultipleConnection,
} = require("../controllers/webBuilderCms");

router.post("/collection/create", isAuthenticated, createCollection);
router.post("/collection/update/:id", isAuthenticated, updateCollection);
router.delete("/collection/delete/:id", isAuthenticated, deleteCollection);
router.get("/collection/:id", isAuthenticated, getCollections);
router.post("/dataset/create", isAuthenticated, createDataset);
router.post("/dataset/update/:id", isAuthenticated, updateDataset);
router.delete("/dataset/delete/:id", isAuthenticated, deleteDataset);
router.get("/dataset/:id", isAuthenticated, getDatasetsByCollection);
router.get("/all-datasets/:id", isAuthenticated, getAllDatasets);
router.get("/connections-of-website/:id", isAuthenticated, getConnectionsByWebsiteId);
router.post("/connection/create-update", isAuthenticated, createOrUpdateConnection);
router.post("/connection/create-multiple", isAuthenticated, createMultipleConnection);
router.delete("/connection/delete/:id", isAuthenticated, deleteConnection);
router.post("/connection/multiple-delete", isAuthenticated, multipleDeleteConnection)

module.exports = router;
