// Needed resources
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const Util = require("../utilities");
const regValidate = require('../utilities/inv-validation')

// Route to build inventory by classification view
router.get("/type/:classificationId", Util.handleErrors(invController.buildByClassification));
router.get("/detail/:inv_id", Util.handleErrors(invController.buildByVehicle));
router.get("/edit/:inv_id", Util.handleErrors(invController.editVehicleView))
router.get("/delete/:inv_id", Util.handleErrors(invController.deleteVehicleConfirmation))
router.post("/sendDelete", Util.handleErrors(invController.deleteVehicle))
router.post("/update/", invController.updateVehicle)
router.get("/", Util.employee, Util.handleErrors(invController.buildManagementView));
router.get("/new-class", Util.employee, Util.handleErrors(invController.buildNewClassView));
router.get("/new-car", Util.employee, Util.handleErrors(invController.buildNewCarView));
router.post("/newClassPost", 
regValidate.newClassRules(),
regValidate.checkRegDataClass,
Util.handleErrors(invController.postNewClass));
router.post("/newCarPost",
regValidate.newVehicleRules(), 
regValidate.checkRegDataVehicle,
Util.handleErrors(invController.postNewCar));
router.get("/getVehicles/:classification_id", Util.handleErrors(invController.getVehiclesJSON))



module.exports = router;