import React from 'react'

import { MainHeader } from '../homepage/header';
import { MainNavbar} from '../homepage/navbar';
import MainCarousel from "../homepage/slider";
import ContainerAchieve from '../homepage/containerAchieve';
import ContainerHuman from '../homepage/containerHuman';
import ContainerServices from '../homepage/containerServices';
import ContainerSymptom from '../homepage/containerSymptom';
import FooterContact from '../homepage/footerContact';
import FooterInfo from '../homepage/footerInfo';
import FooterCopyright from '../homepage/footerCopyright';

const Homepage = () => {
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
  )
}

export default Homepage