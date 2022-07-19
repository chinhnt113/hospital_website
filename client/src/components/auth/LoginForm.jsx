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
        span: 9,
      }}
      wrapperCol={{
        span: 12,
      }}
      autoComplete="on"
      onFinish={login}
      onSubmit={(e) => e.preventDefault()}
    >
      <Form.Item
        style={{ fontSize: "30px", fontWeight: "700", textAlign: "center" }}
        wrapperCol={{ span: "24" }}
      >
        ĐĂNG NHẬP
      </Form.Item>
      <Form.Item
        name="username"
        label="Tên đăng nhập"
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
        label="Mật khẩu"
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

      <Form.Item
        style={{ textAlign: "center" }}
        wrapperCol={{
          offset: 3,
          span: 18,
        }}
      >
        <AlertMessage info={alert}/>
      </Form.Item>

      <Form.Item
        style={{ textAlign: "center" }}
        wrapperCol={{
          span: 24,
        }}
      >
        <Button size="large" type="primary" htmlType="submit">
          Đăng nhập
        </Button>
      </Form.Item>

      <Form.Item
        style={{ textAlign: "center" }}
        wrapperCol={{
          span: 24,
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
