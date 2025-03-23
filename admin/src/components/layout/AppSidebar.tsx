import React from "react";
import { useAdminContext } from "../../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";

const navLinkStyle = (isActive:boolean)=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F2F3FF] border-r-4 border-primary':''}`

const AppSidebar = () => {
  const { token } = useAdminContext();
  return (
    <div className="min-h-screen bg-white border-r ">
      {token && (
        <ul className="text-[#515151] mt-5">
          <NavLink to={"/admin-dashboard"} className={({isActive})=>navLinkStyle(isActive)}>
            <img src={assets.home_icon} alt="" />
            <p>Dashboard</p>
          </NavLink>
          <NavLink className={({isActive})=>navLinkStyle(isActive)} to="/all-apointments">
            <img src={assets.appointment_icon} alt="" />
            <p>Appointments</p>
          </NavLink>
          <NavLink  className={({isActive})=>navLinkStyle(isActive)}to="/add-doctor">
            <img src={assets.add_icon} alt="" />
            <p>Add Doctor</p>
          </NavLink>
          <NavLink className={({isActive})=>navLinkStyle(isActive)} to="/doctor-list">
            <img src={assets.people_icon} alt="" />
            <p>Doctors List</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default AppSidebar;
