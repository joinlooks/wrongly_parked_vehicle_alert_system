const express = require('express');
const router = express.Router();
const qrCodeController = require('../controllers/qrCodeController');
const { verifyTokenAndAdmin } = require('./verifyToken');

router.post('/generate', verifyTokenAndAdmin, qrCodeController.generateQRCode);
router.post('/validate',verifyTokenAndAdmin, qrCodeController.validateQRCode);
router.get('/:qrCodeId', qrCodeController.getQRCodeDetails);

module.exports = router;
