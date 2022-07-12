const ContainerSymptom = () => {
    return (
        <section class="container-symptom">
        <div>
          <div class="symptom">
            <div class="section-title">TÌM KIẾM CÁC LOẠI BỆNH</div>
            <div class="section-info">
              Tìm kiếm thông tin về bệnh hoặc tình trạng bệnh tật.
            </div>
            <form class="diseases-form" action="">
              <input
                type="text"
                name=""
                id="disease-search"
                placeholder="Tìm kiếm bệnh..."
              />
              <button class="disease-search-btn">
                <i class="fa-solid fa-magnifying-glass-arrow-right"></i>
              </button>
            </form>
            <div class="sympton-more">
              <a href="#">
                <i class="fa-solid fa-disease"></i>
                XEM TẤT CẢ CÁC BỆNH
                <i class="fa-solid fa-arrow-right-long"></i>
              </a>
            </div>
          </div>
          <div class="symptom">
            <div class="section-title">TRA CỨU TRIỆU CHỨNG</div>
            <div class="section-info">
              Tra cứu triệu chứng của bạn để dự đoán các khả năng bệnh.
            </div>
            <div class="sympton-more">
              <a href="#">
                <i class="fa-solid fa-disease"></i>
                TRA CỨU TRIỆU CHỨNG
                <i class="fa-solid fa-arrow-right-long"></i>
              </a>
            </div>
          </div>
        </div>
      </section>
    )
}

export default ContainerSymptom;