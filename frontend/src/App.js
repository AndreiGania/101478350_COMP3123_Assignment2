import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Employees from './components/Employees';

function App() {
  return (
    <Router>
      <nav style={{ padding: 10, background: "#eee", marginBottom: 20 }}>
        <Link to="/signup" style={{ marginRight: 15 }}>Signup</Link>
        <Link to="/login" style={{ marginRight: 15 }}>Login</Link>
        <Link to="/employees" style={{ marginRight: 15 }}>Employees</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/employees" element={<Employees />} />
      </Routes>
    </Router>
  );
}

export default App;
