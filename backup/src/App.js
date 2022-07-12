import './components/homepage/index.css';
import './App.css';
import { MainHeader } from './components/homepage/header';
import { MainNavbar} from './components/homepage/navbar';
import MainCarousel from "./components/homepage/slider";
import ContainerAchieve from './components/homepage/containerAchieve';
import ContainerHuman from './components/homepage/containerHuman';
import ContainerServices from './components/homepage/containerServices';
import ContainerSymptom from './components/homepage/containerSymptom';
import FooterContact from './components/homepage/footerContact';
import FooterInfo from './components/homepage/footerInfo';
import FooterCopyright from './components/homepage/footerCopyright';

function App() {
  return (
    <div className="App">
      <MainHeader />
      <MainNavbar />
      <MainCarousel className='main-carousel'/>
      <div className='container'>
        <ContainerAchieve/>
        <ContainerHuman className='container-human'/>
        <ContainerServices className='container-services'/>
        <ContainerSymptom className='container-symptom'/>
      </div>
      <div className='footer'>
        <FooterInfo/>
        <FooterContact/>
        <FooterCopyright/>
      </div>
    </div>
  );
}

export default App;
