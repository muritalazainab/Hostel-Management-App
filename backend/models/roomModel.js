const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: Number,
    require: true,
    unique: true,
  },
  roomCapacity: {
    type: Number,
    require: true,
  },

  roomOccupancy: [
    {
      type: String,
      ref: "Student",
    },
  ],
  roomLocation: {
    type: String,
    require: true,
  },
  roomStatus: {
    type: String,
    default: "available",
  },
});

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;
