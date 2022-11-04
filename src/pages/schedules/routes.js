import ScheduleList from "./list";
import ScheduleManagement from "./management";

export const scheduleRoutes = [
  {
    path: "/schedules",
    exact: true,
    element: <ScheduleList />,
  },
  {
    path: "/schedules/management",
    exact: true,
    element: <ScheduleManagement />,
  },
];
