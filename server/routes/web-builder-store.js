const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");

const {
  getDatasetsByCollection,
} = require("../controllers/webBuilderStore");

router.get("/dataset/:id", isAuthenticated, getDatasetsByCollection);

module.exports = router;
