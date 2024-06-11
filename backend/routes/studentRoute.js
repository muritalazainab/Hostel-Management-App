const express = require("express");
const router = express.Router();
const {
  registerStudent,
  updateStudentProfile,
  getStudent,
  changeStudentRoom,
  getAllStudents,
  updateCheckInStatus,
  deleteStudent,
} = require("../controllers/studentController");

router.post("/register-student", registerStudent);
router.get("/", getAllStudents);
router.get("/:_id", getStudent);
router.patch("/:_id", updateStudentProfile);
router.post("/change-room", changeStudentRoom);
router.post("/check-in-status", updateCheckInStatus);
router.delete("/delete-student/:_id", deleteStudent);

module.exports = router;
