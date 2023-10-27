const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");

const {
  createForm,
  getForms,
  deleteForm,
  editForm,
  getForm,
  
  addFormEntry,
  updateFormEntry,
  getFormEntryByFormId,
  deleteFormEntry,
  getTemplates,
  getFormEntryById,
  searchDomain,
  //createInvoice,
  sendUserEmail,
  //addToLeadAutomation,
  updateContactArray,
  getFormCounts
} = require("../controllers/formBuilder");

router.get("/forms/", isAuthenticated, getForms);
router.get("/templates", isAuthenticated, getTemplates);
router.post("/create", isAuthenticated, createForm);
router.get("/preview/:id", getForm);
router.delete("/delete/:id", isAuthenticated, deleteForm);
router.put("/edit/:id", isAuthenticated, editForm);
//router.post("/addleads/:id", addToLeadAutomation);

router.post("/details/:id", addFormEntry);
router.put("/details/:id", updateFormEntry);
router.put("/update-contact/:id", updateContactArray);
router.get("/details/:id", isAuthenticated, getFormEntryByFormId);
router.get("/contact-details/:id", isAuthenticated, getFormEntryById);
router.delete("/details/:id", isAuthenticated, deleteFormEntry);
//router.post("/send-invoice", createInvoice);
router.post("/send-email-user", sendUserEmail);
router.get("/get-user-forms-count",isAuthenticated, getFormCounts);

router.get("/search/domain/:domain",isAuthenticated,searchDomain);



module.exports = router;
