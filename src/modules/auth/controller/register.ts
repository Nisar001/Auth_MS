import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { Auth } from "../../../models/auth";

export const register_user = async (req: Request, res: Response) => {
  try {
    const { username, password, email, phone, address, dob } = req.body;
    if (!username) {
      return res.send({ message: "Name is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    if (!dob) {
      return res.send({ message: "DOB is Required" });
    }
    const userExist = await Auth.findOne({ email });
    if (userExist) {
      return res.send({ message: "User Already Registered, Please Login" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Auth.create({
      username,
      password: hashedPassword,
      email,
      phone,
      address,
      dob,
    });
    return res
      .status(201)
      .json({ _user: user._id, message: "User Registered Successfully" });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};
