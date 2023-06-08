const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRouter = require("./routes/AuthRoute");
const adminRouter = require("./routes/AdminRoute");
const userRouter = require("./routes/UserRoute");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.static(__dirname + "/frontend"));

app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/", userRouter);

mongoose
  .connect(
    "mongodb+srv://Thalha:Thalha@cluster0.pomxn.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

// USER PAGES
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/frontend/index.html"));
});
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname + "/frontend/login.html"));
});
app.get("/signin", (req, res) => {
  res.sendFile(path.join(__dirname + "/frontend/signin.html"));
});
app.get("/bookslot", (req, res) => {
  res.sendFile(path.join(__dirname + "/frontend/bookslot.html"));
});
// ADMIN PAGES
app.get("/admin-login", (req, res) => {
  res.sendFile(path.join(__dirname + "/frontend/admin/adminLogin.html"));
});
app.get("/admin-add-centre", (req, res) => {
  res.sendFile(path.join(__dirname + "/frontend/admin/adminAddCentre.html"));
});
app.get("/admin-centre-details", (req, res) => {
  res.sendFile(
    path.join(__dirname + "/frontend/admin/adminCentreDetails.html")
  );
});

app.listen(PORT, () => {
  console.log(`Listening to the PORT : ` + PORT);
});
