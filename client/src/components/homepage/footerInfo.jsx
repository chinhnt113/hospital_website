import { Link } from "react-router-dom";

const FooterInfo = () => {
  return (
    <section>
      <div className="footer-info">
        <div className="footer-logo">
          <img src={require("../../assets/logo.png")} alt="logo" />
        </div>
        <div className="footer-about">
          <div className="footer-title">VỀ CHÚNG TÔI</div>
          <Link to="/" className="footer-about-item">
            Hệ thống BKHos
          </Link>
          <Link to="/" className="footer-about-item">
            Đội ngũ bác sĩ
          </Link>
          <Link to="/" className="footer-about-item">
            Tin tức
          </Link>
          <Link to="/" className="footer-about-item">
            Tuyển dụng
          </Link>
          <Link to="/" className="footer-about-item">
            Sitemap
          </Link>
          <Link to="/" className="footer-about-item">
            Chính sách quyền riêng tư
          </Link>
        </div>
        <div className="footer-about">
          <div className="footer-title">DỊCH VỤ BKHOS</div>
          <Link to="/" className="footer-about-item">
            Giới thiệu
          </Link>
          <Link to="/" className="footer-about-item">
            Đăng ký khám và tư vấn
          </Link>
          <Link to="/" className="footer-about-item">
            Gói dịch vụ
          </Link>
          <Link to="/" className="footer-about-item">
            Hướng dẫn khách hàng
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FooterInfo;
