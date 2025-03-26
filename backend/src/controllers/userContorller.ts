import { compare, genSalt, hash } from "bcrypt";
import { Request, Response } from "express";
import validator from "validator";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import { Doctor } from "../models/Docter.js";
import { Appointment } from "../models/Appointment.js";
interface AuthRequest extends Request {
  user?: any;
}
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);

    if (!name || !email || !password) {
      res
        .status(400)
        .json({ message: "لطفا همه فیلد ها را کامل کنید", success: false });
    }
    if (!validator.isEmail(email)) {
      res
        .status(400)
        .json({ message: "ایمیل وارد شده صحیح نیست", success: false });
    }
    if (password.length < 8) {
      res.status(400).json({
        message: "رمز عبور باید حداقل 8 کاراکتر باشد",
        success: false,
      });
    }
    const salt = await genSalt(10);

    const hashedPassword = await hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new User(userData);

    const user = await newUser.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "");
    res
      .status(201)
      .json({ token, message: "کاربر با موفقیت ثبت شد", success: true });
  } catch (error) {
    console.log("Server Error in register Contoller ", error);
    res.status(500).json({ message: "Server Error " });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const findUser: any = await User.findOne({ email });

    if (!findUser) {
      res
        .status(400)
        .json({ message: "کاربری با این ایمیل یافت نشد", success: false });
      return;
    }
    console.log("Entered Password:", password);
    console.log("Stored Hashed Password:", findUser?.password);
    const isMatch = await compare(password, findUser.password);

    if (!isMatch) {
      res.status(400).json({
        message: "نام کاربری یا رمز عبور اشتباه می باشد",
        success: false,
      });
    }

    const token = jwt.sign({ id: findUser._id }, process.env.JWT_SECRET || "");
    res.status(200).json({ token, message: "ورود موفقیت آمیز", success: true });
  } catch (error) {
    console.log("Server Error in loginUser Contoller ", error);
    res.status(500).json({ message: "Server Error " });
  }
};

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.user;
    console.log(req.user);

    const findUser = await User.findById(id).select("-password");
    if (!findUser) {
      res.status(400).json({ message: "کاربری یافت نشد", success: false });
    }
    res.status(200).json({ user: findUser, success: true });
  } catch (error) {}
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.user;
    const findUser = await User.findById(id);
    if (!findUser) {
      res.status(400).json({ message: "کاربری یافت نشد", success: false });
    }

    const { name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;
    console.log(JSON.parse(address));
    console.log(req.body);

    if (!name || !phone || !address || !dob || !gender) {
      res.status(400).json({ message: "Data is Missing", success: false });
      return;
    }

    await User.findByIdAndUpdate(id, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageUrl = imageUpload.secure_url;
      await User.findByIdAndUpdate(id, { image: imageUrl });
    }
    res.status(200).json({ message: "Profile Updated", success: true });
  } catch (error) {
    console.log("Server Error in updateProfile Contoller ", error);
    res.status(500).json({ message: "Server Error " });
  }
};

export const bookAppointment = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.user;
    const { docId, slotDate, slotTime } = req.body;

    const docData = await Doctor.findById(docId).select("-password");
    console.log(docData);

    if (!docData.available) {
      res
        .status(400)
        .json({ message: "دکتر مورد نظر غیرفعال است", success: false });
    }

    let slots_booked = docData.slots_booked;

    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        res
          .status(400)
          .json({ message: "این وقت قبلا رزرو شده است", success: false });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await User.findById(id).select("-password");

    delete docData.slots_booked;

    const appointmentData = {
      userId: id,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotDate,
      slotTime,
      date: Date.now(),
    };

    const newAppointment = new Appointment(appointmentData);

    await newAppointment.save();

    await Doctor.findByIdAndUpdate(docId, { slots_booked });
    res.status(200).json({ message: "رزرو شما ثبت گردید", success: true });
  } catch (error) {
    console.log("Server Error in bookAppointment Contoller ", error);
    res.status(500).json({ message: "Server Error " });
  }
};

export const listAppointments = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.user;
    const appointments = await Appointment.find({ userId: id }).sort({
      date: -1,
    });
    res.status(200).json({ appointments, success: true });
  } catch (error) {
    console.log("Server Error in listAppointments Contoller ", error);
    res.status(500).json({ message: "Server Error " });
  }
};

export const cancelAppointment = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.user;
    const { appointmentId } = req.body;

    const findAppointment = await Appointment.findById(appointmentId);
    if (!findAppointment || findAppointment.userId != id) {
      res.status(400).json({ message: "وقت ملاقات یافت نشد", success: false });
    }

    await Appointment.findByIdAndUpdate(appointmentId, { cancelled: true });

    const {docId,slotDate,slotTime}=findAppointment

    const docData = await Doctor.findById(docId).select("-password");
    let slots_booked = docData.slots_booked;
    slots_booked[slotDate] = slots_booked[slotDate].filter((slot: any) => slot !== slotTime);
    await Doctor.findByIdAndUpdate(docId, { slots_booked });

    res.status(200).json({ message: "وقت ملاقات لغو شد", success: true });

  } catch (error) {
    console.log("Server Error in cancelAppointment Contoller ", error);
    res.status(500).json({ message: "Server Error " });
  }
};
