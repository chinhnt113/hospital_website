const ContainerAchieve = () => {
    return (
        <section className="container-achieve">
        <div className="achieve-info">
          Bệnh viện Đa khoa Bách khoa (BKHos) là một trong những bệnh viện hàng
          đầu Việt Nam. Với đội ngũ chuyên gia, cơ sở vật chất hàng đầu, chúng
          tôi luôn đặt nhu cầu và trải nghiệm của khách hàng lên hàng đầu.
        </div>
        <div className="achieve-slogan">BKHos - Hãy để chúng tôi chăm sóc bạn</div>
        <div className="rewards">
          <div className="reward-item">
            <img src={require("../../assets/1st-01.png")} alt="" />
            <div className="reward-info">
              Giải nhất cuộc thi Bệnh viện sáng tạo Việt Nam 2020
            </div>
          </div>
          <div className="reward-item">
            <img src={require("../../assets/2nd-01.png")} alt=""/>
            <div className="reward-info">
              Giải nhì Chiến dịch Xây dựng Bệnh viện xanh 2021
            </div>
          </div>
          <div className="reward-item">
            <img src={require("../../assets/3rd-01.png")} alt=""/>
            <div className="reward-info">
              TOP3 Bệnh viện có trải nghiệm dịch vụ tốt nhất
            </div>
          </div>
          <div className="reward-item">
            <div className="top1000">TOP <br />1000</div>
            <div className="reward-info">
              TOP1000 Bệnh viện tốt nhất thế giới (*)
            </div>
          </div>
        </div>
        <button className="make-appoint-btn">ĐĂNG KÝ KHÁM NGAY</button>
      </section>
    )
}

export default ContainerAchieve;