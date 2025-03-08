// src/pages/Register.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/login.css"; // Import the login.css stylesheet

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://blog-backend-kh3c.onrender.com';

const Register = () => {
  const [username, setUsername] = useState("");  // Use "username" per your backend
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, { username, email, password });
      console.log('Registration successful. Response:', response.data);
      navigate("/login"); // Redirect to login after successful registration
    } catch (err) {
      if (err.response) {
        // Server responded with a status other than 2xx (e.g., 400, 500)
        console.error('Registration failed. Status:', err.response.status);
        console.error('Error data:', err.response.data);
        setError(`Registration failed: ${err.response.data.error || 'Unknown server error'}`);
      } else if (err.request) {
        // Request was made but no response received (e.g., network error or server down)
        console.error('No response received. Network error or server is down.');
        setError('Network error: Unable to connect to the server.');
      } else {
        // Other errors (e.g., request setup issues)
        console.error('Error during registration:', err.message);
        setError(`Registration error: ${err.message}`);
      }
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      <footer>
          <p style={{ marginBottom: "-10px", fontSize: "1.1rem", textAlign: "center" }}>
            <strong>Developed by:</strong> Dr. Kato Samuel Namuene
          </p>
          <p style={{ fontSize: "1.1rem", textAlign: "center"  }}>
            <strong>Email:</strong> kato.namuene@ubuea.cm
          </p>
        </footer>
    </div>
  );
};

export default Register;
