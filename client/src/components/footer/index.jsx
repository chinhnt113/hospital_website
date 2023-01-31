import React from 'react'
import FooterContact from "./footerContact";
import FooterInfo from "./footerInfo";
import FooterCopyright from "./footerCopyright";

const index = () => {
  return (
    <div className="footer">
      <FooterInfo />
      <FooterContact />
      <FooterCopyright />
    </div>
  )
}

export default index