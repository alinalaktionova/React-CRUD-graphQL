const Users = require("../../models/UsersModels");
const { Op } = require("sequelize");

const queries = {
  async getUserInfo(parent, args, context) {
    try {
      return Users.findOne({where: {id: context.currentUser.id}});
    } catch (e) {
      return null;
    }
  },
  async getAllUsers(root, { id }) {
    return Users.findAll({ where: { id: { [Op.ne]: id }, isActive: true, isDeleted: false } });
  }
};

module.exports = queries;
