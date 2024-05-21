import session from 'express-session'

const userSession = session({
   secret: process.env.SESSION_SECRET || 'your-secret',  // Replace 'your-secret' with a real secret
   resave: false,
   saveUninitialized: true,
   cookie: { secure: false }  // Set to true if using HTTPS
});

export default userSession;
