const express = require("express");
const router = express.Router();
const { searchCentre, bookSlot } = require("../controller/UserController");

router.get("/search", searchCentre);
router.post("/book-slot", bookSlot);

module.exports = router;
