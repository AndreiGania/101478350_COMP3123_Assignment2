import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/ViewEmployee.css";

export default function ViewEmployee() {

  const { id } = useParams();
  const nav = useNavigate();
  const [emp, setEmp] = useState(null);

  useEffect(() => {
    api.get(`/emp/employees/${id}`).then(res => setEmp(res.data));
  }, []);

  if (!emp) return <h3 style={{textAlign:"center"}}>Loading Employee...</h3>;

  return (
    <div className="view-card">

      <h2>Employee Details</h2>

      <div className="photo-box">
        {emp.photo ? (
          <img className="profile-img" src={`http://localhost:8080/uploads/${emp.photo}`} />
        ) : (
          <p>No Profile Image</p>
        )}
      </div>

      <div className="details">
        <p><span>First Name:</span> {emp.first_name}</p>
        <p><span>Last Name:</span> {emp.last_name}</p>
        <p><span>Email:</span> {emp.email}</p>
        <p><span>Department:</span> {emp.department}</p>
        <p><span>Position:</span> {emp.position}</p>
        <p><span>Salary:</span> ${emp.salary}</p>
        <p><span>Date Joined:</span> {emp.date_of_joining?.substring(0,10)}</p>
      </div>

      <button className="back-btn" onClick={() => nav("/employees")}>
        ⬅ Back to List
      </button>

    </div>
  );
}
