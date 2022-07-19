import { Link } from "react-router-dom";

const ContainerSymptom = () => {
  return (
    <section className="container-symptom">
      <div>
        <div className="symptom">
          <div className="section-title">TÌM KIẾM CÁC LOẠI BỆNH</div>
          <div className="section-info">
            Tìm kiếm thông tin về bệnh hoặc tình trạng bệnh tật.
          </div>
          <form className="diseases-form" action="">
            <input
              type="text"
              name=""
              id="disease-search"
              placeholder="Tìm kiếm bệnh..."
            />
            <button className="disease-search-btn">
              <i className="fa-solid fa-magnifying-glass-arrow-right"></i>
            </button>
          </form>
          <div className="sympton-more">
            <Link to="/">
              <i className="fa-solid fa-disease"></i>
              XEM TẤT CẢ CÁC BỆNH
              <i className="fa-solid fa-arrow-right-long"></i>
            </Link>
          </div>
        </div>
        <div className="symptom">
          <div className="section-title">TRA CỨU TRIỆU CHỨNG</div>
          <div className="section-info">
            Tra cứu triệu chứng của bạn để dự đoán các khả năng bệnh.
          </div>
          <div className="sympton-more">
            <Link to="/">
              <i className="fa-solid fa-disease"></i>
              TRA CỨU TRIỆU CHỨNG
              <i className="fa-solid fa-arrow-right-long"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContainerSymptom;
