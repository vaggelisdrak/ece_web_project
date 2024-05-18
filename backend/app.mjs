import express from 'express'
import bodyParser from 'body-parser'; 
import { engine } from 'express-handlebars'
import mysql from 'mysql'
import * as dotenv from 'dotenv'
import homeRoute from './routes/homeRoute.mjs'
import authRoute from './routes/authRoute.mjs'
import path from 'path';

dotenv.config();

const app = express()
const port = process.env.PORT || '3000';
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, 'frontend', 'public')));
//app.use(express.static(path.join(__dirname, 'frontend', 'public', 'css')));

app.set('views', path.join(__dirname, 'frontend', 'views'));

app.engine('hbs', engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routes
app.use('/', homeRoute);
app.use('/', authRoute);

const server = app.listen(port, () => { 
    console.log(`Server is running on http://127.0.0.1:${port}`)
});
