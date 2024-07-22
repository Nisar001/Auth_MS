import { Request, Response } from "express";
import { Auth } from "../../../models/auth";


export const profileDetails = async (req: Request, res: Response) => {
	try {
		const { _id } = req.user;
		const user = await Auth.findById(_id).select('-password -resetPasswordToken')
		if (!user) {
			return res.status(400).json({ error: 'You are not authenticated to access this info..' })
		}
		return res.status(200).json({ data: user })
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
}