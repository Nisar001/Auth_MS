import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { Auth } from "../../../models/auth";

export const login_user = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.send({ message: "Enter the Email" });
    }

    if (!password) {
      return res.send({ message: "Enter the Password" });
    }

    const user = await Auth.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User Not Found " });
    }
    const valid_password = await bcrypt.compare(password, user.password);
    if (!valid_password) {
      return res.status(400).json({ error: "Invalid credentials!" });
    }
    return res.status(200).json({ _user: user._id });
  } catch (error) {
    return res.status(401).json({ message: error });
  }
};
