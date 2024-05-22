import { getAllTechnicians , addTechnician, getAllDamageTickets, getDamageTicket, assignDamageTicket} from "../postgresql/model.mjs";

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

export let assignDamageTickettoTechnician = async (req, res) => {
    try {
        const { technicians,cost } = req.body;
        const damageTicketId = req.params.id;
        console.log('Technician:', technicians);
        console.log('Damage Ticket ID:', damageTicketId);
        for (let technician of technicians) {
            await assignDamageTicket(req.session.loggedUserId, damageTicketId, technician, cost);
        }
        res.redirect(`/adminassigndamageticket/${damageTicketId}`);
    } catch (error) {
        throw error;
    }
}

export let showDamageTicket = async (req, res) => {
    try {
        const damageTicket = await getDamageTicket(req.params.id);
        const technicians = await getAllTechnicians();
        req.session.isAdmin = true;
        res.render('assigndamageticket', { damageTicket, isAdmin: req.session.isAdmin, technicians});
    } catch (error) {
        throw error;
    }
}