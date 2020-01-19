const { makeExecutableSchema } = require ('graphql-tools');
const {gql, ApolloServer } = require('apollo-server-hapi');
const Hapi = require('hapi');

const books = [
    {
        title: 'Harry Potter and the Chamber of Secrets',
        author: 'J.K. Rowling',
    },
    {
        title: 'Jurassic Park',
        author: 'Michael Crichton',
    },
];
const typeDefs = gql`
    type Book {
        title: String
        author: String
    }
    type Query {
        books: [Book]
    }
`;
const resolvers = {
    Query: {
        books: () => books,
    },
};
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

const server = new ApolloServer({
    schema:schema
});

async function StartServer() {

    const app = Hapi.server({
        port: 4000,
        host:'localhost'
    });

    await server.applyMiddleware({ app });

    try {
        await app.start();
        console.log(`Server is running at: ${app.info.uri}`);
    } catch (err) {
        console.log(`Error while starting server: ${err.message}`)
    }
}

StartServer().then(res => res);

