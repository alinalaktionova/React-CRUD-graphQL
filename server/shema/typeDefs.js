const { gql } = require("apollo-server-hapi");

const typeDefs = gql`
  type User {
    id: Int
    name: String
    login: String
    password: String
    features: [String]
  }
  input UserInfo {
    id: Int
    name: String
    login: String
    password: String
    admin: Boolean
  }
  input CurrentUserInfo {
    id: Int
    features: [String]
  }
  type Auth {
    user: User
    token: String
  }
  type Query {
    getAllUsers(id: Int!): [User]
    getUserInfo: User
    authenticate(login: String!, password: String!): Auth
    logoutUser(key: String!): Boolean!
  }
  type Mutation {
    createUser(data: UserInfo): User!
    updateUser(id: Int, data: UserInfo): User!
    deleteUser(id: Int!): Int!
    setUserInfo(key: String!, value: CurrentUserInfo): Boolean!
  }
`;
module.exports = typeDefs;
