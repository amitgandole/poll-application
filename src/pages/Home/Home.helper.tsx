import { PATHS } from "../../routes/routeConfig";
import { Location, NavigateFunction } from "react-router-dom";
import { MenuProps } from "antd";
import {
  CloseCircleOutlined,
  EditOutlined,
  LaptopOutlined,
} from "@ant-design/icons";

export const handleRoleBasedNavigation = (
  location: Location,
  currentLoggedInUser: any[],
  navigate: NavigateFunction
) => {
  if (location.pathname === PATHS.home) {
    if (currentLoggedInUser[0]?.role === "admin") {
      navigate(PATHS.admin_home, { replace: true });
    } else if (currentLoggedInUser[0]?.role === "user") {
      navigate(PATHS.user_home, { replace: true });
    }
  }
};

export const getSelectedKey = (location: Location): string => {
  if (location.pathname.includes("create-poll")) return "1";
  if (location.pathname.includes("active-polls")) return "2";
  if (location.pathname.includes("closed-polls")) return "3";
  return "";
};

export const keyToRoute: { [key: string]: string } = {
  "1": "create-poll",
  "2": "active-polls",
  "3": "closed-polls",
};

export const getSiderMenu = (): MenuProps["items"] => [
  {
    key: "2",
    icon: <LaptopOutlined className="sider-icon" />,
    label: "Active Polls",
  },
  {
    key: "3",
    icon: <CloseCircleOutlined className="sider-icon" />,
    label: "Closed Poll",
  },
  {
    key: "1",
    icon: <EditOutlined className="sider-icon" />,
    label: "Create Poll",
  },
];

export const handleSiderMenuClick = (
  e: { key: string },
  navigate: NavigateFunction
) => {
  const route = keyToRoute[e.key];
  if (route) {
    navigate(route);
  }
};
