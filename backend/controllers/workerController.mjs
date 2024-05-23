import { addDamageTicket, deleteDamageTicket, getAllUserDamageTickets, updateDamageTicket } from "../postgresql/model.mjs";
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

// Configure Cloudinary using the CLOUDINARY_URL
cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL
});


export const showAllUserDamageTickets = async (req, res, next) => {
    try {
        const userId = req.session.loggedUserId;
        const userDamageTickets = await getAllUserDamageTickets(userId);
        res.render('workerhome', { userDamageTickets: userDamageTickets});
    } catch (error) {
        res.render('error', { message: error.message });
    }
}

export const postDamageTicket = async (req, res, next) => {
    try {
        console.log('req.body',req.body)
        const { location, category, description } = req.body;
        const userId = req.session.loggedUserId;
        console.log('user id is ',userId)

        // Check if a file is provided in the request
        /*if (!req.file) {
            //throw new Error('No image file provided');
        }*/

        let result;
        if(req.file){
            // Upload image to Cloudinary
            result = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    {
                        folder: 'damage_tickets', // Change the folder name if necessary
                        use_filename: true,
                        unique_filename: true
                    },
                    (error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                ).end(req.file.buffer);
            });
        }

        const newDamageTicket = {
            status: 'To Fix',
            image: result?.secure_url, // Store the Cloudinary URL in the database
            location,
            category,
            description,
            user_ID: userId,
            report_date: new Date(),
        };

        // Add the new damage ticket to the database
        const ticket = await addDamageTicket(newDamageTicket, userId);

        res.redirect('/workerhome');
    } catch (error) {
        console.error('Error posting damage ticket:', error);
        res.render('error', { message: error.message });
    }
};

export const editDamageTicket = async (req, res, next) => {
    try {
        const { location, category, description } = req.body;
        const damageTicketId = req.params.id; // Assuming the damage ticket ID is provided in the URL parameters
        const userId = req.session.loggedUserId;
        console.log('user id is ', userId);

        let updatedFields = {};

        // Check if a file is provided in the request
        if (req.file) {
            // Upload image to Cloudinary
            const result = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    {
                        folder: 'damage_tickets', // Change the folder name if necessary
                        use_filename: true,
                        unique_filename: true,
                    },
                    (error, result) => {
                        if (error) {
                            console.error('Error uploading image to Cloudinary:', error);
                            return reject('Failed to upload image');
                        }
                        resolve(result.secure_url);
                    }
                ).end(req.file.buffer);
            });

            updatedFields.image = result;
        }

        updatedFields.location = location;
        updatedFields.category = category;
        updatedFields.description = description;

        console.log('Updated fields:', updatedFields);

        // Call the function to update the damage ticket in the database
        const updatedTicket = await updateDamageTicket(damageTicketId, updatedFields);

        res.redirect('/workerhome');
    } catch (error) {
        console.error('Error editing damage ticket:', error);
        //res.status(500).send('Error editing damage ticket: ' + error.message); // Send a response indicating an error occurred
        res.render('error', { message: error.message });
    }
};

export const removeDamageTicket = async (req, res, next) => {
    try {
        const userId = req.session.loggedUserId;
        const ticket = await deleteDamageTicket(req.params.id);
        res.redirect('/workerhome');
    } catch (error) {
        console.error('Error deleting damage ticket:', error);
        res.render('error', { message: error.message });
    }
}