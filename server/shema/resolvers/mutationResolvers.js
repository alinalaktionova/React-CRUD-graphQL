const Users = require("../../models/UsersModels");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const { adminFeatures, userFeatures } = require("../../features/features");
const { EDIT, CREATE, DELETE } = require("../../features/featureOperations");
const logger = require("../../logger/config");
const checkPermission = require('../../dbservices/checkPermission');

const mutations = {
  async authenticate(root, { login, password }) {
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
      const token = jwt.sign(
        { ...JSON.stringify(user) },
        process.env.AUTH_KEY,
        {
          expiresIn: process.env.JWT_LIFETIME
        }
      );
      return { user: user.toJSON(), token: token };
    }
  },
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
    if (checkPermission(context.currentUser, CREATE)) {
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
    if (checkPermission(context.currentUser, EDIT)) {
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
  async logoutUser(parent, { key }, { redis }) {
    try {
      await redis.del(key);
      return true;
    } catch (e) {
      logger.error(`Failed to log out: ${e.message}`);
      return false;
    }
  },
  async deleteUser(root, { id }, context) {
    if (checkPermission(context.currentUser, DELETE)){
      await Users.update({ isDeleted: true }, { where: { id: id } });
      return Users.findAll({ where: { id: { [Op.ne]: id } } });
    } else {
      return null;
    }
  }
};

module.exports = mutations;
