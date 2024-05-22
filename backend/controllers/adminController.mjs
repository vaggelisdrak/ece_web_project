import { getAllTechnicians , addTechnician, getAllDamageTickets} from "../postgresql/model.mjs";

export const adminhome = async (req,res) =>{
    try {
       const damageTickets = await getAllDamageTickets();
       req.session.isAdmin = true;
       res.render('adminhome', { damageTickets, isAdmin: req.session.isAdmin});
    } catch (error) {
       throw error;
    }
 };


export let adminTechnicians = async (req, res) => {
    try {
        const technicians = await getAllTechnicians();
        console.log("technicians",technicians);
        res.render('admintechnicians', { technicians });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

export let addTechnicianController = async (req, res) => {
    try {
        await addTechnician(req.body);
        console.log("Technician added successfully");
        res.redirect('/admintechnicians'); 
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};