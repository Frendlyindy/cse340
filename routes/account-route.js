// Needed resources
const express = require("express");
const router = new express.Router();
const regValidate = require('../utilities/account-validation')
// import utilities from "../utilities";
const account = require("../controllers/accountController")
router.get("/login", account.buildLogin);
router.get("/registration", account.buildRegister);
router.get("/client/register", account.registerClient);

module.exports = router;