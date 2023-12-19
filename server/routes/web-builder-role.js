const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");

const {
  getRolesByWebsite,
  createRole,
  updateRole,
  deleteRole,
  createInvite,
  updateInvite,
  deleteInvite,
  getInvitesByWebsite,
} = require("../controllers/webBuilderRole");

router.post("/update/:id", isAuthenticated, updateRole);
router.post("/create", isAuthenticated, createRole);
router.delete("/delete/:id", isAuthenticated, deleteRole);
router.get("/role/:id", isAuthenticated, getRolesByWebsite);
router.post("/create-invite", isAuthenticated, createInvite);
router.post("/update-invite", isAuthenticated, updateInvite);
router.delete("/delete-invite/:id", isAuthenticated, deleteInvite);
router.get("/invite/:id", isAuthenticated, getInvitesByWebsite);

module.exports = router;
