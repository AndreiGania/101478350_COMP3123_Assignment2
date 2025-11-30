import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Employees from "./components/Employees";
import AddEmployee from "./components/AddEmployee";
import EditEmployee from "./components/EditEmployee";
import ViewEmployee from "./components/ViewEmployee";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <Router>

      <nav style={{ padding:10, background:"#eee", marginBottom:20 }}>
        {isLoggedIn ? (
          <>
            <Link to="/login" style={{ marginRight:15 }}>Login</Link>
            <Link to="/signup" style={{ marginRight:15 }}>Signup</Link>
            <Link to="/employees" style={{ marginRight:15 }}>Employees</Link>
            <button 
              onClick={()=>{ localStorage.removeItem("token"); window.location="/login"; }}
              style={{ marginLeft:15 }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ marginRight:15 }}>Login</Link>
            <Link to="/signup" style={{ marginRight:15 }}>Signup</Link>
          </>
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
