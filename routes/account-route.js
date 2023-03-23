// Needed resources
const express = require("express");
const router = new express.Router();
const regValidate = require('../utilities/account-validation')
// import utilities from "../utilities";
const account = require("../controllers/accountController")
router.get("/login", account.buildLogin,
(req, res) => {
  res.status(200).send('login process')
});
router.get("/registration", account.buildRegister);
router.get("/client/register",
regValidate.registationRules(),
regValidate.checkRegData, 
account.registerClient
)

module.exports = router;