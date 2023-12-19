const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");

const {
 createDataset,
 getFormDataset,
 getFormDatasets,
 editFormDataset,
 deleteFormDataset
} = require("../controllers/formDataset");
//form builder
router.post("/create", isAuthenticated, createDataset);
router.get("/dataset/:id", isAuthenticated, getFormDataset);
router.get("/datasets/", isAuthenticated, getFormDatasets);
router.put("/edit/:id", isAuthenticated,  editFormDataset);
router.delete("/delete/:id", isAuthenticated, deleteFormDataset);

module.exports = router;