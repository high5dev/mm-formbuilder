const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");

const {
 createWebsiteEntry,
 getWebsiteEntry,
 getWebsiteEntries,
 editWebsiteEntry,
 deleteWebsiteEntry
} = require("../controllers/webEntry");
//form builder
router.post("/create", createWebsiteEntry);
router.get("/dataset/:id", isAuthenticated, getWebsiteEntry);
router.get("/datasets/", isAuthenticated, getWebsiteEntries);
router.put("/edit/:id", isAuthenticated,  editWebsiteEntry);
router.delete("/delete/:id", isAuthenticated, deleteWebsiteEntry);

module.exports = router;