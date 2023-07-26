import React from "react";
import { Alert } from "antd";

const AlertMessage = ({ info, type } ) => {
  return info === null ? null :<Alert message={info.message} type={type || "error"} />;
};

export default AlertMessage;
