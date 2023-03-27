// Needed resources
const express = require("express");
const router = new express.Router();
const regValidate = require('../utilities/account-validation')
const utilities = require("../utilities")
const account = require("../controllers/accountController")
router.get("/login", account.buildLogin,
(req, res) => {
  res.status(200).send('login process')
});
router.get("/", utilities.checkLogin, utilities.handleErrors(utilities.buildManageView));
router.get("/manage", account.clientIndex)
router.get("/registration", utilities.handleErrors(account.buildRegister));
router.post("/register",
regValidate.registationRules(),
regValidate.checkRegData, 
utilities.handleErrors(account.registerClient)
)
// Process the login request
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(account.accountLogin)
)

module.exports = router;