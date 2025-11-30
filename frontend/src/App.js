import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Employees from "./components/Employees";
import AddEmployee from "./components/AddEmployee";
import EditEmployee from "./components/EditEmployee";
import ViewEmployee from "./components/ViewEmployee";
import ProtectedRoute from "./components/ProtectedRoute";
import "./styles/App.css";

function App() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <Router>

      <nav className="navbar">

        <div className="nav-left">
          <Link to="/employees">Employees</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
        </div>

        {isLoggedIn && (
          <button 
            className="logout-btn"
            onClick={() => { 
              localStorage.removeItem("token"); 
              window.location = "/login"; 
            }}
          >
            Logout
          </button>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/employees" element={
          <ProtectedRoute><Employees/></ProtectedRoute>
        }/>
        <Route path="/employees/add" element={
          <ProtectedRoute><AddEmployee/></ProtectedRoute>
        }/>
        <Route path="/employees/edit/:id" element={
          <ProtectedRoute><EditEmployee/></ProtectedRoute>
        }/>
        <Route path="/employees/view/:id" element={
          <ProtectedRoute><ViewEmployee/></ProtectedRoute>
        }/>
      </Routes>

    </Router>
  );
}

export default App;
