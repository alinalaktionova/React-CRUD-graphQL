const Users = require("../../models/UsersModels");
const { Op } = require("sequelize");
const { adminFeatures, userFeatures } = require("../../features/features");

export const getAll = (id) => {
    return Users.findAll({ where: { id: { [Op.ne]: id }, isActive: true, isDeleted: false } });
};

export const getUserBy = (params) => {
    if(params.id){
        return Users.findOne({where: {id: params.id}})
    } else if (params.login) {
        return Users.findOne({
            where: {
                login: params.login,
                isActive: true,
                isDeleted: false
            }
        })
    }
};
export const createUser = (params) => {
    return Users.create({
        name: params.name,
        login: params.login,
        features: params.admin ? adminFeatures : userFeatures,
        isActive: false,
        isDeleted: false
    });
};

export const updateUser = (id, params) => {
     Users.update(
        {
            name: params.name,
            login: params.login,
            features: params.admin ? adminFeatures : userFeatures
        },
        { where: { id: id } }
    );
};

export const deleteUser = (id) => {
    Users.update({ isDeleted: true }, { where: { id: id } });
};
