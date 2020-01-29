const Users = require("../models");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

const resolvers = {
  Query: {
    async authenticate(root, { login, password }) {
      const user = await Users.findOne({
        where: { login: login, password: password }
      });
      if (user) {
        const token = jwt.sign({ ...JSON.stringify(user) }, "privatekey", {
          expiresIn: 60 * 60
        });
        return { user: JSON.parse(JSON.stringify(user)), token: token };
      } else {
        console.log("err");
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
        return await { ...context.currentUser };
      } catch (e) {
        return null;
      }
    },
    async getAllUsers(root, { id }) {
      return Users.findAll({ where: { id: { [Op.ne]: id } } });
    }
  },
  Mutation: {
    async setUserInfo(parent, { key, value }, { redis }) {
      try {
        console.log("set user",JSON.stringify(value))
        await redis.set(key, JSON.stringify(value));
        return true;
      } catch (e) {
        return false;
      }
    },

    async createUser(root, { data }, context) {
      if (context.user && context.user.isAdmin) {
        return Users.create({
          name: data.name,
          login: data.login,
          password: data.password,
          isAdmin: data.isAdmin
        });
      } else {
        return null;
      }
    },
    async updateUser(root, { id, data }, context) {
      if (context.user && context.user.isAdmin) {
        return Users.update(
          {
            name: data.name,
            login: data.login,
            password: data.password,
            isAdmin: data.isAdmin
          },
          { where: { id: id } }
        );
      } else {
        return null;
      }
    },
    async deleteUser(root, { id }, context) {
      if (context.user && context.user.isAdmin) {
        return Users.destroy({ where: { id: id } });
      } else {
        return null;
      }
    }
  }
};
module.exports = resolvers;
