const {
  userService,
  authService
} = require("../../dbservices/ServiceFactories/CreateServices");
const { EDIT, CREATE, DELETE } = require("../../features/featureOperations");
const checkPermission = require("../../utils/checkPermission");

const mutations = {
  async authenticate(root, { login, password }) {
    return await authService.authUser(login, password);
  },
  async setUserInfo(parent, { key, value }, { redis }) {
    return await authService.setUserInfo(key, value, redis);
  },
  async createUser(root, { data }, context) {
    if (checkPermission(context.currentUser, CREATE)) {
      return await userService.createUser(data);
    } else {
      return null;
    }
  },
  async addPassword(root, { token, password }, { redis }) {
    return await userService.addPassword(password, token, redis);
  },
  async updatePassword(root, { oldPassword, newPassword }, context) {
    if (context.currentUser) {
      return await userService.updatePassword(
        oldPassword,
        newPassword,
        context.currentUser.id
      );
    }
  },
  async updateUser(root, { id, data }, context) {
    if (checkPermission(context.currentUser, EDIT)) {
      return await userService.updateUser(id, data);
    } else {
      return null;
    }
  },
  async logoutUser(parent, { key }, { redis }) {
    return await authService.logoutUser(key, redis);
  },
  async deleteUser(root, { id }, context) {
    if (checkPermission(context.currentUser, DELETE)) {
      return await userService.deleteUser(id);
    } else {
      return null;
    }
  }
};

module.exports = mutations;
