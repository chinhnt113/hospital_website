import React from "react";
import { Alert } from "antd";

const AlertMessage = ({ info } ) => {
  return info === null ? null :<Alert message={info.message} type="error" />;
};

export default AlertMessage;
