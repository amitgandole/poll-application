import { lazy, LazyExoticComponent } from "react";
import Login from "../pages/Login/Login";

const Home = lazy(() => import("../pages/Home/Home"));
const AdminHome = lazy(() => import("../pages/Home/Admin/AdminHome"));
const UserHome = lazy(() => import("../pages/Home/User/UserHome"));

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
