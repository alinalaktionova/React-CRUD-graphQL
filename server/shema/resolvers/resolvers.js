const queries = require("./queryResolvers");
const mutations = require("./mutationResolvers");

const resolvers = {
  Query: queries,
  Mutation: mutations
};

module.exports = resolvers;
