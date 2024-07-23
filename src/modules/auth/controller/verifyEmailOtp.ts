import { Otp } from "../../../models/otp";
import { Auth } from "../../../models/auth";
import { Request, Response } from "express";

export const verifyNewEmailOtp = async (req: Request, res: Response) => {
  try {
    const { _id } = req.user;
    const { email, otp } = req.body;
    const user = await Auth.findById(_id);
    const OTP = await Otp.findOne({ _user: user._id })

    if (OTP.otpCode === otp && user.temp_email === email) {
      user.email = email;
      OTP.otpCode = null;
      user.temp_email = undefined;
      await user.save();
      await OTP.save();
      return res.status(200).json({
        message: "Your email has been updated..",
        data: { item: user.email },
      });
    }
    return res
      .status(400)
      .json({
        error: "Invalid OTP or email, please provide correct credentials.",
      });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};
