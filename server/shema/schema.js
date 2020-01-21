const Users = require("./models");
const { makeExecutableSchema } = require("graphql-tools");
const { gql } = require("apollo-server-hapi");
const TokenGenerator = require("uuid-token-generator");
const {Op} = require("sequelize");
   console.dir(Op)  ;
//const redis = require("./server");
const tokgen = new TokenGenerator(); // Default is a 128-bit token encoded in base58
console.dir(tokgen.generate());
const typeDefs = gql`
  type User {
    id: Int
    name: String
    login: String
    password: String
    isAdmin: Boolean
  }
  input UserInfo {
    id: Int
    name: String
    login: String
    password: String
    isAdmin: Boolean
  }
  type Auth {
    user: User
    token: String
  }
  type Query {
    getAllUsers(id: Int!): [User]!   
    getUserInfo(key: String!): User 
    authenticate(login: String!, password: String!): User   
  }
  type Mutation {
    createUser(data: UserInfo): User!
    updateUser(id: Int, data: UserInfo): User!
    deleteUser(id: Int!): Int!
    setUserInfo(key: String!, value: UserInfo): Boolean!
  }
`;
const resolvers = {
  Query: {
    async authenticate(root, { login, password }) {
      return Users.findOne({ where: { login: login, password: password } });
    },
    async getUserInfo(parent, { key }, { redis }) {
      try {
        console.dir(JSON.parse( await  redis.get(key)));
        return  JSON.parse( await redis.get(key));
      } catch (e) {
        console.dir(e);
      }
    },

    async getAllUsers(root, {id}) {
      return Users.findAll({where: {id: {[Op.ne]: id}}});
    }
  },
  Mutation: {
    async setUserInfo(parent, { key, value} , {redis}) {
      try {
        console.log( value ) ;
       await redis.set(key,  JSON.stringify(value));
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    async createUser(root, { data }) {
      return Users.create({
        name: data.name,
        login: data.login,
        password: data.password,
        isAdmin: data.isAdmin
      });
    },
    async updateUser(root, { id, data }) {
      return Users.update(
        {
          name: data.name,
          login: data.login,
          password: data.password,
          isAdmin: data.isAdmin
        },
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

module.exports = schema;
