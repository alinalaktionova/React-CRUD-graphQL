const { createConnection } = require("typeorm");
const env = require("./dbconfig");
const { UserSchema } = require("../models/typeOrmModels/EntityUserSchema");

const getConnectionToDB = async () => {
  return createConnection({
    type: env.DB_TYPE,
    host: env.HOST,
    port: env.PORT_DB,
    username: env.USER,
    password: env.PASSWORD,
    database: env.DB,
    entities: [UserSchema]
  });
};

module.exports = { getConnectionToDB };
