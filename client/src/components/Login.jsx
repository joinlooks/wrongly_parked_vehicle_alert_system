import React, { useState } from "react";
import axios from "axios";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false); // Default to not admin
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value, type } = event.target;
        setUsername(name === "username" ? value : username);
        setPassword(name === "password" ? value : password);
        setIsAdmin(type === "checkbox" ? event.target.checked : isAdmin);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newErrors = {};

        if (!username || !username.trim()) {
            newErrors.username = "Please enter a username.";
        }
        if (!password || password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long.";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        const loginEndpoint = isAdmin ? "/api/admin/login" : "/api/users/login";
        try {
            const response = await axios.post(loginEndpoint, {
                username,
                password,
            });
            console.log("Login successful:", response.data);
            // Handle successful login (e.g., redirect to appropriate dashboard)
        } catch (error) {
            console.error("Login failed:", error.response.data);
            setErrors({ global: "Invalid username or password." });
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
            {errors.global && <p className="error">{errors.global}</p>}
            <button type="submit" className="loginButton">
                Login
            </button>
        </form>
    );
}
