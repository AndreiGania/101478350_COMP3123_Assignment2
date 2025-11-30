import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Employees from "./components/Employees";
import AddEmployee from "./components/AddEmployee";
import ViewEmployee from "./components/ViewEmployee";
import EditEmployee from "./components/EditEmployee";

export default function App() {

  const logout = () => {
    localStorage.removeItem("token");
    alert("Logged out");
    window.location.href = "/login";   // <-- simple + safe redirect
  };

  return (
    <Router>
      <nav style={{ background:"#eee", padding:10, marginBottom:20 }}>
        
        <Link to="/employees" style={{ marginRight:15 }}>Employees</Link>
        <Link to="/employees/add" style={{ marginRight:15 }}>Add Employee</Link>
        <Link to="/login" style={{ marginRight:15 }}>Login</Link>
        <Link to="/signup" style={{ marginRight:15 }}>Signup</Link>

        <button onClick={logout}>Logout</button>
      </nav>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/employees/add" element={<AddEmployee />} />
        <Route path="/employees/view/:id" element={<ViewEmployee />} />
        <Route path="/employees/edit/:id" element={<EditEmployee />} />
      </Routes>

    </Router>
  );
}
