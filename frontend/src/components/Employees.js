import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Employees(){

  const [employees,setEmployees] = useState([]);
  const [search,setSearch] = useState("");
  const [photo,setPhoto] = useState(null);
  const nav = useNavigate();
  const api = axios.create({ baseURL:"http://localhost:8080/api/v1"});

  useEffect(()=>{ load(); },[]);
  const load = ()=> api.get("/emp/employees").then(res=>setEmployees(res.data));

  const del = id => {
    if(window.confirm("Delete Employee?")){
      api.delete(`/emp/employees/${id}`).then(load);
    }
  };

  const upload = (id)=>{
    if(!photo) return alert("Select a file first");

    let fd = new FormData();
    fd.append("photo",photo);

    api.post(`/emp/employees/upload/${id}`,fd).then(()=>{alert("Photo Updated");load();})
  };

  const filtered = employees.filter(e =>
    e.department.toLowerCase().includes(search.toLowerCase()) ||
    e.position.toLowerCase().includes(search.toLowerCase())
  );

  return(
    <div style={{width:"80%",margin:"auto"}}>

      <h2>Employees List</h2>

      <input 
        placeholder="Search by Department or Position..."
        value={search}
        onChange={e=>setSearch(e.target.value)}
        style={{padding:8,width:280,margin:"10px 0"}}
      /><br/>

      <button onClick={()=>nav("/employees/add")} style={{marginBottom:15}}>➕ Add Employee</button>

      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr><th>Photo</th><th>First</th><th>Last</th><th>Dept</th><th>Position</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {filtered.map(e=>(
            <tr key={e._id}>
              <td>
                {e.photo?
                  <img src={`http://localhost:8080/uploads/${e.photo}`} width={60} height={60}/>
                  :"No Image"}
              </td>
              <td>{e.first_name}</td>
              <td>{e.last_name}</td>
              <td>{e.department}</td>
              <td>{e.position}</td>
              <td>
                <button onClick={()=>nav(`/employees/view/${e._id}`)}>View</button>
                <button onClick={()=>nav(`/employees/edit/${e._id}`)}>Edit</button>
                <button onClick={()=>del(e._id)}>Delete</button><br/>
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
