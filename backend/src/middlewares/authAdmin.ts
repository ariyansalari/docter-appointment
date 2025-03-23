import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const authAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log(req.headers.authorization?.split(" ")[1]);
    
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
      res
        .status(401)
        .json({ success: false, message: "Not Authorized login admin" });
    }
    const token_decode = jwt.verify(
        token as string,
      process.env.JWT_SECRET || "qwerty123"
    );
    if (
      token_decode !==
      process.env.ADMIN_EMAIL + (process.env.ADMIN_PASSWORD || "")
    ) {
      res
        .status(401)
        .json({ success: false, message: "Not Authorized login admin" });
    }
    next();
  } catch (error) {
    console.log("Server Error in authAdmin middleware", error);
    res.status(500).json({ succes: false, message: "Server Error" });
  }
};
