// Needed resources
const express = require("express");
const router = new express.Router();
const regValidate = require('../utilities/account-validation')
const utilities = require("../utilities")
const account = require("../controllers/accountController")
router.get("/login", utilities.handleErrors(account.buildLogin),
(req, res) => {
  res.status(200).send('login process')
});
router.get("/", utilities.checkLogin,utilities.handleErrors(utilities.buildManageView));
router.get("/manage", account.clientIndex)
router.get("/editClient/:client_id", utilities.handleErrors(account.editClient))
router.post("/updateAccount", regValidate.updateAccountRules(), regValidate.checkUpdateData, utilities.handleErrors(account.postUpdateAccount));
router.post("/updatePassword", utilities.handleErrors(account.postUpdatePassword));
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
router.post('/login', (req, res) => {
  req.session.loggedin = true
})
router.get("/logout", utilities.logout)
module.exports = router;