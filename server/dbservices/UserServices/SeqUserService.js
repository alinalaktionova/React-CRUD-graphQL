const Users = require("../../models/sequelizeModels/UsersModel");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { adminFeatures, userFeatures } = require("../../features/features");
const logger = require("../../logger/config");

class SeqUserService {
  getAll = id => {
    return Users.findAll({
      where: { id: { [Op.ne]: id }, isActive: true, isDeleted: false }
    });
  };

  getUserById = id => {
    try {
      return Users.findOne({ where: { id: id } });
    } catch (e) {
      return null;
    }
  };

  createUser = async params => {
    const user = await Users.create({
      name: params.name,
      login: params.login,
      features: params.admin ? adminFeatures : userFeatures,
      isActive: false,
      isDeleted: false
    });
    const token = jwt.sign(
      { name: params.name, login: params.login },
      process.env.REGISTER_KEY
    );
    return { token: token, id: user.toJSON().id };
  };

  updateUser = async (id, params) => {
    await Users.update(
      {
        name: params.name,
        login: params.login,
        features: params.admin ? adminFeatures : userFeatures
      },
      { where: { id: id } }
    );
    return this.getUserById(id);
  };

  deleteUser = async id => {
    await Users.update({ isDeleted: true }, { where: { id: id } });
    return this.getAll(id);
  };

  addPassword = async (password, token, redis) => {
    try {
      const id = JSON.parse(await redis.get(token)).id;
      const hash = await bcrypt.hash(password, 10);
      await Users.update(
        { password: hash, isActive: true },
        { where: { id: id } }
      );
      await redis.del(token);
      return true;
    } catch (e) {
      logger.error(`Failed to set password: ${e.message}`);
      return false;
    }
  };

  updatePassword = async (oldPassword, newPassword, id) => {
    const user = await this.getUserById(id);
    if (await bcrypt.compare(oldPassword, user.toJSON().password)) {
      await Users.update(
        { password: await bcrypt.hash(newPassword, 10) },
        { where: { id: id } }
      );
      return true;
    }
    logger.error("Failed to update password");
    return false;
  };
}

module.exports = SeqUserService;
