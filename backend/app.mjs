import express from 'express'
import bodyParser from 'body-parser'; 
import { engine } from 'express-handlebars'
import mysql from 'mysql'
import * as dotenv from 'dotenv'
import homeRoute from './routes/homeRoute.mjs'
import authRoute from './routes/authRoute.mjs'
import adminRoute from './routes/adminRoute.mjs'
import workerRoute from './routes/workerRoute.mjs'
import path from 'path';
import userSession from './app-setup/app-setup-session.mjs';

dotenv.config();

const app = express()
const port = process.env.PORT || '3000';
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, 'frontend', 'public')));

app.set('views', path.join(__dirname, 'frontend', 'views'));

app.engine('hbs', engine({ 
    extname: 'hbs',
    helpers: {
        includes: function (array, value) {
            return array && array.includes(value);
        }
    } 
}));
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(userSession)

// Error handling middleware
app.use((err, req, res, next) => {
   console.error('middleware',err.stack);
   res.render('error', { message: 'An error has happened' });
});

app.use((req, res, next) => {
   if (req.session) {
      res.locals.userId = req.session.loggedUserId;
   } else {
      res.locals.userId = 'visitor';
   }
   next();
});

//Routes
app.use('/', homeRoute);
app.use('/', authRoute);
app.use('/', adminRoute);
app.use('/', workerRoute);

const server = app.listen(port, () => { 
    console.log(`Server is running on http://127.0.0.1:${port}`)
});

