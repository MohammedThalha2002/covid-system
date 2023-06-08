const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { userAlreadyExits, addUser } = require("../controller/AuthController");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

router.post(
  "/signup",
  [
    check("email", "Please provide a valid Email").isEmail(),
    check("password", "Please provide a valid Password").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const { name, email, password } = req.body;
    console.log(name, email, password);

    // INPUT VALIDATION
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    // CHECKING THE USER ALREADY EXITS
    const userExits = await userAlreadyExits(email);
    if (userExits.log) {
      return res.status(400).json({
        errors: "Email already exits",
      });
    }

    // PASSWORD HASHING
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    // STORING USER TO DATABASE
    const dbRes = await addUser(name, email, hashedPassword);
    if (!dbRes) {
      return res.status(400).json({
        errors: "Failed to add the user to the DB",
      });
    }

    // CREATING A JWT TOKEN
    const token = await JWT.sign(
      {
        email,
      },
      "dhbcibe9ud38hdewu931ir0fkopsz7qhwdu9qw09u28edhqwanx9j784",
      {
        expiresIn: "365 days",
      }
    );

    res.cookie("jwt", token);

    res.json({
      log: "Signed in successfully",
    });
  }
);

router.post("/login", async (req, res) => {
  // GET EMAIL AND PASSWORD
  const { email, password } = req.body;
  console.log(email, password);

  // CHECK EXISTENCE OF THE EMAIL IN DB
  const userExits = await userAlreadyExits(email);
  if (!userExits.log) {
    return res.status(400).json({
      errors: "Email not found",
    });
  }

  const passwordMatch = await bcrypt.compare(
    password,
    userExits.val[0].Password
  );
  if (!passwordMatch) {
    return res.status(400).json({
      errors: "Invalid Credentials",
    });
  }

  // CREATING A JWT TOKEN
  const token = await JWT.sign(
    {
      email,
    },
    "dhbcibe9ud38hdewu931ir0fkopsz7qhwdu9qw09u28edhqwanx9j784",
    {
      expiresIn: "365 days",
    }
  );

  res.cookie("jwt", token);
  console.log(res.cookie.jwt);

  res.json({
    log: "Logged in Successfully",
    username: userExits.val[0].Username,
  });
});

router.post("/logout", (req, res) => {
  if (req.cookies.jwt) {
    res.cookie("jwt", null);
    res.send("Logout successfully");
  } else {
    res.send("No user found");
  }
});

module.exports = router;
