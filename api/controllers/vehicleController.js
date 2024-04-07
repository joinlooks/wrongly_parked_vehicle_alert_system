const Vehicle = require("../models/vehicle");
const User = require("../models/user");

// Add a new vehicle
exports.addVehicle = async (req, res) => {
    try {
        const { owner, manufacturer, model, year, licensePlate } = req.body;
        // Check if license plate already exists
        let existingVehicle = await Vehicle.findOne({ licensePlate });
        if (existingVehicle) {
            return res.status(400).json({
                message: "Vehicle with this license plate already exists",
            });
        }
        // Create new vehicle
        const newVehicle = new Vehicle({
            owner,
            manufacturer,
            model,
            year,
            licensePlate,
        });
        await newVehicle.save();

        // Update user's vehicles array
        await User.findByIdAndUpdate(owner, {
            $push: { vehicles: newVehicle._id },
        });
        return res.status(201).json({
            message: "Vehicle added successfully",
            vehicle: newVehicle,
        });
    } catch (error) {
        console.error("Error adding vehicle:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Update vehicle information
exports.updateVehicle = async (req, res) => {
    try {
        const vehicleId = req.params.vehicleId; // Assuming vehicleId is passed as a route parameter
        const updates = req.body;
        const vehicle = await Vehicle.findByIdAndUpdate(vehicleId, updates, {
            new: true,
        });
        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }
        return res.status(200).json({
            message: "Vehicle information updated successfully",
            vehicle,
        });
    } catch (error) {
        console.error("Error updating vehicle information:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Get vehicle details
exports.getVehicleDetails = async (req, res) => {
    try {
        const vehicleId = req.params.vehicleId; // Assuming vehicleId is passed as a route parameter
        const vehicle = await Vehicle.findById(vehicleId);
        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }
        return res.status(200).json(vehicle);
    } catch (error) {
        console.error("Error fetching vehicle details:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
