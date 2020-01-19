const { Client } = require('pg');
const Sequelize = require("sequelize");

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'users',
    password: 'alina123',
    port: 5432,
});

client.connect();

client.query('SELECT * FROM users', (err,res) => {
    console.log(err, res.rows);
    client.end()
});

const sequelize = new Sequelize("users", "postgres", "alina123", {
    dialect: 'postgres',
    host: "localhost",
    port: "5432"
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.log('Unable to connect to the database', err);
    });

