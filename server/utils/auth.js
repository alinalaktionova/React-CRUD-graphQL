const jwt = require("jsonwebtoken");
const env = require("../configs/dbconfig");

const authTokenGenerate = user => {
  const token = jwt.sign({ ...JSON.stringify(user) }, env.AUTH_KEY, {
    expiresIn: env.JWT_LIFETIME
  });
  return { user: user, token: token };
};

module.exports = authTokenGenerate;
