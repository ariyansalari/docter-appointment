import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import AppMainLayout from "../components/layout/AppMainLayout";
import Dashboard from "../pages/Admin/Dashboard";
import AllApointment from "../pages/Admin/AllApointment";
import AddDoctor from "../pages/Doctor/AddDoctor";
import DoctorsList from "../pages/Admin/DoctorsList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppMainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/admin-dashboard",
        element: <Dashboard />,
      },
      {
        path: "/all-apointments",
        element: <AllApointment />,
      },
      {
        path: "/add-doctor",
        element: <AddDoctor />,
      },
      {
        path: "/doctor-list",
        element: <DoctorsList />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
