const TypeORMFactory = require("./TypeORMFactory");
const SequelizeFactory = require("./SequelizeFactory");
const env = require("../../configs/dbconfig");

class CreateServices {
  static createFactory = () => {
    switch (env.ORM_TYPE) {
      case "typeORM":
        return new TypeORMFactory();
      case "sequelize": {
        return new SequelizeFactory();
      }
    }
  };
  static createUserService = () => {
    return CreateServices.createFactory().createUserService();
  };
  static createAuthService = () => {
    return CreateServices.createFactory().createAuthService();
  };
}

const userService = CreateServices.createUserService();
const authService = CreateServices.createAuthService();

module.exports = { userService, authService };
