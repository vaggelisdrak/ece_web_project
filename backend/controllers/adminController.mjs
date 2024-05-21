import { getAllTechnicians } from "../postgresql/model.mjs";

export const adminhome = (req, res) => {
    res.render('adminhome');
}

export let adminTechnicians = async (req, res) => {
    try {
        const technicians = await getAllTechnicians();
        console.log("technicians",technicians);
        res.render('admintechnicians', { technicians });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}