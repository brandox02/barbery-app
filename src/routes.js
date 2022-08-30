import haircutRoutes from "./pages/haircut/routes";
import React from "react";
import { Text } from "react-native";
import signInRoutes from "./pages/signin/routes";
import loginInRoutes from "./pages/login/routes";
import workScheduleRoutes from "./pages/works-chedule/routes";

export default ({ setToken }) => [
  ...loginInRoutes({ setToken }),
  ...signInRoutes({ setToken }),
  ...haircutRoutes,
  ...workScheduleRoutes,
  {
    path: "/schedules",
    exact: true,
    element: <Text>Estas en la página de agendas</Text>,
  },
  {
    path: "/settings",
    exact: true,
    element: <Text>Estas en la página de configuración</Text>,
  },
];
