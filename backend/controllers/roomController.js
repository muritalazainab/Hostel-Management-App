const Room = require("../models/roomModel");
const asyncHandler = require("express-async-handler");

const createNewRoom = asyncHandler(async (req, res) => {
  const { roomNumber, roomCapacity, roomLocation } = req.body;

  !roomNumber ||
    !roomCapacity ||
    (!roomLocation &&
      (() => {
        res.status(400);
        throw new Error("please fill all the require fields");
      })());

  const roomExists = await Room.findOne({ roomNumber });

  roomExists &&
    (() => {
      res.status(400);
      throw new Error("room number already exists");
    });

  const room = await Room.create({
    roomNumber,
    roomCapacity,
    roomLocation,
  });

  if (room) {
    const { _id, roomNumber, roomCapacity, roomLocation, roomStatus } = room;

    res.status(201).json({
      _id,
      roomNumber,
      roomCapacity,
      roomLocation,
      roomStatus,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Data");
  }
});
// Get details of all admins
const getAllRooms = asyncHandler(async (req, res) => {
  const room = await Room.find();
  if (!room) {
    res.status(500);
    throw new Error("Something went wrong");
  }
  res.json(room);
});
const getRoom = asyncHandler(async (req, res) => {
  const {roomId} = req.params
  const room = await Room.findById(roomId);
  if (!room) {
    res.status(500);
    throw new Error("Something went wrong");
  }
  res.json(room);
});
const updateRoom = asyncHandler(async (req, res) => {
  const { roomId } = req.params;

  const room = await Room.findById(roomId);
  if (room) {
    if (req.body.roomNumber) room.roomNumber = req.body.roomNumber;
    if (req.body.roomCapacity) room.roomCapacity = req.body.roomCapacity;
    if (req.body.roomLocation) room.roomLocation = req.body.roomLocation;

    const result = await room.save();

    return res.status(200).json(result);
  } else {
    return res.status(404).json({ Message: "Room not found" });
  }
});

const deleteRoom = asyncHandler(async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = Room.findById(roomId);

    if (!room) {
      res.status(404);
      throw new Error("Room not found");
    }

    await room.deleteOne();
    res.status(200).json({
      Message: "Room deleted successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }

});



module.exports = { createNewRoom,getAllRooms, getRoom, updateRoom,deleteRoom};
