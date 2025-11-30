import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EditEmployee() {

  const { id } = useParams();
  const nav = useNavigate();

  const [f, setF] = useState(null);
  const [photo, setPhoto] = useState(null); // NEW: image upload state

  useEffect(() => {
    axios.get(`http://localhost:8080/api/v1/emp/employees/${id}`)
      .then(res => setF(res.data));
  }, []);

  const save = () => {
    axios.put(`http://localhost:8080/api/v1/emp/employees/${id}`, f)
      .then(() => {
        alert("Employee Updated!");
        nav("/employees");
      });
  };

  // upload photo function
  const uploadPhoto = () => {
    if (!photo) return alert("Choose a photo first!");

    let fd = new FormData();
    fd.append("photo", photo);

    axios.post(`http://localhost:8080/api/v1/emp/employees/upload/${id}`, fd)
      .then(() => {
        alert("Profile Photo Updated!");
        window.location.reload(); // refresh to show new image
      });
  };

  if (!f) return <h3>Loading...</h3>;

  return (
    <div style={{ width:400, margin:"auto", textAlign:"center" }}>
      
      <h2>Edit Employee</h2>

      {/* TEXT FIELDS */}
      <input value={f.first_name} 
             onChange={e=>setF({...f, first_name:e.target.value})}
             placeholder="First Name" /><br/><br/>

      <input value={f.last_name} 
             onChange={e=>setF({...f, last_name:e.target.value})}
             placeholder="Last Name" /><br/><br/>

      <input value={f.department} 
             onChange={e=>setF({...f, department:e.target.value})}
             placeholder="Department" /><br/><br/>

      <input value={f.position} 
             onChange={e=>setF({...f, position:e.target.value})}
             placeholder="Position" /><br/><br/>


      {/* IMAGE SECTION */}
      <h3>Profile Photo</h3>
      {f.photo ? 
        <img 
          src={`http://localhost:8080/uploads/${f.photo}`} 
          width="120" height="120"
          style={{borderRadius:"10px",objectFit:"cover"}}
        />
        : <p>No Image Uploaded</p>
      }<br/><br/>

      <input type="file" onChange={e=>setPhoto(e.target.files[0])}/>
      <button onClick={uploadPhoto} style={{marginLeft:10}}>Upload New Photo</button>

      <br/><br/><hr/><br/>

      {/* SAVE/CANCEL */}
      <button onClick={save} style={{marginRight:10}}>💾 Save Changes</button>
      <button onClick={()=>nav("/employees")}>❌ Cancel</button>

    </div>
  );
}
