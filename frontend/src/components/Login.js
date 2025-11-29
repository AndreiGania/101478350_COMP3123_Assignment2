import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
    if (!email || !password) {
        alert("All fields required");
        return;
    }

    try {
        const res = await fetch("http://localhost:8080/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (res.ok) {
        localStorage.setItem("token", data.token);
        alert("Login successful");
        window.location.href = "/employees";
        } else {
        alert(data.message || "Login failed");
        }
    } catch (err) {
        alert("Server error");
    }
    };


    return (
        <div>
            <h2>Login</h2>

            <input type="email" placeholder="Email"
                value={email} onChange={(e)=>setEmail(e.target.value)} />

            <input type="password" placeholder="Password"
                value={password} onChange={(e)=>setPassword(e.target.value)} />

            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;
