import SignIn from ".";

const signInRoutes = ({ setToken }) => [
  {
    path: "/signIn",
    exact: true,
    element: <SignIn setToken={setToken} />,
  },
];

export default signInRoutes;
