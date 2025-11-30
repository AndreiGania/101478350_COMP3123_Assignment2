import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Employees from "./components/Employees";
import { useState, useEffect } from "react";

function App() {
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuth(!!token);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setAuth(false);
    navigate("/login");
  };

  return (
    <div>
      <nav style={{ padding: 10, background: "#eee", marginBottom: 20 }}>
        
        {!auth && <Link to="/signup" style={{ marginRight: 15 }}>Signup</Link>}
        {!auth && <Link to="/login" style={{ marginRight: 15 }}>Login</Link>}
        
        {auth && <Link to="/employees" style={{ marginRight: 15 }}>Employees</Link>}
        {auth && <button onClick={logout} style={{ marginLeft: 15 }}>Logout</button>}
      </nav>

      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/employees" element={<Employees />} />
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
