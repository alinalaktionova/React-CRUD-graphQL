const TypeORMUserService = require("../UserServices/TypeORMUserService ");
const TypeORMAuthService = require("../AuthServices/TypeORMAuthService");

class TypeORMFactory {
  createUserService = () => {
    return new TypeORMUserService();
  };
  createAuthService = () => {
    return new TypeORMAuthService();
  };
}

module.exports = TypeORMFactory;
