const SeqUserService = require("../UserServices/SeqUserService");
const SeqAuthService = require("../AuthServices/SeqAuthService");

class SequelizeFactory {
  createUserService = () => {
    return new SeqUserService();
  };
  createAuthService = () => {
    return new SeqAuthService();
  };
}
module.exports = SequelizeFactory;
