import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import AdminContextProvider from "./context/AdminContext";
import DoctorContextProvider from "./context/DoctorContext";
import AppContextProvider from "./context/AppContext";
import { ToastContainer } from "react-toastify";
import AppConfigProvider from "./providers/AppConfigProvider";

const App = () => {
  return (
    <div>
      <AdminContextProvider>
        <DoctorContextProvider>
          <AppContextProvider>
            <RouterProvider router={router} />
            <AppConfigProvider />
            <ToastContainer
              position="top-center"
              limit={3}
              closeOnClick
              autoClose={3000}
            />
          </AppContextProvider>
        </DoctorContextProvider>
      </AdminContextProvider>
    </div>
  );
};

export default App;
