import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { API_URL } from '../../contexts/constants';

const sampleDoctors = [
  {
    fullname: "LÊ TIẾN ĐẠT",
    rank: "PSG, Tiến sĩ, Bác sĩ",
    desc: `22 năm kinh nghiệm về hóa trị và sinh học phân tử ung bướu, đặc
          biệt có thế mạnh về mảng...`,
    avaUrl:
      "https://vinmec-prod.s3.amazonaws.com/images/17_06_2021_04_27_02_349920.png",
  },
  {
    fullname: "LÊ TIẾN ĐẠT",
    rank: "PSG, Tiến sĩ, Bác sĩ",
    desc: `22 năm kinh nghiệm về hóa trị và sinh học phân tử ung bướu, đặc
          biệt có thế mạnh về mảng...`,
    avaUrl:
      "https://vinmec-prod.s3.amazonaws.com/images/17_06_2021_04_27_02_349920.png",
  },
  {
    fullname: "LÊ TIẾN ĐẠT",
    rank: "PSG, Tiến sĩ, Bác sĩ",
    desc: `22 năm kinh nghiệm về hóa trị và sinh học phân tử ung bướu, đặc
          biệt có thế mạnh về mảng...`,
    avaUrl:
      "https://vinmec-prod.s3.amazonaws.com/images/17_06_2021_04_27_02_349920.png",
  },
  {
    fullname: "LÊ TIẾN ĐẠT",
    rank: "PSG, Tiến sĩ, Bác sĩ",
    desc: `22 năm kinh nghiệm về hóa trị và sinh học phân tử ung bướu, đặc
          biệt có thế mạnh về mảng...`,
    avaUrl:
      "https://vinmec-prod.s3.amazonaws.com/images/17_06_2021_04_27_02_349920.png",
  },
];

const ContainerHuman = () => {
  const [highlightDoctors, setHighlightDoctors] = useState(sampleDoctors);

  useEffect(() => {
    const fetchHighLightDoctors = async () => {
      try {
        const response = await axios.get(`${API_URL}/doctors/highlight`);
        const { success, doctors } = response.data;
        
        if (success) {
          setHighlightDoctors(doctors);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchHighLightDoctors();
  }, []);

  return (
    <section className="container-human">
      <div className="section-text">
        <div className="section-description">
          <div className="section-title">ĐỘI NGŨ CỦA CHÚNG TÔI</div>
          <div className="section-info">
            BKHos quy tụ đội ngũ chuyên gia, bác sĩ, dược sĩ và điều dưỡng được
            đào tạo bài bản đến chuyên sâu tại Việt nam và nhiều nước có nên y
            học phát triển như Mỹ, Anh, Pháp... Luôn lấy người bệnh là trung
            tâm, BKHos cam kết mang lại dịch vụ chăm sóc sức khỏe toàn diện và
            chất lượng cao cho khách hàng.
          </div>
        </div>
        <div className="section-more">
          <Link to="/">
            <i className="fa-solid fa-user-doctor"></i>
            XEM TẤT CẢ BÁC SĨ
            <i className="fa-solid fa-arrow-right-long"></i>
          </Link>
        </div>
      </div>
      <div className="doctor-slider">
        {highlightDoctors.map((item, index) => {
          return (
            <div className="doctor-item" key={index}>
              <div className="doctor-info">
                <div className="doctor-rank">{item.rank}</div>
                <div className="doctor-name">{item.fullname}</div>
                <div className="doctor-detail">{item.desc}
                </div>
                <Link to="/" className="doctor-more">
                  Xem thêm
                </Link>
              </div>
              <div className="doctor-avatar">
                <img src={item.avaImage} alt={item.fullname}/>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ContainerHuman;
