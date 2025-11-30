import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddEmployee(){

  const [f,setF] = useState({first_name:"",last_name:"",department:"",position:""});
  const nav = useNavigate();
  const api = axios.create({ baseURL:"http://localhost:8080/api/v1"});

  const save=()=>{
    if(!f.first_name||!f.last_name||!f.department||!f.position)
        return alert("All fields required");

    api.post("/emp/employees",f).then(()=>{
      alert("Employee Added");
      nav("/employees");
    });
  };

  return(
    <div style={{width:350,margin:"auto"}}>
      <h2>Add Employee</h2>
      <input placeholder="First Name" onChange={e=>setF({...f,first_name:e.target.value})}/><br/>
      <input placeholder="Last Name" onChange={e=>setF({...f,last_name:e.target.value})}/><br/>
      <input placeholder="Department" onChange={e=>setF({...f,department:e.target.value})}/><br/>
      <input placeholder="Position" onChange={e=>setF({...f,position:e.target.value})}/><br/>
      <button onClick={save}>Save</button>
      <button onClick={()=>nav("/employees")}>Cancel</button>
    </div>
  );
}
