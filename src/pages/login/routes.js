import LogIn from ".";

export const loginInRoutes = [
  {
    path: "/",
    exact: true,
    element: <LogIn />,
    noLayout: true,
  },
];
