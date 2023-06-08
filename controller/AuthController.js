const UserModel = require("../models/UserSchema");

const userAlreadyExits = async (email) => {
  const user = await UserModel.find({
    Email: email,
  });
  console.log(user);
  if (user.length != 0) {
    return {
      log: true,
      val: user,
    };
  } else {
    return {
      log: false,
      val: user,
    };
  }
};

const addUser = async (Username, Email, Password) => {
  const data = {
    Username: Username,
    Email: Email,
    Password: Password,
  };
  // save new user to the database
  const user = new UserModel(data);
  try {
    await user.save();
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = {
  userAlreadyExits,
  addUser,
};
