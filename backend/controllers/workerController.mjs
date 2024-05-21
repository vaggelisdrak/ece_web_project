import { addDamageTicket, getAllUserDamageTickets } from "../postgresql/model.mjs";

export const workerhome = (req, res) => {
    res.render('workerhome');
}

export const showPostDamageForm = (req, res) => {
    res.render('damagepost');
}

export const showAllUserDamageTickets = async (req, res) => {
    try {
        const userDamageTickets = await getAllUserDamageTickets(req.params.id);
        res.render('userdamagetickets', { userDamageTickets });
    } catch (error) {
        
    }
}

export const postDamageTicket = async (req, res) => {
    try {
        const { location, image, category, description } = req.body;
        const newDamageTicket = {
            status: 'To Fix',
            image,
            location,
            category,
            description,
            user_ID: req.params.id,
            report_date: new Date(),
        }
        // store image to cloudinary

        const ticket = await addDamageTicket(newDamageTicket, req.params.id);
    } catch (error) {
        
    }
}


export const editDamageTicket = (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

export const deleteDamageTicket = (req, res) => {
    try {
        
    } catch (error) {
        
    }
}