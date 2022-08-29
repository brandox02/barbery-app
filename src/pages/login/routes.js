import LogIn from ".";

const loginInRoutes = ({ setToken }) => [
  {
    path: "/",
    exact: true,
    element: <LogIn setToken={setToken} />,
  },
];

export default loginInRoutes;
