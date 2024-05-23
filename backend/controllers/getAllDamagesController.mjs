import { getAllDamageTickets } from "../postgresql/model.mjs";

export const home = async (req,res,next) =>{
   try {
      const damageTickets = await getAllDamageTickets();
      res.render('home', { damageTickets });
   } catch (error) {
      res.render('error', { message: error.message });
   }
};