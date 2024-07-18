import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const jwt_secret = process.env.JWT_SECRET 

export interface IPayload{
    _id:string
}

export const generate_token = (payload:IPayload): string => {
   
    const token = jwt.sign(
		{
			_id: payload,
		},
		jwt_secret.toString(),
		{ expiresIn: process.env.JWT_EXPIRE }
	)

    return token
}