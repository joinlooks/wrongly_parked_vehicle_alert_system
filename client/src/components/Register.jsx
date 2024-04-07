import React, { useState } from "react";
import axios from "axios";
import "./Register.css";

export default function Register() {
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [vehicles, setVehicles] = useState([]); // Array to store vehicle objects
    const [errors, setErrors] = useState({}); // Object to store error messages

    const handleChange = (event) => {
        const { name, value, type } = event.target;
        setUsername((prevUsername) =>
            name === "username" ? value : prevUsername
        );
        setPhone((prevPhone) => (name === "phone" ? value : prevPhone));
        setPassword((prevPassword) =>
            name === "password" ? value : prevPassword
        );
        setIsAdmin(type === "checkbox" ? event.target.checked : value);
    };

    const handleVehicleChange = (event, index) => {
        const newVehicles = [...vehicles]; // Copy existing vehicle array
        // Assuming vehicles have properties like manufacturer, model, year, licensePlate
        newVehicles[index][event.target.name] = event.target.value;
        setVehicles(newVehicles);
    };

    const handleAddVehicle = () => {
        setVehicles([
            ...vehicles,
            { manufacturer: "", model: "", year: "", licensePlate: "" },
        ]); // Add an empty vehicle object
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newErrors = {}; // Reset errors before validation

        // Basic validation (can be extended for more complex checks)
        if (!username || !username.trim()) {
            newErrors.username = "Please enter a username.";
        }
        if (!phone || !phone.trim()) {
            newErrors.phone = "Please enter a phone number.";
        }
        if (!password || password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long.";
        }

        // Vehicle level validation (optional, adjust based on your requirements)
        vehicles.forEach((vehicle, index) => {
            if (!vehicle.manufacturer || !vehicle.manufacturer.trim()) {
                newErrors[`vehicle${index + 1}Manufacturer`] =
                    "Please enter a manufacturer.";
            }
            if (!vehicle.model || !vehicle.model.trim()) {
                newErrors[`vehicle${index + 1}Model`] = "Please enter a model.";
            }
            if (!vehicle.year) {
                newErrors[`vehicle${index + 1}Year`] = "Please enter a year.";
            }
            if (!vehicle.licensePlate || !vehicle.licensePlate.trim()) {
                newErrors[`vehicle${index + 1}LicensePlate`] =
                    "Please enter a license plate.";
            }
        });

        setErrors(newErrors); // Update errors state for rendering

        if (Object.keys(newErrors).length > 0) {
            // Display validation errors to the user (handled in JSX)
            return;
        }

        const user = {
            username,
            phone,
            password,
            isAdmin,
            vehicles,
        };

        try {
            const response = await axios.post("/api/users", user); // Assuming backend API endpoint
            console.log("Registration successful:", response.data);
            // Handle successful registration (e.g., redirect to login page)
        } catch (error) {
            console.error("Registration failed:", error.response.data);
            // Handle registration errors (e.g., display error message to the user)
        }
    };

    return (
        <form onSubmit={handleSubmit} className="register">
            <h2>Register</h2>
            <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    onChange={handleChange}
                />
                {errors.username && <p className="error">{errors.username}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="phone">Phone Number:</label>
                <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={phone}
                    onChange={handleChange}
                />
                {errors.phone && <p className="error">{errors.phone}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={handleChange}
                />
                {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <div className="form-group">
                <label className="checkbox">
                    <div>Is Admin?</div>
                    <input
                        type="checkbox"
                        name="isAdmin"
                        id="isAdmin"
                        checked={isAdmin}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div className="form-group">
                <h3>Vehicles</h3>
                {vehicles.map((vehicle, index) => (
                    <div key={index} className="vehicle-input">
                        <label htmlFor={`vehicle${index + 1}Manufacturer`}>
                            Manufacturer:
                        </label>
                        <input
                            type="text"
                            name="manufacturer"
                            id={`vehicle${index + 1}Manufacturer`}
                            placeholder="Manufacturer"
                            value={vehicle.manufacturer}
                            onChange={(e) => handleVehicleChange(e, index)}
                        />
                        {errors[`vehicle${index + 1}Manufacturer`] && (
                            <p className="error">
                                {errors[`vehicle${index + 1}Manufacturer`]}
                            </p>
                        )}
                        <label htmlFor={`vehicle${index + 1}Model`}>
                            Model:
                        </label>
                        <input
                            type="text"
                            name="model"
                            id={`vehicle${index + 1}Model`}
                            placeholder="Model"
                            value={vehicle.model}
                            onChange={(e) => handleVehicleChange(e, index)}
                        />
                        {errors[`vehicle${index + 1}Model`] && (
                            <p className="error">
                                {errors[`vehicle${index + 1}Model`]}
                            </p>
                        )}
                        <label htmlFor={`vehicle${index + 1}Year`}>Year:</label>
                        <input
                            type="number"
                            name="year"
                            id={`vehicle${index + 1}Year`}
                            placeholder="Year"
                            value={vehicle.year}
                            onChange={(e) => handleVehicleChange(e, index)}
                        />
                        {errors[`vehicle${index + 1}Year`] && (
                            <p className="error">
                                {errors[`vehicle${index + 1}Year`]}
                            </p>
                        )}
                        <label htmlFor={`vehicle${index + 1}LicensePlate`}>
                            License Plate:
                        </label>
                        <input
                            type="text"
                            name="licensePlate"
                            id={`vehicle${index + 1}LicensePlate`}
                            placeholder="License Plate"
                            value={vehicle.licensePlate}
                            onChange={(e) => handleVehicleChange(e, index)}
                        />
                        {errors[`vehicle${index + 1}LicensePlate`] && (
                            <p className="error">
                                {errors[`vehicle${index + 1}LicensePlate`]}
                            </p>
                        )}
                    </div>
                ))}
                <button
                    type="button"
                    className="addVehicleButton"
                    onClick={handleAddVehicle}
                >
                    Add Vehicle
                </button>
            </div>
            <button type="submit" className="registerButton">
                Register
            </button>
        </form>
    );
}
