const express = require("express");

const { createNewRoom, getAllRooms, updateRoom, deleteRoom, getRoom } = require("../controllers/roomController");
const router = express.Router();

router.post("/create", createNewRoom)
router.get("/", getAllRooms)
router.put("/:roomId", updateRoom)
router.delete("/:roomId", deleteRoom)
router.get("/:roomId", getRoom)



module.exports = router;
