import express from 'express'
import { dbconnection } from './databases/dbconnection.js';
import dotenv from 'dotenv'
import morgan from 'morgan';
import { init } from './src/modules/index.routes.js';
import cors from 'cors'
const app = express()
dotenv.config()

app.use(cors())
app.use(express.json())
app.use(express.static('uploads'))
app.use(morgan('dev'))
init(app)
dbconnection()
app.listen(process.env.PORT || 7000, () => {
    console.log("server is Running");
})