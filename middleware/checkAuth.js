const adminCheck = async (req, res, next) => {
  const key = req.body.key;

  if (!key) {
    return res.status(400).json({
      errors: "No key Found",
    });
  }

  if (key == "adminsecretkey") {
    next();
  } else {
    return res.status(400).json({
      errors: "Token Invalid",
    });
  }
};

module.exports = { adminCheck };
