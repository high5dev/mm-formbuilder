const router = require("express").Router();

const {
  getUserDetails,
  updateUserDetails,
  userDetailsByUserId,
  getByUserId,
  getUserList,
  getOrgAdmin,
  deactiveUser,
  updateLocationName,
  getSuperAdmin,
} = require("../controllers/user");
const isAuthenticated = require("../middleware/auth");
const { checkRolePrivileges } = require("../middleware/auth/roleCheck");

router.get("/", isAuthenticated, getUserDetails);
router.get("/get_users", isAuthenticated, getUserList);
router.get("/:userId", isAuthenticated, getByUserId); // this api for admin only.
router.get("/details", isAuthenticated, userDetailsByUserId);

router.put("/profile/:userId", isAuthenticated, updateUserDetails);
router.get("/get-admin/:id", isAuthenticated, getOrgAdmin);
router.get("/get-super/:id", isAuthenticated, getSuperAdmin);
router.put("/deactive", isAuthenticated, deactiveUser);
router.put("/organization/location", isAuthenticated, updateLocationName);

module.exports = router;
