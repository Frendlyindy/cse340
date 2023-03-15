const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

const invCont = {}

invCont.buildByClassification = async function (req, res, next) {
    const classificationId = req.params.classificationId
    let data = await invModel.getVehiclesByClassificationId
    (classificationId)
    let nav = await utilities.getNav ()
    const className = data [0].classification_name
    res. render ("./inventory/classification-view", { title: className + " vehicles",
    nav, message: null,
    data,
})
}
invCont.buildByVehicle = async function(req, res, next) {
    const vehicleId = req.params.inv_id;
    let data = await invModel.getVehicleData(vehicleId);
    let navBar = await utilities.getNav(); // used to have buildNav here, the error is at Util.buildNav so I thought this would fix it
    let vehicleViewBuild = await utilities.buildVehicleCard(data[0])
    res.render('./inventory/vehicle-detail.ejs',
    {
        
        title: data[0].inv_make + ' ' + data.inv_model,
        navBar,
        message: null,
        view: vehicleViewBuild
    })

}

/* ****************************************
*  Deliver managment view
**************************************** */
invCont.buildManagementView = async function(req, res, next) {
    let nav = await utilities.getNav()
    res.render("inventory/managment-view.ejs", {
      title: "Managment",
      nav,
      errors: null,
      message: null,
      view: utilities.buildManageView()
    })
  }

  invCont.buildNewClassView = async function(req, res, next) {
    let nav = await utilities.getNav()
    res.render("inventory/new-classification.ejs", {
      title: "Add Classification",
      nav,
      errors: null,
      message: null,
    })
  }

  invCont.buildNewCarView = async function(req, res, next) {
    let nav = await utilities.getNav()
    let dropdown = await utilities.buildClassDropdown()
    res.render("inventory/new-vehicle.ejs", {
      title: "Add Vehicle",
      nav,
      dropdown,
      errors: null,
      message: null,
    })
  }
  invCont.postNewClass = async function(req, res, next){
    invModel.sendNewClass(req.body.newClass)
    let nav = await utilities.getNav()
    res.render("inventory/managment-view.ejs", {
      title: "Managment",
      nav,
      errors: null,
      message: null,
      view: utilities.buildManageView()
    })
  }

  invCont.postNewCar = async function(req, res, next){
    let car = req.body;
    invModel.sendNewCar(car.classification, car.make, car.model, car.description, car.imgPath, car.thumb, car.price, car.year, car.miles, car.color)
    let nav = await utilities.getNav()
    res.render("inventory/managment-view.ejs", {
      title: "Managment",
      nav,
      errors: null,
      message: null,
      view: utilities.buildManageView()
    })
  }

module.exports = invCont;