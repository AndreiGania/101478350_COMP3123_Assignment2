import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        if (!email || !password)
            return alert("Please enter email & password");

        try {
            const response = await axios.post("http://localhost:8080/api/v1/user/login", {
                email, password,
            });

            alert("Login Success!");
        } catch(err) {
            alert("Invalid credentials");
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
