const Sequelize = require("sequelize");

const sequelize = new Sequelize("users", "postgres", "alina123", {
  dialect: "postgres",
  host: "localhost",
  port: "5432"
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
    allowNull: false
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
});

module.exports = Users;
