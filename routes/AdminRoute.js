const express = require("express");
const router = express.Router();
const { adminCheck } = require("../middleware/checkAuth");
const {
  addCentre,
  deleteCentre,
  getDetails,
} = require("../controller/AdminController");

router.post("/login", adminCheck, async (req, res) => {
  // GET EMAIL AND PASSWORD
  const { email, password } = req.body;
  console.log(email, password);

  if (email != "admin@gmail.com" && password != "admin@123") {
    return res.status(400).json({
      errors: "Invalid Credentials",
    });
  }

  res.json("Logged in successfully");
});

router.post("/add-centre", adminCheck, addCentre);

router.post("/delete-centre", adminCheck, deleteCentre);

router.post("/get-details", adminCheck, getDetails);

module.exports = router;
