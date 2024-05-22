import { getAllDamageTickets } from "../postgresql/model.mjs";

export const home = async (req,res) =>{
   try {
      const damageTickets = await getAllDamageTickets();
      res.render('home', { damageTickets });
   } catch (error) {
      throw error;
   }
};