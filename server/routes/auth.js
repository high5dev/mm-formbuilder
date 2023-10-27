const router = require("express").Router();

const {
  signup,
  signUpOrg,
  loginContact,
  signUpContact,
  login,
  validateToken,
  sendResetPassOTP,
  resetPass,
  getContactById,
  signout,
} = require("../controllers/auth");
const { signupValidator, loginValidator, resetPassValidator } = require("../validators/auth");
const results = require("../validators");
const isAuthenticated = require("../middleware/auth");

router.post("/signup", signupValidator, results, signup);
router.post("/signin", loginValidator, results, login);
router.post("/contact-signup", signUpContact);
router.get("/contact-signup/:id", getContactById);
router.post("/:organization/signup", signupValidator, results, signUpOrg);
router.post("/:organization/signin", loginValidator, results, login);
router.post("/send-reset-pass-otp", resetPassValidator, results, sendResetPassOTP);
router.patch("/reset-password", resetPassValidator, results, resetPass);
router.post("/validate-token", validateToken);
router.post("/signout", isAuthenticated, signout);

module.exports = router;
