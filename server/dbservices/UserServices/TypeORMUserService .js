const { getRepository, Not, Equal } = require("typeorm");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { adminFeatures, userFeatures } = require("../../features/features");
const logger = require("../../logger/config");
const env = require("../../configs/dbconfig");

class TypeORMUserService {
  _getUsersModel = () => {
    return getRepository(env.TYPEORM_MODEL_NAME);
  };
  getAll = async id => {
    return await this._getUsersModel().find({ where: { id: Not(Equal(id)) } });
  };

  getUserById = async id => {
    return await this._getUsersModel().findOne({ where: { id: id } });
  };

  createUser = async params => {
    const user = this._getUsersModel().create({
      name: params.name,
      login: params.login,
      features: params.admin ? adminFeatures : userFeatures,
      isActive: false,
      isDeleted: false
    });
    await this._getUsersModel().save(user);
    const token = jwt.sign(
      { name: params.name, login: params.login },
      process.env.REGISTER_KEY
    );
    return { token: token, id: user.id };
  };
  updateUser = async (id, params) => {
    await this._getUsersModel().update(id, {
      name: params.name,
      login: params.login,
      features: params.admin ? adminFeatures : userFeatures
    });
    return this.getUserById(id);
  };

  deleteUser = async id => {
    await this._getUsersModel().update(id, {
      isDeleted: true
    });
    return this.getAll(id);
  };

  addPassword = async (password, token, redis) => {
    try {
      const id = JSON.parse(await redis.get(token)).id;
      const hash = await bcrypt.hash(password, 10);
      await this._getUsersModel().update(id, {
        password: hash,
        isActive: true
      });
      await redis.del(token);
      return true;
    } catch (e) {
      logger.error(`Failed to set password: ${e.message}`);
      return false;
    }
  };

  updatePassword = async (oldPassword, newPassword, id) => {
    const user = await this.getUserById(id);
    if (await bcrypt.compare(oldPassword, user.password)) {
      await this._getUsersModel().update(id, {
        password: await bcrypt.hash(newPassword, 10)
      });
      return true;
    }
    logger.error("Failed to update password");
    return false;
  };
}

module.exports = TypeORMUserService;
