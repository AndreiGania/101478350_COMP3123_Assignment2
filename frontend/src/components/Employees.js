import { useEffect, useState } from "react";
import axios from "axios";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  // Form State
  const [form, setForm] = useState({ first_name: "", last_name: "", department: "", position:"" });
  const [editID, setEditID] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);

  const token = localStorage.getItem("token");

  const api = axios.create({
    baseURL: "http://localhost:8080/api/v1",
    headers: { Authorization: `Bearer ${token}` }
  });

  // Fetch employees
  useEffect(() => {
    api.get("/emp/employees").then(res => setEmployees(res.data));
  }, []);

  /* -------------------- CREATE EMPLOYEE -------------------- */
  const addEmployee = () => {
    api.post("/emp/employees", form).then(() => {
      alert("Employee added");
      window.location.reload();
    });
  };

  /* -------------------- UPDATE EMPLOYEE -------------------- */
  const updateEmployee = () => {
    api.put(`/emp/employees/${editID}`, form).then(() => {
      alert("Employee updated");
      window.location.reload();
    });
  };

  /* -------------------- DELETE EMPLOYEE -------------------- */
  const deleteEmployee = (id) => {
    if (window.confirm("Delete this employee?"))
      api.delete(`/emp/employees/${id}`).then(() => window.location.reload());
  };

  /* -------------------- UPLOAD PHOTO -------------------- */
  const uploadPhoto = (id) => {
    if (!photoFile) return alert("Select an image first");

    const fd = new FormData();
    fd.append("photo", photoFile);

    api.post(`/emp/upload/${id}`, fd, {
      headers: { "Content-Type": "multipart/form-data" }
    }).then(() => {
      alert("Photo uploaded");
      window.location.reload();
    });
  };

  /* -------------------- SEARCH FILTER -------------------- */
  const filtered = employees.filter(e =>
    e.department.toLowerCase().includes(search.toLowerCase()) ||
    e.position?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Employees</h2>

      {/* SEARCH BAR */}
      <input
        placeholder="Search department or position..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 15 }}
      />

      {/* ADD/UPDATE FORM */}
      <div>
        <input placeholder="First Name" value={form.first_name}
          onChange={(e)=>setForm({...form, first_name:e.target.value})}/>
        <input placeholder="Last Name" value={form.last_name}
          onChange={(e)=>setForm({...form, last_name:e.target.value})}/>
        <input placeholder="Department" value={form.department}
          onChange={(e)=>setForm({...form, department:e.target.value})}/>
        <input placeholder="Position" value={form.position}
          onChange={(e)=>setForm({...form, position:e.target.value})}/>

        {editID ? (
          <button onClick={updateEmployee}>Update</button>
        ) : (
          <button onClick={addEmployee}>Add Employee</button>
        )}
      </div>

      <hr/>

      {/* EMPLOYEE LIST */}
      {filtered.length === 0 ? <p>No employees found</p> : filtered.map(emp=>(
        <div key={emp._id} style={{ marginBottom:"10px" }}>
          
          {/* SHOW PHOTO IF EXISTS */}
          {emp.photo && (
            <img src={`http://localhost:8080/uploads/${emp.photo}`} width="80" style={{borderRadius:5}}/>
          )}

          <b>{emp.first_name} {emp.last_name}</b> — {emp.department} ({emp.position || "N/A"})  
          <br/>

          <button onClick={()=>{
            setEditID(emp._id);
            setForm(emp);
          }}>Edit</button>

          <button onClick={()=> deleteEmployee(emp._id)}>Delete</button>
          
          {/* FILE UPLOAD */}
          <input type="file" onChange={(e)=>setPhotoFile(e.target.files[0])}/>
          <button onClick={()=>uploadPhoto(emp._id)}>Upload Photo</button>

          <hr/>
        </div>
      ))}
    </div>
  );
}
