const Users = require("../../models");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const queries = {
  async authenticate(root, { login, password }) {
    const user = await Users.findOne({
      where: {
        login: login,
        isActive: true,
        isDeleted: false
      }
    });
    if (user) {
      if (
        await bcrypt.compare(
          password,
          JSON.parse(JSON.stringify(user)).password
        )
      ) {
        const token = jwt.sign(
          { ...JSON.stringify(user) },
          process.env.AUTH_KEY,
          {
            expiresIn: 60 * 60
          }
        );
        return { user: JSON.parse(JSON.stringify(user)), token: token };
      }
    } else {
      return null;
    }
  },
  async logoutUser(parent, { key }, { redis }) {
    try {
      await redis.del(key);
      return true;
    } catch (e) {
      return false;
    }
  },
  async getUserInfo(root, args, context) {
    try {
      return await Users.findOne({
        where: { id: context.currentUser.id }
      });
    } catch (e) {
      return null;
    }
  },
  async getAllUsers(root, { id }) {
    return Users.findAll({ where: { id: { [Op.ne]: id }, isDeleted: false } });
  }
};

module.exports = queries;
