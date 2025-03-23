import { Request, Response } from "express";
import { Doctor } from "../models/Docter.js";

export const changeAvailabilty = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const findDoc = await Doctor.findById(id);

    if (!findDoc)
       res.json({ success: false, message: "Doctor doesn't found" });

    findDoc.available = !findDoc.available;
    await findDoc.save();

    res.status(200).json({ succes: true, message: "Availability Changed" });
  } catch (error) {
    console.log("Server Error in changeAvailabilty controller");
    res.status(500).json({ success: false, message: error.message });
  }
};
