import { Location, NavigateFunction } from "react-router-dom";
import { MenuProps } from "antd";
import {
  CloseCircleOutlined,
  EditOutlined,
  HomeOutlined,
  LaptopOutlined,
} from "@ant-design/icons";
import { KEY_TO_ROUTE, PATHS } from "../../utils/Constants";

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

export const getSelectedKeyAdmin = (location: Location): string => {
  if (location.pathname.includes("create-poll")) return "1";
  if (location.pathname.includes("active-polls")) return "2";
  if (location.pathname.includes("closed-polls")) return "3";
  if (location.pathname.includes("/home")) return "4";
  return "";
};

export const getSelectedKeyUser = (location: Location): string => {
  if (location.pathname.includes("poll-list")) return "5";
  if (location.pathname.includes("user-home")) return "4";
  return "";
};

export const getSiderMenu = (role: string): MenuProps["items"] => {
  if (role === "user") {
    return [
      {
        key: "4",
        icon: <HomeOutlined className="sider-icon" />,
        label: "Dashboard",
      },
      {
        key: "5",
        icon: <LaptopOutlined className="sider-icon" />,
        label: "My Polls",
      },
    ];
  }

  return [
    {
      key: "4",
      icon: <HomeOutlined className="sider-icon" />,
      label: "Dashboard",
    },
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
};

export const handleSiderMenuClick = (
  e: { key: string },
  navigate: NavigateFunction
) => {
  const route = KEY_TO_ROUTE[e.key];
  if (route) {
    navigate(route);
  }
};
