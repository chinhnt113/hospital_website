import React from "react";

import MainCarousel from "../components/homepage/slider";
import ContainerAchieve from "../components/homepage/containerAchieve";
import ContainerHuman from "../components/homepage/containerHuman";
import ContainerServices from "../components/homepage/containerServices";
import ContainerSymptom from "../components/homepage/containerSymptom";
import Footer from "../components/footer";
import Header from "../components/header";

const Homepage = () => {

  return (
    <div className="App">
      <Header />
      <MainCarousel className="main-carousel" />
      <div className="container">
        <ContainerAchieve />
        <ContainerHuman className="container-human" />
        <ContainerServices className="container-services" />
        {/* <ContainerSymptom className="container-symptom" /> */}
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
