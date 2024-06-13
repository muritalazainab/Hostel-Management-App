import React from "react";
import Sidebar from "./Sidebar";
import "./StudentDashboard.css";
import { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import UpdateCheckIn from "../Modal/UpdateCheckIn";
import UpdateStudentProfile from "../Modal/UpdateStudentProfile";
import ChangeStudentRoom from "../Modal/ChangeStudentRoom";
import useAuthRedirect from "../../../context/useAuth";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import axios from "axios";
import { FaPenFancy } from "react-icons/fa";


const StudentDashboard = () => {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedModal, setSelectedModal] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [search, setSearch] = useState("");
  const [issideBarToggle, setIsSideBarToggle] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("https://hostel-management-app-xi.vercel.app/student");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStudents();
  }, []);
  const handleModalOpen = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedModal("");
    setIsModalOpen(false);
    setSelectedStudent(null);
  };
  const handleModalSelected = (modalType) => {
    setSelectedModal(modalType);
  };
  const removeUser = async (_id) => {
    try {
      console.log(`Delete student by id: ${_id}`);  
      const response = await axios.delete(
        `https://hostel-management-app-xi.vercel.app/student/delete-student/${_id}`
      );
      console.log(response.data);

      setData((prevData) => prevData.filter((student) => student._id !== _id));
      setMessage("Student deleted successfully");
    } catch (error) {
    setMessage("Failed to delete student");
      console.error("Error deleting", error);
    }
  };
  const confirmDelete = (_id) => {
    confirmAlert({
      title: " Delete This Student",
      message: "Are you sure you want to delete this student",
      buttons: [
        {
          label: "Delete",
          onClick: () => removeUser(_id),
        },
        {
          label: "cancel",
          onClick: () => alert("deletion cancelled"),
        },
      ],
    });
  };

  const filteredData = data.filter(
    (item) =>
      item.nationality.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {issideBarToggle && (
        <div className="mobile-side-nav">
          <Sidebar />
        </div>
      )}

      <div className="--flex --overflow-hidden">
        <div className="desktop-side-nav">
          <Sidebar />
        </div>

        <div className=" --flex-dir-column --overflow-y-auto --flex-1 overflow-x-hidden">
          <main className="--flex-justify-center w-full">
            <div className="right dash-main">
              <div className="--flex-justify-between">
                <p>Students</p>
                {issideBarToggle ? (
                  <FaTimes
                    className="sidebar-toggle-iconB"
                    onClick={() => setIsSideBarToggle(false)}
                  />
                ) : (
                  <FaBars
                    className="sidebar-toggle-iconB"
                    onClick={() => setIsSideBarToggle(true)}
                  />
                )}
              </div>

              <p>Search students</p>

              <input
                placeholder="Search by name, email, or ID number"
                type="text"
                className="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <div className="table">
                <table className="table_wrapper">
                  <thead className="table__head">
                    <tr className="table__row">
                      <th className="same_class">Student Name</th>
                      <th className="same_class">Email</th>
                      <th className="same_class">ID Number</th>
                      <th className="same_class">Gender</th>
                      <th className="same_class">Age</th>
                      <th className="same_class">Nationality</th>
                      <th className="same_class">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="table__body">
                    {filteredData.map((student, index) => (
                      <tr key={index} className="table__row">
                        <td className="same_class">{student.name}</td>
                        <td className="same_class">{student.email}</td>
                        <td className="same_class">{student._id}</td>
                        <td className="same_class">{student.gender}</td>
                        <td className="same_class">{student.age}</td>
                        <td className="same_class">{student.nationality}</td>
                        <td className="same_class">
                          <RiDeleteBin6Line
                            size={25}
                            color="red"
                            onClick={() => confirmDelete(student._id)}
                          />
                          &nbsp;&nbsp;
                          <FaPenFancy
                            size={25}
                            color="blue"
                            onClick={() => handleModalOpen(student)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button className="btn-secondary">
                <Link to="/student-reg"> Add a student</Link>
              </button>
            </div>
          </main>
        </div>
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Select an option</h2>
            <button
              onClick={() => handleModalSelected("updateStudentProfile")}
              className="one"
            >
              Update student profile
            </button>
            <button
              onClick={() => {
                handleModalSelected("changeStudentRoom");
                }}
              className = "two"
            >
              Change student room
            </button>
            <button
              onClick={() => {
                handleModalSelected("UpdatedCheckInStatus");
              
              }}
              className = "three"


            >
              update check-in
            </button>
            <button onClick={handleModalClose}>Close</button>
          </div>
        </div>
      )}
      {selectedModal === "updateStudentProfile" && (
        <UpdateStudentProfile
          student={selectedStudent}
          onClose={handleModalClose}
        />
      )}
      {selectedModal === "changeStudentRoom" && (
        <ChangeStudentRoom
          student={selectedStudent}
          onClose={handleModalClose}
        />
      )}
      {selectedModal === "UpdatedCheckInStatus" && (
        <UpdateCheckIn
          student={selectedStudent}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default StudentDashboard;
3