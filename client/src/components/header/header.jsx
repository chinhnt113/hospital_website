import { Link, Navigate, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Dropdown, Menu, Modal } from "antd";
import { SettingOutlined, LogoutOutlined } from "@ant-design/icons"

export const MainHeader = () => {
  const navigate = useNavigate();
  const {
    authState: { isAuthenticated, user },
    logoutUser,
  } = useContext(AuthContext);

  const logout = () => logoutUser();

  // logout popup modal
  const [isModalVisible, setModalVisible] = useState(false);
  const showModal = () => {
    setModalVisible(true);
  };
  const handleCancel = () => {
    setModalVisible(false);
  };
  const handleOk = () => {
    logout();
  };

  // user hover menu
  const userMenuStyle = {
    marginTop: "20px",
    height: "100px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  };

  const userMenuItemStyle = {
    flex: "1",
    height: "50%",
    backgroundColor: "transparent",
    fontWeight: "600",
  };

  const userMenu = (
    <Menu style={userMenuStyle}>
      <Menu.Item className="user-menu-item" style={userMenuItemStyle} key="1">
        <Link to="/account"><SettingOutlined style={{marginRight:"8px", fontSize:"18px"}} /> Tài khoản</Link>
      </Menu.Item>
      <Menu.Item className="user-menu-item" style={userMenuItemStyle} key="2">
        <button style={{ backgroundColor: "transparent" }} onClick={showModal}>
        <LogoutOutlined style={{marginRight:"8px", fontSize:"18px"}} /> Đăng xuất
        </button>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="header-container">
      <div className="header">
        <div className="header-left" onClick={() => {navigate("/")}}>
          <div className="header-logo">
            <img src={require("../../assets/logo.png")} alt="logo" />
          </div>
          <div className="name-benhvien">
            <div className="name-vn">Bệnh viện Đa khoa Bách khoa</div>
            <div className="name-en">
              SCIENCE AND TECHNOLOGY MEDICAL HOSPITAL
            </div>
            <div className="name-slogan">Hãy để chúng tôi chăm sóc bạn</div>
          </div>
        </div>
        <div className="header-right">
          <button className="trans-btn">LIÊN HỆ TƯ VẤN</button>
          <button className="trans-btn">ĐẶT LỊCH KHÁM</button>
          {!isAuthenticated ? (
            <>
              <button className="color-btn">
                <Link to="/register">ĐĂNG KÝ</Link>
              </button>
              <button className="trans-btn">
                <Link to="/login">ĐĂNG NHẬP</Link>
              </button>
            </>
          ) : (
            <>
              <Dropdown overlay={userMenu}>
                <Link to="/account" className="" type="text"
                  style={{ fontWeight: "600", marginLeft: "16px" }}
                  onClick={(e) => e.preventDefault()}
                >
                  XIN CHÀO {user.username}
                </Link>
              </Dropdown>
              <Modal
                title="BẠN CÓ CHẮC MUỐN ĐĂNG XUẤT?"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="ĐĂNG XUẤT"
                cancelText="QUAY LẠI"
                centered
                width={400}
              ></Modal>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
