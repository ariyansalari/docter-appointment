import validator from "validator";
import { genSalt, hash } from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import { Doctor } from "../models/Docter.js";
export const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address, } = req.body;
        const imageFile = req.file;
        if (!name ||
            !email ||
            !speciality ||
            !degree ||
            !experience ||
            !about ||
            !fees ||
            !address) {
            return res
                .status(400)
                .json({ success: false, message: "Missing Details" });
        }
        if (!validator.isEmail(email)) {
            return res
                .status(400)
                .json({ success: false, message: "Please enter a valid email" });
        }
        if (password.length < 8) {
            return res
                .status(400)
                .json({ success: false, message: "Please enter a strong password" });
        }
        const salt = await genSalt(10);
        const hashPassword = await hash(password, salt);
        //  upload image to cludinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
            resource_type: "image",
        });
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
