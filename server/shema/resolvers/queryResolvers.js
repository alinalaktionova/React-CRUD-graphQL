const Users = require("../../models/UsersModels");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const logger = require("../../logger/config");

const queries = {
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
          expiresIn: 60 * 60
        }
      );
      return { user: user.toJSON(), token: token };
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
  async getUserInfo(parent, args, context) {
    try {
      return await Users.findByPk(context.currentUser.id);
    } catch (e) {
      return null;
    }
  },
  async getAllUsers(root, { id }) {
    return Users.findAll({ where: { id: { [Op.ne]: id }, isDeleted: false } });
  }
};

module.exports = queries;
