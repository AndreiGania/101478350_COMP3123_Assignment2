import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Employees.css"; // optional styling

export default function Employees() {

  const navigate = useNavigate();

  // redirect if user not logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Login required!");
      navigate("/login");
    }
  }, [navigate]);

  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ first_name:"", last_name:"", department:"", position:"" });
  const [edit, setEdit] = useState(null);
  const [photo, setPhoto] = useState(null);

  const api = axios.create({ baseURL:"http://localhost:8080/api/v1" });

  // Load employees
  useEffect(() => loadEmp(), []);

  const loadEmp = () => {
    api.get("/emp/employees")
      .then(res => setEmployees(res.data))
      .catch(() => alert("Failed to fetch employees"));
  };

  // Save (Add or Update)
  const save = () => {
    if (!form.first_name || !form.last_name || !form.department || !form.position)
      return alert("All fields required!");

    const request = edit
      ? api.put(`/emp/employees/${edit}`, form)
      : api.post(`/emp/employees`, form);

    request.then(() => {
      alert("Employee saved!");
      setForm({ first_name:"", last_name:"", department:"", position:"" });
      setEdit(null);
      loadEmp();
    })
    .catch(err => {
      console.log(err);
      alert("Error saving employee");
    });
  };

  // Delete employee
  const del = id => {
    if (window.confirm("Delete employee?")) {
      api.delete(`/emp/employees/${id}`)
         .then(() => loadEmp());
    }
  };

  // Upload photo
  const upload = id => {
    if (!photo) return alert("Pick a file first!");

    const fd = new FormData();
    fd.append("photo", photo);

    api.post(`/emp/employees/upload/${id}`, fd)
      .then(() => loadEmp())
      .catch(() => alert("Upload failed"));
  };

  // Search by department OR position
  const filtered = employees.filter(e =>
    e.department?.toLowerCase().includes(search.toLowerCase()) ||
    e.position?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="emp-container">

      <h2>Employee Management</h2>

      {/* Search */}
      <input
        placeholder="Search by department / position"
        value={search}
        onChange={e=>setSearch(e.target.value)}
        className="searchBar"
      />

      {/* Form */}
      <div className="formBox">
        <input placeholder="First Name" value={form.first_name}
               onChange={e=>setForm({...form, first_name:e.target.value})}/>
        <input placeholder="Last Name" value={form.last_name}
               onChange={e=>setForm({...form, last_name:e.target.value})}/>
        <input placeholder="Department" value={form.department}
               onChange={e=>setForm({...form, department:e.target.value})}/>
        <input placeholder="Position" value={form.position}
               onChange={e=>setForm({...form, position:e.target.value})}/>

        <button onClick={save}>{edit ? "Update Employee" : "Add Employee"}</button>
      </div>

      {/* Employee Table */}
      <table>
        <thead>
          <tr>
            <th>Photo</th><th>Name</th><th>Dept</th><th>Position</th><th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map(e=>(
            <tr key={e._id}>
              <td>
                {e.photo
                  ? <img src={`http://localhost:8080/uploads/${e.photo}`} alt="" 
                         style={{width:50,height:50,borderRadius:"50%"}}/>
                  : "No Image"}
              </td>
              <td>{e.first_name} {e.last_name}</td>
              <td>{e.department}</td>
              <td>{e.position}</td>

              <td>
                <button onClick={()=>{ setEdit(e._id); setForm(e); }}>Edit</button>
                <button onClick={()=>del(e._id)}>Delete</button>

                <input type="file" onChange={e=>setPhoto(e.target.files[0])}/>
                <button onClick={()=>upload(e._id)}>Upload</button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}
