import express from 'express';
import { showRegisterForm, showLogInForm, showPostDamageForm, doLogin, doRegister, doLogout} from '../controllers/authController.mjs';

const router = express.Router();

router.get("/signup",showRegisterForm)
router.get("/signin",showLogInForm)
router.get("/postdamage",showPostDamageForm)

router.post("/signin",doLogin)
router.post("/signup",doRegister)
router.get("/logout",doLogout)


export default router;