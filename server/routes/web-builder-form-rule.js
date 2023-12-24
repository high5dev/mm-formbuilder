const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");

const {
createWebBuilderFormRule,
getWebBuilderFormRule,
getWebBuilderFormRules,
editWebBuilderFormRule,
deleteWebBuilderFormRule
} = require("../controllers/webBuilderFormRule");
//form rule
router.get("/rule/:id", isAuthenticated, getWebBuilderFormRule);
router.get("/rules/", isAuthenticated, getWebBuilderFormRules);
router.post("/create", isAuthenticated, createWebBuilderFormRule);
router.put("/edit/:id", isAuthenticated,  editWebBuilderFormRule);
router.delete("/delete/:id", isAuthenticated, deleteWebBuilderFormRule);

module.exports = router;
