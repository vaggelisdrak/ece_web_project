import bcrypt from 'bcrypt'
import { getAllAdmins, getUserByEmail, getUserByUsername, registerUser } from '../postgresql/model.mjs';

export let showLogInForm = function (req, res) {
    res.render('login');
}

export let showRegisterForm = function (req, res) {
    res.render('register');
}

export let doRegister = async function (req, res) {
    try {
        console.log(req.body)
        const registrationResult = await registerUser(req.body.username,req.body.email,req.body.password);
        if (registrationResult.message) {
            res.render('register', { message: registrationResult.message })
        }
        else {
            res.redirect('/signin');
        }
    } catch (error) {
        console.error('registration error: ' + error);
        //FIXME: δε θα έπρεπε να περνάμε το εσωτερικό σφάλμα στον χρήστη
        //res.render('register-password', { message: error });
        res.render('register', { message: 'An error occurred during registration' });
    }
}

export let doLogin = async function (req, res) {
    //Ελέγχει αν το username και το password είναι σωστά και εκτελεί την
    //συνάρτηση επιστροφής authenticated
    try {
        const user = await getUserByUsername(req.body.username);
        if (user == undefined || !user.password || !user.id) {
            res.render('login', { message: 'User was not found' });
        }
        else {
            const match = await bcrypt.compare(req.body.password, user.password);
            if (match) {
                //Θέτουμε τη μεταβλητή συνεδρίας "loggedUserId"
                req.session.loggedUserId = user.id;     
                // check if user is admin
                const admins = await getAllAdmins();
                let redirectTo;

                if (admins.find(admin => admin.admin_ID === user.id)) {
                    console.log("admin logged in");
                    redirectTo = req.session.originalUrl || "/adminhome";
                }
                else {
                    console.log("user logged in");
                    req.session.isAdmin = false;
                    redirectTo = req.session.originalUrl || "/workerhome";
                }
                res.redirect(redirectTo);
            }
            else {
                res.render("login", { message: 'Password in incorrect' })
            }
        }
    } catch (error) {
        console.error('login error: ' + error);
    }
}

export let doLogout = (req, res) => {
    //Σημειώνουμε πως ο χρήστης δεν είναι πια συνδεδεμένος
    req.session.destroy();
    res.redirect('/');
}

//Τη χρησιμοποιούμε για να ανακατευθύνουμε στη σελίδα /login όλα τα αιτήματα από μη συνδεδεμένους χρήστες
export let checkAuthenticated = function (req, res, next) {
    //Αν η μεταβλητή συνεδρίας έχει τεθεί, τότε ο χρήστης είναι συνεδεμένος
    if (req.session.loggedUserId) {
        console.log("user is authenticated", req.originalUrl);
        //Καλεί τον επόμενο χειριστή (handler) του αιτήματος
        next();
    }
    else {
        //Ο χρήστης δεν έχει ταυτοποιηθεί, αν απλά ζητάει το /login ή το register δίνουμε τον
        //έλεγχο στο επόμενο middleware που έχει οριστεί στον router
        if ((req.originalUrl === "/signin") || (req.originalUrl === "/signup")) {
            next()
        }
        else {
            //Στείλε το χρήστη στη "/login" 
            console.log("not authenticated, redirecting to /signin")
            res.redirect('/signin');
        }
    }
}