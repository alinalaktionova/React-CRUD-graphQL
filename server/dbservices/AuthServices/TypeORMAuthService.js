const bcrypt = require("bcryptjs");
const { getRepository } = require("typeorm");
const AuthService = require("./AuthService");
const authTokenGenerate = require("../../utils/auth");
const env = require("../../configs/dbconfig");

class TypeORMAuthService extends AuthService {
  authUser = async (login, password) => {
    const user = await getRepository(env.TYPEORM_MODEL_NAME).findOne({
      where: {
        login: login,
        isActive: true,
        isDeleted: false
      }
    });
    if (!user) {
      return null;
    }
    if (await bcrypt.compare(password, user.password)) {
      return authTokenGenerate(user);
    }
  };
}
module.exports = TypeORMAuthService;
