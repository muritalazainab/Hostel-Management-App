import React, { useState } from "react";
import "./StudentDashboard.css";
import axios from "axios";

const AddRoomModal = ({ onAddRoom, onClose }) => {
  const [newRoom, setNewRoom] = useState({
    roomNumber: "",
    roomCapacity: "",
    roomLocation: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRoom((prevRoom) => ({
      ...prevRoom,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
  setIsSubmitting(true)
  setError("")
  try{

    const response = await axios.post("https://hostel-management-app-xi.vercel.app/room/create", newRoom);
    console.log(error)
    onAddRoom(response.data)
    onClose()
  }catch(error){
    setError("failed to add room", error)
  }finally{
    setIsSubmitting(false)
  }
  };

  return (
    <div className="modal">
      <div className="modal-content --flex-start --dir-column">
        <h2 className="modal-title">Add New Room</h2>
        <label htmlFor="roomNumber" className="room-label">
          Room Number:
        </label>
        <input
          type="text"
          id="roomNumber"
          name="roomNumber"
          value={newRoom.roomNumber}
          onChange={handleChange}
          className="input-field"
        />
        <label htmlFor="roomCapacity" className="room-label">
          Capacity:
        </label>
        <input
          type="text"
          id="capacity"
          name="roomCapacity"
          value={newRoom.roomCapacity}
          onChange={handleChange}
          className="input-field"
        />
        
        
        <label htmlFor="roomLocation" className="room-label">
          Location:
        </label>
        <input
          type="text"
          id="location"
          name="roomLocation"
          value={newRoom.roomLocation}
          onChange={handleChange}
          className="input-field"
        />
        {error && <p>{error}</p>}
        <div className="button-group">
          <button className="btn-primary" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add"}
            
          </button>
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoomModal;
