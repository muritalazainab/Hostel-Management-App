import React, { useEffect, useState } from "react";
import axios from "axios";

const UpdateCheckIn = ({ student, onClose }) => {
  const [action, setAction] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [currentRoomNumber, setCurrentRoomNumber] = useState("");
  useEffect(() => {
    const fetchRoomDetails = async () => {
      if (student.room) {
        try {
          const response = await axios.get(
            `http://localhost:3500/room/${student.room}`
          );
          setCurrentRoomNumber(response.data.roomNumber);
        } catch (error) {
          console.error("Error fetching room details", error);
        }
      }
    };
    fetchRoomDetails();
  }, [student.room]);

  const handleActionChange = (e) => {
    setAction(e.target.value);
  };
  const handleRoomChange = (e) => {
    setRoomNumber(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3500/student/check-in-status`,
        {
          action,
          roomNumber,
          studentId: student._id,
        }
      );
      console.log(response.data);
      onClose();
    } catch (error) {
      console.error("Error updating check-in status", error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Update Check-In Status</h2>
        <p>
          Current status: {student.checkedIn ? "CheckedIn" : "checkedOut"}
          {""}
        </p>
        <p>Current room: {currentRoomNumber || "Not assigned"}</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="">Room Number</label>
            <input
              type="text"
              value={roomNumber}
              onChange={handleRoomChange}
              placeholder="Enter room number"
            />
          </div>
          <label htmlFor="">Action</label>
          <select value={action} onChange={handleActionChange}>
            <option value="&nbsp;">select an action</option>
            <option value="checIn" disabled={student.checkedIn}>Check In</option>
            <option value="checkOut" disabled={!student.checkedIn}>Check Out</option>
          </select>
          <button type="submit">Update Status</button>
          <button onClick={onClose}>Close</button>    
        </form>
      </div>
    </div>
  );
};

export default UpdateCheckIn;
