import React from 'react'
import { MainHeader } from "./header";
import { MainNavbar } from "./navbar";

const index = () => {
  return (
    <div className="header-container">
      <MainHeader />
      <MainNavbar />
    </div>
  )
}

export default index