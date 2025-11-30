import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddEmployee() {

  const nav = useNavigate();
  const [photo, setPhoto] = useState(null);

  const [f, setF] = useState({
    first_name:"",
    last_name:"",
    email:"",
    position:"",
    salary:"",
    date_of_joining:"",
    department:""
  });

  const submit = async () => {

    // Validate required fields
    for (let key in f) {
      if (!f[key]) return alert(`Missing field: ${key}`);
    }
    if(!photo) return alert("Please upload a photo");

    // Step 1 → Create Employee
    const res = await axios.post("http://localhost:8080/api/v1/emp/employees", f);
    const id = res.data.employee._id;

    // Step 2 → Upload Photo
    let fd = new FormData();
    fd.append("photo", photo);

    await axios.post(`http://localhost:8080/api/v1/emp/employees/upload/${id}`, fd);

    alert("Employee Added Successfully!");
    nav("/employees");
  };

  return (
    <div style={{width:400,margin:"auto",textAlign:"center"}}>
      <h2>Add Employee</h2>

      <input placeholder="First Name" 
             value={f.first_name} 
             onChange={e=>setF({...f,first_name:e.target.value})}/><br/><br/>

      <input placeholder="Last Name" 
             value={f.last_name} 
             onChange={e=>setF({...f,last_name:e.target.value})}/><br/><br/>

      <input placeholder="Email" 
             value={f.email} 
             onChange={e=>setF({...f,email:e.target.value})}/><br/><br/>

      <input placeholder="Department" 
             value={f.department} 
             onChange={e=>setF({...f,department:e.target.value})}/><br/><br/>

      <input placeholder="Position" 
             value={f.position} 
             onChange={e=>setF({...f,position:e.target.value})}/><br/><br/>

      <input type="number" placeholder="Salary" 
             value={f.salary} 
             onChange={e=>setF({...f,salary:e.target.value})}/><br/><br/>

      <label>Joining Date:</label><br/>
      <input type="date"
             value={f.date_of_joining}
             onChange={e=>setF({...f,date_of_joining:e.target.value})}/><br/><br/>

      <input type="file" onChange={e=>setPhoto(e.target.files[0])}/><br/><br/>

      <button onClick={submit} style={{marginRight:10}}>Save</button>
      <button onClick={()=>nav("/employees")}>Cancel</button>

    </div>
  );
}
