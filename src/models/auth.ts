import mongoose, { Document, model, Schema } from "mongoose";

export interface IAuth extends Document {
   _id: string
   isVerified?: boolean
   otp?:string
   secret?: string
   auth_method?: 'email' | 'phone' | 'authenticator'
   is2FAenabled?:boolean
   resetPasswordToken?: string
}

const AuthShecma: Schema = new Schema({
   _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },
   isVerified:{
      type: Boolean,
      default: false,
   },
   otp:{
      type: String,
   },
   secret:{
      type: String
   },
   auth_method:{
      type: String,
      enum: ['email', 'phone', 'authenticator'],
      default: 'email',
   },
   is2FAenabled:{
      type: Boolean,
      default: false,
   },
   resetPasswordToken:{
      type: String,
      default: true,
   }

},{
   timestamps: true,
})

export const Auth = model<IAuth>('Auth', AuthShecma)