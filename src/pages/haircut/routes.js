import HaircutList from "./list";
import HaircutManagement from "./management";

export const haircutRoutes = [
  {
    path: "/haircuts",
    exact: true,
    element: <HaircutList />,
  },
  {
    path: "/haircuts/create",
    exact: true,
    element: <HaircutManagement />,
  },
  {
    path: "/haircuts/update/:haircutId",
    exact: true,
    element: <HaircutManagement />,
  },
];
