const Sequelize = require("sequelize");
const env = require("./dbconfig");

const sequelize = new Sequelize(env.DB, env.USER, env.PASSWORD, {
  dialect: env.USER,
  host: env.HOST,
  port: env.PORT_DB
});

module.exports = sequelize;
