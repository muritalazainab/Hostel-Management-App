const express = require("express");
const { registerStudent, updateStudentProfile, getStudent, changeStudentRoom, getAllStudents, updateCheckInStatus, deleteStudent } = require("../controllers/studentController");
const router = express.Router();

router.post("/register-student", registerStudent)
router.get("/get-all-students", getAllStudents)
router.get("/:_id", getStudent)
router.patch("/:_id", updateStudentProfile)
router.post("/change-room", changeStudentRoom)
router.post("/:_id", updateCheckInStatus)
router.delete("/delete-student/:_id", deleteStudent)

module.exports = router;