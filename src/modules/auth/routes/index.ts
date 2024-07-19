import express from "express";
import { 
   login_user, 
   register_user, 
   verify_user_otp
} from '@modules/auth/controller'
import { verify_token } from "@middlewares/verigyJwt";

const router = express.Router();

// Public Routes
router.post("/register", register_user);
router.post("/login", login_user);
router.post('/verify-otp', verify_user_otp)

// Private and secure routes
router.use(verify_token)

export default router;
