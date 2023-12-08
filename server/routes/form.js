const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");

const {
 createForm,
 getForm,
 getForms,
 editForm,
 deleteForm,
 getFormPreviewPage,
 createFormPage,
 deleteFormPage,
 getFormPage
} = require("../controllers/form");
//form builder
router.get("/form/:id", isAuthenticated, getForm);
router.get("/forms/", isAuthenticated, getForms);
router.get("/preview-page", isAuthenticated, getFormPreviewPage)
router.post("/create", isAuthenticated, createForm);
router.post("/create-page", isAuthenticated, createFormPage);
router.put("/edit/:id", isAuthenticated,  editForm);
router.delete("/delete-page/:id", isAuthenticated, deleteFormPage);
router.delete("/delete/:id", isAuthenticated, deleteForm);
router.get("/page/:id", isAuthenticated, getFormPage)

module.exports = router;
