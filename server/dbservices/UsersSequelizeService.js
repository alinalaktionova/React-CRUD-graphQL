const Users = require("../models/UsersModels");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { adminFeatures, userFeatures } = require("../features/features");

const getAll = id => {
  return Users.findAll({
    where: { id: { [Op.ne]: id }, isActive: true, isDeleted: false }
  });
};

const getUserById = id => {
  return Users.findOne({ where: { id: id } });
};

const authUser = login => {
  return Users.findOne({
    where: {
      login: login,
      isActive: true,
      isDeleted: false
    }
  });
};
const createUser = params => {
  return Users.create({
    name: params.name,
    login: params.login,
    features: params.admin ? adminFeatures : userFeatures,
    isActive: false,
    isDeleted: false
  });
};

const updateUser = async (id, params) => {
  await Users.update(
    {
      name: params.name,
      login: params.login,
      features: params.admin ? adminFeatures : userFeatures
    },
    { where: { id: id } }
  );
};

const addPassword = async (password, id) => {
  const hash = await bcrypt.hash(password, 10);
  await Users.update({ password: hash, isActive: true }, { where: { id: id } });
};
const updatePassword = async (password, id) => {
  await Users.update(
    { password: await bcrypt.hash(password, 10) },
    { where: { id: id } }
  );
};

const deleteUser = async id => {
  await Users.update({ isDeleted: true }, { where: { id: id } });
};

module.exports = {
  getAll,
  getUserById,
  deleteUser,
  updateUser,
  addPassword,
  authUser,
  updatePassword,
  createUser
};
