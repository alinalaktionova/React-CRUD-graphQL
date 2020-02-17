const {
  userService
} = require("../../dbservices/ServiceFactories/CreateServices");

const queries = {
  async getUserInfo(parent, args, context) {
    try {
      return userService.getUserById(context.currentUser.id);
    } catch (e) {
      return null;
    }
  },
  async getAllUsers(root, { id }) {
    return userService.getAll(id);
  }
};

module.exports = queries;
