import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/EditEmployee.css";

export default function EditEmployee() {

  const { id } = useParams();
  const nav = useNavigate();

  const [f, setF] = useState(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    api.get(`/emp/employees/${id}`)
      .then(res => setF(res.data));
  }, []);

  const save = async () => {
    try {
      await api.put(`/emp/employees/${id}`, f);
      alert("Employee Updated!");
      nav("/employees");
    } catch {
      alert("Update failed");
    }
  };

  const uploadPhoto = async () => {
    if (!photo) return alert("Choose a photo first");

    let fd = new FormData();
    fd.append("photo", photo);

    try {
      await api.post(`/emp/employees/upload/${id}`, fd);
      alert("Photo Updated");
      window.location.reload();
    } catch {
      alert("Upload failed");
    }
  };

  if (!f) return <h3 style={{ textAlign:"center" }}>Loading...</h3>;

  return (
    <div className="edit-card">

      <h2>Edit Employee</h2>

      <input 
        className="edit-input"
        placeholder="First Name"
        value={f.first_name}
        onChange={e => setF({ ...f, first_name:e.target.value })}
      />

      <input 
        className="edit-input"
        placeholder="Last Name"
        value={f.last_name}
        onChange={e => setF({ ...f, last_name:e.target.value })}
      />

      <input 
        className="edit-input"
        placeholder="Department"
        value={f.department}
        onChange={e => setF({ ...f, department:e.target.value })}
      />

      <input 
        className="edit-input"
        placeholder="Position"
        value={f.position}
        onChange={e => setF({ ...f, position:e.target.value })}
      />

      
      <h3 style={{ marginTop: 15 }}>Profile Photo</h3>

      <div className="photo-box">
        {f.photo ? (
          <img className="profile-pic" src={`http://localhost:8080/uploads/${f.photo}`} />
        ) : (
          <p>No photo uploaded</p>
        )}

        <input type="file" onChange={e => setPhoto(e.target.files[0])}/>
        <button className="upload-btn" onClick={uploadPhoto}>Upload Photo</button>
      </div>


      <div className="btn-row">
        <button className="save-btn" onClick={save}>Save Changes</button>
        <button className="cancel-btn" onClick={() => nav("/employees")}>Cancel</button>
      </div>

    </div>
  );
}
