import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "@apollo/client"
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import Cookies from "js-cookie";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql"
});

const authLink = setContext((_, { headers }) => {
  const token = Cookies.get("token");
  return {
    headers: {
      ...headers,
      authorization: token ? token : ""
    }
  };
});

const client: any = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
  document.getElementById("root")
);
