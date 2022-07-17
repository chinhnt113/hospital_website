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
          BKHos logo/ banner dọc
        </div>
        <div className="auth-right">
          {body}
        </div>
      </div>
    </div>
  );
};

export default Auth;
