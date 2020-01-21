const { ApolloServer } = require("apollo-server-hapi");
const Hapi = require("hapi");
const Users = require("./models");
const schema = require("./shema/schema");
const Redis = require ("ioredis");

const redis = new Redis();

const server = new ApolloServer({
  schema: schema,
  context: {Users, redis}
});

async function StartServer() {
  const app = Hapi.server({
    port: 4000,
    host: "localhost"
  });

  await server.applyMiddleware({ app });
  Users.sequelize.authenticate();
  Users.sequelize.sync();
  try {
    await app.start();
    console.log(`Server is running at: ${app.info.uri}`);
  } catch (err) {
    console.log(`Error while starting server: ${err.message}`);
  }
}

StartServer().then(res => res);
module.exports = redis;