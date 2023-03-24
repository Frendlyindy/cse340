// Needed resources
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const regValidate = require('../utilities/inv-validation')

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassification);
router.get("/detail/:inv_id", invController.buildByVehicle);
router.get("/", invController.buildManagementView);
router.get("/new-class", invController.buildNewClassView);
router.get("/new-car", invController.buildNewCarView);
router.post("/newClassPost", 
regValidate.newClassRules,
regValidate.checkRegDataClass,
invController.postNewClass);
router.post("/newCarPost",
regValidate.newVehicleRules, 
regValidate.checkRegDataVehicle,
invController.postNewCar);


module.exports = router;