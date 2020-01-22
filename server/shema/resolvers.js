const Users = require("../models");
const TokenGenerator = require("uuid-token-generator");
const { Op } = require("sequelize");
const tokgen = new TokenGenerator();

console.dir(tokgen.generate());

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
    async getUserInfo(parent, { key }, { redis }) {
      try {
          console.log("get");
        console.dir(JSON.parse(await redis.get(key)));
        return JSON.parse(await redis.get(key));
      } catch (e) {
        console.dir(e);
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
        console.log(value);
        await redis.set(key, JSON.stringify(value));
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    async logoutUser(parent, { key }, { redis }) {
      try {
        await redis.del(key);
        return true;
      } catch (e) {
        console.log(e);
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
