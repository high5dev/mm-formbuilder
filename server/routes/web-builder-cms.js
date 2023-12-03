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

module.exports = router;
