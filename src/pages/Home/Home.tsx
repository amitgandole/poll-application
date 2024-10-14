import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { PATHS } from "../../routes/routeConfig";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { Button, Layout } from "antd";
import useLocalStorage from "../../utils/useLocalStorage";
import { LogoutOutlined } from "@ant-design/icons";

import "./Home.css";

import { LOGO_URL } from "../../utils/Constants";
import { useDencrypt } from "use-dencrypt-effect";

const Home = () => {
  const [currentLoggedInUser] = useLocalStorage("currentLoggedInUser", []);
  const navigate = useNavigate();
  const location = useLocation();
  const greetings = ["नमस्ते", "Hello", "Guten Tag", "こんにちは"];
  const [greeting, setGreeting] = useDencrypt("🙏🙏");

  useEffect(() => {
    if (location.pathname === PATHS.home) {
      if (currentLoggedInUser[0]?.role === "admin") {
        navigate(PATHS.admin_home, { replace: true });
      } else if (currentLoggedInUser[0]?.role === "user") {
        navigate(PATHS.user_home, { replace: true });
      }
    }
  }, [currentLoggedInUser, navigate, location]);

  useEffect(() => {
    let i = 0;
    const action = setInterval(() => {
      setGreeting(greetings[i]);
      i = (i + 1) % greetings.length;
    }, 2000);

    return () => clearInterval(action);
  }, [setGreeting]);

  const handleLogout = () => {};
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

        <Button
          type="link"
          className="logout-button"
          onClick={handleLogout}
          icon={<LogoutOutlined />}
        >
          Logout
        </Button>
      </Header>
      <Content className="content">
        <Outlet />
      </Content>
      <Footer className="footer">
        Talentica© {new Date().getFullYear()} Created by Amit Gandole
      </Footer>
    </Layout>
  );
};

export default Home;
