import { lazy, LazyExoticComponent } from "react";
import Login from "../pages/Login/Login";

const Home = lazy(() => import("../pages/Home/Home"));
const AdminHome = lazy(() => import("../pages/Home/Admin/AdminHome"));
const UserHome = lazy(() => import("../pages/Home/User/UserHome"));

const ActivePoll = lazy(() => import("../pages/Home/Admin/ActivePoll"));
const CreatePoll = lazy(() => import("../pages/Home/Admin/CreatePoll"));
const ClosedPoll = lazy(() => import("../pages/Home/Admin/ClosedPoll"));

interface Route {
  path: string;
  component: () => JSX.Element;
}

interface LazyRoute {
  path: string;
  component: LazyExoticComponent<() => JSX.Element>;
  children?: LazyRoute[];
}

export const PATHS = {
  home: "/home",
  login: "/login",
  admin_home: "admin-home",
  user_home: "user-home",
  active_poll: "active-polls",
  create_poll: "create-poll",
  closed_poll: "closed-polls",
};

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
