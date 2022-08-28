import { IS_PRODUCTION } from "@env";

if (!Boolean(parseInt(IS_PRODUCTION))) {
  import("./reactotron-config").then(() =>
    console.log("Reactotron Configured")
  );
}

import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import makeApolloClient from "./src/apollo";
import { NativeRouter, Route, Routes } from "react-router-native";

import useToken from "./src/hooks/useToken";
import routes from "./src/routes";
import { AppProvider } from "./src/appProvider";
import { Layout } from "./src/layout";
import { Provider } from "react-native-paper";

export const apolloClient = makeApolloClient();

export default function App() {
  function DirectlyChild() {
    const [_, setToken] = useToken();

    return (
      <Routes>
        {routes({ setToken }).map((routeProps) => (
          <Route
            {...routeProps}
            key={routeProps.path}
            element={<Layout>{routeProps.element}</Layout>}
          />
        ))}
      </Routes>
    );
  }
  return (
    <Provider>
      <ApolloProvider client={apolloClient}>
        <AppProvider>
          <NativeRouter>
            <DirectlyChild />
          </NativeRouter>
        </AppProvider>
      </ApolloProvider>
    </Provider>
  );
}
