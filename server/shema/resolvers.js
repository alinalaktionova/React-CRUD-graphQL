const Users = require("../models");
const TokenGenerator = require("uuid-token-generator");
const { Op } = require("sequelize");
const tokgen = new TokenGenerator();

const resolvers = {
  Query: {
    async authenticate(root, { login, password }) {
      try {
        return {
          user: Users.findOne({ where: { login: login, password: password } }),
          token: tokgen.generate()
        };
      } catch (e) {
        throw new Error("Email or password isn`t correct");
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
    async getUserInfo(parent, { key }, { redis }) {
      try {
        return JSON.parse(await redis.get(key));
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

    async createUser(root, { data }) {
      return Users.create({
        name: data.name,
        login: data.login,
        password: data.password,
        isAdmin: data.isAdmin
      });
    },
    async updateUser(root, { id, data }) {
      return Users.update(
        {
          name: data.name,
          login: data.login,
          password: data.password,
          isAdmin: data.isAdmin
        },
        { where: { id: id } }
      );
    },
    async deleteUser(root, { id }) {
      return Users.destroy({ where: { id: id } });
    }
  }
};
module.exports = resolvers;
