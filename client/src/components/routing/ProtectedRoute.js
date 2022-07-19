import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  if (authLoading)
    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
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

  return (
    isAuthenticated ? <Outlet/> : <Navigate to="/login" />
  );
};

export default ProtectedRoute;
