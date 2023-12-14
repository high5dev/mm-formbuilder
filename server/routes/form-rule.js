const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");

const {
 createFormRule,
 getFormRule,
 getFormRules,
 editFormRule,
 deleteFormRule
} = require("../controllers/formRule");
//form rule
router.get("/rule/:id", isAuthenticated, getFormRule);
router.get("/rules/", isAuthenticated, getFormRules);
router.post("/create", isAuthenticated, createFormRule);
router.put("/edit/:id", isAuthenticated,  editFormRule);
router.delete("/delete/:id", isAuthenticated, deleteFormRule);

module.exports = router;
