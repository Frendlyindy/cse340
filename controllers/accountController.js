const utilities = require("../utilities");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const accountModel = require("../models/account-model")
require("dotenv").config()


/* ****************************************
*  Deliver login view
**************************************** */
async function buildLogin(req, res, next) {
    let nav = await utilities.getNav()
    res.render("client/login", {
      title: "Login",
      nav,
      message: null,
    })
  }

  async function clientIndex(req, res, next) {
    let nav = await utilities.getNav()
    let info = res.locals.clientData;
    res.render("client/index.ejs", {
      title: "Client Management",
      nav,
      message: null,
      info,
    })
  }
  
/* ****************************************
*  Deliver registration view
**************************************** */
async function buildRegister(req, res, next) {
  let nav = await utilities.getNav()
  res.render("client/registration", {
    title: "Register",
    nav,
    errors: null,
    message: null,
  })
}

/* ****************************************
 *  Process registration request
 **************************************** */
async function registerClient(req, res) {
  let nav = await utilities.getNav()
  const { client_firstname, client_lastname, client_email, client_password } =
    req.body
// Hash the password before storing
let hashedPassword
try {
  // pass regular password and cost (salt is generated automatically)
  hashedPassword = await bcrypt.hashSync(client_password, 10)
} catch (error) {
  res.status(500).render("client/registration.ejs", {
    title: "Registration",
    nav,
    message: 'Sorry, there was an error processing the registration.',
    errors: null,
  })
}
  const regResult = await accountModel.registerClient(
    client_firstname,
    client_lastname,
    client_email,
    hashedPassword
  )
  console.log(regResult)
  if (regResult) {
    res.status(201).render("client/login.ejs", {
      title: "Login",
      nav,
      message: `Congratulations, you\'re registered ${client_firstname}. Please log in.`,
      errors: null,
    })
  } else {
    const message = "Sorry, the registration failed."
    res.status(501).render("clients/register.ejs", {
      title: "Registration",
      nav,
      message,
      errors: null,
    })
  }
}

/* ****************************************
 *  Process login request
 * ************************************ */
async function accountLogin(req, res) {
  let nav = await utilities.getNav()
  const { client_email, client_password } = req.body
  const clientData = await accountModel.getClientByEmail(client_email)
  if (!clientData) {
    const message = "Please check your credentials and try again."
    res.status(400).render("client/login.ejs", {
      title: "Login",
      nav,
      message,
      errors: null,
      client_email,
    })
    return
  }
  try {
    if (await bcrypt.compare(client_password, clientData.client_password)) {
      delete clientData.client_password
      const accessToken = jwt.sign(clientData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 * 1000 })
      res.cookie("jwt", accessToken, { httpOnly: true })
      return res.redirect("/client/manage")
    }
  } catch (error) {
    return res.status(403).send('Access Forbidden')
  }
}
/**
 * Client update view
 */
async function editClient(req, res, next){
  let nav = await utilities.getNav()
  let clientData = await accountModel.getClientById(req.params.client_id)
  res.render("client/edit-client.ejs", {
    title: "Update Account",
    nav,
    message: null,
    clientData
  })
}

async function postUpdateAccount(req, res, next){
  let nav = await utilities.getNav()
  const { client_firstname, client_lastname, client_email, client_id } =
    req.body

  const regResult = await accountModel.updateAccount(
    client_firstname,
    client_lastname,
    client_email,
    client_id
  )
  console.log(regResult)
  if (regResult) {
    res.status(201).render("client/index.ejs", {
      title: "Client Managment",
      nav,
      message: `Congratulations, you\'re account has been updated successfully!`,
      errors: null,
    })
  } else {
    const message = "Sorry, the update failed."
    res.status(501).render("client/edit-client.ejs", {
      title: "Update Account",
      nav,
      message,
      errors: null,
    })
  }
}

/* ****************************************
 *  Process registration request
 **************************************** */
async function postUpdatePassword(req, res) {
  let nav = await utilities.getNav()
  const { client_password, client_id } =
    req.body
// Hash the password before storing
let hashedPassword
try {
  // pass regular password and cost (salt is generated automatically)
  hashedPassword = await bcrypt.hashSync(client_password, 10)
} catch (error) {
  res.status(500).render("client/edit-client.ejs", {
    title: "Update Account",
    nav,
    message: 'Sorry, there was an error processing the new password.',
    errors: null,
  })
}
  const regResult = await accountModel.updatePassword(
    hashedPassword,
    client_id
  )
  console.log(regResult)
  if (regResult) {
    res.status(201).render("client/index.ejs", {
      title: "Client Mangement",
      nav,
      message: `Congratulations, you\'re new password has been registered!.`,
      errors: null,
    })
  } else {
    const message = "Sorry, the password change failed."
    res.status(501).render("clients/edit-client.ejs", {
      title: "Update Account",
      nav,
      message,
      errors: null,
    })
  }
}

module.exports = { buildLogin, buildRegister, registerClient, accountLogin, clientIndex, editClient, postUpdateAccount, postUpdatePassword }