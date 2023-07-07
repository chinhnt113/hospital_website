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
            <Link to="/majority/service">
              <i className="fa-solid fa-bed-pulse"></i>
              XEM TẤT CẢ DỊCH VỤ
              <ForwardOutlined style={{fontSize:"24px"}} />
            </Link>
          </div>
        </div>
        <div className="service-show">
          <div className="service-item service66 tong-quat">
            <Link to="/"><div>KHÁM SỨC KHỎE TỔNG QUÁT</div></Link>
          </div>
          <div className="service33-col">
            <div className="service-item service33 ung-thu">
              <Link to="/"><div>TẦM SOÁT UNG THƯ</div> </Link>
            </div>
            <div className="service-item service33 te-bao-goc">
              <Link to="/"><div>CÔNG NGHỆ TẾ BÀO GỐC</div> </Link>
            </div>
          </div>
          <div className="service-item service25 vac-xin">
            <Link to="/"><div>TIÊM VACXIN</div> </Link>
          </div>
          <div className="service-item service25 covid">
            <Link to="/"><div>KHÁM HẬU COVID</div> </Link>
          </div>
          <div className="service-item service50 thai-san">
            <Link to="/post/service/dich-vu-thai-san-sinh-con-tron-goi"><div>THAI SẢN TRỌN GÓI</div> </Link>
          </div>
        </div>
      </section>
    )
}

export default ContainerServices;