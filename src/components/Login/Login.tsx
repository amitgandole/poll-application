import { Button, Col, Form, Input, Row, Select } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./Login.css";
import { useState } from "react";

const { Option } = Select;

const Login: React.FC = () => {
  const [isRegistration, setIsRegistration] = useState(false);

  const onFinish = (values: any) => {
    console.log("Login Form Submitted:", values);
  };

  return (
    <Row className="login-page">
      <Col span={12} className="login-image-container">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfD44m9BNOi165qaGmWkp1--f2YKw0R56T3g&s"
          alt="Login"
          className="login-image"
        />
      </Col>
      <Col span={12} className="login-form-container">
        <Row justify={"center"} align={"middle"} className="form-row">
          <Col>
            <Form name="login-form" className="login-form" onFinish={onFinish}>
              <Form.Item
                name="firstname"
                rules={[
                  { required: true, message: "Please input your first name!" },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="First name" />
              </Form.Item>
              <Form.Item
                name="lastname"
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
