const jwt = require("jsonwebtoken");

const tokenCreation = (id) => {
  const token = jwt.sign({ id }, process.env.JWT, {
    expiresIn: "1d",
  });
  return token;
};
module.exports = tokenCreation;
