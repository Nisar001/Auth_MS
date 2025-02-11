import { Router } from 'express'
import {
   login_user,
   register_user,
   verify_user_otp,
   profileDetails,
   forgotPassword,
   resetpassword,
   updateUserEmail,
   updateUserPassword,
   updatePhone,
   twofasend,
   profileUpdate,
   emailVerification,
   phoneVerification,
   changeTwoFA,
   toggleTwoFA,
} from '../controller/index'
import { verify_token } from '../../../middlewares/verifyJWT'

const router = Router()

router.post('/register', register_user)
router.post('/login', login_user)
router.post('/verify-otp', verify_user_otp)
router.post('/send-otp', twofasend)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetpassword)
router.post('/verify/email', emailVerification)
router.post('/verify/phone', phoneVerification)


//secure routes
router.use(verify_token)
router.get('/profile', profileDetails)
router.patch('/update-email', updateUserEmail)
router.patch('/update-password', updateUserPassword)
router.patch('/update-phone', updatePhone)
router.patch('/update-profile', profileUpdate)
router.patch('/toggle-two-fa', toggleTwoFA)
router.patch('/change-two-fa', changeTwoFA)



export default router