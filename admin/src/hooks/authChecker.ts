/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";
import { useAdminContext } from "../context/AdminContext";

const authChecker = () => {
  const { token } = useAdminContext();
  const pathname = window.location.pathname;


  useEffect(() => {
    if (token && pathname == "/login") {
      window.location.replace("/");
    }
    if (!token && pathname !== "/login") {
      window.location.replace("/login");
    }
  }, [pathname]);
};

export default authChecker;
