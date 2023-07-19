import React from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import DoctorsList from "../components/doctors/DoctorsList";

const Doctors = () => {
  return (
    <React.Fragment>
      <Header />
      <section style={{ marginTop: "160px" }}>
        <DoctorsList />
      </section>
      <Footer />
    </React.Fragment>
  );
};

export default Doctors;
