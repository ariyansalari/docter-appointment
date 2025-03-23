import validator from "validator";
import { genSalt, hash } from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Doctor } from "../models/Docter.js";

export const addDoctor = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;

    const imageFile = req.file;

    if (
      !name ||
      !email ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      res.status(400).json({ success: false, message: "Missing Details" });
    }
    if (!validator.isEmail(email)) {
      res
        .status(400)
        .json({ success: false, message: "Please enter a valid email" });
    }
    if (password.length < 8) {
      res
        .status(400)
        .json({ success: false, message: "Please enter a strong password" });
    }

    const salt = await genSalt(10);
    const hashPassword = await hash(password, salt);

    //  upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(
      imageFile?.path || "",
      {
        resource_type: "image",
      }
    );

    const imageUrl = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    };

    const newDoctor = new Doctor(doctorData);
    await newDoctor.save();

    res.json({ success: true, message: "Doctor Added" });
  } catch (error) {
    console.log("Server error in addDoctor controller", error);

    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        email + password,
        process.env.JWT_SECRET || "greenasdf"
      );

      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Server Error in loginAdmin controller", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const allDoctors = async (req: Request, res: Response) => {
  try {
    const doctors = await Doctor.find({}).select('-password')

    res.status(200).json({success:true,doctors})
  } catch (error) {
    console.log("Server Error in all Doctors contoller");
    res.status(500).json({ message: "Server Error" });
  }
};


