// Needed resources
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassification);
router.get("/detail/:inv_id", invController.buildByVehicle);
router.get("/", invController.buildManagementView);
router.get("/new-class", invController.buildNewClassView);
router.get("/new-car", invController.buildNewCarView);
router.post("/newClassPost", invController.postNewClass);
router.post("/newCarPost", invController.postNewCar);


module.exports = router;