// Needed resources
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");

// Route to build vehicle card
router.get("/type/:vehicleId", invController.buildByVehicle);

module.exports = router;