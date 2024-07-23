import { Otp } from "../../../models/otp";
import { Auth } from "../../../models/auth";
import { Request, Response } from "express";
import { isNull } from "lodash";

export const verifyNewPhoneOtp = async (req: Request, res: Response) => {
  try {
    const { _id } = req.user;
    const { phone, otp } = req.body;
    const user = await Auth.findById(_id);
    const OTP = await Otp.findOne({ _user: user._id })
    if (OTP.otpCode === otp && user.temp_phone === phone) {
      user.phone = phone;
      OTP.otpCode = null;
      user.temp_phone = undefined;
      await user.save();
      await OTP.save();
      return res.status(200).json({
        message: "Your phone number has been updated..",
        data: { item: user.phone },
      });
    }
    return res
      .status(400)
      .json({
        error: "Invalid OTP or phone, please provide correct credentials.",
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};
