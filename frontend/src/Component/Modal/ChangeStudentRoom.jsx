import React from 'react'
import axios from 'axios'
import { useState } from 'react'

const ChangeStudentRoom = ({student, onClose}) => {
  const [newRoomNum, setNewRoom] = useState("")
  const handleChange = (e) => {
    setNewRoom(e.target.value)
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      
      const response = await axios.post(`https://hostel-management-app-xi.vercel.app//student/change-room`, {
        studentId: student._id,
       newRoomNum
      })
    } catch (error) {
      console.error("Error changing room", error);
    }
  }
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Change student&apos; Room</h2>
        <form onSubmit={handleSubmit}>
          <div>
          <label>New Room Number</label>
          <input type="text" value={newRoomNum} onChange={handleChange} />
          </div>
          <button >Change Room</button>
        <button onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  )
}

export default ChangeStudentRoom
