import { lazy, LazyExoticComponent } from "react";
import Login from "../pages/Login/Login";
import { PATHS } from "../utils/Constants";

const Home = lazy(() => import("../pages/Home/Home"));
const AdminHome = lazy(() => import("../pages/Home/Admin/AdminHome"));
const UserHome = lazy(() => import("../pages/Home/User/UserHome"));

const ActivePoll = lazy(
  () => import("../pages/Home/Admin/admin-poll-pages/ActivePoll")
);
const CreatePoll = lazy(
  () => import("../pages/Home/Admin/admin-poll-pages/create-poll/CreatePoll")
);
const ClosedPoll = lazy(
  () => import("../pages/Home/Admin/admin-poll-pages/ClosedPoll")
);

interface Route {
  path: string;
  component: () => JSX.Element;
}

interface LazyRoute {
  path: string;
  component: LazyExoticComponent<() => JSX.Element>;
  children?: LazyRoute[];
}

export const PRIVATE_ROUTES: LazyRoute[] = [
  {
    path: PATHS.home,
    component: Home,
    children: [
      {
        path: PATHS.admin_home,
        component: AdminHome,
      },
      {
        path: PATHS.active_poll,
        component: ActivePoll,
      },
      {
        path: PATHS.closed_poll,
        component: ClosedPoll,
      },
      {
        path: PATHS.create_poll,
        component: CreatePoll,
      },
      {
        path: PATHS.user_home,
        component: UserHome,
      },
    ],
  },
];

export const AUTH_ROUTES: Route[] = [
  {
    path: PATHS.login,
    component: Login,
  },
];
