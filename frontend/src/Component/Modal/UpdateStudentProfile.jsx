import React, { useState } from "react";
import axios from "axios";

const UpdateStudentProfile = ({ student, onClose }) => {
  const [formData, setFormData] = useState({
    name: student.name,
    age: student.age,
    nationality: student.nationality,
    g_name: student.guardian.guardianName,
    g_email: student.guardian.guardianEmail,
  });
  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `http://localhost:3500/student/${student._id}`,
        formData
      );
    } catch (error) {
      console.error("Error updating student profile", error);
    }
  };

  return (
  <div className="modal">
    <div className="modal-content">
      <h2>Update Student Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Name</label>
          <input type="text" name="name" value={formData.name} onChange={handlechange} />
        </div>
        <div>
          <label htmlFor="">Age</label>
          <input type="number" name="age" value={formData.age} onChange={handlechange} />
        </div>
        <div>
          <label htmlFor="">Nationality</label>
          <input type="text" name="nationality" value={formData.nationality} onChange={handlechange} />
        </div>
        <div>
          <label htmlFor="">Guardian Name</label>
          <input type="text" name="g_name" value={formData.g_name} onChange={handlechange} />
        </div>
        <div>
          <label htmlFor="">Guardian Email</label>
          <input type="email" name="g_email" value={formData.g_email} onChange={handlechange} />
        </div>
        <div>
          <button type="submit">Update</button>
          <button onClick={onClose}>Close</button>
        </div>
      </form>
    </div>

  </div>
  )
};

export default UpdateStudentProfile;
