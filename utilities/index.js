const invModel = require("../models/inventory-model")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.buildNav = function (data) {
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}
/* ************************
 * Builds the navigation bar
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  nav = Util.buildNav(data)
  return nav
}

Util.buildVehicleCard = async function(car) {
  // console.log("Do we ever get to Util.buildVehicleCard = async function(car) where the view is being built to insert into vehicle-detail.ejs")
    let ux = `
    <br>
    <img src="${car.inv_image}" alt="${car.inv_make} ${car.inv_model}">
    <div class="car-information">
      <h2>${car.inv_make} ${car.inv_model} ${car.inv_year} Info</h2><br>
      <p>Price(USD): ${car.inv_price}</p><br>
      <p>Description: ${car.inv_description}</p><br>
      <p>Color: ${car.inv_color}</p><br>
      <p>Miles: ${car.inv_miles}</p><br>
    </div>`;
    return ux;
}

Util.buildManageView = async function(data){
  let ui = `
  <div>
    <a href="</new-class>">Add new classification</a>
    <a href="<>">Add new vehicle</a>
</div>
  `;

  return ui;
}

Util.buildClassDropdown = async function(classification_id = null){
  let data = await invModel.getClassifications()

  let classificationList = '<select name="classification_id" id="classificationList">' 
  classificationList += "<option>Choose a Classification</option>"
  data.rows.forEach((row) => {
  classificationList += '<option value="' + row.classification_id + '"'
  if (classification_id != null & row.classification_id == classification_id) {
  classificationList += " selected "
  }
  classificationList += ">" + row.classification_name + "</option>"
  })
  classificationList += "</select>"

  return classificationList;
}

/* ****************************************
* Middleware to check token validity
**************************************** */
Util.checkJWTToken = (req, res, next) => {
  if (req.cookies.jwt) {
    jwt.verify(
      req.cookies.jwt,
      process.env.ACCESS_TOKEN_SECRET,
      function (err, clientData) {
        if (err) {
          res.clearCookie("jwt")
          return res.redirect("/account/login")
        }
      res.locals.clientData = clientData
      res.locals.loggedin = 1
      next()
      })
  } else {
    next()
  }
}

/* ****************************************
 *  Check Login
 * ************************************ */
Util.checkLogin = (req, res, next) => {
  if (res.locals.loggedin) {
    next()
  } else {
    return res.redirect("/account/login")
  }
 }

 /* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util