import { Carousel } from 'antd';
const contentStyle = {
    height: '500px',
    color: '#fff',
    background: 'var(--dark)',
  };

const imageStyle = {
  width: '100%',
  objectFit: 'cover',
}
  
const MainCarousel = () => {
  
  return (
    <div style={{ marginTop: '160px'}}>
      <Carousel autoplay autoplaySpeed={4000}>
        <div>
          <h3 style={contentStyle}><img style={imageStyle} src="https://vinmec-prod.s3.amazonaws.com/images/vicaread/20230511_091628_118061_Banner_Web-1920x550.jpg" alt=""/></h3>
        </div>
        <div>
          <h3 style={contentStyle}><img style={imageStyle} src="https://vinmec-prod.s3.amazonaws.com/images/vicaread/20221208_155119_184319_221203_Bweb_VmDR_Ra_mat_cong_thong_tin_dien_tu-v2-1.png" alt=""/></h3>
        </div>
        <div>
          <h3 style={contentStyle}><img style={imageStyle} src="https://vinmec-prod.s3.amazonaws.com/images/vicaread/20230511_091628_118061_Banner_Web-1920x550.jpg" alt=""/></h3>
        </div>
        <div>
          <h3 style={contentStyle}><img style={imageStyle} src="https://vinmec-prod.s3.amazonaws.com/images/vicaread/20221208_155119_184319_221203_Bweb_VmDR_Ra_mat_cong_thong_tin_dien_tu-v2-1.png" alt=""/></h3>
        </div>
      </Carousel>
    </div>
  );
};


export default MainCarousel;