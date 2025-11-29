import { useEffect, useState } from "react";
import axios from "axios";
import "./Employees.css"; // optional styling

export default function Employees() {

  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ first_name:"", last_name:"", department:"", position:"" });
  const [edit, setEdit] = useState(null);
  const [photo, setPhoto] = useState(null);

  const api = axios.create({ baseURL:"http://localhost:8080/api/v1" });

  /* LOAD EMPLOYEES */
  useEffect(() => { loadEmp(); }, []);

  const loadEmp = () => {
    api.get("/emp/employees").then(res => setEmployees(res.data));
  };

  /* ADD / UPDATE */
  const save = () =>{
    if(edit){
      api.put(`/emp/employees/${edit}`, form).then(done);
    } else {
      api.post("/emp/employees", form).then(done);
    }
  };

  const done = () =>{
    alert("Success!");
    setForm({first_name:"", last_name:"", department:"", position:""});
    setEdit(null);
    loadEmp();
  };

  /* DELETE */
  const del = id => {
    if(window.confirm("Delete employee?")){
      api.delete(`/emp/employees/${id}`).then(done);
    }
  };

  /* UPLOAD PHOTO (FIXED ROUTE) */
  const upload = id =>{
    if(!photo) return alert("Select a photo first!");
    let fd = new FormData();
    fd.append("photo", photo);

    api.post(`/emp/employees/upload/${id}`, fd)
      .then(() => { alert("Image uploaded!"); loadEmp(); })
      .catch(() => alert("Upload failed"));
  };

  /* FILTER */
  const filtered = employees.filter(e =>
    e.department?.toLowerCase().includes(search.toLowerCase()) ||
    e.position?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="emp-container">

      <h2>Employee Management</h2>

      <input
        placeholder="Search by department or position..."
        value={search}
        onChange={e=>setSearch(e.target.value)}
        className="searchBar"
      />

      {/* CREATE / UPDATE FORM */}
      <div className="formBox">
        <input placeholder="First Name" value={form.first_name}
               onChange={e=>setForm({...form, first_name:e.target.value})}/>
        <input placeholder="Last Name" value={form.last_name}
               onChange={e=>setForm({...form, last_name:e.target.value})}/>
        <input placeholder="Department" value={form.department}
               onChange={e=>setForm({...form, department:e.target.value})}/>
        <input placeholder="Position" value={form.position}
               onChange={e=>setForm({...form, position:e.target.value})}/>
        
        <button onClick={save}>{edit ? "Update" : "Add Employee"}</button>
      </div>

      {/* EMPLOYEE TABLE */}
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
                {e.photo ?
                  <img src={`http://localhost:8080/uploads/${e.photo}`} alt="" style={{width:60,height:60,borderRadius:"50%"}}/>
                  : "No Image"}
              </td>

              <td>{e.first_name} {e.last_name}</td>
              <td>{e.department}</td>
              <td>{e.position}</td>

              <td>
                <button onClick={()=>{setForm(e);setEdit(e._id);}}>Edit</button>
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
