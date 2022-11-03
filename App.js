if (!isProductionEnv()) {
  import("./src/reactotron-config").then(() =>
    console.log("Reactotron Configured")
  );
}
import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { NativeRouter, Route, Routes, useNavigate } from "react-router-native";

import useToken from "./src/hooks/useToken";
import routes from "./src/routes";
import { AppProvider, useAppContext } from "./src/appProvider";
import { Layout } from "./src/layout";
import { Provider, Text } from "react-native-paper";
import { isProductionEnv } from "./src/utils/isProductionEnv";
import initReactNativeCalendarConfig from "./src/reactNativeCalendarConfig";

initReactNativeCalendarConfig();

export default function App() {
  function DirectlyChild() {
    const navigate = useNavigate();
    // const [_, setToken, reloadUserInfo] = useToken({ apolloClient });
    const {
      state: { apolloClient },
    } = useAppContext({ navigate });

    return (
      <ApolloProvider client={apolloClient}>
        <Routes>
          {routes({ setToken: () => {}, reloadUserInfo: async () => {} }).map(
            (routeProps) => (
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
            )
          )}
        </Routes>
      </ApolloProvider>
    );
  }

  return (
    <Provider>
      <AppProvider>
        <NativeRouter>
          <DirectlyChild />
        </NativeRouter>
      </AppProvider>
    </Provider>
  );
}
