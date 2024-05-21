import express from 'express';
import { adminhome, adminTechnicians } from '../controllers/adminController.mjs';
import { getAllTechnicians } from '../postgresql/model.mjs';

const router = express.Router();

router.get('/adminhome', adminhome);
router.get('/admintechnicians', adminTechnicians);

router.get('/technicians', async (req, res) => {
    try {
        const technicians = await getAllTechnicians();
        res.render('admintechnicians', { technicians });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

export default router;