import { useEffect, useState } from "react";
import api from "../api";

export default function Employees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    api.get("/emp/employees").then(res => setEmployees(res.data));
  }, []);

  return (
    <div>
      <h2>Employees</h2>
      {employees.length === 0 ? "No data" : employees.map(e=>(
        <p key={e._id}>{e.first_name} {e.last_name} — {e.department}</p>
      ))}
    </div>
  );
}
