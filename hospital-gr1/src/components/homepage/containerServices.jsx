import { ForwardOutlined } from '@ant-design/icons';

const ContainerServices = () => {
    return (
        <section className="container-service">
        <div className="section-text">
          <div className="section-description">
            <div className="section-title">DỊCH VỤ NỔI BẬT TẠI BKHOS</div>
            <div className="section-info">
              Sở hữu trang thiết bị tối tân, hiện đại, không gian khám chữa bệnh
              văn minh, sang trọng, BKHos tự tin mang lại dịch vụ tốt nhất cũng
              như những và trải nghiệm tuyệt vời nhất đối với khách hàng.
            </div>
          </div>
          <div className="section-more">
            <a href="#">
              <i className="fa-solid fa-bed-pulse"></i>
              XEM TẤT CẢ DỊCH VỤ
              <ForwardOutlined style={{fontSize:"24px"}} />
            </a>
          </div>
        </div>
        <div className="service-show">
          <div className="service-item service66">
            <a href="#"><div>KHÁM SỨC KHỎE TỔNG QUÁT</div></a>
          </div>
          <div className="service33-col">
            <div className="service-item service33">
              <a href="#"><div>TẦM SOÁT UNG THƯ</div> </a>
            </div>
            <div className="service-item service33">
              <a href="#"><div>CÔNG NGHỆ TẾ BÀO GỐC</div> </a>
            </div>
          </div>
          <div className="service-item service25">
            <a href="#"><div>TIÊM VACXIN</div> </a>
          </div>
          <div className="service-item service25">
            <a href="#"><div>KHÁM HẬU COVID</div> </a>
          </div>
          <div className="service-item service50">
            <a href="#"><div>THAI SẢN TRỌN GÓI</div> </a>
          </div>
        </div>
      </section>
    )
}

export default ContainerServices;