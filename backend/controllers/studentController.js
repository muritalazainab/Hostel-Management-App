const asyncHandler = require("express-async-handler");
const Student = require("../models/studentModal");
const Room = require("../models/roomModel");
const {generateUniqueId} = require("../utils/generateUniqueId");


const ensureUniqueId = async () => {
    let uniqueId;
    let idExists = true;
  
    while (idExists) {
      uniqueId = generateUniqueId();
      const existingStudent = await Student.findById(uniqueId);
      idExists = !!existingStudent;
    }
  
    return uniqueId;
  };
  
  const registerStudent = asyncHandler(async (req, res) => {
    try {
      const { email, name, age, nationality, g_name, g_email, gender, roomNum } =
        req.body;
  
      if (
        !email ||
        !name ||
        !age ||
        !nationality ||
        !g_name ||
        !g_email ||
        !gender ||
        !roomNum
      ) {
        res.status(400);
        throw new Error("Please fill in all the required fields.");
      }
  
      const studentExist = await Student.findOne({ email });
  
      if (studentExist) {
        return res.status(400).json({ msg: "Student already exists" });
      }
  
      const room = await Room.findOne({ roomNumber: roomNum });
  
      if (!room) {
        return res.status(404).json({ msg: "Room not found" });
      }
  
      if (room.roomStatus !== "available") {
        return res.status(400).json({ msg: "Room is not available" });
      }
  
      const uniqueId = await ensureUniqueId();
  
      const student = await Student.create({
        _id: uniqueId,
        email,
        name,
        age,
        nationality,
        guardian: {
          guardianName: g_name,
          guardianEmail: g_email,
        },
        gender,
        room: room._id, // Assign the room's ObjectId to the student
      });
  
      room.roomOccupancy.push(student._id);
  
      if (room.roomOccupancy.length >= room.roomCapacity) {
        room.roomStatus = "unavailable";
      }
  
      await room.save();
  
      res.status(201).json(student);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

const getAllStudents = asyncHandler(async (req, res) =>{
    const students = await Student.find().sort("createdAt: -1" );
    if(!students){
        res.status(404);
        throw new Error("something went wrong" );
    }
    res.status(200).json(students);

});
const getStudent = asyncHandler(async (req, res) => {
    const student = await Student.findById(req.params._id);
    if(student){
        res.status(200).json(student);
    }else{
        res.status(404);
        throw new Error("student not found");
    }
    
});
const updateStudentProfile = asyncHandler(async (req, res) => {
    const student = await Student.findById(req.params._id);
    if(student){
        const {name, email, gender,nationality,age,guardian} = student;
    
        student.email = email;
        student.gender = gender;
        student.age = req.body.age || age;
        student.name = req.body.name || name;
        student.nationality = req.body.nationality || nationality;
        student.guardian.guardianName = req.body.g_name || guardian.guardianName;
        student.guardian.guardianEmail = req.body.g_email || guardian.guardianEmail
        
        const updatedStudent = await student.save();      
        res.status(200).json(updatedStudent);
    }else{
        res.status(404);
        throw new Error("student not found");
    }
});
const changeStudentRoom = asyncHandler(async (req, res) => {
    const student = await Student.findById(req.params._id);
    if(student){
        const room = await Room.findById(req.body.room);
        if(room){
            student.room = room._id;
            await student.save();
            res.status(200).json(student);
        }else{
            res.status(404);
            throw new Error("room not found");
        }
    }else{
        res.status(404);
        throw new Error("student not found");
    }
});
const updateCheckInStatus = asyncHandler(async (req, res) => {
    const student = await Student.findById(req.params._id);
    if(student){
        student.checkedIn = req.body.checkedIn;
        await student.save();
        res.status(200).json(student);
    }else{
        res.status(404);
        throw new Error("student not found");
    }
});
const deleteStudent = asyncHandler(async (req, res) => {
    const student = await Student.findById(req.params._id);
    if(student){
        await student.deleteOne();
        res.status(200).json({message: "student removed"});
    }else{
        res.status(404);
        throw new Error("student not found");
    }
});
module.exports = {
    registerStudent,
    getAllStudents,
    getStudent,
    updateStudentProfile,
    changeStudentRoom,
    updateCheckInStatus,
    deleteStudent,
};


