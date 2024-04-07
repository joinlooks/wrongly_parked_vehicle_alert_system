const mongoose = require("mongoose");

const qrCodeSchema = new mongoose.Schema({
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle",
        required: true,
    },
    codeData: { type: String, required: true },
    isValid: { type: Boolean, default: true },
});

module.exports = mongoose.model("QRCode", qrCodeSchema);
