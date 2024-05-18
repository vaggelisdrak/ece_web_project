import express from 'express';
import { signin, signout, signup } from '../controllers/authController.mjs';

const router = express.Router();

router.get("/signup",signup)//post
router.get("/signin",signin)//post
router.get("/signout",signout)

export default router;