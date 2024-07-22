import { verifyNewPhoneOtp } from './verifyPhoneOtp';
import { verifyNewEmailOtp } from './verifyEmailOtp';
import { profileUpdate } from './updateProfile';
import { twofasend } from './2FAuth';
import { updatePhone } from './updatePhone';
import { updateUserPassword } from './updatePassword';
import { updateUserEmail } from './updateEmail';
import { forgotPassword } from './forgotPassword';
import { verify_user_otp } from './verifyOtp';
import { register_user } from "./register";
import { login_user } from "./login";
import { profileDetails } from './Profile';
import { resetpassword } from './resetPassword';



export {
   register_user,
   login_user,
   verify_user_otp,
   profileDetails,
   forgotPassword,
   resetpassword,
   updateUserEmail,
   updateUserPassword,
   updatePhone,
   twofasend,
   profileUpdate,
   verifyNewEmailOtp,
   verifyNewPhoneOtp,
}
