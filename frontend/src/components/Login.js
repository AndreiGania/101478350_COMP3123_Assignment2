import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/Login.css";

export default function Login() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if(!email || !password) return alert("All fields are required");

    try {
      const res = await api.post("/user/login", { email, password });

      localStorage.setItem("token", res.data.token);
      alert("Login Successful");

      navigate("/employees", { replace:true });

    } catch(err){
      alert("Invalid Login or Server Error");
      console.log(err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>

        <input 
          type="email" 
          placeholder="Email"
          value={email} 
          onChange={e=>setEmail(e.target.value)}
        />

        <input 
          type="password" 
          placeholder="Password"
          value={password} 
          onChange={e=>setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

        <p style={{marginTop:"10px"}}>
          No account? <a href="/signup">Create one</a>
        </p>
      </div>
    </div>
  );
}
