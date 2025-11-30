import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Employees(){

  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  const nav = useNavigate();
  const api = axios.create({ baseURL: "http://localhost:8080/api/v1" });

  // Load employees on page open
  useEffect(() => { load(); }, []);

  const load = () => api.get("/emp/employees").then(res => setEmployees(res.data));

  // Delete employee
  const del = id => {
    if(window.confirm("Delete Employee?")){
      api.delete(`/emp/employees/${id}`).then(load);
    }
  };

  // Search filter
  const filtered = employees.filter(e =>
    e.department?.toLowerCase().includes(search.toLowerCase()) ||
    e.position?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ width:"80%", margin:"auto" }}>

      <h2 style={{ marginTop:20 }}>Employees List</h2>

      {/* SEARCH BAR */}
      <input 
        placeholder="Search by Department or Position..."
        value={search}
        onChange={e=>setSearch(e.target.value)}
        style={{
          padding:8,
          width:280,
          margin:"10px 0",
          border:"1px solid #888",
          borderRadius:4
        }}
      /><br/>

      {/* ADD EMPLOYEE BUTTON */}
      <button 
        onClick={()=>nav("/employees/add")}
        style={{ marginBottom:15, padding:"6px 12px", cursor:"pointer"}}
      >
        ➕ Add Employee
      </button>

      {/* EMPLOYEE TABLE */}
      <table border="1" width="100%" cellPadding="10">
        <thead style={{ background:"#f2f2f2" }}>
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
                {e.photo ?
                  <img src={`http://localhost:8080/uploads/${e.photo}`} 
                       width={60} height={60} 
                       style={{ borderRadius:"6px", objectFit:"cover" }}
                  />
                : "No Image"}
              </td>

              <td>{e.first_name}</td>
              <td>{e.last_name}</td>
              <td>{e.department}</td>
              <td>{e.position}</td>

              <td>
                <button onClick={()=>nav(`/employees/view/${e._id}`)}>View</button>
                <button onClick={()=>nav(`/employees/edit/${e._id}`)}>Edit</button>
                <button onClick={()=>del(e._id)} style={{ color:"red" }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
