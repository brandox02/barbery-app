import ScheduleList from "./list";
import ScheduleManagement from "./management";

export default [
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
