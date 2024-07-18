import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
  throw new Error('Missing required environment variables');
}

export const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || '5000',
  mongoURI: process.env.MONGO_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpire: process.env.JWT_EXPIRE,
};
