import { ApolloClient, InMemoryCache } from "@apollo/client";

if (process.env.NODE_ENV !== "production") {
}

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  cache: new InMemoryCache(),
});

export default client;
