import React, { ChangeEvent, useState } from "react";
import { useAdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const inputStyle = "border border-[#DADADA] rounded w-full p-2 mt-1";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState<"Admin" | "Doctor">("Admin");
  const [values, setValues] = useState(initialState);
  const { setToken, backendUrl } = useAdminContext();

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (step === "Admin") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email: values.email,
          password: values.password,
        });

        if (data.success) {
          setToken(data.token);
          localStorage.setItem("token", data.token);
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-[80vh] flex items-center "
      action="
"
    >
      <div className=" flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border border-[#DADADA] rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-primary">{step}</span>Login
        </p>
        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) =>
              setValues((prev) => ({ ...prev, email: e.target.value }))
            }
            value={values.email}
            className={inputStyle}
            type="email"
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) =>
              setValues((prev) => ({ ...prev, password: e.target.value }))
            }
            value={values.password}
            className={inputStyle}
            type="password"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white w-full py-2 rounded-md text-base"
        >
          Login
        </button>
        {step === "Admin" ? (
          <p onClick={() => setStep("Doctor")}>
            Doctor Login ?{" "}
            <span className="text-primary underline cursor-pointer ">
              Click here
            </span>
          </p>
        ) : (
          <p onClick={() => setStep("Admin")}>
            Admin Login ?{" "}
            <span className="text-primary underline cursor-pointer ">
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
