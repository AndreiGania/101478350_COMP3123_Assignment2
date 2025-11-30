import { useEffect, useState } from "react";
import axios from "axios";
import "./Employees.css";

export default function Employees() {

  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  // Updated form with required backend fields
  const [form, setForm] = useState({
    first_name:"", last_name:"", email:"",
    department:"", position:"", salary:"",
    date_of_joining:""
  });

  const [edit, setEdit] = useState(null);
  const [photo, setPhoto] = useState(null);

  const api = axios.create({ baseURL:"http://localhost:8080/api/v1" });

  useEffect(() => { loadEmp(); }, []);

  const loadEmp = () => {
    api.get("/emp/employees").then(res => setEmployees(res.data));
  };

  /* ADD OR UPDATE EMPLOYEE */
  const save = () => {

    // validation for required backend fields
    if(!form.first_name || !form.last_name || !form.email || 
       !form.department || !form.position || !form.salary || !form.date_of_joining){
      return alert("❗ All fields are REQUIRED");
    }

    (edit
      ? api.put(`/emp/employees/${edit}`, form)
      : api.post(`/emp/employees`, form)
    )
    .then(() => {
      alert("Employee Saved Successfully ✔");
      loadEmp();
      setForm({
        first_name:"", last_name:"", email:"",
        department:"", position:"", salary:"",
        date_of_joining:""
      });
      setEdit(null);
    })
    .catch(err => console.log("Save error:", err));
  };

  /* DELETE */
  const del = id =>{
    if(window.confirm("Delete employee?")){
      api.delete(`/emp/employees/${id}`).then(loadEmp);
    }
  };

  /* UPLOAD FIXED */
  const upload = id =>{
    if(!photo) return alert("Select an image first");
    let fd = new FormData();
    fd.append("photo", photo);

    api.post(`/emp/employees/upload/${id}`, fd)
      .then(()=>{ alert("Photo Uploaded ✔"); loadEmp(); })
      .catch(()=>alert("Upload Failed ❌"));
  };

  /* FILTER SEARCH DEPT/POSITION */
  const filtered = employees.filter(e =>
    e.department.toLowerCase().includes(search.toLowerCase()) ||
    e.position.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="emp-container">

      <h2>Employee Management</h2>

      <input className="searchBar" placeholder="Search dept or position..."
        value={search} onChange={e=>setSearch(e.target.value)} />

      {/* FORM FIELDS */}
      <div className="formBox">
        <input placeholder="First Name" value={form.first_name}
          onChange={e=>setForm({...form, first_name:e.target.value})}/>
        <input placeholder="Last Name" value={form.last_name}
          onChange={e=>setForm({...form, last_name:e.target.value})}/>
        <input placeholder="Email" value={form.email}
          onChange={e=>setForm({...form, email:e.target.value})}/>
        <input placeholder="Department" value={form.department}
          onChange={e=>setForm({...form, department:e.target.value})}/>
        <input placeholder="Position" value={form.position}
          onChange={e=>setForm({...form, position:e.target.value})}/>
        <input type="number" placeholder="Salary" value={form.salary}
          onChange={e=>setForm({...form, salary:e.target.value})}/>
        <input type="date" value={form.date_of_joining}
          onChange={e=>setForm({...form, date_of_joining:e.target.value})}/>

        <button onClick={save}>{edit ? "Update Employee" : "Add Employee"}</button>
      </div>

      {/* EMPLOYEE TABLE UI */}
      <table>
        <thead>
          <tr>
            <th>Photo</th><th>Name</th><th>Email</th>
            <th>Department</th><th>Position</th><th>Salary</th>
            <th>Date Joined</th><th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map(e=>(
            <tr key={e._id}>
              <td>
                {e.photo ? 
                  <img src={`http://localhost:8080/uploads/${e.photo}`} 
                       alt="" width="60" height="60" style={{borderRadius:"50%"}}/> 
                  : "No Image"}
              </td>

              <td>{e.first_name} {e.last_name}</td>
              <td>{e.email}</td>
              <td>{e.department}</td>
              <td>{e.position}</td>
              <td>${e.salary}</td>
              <td>{new Date(e.date_of_joining).toLocaleDateString()}</td>

              <td>
                <button onClick={()=>{setForm(e); setEdit(e._id);}}>Edit</button>
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
