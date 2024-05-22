import express from 'express';
import { removeDamageTicket, postDamageTicket, showAllUserDamageTickets,editDamageTicket} from '../controllers/workerController.mjs';
import multer from 'multer';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/workerhome', showAllUserDamageTickets);
router.post('/workerhome',upload.single('image') ,postDamageTicket);
router.get('/workerhome/remove/:id',removeDamageTicket);
router.post('/workerhome/update/:id',editDamageTicket);

export default router;