import { Button, Col, Form, Input, message, Row, Select } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

// Utils and types
import { LOGIN_BG_IMAGE_URL } from "../../utils/Constants";
import { User } from "../../interfaces/User";

// Redux imports
import { login } from "../../reducers/authReducer";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";

// Custom hooks
import useLocalStorage from "../../utils/useLocalStorage";

// Css
import "./Login.css";
import generateUniqueId from "../../utils/useUniqueId";

const { Option } = Select;

const Login: React.FC = () => {
  const [isRegistration, setIsRegistration] = useState(false);
  const [users, setUsers] = useLocalStorage("users", []);
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state: RootState) => state.auth);

  const onFinish = (credentials: User) => {
    console.log(loggedInUser);
    console.log("Login Form Submitted:", credentials);
    if (isRegistration) {
      manageRegistration(credentials);
      return;
    }
    manageLogin(credentials);
  };

  const getExistingUser = (credentials: User): User | undefined =>
    users.find(
      (user: User) =>
        user?.firstName?.toLowerCase() ===
          credentials?.firstName?.toLowerCase() &&
        user?.lastName?.toLowerCase() === credentials?.lastName?.toLowerCase()
    );

  const manageRegistration = (credentials: User) => {
    if (getExistingUser(credentials)) {
      message.error("User already exists. Please login!");
      return;
    }
    credentials.id = generateUniqueId();
    const updatedUsers = [...users, credentials];
    setUsers(updatedUsers);
    message.success("Registration successful! Please login.");
    setIsRegistration(false);
  };

  const manageLogin = (credentials: User) => {
    const foundUser = getExistingUser(credentials);
    if (!foundUser) {
      message.error(
        "User not found, Please register first or contact support!"
      );
      return;
    }
    message.success(`Welcome back, ${foundUser.firstName}`);
    dispatch(login(foundUser));
  };

  return (
    <Row className="login-page">
      <Col span={12} className="login-image-container">
        <img src={LOGIN_BG_IMAGE_URL} alt="Login" className="login-image" />
      </Col>
      <Col span={12} className="login-form-container">
        <Row justify={"center"} align={"middle"} className="form-row">
          <Col>
            <Form name="login-form" className="login-form" onFinish={onFinish}>
              <Form.Item
                name="firstName"
                rules={[
                  { required: true, message: "Please input your first name!" },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="First name" />
              </Form.Item>
              <Form.Item
                name="lastName"
                rules={[
                  { required: true, message: "Please input your last name!" },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Last name" />
              </Form.Item>
              {isRegistration && (
                <Form.Item
                  name="role"
                  rules={[
                    { required: true, message: "Please select your role!" },
                  ]}
                >
                  <Select placeholder="Select Role" className="input-field">
                    <Option value="admin">Admin</Option>
                    <Option value="user">User</Option>
                  </Select>
                </Form.Item>
              )}
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  block
                >
                  {isRegistration ? "Sign Up" : "LOGIN"}
                </Button>
              </Form.Item>
              <div className="register-container">
                <label>
                  {isRegistration ? "Registered?" : "Not Registered?"}
                </label>
                <a
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    setIsRegistration(!isRegistration);
                  }}
                >
                  {isRegistration ? "Login" : "Register me!"}
                </a>
              </div>
            </Form>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Login;
