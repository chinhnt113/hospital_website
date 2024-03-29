import React from "react";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const Auth = ({ authRoute }) => {
  const {
    authState: { authLoading, isAuthenticated, user },
  } = useContext(AuthContext);

  let body;

  if (authLoading){
    body = (
      <div>
        <Spin
          indicator={
            <LoadingOutlined
              style={{
                color: 'var(--darker)',
                fontSize: 50,
              }}
              spin
            />
          }
        />
      </div>
    );
  }
  else if (isAuthenticated) return <Navigate to="/" replace="true"/>;
  else
    body = (
      <>
        {authRoute === "login" && <LoginForm />}
        {authRoute === "register" && <RegisterForm />}
      </>
    );

  return (
    <div className="auth-page">
      <div className="auth-form-wrapper">
        <div className="auth-left">
          <div className="header-logo">
            <img src={require("../assets/logo.png")} alt="logo" />
          </div>
          <div className="name-benhvien">
            <div className="name-vn">Bệnh viện Đa khoa Bách khoa</div>
            <div className="name-en">
              SCIENCE AND TECHNOLOGY MEDICAL HOSPITAL
            </div>
            <div className="name-slogan">Hãy để chúng tôi chăm sóc bạn</div>
          </div>
        </div>
        <div className="auth-right">
          {body}
        </div>
      </div>
    </div>
  );
};

export default Auth;
