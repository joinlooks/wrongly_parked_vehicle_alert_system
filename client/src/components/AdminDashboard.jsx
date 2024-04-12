import React, { useState, useEffect } from "react";
import Html5Qrcode from "html5-qrcode"; // QR code scanning library
import "./AdminDashboard.css";

const AdminDashboard = () => {
    const [qrData, setQrData] = useState("");
    let html5QrCode = null;

    useEffect(() => {
        initializeQrCodeScanner();
        return () => {
            stopQrCodeScanner();
        };
    }, []);

    const initializeQrCodeScanner = () => {
        html5QrCode = new Html5Qrcode("qr-reader");
        html5QrCode.start(
            (data) => {
                setQrData(data);
            },
            (error) => {
                console.error("QR code scanner error:", error);
            }
        );
    };

    const stopQrCodeScanner = () => {
        if (html5QrCode) {
            html5QrCode.stop();
        }
    };

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>
            <div className="qr-scanner" id="qr-reader"></div>
            <p>{qrData}</p>
        </div>
    );
};

export default AdminDashboard;
