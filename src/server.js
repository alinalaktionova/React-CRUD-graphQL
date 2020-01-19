
const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'users',
    password: 'alina123',
    port: 5432,
});
console.dir(client);
client.connect();

client.query('SELECT * FROM users', (err, res) => {
    console.log(err, res.rows);
    client.end()
});
const Sequelize = require("sequelize");
const sequelize = new Sequelize("users", "postgres", "alina123", {
    dialect: 'postgres',
    host: "localhost",
    port: "5432"
});
// @ts-ignore
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.log('Unable to connect to the database', err);
    });
console.dir(sequelize);
const { ApolloServer, gql } = require('apollo-server-hapi');
const Hapi = require('hapi');

const typeDefs = gql`
    type Query {
        "A simple type for getting started!"
        hello: String
    }
`;
const resolvers = {
    Query: {
        hello: () => 'world',
    },
};

async function StartServer() {
    const server = new ApolloServer({ typeDefs, resolvers });

    const app = new Hapi.server({
        port: 4000
    });

    await server.applyMiddleware({
        app,
    });

    await server.installSubscriptionHandlers(app.listener);

    await app.start();
}

StartServer().then(()=> console.log("hello world")).catch(error => console.log(error));
