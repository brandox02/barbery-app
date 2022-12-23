import { HttpLink } from "apollo-link-http";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { API_URL } from "@env";
import { isProductionEnv } from "./utils/isProductionEnv";
import { getLocalhost } from "./utils/getLocalhost";

const makeApolloClient = (token) => {
  const uri = isProductionEnv()
    ? `${API_URL}/graphql`
    : `${getLocalhost()}:9000/graphql`;
  // create an apollo link instance, a network interface for apollo client

  console.log("You are connected to the following api: " + uri);
  const link = new HttpLink({
    uri,
    headers: {
      authorization: `Bearer ${token}` || "",
    },
  });

  // create an inmemory cache instance for caching graphql data
  const cache = new InMemoryCache();

  // instantiate apollo client with apollo link instance and cache instance
  const client = new ApolloClient({
    link,
    cache,
  });

  return client;
};

export default makeApolloClient;
