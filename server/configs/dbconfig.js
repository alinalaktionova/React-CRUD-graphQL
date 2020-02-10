const { Client } = require("pg");
require('dotenv').config();
const env = process.env;

const client = new Client({
  user: env.USER,
  host: env.HOST,
  database: env.DB,
  password: env.PASSWORD,
  port: env.PORT_DB
});

client.connect();
module.exports = env;