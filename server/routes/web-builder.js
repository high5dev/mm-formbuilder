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
  getWebsiteCounts,
  updateAllPages,
  getPublishPage,
  getPreviewPage,
  createPage,
  createShopPages,
  updatePage,
  updatePageName,
  deletePage,
  getPage,
  getTemplates,
  createDynamicPage,
  getGoogleFonts
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
router.get("/preview-page/",  isAuthenticated, getPreviewPage);
router.get("/get-user-websites-count", isAuthenticated, getWebsiteCounts);
//page
router.post("/create-page", isAuthenticated, createPage);
router.post("/create-shop-pages", isAuthenticated, createShopPages);
router.post("/create-dynamic-page", isAuthenticated, createDynamicPage);
router.put("/update/:id", isAuthenticated, updatePage);
router.put("/publish/:id", isAuthenticated, publishWebsite);
router.put("/update-page/:id", isAuthenticated, updatePageName);
router.get("/page/:id", isAuthenticated,getPage);
router.delete("/delete-page/:id", isAuthenticated, deletePage);
router.get("/getGoogleFonts", isAuthenticated, getGoogleFonts);
module.exports = router;
