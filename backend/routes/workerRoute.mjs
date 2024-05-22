import express from 'express';
import { removeDamageTicket, postDamageTicket, showAllUserDamageTickets,editDamageTicket} from '../controllers/workerController.mjs';
import multer from 'multer';
import { checkAuthenticated } from '../controllers/authController.mjs';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.get('/workerhome',checkAuthenticated ,showAllUserDamageTickets);
router.post('/workerhome',checkAuthenticated, upload.single('image') ,postDamageTicket);
router.get('/workerhome/remove/:id',checkAuthenticated, removeDamageTicket);
router.post('/workerhome/update/:id',checkAuthenticated, upload.single('image') ,editDamageTicket);

export default router;