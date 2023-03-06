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

Util.buildNewClass = async function(data){
  let ux = `
  <form action="" method="post">
        <label for="new-class">Classification Name</label>
        <p>Name may NOT contain a space or special character of any kind</p>
        <input type="text" name="new-class" id="new-class">
        <button type="submit">Add Classification</button>
      </form>
  `;

  return ux;
}

Util.buildVehicleForm = async function(data){
  let ui = `
  <form action="" method="post">
  <label for="classification">Classification</label>
  <select name="classification" id="classification">
    <option value="" selected disabled hidden>Choose Classification</option>
    <option value="custom">Custom</option>
    <option value="sedan">Sedan</option>
    <option value="sport">Sport</option>
    <option value="suv">SUV</option>
    <option value="truck">Truck</option>
  </select>
  <label for="make">Make</label>
  <input type="text" name="make" id="make">
  <label for="model">Model</label>
  <input type="text" name="model" id="model">
  <label for="desc">Description</label>
  <textarea name="desc" id="desc" cols="30" rows="10"></textarea>
  <label for="img-path">Image Path</label>
  <input type="text" name="img-path" id="img-path">
  <label for="thumb">Thumbnail Path</label>
  <input type="text" name="thumb" id="thumb">
  <label for="price">Price</label>
  <input type="text" name="price" id="price">
  <label for="year">Year</label>
  <input type="text" name="year" id="year">
  <label for="miles">Miles</label>
  <input type="number" name="miles" id="miles">
  <label for="color">Color</label>
  <input type="text" name="color" id="color">
  <button type="submit">Add Vehicle</button>
</form>
  `;

  return ui;
}

module.exports = Util