import Settings from ".";
import UpdateProfile from "./update-profile";

export default ({ setToken, reloadUserInfo }) => [
  {
    path: "/settings",
    exact: true,
    element: <Settings setToken={setToken} />,
  },
  {
    path: "/settings/update-profile",
    exact: true,
    element: (
      <UpdateProfile reloadUserInfo={reloadUserInfo} setToken={setToken} />
    ),
  },
];
