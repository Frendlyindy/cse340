const invModel = require("../models/inventory-model")
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
    let ux = `<h1>${car.inv_make} ${car.inv_model} ${car.inv_year}</h1>
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

Util.buildClassDropdown = async function(){
  let data = await invModel.getClassifications()

  let ux = `<option value="" selected disabled hidden>Choose Classification</option>`;
  data.rows.forEach((row) => {
    ux += `<option value="${row.classification_id}">${row.classification_name}</option`
  })

  return ux;
}

module.exports = Util