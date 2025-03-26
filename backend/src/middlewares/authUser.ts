import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
  user?: any;
}
export const authUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log(req.headers.authorization?.split(" ")[1],'sdf');

    const token = req.headers.authorization?.split(" ")[1];

    const token_decode = jwt.verify(
      token as string,
      process.env.JWT_SECRET || "qwerty123"
    );
    if (!token || !token_decode) {
      res
        .status(401)
        .json({ success: false, message: "Not Authorized login user" });
    }

    req.user = token_decode;
    next();
  } catch (error) {
    console.log("Server Error in authAdmin middleware", error);
    res.status(500).json({ succes: false, message: "Server Error" });
  }
};
