import { Auth } from '../../../models/auth'
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { isValidDate, isValidEmail } from '../../../core/utils'


export const register_user = async (req: Request, res: Response) => {
  try {
    const { username, password, email, phone, countryCode, dob, role } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const existingUser = await Auth.findOne({
      $or: [{ email: email }, { phone: phone }, { username: username }],
    })
    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ error: 'Cannot use existing email' })
      }
      if (existingUser.phone === phone) {
        return res.status(400).json({ error: 'Cannot use existing phone' })
      }
      if (existingUser.username === username) {
        return res.status(400).json({ error: 'Cannot use existing username' })
      }
    }
    // Validate DOB using moment
    if (!isValidDate(dob)) {
      return res.status(400).json({ error: 'Invalid date of birth' })
    }

    // Validate email using Regex
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' })
    }
    const user = await Auth.create({
      username,
      password: hashedPassword,
      email,
      phone,
      countryCode,
      dob,
      role,
    })
    return res.status(201).json({ user: "User Registered Successfully", _user: user._id })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error.message })
  }
}