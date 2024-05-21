import express from 'express';
import { adminhome, adminTechnicians } from '../controllers/adminController.mjs';

const router = express.Router();

router.get('/adminhome', adminhome);
router.get('/admintechnicians', adminTechnicians);

export default router;