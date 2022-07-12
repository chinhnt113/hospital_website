const ContainerAchieve = () => {
    return (
        <section class="container-achieve">
        <div class="achieve-info">
          Bệnh viện Đa khoa Bách khoa (BKHos) là một trong những bệnh viện hàng
          đầu Việt Nam. Với đội ngũ chuyên gia, cơ sở vật chất hàng đầu, chúng
          tôi luôn đặt nhu cầu và trải nghiệm của khách hàng lên hàng đầu.
        </div>
        <div class="achieve-slogan">BKHos - Hãy để chúng tôi chăm sóc bạn</div>
        <div class="rewards">
          <div class="reward-item">
            <img src={require("../../assets/1st-01.png")} alt="" />
            <div class="reward-info">
              Giải nhất cuộc thi Bệnh viện sáng tạo Việt Nam 2020
            </div>
          </div>
          <div class="reward-item">
            <img src={require("../../assets/2nd-01.png")} alt=""/>
            <div class="reward-info">
              Giải nhì Chiến dịch Xây dựng Bệnh viện xanh 2021
            </div>
          </div>
          <div class="reward-item">
            <img src={require("../../assets/3rd-01.png")} alt=""/>
            <div class="reward-info">
              TOP3 Bệnh viện có trải nghiệm dịch vụ tốt nhất
            </div>
          </div>
          <div class="reward-item">
            <div class="top1000">TOP <br />1000</div>
            <div class="reward-info">
              TOP1000 Bệnh viện tốt nhất thế giới (*)
            </div>
          </div>
        </div>
        <button class="make-appoint-btn">ĐĂNG KÝ KHÁM NGAY</button>
      </section>
    )
}

export default ContainerAchieve;