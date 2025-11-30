import React, { useState } from 'react';
import api from "../api";
import "../styles/Signup.css";

function Signup() {

    const [username, setUsername] = useState("");
    const [email, setEmail]     = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async () => {

        if (!username || !email || !password)
            return alert("All fields are required!");

        if (!email.includes("@"))
            return alert("Invalid email format!");

        if (password.length < 6)
            return alert("Password must be at least 6 characters long!");

        try {
            await api.post("/user/signup", { username, email, password });
            alert("Signup successful!");
            window.location.href = "/login";
        } 
        catch(err) {
            alert(err.response?.data?.message || "Signup failed. User may already exist.");
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-card">

                <h2>Signup</h2>

                <input type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e=>setUsername(e.target.value)}
                />

                <input type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                />

                <input type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                />

                <button onClick={handleSignup}>Signup</button>

                <p style={{marginTop:"10px"}}>
                    Already registered? <a href="/login">Login</a>
                </p>

            </div>
        </div>
    );
}

export default Signup;
