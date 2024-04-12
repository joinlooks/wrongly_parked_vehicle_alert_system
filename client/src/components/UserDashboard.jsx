import React, { useState, useEffect } from "react";
import axios from "axios"; // Assuming you're using Axios for HTTP requests
import "./UserDashboard.css";

const UserDashboard = ({ userId, vehicleId }) => {
    // const [userData, setUserData] = useState(null);
    // const [vehicles, setVehicles] = useState([]);

    const userData = {
        username: "katy",
        phone: "9876543210",
        qrcode: "asdft5452nsdle",
    };

    const vehicles = [
        {
            manufacturer: "Tata",
            model: "Nano",
            year: 2010,
            licensePlate: "MP 09 QW 1234",
        },
        {
            manufacturer: "Honda",
            model: "CB350",
            year: 2021,
            licensePlate: "MP 12 QW 0987",
        },
    ];

    // useEffect(() => {
    //     // Fetch user data and vehicles associated with the user
    //     const fetchUserData = async () => {
    //         try {
    //             const userResponse = await axios.get(`/api/users/${userId}`);
    //             const vehiclesResponse = await axios.get(
    //                 `/api/users/${userId}/vehicles`
    //             );

    //             setUserData(userResponse.data);
    //             setVehicles(vehiclesResponse.data);
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //         }
    //     };

    //     fetchUserData();
    // }, [userId]);

    const handleAddVehicle = async () => {
        // Add vehicle logic here
        // You can open a modal or navigate to a separate page for adding vehicles
    };

    return (
        <div className="dashboard-container">
            {userData && (
                <div className="user-info">
                    <h2>User Information</h2>
                    <p>Username: {userData.username}</p>
                    <p>Phone Number: {userData.phone}</p>
                    <p>QR Code: {userData.qrcode}</p>
                    {/* Display QR code image here if needed */}
                    <p>Admin: {userData.isAdmin ? "Yes" : "No"}</p>
                </div>
            )}

            <div className="vehicles-section">
                <h2>Vehicles</h2>
                {vehicles.length > 0 ? (
                    <ul>
                        {vehicles.map((vehicle) => (
                            <li key={vehicle._id}>
                                <strong>
                                    {vehicle.manufacturer} {vehicle.model}
                                </strong>{" "}
                                ({vehicle.year}) - License Plate:{" "}
                                {vehicle.licensePlate}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No vehicles found.</p>
                )}
                <button onClick={handleAddVehicle}>Add Vehicle</button>
            </div>
        </div>
    );
};

export default UserDashboard;
