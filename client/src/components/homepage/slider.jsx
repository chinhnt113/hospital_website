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
          <h3 style={contentStyle}><img style={imageStyle} src="https://www.mayoclinic.org/~/media/3203DF05B9024023A8EC7934CF2FBE37.ashx" alt=""/></h3>
        </div>
        <div>
          <h3 style={contentStyle}><img style={imageStyle} src="https://www.mayoclinic.org/~/media/3203DF05B9024023A8EC7934CF2FBE37.ashx" alt=""/></h3>
        </div>
        <div>
          <h3 style={contentStyle}><img style={imageStyle} src="https://www.mayoclinic.org/~/media/3203DF05B9024023A8EC7934CF2FBE37.ashx" alt=""/></h3>
        </div>
        <div>
          <h3 style={contentStyle}><img style={imageStyle} src="https://www.mayoclinic.org/~/media/3203DF05B9024023A8EC7934CF2FBE37.ashx" alt=""/></h3>
        </div>
      </Carousel>
    </div>
  );
};


export default MainCarousel;