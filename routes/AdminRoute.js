const express = require("express");
const router = express.Router();
const { adminCheck } = require("../middleware/checkAuth");
const {
  addCentre,
  deleteCentre,
  getDetails,
} = require("../controller/AdminController");
const { check, validationResult } = require("express-validator");

router.post(
  "/login",
  [
    check("email", "Please provide a valid Email").isEmail(),
    check("password", "Please provide a valid Password").isLength({
      min: 6,
    }),
  ],
  adminCheck,
  async (req, res) => {
    // GET EMAIL AND PASSWORD
    const { email, password } = req.body;
    console.log(email, password);

    // INPUT VALIDATION
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    if (password != "admin@123") {
      return res.status(400).json({
        errors: "Invalid Password",
      });
    }

    if (email != "admin@gmail.com" && password != "admin@123") {
      return res.status(400).json({
        errors: "Invalid Credentials",
      });
    }

    res.json("Logged in successfully");
  }
);

router.post("/add-centre", adminCheck, addCentre);

router.post("/delete-centre", adminCheck, deleteCentre);

router.post("/get-details", adminCheck, getDetails);

module.exports = router;
