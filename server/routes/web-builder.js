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
  
  addFormEntry,
  updateFormEntry,
  getFormEntryByFormId,
  deleteFormEntry,
  getFormEntryById,
  searchDomain,
  sendUserEmail,
  updateContactArray,
} = require("../controllers/webBuilder");

router.get("/websites/", isAuthenticated, getWebSites);
router.get("/templates", isAuthenticated, getTemplates);
router.post("/create", isAuthenticated, createWebsite);
router.delete("/delete/:id", isAuthenticated, deleteWebsite);
router.get("/page/:id", getPage);
router.delete("/delete-page/:id", isAuthenticated, deletePage);
router.put("/update-page/:id", isAuthenticated, updatePage);
router.post("/create-page/:id", isAuthenticated, createPage);

router.post("/details/:id", addFormEntry);
router.put("/details/:id", updateFormEntry);
router.put("/update-contact/:id", updateContactArray);
router.get("/details/:id", isAuthenticated, getFormEntryByFormId);
router.get("/contact-details/:id", isAuthenticated, getFormEntryById);
router.delete("/details/:id", isAuthenticated, deleteFormEntry);
router.post("/send-email-user", sendUserEmail);

router.get("/search/domain/:domain",isAuthenticated,searchDomain);

module.exports = router;
