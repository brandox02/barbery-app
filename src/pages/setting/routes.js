import Settings from ".";

export default ({ setToken }) => [
  {
    path: "/settings",
    exact: true,
    element: <Settings setToken={setToken} />,
  },
];
