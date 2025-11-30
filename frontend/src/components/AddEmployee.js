import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function AddEmployee() {

  const nav = useNavigate();
  const [photo, setPhoto] = useState(null);

  const [f, setF] = useState({
    first_name:"",
    last_name:"",
    email:"",
    department:"",
    position:"",
    salary:"",
    date_of_joining:""
  });

  const submit = async () => {

    for (let key in f) {
      if (!f[key]) return alert(`Missing field: ${key.replace("_"," ")}`);
    }
    
    if (!photo) return alert("Please upload a photo");

    try {
      const res = await api.post("/emp/employees", f);
      const id = res.data.employee._id;

      let fd = new FormData();
      fd.append("photo", photo);

      await api.post(`/emp/employees/upload/${id}`, fd);

      alert("Employee Added Successfully!");
      nav("/employees");

    } catch (err) {
      console.log(err);
      alert("Error adding employee");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card" style={{width:450}}> 
        
        <h2>Add Employee</h2>

        <input placeholder="First Name"
          value={f.first_name}
          onChange={e=>setF({...f,first_name:e.target.value})}/>

        <input placeholder="Last Name"
          value={f.last_name}
          onChange={e=>setF({...f,last_name:e.target.value})}/>

        <input placeholder="Email"
          value={f.email}
          onChange={e=>setF({...f,email:e.target.value})}/>

        <input placeholder="Department"
          value={f.department}
          onChange={e=>setF({...f,department:e.target.value})}/>

        <input placeholder="Position"
          value={f.position}
          onChange={e=>setF({...f,position:e.target.value})}/>

        <input type="number" placeholder="Salary"
          value={f.salary}
          onChange={e=>setF({...f,salary:e.target.value})}/>

        <label style={{fontSize:"14px",float:"left",marginBottom:5}}>Joining Date</label>
        <input type="date"
          value={f.date_of_joining}
          onChange={e=>setF({...f,date_of_joining:e.target.value})}/>

        <input type="file" onChange={e=>setPhoto(e.target.files[0])}/>

        <button onClick={submit}>Save</button>
        <button style={{background:"#888", marginTop:10}} onClick={()=>nav("/employees")}>
          Cancel
        </button>

      </div>
    </div>
  );
}
