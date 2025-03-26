import { Request, Response } from "express";
import { Doctor } from "../models/Docter.js";

export const changeAvailabilty = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const findDoc = await Doctor.findById(id);

    if (!findDoc) res.json({ success: false, message: "Doctor doesn't found" });

    findDoc.available = !findDoc.available;
    await findDoc.save();

    res
      .status(200)
      .json({ success: true, message: "وضعیت با موفقیت تغییر کرد" });
  } catch (error) {
    console.log("Server Error in changeAvailabilty controller", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const doctorList = async (req: Request, res: Response) => {
  try {
    const doctors = await Doctor.find({}).select(["-password", "-email"]);

    res.status(200).json({ success: true, doctors });
  } catch (error) {
    console.log("Server Error in doctorList controller", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
