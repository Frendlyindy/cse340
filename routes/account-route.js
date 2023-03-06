// Needed resources
const express = require("express");
const router = new express.Router();
// import utilities from "../utilities";
const account = require("../controllers/accountController")
router.get("/login", account.buildLogin);
router.get("/registration", account.buildRegister);

module.exports = router;