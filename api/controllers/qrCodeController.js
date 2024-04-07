const QRCode = require('../models/qrCode'); // Assuming QRCode model is defined in 'qrCode.js'

// Generate QR code for a vehicle
exports.generateQRCode = async (req, res) => {
    try {
        const { vehicleId, codeData } = req.body;
        // Check if QR code for the vehicle already exists
        let existingQRCode = await QRCode.findOne({ vehicle: vehicleId });
        if (existingQRCode) {
            return res.status(400).json({ message: 'QR code for this vehicle already exists' });
        }
        // Create new QR code
        const newQRCode = new QRCode({ vehicle: vehicleId, codeData });
        await newQRCode.save();
        return res.status(201).json({ message: 'QR code generated successfully', qrCode: newQRCode });
    } catch (error) {
        console.error('Error generating QR code:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Validate QR code
exports.validateQRCode = async (req, res) => {
    try {
        const qrCodeData = req.body.codeData;
        // Check if QR code exists
        const qrCode = await QRCode.findOne({ codeData: qrCodeData });
        if (!qrCode) {
            return res.status(404).json({ message: 'QR code not found or invalid' });
        }
        return res.status(200).json({ message: 'QR code validated successfully', qrCode });
    } catch (error) {
        console.error('Error validating QR code:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Get QR code details
exports.getQRCodeDetails = async (req, res) => {
    try {
        const qrCodeId = req.params.qrCodeId; // Assuming qrCodeId is passed as a route parameter
        const qrCode = await QRCode.findById(qrCodeId);
        if (!qrCode) {
            return res.status(404).json({ message: 'QR code not found' });
        }
        return res.status(200).json(qrCode);
    } catch (error) {
        console.error('Error fetching QR code details:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
