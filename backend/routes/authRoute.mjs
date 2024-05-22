import express from 'express';
import { showRegisterForm, showLogInForm, doLogin, doRegister, doLogout} from '../controllers/authController.mjs';

const router = express.Router();

router.get("/signup",showRegisterForm)
router.get("/signin",showLogInForm)

router.post("/signin",doLogin)
router.post("/signup",doRegister)
router.get("/signout",doLogout)


export default router;