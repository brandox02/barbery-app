import LogIn from ".";

const loginInRoutes = ({ setToken }) => [
  {
    path: "/",
    exact: true,
    element: <LogIn setToken={setToken} />,
    noLayout: true
  },
];

export default loginInRoutes;
