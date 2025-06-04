import express from 'express'
import cors from 'cors'
import  dotenv from 'dotenv'

dotenv.config({path: './.env'})

const app = express();

const port = process.env.PORT || 8000

const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false,
  };

app.use(cors(corsOptions)); 


app.get('/',(req, res)=>{

    res.status(200).send('Hello word')
})

app.listen(port, ()=>{
    console.log(`Surver running at http://localhost:${port}`)
})