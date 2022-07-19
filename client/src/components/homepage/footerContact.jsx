const FooterContact = () => {
  return (
    <section>
      <div className="footer-contact">
        <div className="footer-social">
          <div className="footer-title">LIÊN HỆ</div>
          <div className="footer-social-item">
            <div className="footer-social-item-name">Địa chỉ</div>
            Số 999 Tạ Quang Bửu, phường Bách Khoa, quận Hai Bà Trưng, Hà Nội
          </div>
          <div className="footer-social-item">
            <div className="footer-social-item-name">Điện thoại</div>
            <a href="tel:02423456789">(024) 234 56789</a>
          </div>
          <div className="footer-social-item">
            <div className="footer-social-item-name">Email</div>
            <a href="mailto:customer@bkhos.vn">customer@bkhos.vn</a>
          </div>
          <div className="footer-social-item">
            <a href="facebook.com">
              <i className="fa-brands fa-facebook-square"></i>
            </a>
            <a href="twitter.com">
              <i className="fa-brands fa-twitter-square"></i>
            </a>
            <a href="instagram.com">
              <i className="fa-brands fa-instagram-square"></i>
            </a>
          </div>
        </div>
        <div className="footer-map">
          <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3724.679196887308!2d105.8415803166049!3d21.005492866886645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1654514039190!5m2!1sen!2s"
              width="100%"
              height="500"
              style={{border: 0}}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
      </div>
    </section>
  );
};

export default FooterContact;
