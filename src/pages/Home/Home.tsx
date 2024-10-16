import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { Button, Layout, Menu } from "antd";
import useLocalStorage from "../../utils/useLocalStorage";
import { LogoutOutlined } from "@ant-design/icons";
import { LOGO_URL } from "../../utils/Constants";
import { useDencrypt } from "use-dencrypt-effect";
import Sider from "antd/es/layout/Sider";

import {
  handleRoleBasedNavigation,
  getSiderMenu,
  handleSiderMenuClick,
  getSelectedKeyAdmin,
  getSelectedKeyUser,
} from "./Home.helper";

import "./Home.css";
import "./background.css";

const Home = () => {
  const [currentLoggedInUser, setCurrentLoggedInUser] = useLocalStorage(
    "currentLoggedInUser",
    []
  );
  const navigate = useNavigate();
  const location = useLocation();
  const greetings = ["नमस्ते", "Hello", "Guten Tag", "こんにちは"];
  const [greeting, setGreeting] = useDencrypt("🙏🙏");

  useEffect(() => {
    handleRoleBasedNavigation(location, currentLoggedInUser, navigate);
  }, [currentLoggedInUser, navigate, location]);

  useEffect(() => {
    let i = 0;
    const action = setInterval(() => {
      setGreeting(greetings[i]);
      i = (i + 1) % greetings.length;
    }, 2000);

    return () => clearInterval(action);
  }, [setGreeting]);

  const handleLogout = () => {
    setCurrentLoggedInUser([]);
    navigate("/login");
  };

  return (
    <Layout className="layout">
      <Header className="header">
        <div className="logo">
          <img src={LOGO_URL} alt="logo" className="logo-image" />
        </div>

        <div className="center-text">
          <h2>
            {greeting}, {currentLoggedInUser[0]?.firstName}
          </h2>
        </div>

        <div className="left-text">
          <span style={{ fontWeight: "bold", color: "grey" }}>
            {new Date().toUTCString()}
          </span>
          <Button
            type="link"
            className="logout-button"
            onClick={handleLogout}
            icon={<LogoutOutlined />}
          >
            Logout
          </Button>
        </div>
      </Header>
      <Layout>
        <Sider width="10%" theme="light" className="sider">
          <Menu
            mode="inline"
            selectedKeys={
              currentLoggedInUser[0].role === "admin"
                ? [getSelectedKeyAdmin(location)]
                : [getSelectedKeyUser(location)]
            }
            items={getSiderMenu(currentLoggedInUser[0].role)}
            onClick={(e) => handleSiderMenuClick(e, navigate)}
          />
        </Sider>
        <Content className="content bgLight">
          <Outlet />
        </Content>
      </Layout>

      <Footer className="footer">
        Talentica© {new Date().getFullYear()} Created by Amit Gandole
      </Footer>
    </Layout>
  );
};

export default Home;
