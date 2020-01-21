const { ApolloServer } = require("apollo-server-hapi");
const Hapi = require("hapi");
const Users = require("./dbconnection");
const schema = require("./schema");

const server = new ApolloServer({
  schema: schema,
  context: { Users }
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
