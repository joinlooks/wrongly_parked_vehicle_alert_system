const express = require("express");
const router = express.Router();
const vehicleController = require("../controllers/vehicleController");
const { verifyTokenAndAdmin, verifyToken } = require("./verifyToken");

// Route to add a new vehicle
router.post("/add", verifyToken, vehicleController.addVehicle);

// Route to update vehicle information
router.put("/:vehicleId", verifyToken, vehicleController.updateVehicle);

// Route to get vehicle details
router.get(
    "/:vehicleId",
    verifyTokenAndAdmin,
    vehicleController.getVehicleDetails
);

module.exports = router;
