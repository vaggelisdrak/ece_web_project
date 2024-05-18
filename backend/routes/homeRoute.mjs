import express from 'express';
import { home } from '../controllers/getActiveDamagesController.mjs';

const router = express.Router();

router.get('/',home);

export default router;