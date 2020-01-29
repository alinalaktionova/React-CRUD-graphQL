const Sequelize = require("sequelize");
const env = require("./dbconnection");

const sequelize = new Sequelize(env.DB, env.USER, env.PASSWORD, {
  dialect: env.USER,
  host: env.HOST,
  port: env.PORT_DB
});

sequelize.authenticate();

const Users = sequelize.define("users", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    unique: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  login: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: true
  },
  features: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false
  }
});

module.exports = Users ;