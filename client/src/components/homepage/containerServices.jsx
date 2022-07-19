import { ForwardOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'

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
            <Link to="/">
              <i className="fa-solid fa-bed-pulse"></i>
              XEM TẤT CẢ DỊCH VỤ
              <ForwardOutlined style={{fontSize:"24px"}} />
            </Link>
          </div>
        </div>
        <div className="service-show">
          <div className="service-item service66">
            <Link to="/"><div>KHÁM SỨC KHỎE TỔNG QUÁT</div></Link>
          </div>
          <div className="service33-col">
            <div className="service-item service33">
              <Link to="/"><div>TẦM SOÁT UNG THƯ</div> </Link>
            </div>
            <div className="service-item service33">
              <Link to="/"><div>CÔNG NGHỆ TẾ BÀO GỐC</div> </Link>
            </div>
          </div>
          <div className="service-item service25">
            <Link to="/"><div>TIÊM VACXIN</div> </Link>
          </div>
          <div className="service-item service25">
            <Link to="/"><div>KHÁM HẬU COVID</div> </Link>
          </div>
          <div className="service-item service50">
            <Link to="/"><div>THAI SẢN TRỌN GÓI</div> </Link>
          </div>
        </div>
      </section>
    )
}

export default ContainerServices;