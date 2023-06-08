const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    Username: {
      type: String,
      require: true,
    },
    Email: {
      type: String,
      require: true,
    },
    Password: {
      type: String,
      require: true,
    },
  },
  {
    timeStramps: true,
  }
);

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
