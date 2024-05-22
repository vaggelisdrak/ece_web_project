import express from 'express';
import { adminhome, adminTechnicians , addTechnicianController } from '../controllers/adminController.mjs';

const router = express.Router();

router.get('/adminhome', adminhome);
router.get('/admintechnicians', adminTechnicians);
router.post('/admintechnicians/addTechnician', addTechnicianController);

export default router;