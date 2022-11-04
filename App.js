if (!isProductionEnv()) {
  import("./src/reactotron-config").then(() =>
    console.log("Reactotron Configured")
  );
}
import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { NativeRouter, Route, Routes } from "react-router-native";
import { routes } from "./src/routes";
import { AppProvider, useAppContext } from "./src/appProvider";
import { Layout } from "./src/layout";
import { Provider } from "react-native-paper";
import { isProductionEnv } from "./src/utils/isProductionEnv";
import initReactNativeCalendarConfig from "./src/reactNativeCalendarConfig";

initReactNativeCalendarConfig();

export default function App() {
  function DirectlyChild() {
    const {
      state: { apolloClient },
    } = useAppContext();

    return (
      <ApolloProvider client={apolloClient}>
        <Routes>
          {routes.map((routeProps) => (
            <Route
              {...routeProps}
              key={routeProps.path}
              element={
                routeProps.noLayout ? (
                  routeProps.element
                ) : (
                  <Layout>{routeProps.element}</Layout>
                )
              }
            />
          ))}
        </Routes>
      </ApolloProvider>
    );
  }

  return (
    <Provider>
      <NativeRouter>
        <AppProvider>
          <DirectlyChild />
        </AppProvider>
      </NativeRouter>
    </Provider>
  );
}
