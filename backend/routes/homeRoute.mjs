import express from 'express';
import { test } from '../controllers/getActiveDamagesController.mjs';

const router = express.Router();

router.get('/',test);

export default router;