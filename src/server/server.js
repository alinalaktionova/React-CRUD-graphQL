const { makeExecutableSchema } = require("graphql-tools");
const { gql, ApolloServer } = require("apollo-server-hapi");
const Hapi = require("hapi");
const Users = require("./dbconnection");

/*const books = [
    {
        title: 'Harry Potter and the Chamber of Secrets',
        author: 'J.K. Rowling',
    },
    {
        title: 'Jurassic Park',
        author: 'Michael Crichton',
    },
];*/
const typeDefs = gql`
  type User {
    id: Int!
    name: String!
    login: String!
    password: String!
    isAdmin: Boolean!
  }
  type Query {
    getAllUsers: [User]!
  }
  type Mutation {
    createUser(
      name: String!
      login: String!
      password: String!
      isAdmin: Boolean
    ): User!
    updateUser(id: Int!, name: String, login: String, password: String): User!
    deleteUser(id: Int!): Boolean
  }
`;
const resolvers = {
  Query: {
    async getAllUsers() {
      return Users.findAll();
    }
  },
  Mutation: {
    async createUser(root, { name, login, password, isAdmin }) {
      return Users.create({
        name,
        login,
        password,
        isAdmin
      });
    },
    async updateUser(root, { id, name, login, password }) {
      return Users.update(
        { name: name },
        { login: login },
        { password: password },
        { where: { id: id } }
      );
    },
    async deleteUser(root, { id }) {
      return Users.destroy({ where: { id: id } });
    }
  }
};
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

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
