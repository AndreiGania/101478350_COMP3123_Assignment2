import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import "../styles/Employees.css";

export default function Employees(){

  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  const nav = useNavigate();

  useEffect(() => { load(); }, []);
  const load = () => api.get("/emp/employees").then(res => setEmployees(res.data));

  const del = id => {
    if(window.confirm("Delete Employee?")){
      api.delete(`/emp/employees/${id}`).then(load);
    }
  };

  const filtered = employees.filter(e =>
    e.department?.toLowerCase().includes(search.toLowerCase()) ||
    e.position?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="employee-container">

      <h2>Employees List</h2>

      <div className="employee-controls">
        <input
          className="search-box"
          placeholder="Search by Department or Position..."
          value={search}
          onChange={e=>setSearch(e.target.value)}
        />
        <button className="add-btn" onClick={()=>nav("/employees/add")}>
          + Add Employee
        </button>
      </div>

      <table className="employee-table">
        <thead>
          <tr>
            <th>Photo</th>
            <th>First</th>
            <th>Last</th>
            <th>Dept</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map(e=>(
            <tr key={e._id}>
              <td>
                {e.photo ? (
                  <img src={`http://localhost:8080/uploads/${e.photo}`} alt="" />
                ) : "No Image"}
              </td>

              <td>{e.first_name}</td>
              <td>{e.last_name}</td>
              <td>{e.department}</td>
              <td>{e.position}</td>

              <td>
                <button className="action-btn view-btn"  onClick={()=>nav(`/employees/view/${e._id}`)}>View</button>
                <button className="action-btn edit-btn"  onClick={()=>nav(`/employees/edit/${e._id}`)}>Edit</button>
                <button className="action-btn delete-btn" onClick={()=>del(e._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
