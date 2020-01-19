import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {
  HttpLink,
  InMemoryCache,
  ApolloClient,
  ApolloProvider,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://localhost:4000/graphql"
  })
});
/*
client
  .query({
    query: GET_USERS
  })
  .then((result: any) => console.log(result))
  .catch((e: any) => console.log(e));*/

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
