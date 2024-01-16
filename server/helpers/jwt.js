const jwt = require("jsonwebtoken");

function signToken(user) {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET);
}

function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
  signToken,
  verifyToken,
};
