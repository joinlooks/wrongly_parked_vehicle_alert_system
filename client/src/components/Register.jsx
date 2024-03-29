import React, { useState } from "react";
import "./Register.css";

export default function Register() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [errors, setErrors] = useState({}); // Object to store error messages

    const handleChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case "email":
                setEmail(value);
                break;
            case "name":
                setName(value);
                break;
            case "password":
                setPassword(value);
                break;
            case "phone":
                setPhone(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission

        const newErrors = {}; // Reset errors before validation

        // Basic validation (can be extended for more complex checks)
        if (!email || !email.trim()) {
            newErrors.email = "Please enter a valid email address.";
        }
        if (!password || password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long.";
        }

        setErrors(newErrors); // Update errors state if validation fails

        if (Object.keys(newErrors).length === 0) {
            // Form validation passed, handle registration logic here (e.g., API call)
            console.log("Registration successful:", {
                email,
                name,
                password,
                phone,
            }); // Replace with your registration logic
        }
    };

    return (
        <form onSubmit={handleSubmit} className="register">
            <h2>Register</h2>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={handleChange}
                />
                {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={handleChange}
                />
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

            <button type="submit" className="registerButton">
                Register
            </button>
        </form>
    );
}
