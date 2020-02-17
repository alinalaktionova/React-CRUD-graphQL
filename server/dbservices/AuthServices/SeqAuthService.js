const Users = require("../../models/sequelizeModels/UsersModel");
const bcrypt = require("bcryptjs");
const AuthService = require("./AuthService");
const authTokenGenerate = require("../../utils/auth");

class SeqAuthService extends AuthService {
  authUser = async (login, password) => {
    const user = await Users.findOne({
      where: {
        login: login,
        isActive: true,
        isDeleted: false
      }
    });
    if (!user) {
      return null;
    }
    if (await bcrypt.compare(password, user.toJSON().password)) {
      return authTokenGenerate(user);
    }
  };
}
module.exports = SeqAuthService;
