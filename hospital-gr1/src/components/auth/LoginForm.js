import { Button, Checkbox, Form, Input } from "antd";
import React from "react";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../layout/AlertMessage";
import { Link } from "react-router-dom";

const LoginForm = () => {
  // contexts
  const { loginUser } = useContext(AuthContext);

  // state
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const [alert, setAlert] = useState(null);

  const { username, password } = loginForm;

  // handle user input
  const onChangeLoginForm = (event) => {
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
  };

  // handle login submit
  const login = async () => {
    try {
      const loginData = await loginUser(loginForm);
      if (!loginData.success) {
        setAlert({ type: "error", message: loginData.message });
        setTimeout(() => setAlert(null), 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 4,
      }}
      autoComplete="on"
      onFinish={login}
      onSubmit={(e) => e.preventDefault()}
    >
      <Form.Item
        name="username"
        label="Username"
        rules={[
          {
            required: true,
            message: "Vui lòng điền tên đăng nhập!",
          },
        ]}
      >
        <Input value={username} name="username" onChange={onChangeLoginForm} />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Vui lòng điền mật khẩu!",
          },
        ]}
      >
        <Input.Password
          name="password"
          value={password}
          onChange={onChangeLoginForm}
        />
      </Form.Item>

      <AlertMessage info={alert} />
      <Form.Item
        wrapperCol={{
          offset: 4,
          span: 4,
        }}
      >
        <Button type="primary" htmlType="submit">
          Đăng nhập
        </Button>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 3,
          span: 6,
        }}
      >
        Chưa có tài khoản?{" "}
        <Link
          style={{ textDecoration: "underline", color: "var(--main)" }}
          to="/register"
        >
          Đăng ký
        </Link>{" "}
        ngay
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
