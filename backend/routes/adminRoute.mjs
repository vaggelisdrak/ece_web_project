import express from 'express';
import { adminhome, adminTechnicians , addTechnicianController } from '../controllers/adminController.mjs';
import { checkAdminAuthorized, checkAuthenticated } from '../controllers/authController.mjs';
import { home } from '../controllers/getAllDamagesController.mjs';

const router = express.Router();

router.get('/adminhome',checkAuthenticated,checkAdminAuthorized , adminhome);
router.get('/admintechnicians',checkAuthenticated,checkAdminAuthorized ,adminTechnicians);
router.post('/admintechnicians/addTechnician',checkAuthenticated,checkAdminAuthorized, addTechnicianController);

export default router;