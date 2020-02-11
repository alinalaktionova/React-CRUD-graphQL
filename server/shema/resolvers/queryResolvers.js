const {
  getAll,
  getUserById
} = require("../../dbservices/UsersSequelizeService");

const queries = {
  async getUserInfo(parent, args, context) {
    try {
      return getUserById(context.currentUser.id);
    } catch (e) {
      return null;
    }
  },
  async getAllUsers(root, { id }) {
    return getAll(id);
  }
};

module.exports = queries;
