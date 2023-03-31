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
        
        title: data[0].inv_make + ' ' + data[0].inv_model,
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
    let dropdown = await utilities.buildClassDropdown()
    res.render("inventory/managment-view.ejs", {
      title: "Managment",
      nav,
      errors: null,
      message: null,
      view: utilities.buildManageView(),
      dropdown
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
    let message = 'New Class Added!';
    res.render("inventory/managment-view.ejs", {
      title: "Managment",
      nav,
      errors: null,
      message,
      view: utilities.buildManageView()
    })
  }

  invCont.postNewCar = async function(req, res, next){
    let car = req.body;
    invModel.sendNewCar(car.classification, car.make, car.model, car.description, car.imgPath, car.thumb, car.price, car.year, car.miles, car.color)
    let nav = await utilities.getNav()
    let message = 'New Vehicle Added!';
    res.render("inventory/managment-view.ejs", {
      title: "Managment",
      nav,
      errors: null,
      message,
      view: utilities.buildManageView()
    })
  }

  /* ***************************
 *  Return Vehicles by Classification As JSON
 * ************************** */
invCont.getVehiclesJSON = async (req, res, next) => {
  const classification_id = parseInt(req.params.classification_id)
  const vehicleData = await invModel.getVehiclesByClassificationId(classification_id)
  if (vehicleData[0].inv_id) {
    return res.json(vehicleData)
  } else {
    next(new Error("No data returned"))
  }
}

/* ***************************
 *  Build edit vehicle view
 * ************************** */
invCont.editVehicleView = async function (req, res, next) {
  const inv_id = parseInt(req.params.inv_id)
  let nav = await utilities.getNav()
  const vehicleData = await invModel.getVehiclesByVehicleId(inv_id)
  console.log(vehicleData)
  const dropdown = await utilities.buildClassDropdown(vehicleData.classification_id)
  const vehicleName = `${vehicleData.inv_make} ${vehicleData.inv_model}`
  res.render("./inventory/edit-vehicle", {
    title: "Edit " + vehicleName,
    nav,
    dropdown: dropdown,
    message: null,
    errors: null,
    inv_id: vehicleData.inv_id,
    inv_make: vehicleData.inv_make,
    inv_model: vehicleData.inv_model,
    inv_year: vehicleData.inv_year,
    inv_description: vehicleData.inv_description,
    inv_image: vehicleData.inv_image,
    inv_thumbnail: vehicleData.inv_thumbnail,
    inv_price: vehicleData.inv_price,
    inv_miles: vehicleData.inv_miles,
    inv_color: vehicleData.inv_color,
    classification_id: vehicleData.classification_id
  })
}

/* ***************************
 *  Build edit vehicle view
 * ************************** */
invCont.deleteVehcileConfirmation = async function (req, res, next) {
  const inv_id = parseInt(req.params.inv_id)
  let nav = await utilities.getNav()
  const vehicleData = await invModel.getVehiclesByVehicleId(inv_id)
  console.log(vehicleData)
  const dropdown = await utilities.buildClassDropdown(vehicleData.classification_id)
  const vehicleName = `${vehicleData.inv_make} ${vehicleData.inv_model}`
  res.render("./inventory/delete-confirmation", {
    title: "Edit " + vehicleName,
    nav,
    dropdown: dropdown,
    message: null,
    errors: null,
    inv_id: vehicleData.inv_id,
    inv_make: vehicleData.inv_make,
    inv_model: vehicleData.inv_model,
    inv_year: vehicleData.inv_year,
    inv_description: vehicleData.inv_description,
    inv_image: vehicleData.inv_image,
    inv_thumbnail: vehicleData.inv_thumbnail,
    inv_price: vehicleData.inv_price,
    inv_miles: vehicleData.inv_miles,
    inv_color: vehicleData.inv_color,
    classification_id: vehicleData.classification_id
  })
}

/* ***************************
 *  Update Vehicle Data
 * ************************** */
invCont.updateVehicle = async function (req, res, next) {
  let nav = await utilities.getNav()
  const {
    inv_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id,
  } = req.body
  const updateResult = await invModel.updateVehicle(
    inv_id,  
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id
  )

  if (updateResult) {
    const vehicleName = updateResult.inv_make + " " + updateResult.inv_model
    const classificationSelect = await utilities.buildClassificationList(classification_id)
    res.status(201).render("inventory/management", {
      title: "Vehicle Management",
      nav,
      classificationSelect,
      message: `The ${vehicleName} was successfully updated.`,
      errors: null,
    })
  } else {
    const inv_id = inv_id
    const classificationSelect = await utilities.buildClassificationList(classification_id)
    const vehicleName = `${inv_make} ${inv_model}`
    res.status(501).render("inventory/edit-vehicle", {
    title: "Edit " + vehicleName,
    nav,
    classificationSelect: classificationSelect,
    message: "Sorry, the update failed.",
    errors: null,
    inv_id,
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id
    })
  }
}

/* ***************************
 *  delete Vehicle Data
 * ************************** */
invCont.deleteVehicle = async function (req, res, next) {
  let nav = await utilities.getNav()
  const {
    inv_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id,
  } = req.body
  const deleteResult = await invModel.deleteVehicle(
    inv_id,  
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id
  )

  if (deleteResult) {
    const vehicleName = deleteResult.inv_make + " " + deleteResult.inv_model
    const classificationSelect = await utilities.buildClassificationList(classification_id)
    res.status(201).render("inventory/management", {
      title: "Vehicle Management",
      nav,
      classificationSelect,
      message: `The ${vehicleName} was successfully updated.`,
      errors: null,
    })
  } else {
    const inv_id = inv_id
    const classificationSelect = await utilities.buildClassificationList(classification_id)
    const vehicleName = `${inv_make} ${inv_model}`
    res.status(501).render("inventory/edit-vehicle", {
    title: "Edit " + vehicleName,
    nav,
    classificationSelect: classificationSelect,
    message: "Sorry, the delete failed.",
    errors: null,
    inv_id,
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id
    })
  }
}

module.exports = invCont;