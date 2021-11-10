const express = require("express");
const router = require("express-promise-router")();
const path = require("path");
const userController = require("../controllers/newControllers");
const passport = require("passport");
const passportConfig = require("../middlewares/passport");
const {
  validateParam,
  validateBody,
  schemas,
} = require("../helpers/routerHelpers");

router.get("/", (req, res) => {
  res.cookie('conversation','Tefoin')
  res.sendFile(path.join(__dirname, "../public/index.html"));
});
router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/login.html"));
}); 
router.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/register.html"));
});

router
  .route("/auth/google")
  .post(
    passport.authenticate("google-plus-token", { session: false }),
    userController.authGoogle
  );

router
  .route("/register")
  .post(validateBody(schemas.authSignUpSchema), userController.register);

router
  .route("/login")
  .post(
    validateBody(schemas.authSignInSchema),
    passport.authenticate("local", { session: false }),
    userController.login
  );

router.route("/chat").post(userController.message);
// router
//   .route("/secret")
//   .get(passport.authenticate("jwt", { session: false }), userController.secret);

module.exports = router;
