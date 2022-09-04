import haircutRoutes from "./pages/haircut/routes";
import signInRoutes from "./pages/signin/routes";
import loginInRoutes from "./pages/login/routes";
import workScheduleRoutes from "./pages/works-chedule/routes";
import settingRoutes from "./pages/setting/routes";
import scheduleRoutes from "./pages/schedules/routes";

export default ({ setToken, reloadUserInfo }) => [
  ...loginInRoutes({ setToken }),
  ...signInRoutes({ setToken }),
  ...haircutRoutes,
  ...workScheduleRoutes,
  ...settingRoutes({ setToken, reloadUserInfo }),
  ...scheduleRoutes,
];
