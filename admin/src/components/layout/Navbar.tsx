import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAdminContext } from "../../context/AdminContext";
const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken } = useAdminContext();

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (  
    <div className="flex justify-between  items-center px-4 sm:px-10 border-b bg-white py-3">
      <div className=" flex items-center gap-2 text-xs">
        <img
          className="w-36 sm:w-40 cursor-pointer "
          src={assets.admin_logo}
          alt=""
        />
        <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
          {token ? "Admin" : "Doctor"}
        </p>
      </div>

      <button
        onClick={logout}
        className="bg-primary text-white text-sm px-10 py-2 rounded-full "
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
