const { ApolloServer } = require("apollo-server-hapi");
const Hapi = require("hapi");
const Users = require("./models");
const schema = require("./shema/schema");
const Redis = require("ioredis");
const Cookies = require("js-cookie");
const env = require("./dbconnection");
/*{Users, redis}*/

const redis = new Redis();

async function tradeTokenForUser(token) {
  if (token === Cookies.get("token")) {
    console.log(token === Cookies.get("token"));
    return JSON.parse(await redis.get("user"));
  } else {
    return null;
  }
}

const server = new ApolloServer({
  schema: schema,
  context: async (req) => {
    let authToken = null;
    let currentUser = null;

    try {
      authToken = req.request.headers.authorization;
      if (authToken) {
        currentUser = await tradeTokenForUser(authToken);
      }
    } catch (e) {
      console.log(req.request.headers)
      console.log(e.message)
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
