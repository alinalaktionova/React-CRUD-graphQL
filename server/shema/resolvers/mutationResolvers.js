const {
  addPassword,
  authUser,
  createUser,
  deleteUser,
  getAll,
  getUserById,
  updatePassword,
  updateUser
} = require("../../dbservices/UsersSequelizeService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { EDIT, CREATE, DELETE } = require("../../features/featureOperations");
const logger = require("../../logger/config");
const checkPermission = require("../../utils/checkPermission");

const mutations = {
  async authenticate(root, { login, password }) {
    const user = await authUser(login);
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
      const user = await createUser(data);
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
      const id = JSON.parse(await redis.get(token)).id;
      await addPassword(password, id);
      await redis.del(token);
      return true;
    } catch (e) {
      logger.error(`Failed to set password: ${e.message}`);
      return false;
    }
  },
  async updatePassword(root, { oldPassword, newPassword }, context) {
    if (context.currentUser) {
      const user = await getUserById(context.currentUser.id);
      if (await bcrypt.compare(oldPassword, user.toJSON().password)) {
        await updatePassword(newPassword, context.currentUser.id);
        return true;
      }
      logger.error("Failed to update password");
      return false;
    }
  },
  async updateUser(root, { id, data }, context) {
    if (checkPermission(context.currentUser, EDIT)) {
      await updateUser(id, data);
      return getUserById(id);
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
    if (checkPermission(context.currentUser, DELETE)) {
      await deleteUser(id);
      return getAll(context.currentUser.id);
    } else {
      return null;
    }
  }
};

module.exports = mutations;
