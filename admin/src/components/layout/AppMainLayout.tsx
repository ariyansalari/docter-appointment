import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSidebar";

const AppMainLayout = () => {
  return (
    <div className="bg-[#F8F9FD]">
      <Navbar />
      <div className="flex items-start ">
        <AppSidebar/>
      <Outlet />
      </div>
    </div>
  );
};

export default AppMainLayout;
