import haircutRoutes from "./pages/haircut/routes";
import React from "react";
import { Text } from "react-native";
import signInRoutes from "./pages/signin/routes";
import loginInRoutes from "./pages/login/routes";

export default ({ setToken }) => [
  ...loginInRoutes({ setToken }),
  ...signInRoutes({ setToken }),
  ...haircutRoutes,
  {
    path: "/schedules",
    exact: true,
    element: <Text>Estas en la página de agendas</Text>,
  },
  {
    path: "/work-schedules",
    exact: true,
    element: <Text>Estas en la página de horarios</Text>,
  },
  {
    path: "/settings",
    exact: true,
    element: <Text>Estas en la página de configuración</Text>,
  },
];
