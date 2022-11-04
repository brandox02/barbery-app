import Settings from ".";
import UpdateProfile from "./update-profile";

export const settingRoutes = [
  {
    path: "/settings",
    exact: true,
    element: <Settings />,
  },
  {
    path: "/settings/update-profile",
    exact: true,
    element: <UpdateProfile />,
  },
];
