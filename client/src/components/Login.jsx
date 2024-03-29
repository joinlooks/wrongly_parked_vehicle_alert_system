import React, { useState } from "react";
import "./Login.css"; // Update the CSS import path

export default function Login() {
    const [username, setUsername] = useState(""); // Use username instead of email
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({}); // Object to store error messages

    const handleChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case "username":
                setUsername(value);
                break;
            case "password":
                setPassword(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission

        const newErrors = {}; // Reset errors before validation

        // Basic validation (can be extended for more complex checks)
        if (!username || !username.trim()) {
            newErrors.username = "Please enter a valid username.";
        }
        if (!password || password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long.";
        }

        setErrors(newErrors); // Update errors state if validation fails

        if (Object.keys(newErrors).length === 0) {
            // Form validation passed, handle login logic here (e.g., API call)
            console.log("Login successful:", { username, password }); // Replace with your login logic
        }
    };

    return (
        <form onSubmit={handleSubmit} className="login">
            <h2>Login</h2>
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
            <button type="submit" className="loginButton">
                Login
            </button>
        </form>
    );
}
