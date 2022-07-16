import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export const MainHeader = () => {
  const {
    authState: {
      isAuthenticated,
      user,
    },
    logoutUser,
  } = useContext(AuthContext);

  const logout = () => logoutUser()

  return (
    <div className="header-container">
      <div className="header">
        <div className="header-left">
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
              <div>XIN CHÀO {user.username}</div>
              <button className="trans-btn" onClick={logout}>
                ĐĂNG XUẤT
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
