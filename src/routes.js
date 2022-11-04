import { haircutRoutes } from "./pages/haircut/routes";
import { signInRoutes } from "./pages/signin/routes";
import { loginInRoutes } from "./pages/login/routes";
import { workScheduleRoutes } from "./pages/works-chedule/routes";
import { settingRoutes } from "./pages/setting/routes";
import { scheduleRoutes } from "./pages/schedules/routes";

export const routes = [
  ...loginInRoutes,
  ...signInRoutes,
  ...haircutRoutes,
  ...workScheduleRoutes,
  ...settingRoutes,
  ...scheduleRoutes,
];
