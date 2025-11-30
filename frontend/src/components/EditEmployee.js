import {useState,useEffect} from "react";
import axios from "axios";
import {useParams,useNavigate} from "react-router-dom";

export default function EditEmployee(){

  const {id}=useParams();
  const nav=useNavigate();
  const [f,setF]=useState(null);

  useEffect(()=>{
    axios.get(`http://localhost:8080/api/v1/emp/employees/${id}`).then(res=>setF(res.data));
  },[]);

  const save=()=>{
    axios.put(`http://localhost:8080/api/v1/emp/employees/${id}`,f)
      .then(()=>{alert("Updated!");nav("/employees");});
  };

  if(!f) return <h3>Loading...</h3>;

  return(
    <div style={{width:350,margin:"auto"}}>
      <h2>Update Employee</h2>

      <input value={f.first_name} onChange={e=>setF({...f,first_name:e.target.value})}/><br/>
      <input value={f.last_name} onChange={e=>setF({...f,last_name:e.target.value})}/><br/>
      <input value={f.department} onChange={e=>setF({...f,department:e.target.value})}/><br/>
      <input value={f.position} onChange={e=>setF({...f,position:e.target.value})}/><br/>

      <button onClick={save}>Save</button>
      <button onClick={()=>nav("/employees")}>Cancel</button>
    </div>
  );
}
