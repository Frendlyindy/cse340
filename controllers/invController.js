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

module.exports = invCont;