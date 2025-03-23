/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useState } from "react";
import { assets } from "../../assets/assets";
import { useAdminContext } from "../../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  docImg: false,
  name: "",
  email: "",
  password: "",
  experience: "1 Year",
  fees: "",
  about: "",
  speciality: "General physician",
  degree: "",
  lin1: "",
  lin2: "",
};

const parentInputStyle = "w-full lg:flex-1 flex flex-col gap-2 ";
const inputStyle = "border rounded px-3 py-2";

const AddDoctor = () => {
  const { backendUrl, token } = useAdminContext();

  const [values, setValues] = useState(initialState);

  // ANCHOR : Functions
  const handleChange = ({ name, value }: { name: string; value: any }) => {
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!values.docImg) {
        return toast.error("Image not selected");
      }
      const formData = new FormData();
      formData.append("image", values.docImg as any);
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("experience", values.experience);
      formData.append("fees", values.fees);
      formData.append("about", values.about);
      formData.append("speciality", values.speciality);
      formData.append("degree", values.degree);
      formData.append(
        "address",
        JSON.stringify({ lin1: values.lin1, lin2: values.lin2 })
      );
      formData.forEach((value, key) => {
        console.log(`${key} : ${value}`);
      });

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        setValues(initialState);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} action="" className="m-5 w-full ">
      <p className="mb-3 text-lg font-medium ">Add Doctor</p>
      <div className="bg-white px-8 py-8 border rounded w-ful max-w-4xl max-h-[80vh] overflow-y-scroll ">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-image">
            <img
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={
                values?.docImg
                  ? URL.createObjectURL(values.docImg as any)
                  : assets.upload_area
              }
              alt=""
            />
          </label>
          <input
            onChange={(e) =>
              handleChange({ name: "docImg", value: e.target.files?.[0] })
            }
            hidden
            type="file"
            id="doc-image"
          />
          <p>
            Upload doctor <br /> picture
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col ">
            <div className={parentInputStyle}>
              <p>Doctor name</p>
              <input
                onChange={(e) =>
                  handleChange({ name: "name", value: e.target.value })
                }
                className={inputStyle}
                type="text"
                placeholder="name"
                required
                value={values.name}
              />
            </div>

            <div className={parentInputStyle}>
              <p>Doctor Email</p>
              <input
                onChange={(e) =>
                  handleChange({ name: "email", value: e.target.value })
                }
                className={inputStyle}
                value={values.email}
                type="email"
                placeholder="Email"
                required
              />
            </div>

            <div className={parentInputStyle}>
              <p>Doctor Password</p>
              <input
                onChange={(e) =>
                  handleChange({ name: "password", value: e.target.value })
                }
                className={inputStyle}
                value={values.password}
                type="password"
                placeholder="Password"
                required
              />
            </div>

            <div className={parentInputStyle}>
              <p>Experience</p>
              <select
                value={values.experience}
                onChange={(e) =>
                  handleChange({ name: "experience", value: e.target.value })
                }
                className={inputStyle}
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>

            <div className={parentInputStyle}>
              <p>Fees </p>
              <input
                value={values.fees}
                onChange={(e) =>
                  handleChange({ name: "fees", value: e.target.value })
                }
                className={inputStyle}
                type="number"
                placeholder="fees"
                required
              />
            </div>
          </div>

          <div className="w-full lg:flex-1 flex-col gap-4">
            <div className={parentInputStyle}>
              <p>Speciality</p>
              <select
                value={values.speciality}
                onChange={(e) =>
                  handleChange({ name: "speciality", value: e.target.value })
                }
                className={inputStyle}
                name=""
                id=""
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div className={parentInputStyle}>
              <p>Education </p>
              <input
                value={values.degree}
                onChange={(e) =>
                  handleChange({ name: "degree", value: e.target.value })
                }
                className={inputStyle}
                type="text"
                placeholder="Education"
                required
              />
            </div>
            <div className={parentInputStyle}>
              <p>Address </p>
              <input
                value={values.lin1}
                onChange={(e) =>
                  handleChange({ name: "lin1", value: e.target.value })
                }
                className={inputStyle}
                type="text"
                placeholder="address 1"
                required
              />
              <input
                value={values.lin2}
                onChange={(e) =>
                  handleChange({ name: "lin2", value: e.target.value })
                }
                className={inputStyle}
                type="text"
                placeholder="address 2"
                required
              />
            </div>
          </div>
        </div>
        <div>
          <p className="mt-4 mb-2 ">About Doctor</p>
          <textarea
            value={values.about}
            onChange={(e) =>
              handleChange({ name: "about", value: e.target.value })
            }
            className="w-full px-4 pt-2 border rounded"
            placeholder="write about doctor "
            rows={5}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-primary px-10 py-3 text-white rounded-full"
        >
          Add doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
