import { Card } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import "./AdminHome.css";
import { Navigate, useNavigate } from "react-router-dom";
import { handleSiderMenuClick } from "../Home.helper";
import { PATHS } from "../../../utils/Constants";

const AdminHome = () => {
  const navigate = useNavigate();

  const handleCardNavigation = (path: string) => {
    return navigate("/home/" + path);
  };

  return (
    <div className="admin-home-container">
      <div className="welcome-section">
        <span className="admin-title">Welcome,</span>
        <span className="admin-subtitle">What do you want to do today?</span>
      </div>

      <div className="cards-section">
        <Card
          className="card poll-card"
          onClick={() => handleCardNavigation(PATHS.active_poll)}
        >
          <div className="card-content">
            <span>See Active Polls</span>
            <ArrowRightOutlined className="arrow-icon" />
          </div>
        </Card>

        <Card
          className="card poll-card"
          onClick={() => handleCardNavigation(PATHS.closed_poll)}
        >
          <div className="card-content">
            <span>See Closed Polls</span>
            <ArrowRightOutlined className="arrow-icon" />
          </div>
        </Card>

        <Card
          className="card poll-card"
          onClick={() => handleCardNavigation(PATHS.create_poll)}
        >
          <div className="card-content">
            <span>Create New Poll</span>
            <ArrowRightOutlined className="arrow-icon" />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminHome;
