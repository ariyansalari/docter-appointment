/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

interface AdminContextProps {
  token: string;
  setToken: (state: string) => void;
  backendUrl: string;
  getAllDoctors: () => void;
  doctors: any[];
  changeAvailability: (id: string) => void;
}

export const AdminContext = createContext<AdminContextProps>({
  backendUrl: "",
  setToken: () => {},
  token: "",
  getAllDoctors: () => {},
  doctors: [],
  changeAvailability: () => {},
});

const AdminContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState(localStorage.getItem("token") ?? "");
  const [doctors, setDoctors] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/all-doctors", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(error?.message || "");
    }
  };

  const changeAvailability = async (id: string) => {
    try {
      const { data } = await axios.put(
        backendUrl + `/api/admin/change-avalibility/${id}`,
        {
       
        },{
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
      );
      if(data.success){
        getAllDoctors();
        toast.success(data.message);
      }else{ 
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(error?.message || "");
      console.error(error);
    }
  };

  const value = {
    token,
    setToken,
    backendUrl,
    getAllDoctors,
    doctors,
    changeAvailability,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminContextProvider;

export const useAdminContext = (): AdminContextProps => {
  return useContext(AdminContext);
};
