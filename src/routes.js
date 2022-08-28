import SignIn from "./pages/signin";
import LogIn from "./pages/login";
import HaircutList from "./pages/haircuts";
import React from "react";
import { Text } from "react-native";

export default ({ setToken }) => [
  {
    path: "/signIn",
    exact: true,
    element: <SignIn setToken={setToken} />,
  },
  {
    path: "/",
    exact: true,
    element: <LogIn setToken={setToken} />,
  },

  {
    path: "/haircuts",
    exact: true,
    element: <HaircutList />,
  },
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
