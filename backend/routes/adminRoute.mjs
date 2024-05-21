import express from 'express';
import { adminhome } from '../controllers/adminController.mjs';

const router = express.Router();

router.get('/adminhome', adminhome);

export default router;