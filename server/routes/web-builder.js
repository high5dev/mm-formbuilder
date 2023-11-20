const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");

const {
  getWebsite,
  createWebsite,
  editWebsite,
  getWebSites,
  deleteWebsite,
  renameWebsite,
  duplicateWebsite,
  publishWebsite,
  updateAllPages,
  getPublishPage,
  createPage,
  updatePage,
  updatePageName,
  deletePage,
  getPage,
  getTemplates,
} = require("../controllers/webBuilder");
//web builder
router.get("/website/:id", isAuthenticated, getWebsite);
router.get("/websites/", isAuthenticated, getWebSites);
router.get("/templates", isAuthenticated, getTemplates);
router.post("/create", isAuthenticated, createWebsite);
router.post("/duplicate", isAuthenticated, duplicateWebsite);
router.put("/edit/:id", isAuthenticated,  editWebsite);
router.delete("/delete/:id", isAuthenticated, deleteWebsite);
router.put('/rename/:id', isAuthenticated, renameWebsite);
router.get("/publish-page/", getPublishPage);
//page
router.post("/create-page", isAuthenticated, createPage);
router.put("/update/:id", isAuthenticated, updatePage);
router.put("/publish/:id", isAuthenticated, publishWebsite);
router.put("/update-page/:id", isAuthenticated, updatePageName);
router.get("/page/:id", isAuthenticated,getPage);
router.delete("/delete-page/:id", isAuthenticated, deletePage);
module.exports = router;
