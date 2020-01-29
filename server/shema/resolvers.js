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
        return await Users.findOne({
          where: { id: context.currentUser.id }
        });
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
        await redis.set(key, JSON.stringify(value));
        return true;
      } catch (e) {
        return false;
      }
    },

    async createUser(root, { data }, context) {
      if (context.currentUser && context.currentUser.features.includes("create")) {
        return Users.create({
          name: data.name,
          login: data.login,
          password: data.password,
          features: !data.admin && ["edit"]
        });
      } else {
        return null;
      }
    },
    async updateUser(root, { id, data }, context) {
      if (context.currentUser && context.currentUser.features.includes("edit")) {
        console.log(data);
        return Users.update(
          {
            name: data.name,
            login: data.login,
            password: data.password,
            features: data.admin && ["edit", "create", "delete"]
          },
          { where: { id: id } }
        );
      } else {
        return null;
      }
    },
    async deleteUser(root, { id }, context) {
      if (context.currentUser && context.currentUser.features.includes("delete")) {
        return Users.destroy({ where: { id: id } });
      } else {
        return null;
      }
    }
  }
};
module.exports = resolvers;
