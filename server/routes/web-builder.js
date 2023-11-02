const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");

const {
  createWebsite,
  getWebSites,
  deleteWebsite,
  createPage,
  updatePage,
  deletePage,
  getPage,
  getTemplates,
} = require("../controllers/webBuilder");

router.get("/websites/", isAuthenticated, getWebSites);
router.get("/templates", isAuthenticated, getTemplates);
router.post("/create", isAuthenticated, createWebsite);
router.delete("/delete/:id", isAuthenticated, deleteWebsite);
router.get("/page/:id", getPage);
router.delete("/delete-page/:id", isAuthenticated, deletePage);
router.put("/update-page/:id", isAuthenticated, updatePage);
router.post("/create-page/:id", isAuthenticated, createPage);

module.exports = router;
