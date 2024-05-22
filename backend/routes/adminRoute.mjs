import express from 'express';
import { adminhome, adminTechnicians , addTechnicianController, showDamageTicket, assignDamageTickettoTechnician, editDamageStatus, removeDamageTicket } from '../controllers/adminController.mjs';
import { checkAdminAuthorized, checkAuthenticated } from '../controllers/authController.mjs';

const router = express.Router();

router.get('/adminhome',checkAuthenticated,checkAdminAuthorized , adminhome);
router.get('/admintechnicians',checkAuthenticated,checkAdminAuthorized ,adminTechnicians);
router.post('/admintechnicians/addTechnician',checkAuthenticated,checkAdminAuthorized, addTechnicianController);
router.get('/adminassigndamageticket/:id',checkAuthenticated,checkAdminAuthorized, showDamageTicket);
router.post('/adminassigndamageticket/:id',checkAuthenticated,checkAdminAuthorized, assignDamageTickettoTechnician);
router.post('/adminhome/update/:id', checkAuthenticated, checkAdminAuthorized, editDamageStatus);
router.get('/adminhome/remove/:id',checkAuthenticated, checkAdminAuthorized, removeDamageTicket);

export default router;