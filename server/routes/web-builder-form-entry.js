const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");

const {
 createWebsiteEntry,
 getWebsiteEntry,
 getAllWebsiteEntries,
 getWebsiteEntries,
 editWebsiteEntry,
 deleteWebsiteEntry
} = require("../controllers/webBuilderFormEntry");
//form builder
router.post("/create", createWebsiteEntry);
router.get("/dataset/:id", isAuthenticated, getWebsiteEntry);
router.get("/datasets/", isAuthenticated, getWebsiteEntries);
router.get("/all/", isAuthenticated, getAllWebsiteEntries);
router.put("/edit/:id", isAuthenticated,  editWebsiteEntry);
router.delete("/delete/:id", isAuthenticated, deleteWebsiteEntry);

module.exports = router;