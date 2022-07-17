import { Button } from "antd";
import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Account = () => {
  const {
    authState: { isAuthenticated, user },
    logoutUser,
  } = useContext(AuthContext);

  const logout = () => logoutUser();

  return (
    <div>
        XIN CHÀO {user.username}
        <Button onClick={logout}>Đăng xuất</Button>
    </div>
    );
};

export default Account;
