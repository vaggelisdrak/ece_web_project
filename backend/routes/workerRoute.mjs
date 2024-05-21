import express from 'express';
import { workerhome } from '../controllers/workerController.mjs';

const router = express.Router();

router.get('/workerhome', workerhome);

export default router;