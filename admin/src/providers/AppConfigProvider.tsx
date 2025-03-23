import React from "react";
import authChecker from "../hooks/authChecker";

const AppConfigProvider = () => {
  authChecker();
  return <></>;
};

export default AppConfigProvider;
