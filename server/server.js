const { ApolloServer } = require("apollo-server-hapi");
const Hapi = require("hapi");
const Users = require("./models/sequelizeModels/UsersModel");
const schema = require("./shema/schema");
const Redis = require("ioredis");
const env = require("./configs/dbconfig");
const { getConnectionToDB } = require("./configs/typeormconfig");

const redis = new Redis();

async function tradeTokenForUser(token) {
  const userObj = JSON.parse(await redis.get(token));
  return userObj ? userObj : null;
}

const server = new ApolloServer({
  schema,
  context: async ({ request }) => {
    let authToken = null;
    let currentUser = null;
    try {
      authToken = request.headers.authorization;
      if (authToken) {
        currentUser = await tradeTokenForUser(authToken);
      }
    } catch (e) {
      console.warn(`Unable to authenticate using auth token: ${authToken}`);
    }
    return {
      authToken,
      currentUser,
      redis
    };
  }
});
async function StartServer() {
  const app = Hapi.server({
    port: env.PORT_SERVER,
    host: env.HOST
  });

  await server.applyMiddleware({ app });
  switch (env.ORM_TYPE) {
    case "sequalize":
      Users.sequelize.authenticate();
      Users.sequelize.sync();
      break;
    case "typeORM":
      await getConnectionToDB();
      break;
  }
  try {
    await app.start();
    console.log(`Server is running at: ${app.info.uri}`);
  } catch (err) {
    console.log(`Error while starting server: ${err.message}`);
  }
}

StartServer().then(res => res);

