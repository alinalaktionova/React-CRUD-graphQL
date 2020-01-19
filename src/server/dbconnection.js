const { Client } = require("pg");
const Sequelize = require("sequelize");

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "users",
  password: "alina123",
  port: 5432
});

client.connect();

const sequelize = new Sequelize("users", "postgres", "alina123", {
  dialect: "postgres",
  host: "localhost",
  port: "5432"
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.log("Unable to connect to the database", err);
  });

const Users = sequelize.define("users",{
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

/*sequelize.sync();

Users.findAll({raw:true}).then(users=>{
    console.log(users);
}).catch(err=>console.log(err));*/

module.exports = Users;