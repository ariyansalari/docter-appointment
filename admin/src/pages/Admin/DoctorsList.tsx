import React, { useEffect } from "react";
import { useAdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { getAllDoctors, doctors, token, changeAvailability } =
    useAdminContext();

  useEffect(() => {
    if (token) {
      getAllDoctors();
    }
  }, [token]);

  console.log(doctors);

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">All Doctors</h1>

      <div className="flex w-full flex-wrap gap-4 pt-5 gap-y-6">
        {doctors?.map((doctorItem, index) => (
          <div
            className="border border-indigo-200 rounded-xl  max-w-56 overflow-hidden cursor-pointer group"
            key={index}
          >
            <img
              className="bg-indigo-50  group-hover:bg-primary transition-all duration-500"
              src={doctorItem?.image}
              alt=""
            />
            <div className="p-4 ">
              <p className="text-neutral-800 text-lg font-medium">
                {doctorItem?.name}
              </p>
              <p className="text-zinc-600 text-sm">{doctorItem?.speciality}</p>
              <div className="mt-2 flex items-center  gap-1 text-sm">
                <input
                  onChange={() => changeAvailability(doctorItem?._id)}
                  type="checkbox"
                  checked={doctorItem?.available}
                />
                <p>Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
