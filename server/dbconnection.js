const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "users",
  password: "alina123",
  port: 5432
});

client.connect();
