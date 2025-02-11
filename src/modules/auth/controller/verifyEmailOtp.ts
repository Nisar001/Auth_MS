import { generate_random_number, isValidEmail, generateOtpExpirationTime } from '../../../core/utils'
import { Auth } from '../../../models/auth'
import { Otp, OtpTypes } from '../../../models/otp'
import { send_email } from '../../../services/2fAuth'
import { Request, Response } from 'express'

export const emailVerification = async (req: Request, res: Response) => {
  try {
    const { email } = req.body
    // Validate email using Regex
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' })
    }

    const user = await Auth.findOne({ email })
    if (!user) {
      return res.status(404).json({ error: 'No user exists with the provided email' })
    }

    if (user.isEmailVerified) {
      return res
        .status(200)
        .json({ message: `Your email: ${user.email} is already verified.` })
    }
    const otpExpire = generateOtpExpirationTime();

    const code = generate_random_number(6).toString()


    const otpData = await Otp.findOne({ _user: user._id })
    if (otpData) {
      otpData.otp = code
      otpData.purpose = OtpTypes.VerifyExistingEmail
      otpData.otpExpireAt = otpExpire
      await otpData.save()
    } else {
      await Otp.create({
        otp: code,
        otpExpireAt: otpExpire,
        purpose: OtpTypes.VerifyExistingEmail,
        _user: user._id,
      })
    }

    await send_email(user.email, code)
    return res.status(200).json({
      message: 'An OTP has been sent to your email. Please verify it.',
      data: { email: user.email },
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error.message })
  }
}