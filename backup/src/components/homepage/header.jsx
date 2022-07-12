export const MainHeader = () => {
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
          <button className="color-btn">ĐĂNG KÝ</button>
          <button className="trans-btn">ĐĂNG NHẬP</button>
        </div>
      </div>
    </div>
  );
};
