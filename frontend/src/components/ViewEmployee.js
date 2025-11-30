import {useEffect,useState} from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function ViewEmployee(){
  const {id}=useParams();
  const nav=useNavigate();
  const [emp,setEmp]=useState(null);

  useEffect(()=>{
    axios.get(`http://localhost:8080/api/v1/emp/employees/${id}`)
      .then(res=>setEmp(res.data));
  },[]);

  if(!emp) return <h3>Loading...</h3>;

  return(
    <div style={{width:350,margin:"auto"}}>
      <h2>View Employee Details</h2>
      <p><b>First Name:</b> {emp.first_name}</p>
      <p><b>Last Name:</b> {emp.last_name}</p>
      <p><b>Department:</b> {emp.department}</p>
      <p><b>Position:</b> {emp.position}</p>

      <button onClick={()=>nav("/employees")}>Back</button>
    </div>
  );
}
