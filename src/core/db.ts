import mongoose from 'mongoose'
import dotenv from 'dotenv'
import 'colors'
dotenv.config()
import {config} from '../config/config'

const url = config.mongoURI

export const ConnectDB = async() => {
   try {
      const connection = await mongoose.connect(url)
      console.log(`Database connected on ${connection.connection.host}`.bgGreen.white)
   } catch (error) {
      console.log(`Database not Connected `.bgRed.white, error)
      process.exit(1)
   }
}