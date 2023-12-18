const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");
const { singleUploadControl, singleUploadToServerControl } = require("../middleware/upload");

const {
 createForm,
 getForm,
 getForms,
 editForm,
 deleteForm,
 getFormPreviewPage,
 createFormPage,
 deleteFormPage,
 getFormPage,
 uploadFile
} = require("../controllers/form");
//form builder
router.get("/form/:id", isAuthenticated, getForm);
router.post('/fileupload/', isAuthenticated, singleUploadControl, uploadFile);
router.get("/forms/:id", isAuthenticated, getForms);
router.get("/preview-page", isAuthenticated, getFormPreviewPage)
router.post("/create", isAuthenticated, createForm);
router.post("/create-page", isAuthenticated, createFormPage);
router.put("/edit/:id", isAuthenticated,  editForm);
router.delete("/delete-page/:id", isAuthenticated, deleteFormPage);
router.delete("/delete/:id", isAuthenticated, deleteForm);
router.get("/page/:id", isAuthenticated, getFormPage)

module.exports = router;
