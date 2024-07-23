import mongoose, { Document, Schema, model } from "mongoose";

export interface IOtp extends Document {
   _user: string;
   otpCode: string;
}

const otpScema: Schema = new Schema({
   _user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
   },
   otpCode: {
      type: String,
   },
},
   {
      timestamps: true,
      versionKey: false,
   },)

export const Otp = model<IOtp>("otp", otpScema);
