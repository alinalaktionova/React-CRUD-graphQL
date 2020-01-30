const Users = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

const mutations = {
  async setUserInfo(parent, { key, value }, { redis }) {
    try {
      await redis.set(key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  },

  async createUser(root, { data }, context) {
    if (
      context.currentUser &&
      context.currentUser.features.includes("create")
    ) {
      const user = await Users.create({
        name: data.name,
        login: data.login,
        features: !data.admin && ["edit"],
        isActive: false,
        isDeleted: false
      });
      const token = jwt.sign(
        { name: data.name, login: data.login },
        process.env.REGISTER_KEY
      );
      console.log(token);
      return { token: token, id: JSON.parse(JSON.stringify(user)).id };
    } else {
      return null;
    }
  },
  async addPassword(root, { token, password }, { redis }) {
    try {
      console.log(JSON.parse(await redis.get(token)).id);
        const hash = await bcrypt.hash(password, 10);
           await Users.update(
              { password: hash, isActive: true },
              { where: { id: JSON.parse(await redis.get(token)).id } }
          );
      await redis.del(token);
      return true;
    } catch (e) {
      return false;
    }
  },
  async updateUser(root, { id, data }, context) {
    if (context.currentUser && context.currentUser.features.includes("edit")) {
      return Users.update(
        {
          name: data.name,
          login: data.login,
          features: data.admin && ["edit", "create", "delete"]
        },
        { where: { id: id } }
      );
    } else {
      return null;
    }
  },
  async deleteUser(root, { id }, context) {
    if (
      context.currentUser &&
      context.currentUser.features.includes("delete")
    ) {
      await Users.update({ isDeleted: true }, { where: { id: id } });
      return id;
    } else {
      return null;
    }
  }
};

module.exports = mutations;
