const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");

const {
  getDatasetsByPage,
  updateDatasetsByPage,
} = require("../controllers/webBuilderStore");

router.get("/dataset/:id", isAuthenticated, getDatasetsByPage);
router.post("/dataset/update/:id", isAuthenticated, updateDatasetsByPage)

module.exports = router;
