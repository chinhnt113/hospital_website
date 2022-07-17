import { Button, DatePicker, Form, Input, InputNumber } from "antd";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../layout/AlertMessage";
import locale from "antd/es/date-picker/locale/vi_VN";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  // Context
  const { registerUser } = useContext(AuthContext);

  // Local state
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    email: "",
    fullname: "",
    dob: "",
    bhytId: null,
  });

  const [alert, setAlert] = useState(null);

  const { username, password, email, fullname, dob, bhytId } = registerForm;

  //handle user input
  const onChangeRegisterForm = (event) =>
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });

  const onSelectDateForm = (value, dateStr) => {
    setRegisterForm({
      ...registerForm,
      dob: dateStr,
    });
    console.log(registerForm);
  };
  const register = async () => {
    try {
      const registerData = await registerUser(registerForm);
      if (!registerData.success) {
        setAlert({ type: "error", message: registerData.message });
        setTimeout(() => setAlert(null), 5000);
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
      labelWrap="true"
      autoComplete="off"
      onFinish={register}
      onSubmit={(e) => e.preventDefault()}
    >
      <Form.Item
        style={{ fontSize: "30px", fontWeight: "700", textAlign: "center" }}
        wrapperCol={{ span: "24" }}
      >
        ĐĂNG KÝ
      </Form.Item>
      <Form.Item
        name="username"
        label="Tên đăng nhập"
        rules={[
          {
            required: true,
            message: "Vui lòng điền tên đăng nhập!",
            whitespace: true,
          },
        ]}
      >
        <Input
          value={username}
          name="username"
          onChange={onChangeRegisterForm}
        />
      </Form.Item>

      <Form.Item
        name="password"
        label="Mật khẩu"
        rules={[
          {
            required: true,
            message: "Vui lòng điền mật khẩu",
          },
        ]}
      >
        <Input.Password
          name="password"
          value={password}
          onChange={onChangeRegisterForm}
        />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        label="Xác nhận mật khẩu"
        rules={[
          {
            required: true,
            message: "Vui lòng xác nhận mật khẩu",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Xác nhận mật khẩu không đúng"));
            },
          }),
        ]}
      >
        <Input.Password
          name="confirmPassword"
          // value={confirmPassword}
          onChange={onChangeRegisterForm}
        />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            type: "email",
            message: "Vui lòng nhập đúng địa chỉ email",
          },
          {
            required: true,
            message: "Vui lòng nhập email",
          },
        ]}
      >
        <Input name="email" value={email} onChange={onChangeRegisterForm} />
      </Form.Item>

      <Form.Item
        name="fullname"
        label="Họ và tên"
        rules={[
          {
            required: true,
            message: "Vui lòng điền đầy đủ họ và tên!",
          },
        ]}
      >
        <Input
          value={fullname}
          name="fullname"
          onChange={onChangeRegisterForm}
        />
      </Form.Item>

      <Form.Item
        name="dob"
        label="Ngày sinh"
        rules={[
          {
            required: true,
            message: "Vui lòng chọn ngày sinh!",
          },
        ]}
      >
        <DatePicker
          style={{ width: "100%" }}
          locale={locale}
          format={["DD-MM-YYYY", "DD-MM-YY"]}
          value={dob}
          name="dob"
          onChange={onSelectDateForm}
        />
      </Form.Item>

      <Form.Item name="bhytId" label="Số thẻ BHYT">
        <Input value={bhytId} name="bhytId" onChange={onChangeRegisterForm} />
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
        style={{textAlign: 'center'}}
        wrapperCol={{
          span: 24,
        }}
      >
        <Button size="large" type="primary" htmlType="submit">
          Đăng ký
        </Button>
      </Form.Item>
      <Form.Item
        style={{textAlign: 'center'}}
        wrapperCol={{
          span: 24,
        }}
      >
        Đã có tài khoản? <Link style={{textDecoration: "underline", color: "var(--main)"}} to="/login">Đăng nhập</Link> ngay
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
