const Users = require("../../models/UsersModels");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const { adminFeatures, userFeatures } = require("../../features/features");
const { EDIT, CREATE, DELETE } = require("../../features/featureConstants");
const logger = require("../../logger/config");

const mutations = {
  async setUserInfo(parent, { key, value }, { redis }) {
    try {
      await redis.set(key, JSON.stringify(value));
      return true;
    } catch (e) {
      logger.error(`Failed to set user in redis: ${e.message}`);
      return false;
    }
  },

  async createUser(root, { data }, context) {
    if (context.currentUser && context.currentUser.features.includes(CREATE)) {
      const user = await Users.create({
        name: data.name,
        login: data.login,
        features: data.admin ? adminFeatures : userFeatures,
        isActive: false,
        isDeleted: false
      });
      const token = jwt.sign(
        { name: data.name, login: data.login },
        process.env.REGISTER_KEY
      );
      return { token: token, id: user.toJSON().id };
    } else {
      return null;
    }
  },
  async addPassword(root, { token, password }, { redis }) {
    try {
      const hash = await bcrypt.hash(password, 10);
      await Users.update(
        { password: hash, isActive: true },
        { where: { id: JSON.parse(await redis.get(token)).id } }
      );
      await redis.del(token);
      return true;
    } catch (e) {
      logger.error(`Failed to set password: ${e.message}`);
      return false;
    }
  },
  async updatePassword(root, { oldPassword, newPassword }, context) {
    if (context.currentUser) {
      const user = await Users.findOne({
        where: {
          id: context.currentUser.id
        }
      });
      if (await bcrypt.compare(oldPassword, user.toJSON().password)) {
        await Users.update(
          { password: await bcrypt.hash(newPassword, 10) },
          { where: { id: context.currentUser.id } }
        );
        return true;
      }
      logger.error("Failed to update password");
      return false;
    }
  },
  async updateUser(root, { id, data }, context) {
    if (context.currentUser && context.currentUser.features.includes(EDIT)) {
      await Users.update(
        {
          name: data.name,
          login: data.login,
          features: data.admin ? adminFeatures : userFeatures
        },
        { where: { id: id } }
      );
      return Users.findOne({ where: { id: id } });
    } else {
      return null;
    }
  },
  async deleteUser(root, { id }, context) {
    if (context.currentUser && context.currentUser.features.includes(DELETE)) {
      await Users.update({ isDeleted: true }, { where: { id: id } });
      return Users.findAll({ where: { id: { [Op.ne]: id } } });
    } else {
      return null;
    }
  }
};

module.exports = mutations;
