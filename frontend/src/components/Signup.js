import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async () => {
        // 🔥 VALIDATION RULES
        if (!username || !email || !password)
            return alert("All fields are required!");

        if (!email.includes("@"))
            return alert("Invalid email format!");

        if (password.length < 6)
            return alert("Password must be at least 6 characters long!");

        try {
            await axios.post("http://localhost:8080/api/v1/user/signup", {
                username, email, password,
            });
            alert("Signup successful!");
        } catch(err) {
            alert("Signup failed—user may already exist.");
        }
    };

    return (
        <div>
            <h2>Signup</h2>

            <input type="text" placeholder="Username"
                value={username} onChange={(e)=>setUsername(e.target.value)} />

            <input type="email" placeholder="Email"
                value={email} onChange={(e)=>setEmail(e.target.value)} />

            <input type="password" placeholder="Password"
                value={password} onChange={(e)=>setPassword(e.target.value)} />

            <button onClick={handleSignup}>Signup</button>
        </div>
    );
}

export default Signup;
