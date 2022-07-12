const FooterInfo = () => {
  return (
    <section>
      <div className="footer-info">
        <div className="footer-logo">
          <img src={require("../../assets/logo.png")} alt="logo" />
        </div>
        <div className="footer-about">
          <div className="footer-title">VỀ CHÚNG TÔI</div>
          <a href="#" className="footer-about-item">
            Hệ thống BKHos
          </a>
          <a href="#" className="footer-about-item">
            Đội ngũ bác sĩ
          </a>
          <a href="#" className="footer-about-item">
            Tin tức
          </a>
          <a href="#" className="footer-about-item">
            Tuyển dụng
          </a>
          <a href="#" className="footer-about-item">
            Sitemap
          </a>
          <a href="#" className="footer-about-item">
            Chính sách quyền riêng tư
          </a>
        </div>
        <div className="footer-about">
          <div className="footer-title">DỊCH VỤ BKHOS</div>
          <a href="#" className="footer-about-item">
            Giới thiệu
          </a>
          <a href="#" className="footer-about-item">
            Đăng ký khám và tư vấn
          </a>
          <a href="#" className="footer-about-item">
            Gói dịch vụ
          </a>
          <a href="#" className="footer-about-item">
            Hướng dẫn khách hàng
          </a>
        </div>
      </div>
    </section>
  );
};

export default FooterInfo;
