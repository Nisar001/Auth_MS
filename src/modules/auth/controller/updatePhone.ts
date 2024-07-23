import { Otp } from "../../../models/otp";
import { generate_random_number } from "../../../core/utils";
import { Auth } from "../../../models/auth";
import { send_sms } from "../../../services/2fAuth";
import { Request, Response } from "express";



export const updatePhone = async (req: Request, res: Response) => {
   try {
      const { _id } = req.user
      const { newPhone } = req.body
      const user = await Auth.findById(_id)
      const OTP = await Otp.findOne({ _user: user._id })
      if (!user) {
         return res.status(400).json({ error: 'Login first..' })
      }
      if (user.phone === newPhone) {
         return res
            .status(400)
            .json({ error: 'Existing phone and entered phone cannot be same.' })
      }
      const otp = generate_random_number(6).toString()
      const checkUser = await Otp.findOne({ _user: user._id })
      if (checkUser) {
         checkUser.otpCode = otp
         await checkUser.save()
      } else {
         await Otp.create({
            otpCode: otp,
            _user: user._id
         })
      }
      user.temp_phone = newPhone
      await user.save()
      await send_sms(newPhone, otp)
      return res.status(200).json({ message: 'An otp has been sent to your phone. Please verify first..', data: { new_phone: newPhone, _user: user._id } })
   } catch (error) {
      console.log(error)
      res.status(500).json({ error: error.message })
   }
}