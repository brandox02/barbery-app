import { HttpLink } from "apollo-link-http";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { API_URL } from "@env";
import { isProductionEnv } from "./utils/isProductionEnv";
import { getLocalhost } from "./utils/getLocalhost";

const makeApolloClient = () => {
  const uri = isProductionEnv() ? API_URL : `${getLocalhost()}:5000`;
  // create an apollo link instance, a network interface for apollo client
  const link = new HttpLink({
    uri,
    //  headers: {
    //    Authorization: `Bearer ${token}`
    //  }
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
